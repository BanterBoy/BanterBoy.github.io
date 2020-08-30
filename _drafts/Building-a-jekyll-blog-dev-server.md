---
layout: single
title: "Why on earth did I build a Docker Container?"
excerpt: "Erm...because I decided to test my posts before <br> publishing my Blog? Yep, I am doing that now."
header:
  overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
  overlay_filter: rgba(90, 104, 129, 0.7)
  teaser: /assets/images/default-teaser-image.png
classes: wide
date: "2020-08-28 08:00"
categories:
  - Blog
  - Build
tags:
  - Docker
  - Jekyll
  - GitHub
  - PowerShell
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

![Travis (.com)](https://img.shields.io/travis/com/BanterBoy/BanterBoy.github.io?logo=travis&style=plastic)

# <i class="fas fa-book" aria-hidden="true" style="color: white; margin-right:5px;"></i> Overview

In this article I explain the technology used to create my blog and the steps involved in the setup. It is a little convoluted but I believe this is due to the choice of technology used for the hosting, which I selected in a bid to ensure it was possible to replicate this setup for a very small price or indeed completely free.

## <i class="fas fa-microchip" aria-hidden="true" style="color: white; margin-right:5px;"></i> Technology List for Blog

This is a comprehensive list of technology used to produce my blog site. Many of these are optional (indicated with *) and not needed to create a simple blog but I was having so much fun learning new things, that I got a little carried away.

|---|---|---|---|---|
| Google Domains | Google Analytics | Google Tag Manager | GSuite | [<i class="fas fa-robot" aria-hidden="true" style="color: white; margin-right:5px;"></i>Imgbot.net*][1]{:target="_blank"} |
| GitHub Pages | GitHub | Git | GitHub Desktop | Markdown |
| Jekyll | YaML | HTML | CSS | JavaScript |
| 2FA | Docker Desktop | Docker CLI | Linux WSL | PowerShell |
| Domain Name| DNS | formspree.io | vscode | cookiebot.com |
| Google Authenticator | shields.io | simpleicons.org | fontawesome.com | travis-ci.com |
| algolia.com |  |  |  |  |

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## <i class="fas fa-code-branch" aria-hidden="true" style="color: white; margin-right:5px;"></i> Heading

Some text goes here.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## <i class="fas fa-code-branch" aria-hidden="true" style="color: white; margin-right:5px;"></i> Heading

Some text goes here.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>


[1]: https://github.com/marketplace/imgbot