---
layout: single
title: "Stop Dot-Sourcing. Start Managing. — Introducing UserAdminModule"
excerpt: "I built a PowerShell module to solve a problem I'd been quietly ignoring for years: a $PROFILE full of dot-sourcing that I was terrified to touch. Here's what came out of it, and why you probably need it too."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "terminal"
toc_sticky: true
date: 2026-05-10 10:00:00 +0100
last_modified_at: 2026-05-10 10:00:00 +0100
categories:
    - Blog
tags:
    - PowerShell
    - Modules
    - PSGallery
    - Productivity
    - UserAdminModule
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

I've been writing PowerShell functions since roughly the time PowerShell v2 came out (October 2009 — yes, I am that old), and for most of that time I had what I'll generously call a "system" for managing them. The system was: save the file somewhere vaguely sensible, then add a dot-source line to `$PROFILE` and try not to think about it too hard.

This worked fine when I had a dozen functions. It stopped working fine when I had hundreds. At some point my `$PROFILE` had become a document nobody dared edit — 47-odd lines of dot-sourcing that reached across drives and network shares and legacy paths from machines I no longer owned. Setting up a new workstation meant half a day of updating paths and tracking down which scripts had quietly stopped working. Sharing a tool with a colleague meant zipping a folder, sending it over Teams, and then spending twenty minutes explaining the setup.

That's not a workflow. That's technical debt with a `.ps1` extension.

So I built something to fix it. And — against my better instincts — I actually published it.

---

## <i class="fas fa-question-circle" aria-hidden="true" style="color: white; margin-right:5px;"></i>What Is UserAdminModule?

**UserAdminModule** is a PowerShell function management framework. The short version: it gives your functions a home, discovers them automatically, and lets you import them by category without ever touching `$PROFILE` again.

The install is two commands:

```powershell
Install-Module UserAdminModule -Scope CurrentUser
Initialize-UserAdminModule -Path 'C:\MyModules' -UpdateProfile
```

That's it. After that, any function you drop into the right folder is available the next time you open a shell. No dot-sourcing. No manifest updates. No hardcoded lists.

The idea is simple: organise your functions into category folders — one folder per domain, one `.psm1` per folder. The module discovers them dynamically at runtime. Tab-completion works out of the box. If you'd rather browse interactively, `Invoke-PersonalModulesMenu` gives you an arrow-key menu. If you want a searchable HTML reference of every function in your library, `Open-ModuleMenuApp` opens one in the browser.

Your folder structure ends up looking something like this:

```
C:\MyModules\
├── ADFunctions\
│   ├── ADFunctions.psm1
│   └── Public\
│       ├── Get-ADUserSearch.ps1
│       ├── Reset-ADUserPassword.ps1
│       └── Get-LockedOutAccounts.ps1
├── Exchange\
│   ├── Exchange.psm1
│   └── Public\
│       ├── Connect-O365Exchange.ps1
│       └── Get-MailboxPermissions.ps1
└── Network\
    ├── Network.psm1
    └── Public\
        └── Test-PortConnectivity.ps1
```

