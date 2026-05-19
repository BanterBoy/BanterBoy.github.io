---
layout: single
title: "DigitalTAK, Part 3 — What DigitalTAK Automates and Why That Matters"
excerpt: "Installing TAK Server manually is entirely possible. I know because I did it, twice, before I decided to write scripts so I'd never have to again. Here's what those scripts actually do, and why the architecture decisions were made the way they were."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "robot"
toc_sticky: true
date: 2026-05-12 07:30:00 +0000
last_modified_at: 2026-05-12 07:30:00 +0000
permalink: /blog/digitaltak-part3-what-digitaltak-automates/
redirect_from:
  - /blog/series/digitaltak-part3-what-digitaltak-automates/
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

I installed TAK Server manually. Twice. The first time I got it working but I couldn't have told you exactly which steps mattered and which were me being paranoid. The second time was an attempt to document the process properly so I could repeat it reliably.

By the end of that second attempt I had a working server, twelve pages of notes, and a very strong opinion that I should never have to do this by hand again.

So I wrote the scripts. Then I wrote modules around the scripts. Then I added tests. Then I wrote a documentation site. You know how this goes.

Here's what DigitalTAK actually automates, and why the choices were made the way they were.

---

## <i class="fas fa-cubes" aria-hidden="true" style="color: white; margin-right:5px;"></i>The Four-Module Architecture

DigitalTAK is organised into four PowerShell modules, each responsible for a distinct phase of the lifecycle. They're designed to be used in sequence for a full deployment, but they're also independently useful — you can run `TAKServerPS` against an existing TAK Server that DigitalTAK didn't install, for example.

**TAKInstall** handles everything up to a running TAK Server: provisioning the Hyper-V VM, configuring the Rocky Linux guest, installing the TAK Server RPM, running the initial certificate setup, configuring PostgreSQL, adjusting SELinux and firewall rules, and verifying the service is alive. Six cmdlets, covering what would otherwise be a multi-hour manual process.

**TAKDeploy** handles the deployment orchestration layer — the `Deploy-TAKServer.ps1` entry point lives here. It coordinates TAKInstall's steps, manages snapshot checkpoints between phases, and handles rollback if something fails mid-deployment. Five cmdlets. This is the bit that makes the whole thing hands-off rather than "run this, wait, check it worked, run the next thing."

**TAKOnboarding** generates the per-user certificates and data packages that get your team onto the server. It talks to the TAK Server REST API to create user accounts, assigns group memberships (team members and team leads get different permissions), and builds the ATAK data packages ready for distribution. Four cmdlets. This is what you run before game day.

**TAKServerPS** is the REST API wrapper — 45 cmdlets covering users, groups, missions, data packages, certificates, configuration, and more. It's what you'd use for day-to-day TAK Server administration from PowerShell rather than the WebTAK UI. This is Part 6 in the series; the other three modules are what get you to a state where TAKServerPS has something to talk to.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-server" aria-hidden="true" style="color: white; margin-right:5px;"></i>Why Hyper-V and Rocky Linux?

This is a reasonable question, particularly if you're running DigitalTAK on a Windows machine (which you are — the orchestration layer is PowerShell on Windows).

**Hyper-V** because it's available on Windows 10/11 Pro/Enterprise without any additional cost, it's manageable via PowerShell with `Hyper-V` module cmdlets that DigitalTAK already depends on, and it gives us VM-level snapshot capability which is central to how the deployment handles rollback. VMware and VirtualBox are both capable options, but they'd require additional tooling and licensing complexity. Hyper-V is already there.

**Rocky Linux** because TAK Server's supported Linux platform is RHEL-based, and Rocky Linux 9 is the free, community-maintained RHEL clone that most self-hosted TAK deployments seem to converge on. It's binary-compatible with RHEL 9, well-supported, and the TAK Server RPM installs cleanly on it without the sort of dependency wrestling you sometimes get with other distributions. Ubuntu works too, but the RPM path on Rocky is cleaner.

The result is that the deployment target is a Rocky Linux 9 VM inside Hyper-V, running on your Windows host. For an airsoft scenario, that Windows host is typically a laptop or desktop you bring to the site — or a machine that stays at home if you're running over a VPN. More on that in Part 4.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-camera" aria-hidden="true" style="color: white; margin-right:5px;"></i>Snapshot-Based Rollback — The Bit That Saves Sanity

