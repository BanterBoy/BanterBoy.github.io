---
layout: single
title: "DigitalTAK, Part 1 — What on Earth is TAK, and Why Does an IT Admin in Essex Have One?"
excerpt: "I play airsoft. My team runs around woods shooting each other with plastic pellets and having a genuinely brilliant time. The problem is the tactics. Or rather, the complete absence of them. This is the story of how I ended up deploying US military situational awareness software to fix that."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "map-marked-alt"
toc_sticky: true
date: 2026-05-10 12:00:00 +0100
last_modified_at: 2026-05-10 12:00:00 +0100
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

I play airsoft. I want to be clear about that upfront, before this gets framed as anything more impressive than it is. A bunch of grown adults, running around in woodland, shooting each other with plastic pellets, occasionally crawling through mud, and having — I'll be honest — an absolutely brilliant time.

The problem isn't the shooting. That part works fine. The problem is everything else. The communication. The coordination. The fact that "tactics" currently means someone shouting "they're over there!" and pointing vaguely at a tree line whilst everyone else runs in roughly the same direction and hopes for the best. We're less *Band of Brothers* and more *Dad's Army*, and I say that with genuine affection for everyone involved.

I'd been thinking for a while about how to make the experience more rewarding — more structured, more immersive, the kind of day where you actually feel like you've *done* something rather than just wandered around a field for six hours. Real-time positioning. Team coordination. Missions. Objectives that mean something beyond "try not to get shot first."

And then I found TAK. Which is how I ended up spending several evenings deploying software originally written for the United States Department of Defense on a Rocky Linux virtual machine in my home lab. As you do……

---

## <i class="fas fa-history" aria-hidden="true" style="color: white; margin-right:5px;"></i>What is TAK? The Slightly Surprising Origin Story

TAK stands for **Team Awareness Kit**. It started life as a US military programme — specifically, it was developed as an Android application (hence ATAK — Android Team Awareness Kit) to give soldiers real-time situational awareness on the battlefield. GPS positions of friendly units on a shared map. Chat. Missions. Objectives. The kind of coordination capability that turns a collection of individuals into something that actually functions as a team.

The core concept is something called **Cursor on Target** — CoT — which is the protocol that ties everything together. Every device running an ATAK client broadcasts its position (and other data) to a central TAK Server. The server distributes that information to all connected clients. Everyone sees everyone else on the map, in real time. You can create missions, assign objectives, send messages, share images and video feeds, and track movement across the whole group simultaneously.

That's a considerable amount of capability, and it was all built for and by the US military. The good news — for the rest of us — is that it didn't stay there.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-globe" aria-hidden="true" style="color: white; margin-right:5px;"></i>Enter CivTAK — TAK for the Rest of Us

