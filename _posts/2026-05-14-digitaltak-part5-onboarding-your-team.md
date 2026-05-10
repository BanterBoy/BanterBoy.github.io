---
layout: single
title: "DigitalTAK, Part 5 — Getting Your Team on TAK: Certs, Users, and Data Packages"
excerpt: "The server's running. Now you need to get ten people with Android phones onto it before game day, without spending six hours configuring them individually. One command, one file per person, ten minutes total. Here's how."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "users"
toc_sticky: true
date: 2026-05-14 07:30:00 +0000
last_modified_at: 2026-05-14 07:30:00 +0000
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
<span style="font-size:11px;"><button onclick="window.print()"><i class="fas fa-print" aria-hidden="true" style="color: white; margin-right:5px;"></i>Print</button></span>

The first time I tried to onboard a test team manually — generate the certs, create the accounts, build the data packages, distribute them — it took the better part of an afternoon and I still managed to get one person's certificate wrong.

The second time I did it with `Invoke-TAKOnboarding.ps1`. It took eight minutes for ten people. I haven't done it manually since.

Here's how the onboarding process works and what you need to know before running it.

---

## <i class="fas fa-id-card" aria-hidden="true" style="color: white; margin-right:5px;"></i>What Onboarding Actually Does

Onboarding a user to TAK Server involves three distinct things that all need to happen together:

**Certificate generation** — Each user gets their own personal certificate, signed by the TAK Server's CA. This certificate is their identity on the network. Generating it requires running the TAK Server's certificate tools on the server itself, which involves SSH, shell scripts, Java keytool operations, and extracting the output in the right format. Not complicated once you know the sequence; tedious to do ten times.

**Account creation** — TAK Server maintains its own user database (backed by PostgreSQL). Each user needs an account, created via the REST API, with their certificate linked to that account. Without the account, the certificate alone isn't sufficient to connect.

**Group assignment** — TAK uses groups to control what users can see and do. At minimum, each user needs to be in a group that has access to the relevant mission data and CoT feeds. `Invoke-TAKOnboarding` creates two groups per team: `{TeamName}` (all members) and `{TeamName}-Lead` (squad leaders with elevated permissions). Members are assigned to the appropriate group based on whether you mark them as a leader.

After all three steps, `Invoke-TAKOnboarding` packages everything into per-user data packages: the `.p12` personal certificate, the server's trust store, and the connection manifest. Each user gets one `.zip` file. Import it in ATAK, done.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-terminal" aria-hidden="true" style="color: white; margin-right:5px;"></i>Running the Onboarding

Import the TAKOnboarding module:

```powershell
Import-Module .\Modules\TAKOnboarding\TAKOnboarding.psd1
```

The simplest onboarding run — a team of 10, all as standard members:

```powershell
Invoke-TAKOnboarding `
    -ServerHost "10.10.0.154" `
    -AdminCredential $adminCred `
    -TeamName "alpha" `
    -TeamSize 10 `
    -CertPassword "ChangeMe123" `
    -OutputPath "C:\TAKPackages\alpha"
```

This generates:

- Ten user certificates (`alpha-01` through `alpha-10`)
- Ten TAK Server user accounts, linked to those certificates
- Two groups: `alpha` and `alpha-Lead`
- All ten users assigned to the `alpha` group
- Ten data packages in `C:\TAKPackages\alpha\`

If you want to designate specific users as team leads:

```powershell
Invoke-TAKOnboarding `
    -ServerHost "10.10.0.154" `
    -AdminCredential $adminCred `
    -TeamName "alpha" `
    -TeamSize 10 `
    -LeadIndexes @(1, 5) `
    -CertPassword "ChangeMe123" `
    -OutputPath "C:\TAKPackages\alpha"
```

Users 1 and 5 (`alpha-01` and `alpha-05`) will be assigned to `alpha-Lead` in addition to `alpha`. In ATAK, group membership affects the icon displayed for that user on other people's maps — leads show differently, which matters when you're trying to identify who's commanding which element at a glance.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-file-archive" aria-hidden="true" style="color: white; margin-right:5px;"></i>What's Inside Each Data Package

Each `.zip` in the output folder is a self-contained ATAK data package. As we covered in Part 2, it contains:

