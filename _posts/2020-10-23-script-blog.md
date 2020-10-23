---
layout: single
title: "Hey people, I made a blog!"
excerpt: "Erm....didn't you just do that?"
header:
  overlay_image: /assets/images/powershell-banner.png
  overlay_filter: rgba(90, 104, 129, 0.8)
  teaser: "/assets/images/script-blog/SCRIPTS-BLOG.gif"
  caption: "[**scripts.lukeleigh.com**](https://scripts.lukeleigh.com)"
  actions:
    - label: "scripts.lukeleigh.com"
      url: "https://scripts.lukeleigh.com"
date: 2020-10-23T00:30:00
last_modified_at: 2020-10-23T00:30:00
toc: true
toc_label: Blogging
toc_icon: dolly
toc_sticky: true
categories:
  - Blog
tags:
  - Learning
  - PowerShell
  - Scripting
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
<span style="font-size:11px;"><button onclick="window.print()"><i class="fas fa-print" aria-hidden="true" style="color: black; margin-right:5px;"></i>Print</button></span>

# <i class="fas fa-box-open" aria-hidden="true" style="color: white; margin-right:5px;"></i> Overview

<video width="320" height="190" controls autoplay loop muted>
    <source src="/assets/video/scripts-blog-intro.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

- Hey, I created another blog -> [**scripts.lukeleigh.com**](https://scripts.lukeleigh.com){:target="_blank"}
  - That's a bit strange.
- Is it?
  - Yes, surely one blog would have been enough?
- Well, yes but there were, "reasons"......honest 👌

Over the years, I have created a rather large collection of admin scripts, functions etc. Until very recently, this wasn't what you would call tidy. I had made a rather minimal attempt at filing and it had become difficult to navigate and indeed locate the particular PowerShell code I required.

## <i class="fas fa-box" aria-hidden="true" style="color: white; margin-right:5px;"></i> Things I did

- Sort through scripts, removing duplications and remnants of unfinished and unusable code.
- Format the code in all PowerShell scripts to remove the use of aliases and cryptic variable names.
- Test and repair all remaining scripts, functions etc and remove any unfixable/duplicate code, where similar scripts existed with different names.
- Catalogue and file each script, function etc. and separate into functions, scripts, tools and snippets.
- Each section was allocated a web page and each script has been indexed to make it easier to access the relevant function etc.

---

# <i class="fas fa-people-carry" aria-hidden="true" style="color: white; margin-right:5px;"></i> That's great Luke.

- But surely they exist elsewhere already?
  - Of course.
  - Many of these scripts are available elsewhere but many I have written myself and some I have simply been very lucky to have saved as they were found when looking for something else.
- Surely they can't all be that useful.
  - There are over 360 different scripts and generating the content has taken some time to complete.

## <i class="fas fa-truck-loading" aria-hidden="true" style="color: white; margin-right:5px;"></i> But you already have this blog

I do already indeed blog here but what started as an exercise in filing became much bigger when I thought it would be nice to share my tools. Creating a new blog site solved two problems. 1) I now have a much nicer and easily navigated index for all my PowerShell tools and 2) it was less work to create the content on a much simpler themed blog.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## <i class="fas fa-boxes" aria-hidden="true" style="color: white; margin-right:5px;"></i> Sharing is caring!

I have used many of these scripts over the years to assist in securing active directory and managing a PCI Compliant infrastructure. I am sure however that there are many useful tools that I hope this new site will help to make them more widely available to other IT Admins and budding PowerShell developers.

  [**scripts.lukeleigh.com**](https://scripts.lukeleigh.com){:target="_blank"}

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

# <i class="fas fa-pallet" aria-hidden="true" style="color: white; margin-right:5px;"></i> What's next?

I will continue to update the new site to include information about each script and some examples for each commands use.
The resources page is currently just a very large list. I will also categorise this, to make it easier to follow.

There will also undoubtedly be some more blog posts.

---

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>
