---
layout: single
title: "Get-GistIframe — Embedding GitHub Gists Without the Liquid Nonsense"
excerpt: "A small but genuinely useful utility that converts a GitHub Gist script tag into a properly styled iframe and copies it to your clipboard.<br>Jekyll optional. Chuck Norris entirely non-optional."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/default-teaser-image.png
toc: true
toc_label: "Get-GistIframe"
toc_icon: "code"
toc_sticky: true
date: 2026-05-12 11:00:00 +0000
last_modified_at: 2026-05-12 11:00:00 +0000
categories:
    - Blog
tags:
    - PowerShell
    - Scripting
    - Jekyll
    - GitHub
    - Gists
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

If you've ever tried to embed a GitHub Gist directly into a Jekyll blog post, you'll know exactly what I mean when I say it's one of those things that looks entirely straightforward and then promptly isn't.

GitHub does its bit — it hands you a neat little `<script>` tag, you drop it into your Markdown, and everything should be fine. Except sometimes it is fine, and sometimes Jekyll's Liquid templating engine has a quiet word with you about angle brackets and the nature of trust, and you end up staring at your Gist rendered as a wall of literal HTML text rather than the nicely formatted code block you were expecting. I've lost more time to this than I'm comfortable admitting……

Fortunately, I have a mate — [Rob Green][6]{:target="\_blank"} ([@trossr32][6]{:target="\_blank"} on GitHub) — who is a senior software engineer and, crucially, more patient with this sort of thing than I am. When I was moaning about Gist embeds breaking my Jekyll posts, Rob went away and knocked up a function to solve it. That function is `Get-GistIframe`. I'm documenting it here partly because it's genuinely useful and partly because Rob deserves the credit rather than it quietly sitting in the UserAdminModule as though I'd written it myself.