```
alpha-alpha-01.zip
├── MANIFEST/
│   └── manifest.xml          # Server IP, ports, cert file references, callsign
├── certs/
│   ├── truststore-root.p12   # Server CA cert — client trusts this
│   └── alpha-01.p12          # User personal cert — client presents this
```

The callsign in `manifest.xml` is pre-set to the username (`alpha-01` by default). Your team members can change their callsign in ATAK after importing — it's just a sensible default so everyone isn't unnamed `ANDROID-xxxxx` on the map initially.

The cert password (`-CertPassword`) is set on the personal `.p12`. You'll need to communicate this to each team member — it's prompted during the ATAK import. I'd recommend a single shared password for the whole team for a typical game day setup rather than individual passwords per person; for higher security scenarios you'd want per-user passwords, but for airsoft the shared password is considerably easier to manage.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-share-alt" aria-hidden="true" style="color: white; margin-right:5px;"></i>Distributing the Packages

You've got ten `.zip` files. How do you get them onto ten phones?

The most straightforward approach: put them in a shared folder or a chat thread and have each person download their own. Signal, WhatsApp, or a shared OneDrive/Google Drive all work. The data packages don't contain anything sensitive beyond the server address and the team member's certificate — they're useless without the TAK Server to connect to.

Alternatively, if you're doing setup on-site: AirDrop (iOS), Android Beam, or just a USB cable to a laptop with the files on it. WhatsApp file sharing is probably the fastest for a group that's already in a team chat together.

On the ATAK side, importing is: tap the three-dot menu → Import → navigate to the `.zip` → import. ATAK reads the manifest, imports the certificates, and configures the server connection automatically. If the server is reachable (correct IP, correct ports, firewall open), ATAK will connect and the user will appear on the map.

First connection often prompts for the cert password — that's the `-CertPassword` value from the onboarding command. Enter it once and ATAK remembers it.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-comments" aria-hidden="true" style="color: white; margin-right:5px;"></i>Optional: Openfire XMPP Chat

TAK Server ships with Openfire, a Jabber/XMPP server, which ATAK uses for in-app messaging — team chat that runs through your TAK Server rather than a separate platform. It's optional, and DigitalTAK can configure it as part of the deployment (pass `-EnableOpenfire` to `Deploy-TAKServer.ps1`).

If Openfire is running, users can chat within ATAK's messaging interface, send files, and use persistent group channels. For game day communication this is genuinely useful — everyone is already in ATAK looking at the map, so in-app chat keeps everything in one place rather than switching between apps.

If you haven't enabled Openfire, ATAK will still show the chat interface but messages won't send — it fails quietly rather than with an obvious error, which can be confusing. Either enable it or be explicit with your team that chat isn't configured.

Ports 5222 and 5223 need to be reachable from client devices if you're using Openfire. See the ports table in [Part 2][1]{:target="\_blank"}.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-arrow-right" aria-hidden="true" style="color: white; margin-right:5px;"></i>What Comes Next

At this point you have a TAK Server, a team of users with ATAK configured on their phones, and everyone showing on the map. That's the operational baseline.

[Part 6][2]{:target="\_blank"} covers `TAKServerPS` — the REST API wrapper that lets you manage all of this from PowerShell: querying users, managing missions, administering certificates, and the honest truth about the current test pass rate.

This series index: [Part 1 — What is TAK?][3]{:target="\_blank"} · [Part 2 — Understanding the Stack][4]{:target="\_blank"} · [Part 3 — What DigitalTAK Automates][5]{:target="\_blank"} · [Part 4 — Running the Deployment][6]{:target="\_blank"} · **Part 5 — Onboarding Your Team** · [Part 6 — The API Wrapper][7]{:target="\_blank"}

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: /blog/series/digitaltak-part2-understanding-the-tak-stack/
[2]: /blog/series/digitaltak-part6-takserverps-api-wrapper/
[3]: /blog/series/digitaltak-part1-what-is-tak/
[4]: /blog/series/digitaltak-part2-understanding-the-tak-stack/
[5]: /blog/series/digitaltak-part3-what-digitaltak-automates/
[6]: /blog/series/digitaltak-part4-running-the-deployment/
[7]: /blog/series/digitaltak-part6-takserverps-api-wrapper/