New functions appear the moment you drop them into `Public\`. No further configuration needed.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-wrench" aria-hidden="true" style="color: white; margin-right:5px;"></i>The Bit You'll Actually Use Every Day

There are five base framework commands worth knowing about. The rest — and there is a fair bit more to it — you can discover at your own pace.

`Initialize-UserAdminModule` is the first-run setup. It creates your modules path, backs up your existing `$PROFILE`, and writes a single import line. Run it once and forget it.

`New-PSM1Module` scaffolds a new category folder. One command creates the full `Public/Private/Classes/Configuration/Resources` structure with a `.psm1` that auto-dot-sources everything in `Public\` automatically. No boilerplate to write.

```powershell
New-PSM1Module -folderPath 'C:\MyModules\HomeLabTools'
```

`Import-PersonalModules` imports a category by name. The `-Category` parameter tab-completes from whatever folders exist in your configured path — no hardcoded list, no configuration change when you add a new one.

```powershell
Import-PersonalModules -Category ADFunctions
```

`Invoke-PersonalModulesMenu` gives you the interactive version — arrow keys and Space to select multiple categories, Enter to import them all at once. Useful when you want a batch of tools loaded for a specific job.

`Invoke-FunctionIndexRegeneration` rebuilds the function index after you've added new functions. The output is both a JSON file and a Markdown file — handy if you want a reference you can open in the browser or commit to Git alongside your library.

The module also ships with a bundled Shell submodule that adds 16 UX functions — an admin-aware prompt, console sizing, PSReadLine history prediction, a random greeting on startup (this one was purely self-indulgent, I'll be honest), and a few quality-of-life bits I find genuinely useful day to day. You get all of that with `-UseSharedProfile`:

```powershell
Initialize-UserAdminModule -Path 'C:\MyModules' -UpdateProfile -UseSharedProfile
```

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-rocket" aria-hidden="true" style="color: white; margin-right:5px;"></i>Where to Get Your First Functions From

Here's the thing that prompted the "why everyone should use it" part of this post. A lot of admins — especially those just getting into serious PowerShell work — don't have a library of functions yet. They have *scripts*, maybe, but not a structured collection of reusable functions they can actually manage.

I've been maintaining [scripts.lukeleigh.com][1]{:target="\_blank"} for years as an index of everything I've written, downloaded, or amended whilst learning PowerShell. There are scripts covering Active Directory, Exchange, networking, general admin tasks — hundreds of them. You can download the whole library as a zip if you want a shortcut.

The intended workflow is: take functions from a resource like that, drop them into a category folder under your `UserAdminModule` path, and immediately have them available via tab-completion and the interactive menu. You're not locked into my functions — swap them out as you write your own, or use them as starting points to build from.

The point is that UserAdminModule gives you the structure to actually *manage* a growing library rather than just accumulating loose files. Most admins hit a point where their script collection becomes unmanageable — this is the thing that solves that, ideally before it becomes a problem rather than after.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-download" aria-hidden="true" style="color: white; margin-right:5px;"></i>Installing It

It's on the [PowerShell Gallery][2]{:target="\_blank"} — current version is 1.0.9, and it's been moving through versions fairly quickly as I've been fixing things and adding bits (five versions in two weeks, which is either impressive or slightly alarming, depending how you look at it).

```powershell
# Install from PSGallery
Install-Module UserAdminModule -Scope CurrentUser

# First-time setup — minimal (Import-Module only)
Initialize-UserAdminModule -Path 'C:\MyModules' -UpdateProfile

# Or full shell UX — admin prompt, PSReadLine history prediction, greeting
Initialize-UserAdminModule -Path 'C:\MyModules' -UpdateProfile -UseSharedProfile
```

Works on PowerShell 5.1 and 7+. The setup script auto-detects which version you're running and picks the right shared profile automatically, which was one of the fiddlier bits to get right.

If you'd rather poke around the source before installing anything, it's all on [GitHub][3]{:target="\_blank"}. The docs site at [useradminmodule.lukeleigh.com][4]{:target="\_blank"} has the full reference — Getting Started guide, the Bring Your Own Functions walkthrough, and the framework command reference.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-book-open" aria-hidden="true" style="color: white; margin-right:5px;"></i>Further Reading

There is still plenty more to dig into — submodule structure, the configuration file, sharing your library with colleagues by pointing them at a shared path or a Git repo — but this should be enough to get you started without drowning in it.

- [UserAdminModule — Documentation site][4]{:target="\_blank"}
- [UserAdminModule — GitHub][3]{:target="\_blank"}
- [UserAdminModule — PowerShell Gallery][2]{:target="\_blank"}
- [scripts.lukeleigh.com — Function library for inspiration and starting points][1]{:target="\_blank"}

If you run into anything odd or have suggestions, the [GitHub issues page][5]{:target="\_blank"} is the right place. There's no team — it's just me — so response times will depend entirely on what else is on fire that week, but I do look at it.

There is, as ever, still plenty more work to do on it. But it already does the thing I built it to do, which is more than I can say for a lot of things I've started and quietly abandoned……

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://scripts.lukeleigh.com/
[2]: https://www.powershellgallery.com/packages/UserAdminModule/1.0.9
[3]: https://github.com/BanterBoy/UserAdminModule
[4]: https://useradminmodule.lukeleigh.com/
[5]: https://github.com/BanterBoy/UserAdminModule/issues
