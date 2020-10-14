---
layout: single
title: "Text Alerts"
excerpt: "Important message from the bank"
header:
  overlay_image: /assets/images/powershell-banner.png
  overlay_filter: rgba(90, 104, 129, 0.8)
  teaser: /assets/images/phishing/dodgey-text.png
classes: wide
date: 2020-10-11T016:30:00
last_modified_at: 2020-10-11T16:30:00
categories:
  - Blog
tags:
  - 
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

# <i class="fas fa-money-bill-wave" aria-hidden="true" style="color: white; margin-right:5px;"></i> Banking

It has been a little while since my last blog post as I have been working on another side project, collating my collection of PowerShell scripts and functions.

While working on completing this project, I received a text that diverted my attention and caused me to write this post instead.

The text I received, claimed to be from the bank, alerting me to a change to my account. It wasn't exactly an exciting text but what immediately caught my attention was that I don't actually bank with HSBC *(screenshot below)*

<div>
<a href="/assets/images/phishing/dodgey-text.png" data-lightbox="Text Alert" data-title="Text Alert"><img src="/assets/images/phishing/dodgey-text.png" alt="Text Alert" width="200" height="400"/></a>
</div>
<br>
The text was clearly a fraudulent message which normally I would have treated with the usual contempt of SPAM and blocked any future messages, ignored it and carried on with whatever I had been doing prior to the interruption. However, as I have plenty of time on my hands at the moment, I decided to do a little digging and hopefully help prevent anyone from falling into their trap.

Searching for the senders number did not provide any results, so the next thing to examine was the URL from the message.

The [WHOIS][1]{:target="_blank"} information for the `link-verifier.com` domain shows that it had only recently been registered on `2020-10-10`

As this is a `.com` domain the WHOIS information is obscured and shows `PrivacyGuardian.org` as the domain contact.

  > [https://www.privacyguardian.org][2]{:target="_blank"} <br>
  > **Report Abuse** <br>
  > If a domain utilizing our service has engaged in SPAM or some other illegal activity, please provide evidence of such behaviour below. If you have a copyright/trademark dispute, you should direct your complaint to the respective web site host for the domain. We are solely a privacy service, and, as such we have no control over the storage or distribution of any allegedly infringing materials.

Thankfully they have an option to report abuse, so that is exactly what I did.

Like all sensible Admins, I have a virtual machine setup for testing, so I promptly fired this up and set about visiting the site. I was quite surprised when comparing this with HSBC's own site, as it was quite literally indistinguishable.

<div>
<a href="/assets/images/phishing/dodgey-site.png" data-lightbox="link-verifier.com" data-title="link-verifier.com"><img src="/assets/images/phishing/dodgey-site.png" alt="link-verifier.com" width="600" height="400"/></a>
</div>
<br>
<div>
<a href="/assets/images/phishing/hsbcs-own-site.png" data-lightbox="www.security.hsbc.co.uk" data-title="www.security.hsbc.co.uk"><img src="/assets/images/phishing/hsbcs-own-site.png" alt="www.security.hsbc.co.uk" width="600" height="400"/></a>
</div>
<br>
As this was received on a mobile phone, it is likely that many users could be fooled, as most mobile browsers do not have enough screen space to show the URL properly and the site content is identical to HSBC's own site. It is not too far fetched to conceive that this was the intent and customers would be tempted to log in and check their account. Anybody opening this link and entering their details would now be providing their details to whoever has setup this site to [PHISH][3]{:target="_blank"} for details.

I checked HSBC's site and located their email address to report this site in the hope they would hopefully be able to take down the site. Sadly, due to their response, I do not expect to find out what will be done to protect their customers.

<div>
<a href="/assets/images/phishing/hsbc-email.png" data-lightbox="HSBC Response" data-title="HSBC Response"><img src="/assets/images/phishing/hsbc-email.png" alt="HSBC Response" width="600" height="400"/></a>
</div>
<br>
It then seemed prudent to also write about my findings so that I could show people what they should look out for and hopefully not be suckered into "giving away their account details".

Unlike many phishing emails and texts I have seen in the past, this was by far one of the most convincing attempts I have seen and could easily fool anyone who wasn't paying attention.

Hopefully, this article will serve as a warning that you really should take your time and pay attention to what you are clicking on. The next link you click, could take you somewhere you really don't want to go.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: https://who.is/whois/link-verifier.com
[2]: https://www.privacyguardian.org
[3]: https://www.dictionary.com/browse/phish