(He's also based in Essex, so I can't even blame the distance for why I don't just phone him. We just prefer GitHub issues apparently.)

Oh — and before we get into it — over on [scripts.lukeleigh.com][1]{:target="\_blank"} there is a [Chuck Norris Jokes][2]{:target="\_blank"} page sitting in the nav right between the User Admin Module and the About page, because of course there is. I mention it only because it exists and it amuses me every time I see it.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-question-circle" aria-hidden="true" style="color: white; margin-right:5px;"></i> Why Iframes? Why Not Just Use the Script Tag?

Fair question. The standard GitHub Gist embed looks like this:

```html
<script src="https://gist.github.com/BanterBoy/65b11469a46757727ef929f3925668a6.js"></script>
```

Drop that into a standard HTML page and you're done. Drop it into a Jekyll Markdown post and you might be fine. You might also find that Liquid tries to process it, or that your build pipeline grumbles, or that it works locally and then breaks in production for reasons that are entirely unclear and will remain that way.

The iframe approach sidesteps all of that. Rather than relying on JavaScript injection from an external source, `Get-GistIframe` takes the Gist script tag, URL-encodes the whole thing, and wraps it in an iframe using a `data:text/html` URI. The browser renders the encoded HTML directly from the URI — no external script call, no Liquid interference, no drama.

The generated code looks roughly like this:

```html
<iframe src="data:text/html;charset=utf-8,%3Cscript%20src%3D%22https%3A%2F%2Fgist.github.com..." style="
    margin: 0;
    padding: 0;
    width: 100%;
    height: 500px;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 12px;
    background-color: white;
    overflow: scroll;
"></iframe>
```

Full width, rounded corners, white background, scrollable. It's not glamorous. It gets the job done.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-cogs" aria-hidden="true" style="color: white; margin-right:5px;"></i> What the Function Does

`Get-GistIframe` lives in the [User Admin Module][3]{:target="\_blank"} on scripts.lukeleigh.com, which is where I've been filing things Rob's written for me that don't quite fit anywhere else. The name's a little misleading given that it's really a blogging utility rather than anything to do with user administration, but that's where it ended up and I'm not reorganising now.

Here's the function in its entirety:

```powershell
function Get-GistIframe {
    <#
        .DESCRIPTION
        Generate iframe code for blog.lukeleigh.com from a gist script

        .PARAMETER Url
        Mandatory. The gist URL to encode. Can be sent through the pipeline.

        .PARAMETER Height
        Optional, defaults to 500. The number of pixels that will be set as
        the height of the iframe.

        .PARAMETER Revert
        Optional. Decodes a previously generated URL.
    #>

    param (
        [Parameter(Mandatory = $true, HelpMessage = "Gist js URL", ValueFromPipeline = $true)]
        [string]$Url,

        [Parameter(Mandatory = $false, HelpMessage = "iframe height in pixels, defaults to 500")]
        [int]$Height = 500,

        [Parameter(Mandatory = $false, HelpMessage = "Decodes a previously encoded URL")]
        [switch]$Revert
    )

    [string]$response = ""

    if ($Revert.IsPresent) {
        $response = [System.Web.HttpUtility]::UrlDecode($Url)
    }
    else {
        $response = "<iframe src=`"data:text/html;charset=utf-8,$([System.Web.HttpUtility]::UrlEncode($Url))`" style=`"
        margin: 0;
        padding: 0;
        width: 100%;
        height: $($Height)px;
        -moz-border-radius: 12px;
        -webkit-border-radius: 12px;
        border-radius: 12px;
        background-color: white;
        overflow: scroll;
    `"></iframe>"
    }

    $response | Set-Clipboard

    if ($Revert.IsPresent) {
        Write-Host "The following decoded URL has been copied to the clipboard:"
    }
    else {
        Write-Host "The following generated iframe code has been copied to the clipboard:"
    }

    Write-Host $response
}
```

The core of it is `[System.Web.HttpUtility]::UrlEncode()` — a .NET method that's been available in PowerShell since approximately the beginning of time (yes I am that old). It encodes the Gist script tag so it can be safely embedded in a data URI, which the browser then decodes and renders inside the iframe. The `-Revert` switch runs the same method in reverse: `UrlDecode()`, which is handy if you've got an encoded blob of text and need to see what the original script tag was.

The other thing worth calling out: it calls `Set-Clipboard` automatically. Every run, the output goes straight to your clipboard — you don't have to select and copy anything. It's just there, ready to paste into your post. Small quality-of-life touch from Rob, and one of those things you don't realise you needed until it's already happened.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-terminal" aria-hidden="true" style="color: white; margin-right:5px;"></i> Parameters

There are three:

**`-Url`** — Mandatory. The GitHub Gist script tag you want to embed. Accepts pipeline input, so you can pipe the tag in directly if that's your preference.

**`-Height`** — Optional. Defaults to `500`. Sets the height of the iframe in pixels. If your Gist is particularly long, bump this up. I've used `750` for anything more than a dozen lines.

**`-Revert`** — Optional switch. Runs `UrlDecode` instead of `UrlEncode`, turning a previously generated data URI back into the original script tag. Useful when you're staring at an encoded blob months later and can't remember what it actually was.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-code" aria-hidden="true" style="color: white; margin-right:5px;"></i> Usage Examples

Three ways to use it, depending on how you like to work.

**Pipeline — just pipe the script tag straight in:**

```powershell
"<script src=`"https://gist.github.com/BanterBoy/65b11469a46757727ef929f3925668a6.js`"></script>" | Get-GistIframe
```

**With a custom height — useful for longer Gists:**

```powershell
Get-GistIframe -Url "<script src=`"https://gist.github.com/BanterBoy/65b11469a46757727ef929f3925668a6.js`"></script>" -Height 750
```

**Revert — decode a previously encoded URL back to the original script tag:**

```powershell
Get-GistIframe -Url "%3Cscript%20src%3D%22https%3A%2F%2Fgist.github.com%2FBanterBoy%2F65b11469a46757727ef929f3925668a6.js%22%3E%3C%2Fscript%3E" -Revert
```

In every case, the result is written to the console and copied to the clipboard. Paste it directly into your Jekyll post where the Gist embed should appear.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-download" aria-hidden="true" style="color: white; margin-right:5px;"></i> Where to Get It

The function lives on the [Get-GistIframe][4]{:target="\_blank"} page at scripts.lukeleigh.com, part of the [UserAdminModule][3]{:target="\_blank"} collection. You can grab the full script there, or download the entire repository as a zip from the [GitHub releases page][5]{:target="\_blank"}.

If you find an issue or want to suggest an improvement, there's a direct link to raise a GitHub issue from the function page. Worth doing — Rob might even fix it.

All credit to [Rob][6]{:target="\_blank"} for this one. I described the problem, he wrote the solution, and I've been using it ever since without ever having to think about `UrlEncode` again. That's the ideal outcome. If you're running a Jekyll blog and embedding Gists, give it a go — it'll save you the debugging session I had at half eleven on a Tuesday when I absolutely should have been doing something else. ¯\_(ツ)\_/¯

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

[1]: https://scripts.lukeleigh.com/
[2]: https://scripts.lukeleigh.com/menu/_pages/chuck-norris-jokes/
[3]: https://scripts.lukeleigh.com/menu/_pages/UserAdminModule.html
[4]: https://scripts.lukeleigh.com/useradminmodule/jekyllblog/get-gistiframe/
[5]: https://github.com/BanterBoy/scripts-blog/releases/download/v2.0/Powershellv2.0.zip
[6]: https://github.com/trossr32
