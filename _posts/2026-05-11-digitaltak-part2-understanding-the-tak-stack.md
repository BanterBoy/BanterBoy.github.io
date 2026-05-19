---
layout: single
title: "DigitalTAK, Part 2 — Before You Touch a Single Command: Understanding the TAK Stack"
excerpt: "Before anything works, you need to understand how TAK actually fits together. The certificate model especially — get that wrong and you'll spend a frustrating afternoon wondering why clients won't connect. Let me save you the afternoon."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "layer-group"
toc_sticky: true
date: 2026-05-11 07:30:00 +0000
last_modified_at: 2026-05-11 07:30:00 +0000
permalink: /blog/digitaltak-part2-understanding-the-tak-stack/
redirect_from:
  - /blog/series/digitaltak-part2-understanding-the-tak-stack/
categories:
    - Blog
    - Series
tags:
    - DigitalTAK
    - TAK
    - CivTAK
    - PowerShell
    - Airsoft
---

<script src="https://formspree.io/js/formbutton-v1.0.0.min.js" defer></script>
<script>
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
  formbutton("create", {
    action: "https://formspree.io/xvowjgjd",
    buttonImg: "<i class='fas fa-envelope' style='font-size:20px'/>",
    theme: "minimal",
    title: "Contact Me!",
    fields: [
      {
        type: "email",
        label: "Email:",
        name: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        type: "textarea",
        label: "Message:",
        name: "message",
        required: true,
        placeholder: "What's on your mind?",
      },
      { type: "submit" }
    ],
    styles: {
      fontFamily: "Roboto",
      fontSize: "1em",
      title: {
        background: "#999999",
      },
      button: {
        background: "#999999",
      }
    },
    initiallyVisible: false
  });
</script>

{: .text-right}
<span style="font-size:11px;"><button onclick="window.print()"><i class="fas fa-print" aria-hidden="true" style="color: black; margin-right:5px;"></i>Print</button></span>

When I started digging into TAK, I made the classic mistake of jumping straight to installation before I actually understood what I was installing. The result was a TAK Server that technically ran but which clients stubbornly refused to connect to, and several hours of increasingly frustrated troubleshooting before I realised I'd fundamentally misunderstood how the certificate model works.

I'd rather you didn't have the same afternoon. So before we touch a single command, here's the conceptual foundation you actually need.

This isn't a comprehensive TAK architecture guide — the official documentation at [tak.gov][1]{:target="\_blank"} covers that in rather more depth than I could. This is a "what you need to understand before the DigitalTAK deployment scripts will make sense" guide. The bits that aren't obvious. The bits I got wrong first.

---

## <i class="fas fa-certificate" aria-hidden="true" style="color: white; margin-right:5px;"></i>The Certificate Model — The Thing That Trips Everyone Up

TAK uses **mutual TLS authentication**. Not just "the server presents a cert and the client trusts it," which is the HTTPS model most of us are familiar with — but genuine mutual authentication, where both sides present certificates and both sides verify the other. If the client can't present a valid certificate from a trusted CA, the connection is refused. There's no username/password fallback. No anonymous access. The cert is the credential.

This has an important implication: you can't use a Let's Encrypt certificate or any public CA. TAK Server generates and manages its own private Certificate Authority during setup, and all client certificates are issued by that CA. The server trusts its own CA. Clients trust the server's CA. That's the complete trust model.

The chain looks like this:

```
Root CA (generated at install)
  └── Intermediate CA (generated at install)
        ├── TAK Server certificate (used for 8443/8446 TLS)
        └── Per-user certificates (one .p12 per team member)
```

The per-user certificates are the key piece. Each member of your team gets their own `.p12` file — a PKCS#12 bundle containing their personal private key and certificate, signed by the intermediate CA. When their ATAK client connects to the server, it presents this certificate. The server validates it against the CA chain, and if it checks out, the connection is established.

This means a few things in practice:

**Certificate generation is setup work.** You're not just installing software — you're standing up a PKI, even if a simple one. Generating the CA, the server cert, and the per-user certs in the right sequence, with the right parameters, and with the right certificate stores on the server is the most failure-prone part of a manual TAK installation.

