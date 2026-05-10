---
layout: single
title: "New-Shell — Stop Right-Clicking, Start Scripting"
excerpt: "One function, five ways to open a PowerShell session. Standard, elevated, as a different user, in Windows Terminal, elevated in Windows Terminal.<br> Part of the UserAdminModule."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.75)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "New-Shell"
toc_icon: "terminal"
toc_sticky: true
date: 2026-05-10 04:00:00 +0000
last_modified_at: 2026-05-10 04:00:00 +0000
categories:
    - Blog
    - Module
tags:
    - PowerShell
    - UserAdminModule
    - Scripting
    - Admin
    - Windows Terminal
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
      { type: "email", label: "Email:", name: "email", required: true, placeholder: "your@email.com" },
      { type: "textarea", label: "Message:", name: "message", required: true, placeholder: "What's on your mind?" },
      { type: "submit" }
    ],
    styles: {
      fontFamily: "Roboto", fontSize: "1em",
      title: { background: "#999999" },
      button: { background: "#999999" }
    },
    initiallyVisible: false
  });
</script>

{: .text-right}
<span style="font-size:11px;"><button onclick="window.print()"><i class="fas fa-print" aria-hidden="true" style="color: black; margin-right:5px;"></i>Print</button></span>

Right-click. *Run as Administrator.* UAC prompt. Click Yes. New window appears. Realise you actually wanted PowerShell Core, not Windows PowerShell. Close it. Right-click again……

I know, I know. It's fine. Completely fine. Nothing about doing that forty times a day is remotely maddening.

Except it is, obviously, and at some point I got fed up enough to do something about it. The result was `New-Shell` — a function that's been quietly sitting in the [UserAdminModule][1]{:target="\_blank"} doing exactly this one job ever since. You call it, you pass it a parameter, you get a shell. Standard, elevated, as a different user, in Windows Terminal — it's all in there. No mousing required.

---

# <i class="fas fa-terminal" aria-hidden="true" style="color: white; margin-right:5px;"></i> What New-Shell Does

At its core, `New-Shell` is a well-behaved wrapper around `Start-Process`. That's not a criticism — it's doing all the bits you'd otherwise have to get right yourself every time: detecting whether your current session is already elevated, checking that the executable you're trying to launch actually exists before it tries, handling credential objects correctly for alternate-user sessions, and packaging all of that into five distinct parameter sets with a consistent interface.

Here's the map:

| Parameter | What you get |
|-----------|-------------|
| `-User` | A standard (non-elevated) shell — Windows PowerShell or pwsh |
| `-RunAs` | An elevated shell — Windows PowerShell or pwsh |
| `-RunAsUser` | A shell running as a different user — requires `-Credentials` |
| `-Terminal` | A shell in Windows Terminal |
| `-TerminalRunAs` | An elevated shell in Windows Terminal |

One small thing worth mentioning: if you're already in an elevated session and you try to open another elevated one, it'll warn you rather than silently doing it. It's a minor thing, but the kind of detail that saves you briefly wondering why you've got two admin sessions open and which one you're actually working in.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

# <i class="fas fa-sliders-h" aria-hidden="true" style="color: white; margin-right:5px;"></i> The Parameter Sets

Each mode is a separate parameter set, which means the options available to you change depending on which one you're using. Here's what each gives you.

### -User — Standard Session

```powershell
New-Shell -User pwsh
New-Shell -User PowerShell
```

Opens a fresh shell at your current privilege level. `pwsh` for PowerShell Core, `PowerShell` for Windows PowerShell. If the executable can't be found on the system, it'll tell you so — no silent failures.

### -RunAs — Elevated Session

```powershell
New-Shell -RunAs pwshRunAs
New-Shell -RunAs PowerShellRunAs
```

Launches an elevated shell using the `-Verb RunAs` pattern, so yes, UAC will fire if it's enabled. At least you're only clicking once rather than right-clicking, finding the option, and then clicking Yes. Every click you can eliminate is a victory, I maintain.

### -RunAsUser — A Different User's Session

```powershell
New-Shell -RunAsUser pwshRunAsUser -Credentials (Get-Credential)
New-Shell -RunAsUser PowerShellRunAsUser -Credentials (Get-Credential)
```

This is, in my experience, the most useful mode in day-to-day admin work. You need to test a script running as a service account. You need to verify permissions for a particular user. You need to check something in an environment where your current credentials don't have access. Feed it a `PSCredential` object — `(Get-Credential)` works perfectly well — and you've got a shell running as whoever you need.

There are three additional optional parameters that work alongside `-RunAsUser`:

**`-ForceNewWindow`** forces the session to launch in a dedicated console window. This matters more than you'd initially think. If you're calling `New-Shell` from something like a Stream Deck button, or from a script running inside an automation host that doesn't surface child process windows, the shell can launch silently and invisibly without this switch. `-ForceNewWindow` routes through `cmd.exe /c start` to guarantee you actually get a window you can see.

**`-ShellArgumentList`** lets you pass additional arguments to the shell executable — useful if you want to jump straight into a specific script or initial command when the window opens.

**`-WindowTitle`** sets a custom title for the console window when using `-ForceNewWindow`. Handy when you've got several alternate-user sessions running at once and you need to tell them apart at a glance.

### -Terminal — Windows Terminal

```powershell
New-Shell -Terminal pwshTerminal
New-Shell -Terminal PowerShellTerminal
```

Opens a new tab in Windows Terminal. Requires `wt.exe` to be installed and findable on the system — if it isn't, the function says so rather than throwing something unhelpful. `pwshTerminal` opens the PowerShell Core profile, `PowerShellTerminal` opens the Windows PowerShell profile.

### -TerminalRunAs — Elevated Windows Terminal

```powershell
New-Shell -TerminalRunAs pwshTerminalRunAs
New-Shell -TerminalRunAs PowerShellTerminalRunAs
```

Same as `-Terminal`, elevated. Windows Terminal gets the UAC prompt and opens at admin level. Everything in the resulting session has elevated privileges — which is exactly what you want when you want it.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

# <i class="fas fa-code" aria-hidden="true" style="color: white; margin-right:5px;"></i> Examples in the Wild

Here are the scenarios I actually reach for this in.

**Quick elevated session for a one-off task:**

```powershell
New-Shell -RunAs pwshRunAs
```

UAC fires, click Yes, elevated pwsh window opens. Faster than finding the taskbar icon and right-clicking it.

**Testing a script that runs as a service account:**

```powershell
$cred = Get-Credential -UserName 'DOMAIN\svc-myapp' -Message 'Service account credentials'
New-Shell -RunAsUser pwshRunAsUser -Credentials $cred
```

You fill in the credentials once and you've got a shell running as that service account. Particularly useful when you're debugging a scheduled task that keeps failing in ways you can't reproduce in your own session — (yes, we've all been there, yes it's always the credentials, yes I am aware of the irony of writing a function about this).

**An alternate-user session with a window you can actually identify:**

```powershell
$cred = Get-Credential
New-Shell -RunAsUser pwshRunAsUser -Credentials $cred -ForceNewWindow -WindowTitle 'SVC-MyApp Session'
```

When you've got three shells open and need to know which is which without reading the prompt every time, a named window title is quietly invaluable.

**Launching from a Stream Deck or automation tool:**

```powershell
New-Shell -RunAsUser pwshRunAsUser -Credentials $storedCred -ForceNewWindow -WindowTitle 'Admin Shell'
```

Without `-ForceNewWindow`, certain hosts eat the child process completely. With it, you get a visible console window reliably, regardless of where the call originated.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

# <i class="fas fa-download" aria-hidden="true" style="color: white; margin-right:5px;"></i> Getting It

`New-Shell` is part of the [UserAdminModule][1]{:target="\_blank"}. You can read the full function documentation and grab the script directly from the [scripts.lukeleigh.com][2]{:target="\_blank"} page, or download the whole module from the [GitHub releases][3]{:target="\_blank"}.

A couple of prerequisites worth noting before you reach for the Terminal and Windows Terminal parameter sets:

- **PowerShell Core** (`pwsh.exe`) — available from the [PowerShell GitHub releases page][4]{:target="\_blank"}, or via `winget install Microsoft.PowerShell`
- **Windows Terminal** (`wt.exe`) — available from the [Microsoft Store][5]{:target="\_blank"}, or via `winget install Microsoft.WindowsTerminal`

The function checks for both at runtime and errors clearly if they're missing, so it won't silently do nothing and leave you wondering. Found a bug or want to suggest something? The [GitHub issues page][6]{:target="\_blank"} is the right place — please do open one if something's not behaving.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

[1]: https://scripts.lukeleigh.com/useradminmodule/shell/new-shell/
[2]: https://scripts.lukeleigh.com/menu/_pages/UserAdminModule.html
[3]: https://github.com/BanterBoy/scripts-blog/releases/download/v2.0/Powershellv2.0.zip
[4]: https://github.com/PowerShell/PowerShell/releases
[5]: https://aka.ms/terminal
[6]: https://github.com/BanterBoy/scripts-blog/issues
