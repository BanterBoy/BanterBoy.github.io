---
layout: single
title: "The Blinking Cursor Problem — Getting More Out of A.I."
excerpt: "Most people treat A.I. like a search engine — type three words, hit enter, wonder why it's rubbish.<br>It isn't the tool that's the problem. It's the empty box and the blinking cursor."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/default-teaser-image.png
toc: true
toc_label: "Contents"
toc_icon: "robot"
toc_sticky: true
date: 2026-06-13 00:30:00 +0000
last_modified_at: 2026-06-13 00:30:00 +0000
permalink: /blog/the-blinking-cursor-problem/
categories:
    - Blog
tags:
    - AI
    - Productivity
    - Learning
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

I'll be honest — for a good while my own A.I. usage was rubbish, and I had the cheek to be irritated about it. I'd sit there with the cursor blinking at me in an empty box, type some terse little half-sentence in exactly the same way I'd have typed it into Google twenty years ago, and then quietly conclude that the whole thing was overhyped nonsense. I do this for a living. I run models locally with LM Studio and Ollama, I've been poking at agentic development with OpenCode, and I *still* fell into the trap……so if you've done it too, you're in decent company.

Because here's the thing nobody quite says out loud: the empty box with the blinking cursor is a lie. It looks identical to every search engine you've ever used, so your brain reaches for the same muscle memory — three keywords, hit enter, scan the results. That worked for Google because Google was only ever going to hand you a list of links to go and read yourself. A.I. isn't doing that. You're not searching, you're *briefing*. And a one-line brief gets you a one-line-brief sort of answer.

So this is the post I wish someone had sat me down and given me a couple of years back. Nothing clever, no prompt-engineering wizardry — just the handful of habits that took me from "this is overhyped" to "how did I ever do this manually". A lot of it I've nicked, cheerfully, from various prompting guides that say the same things in more words.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-i-cursor" aria-hidden="true" style="color: white; margin-right:5px;"></i> The Blinking Cursor Problem

Let me describe the actual moment, because I suspect you've had it too. You open ChatGPT, or Claude, or whatever you're running, and there it is — the box, the cursor, the gentle implication that you should now Say Something. So you type the equivalent of what you'd have lobbed at a search engine:

> *write a powershell script to clean up disk space*

Hit enter. Out comes something. It's……fine? It's generic. It assumes things you didn't tell it, ignores the constraints you didn't mention, and solves a problem adjacent to the one you actually have. You look at it, decide A.I. is overrated, and go back to doing the thing by hand.

The mistake isn't the tool and it isn't you being daft. It's that the interface *looks* like a search box, so you treat it like one. A search engine wants keywords. A model wants context. The very same empty field is asking for two completely different things, and nobody redesigned the box to tell you that.

Once that penny dropped for me, everything else followed. The rest of this post is just me explaining what to put in the box instead of three keywords and a prayer.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-bullseye" aria-hidden="true" style="color: white; margin-right:5px;"></i> Be Specific About What You Actually Want

This is the big one, and it's about ninety per cent of the battle. The model can't read your mind, it can't see your environment, and it has no idea what "clean up disk space" means in *your* particular mess. So tell it.

Compare these two. The first is what I used to type:

> *write a powershell script to clean up disk space*

The second is what I type now:

> *I need a PowerShell script to free up disk space on a Windows Server 2019 box that's nearly full. It should clear the Windows temp folders, the SoftwareDistribution cache, and the CBS logs, but it must NOT touch anything under D:\\ where the application data lives. Show me how much space each step recovers, log everything to a file, and don't delete anything older than I specify — default it to 7 days. I'll be running it interactively first, so a -WhatIf would be handy.*

Same tool. Same model. Wildly different result. The second one gets me something I can almost use as-is, because I've done the model the basic courtesy of telling it what success looks like — the OS, the targets, the things to leave well alone, the safety net, and how I'm going to run it.

You don't need to write an essay every time. But state the task plainly at the start, give it the context it can't possibly guess, and if the job's big, break it into steps rather than asking for the whole thing in one breath. Vague in, vague out — every single time.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-clone" aria-hidden="true" style="color: white; margin-right:5px;"></i> Show It What Good Looks Like

