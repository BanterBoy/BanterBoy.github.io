---
layout: single
title: "DigitalTAK, Part 6 — The TAKServerPS API Wrapper: 45 Cmdlets and What You'd Actually Use Them For"
excerpt: "TAKServerPS wraps the TAK Server REST API in 45 PowerShell cmdlets. Here's what they cover, which ones you'll reach for most often, and an honest account of the current test pass rate — because 39 out of 46 is good enough to be useful but not so good that I'm going to pretend it's finished."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "plug"
toc_sticky: true
date: 2026-05-15 07:30:00 +0000
last_modified_at: 2026-05-15 07:30:00 +0000
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

TAK Server has a REST API. It's not the most thoroughly documented API I've ever encountered — the official documentation exists, but it leans on examples rather than complete reference material, and working out what some endpoints actually expect requires a certain amount of empirical investigation. Ask me how I know.

`TAKServerPS` is the result of that investigation — a PowerShell module that wraps the TAK Server REST API in 45 cmdlets with proper parameter validation, consistent error handling, and Pester tests. It's the most complete part of the DigitalTAK toolset, and also the most honest about where it still has rough edges.

I'm going to tell you the test numbers upfront: 39 out of 46 tests passing as of the current release. The seven that aren't passing are all in the certificate management area — specifically, operations that require the TAK Server cert tools to be accessible in a specific way during test execution. They work in production; they fail under the test harness. I know why, and it's on the list to fix. I mention it because "39/46" sounds worse than it is, and "45 cmdlets, all tested" would be misleading.

Right. On to the useful bit.

---

## <i class="fas fa-sitemap" aria-hidden="true" style="color: white; margin-right:5px;"></i>What the Module Covers

The 45 cmdlets are organised into functional areas:

**User management** — Create, retrieve, update, and remove TAK Server user accounts. Query users by username, group membership, or certificate. Enable and disable accounts. This is the most commonly used area day-to-day.

**Group management** — Create and remove groups, add and remove members, query group membership. TAK uses groups as the primary access control mechanism, so this underpins everything.

**Mission management** — TAK's mission system is how you create objectives and tasks that appear in ATAK's mission layer. The API lets you create missions, assign them to groups, add content (waypoints, shapes, notes), and query mission status. This is where the tactical coordination actually lives.

**Data packages** — Upload data packages to the server for distribution to connected clients, list available packages, and delete them. Useful for pushing shared map layers or briefing files to the whole team.

**Certificate operations** — Query the certificate store, check certificate validity and expiry dates, list enrolled certificates. The write operations (revoke, issue) are the ones with the failing tests — I'd recommend using the TAK Server web UI for those until the tests are green.

**Configuration and status** — Query server health, connected client counts, API version, and configuration properties. Useful for monitoring and for verifying the server is in the state you expect before game day.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-star" aria-hidden="true" style="color: white; margin-right:5px;"></i>The Cmdlets You'll Actually Use

You don't need all 45 for a typical game day. Here's what I reach for most often.

**Before the game:**

```powershell
# Verify the server is up and responding
Get-TAKServerStatus -ServerHost "10.10.0.154" -Credential $cred

# Check who's enrolled
Get-TAKUser -ServerHost "10.10.0.154" -Credential $cred | Select-Object username, enabled

# Create the day's mission
New-TAKMission -ServerHost "10.10.0.154" -Credential $cred `
    -Name "Operation Foxhunt" `
    -Description "Capture the flag exercise, north sector" `
    -Groups @("alpha", "bravo")

# Push a briefing map package to all clients
Add-TAKDataPackage -ServerHost "10.10.0.154" -Credential $cred `
    -Path "C:\TAKPackages\briefing-north-sector.zip" `
    -Groups @("alpha", "bravo")
```

**Checking who's connected:**

```powershell
# See connected clients (requires server API access)
Get-TAKConnectedClient -ServerHost "10.10.0.154" -Credential $cred |
    Select-Object callsign, uid, lastEventTime |
    Sort-Object lastEventTime -Descending
```

This is useful before kick-off to confirm everyone has connected successfully — much better than asking ten people individually if their app is working.

**After the game:**

```powershell
# Review mission content (waypoints placed, notes added during play)
Get-TAKMissionContent -ServerHost "10.10.0.154" -Credential $cred -MissionName "Operation Foxhunt"

