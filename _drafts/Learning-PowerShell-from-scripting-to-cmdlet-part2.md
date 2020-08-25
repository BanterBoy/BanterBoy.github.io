---
layout: single
title: "Learning PowerShell From Scripting To CmdLet Part 2"
excerpt: "Part two in a series of posts detailing my journey in learning PowerShell"
header:
  overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
  overlay_filter: rgba(90, 104, 129, 0.7)
  teaser: /assets/images/default-teaser-image.png
classes: wide
categories:
  - Blog
  - Series
  - PowerShell
tags:
  - Learning
  - PowerShell
  - Scripting
---

In my previous article, I explained how I ended up at the point where I needed to understand more about *PowerShell* functions in order to improve my scripting. Like many IT Admins who were scripting in *PowerShell*, I was already using functions within my scripts but I had never written my own. There are a lot of useful resources on the internet and plenty of clever people providing access to scripts and functions they had written and made available via opensource solutions like [GitHub][1]{:target="_blank"} and places like the [Microsoft TechNet Script Center][2]{:target="_blank"}.

Back in my days of writing batch files and VBScripts, these resources were also very useful in helping to resolve an issue or include additional functionality to the scripts I was writing. Much of what I had written previously was assisted by the many individuals who were far better at writing what could frequently become quite baffling to produce myself. With the advent of *PowerShell*, these same familiar resources were fuelling my curiosity and aiding my ability to understand this very flexible administration language making it easier to adapt for my own uses. *PowerShell* was much easier to understand due to the incredible help function, that in my opinion, far surpassed previous command line scripting help.

I found that whenever I had to fix something or perhaps had to extract information from ActiveDirectory, the first question I would ask myself was **"How do you do that in PowerShell?"**. The early days of *PowerShell* were a rough ride and often there was a necessity to understand programming concepts and utilise .Net in ways that were far more complicated than the current versions. It still appeared that most of the functions and scripts were being written by those with knowledge of .Net development and some more hardcore admins with a background in programming. Something that up until then, I had limited experience with and had largely been while assisting development departments with their issues.

Creating a basic function is relatively simple and according to the documentation the simplest functions have the following format:

```powershell
function function-name {statements}

# Example

function Get-BIOSInfo {
  Get-ComputerInfo -Property BiosManufacturer,BiosFirmwareType,BiosReleaseDate,BiosSMBIOSBIOSVersion,BiosVersion
}

# Functions do not have to be complicated to be useful.
```
More often than not, the functions I have created for my scripts have been a simple wrapper to a frequently used command, very much like the example above. It is however possible to make the functions a bit more useful by being able to enter parameters, as you would 

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://github.com/search?q=powershell
[2]: https://gallery.technet.microsoft.com/scriptcenter/site/search?query=powershell&f%5B0%5D.Value=powershell&f%5B0%5D.Type=SearchText&ac=4

