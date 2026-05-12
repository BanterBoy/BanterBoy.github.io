---
layout: single
title: "Why on earth did I build a Docker Container?"
excerpt: "Err……because I decided to test my posts before <br> publishing my Blog? Yep, I am doing that now. This post was started in June 2022 and sat unfinished in _drafts/ for nearly four years. Make of that what you will."
header:
    overlay_image: /assets/images/docker/horizontal-logo-monochromatic-white.png
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/docker/homepage-docker-logo.png
classes: wide
date: 2026-05-10 05:00:00 +0000
last_modified_at: 2026-05-10 05:00:00 +0000
collection:
    - Series
categories:
    - Blog
    - Build
    - Development
tags:
    - Docker
    - Jekyll
    - GitHub
    - vscode
    - PowerShell
    - Functions
    - Azure Pipelines
    - Markdown
    - Mergify
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

In this article I explain the technology used to create my blog and the steps involved in the setup. The rather large list of technology used makes it a seemingly complex undertaking at first glance — and I won't pretend it wasn't, because it absolutely was. Much of the decision-making was about creating a setup that's straightforward to maintain for a very small outlay. The solution to most of it turned out to be a handful of free-tier services, a bit of YAML, a lot of Markdown, and a Docker container to make sure nothing was obviously broken before it went live — which is specifically what this post is about.

## <i class="fas fa-pencil-alt" aria-hidden="true" style="color: white; margin-right:5px;"></i> Why on Earth Am I Writing This?

| --- | --- |
| There are a few reasons why I chose to write this article; one of which is that I never once considered that I would be happy to spend my free time writing blog articles — it's largely just a form of documentation (euugh!) — and yet here I am. Documenting. With a gif about how much I hate documenting. The irony is not lost on me. | ![Yuck!](/assets/images/buildingdockerserver/Yuck2.gif) |

I should flag at this point that this post was originally started in June 2022. I have just finished it. In May 2026. It sat in `_drafts/` for three years and eleven months before I got around to completing it. A post specifically about not breaking the live blog through carelessness. Left in an unfinished state for the better part of four years. If you're wondering whether I spotted the irony — yes, immediately, and it did not speed things up in the slightest.

In my defence — and I use the word 'defence' loosely — the local dev setup was working fine the whole time, so there wasn't a practical urgency to write about it. The urgency only materialised when I started publishing posts again in 2026 and realised I had a draft sitting there with two placeholder sections titled 'Heading' containing the text 'Some text goes here.' That felt like it was probably worth addressing before anyone else saw it.

Anyway. Moving on, as if none of that happened.

The honest reason I needed a local test environment is embarrassingly simple: I broke the live site. More than once. GitHub Pages builds are completely opaque when they fail — you push a commit, wait for the build to finish, refresh the site, and either everything's fine or it's silently broken in a way that gives you absolutely nothing to go on. YAML front matter errors. Liquid template syntax mistakes. A badly-formed reference link that Jekyll handles fine in some contexts and explodes in others. None of these surface until the post is live, and by that point it's already in the commit history and anyone visiting the site has seen the damage.

The solution was obvious, really — run Jekyll locally before pushing. But Jekyll requires Ruby, and getting Ruby into a reliable state on a Windows machine without it gradually corrupting itself over several months is a project in itself. Docker sidesteps that entirely. The `jekyll/jekyll` image has everything already in it, the container is ephemeral and disposable, and the whole thing can be spun up with a single command. Which felt like exactly the right level of investment for something I wanted to use every day without thinking about……

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

## <i class="fas fa-microchip" aria-hidden="true" style="color: white; margin-right:5px;"></i> Technology List for Blog

This is a comprehensive list of technology used to produce this site. Many of these are optional and are not needed to create a simple blog but I was having so much fun learning new things, that I got a little carried away. I have tried to keep the list as accurate as possible and many of the technologies add functionality to the blog; search, comments, and social media integration.