If you want output in a particular shape, show it an example of that shape. This feels almost too obvious to write down, but it's the difference between fighting the formatting for ten minutes and getting it right first time.

Want your functions to follow a certain comment-based help style? Paste one of your existing functions and say "match this". Want an email that sounds like you rather than like a corporate robot? Paste an email you've actually sent and ask for the new one in the same tone. Want a table instead of three paragraphs of waffle? Say so, and sketch the columns.

I do this constantly when I'm writing PowerShell with a model. I'll paste a function I'm happy with and say "here's my house style — parameters validated like this, help block like this, error handling like this — now write me a new one for *X* that follows the same conventions". It stops the model inventing its own style and quietly ignoring mine, which is exactly what it'll do if I leave it to guess.

An example is worth a paragraph of description. You're not explaining what you want in the abstract, you're pointing at it.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-brain" aria-hidden="true" style="color: white; margin-right:5px;"></i> Let It Think Out Loud

For anything with a bit of meat to it — a design decision, a troubleshooting problem, a "should I do it this way or that way" — ask the model to work through it step by step and explain its reasoning before it gives you the answer.

There are two reasons this helps. The first is that you genuinely get better answers; reasoning through a problem in the open tends to produce something more considered than blurting out a conclusion. The second, and honestly the more useful one for me, is that you can *see the working*. When the model lays out its thinking, you can spot the exact step where it made a wrong assumption and correct it, rather than staring at a final answer and wondering how on earth it got there.

So instead of "how do I speed up this query", try "walk me through the likely causes of this query being slow, step by step, then suggest fixes in order of how much difference they're likely to make, and tell me why". You'll learn something even when the answer's wrong, because you can see *where* it went wrong.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-comments" aria-hidden="true" style="color: white; margin-right:5px;"></i> It's a Conversation, Not a Slot Machine

This was probably my biggest personal hang-up. I treated each prompt like a coin in a slot machine — one go, and if the answer wasn't right I'd give up rather than pull the lever again. But the first answer is a *starting point*, not a verdict. The whole point is that you can refine it.

"Make it better" is a useless instruction, mind — I've tried, and the model has no more idea what "better" means than I do when my other half says the lounge needs "freshening up". Be specific about the adjustment instead:

> *That's close. Make the tone a bit more casual, swap the second example for something using Active Directory, and shorten that third paragraph — it's doing too much.*

Targeted feedback gets targeted changes. You're not starting over, you're steering. Some of my best results come after three or four rounds of "good, now change this one thing", and each round takes seconds. If you walk away after the first answer, you're leaving most of the value on the table.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-user-tie" aria-hidden="true" style="color: white; margin-right:5px;"></i> Give It a Job Title

This one feels a bit silly the first time you do it, and then you notice it works. Tell the model what role to adopt and it'll frame its whole answer through that lens.

"Act as a senior PowerShell developer reviewing this function for a junior" gets you a different — and more useful — response than just pasting the function and saying "thoughts?". "You're a PCI DSS assessor, poke holes in this network design" gets you the awkward questions you actually need to hear before the real assessor asks them. You can even have it argue both sides: play the assessor, then switch and advise me on how to answer the assessor.

It's not magic and it's not the model "becoming" an expert. It's just a clear, fast way of telling it which slice of everything it knows you want it to draw on. Cheaper than hiring a consultant, and it doesn't mind you ignoring its advice.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-house-user" aria-hidden="true" style="color: white; margin-right:5px;"></i> Copy-and-Paste Examples for Real Life

Right — enough theory. My family read this blog occasionally (hello), and "use more context" means absolutely nothing until you can see it in action on a problem you actually have. None of the PowerShell stuff above is any use to my Dad, but the *approach* is exactly the same whether you're writing a script or a strongly-worded email to a parking firm.

So here are some I've genuinely used or set up for people. Copy one, paste it into whatever A.I. you've got open, change the bits in square brackets to suit you, and have a go. The square brackets are the important bit — that's the context the model can't possibly guess, and it's the whole difference between a useful answer and a vague one.

