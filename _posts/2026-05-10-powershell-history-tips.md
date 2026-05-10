---
layout: single
title: "Your PowerShell History is Smarter Than You Think"
excerpt: "PSReadLine has been quietly saving your command history for years. Here are the bits most admins never get around to discovering — including the # search trick that I embarrassingly only found recently."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "terminal"
toc_sticky: true
date: 2026-05-10
last_modified_at: 2026-05-10
categories:
    - Blog
tags:
    - PowerShell
    - PSReadLine
    - Tips
    - Productivity
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

So there I was, staring at a terminal session I'd had open for the better part of a working day, trying desperately to remember the exact `netsh` incantation I'd used about three hours earlier to check a specific interface binding. I knew I'd typed it. I'd seen it work. It was definitely *in there* somewhere. I just couldn't remember the exact syntax, and my brain — after what had been a fairly punishing day of firewall migrations and coffee — wasn't playing ball.

Sound familiar? If you've spent any meaningful time at a PowerShell prompt, I'd bet it does.

Here's the thing though: PowerShell has had decent history tooling built right in for years, and most admins barely scratch the surface of it. I was one of those admins for an embarrassingly long time. This isn't a post about anything exotic — it's just a collection of genuinely useful things that I wish someone had pointed out to me earlier, before I'd lost hours to "hang on, what was that command again……"

---

## <i class="fas fa-history" aria-hidden="true" style="color: white; margin-right:5px;"></i>The Basics You Probably Already Know

PowerShell tracks your session commands automatically. You can see them with:

```powershell
Get-History
```

Each command gets an `Id`, so if you want to re-run one:

```powershell
Invoke-History -Id 42
```

Or if you just want to grab the last thing you ran:

```powershell
Invoke-History
```

You can also pipe `Get-History` into `Where-Object` to filter, which is handy once the list gets long:

```powershell
Get-History | Where-Object { $_.CommandLine -like '*netsh*' }
```

That much most people have figured out. But here's where it gets a bit more useful……

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-save" aria-hidden="true" style="color: white; margin-right:5px;"></i>Tip 1: Your History Persists Across Sessions (and You Can Make It Bigger)

This one genuinely surprised me when I first noticed it. If you're running PowerShell 5.1 or later — which you almost certainly are — PSReadLine is saving your history to a file automatically. Not just the current session. All of it. Every time you open a new terminal, that history is loaded back in.

You can find out exactly where it's being saved with:

```powershell
(Get-PSReadLineOption).HistorySavePath
```

On most Windows machines this drops out somewhere like `C:\Users\YourName\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt`. It's a plain text file, one command per line. You can open it, search it, copy from it — whatever you need.

By default PSReadLine stores the last 4096 commands. For most people that's plenty, but if you're the kind of admin who lives in a terminal all day across long-running investigations or deployments, you might want more. Set it like this:

```powershell
Set-PSReadLineOption -MaximumHistoryCount 10000
```

To make it permanent, add that line to your PowerShell profile (`$PROFILE`). If you're not sure about profile files, I wrote a bit about those [here][1]{:target="\_blank"} — worth a look if you haven't set one up.

One thing worth knowing: PSReadLine won't save duplicate consecutive commands by default. If you're hammering `Get-Service` over and over, it only records it once. That's usually exactly what you want, but it's good to be aware of. You can control this behaviour with:

```powershell
Set-PSReadLineOption -HistoryNoDuplicates $true
```

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-search" aria-hidden="true" style="color: white; margin-right:5px;"></i>Tip 2: The `#` Search Trick (Honestly My Favourite)

Right, this is the one I actually wanted to write the post about. Everything else was mostly context.

At a PowerShell prompt, type a `#` character followed by part of a previous command, then press `Tab`. PSReadLine will cycle through your history, matching entries that contain whatever you typed after the `#`.

```powershell
#netsh<Tab>
```

That'll walk you backwards through every command in your history that contains the word `netsh`. Keep pressing `Tab` and it keeps cycling. `Shift+Tab` goes the other direction if you overshoot.

No piping. No `Where-Object`. Just `#`, a fragment, and Tab. Took me an embarrassingly long time to discover that one — I can tell you are all on the edge of your seats with that revelation.

If you prefer a more interactive approach, `Ctrl+R` gives you an incremental reverse search (same as Bash, if you've come from a Linux background). Start typing and it narrows in real time. Press `Ctrl+R` again to cycle backwards through matches, `Ctrl+S` to go forwards. Press `Enter` when you've found what you want, or `Escape` to bail out without running anything.

Both approaches get you to the same place — the `#` trick is quicker for short queries, `Ctrl+R` is better when you're not quite sure what you're looking for and want to browse.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-lock" aria-hidden="true" style="color: white; margin-right:5px;"></i>A Quick Note on Sensitive Commands

Because the history file is a plain text file sitting in your AppData folder, it's worth being conscious of what ends up in there. Commands that include passwords inline, connection strings with credentials, that sort of thing — they'll persist to disk in plaintext. Something to bear in mind if you're on a shared machine, or if you're in the habit of pasting credentials directly into commands (which, well, let's not go down that path).

You can exclude specific terms from being saved to the history file with:

```powershell
Set-PSReadLineOption -AddToHistoryHandler {
    param([string]$line)
    return $line -notmatch 'password|credential|secret'
}
```

That's a very basic example — you'd obviously want to tune the pattern to your own situation — but it gives you the idea.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

## <i class="fas fa-book-open" aria-hidden="true" style="color: white; margin-right:5px;"></i>Further Reading

If this has sparked an interest in PSReadLine more generally, the module has a lot more going on than just history management. Key bindings, prediction, syntax colouring — it's well worth a proper look:

- [PSReadLine on GitHub][2]{:target="\_blank"}
- [about_PSReadLine — Microsoft Docs][3]{:target="\_blank"}
- [Get-PSReadLineKeyHandler][4]{:target="\_blank"} — brilliant for seeing every key binding at once

And if you've never set up a PowerShell profile, [that post I linked earlier][1]{:target="\_blank"} is as good a place as any to start. Profiles and persistent history together are one of those quality-of-life combinations that quietly make a big difference to a day of terminal work.

There is, as ever, still plenty more to explore — but these should be enough to stop you losing half an hour hunting for a command you definitely typed earlier. Which was the whole point, really……

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://blog.lukeleigh.com/blog/The-PowerShell-Profile/
[2]: https://github.com/PowerShell/PSReadLine
[3]: https://learn.microsoft.com/en-us/powershell/module/psreadline/about/about_psreadline
[4]: https://learn.microsoft.com/en-us/powershell/module/psreadline/get-psreadlinekeyhandler