|---|---|---|---|---|
| [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Domains][1]{:target="\_blank"} | [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Analytics][2]{:target="\_blank"} | [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Tag Manager][3]{:target="\_blank"} | [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>GSuite][4]{:target="\_blank"} | [<i class="fas fa-robot" aria-hidden="true" style="color: white; margin-right:5px;"></i>imgbot.net][5]{:target="\_blank"} |
| [<i class="fab fa-github-square" aria-hidden="true" style="color: white; margin-right:5px;"></i>GitHub Pages][6]{:target="\_blank"} | [<i class="fab fa-github" aria-hidden="true" style="color: white; margin-right:5px;"></i>GitHub][7]{:target="\_blank"} | [<i class="fab fa-git" aria-hidden="true" style="color: white; margin-right:5px;"></i>Git][8]{:target="\_blank"} | [<i class="fab fa-github" aria-hidden="true" style="color: white; margin-right:5px;"></i>GitHub Desktop][9]{:target="\_blank"} | [<i class="fab fa-markdown" aria-hidden="true" style="color: white; margin-right:5px;"></i>Markdown][10]{:target="\_blank"} |
| [<img src="/assets/images/brandicons/jekyll.svg" width="20" height="20" style="color: white; margin-right:5px;">Jekyll][11]{:target="\_blank"} | [<i class="fas fa-code" aria-hidden="true" style="color: white; margin-right:5px;"></i>YaML][12]{:target="\_blank"} | [<i class="fab fa-html5" aria-hidden="true" style="color: white; margin-right:5px;"></i>HTML][13]{:target="\_blank"} | [<i class="fab fa-css3-alt" aria-hidden="true" style="color: white; margin-right:5px;"></i>CSS][14]{:target="\_blank"} | [<i class="fab fa-java" aria-hidden="true" style="color: white; margin-right:5px;"></i>JavaScript][15]{:target="\_blank"} |
| [<i class="fas fa-user-secret" aria-hidden="true" style="color: white; margin-right:5px;"></i>2FA][16]{:target="\_blank"} | [<i class="fab fa-docker" aria-hidden="true" style="color: white; margin-right:5px;"></i>Docker Desktop][17]{:target="\_blank"} | [<i class="fab fa-docker" aria-hidden="true" style="color: white; margin-right:5px;"></i>Docker CLI][18]{:target="\_blank"} | [<i class="fab fa-linux" aria-hidden="true" style="color: white; margin-right:5px;"></i>Linux WSL][19]{:target="\_blank"} | [<img src="/assets/images/brandicons/powershell.svg" width="20" height="20" style="color: white; margin-right:5px;">PowerShell][20]{:target="\_blank"} |
| [<i class="fas fa-route" aria-hidden="true" style="color: white; margin-right:5px;"></i>Domain Name][21]{:target="\_blank"} | [<i class="fas fa-route" aria-hidden="true" style="color: white; margin-right:5px;"></i>DNS][22]{:target="\_blank"} | [<i class="fas fa-envelope-open-text" aria-hidden="true" style="color: white; margin-right:5px;"></i>formspree.io][23]{:target="\_blank"} | [<i class="fas fa-laptop-code" aria-hidden="true" style="color: white; margin-right:5px;"></i>vscode][24]{:target="\_blank"} | [<i class="fas fa-cookie-bite" aria-hidden="true" style="color: white; margin-right:5px;"></i>cookiebot.com][25]{:target="\_blank"}|
| [<i class="fab fa-google" aria-hidden="true" style="color: white; margin-right:5px;"></i>Google Authenticator][26]{:target="\_blank"} | [<i class="fas fa-shield-alt" aria-hidden="true" style="color: white; margin-right:5px;"></i>shields.io][27]{:target="\_blank"} | [<img src="/assets/images/brandicons/simpleicons.svg" width="20" height="20" style="color: white; margin-right:5px;"> simpleicons.org][28]{:target="\_blank"} | [<i class="fab fa-font-awesome" aria-hidden="true" style="color: white; margin-right:5px;"></i>fontawesome.com][29]{:target="\_blank"} | [<img src="/assets/images/brandicons/azure-pipelines.svg" width="20" height="20" style="color: white; margin-right:5px;">Azure Pipelines][30]{:target="\_blank"} |

