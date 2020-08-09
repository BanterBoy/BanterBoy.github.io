---
layout: posts
author_profile: true
read_time: true
comments: true
share: true
related: true
categories:
  - Blog
tags:
  - Learning
  - PowerShell
  - Scripting
---

About 8 years ago, I started to learn PowerShell. All of my previous scripting experience with Batch Files and VBScript and of course the necessity to use additional 3rd party executables, seems like such a long time ago.

When I first began learning, I had yet to progress to some form of version control system like GitHub and all my scripts and snippets were stored locally either in a PS1 or TXT file. Anything I considered to be valuable or useful for future consumption was saved to my Microsoft OneDrive account.

Despite having a reasonable filing system and mostly using sensible filenames, there was the odd occaision where snippets of code would end up in a notes file or be saved in the wrong place. At home I was lucky enough to have a NAS solution and this also became a repository for more of the scripts I had written. As a consequence of using multiple locations, I would sometimes need to do a little searching to find some of the files. As many IT Admins will know, Windows Search can be a little flaky and also a little slow. Having spent enough time scripting in PowerShell, it was now quite easy for me to find what I was looking for using my own script. It was simple enough and also saved time from having to search manually.

```
$DaysPast = Read-Host "Enter Number of Days"
$Start = (Get-Date).AddDays(-$DaysPast)
$Path = Read-Host "Enter Search Path"
$Extension = Read-Host "Enter Extension"
    Get-ChildItem -Path $Path -Include $Extension -Recurse |
    Where-Object { $_.LastWriteTime -ge "$Start" } |
    Select-Object Directory,Name,LastWriteTime |
    Sort-Object LastWriteTime -Descending |
    Format-Table -AutoSize
Write-Host "Search of -"$Path "- Completed!"
```

This worked for me for some time but as I progressed with learning more about PowerShell, I found that scripts had their limitations but it was relatively easy to turn the above into a Function by wrapping the content.

```
Function Find-Files {
	$DaysPast = Read-Host "Enter Number of Days"
	$Start = (Get-Date).AddDays(-$DaysPast)
	$Path = Read-Host "Enter Search Path"
	$Extension = Read-Host "Enter Extension"

Get-ChildItem -Path $Path -Include $Extension -Recurse |
Where-Object { $_.LastWriteTime -ge "$Start" } |
Select-Object Directory,Name,LastWriteTime |
Sort-Object LastWriteTime -Descending |
Format-Table -AutoSize

Write-Host "Search of -"$Path "- Completed!"
}
```

This provided the basic capability of a function, was easier to use and could be added to my PowerShell profile (more on that another time) making it readily available whenever I opened a PowerShell session. Now I could just type Find-Files and enter the details for the search.

![](https://raw.githubusercontent.com/BanterBoy/BanterBoy.github.io/master/assets/images/ScriptingtoCmdLet/Example1.png)

Writing my own Functions seemed to be the next thing to I needed to learn.