**Revocation is the right way to remove a user.** If someone leaves the team, you don't delete their account — you revoke their certificate. (Or both, but revocation is what actually prevents them connecting.)

**Data packages are cert bundles, not just config files.** A TAK data package is a `.zip` file containing the user's personal `.p12`, the server's CA certificate (so the client can trust the server), and the connection configuration. Import it in ATAK and everything is pre-configured. This is how DigitalTAK distributes access — one file per person, completely self-contained.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-broadcast-tower" aria-hidden="true" style="color: white; margin-right:5px;"></i>Cursor on Target — The Protocol That Connects Everything

**Cursor on Target** (CoT) is the XML-based protocol that TAK uses to share situational awareness data between clients and server. Every time an ATAK device broadcasts its position, it sends a CoT message. Every time a server distributes that position to connected clients, it sends a CoT message. The whole shared map is built from a continuous stream of these.

A CoT event looks something like this (simplified):

```xml
<event version="2.0" uid="ANDROID-abc123" type="a-f-G-U-C" time="2026-05-10T09:00:00Z"
       start="2026-05-10T09:00:00Z" stale="2026-05-10T09:05:00Z" how="m-g">
  <point lat="51.5074" lon="-0.1278" hae="10.0" ce="9.9" le="9.9"/>
  <detail>
    <contact callsign="Bravo1"/>
    <track speed="1.4" course="270.0"/>
    <remarks>En route to checkpoint</remarks>
  </detail>
</event>
```

The `type` field uses a standardised taxonomy that tells clients what kind of entity this is. `a-f-G-U-C` means "atom — friendly — ground — unit — combat." That's how icons get drawn on the map — ATAK reads the type and picks the correct military symbol. For airsoft, "friendly" covers everyone on your team; ATAK draws the appropriate icon at the broadcast coordinates.

`stale` is worth noting — if a device stops broadcasting (battery dies, goes out of range, app crashes), its icon stays on the map until the stale time passes, at which point it fades. You can tune how frequently clients broadcast and how long their stale window is.

CoT travels over TCP port 8089. The server receives it from clients, processes it, and distributes relevant events back out. There's also a streaming API on 8443 for server-side event consumption, which is what `TAKServerPS` uses for the REST wrapper — but that's Part 6.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-mobile-alt" aria-hidden="true" style="color: white; margin-right:5px;"></i>The Client Types — What Your Team Will Actually Run

TAK has several client applications. In practice for a small airsoft team, you'll use two of them.

**ATAK (Android)** is the primary client. This is the one that started it all, and it's the most fully-featured. It runs on any reasonably modern Android device, has excellent offline map support (OsmAnd and other providers), handles missions, chat, images, and video feeds, and has an extensive plugin ecosystem if you want to go further than the basics. For airsoft, it runs on the phones your team already own. This is what everyone will use.

**WinTAK (Windows)** is the desktop client. It's broadly equivalent to ATAK in features and runs on Windows 10/11. Useful for a command role running from a laptop at a fixed position — you get the same map, the same situational picture, and you can manage missions without squinting at a phone screen. It requires a licence from `tak.gov` (free, but you need the account).

**iTAK (iOS)** exists and works, though it's somewhat behind ATAK in features. If your team has people who won't switch to Android for this (entirely fair), iTAK will get them on the map. The data package format is the same, so onboarding works identically.

**WebTAK** is the browser-based client served directly from TAK Server on port 8443. No app installation required — you log in with a username and password (rather than a certificate, unlike the mobile clients). The map view is excellent. For our purposes it's most useful for monitoring the tactical picture from a command position when WinTAK isn't available, or for verifying the server is working without needing a configured mobile client.

For a typical game day: every player has ATAK on their Android phone. The person running command has either ATAK or WinTAK on a laptop. WebTAK is open on the admin machine as a sanity check. That's the whole stack.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-network-wired" aria-hidden="true" style="color: white; margin-right:5px;"></i>Network Ports — What Needs to Be Open