The template used to create this blog is [<img src="/assets/images/brandicons/mademistakes.svg" width="60" height="40" style="color: white; margin-right:5px;">minimal-mistakes](https://mmistakes.github.io/minimal-mistakes/). This is a blog template that uses markdown powered by [Jekyll](https://jekyllrb.com/) to generate static html pages. The blog is hosted on [<i class="fab fa-github" aria-hidden="true" style="color: white; margin-right:5px;"></i>GitHub Pages](https://pages.github.com/) and uses [<img src="/assets/images/brandicons/azure-pipelines.svg" width="20" height="20" style="color: white; margin-right:5px;">Azure Pipelines](https://azure.microsoft.com/en-gb/services/devops/pipelines/) that build, test, build artifacts using the relevant gemspec and ruby versions; and deploys the blog to GitHub Pages.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

## <i class="fab fa-docker" aria-hidden="true" style="color: white; margin-right:5px;"></i> The Local Dev Setup

The `docker-compose.yml` in the repo root is intentionally minimal. One service, one command, a couple of volume mounts:

```yaml
version: "3"

services:
    jekyll:
        image: jekyll/jekyll:latest
        command: jekyll serve --watch --incremental --force_polling --drafts
        ports:
            - 4000:4000
        container_name: lukeleigh_blog_server
        volumes:
            - ".:/srv/jekyll"
            - "./vendor/bundle:/usr/local/bundle"
```

To start it:

```powershell
docker-compose up
```

That's it. The first run takes a while — it pulls the `jekyll/jekyll:latest` image and installs all the gems defined in `Gemfile`. Subsequent runs are much faster because gems are cached in `./vendor/bundle` rather than re-downloaded every time.

Once it's running, the blog is available at [http://localhost:4000](http://localhost:4000){:target="\_blank"}.

A few things worth explaining about those command flags:

**`--watch`** monitors the file system for changes and rebuilds automatically. Edit a post, save it, refresh the browser — the change appears within a few seconds.

**`--incremental`** means Jekyll only rebuilds the pages that actually changed rather than the entire site. On a small blog this is fast either way, but it starts to matter once you have a lot of posts.

**`--force_polling`** is the Windows-specific workaround. Jekyll's native file watching uses `inotify`, which doesn't work correctly through Docker Desktop's volume mounts on Windows. Polling is slightly less efficient but it works reliably across WSL, Docker Desktop, and Windows hosts alike.

**`--drafts`** includes posts from `_drafts/` in the local build. Anything in `_drafts/` is completely invisible on the live site — posts only appear there once they're moved to `_posts/`. That's the intended workflow: write in `_drafts/`, preview locally, move to `_posts/` when it's ready to go.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

## <i class="fas fa-cogs" aria-hidden="true" style="color: white; margin-right:5px;"></i> The Build Pipeline

When a commit lands on `master`, [Azure Pipelines][30]{:target="\_blank"} takes over. The pipeline runs on an `ubuntu-latest` agent and does the full Jekyll build using the same `jekyll/builder` Docker image — so the build environment is reasonably close to the local dev setup, which is the point.

There are two steps. The first is a plain `jekyll build` to verify the site compiles without errors. The second is a Docker task that runs `jekyll build --future`, which includes posts with future-dated front matter in the artifact. That flag matters because Jekyll suppresses future-dated posts by default — without it, anything you've written ahead of its publication date would be missing from the build artifact entirely.

The built `_site` directory is the deployment artifact. From there it gets deployed to GitHub Pages. The pipeline isn't doing anything sophisticated — it's essentially "does this build without errors, and if so, push it" — but it means a broken commit on `master` gets caught before it reaches the live site, even on the occasions when I forgot to spin up `docker-compose up` first. A safety net more than anything else.

The full pipeline configuration is in `azure-pipelines.yml` at the repo root, if you want to adapt it for your own setup.

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
[30]: https://azure.microsoft.com/en-gb/services/devops/pipelines/
