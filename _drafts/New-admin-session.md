---
layout: single
title: "New PowerShell Session"
excerpt: "Details on PowerShell Profiles and some useful functions"
header:
  overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
  overlay_filter: rgba(90, 104, 129, 0.7)
  teaser: /assets/images/default-teaser-image.png
classes: wide
date: 2020-08-27T08:30:00
last_modified_at: 2020-08-30T08:30:00
categories:
  - Blog
tags:
  - PowerShell
  - Admin
  - Profile
---

<script src="https://formspree.io/js/formbutton-v1.0.0.min.js" defer></script>
<script>
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
/* customize formbutton here*/     
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

# <icon class="fas fa-book"></icon> Some Guide

<div>
<a class="example-image-link" href="https://raw.githubusercontent.com/BanterBoy/BanterBoy.github.io/master/assets/images/PowerShell_5.0_icon.png" data-lightbox="example-2" data-title="Example of CmdLet"><img class="example-image" src="https://raw.githubusercontent.com/BanterBoy/BanterBoy.github.io/master/assets/images/PowerShell_5.0_icon88x88.png" alt="Example1"/></a>
<a class="example-image-link" href="https://raw.githubusercontent.com/BanterBoy/BanterBoy.github.io/master/assets/images/PowerShell_5.0_icon.png" data-lightbox="example-2" data-title="Example of CmdLet"><img class="example-image" src="https://raw.githubusercontent.com/BanterBoy/BanterBoy.github.io/master/assets/images/PowerShell_5.0_icon88x88.png" alt="Example1"/></a>
</div>

<details>
<summary>Test-IsAdmin.PS1</summary>
<p>

<script src="https://gist.github.com/BanterBoy/1bd2b984ecbbb2b0138859db02748b85.js"></script>

</p>
</details>

<details>
<summary>New-AdminShell.PS1</summary>
<p>

<script src="https://gist.github.com/BanterBoy/ee54937165b8390c75e4bb7ccae731a5.js"></script>

</p>
</details>

<details>
<summary>New-AdminTerminal.PS1</summary>
<p>

<script src="https://gist.github.com/BanterBoy/008abed0caca15ad3d0678efcf4076f5.js"></script>

</p>
</details>


<details>
<summary>Show-IsAdminOrNot.PS1</summary>
<p>

<script src="https://gist.github.com/BanterBoy/7bb9ada6555140c3aea67b5a274c2f43.js"></script>

</p>
</details>

<details>
<summary>DisplayAdmin-WindowTitle.PS1</summary>
<p>

<script src="https://gist.github.com/BanterBoy/45d2a63ac3fd87e602597be022b887d3.js"></script>

</p>
</details>

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>