The civilian version of the TAK ecosystem — **CivTAK** — was released publicly and is available through [tak.gov][1]{:target="\_blank"}, which is run by the TAK Product Center. The software itself is free. You need an account to download it (and MFA is enforced, which I'll come back to), but there's no licence fee, no subscription, and no paywall beyond that initial registration.

CivTAK has found a surprisingly broad audience outside of its military origins. Emergency services use it. Mountain rescue teams use it. Event organisers managing large outdoor venues use it. Amateur radio operators run it for APRS tracking. And — increasingly — hobbyists, simulation enthusiasts, and yes, airsoft teams like mine are running it for exactly the kind of immersive coordination experience it was designed to enable.

The ecosystem has several moving parts worth understanding:

**TAK Server** is the hub. It runs on Linux (Rocky Linux 9 in this case, though other RHEL-based distributions work), handles authentication and certificate management, distributes CoT data between clients, and provides the REST API for administration. Everything goes through it.

**ATAK** is the Android client. This is what your team members run on their phones — it connects to your TAK Server, shows everyone's position on a map, handles missions and chat, and is surprisingly polished for something that started as a military programme. There's also **WinTAK** for Windows and **iTAK** for iOS, though ATAK on Android is the most fully-featured and the most commonly used.

**WebTAK** is the browser-based client — useful for a command overview, monitoring the map from a laptop, or administration without needing a mobile device.

**Data packages** are the mechanism for getting clients configured. Rather than having everyone manually enter server addresses and import certificates, you build a `.zip` data package containing all the connection configuration and certificate material for a specific user, and they import it in ATAK in a few taps. One file per person, fully pre-configured, ready to go.

That combination — server, clients, and data packages — is what makes TAK genuinely usable for a team rather than just technically impressive.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-crosshairs" aria-hidden="true" style="color: white; margin-right:5px;"></i>Why Airsoft, Specifically?

This is a fair question. Is it? Yes, surely there are more serious use cases than grown adults shooting plastic pellets at each other?

Well, yes — and there are people using CivTAK for exactly those more serious use cases. But the airsoft angle is what makes this interesting for this series of posts, because it's a very concrete, very testable scenario with a defined group of people, a defined physical area, and a clear goal: make the day more rewarding and more realistic.

The problem with airsoft as it's typically played — at least at the casual, recreational level — is that the experience is largely disconnected from any real sense of tactics or coordination. You know roughly where the objective is. You can hear roughly where the shooting is coming from. Beyond that, it's mostly guesswork and shouting.

Introduce TAK into that and everything changes. Every player's phone shows their real position on the map. Squad leaders can see exactly where their people are at all times, even through woodland. Objectives can be created on the map and assigned to specific teams. A command role can actually *command* — watching the tactical picture, directing movement, responding to what's actually happening rather than what they can hear.

The experience becomes structured. There are real decisions to make. People are accountable to a team rather than just to themselves. And at the end of the day, there's an actual sense of having executed something rather than just survived it.

That's the goal. And to get there, I needed a TAK Server — properly configured, properly secured, with certificate-based authentication so random devices can't just connect, and with a workflow for onboarding a dozen players in minutes rather than an afternoon.

Which is why I built DigitalTAK.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-terminal" aria-hidden="true" style="color: white; margin-right:5px;"></i>What is DigitalTAK?

**DigitalTAK** is the automation framework I built to solve the deployment problem. Installing TAK Server manually is a multi-hour process involving Linux package management, PostgreSQL configuration, certificate authority setup, SELinux policy adjustments, firewall rules, and a handful of other things that are each individually manageable but collectively add up to a day of effort and a fair amount of scope for things to go wrong silently.

I didn't want to do that every time. I wanted to be able to spin up a fully working TAK Server instance on my Hyper-V host, with certificates correctly configured and the REST API verified, and then onboard a team with one command. So I wrote the scripts to do it. And then I wrote PowerShell modules around those scripts. And then I added Pester tests. And then I wrote a documentation site. And then I published the whole thing on GitHub.

(I have a tendency to keep going once I've started. Anyone who knows me will find that statement very amusing.)

The short version: DigitalTAK is a single PowerShell entry point — `Deploy-TAKServer.ps1` — that takes a Windows 10/11 machine with Hyper-V enabled, a Rocky Linux 9 ISO, and a TAK Server RPM downloaded from `tak.gov`, and produces a fully running, certificate-authenticated TAK Server instance inside a Hyper-V VM. From zero to working server, unattended, with snapshot-based rollback if anything goes wrong along the way.

Team onboarding is a separate one-liner: `Invoke-TAKOnboarding.ps1` — provide the server address and a team size, and it generates per-user certificates, creates user accounts, assigns group memberships, and builds ATAK data packages ready to distribute. One zip file per player. Import it on their phone and they're on the map.

```powershell
# Deploy a TAK Server (after prerequisites are in place)
.\Deploy-TAKServer.ps1 -Credential $cred -RootPassword $rootPw -KeystorePassword $ksPw

# Onboard a 10-person team
.\Invoke-TAKOnboarding.ps1 -ServerHost 10.10.0.154 -TeamName alpha -TeamSize 10
```

That's the shape of it. The details — and there are quite a few — are what the rest of this series covers.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-map-signs" aria-hidden="true" style="color: white; margin-right:5px;"></i>What's Coming in This Series

This is Part 1 — the "what and why." The rest of the series goes progressively deeper into the technical detail:

- **Part 2** — Understanding the TAK stack before you deploy anything: the certificate model, the client types, CoT, and what a data package actually contains
- **Part 3** — What DigitalTAK automates and how the architecture fits together
- **Part 4** — Running the deployment: a walkthrough of `Deploy-TAKServer.ps1`
- **Part 5** — Getting your team on TAK: certificates, user accounts, and data packages with `Invoke-TAKOnboarding`
- **Part 6** — The `TAKServerPS` REST API wrapper: 45 cmdlets and what you'd actually use them for

If you want to get ahead, the full documentation is at [digitaltak.lukeleigh.com][2]{:target="\_blank"} and the source is on [GitHub][3]{:target="\_blank"}. The [Getting Started guide][4]{:target="\_blank"} covers prerequisites in full — particularly the `tak.gov` account and the MFA requirement for downloading the TAK Server RPM, which catches people out the first time.

There is, as ever, still plenty more to cover. But this should be enough context to make the rest of the series make sense — even if "IT admin deploys military software for airsoft" still sounds slightly absurd. It does to me too, honestly. The results should be worth it though……

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://tak.gov/
[2]: https://digitaltak.lukeleigh.com/
[3]: https://github.com/BanterBoy/DigitalTAK
[4]: https://digitaltak.lukeleigh.com/getting-started/
