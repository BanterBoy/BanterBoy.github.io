---
layout: single
title: "Why on earth did I build a Docker Container?"
excerpt: "Err...because I decided to test my posts before <br> publishing my Blog? Yep, I am doing that now."
header:
  overlay_image: /assets/images/docker/horizontal-logo-monochromatic-white.png
  overlay_filter: rgba(90, 104, 129, 0.7)
  teaser: /assets/images/docker/homepage-docker-logo.png
classes: wide
date: 2020-08-30T09:30:00
last_modified_at: 2020-08-30T08:30:00
collection:
  - Series
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

{: .text-right}
<span style="font-size:11px;"><button onclick="window.print()"><i class="fas fa-fw fa-print" aria-hidden="true" style="color: black; margin-right:5px;"></i>Print</button></span>

# <i class="fas fa-book" aria-hidden="true" style="color: white; margin-right:5px;"></i> Overview

In this article I explain the technology used to create my blog and the steps involved in the setup. The rather large list of technology used makes this a seemingly complex 
. Much of the decision was to create a customised setup which was easy to maintain for a very small price. In order to do so, I have ended up with 

## <i class="fas fa-microchip" aria-hidden="true" style="color: white; margin-right:5px;"></i> Technology List for Blog

This is a comprehensive list of technology used to produce my blog site. Many of these are optional and are not needed to create a simple blog but I was having so much fun learning new things, that I got a little carried away.

|---|---|---|---|---|
| [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Domains][1]{:target="_blank"} | [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Analytics][2]{:target="_blank"} | [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Tag Manager][3]{:target="_blank"} | [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>GSuite][4]{:target="_blank"} | [<i class="fas fa-robot" aria-hidden="true" style="color: white; margin-right:5px;"></i>imgbot.net][5]{:target="_blank"} |
| [<i class="fab fa-github-square" aria-hidden="true" style="color: white; margin-right:5px;"></i>GitHub Pages][6]{:target="_blank"} | [<i class="fab fa-github" aria-hidden="true" style="color: white; margin-right:5px;"></i>GitHub][7]{:target="_blank"} | [<i class="fab fa-git" aria-hidden="true" style="color: white; margin-right:5px;"></i>Git][8]{:target="_blank"} | [<i class="fab fa-github" aria-hidden="true" style="color: white; margin-right:5px;"></i>GitHub Desktop][9]{:target="_blank"} | [<i class="fab fa-markdown" aria-hidden="true" style="color: white; margin-right:5px;"></i>Markdown][10]{:target="_blank"} |
| [<img src="/assets/images/brandicons/jekyll.svg" width="20" height="20" style="color: white; margin-right:5px;">Jekyll][11]{:target="_blank"} | [<i class="fas fa-code" aria-hidden="true" style="color: white; margin-right:5px;"></i>YaML][12]{:target="_blank"} | [<i class="fab fa-html5" aria-hidden="true" style="color: white; margin-right:5px;"></i>HTML][13]{:target="_blank"} | [<i class="fab fa-css3-alt" aria-hidden="true" style="color: white; margin-right:5px;"></i>CSS][14]{:target="_blank"} | [<i class="fab fa-java" aria-hidden="true" style="color: white; margin-right:5px;"></i>JavaScript][15]{:target="_blank"} |
| [<i class="fas fa-user-secret" aria-hidden="true" style="color: white; margin-right:5px;"></i>2FA][16]{:target="_blank"} | [<i class="fab fa-docker" aria-hidden="true" style="color: white; margin-right:5px;"></i>Docker Desktop][17]{:target="_blank"} | [<i class="fab fa-docker" aria-hidden="true" style="color: white; margin-right:5px;"></i>Docker CLI][18]{:target="_blank"} | [<i class="fab fa-linux" aria-hidden="true" style="color: white; margin-right:5px;"></i>Linux WSL][19]{:target="_blank"} | [<img src="/assets/images/brandicons/powershell.svg" width="20" height="20" style="color: white; margin-right:5px;">PowerShell][20]{:target="_blank"} |
| [<i class="fas fa-route" aria-hidden="true" style="color: white; margin-right:5px;"></i>Domain Name][21]{:target="_blank"} | [<i class="fas fa-route" aria-hidden="true" style="color: white; margin-right:5px;"></i>DNS][22]{:target="_blank"} | [<i class="fas fa-envelope-open-text" aria-hidden="true" style="color: white; margin-right:5px;"></i>formspree.io][23]{:target="_blank"} | [<i class="fas fa-laptop-code" aria-hidden="true" style="color: white; margin-right:5px;"></i>vscode][24]{:target="_blank"} | [<i class="fas fa-cookie-bite" aria-hidden="true" style="color: white; margin-right:5px;"></i>cookiebot.com][25]{:target="_blank"}|
| [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Authenticator][26]{:target="_blank"} | [<i class="fas fa-shield-alt" aria-hidden="true" style="color: white; margin-right:5px;"></i>shields.io][27]{:target="_blank"} | [<img src="/assets/images/brandicons/simpleicons.svg" width="20" height="20" style="color: white; margin-right:5px;"> simpleicons.org][28]{:target="_blank"} | [<i class="fab fa-font-awesome" aria-hidden="true" style="color: white; margin-right:5px;"></i>fontawesome.com][29]{:target="_blank"} | |


{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## <i class="fas fa-code-branch" aria-hidden="true" style="color: white; margin-right:5px;"></i> Heading

| --- | --- |
| There are a few reasons why I chose to write this article; one of which is that I never once considered that I would be happy to spend my free time writing blog articles as its largely just a form of documentation (euugh!) | ![Yuck!](/assets/images/buildingdockerserver/Yuck2.gif) |

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## <i class="fas fa-code-branch" aria-hidden="true" style="color: white; margin-right:5px;"></i> Heading

Some text goes here.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://domains.google/
[2]: https://analytics.google.com/
[3]: https://marketingplatform.google.com/intl/en_uk/about/tag-manager/
[4]: https://gsuite.google.co.uk/intl/en_uk/
[5]: https://github.com/marketplace/imgbot
[6]: https://pages.github.com/
[7]: https://github.com/
[8]: https://git-scm.com/
[9]: https://desktop.github.com/
[10]: https://www.markdownguide.org/
[11]: https://jekyllrb.com/
[12]: https://yaml.org/
[13]: https://www.w3schools.com/html/
[14]: https://www.w3schools.com/css/
[15]: https://www.w3schools.com/js/
[16]: https://en.wikipedia.org/wiki/Multi-factor_authentication
[17]: https://www.docker.com/products/docker-desktop
[18]: https://docs.docker.com/compose/reference/
[19]: https://docs.microsoft.com/en-us/windows/wsl/about
[20]: https://docs.microsoft.com/en-us/powershell/scripting/overview
[21]: https://en.wikipedia.org/wiki/Domain_name
[22]: https://en.wikipedia.org/wiki/Domain_Name_System
[23]: https://formspree.io/
[24]: https://code.visualstudio.com/
[25]: https://www.cookiebot.com/
[26]: https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_GB
[27]: https://shields.io/
[28]: https://simpleicons.org/
[29]: https://fontawesome.com/
[30]: https://travis-ci.org/
[31]: https://www.algolia.com/