**Writing an awkward email you've been putting off:**

```text
Help me write a polite but firm email. Here's the situation: [I ordered a
sofa eight weeks ago, was promised four-week delivery, and have now been
fobbed off twice with no firm date]. I want to [get a delivery date in
writing or a full refund], but I don't want to be rude because [I may need
to keep dealing with this company]. Keep it short, polite, and British in
tone. Give me two versions: one firm, one slightly softer.
```

**Planning the week's meals and a shopping list:**

```text
Plan five evening meals for a family of [four], two adults and two kids
aged [8 and 11]. Constraints: [one of us doesn't eat fish], nothing that
takes more than [40 minutes] on a weeknight, and try to reuse ingredients
so I'm not buying loads of stuff I'll only use once. Then give me a single
shopping list grouped by supermarket aisle (fruit & veg, chilled, tins,
etc.) so it's quick to shop.
```

**Explaining something to a child (or to yourself):**

```text
Explain [how interest on a savings account works] to an [11-year-old].
Use a simple everyday example, no jargon, and keep it to a few short
paragraphs. Then give me one question I could ask them to check they've
actually understood it.
```

**Getting your head round a letter or bill you don't understand:**

```text
I've had a letter I don't fully understand. I'll paste it below. Please:
1) explain in plain English what it's actually asking me to do, 2) tell me
if there's a deadline, and 3) list anything I need to check or watch out
for before I respond. If anything is unclear or you're not sure, say so
rather than guessing.

[paste the letter here]
```

**Drafting a cover letter that sounds like a person:**

```text
Help me write a cover letter for a [retail supervisor] job. Here's the job
advert: [paste it]. Here's my background: [10 years on the shop floor, 3 of
them as a team leader, used to rotas and stock]. I want it to sound warm
and genuine, not like a robot wrote it — short, confident, no buzzwords.
Match the tone to this email I actually sent, which sounds like me: [paste
a short example].
```

**Comparing two things before you buy:**

```text
I'm choosing between [the X dishwasher] and [the Y dishwasher] for a
household of [four]. Put the key differences in a table comparing running
cost, noise, capacity, reliability and price. Then tell me which you'd pick
for someone who mostly cares about [low running cost and quiet], and why.
If you don't have reliable information on a model, say so rather than making
it up.
```

Notice what every one of those has in common: a clear task, the bits of context that are specific to *you*, an example or a format where it helps, and — in a couple of them — explicit permission to admit when it doesn't know. That's the entire post, just pointed at the kitchen table instead of a server. And if the first answer isn't quite right, remember it's a conversation: tell it what to change and go again.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-lightbulb" aria-hidden="true" style="color: white; margin-right:5px;"></i> Putting It Together

None of this is clever. There's no secret incantation, no magic word that unlocks the good model. It genuinely is as simple as: say what you want, give it the context it can't guess, show it an example, let it think, and keep talking to it until it's right. That's the lot.

The reason I bothered writing this is that the empty box with the blinking cursor actively works against you. It's dressed up as a search engine, so it quietly trains you to treat it like one — and then you blame the tool when the three-keyword approach gives you three-keyword results. It isn't the model holding you back. It's the muscle memory of every search box you've ever used.

So next time you're staring at that cursor, don't type what you'd type into Google. Tell it what you'd tell a capable colleague who's just walked in and knows nothing about your particular situation. That one shift did more for my A.I. usage than any amount of fiddling with the actual technology — and I say that as someone who fiddles with the actual technology rather more than is healthy. ¯\\\_(ツ)\_/¯

If you want to go properly down the rabbit hole, the [Anthropic prompt engineering docs][1]{:target="\_blank"}, the [OpenAI prompting guide][2]{:target="\_blank"}, and the community-run [Prompt Engineering Guide][3]{:target="\_blank"} all say the same things in considerably more detail. But honestly? The habits above will get you most of the way there.

{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

---

[1]: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
[2]: https://platform.openai.com/docs/guides/prompt-engineering
[3]: https://www.promptingguide.ai/