The deployment process has a number of distinct phases — VM provisioning, OS configuration, TAK Server installation, certificate generation, PostgreSQL setup, service verification. Each phase depends on the previous one, and if something goes wrong mid-way through, you want to be able to roll back to the last known good state and try again rather than starting completely from scratch.

DigitalTAK takes a Hyper-V checkpoint (snapshot) before each phase. If a phase fails, the deployment halts and leaves the VM at the last checkpoint. You fix whatever went wrong — usually a misconfigured parameter or a timing issue on first attempt — and re-run from that point.

In practice, the phases and their checkpoints are:

| Checkpoint | After |
|------------|-------|
| `TakInstall-BaseOS` | Rocky Linux installed and basic OS configured |
| `TakInstall-NetworkConfig` | Static IP assigned, hostname set, SSH hardened |
| `TakInstall-TakInstalled` | TAK Server RPM installed, PostgreSQL running |
| `TakInstall-CertsGenerated` | CA, server cert, and initial admin cert generated |
| `TakInstall-ServiceVerified` | TAK Server service running, API responding on 8443 |

If your first run completes `TakInstall-TakInstalled` and then fails on cert generation, your next run can restore `TakInstall-TakInstalled` and attempt certs again — without reinstalling the RPM or reconfiguring PostgreSQL. This makes iterative troubleshooting substantially less painful.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-route" aria-hidden="true" style="color: white; margin-right:5px;"></i>What the Deployment Actually Does, End to End

From the moment you run `Deploy-TAKServer.ps1` to the moment you have a working server, here's what happens — collapsed to the level that makes sense before we walk through it in detail in Part 4:

1. **VM Provisioning** — A new Hyper-V VM is created with a defined memory/CPU allocation, a virtual network switch, and a fresh virtual disk. The Rocky Linux 9 ISO is attached.

2. **OS Installation** — Rocky Linux is installed unattended using a Kickstart configuration file that DigitalTAK generates and provides to the VM. This handles partitioning, locale, timezone, initial user accounts, and base package selection. You don't touch the console.

3. **OS Hardening** — SSH is configured (key-based auth, root login disabled), firewall rules are applied (only the TAK ports plus SSH), SELinux is left enforced (TAK Server is designed to run under SELinux and DigitalTAK configures the required policies), and a static IP is assigned.

4. **TAK Server Installation** — The TAK Server RPM you downloaded from `tak.gov` is copied to the VM via SCP and installed with `dnf`. PostgreSQL is initialised and configured as the TAK Server database backend.

5. **Certificate Generation** — The TAK Server's built-in `makeRootCa.sh`, `makeCert.sh`, and related tools are run to generate the CA chain and server certificate. Certificate stores are configured. This is the most fiddly part of a manual install and the part that causes the most silent failures — DigitalTAK runs the steps in the correct sequence and verifies each output exists before proceeding.

6. **Service Start and Verification** — `takserver` is started, enabled for boot, and the REST API on 8443 is polled until it responds. This confirms the server is genuinely running rather than just started.

The whole process takes around 20–30 minutes on a reasonable host machine. Unattended. You run one command and come back to a working server.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-arrow-right" aria-hidden="true" style="color: white; margin-right:5px;"></i>What Comes Next

That's the architecture and the rationale. In [Part 4][1]{:target="\_blank"} we go through the actual deployment — prerequisites, the command you run, what to expect at each phase, and what to do when (not if, *when*) something doesn't go quite right the first time.

This series index: [Part 1 — What is TAK?][2]{:target="\_blank"} · [Part 2 — Understanding the Stack][3]{:target="\_blank"} · **Part 3 — What DigitalTAK Automates** · [Part 4 — Running the Deployment][4]{:target="\_blank"} · [Part 5 — Onboarding Your Team][5]{:target="\_blank"} · [Part 6 — The API Wrapper][6]{:target="\_blank"}

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: /blog/series/digitaltak-part4-running-the-deployment/
[2]: /blog/series/digitaltak-part1-what-is-tak/
[3]: /blog/series/digitaltak-part2-understanding-the-tak-stack/
[4]: /blog/series/digitaltak-part4-running-the-deployment/
[5]: /blog/series/digitaltak-part5-onboarding-your-team/
[6]: /blog/series/digitaltak-part6-takserverps-api-wrapper/