TAK Server uses a number of ports. If you're running it on-premises behind a firewall (which for an airsoft scenario you almost certainly will be — more on the deployment architecture in Part 3), these all need to be reachable from client devices.

| Port | Protocol | Purpose |
|------|----------|---------|
| 8089 | TCP | Cursor on Target — client position data |
| 8443 | TCP | WebTAK, REST API, streaming API |
| 8446 | TCP | Client certificate enrollment |
| 5222 | TCP | XMPP (Openfire) — chat, optional |
| 5223 | TCP | XMPP over TLS (Openfire), optional |
| 9090 | TCP | Openfire admin console (HTTP), internal only |
| 9091 | TCP | Openfire admin console (HTTPS), internal only |

For most deployments, 8089, 8443, and 8446 are the essential three. The Openfire XMPP ports are only needed if you want in-app chat via the TAK messaging system — it's a separate service, and DigitalTAK can configure it as part of the deployment, but it's optional for basic positioning use.

The admin console ports (9090/9091) should never be exposed externally. They're for server-side administration and should only be reachable from the admin machine.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-file-archive" aria-hidden="true" style="color: white; margin-right:5px;"></i>What a Data Package Actually Contains

A TAK data package is a `.zip` file. That's it. It just happens to be a zip file with a very specific internal structure that ATAK knows how to parse on import.

Inside a typical user data package:

```
alpha-Bravo1.zip
├── MANIFEST/
│   └── manifest.xml          # Connection config, server address, ports
├── certs/
│   ├── truststore-root.p12   # Server CA cert — client uses this to trust the server
│   └── Bravo1.p12            # User's personal cert — client presents this to the server
└── preference/
    └── README.txt            # Optional notes for the user
```

The `manifest.xml` is the connection configuration — it tells ATAK the server's IP address, the ports to use, which certificate files to use for which purpose, and what callsign to pre-configure. Import the package and ATAK reads this manifest and configures itself automatically.

The `truststore-root.p12` is the server's CA certificate, exported as a PKCS#12 file. The client imports this into its local trust store — from that point on, it trusts TLS certificates issued by your TAK Server's CA.

The personal `.p12` is the user's credential. This is what they present when connecting. It's protected with a password (which you set during certificate generation and communicate to the user separately).

Building these packages by hand — generating the certificates, packing the zip, getting the manifest XML right — is tedious and error-prone. `Invoke-TAKOnboarding` in DigitalTAK builds them for you: one command, one package per team member, ready to distribute. Part 5 covers that in detail.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-arrow-right" aria-hidden="true" style="color: white; margin-right:5px;"></i>Where This Leaves Us

So: mutual TLS, a private CA, CoT over TCP, four client types, seven ports, and a zip file with a specific structure. That's the conceptual model. It sounds like a lot written out, but once you've run a deployment you'll find the pieces fall into place naturally — DigitalTAK handles all of this automatically, and knowing the model makes it obvious *why* each step happens rather than the steps feeling arbitrary.

In [Part 3][2]{:target="\_blank"} we'll look at how DigitalTAK is structured — the four modules, the Hyper-V + Rocky Linux choice, and what the automated deployment actually does from start to finish.

This series index: [Part 1 — What is TAK?][3]{:target="\_blank"} · **Part 2 — Understanding the Stack** · [Part 3 — What DigitalTAK Automates][4]{:target="\_blank"} · [Part 4 — Running the Deployment][5]{:target="\_blank"} · [Part 5 — Onboarding Your Team][6]{:target="\_blank"} · [Part 6 — The API Wrapper][7]{:target="\_blank"}

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://tak.gov/
[2]: /blog/series/digitaltak-part3-what-digitaltak-automates/
[3]: /blog/series/digitaltak-part1-what-is-tak/
[4]: /blog/series/digitaltak-part4-running-the-deployment/
[5]: /blog/series/digitaltak-part5-onboarding-your-team/
[6]: /blog/series/digitaltak-part6-takserverps-api-wrapper/
[7]: https://digitaltak.lukeleigh.com/
