---
layout: single
title: "DigitalTAK, Part 4 — Running the Deployment: A Walkthrough of Deploy-TAKServer.ps1"
excerpt: "Prerequisites, one command, twenty minutes, a working TAK Server. Here's what actually happens, what you need before you start, and what to do when the first attempt doesn't go quite to plan."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "play-circle"
toc_sticky: true
date: 2026-05-13 07:30:00 +0000
last_modified_at: 2026-05-13 07:30:00 +0000
permalink: /blog/digitaltak-part4-running-the-deployment/
redirect_from:
  - /blog/series/digitaltak-part4-running-the-deployment/
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

Right. Enough background. Let's actually deploy something.

This post walks through running `Deploy-TAKServer.ps1` from scratch — what you need before you start, what the script does at each phase, what success looks like, and what the common failure points are. I'll be honest about the bits that don't always work first time, because pretending a complex deployment is entirely smooth does no one any favours.

By the end of this post you should have a fully running TAK Server with a verified REST API — ready for team onboarding in Part 5.

---

## <i class="fas fa-clipboard-check" aria-hidden="true" style="color: white; margin-right:5px;"></i>Prerequisites — Everything You Need Before You Start

There are five things you need before running the deployment. Three of them are software that needs to be in place on your Windows machine. Two of them require you to do something at `tak.gov` before you can proceed. I'd sort all of these out well before game day.

**1. Windows 10/11 Pro or Enterprise with Hyper-V enabled**

Hyper-V needs to be enabled in Windows Features. If you've never done this:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```

Requires a reboot. The machine also needs virtualisation enabled in BIOS/UEFI — if Hyper-V refuses to start, that's usually why.

**2. PowerShell 7+**

DigitalTAK is written for PowerShell 7. Not Windows PowerShell 5.1. They're both called "PowerShell" which causes confusion, but `pwsh.exe` is 7 and `powershell.exe` is 5.1. Check yours:

```powershell
$PSVersionTable.PSVersion
```

If it's less than 7, download from [GitHub][1]{:target="\_blank"} or `winget install Microsoft.PowerShell`.

**3. Posh-SSH**

DigitalTAK uses `Posh-SSH` for the SSH connections it makes to the Rocky Linux VM during deployment. Install it from the PowerShell Gallery:

```powershell
Install-Module -Name Posh-SSH -Scope CurrentUser
```

**4. Rocky Linux 9 ISO**

Download the minimal ISO from [rockylinux.org][2]{:target="\_blank"}. The minimal ISO is sufficient — DigitalTAK's Kickstart configuration handles package selection from there. Note the path where you save it; you'll need it as a parameter.

**5. TAK Server RPM from tak.gov**

This is the one that catches people out. You need an account at [tak.gov][3]{:target="\_blank"}, and the account requires MFA to be configured before you can download anything. The process is: register → verify email → set up MFA (TOTP) → log in → download the TAK Server RPM for RHEL/Rocky.

The filename will be something like `takserver-5.x-RELEASE.noarch.rpm`. Note the path. **This file is not redistributable** — you must download it yourself with your own account. DigitalTAK does not and cannot include it.

Sort the `tak.gov` account out at least a day before you need it. The account verification process occasionally takes time, and you don't want to be doing this the morning of game day.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-download" aria-hidden="true" style="color: white; margin-right:5px;"></i>Getting DigitalTAK

Clone the repository and import the modules:

```powershell
git clone https://github.com/BanterBoy/DigitalTAK.git
Set-Location DigitalTAK

Import-Module .\Modules\TAKInstall\TAKInstall.psd1
Import-Module .\Modules\TAKDeploy\TAKDeploy.psd1
```

You'll run the deployment from the `DigitalTAK` directory. The deployment script expects to find the modules at relative paths, so don't move things around.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-terminal" aria-hidden="true" style="color: white; margin-right:5px;"></i>Running the Deployment

Prepare your credentials. You'll need three:

```powershell
# Your Windows admin credentials (for Hyper-V operations)
$cred = Get-Credential

# The root password you want to set on the Rocky Linux VM
$rootPw = Read-Host -AsSecureString "Root password"

# The keystore password for TAK Server certificates
$ksPw = Read-Host -AsSecureString "Keystore password"
```

Then run the deployment:

```powershell
.\Deploy-TAKServer.ps1 `
    -Credential $cred `
    -RootPassword $rootPw `
    -KeystorePassword $ksPw `
    -RockyISOPath "C:\ISOs\Rocky-9.7-x86_64-minimal.iso" `
    -TAKServerRPMPath "C:\Downloads\takserver-5.2-RELEASE.noarch.rpm" `
    -VMName "TAKServer" `
    -VMIPAddress "10.10.0.154" `
    -VMSwitch "Default Switch"
```

And then you wait. The deployment is designed to be unattended — you shouldn't need to intervene. Progress is written to the console as each phase completes. A Hyper-V checkpoint is taken after each phase, so if something fails you'll see which phase it failed at and can resume from the previous checkpoint.

Total runtime on a reasonably modern machine with an SSD: 20–30 minutes.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-check-circle" aria-hidden="true" style="color: white; margin-right:5px;"></i>What Success Looks Like

When the deployment completes successfully, you'll see output confirming:

- TAK Server service is running (`systemctl status takserver`)
- REST API responding on port 8443
- WebTAK reachable at `https://<VM-IP>:8443/webtak/`
- Admin certificate generated and path reported

The script will print the WebTAK URL and the path to the generated admin `.p12` certificate. Open the WebTAK URL in a browser — you'll get a certificate warning (expected, since it's your private CA — add an exception) and then the WebTAK login page.

Log in with the default admin credentials that were configured during the Kickstart installation. Change them immediately. Then verify you can see the map and the server status page.

At this point, you have a working TAK Server. The deployment is done. Everything from here is onboarding.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-exclamation-triangle" aria-hidden="true" style="color: white; margin-right:5px;"></i>Common Failure Points (and What to Do)

I said I'd be honest. Here are the things that go wrong most often on a first run.

**VM networking — the static IP doesn't respond**

This usually means the Hyper-V virtual switch isn't configured the way the script expects. `Default Switch` in Hyper-V uses NAT and provides DHCP, but the static IP assignment in the Kickstart config needs to match your switch's subnet. If you've changed the default network configuration or are using an external switch, adjust `-VMIPAddress` and `-VMSwitch` to match.

Check: can you ping the VM IP from your host after the OS installation phase? If not, it's a switch/network configuration issue and the SSH-based phases won't work.

**SSH connection refused during OS configuration**

This typically means the Kickstart installation took longer than expected (slower machines, slow ISO read speeds) and the script tried to SSH in before the VM was ready. The snapshot at `TakInstall-BaseOS` will still be there — restore it and re-run from that point. DigitalTAK has retry logic, but if your machine is significantly slower than average you may need to adjust the wait timeouts in the configuration.

**Certificate generation fails silently**

TAK Server's certificate generation scripts are shell scripts that run on the VM via SSH. If they fail, they don't always produce an obvious error — they just don't create the output files. This is almost always caused by the keystore password containing characters that don't survive the SSH command quoting. Stick to alphanumeric characters and hyphens for the keystore password on first run.

**TAK Server service starts but WebTAK doesn't respond**

Give it a minute. TAK Server sometimes takes 60–90 seconds after the service starts before WebTAK is fully initialised. The deployment script polls the API, but if you've jumped ahead manually, just wait and refresh.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-arrow-right" aria-hidden="true" style="color: white; margin-right:5px;"></i>What Comes Next

You've got a server. Now you need to get your team onto it. That's [Part 5][4]{:target="\_blank"} — certificates, user accounts, group assignments, and ATAK data packages.

This series index: [Part 1 — What is TAK?][5]{:target="\_blank"} · [Part 2 — Understanding the Stack][6]{:target="\_blank"} · [Part 3 — What DigitalTAK Automates][7]{:target="\_blank"} · **Part 4 — Running the Deployment** · [Part 5 — Onboarding Your Team][8]{:target="\_blank"} · [Part 6 — The API Wrapper][9]{:target="\_blank"}

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://github.com/PowerShell/PowerShell/releases
[2]: https://rockylinux.org/download
[3]: https://tak.gov/
[4]: /blog/series/digitaltak-part5-onboarding-your-team/
[5]: /blog/series/digitaltak-part1-what-is-tak/
[6]: /blog/series/digitaltak-part2-understanding-the-tak-stack/
[7]: /blog/series/digitaltak-part3-what-digitaltak-automates/
[8]: /blog/series/digitaltak-part5-onboarding-your-team/
[9]: /blog/series/digitaltak-part6-takserverps-api-wrapper/