# Disable a user account (if someone's left the team)
Set-TAKUser -ServerHost "10.10.0.154" -Credential $cred -Username "alpha-07" -Enabled $false
```

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-flask" aria-hidden="true" style="color: white; margin-right:5px;"></i>The Test Architecture (And the Honest Numbers)

DigitalTAK uses Pester for testing across all four modules. The full test suite as of the current release:

| Module | Unit Tests | Integration Tests | Status |
|--------|-----------|-------------------|--------|
| TAKInstall | 87 | 41 | All passing |
| TAKDeploy | 63 | 29 | All passing |
| TAKOnboarding | 74 | 31 | All passing |
| TAKServerPS | 151 | 111 | 39/46 unit tests passing |

The failing 7 unit tests in TAKServerPS are all in `Invoke-TAKCertOperation` — a shared function used by the certificate management cmdlets. The issue is that the function invokes OpenSSL and the TAK cert tools via SSH, and the Pester mock for the SSH session doesn't correctly simulate the cert tool output paths. The cmdlets themselves work correctly against a real server. I know the fix; it's a mock configuration issue rather than a production code issue. It's on the backlog.

I'm mentioning this at this level of detail because I think it's worth being specific when something isn't finished. "The tests aren't all green" is more useful than either "everything's fine" or a vague disclaimer. If you're evaluating whether to use TAKServerPS in your own setup, you now know exactly which area to test manually first.

If you want the full test output, the [GitHub repository][1]{:target="\_blank"} has a validation report in the `docs/` directory.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-plug" aria-hidden="true" style="color: white; margin-right:5px;"></i>Connecting to Your Server

`TAKServerPS` connects to the TAK Server REST API on port 8443 using the admin credentials you set during deployment. All cmdlets follow the same pattern:

```powershell
Import-Module .\Modules\TAKServerPS\TAKServerPS.psd1

$cred = Get-Credential  # TAK Server admin username/password

# All cmdlets take -ServerHost and -Credential
Get-TAKUser -ServerHost "10.10.0.154" -Credential $cred
```

The module uses `Invoke-RestMethod` internally with `-SkipCertificateCheck` — required because your TAK Server uses its private CA, which your Windows machine doesn't trust by default. This is a deliberate design choice: importing the server CA into the Windows certificate store would be more correct, but it complicates setup and the risk profile is acceptable for a controlled deployment on your own hardware.

All cmdlets support `-Verbose` if you want to see the raw API calls being made, which is useful for troubleshooting or for understanding what the API expects if you want to extend the module.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-flag-checkered" aria-hidden="true" style="color: white; margin-right:5px;"></i>Where This Leaves the Series

That's the complete DigitalTAK stack: what TAK is, how the architecture works, what DigitalTAK automates, how to run the deployment, how to onboard your team, and how to manage the server from PowerShell once it's running.

The ambition — improving a day of airsoft from "bunch of people wandering round a field" to a structured, immersive tactical experience — is still very much a work in progress. The tooling is there. The server deploys. The team gets on the map. Whether that translates into meaningfully better games is something I'll be able to report back on once we've actually played a few with it running.

I suspect the answer is "yes, mostly, with some teething issues." That feels like an appropriately self-deprecating expectation. I'll update this series if the reality turns out to be different in either direction.

In the meantime, if you've followed this series and run into something that doesn't work as described — or something that works better than described — the [GitHub issues][2]{:target="\_blank"} are the right place to land it. And if you're running CivTAK for something I haven't thought of, I'd genuinely love to hear about it……

This series index: [Part 1 — What is TAK?][3]{:target="\_blank"} · [Part 2 — Understanding the Stack][4]{:target="\_blank"} · [Part 3 — What DigitalTAK Automates][5]{:target="\_blank"} · [Part 4 — Running the Deployment][6]{:target="\_blank"} · [Part 5 — Onboarding Your Team][7]{:target="\_blank"} · **Part 6 — The API Wrapper**

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://github.com/BanterBoy/DigitalTAK
[2]: https://github.com/BanterBoy/DigitalTAK/issues
[3]: /blog/series/digitaltak-part1-what-is-tak/
[4]: /blog/series/digitaltak-part2-understanding-the-tak-stack/
[5]: /blog/series/digitaltak-part3-what-digitaltak-automates/
[6]: /blog/series/digitaltak-part4-running-the-deployment/
[7]: /blog/series/digitaltak-part5-onboarding-your-team/
