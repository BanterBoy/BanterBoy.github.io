# Luke Leigh's Blog — Refresh theme (production Jekyll)

A drop-in modernisation layer for the existing **Minimal Mistakes** site
(`BanterBoy/BanterBoy.github.io`). It keeps the dark skin and your content/
plugins, and layers on: the **Exo + Unica One** brand fonts, an image-led
**card grid** home with a **featured hero**, a redesigned **post** layout
(hero overlay, sticky TOC, base16 code blocks, byline, related posts), and a
sticky blurred masthead — no more wall of underlined teal links.

> **Live preview of the look:** open `../ui_kits/blog/index.html` in this
> project (the interactive home + post mock). This folder is the production
> Jekyll implementation of that design.

## What's in here

```
jekyll-theme/
├─ assets/
│  ├─ css/main.scss            # Sass entry — imports MM dark skin + the refresh layer
│  ├─ js/toc-active.js         # scroll-spy that highlights the active TOC item
│  ├─ fonts/                   # self-hosted brand webfonts (Exo, Unica One)
│  └─ images/                  # the PowerShell logo (add your own teasers here)
├─ _sass/
│  └─ lukeleigh-refresh.scss   # tokens + @font-face + all component styles
├─ _includes/
│  ├─ masthead.html            # brand lockup + nav + search
│  ├─ footer.html              # wordmark + social
│  ├─ post-card.html           # reusable post card (used by home + related)
│  └─ read-time.html           # "N min read" helper
├─ _layouts/
│  ├─ default.html             # html skeleton: head, masthead, content, footer
│  ├─ home.html                # featured hero + latest-posts grid + pagination
│  └─ single.html              # post hero + prose + TOC + share + byline + related
├─ _data/navigation.yml        # primary nav
└─ _config-snippet.yml         # keys to merge into your _config.yml
```

## Install (overrides on the remote theme)

Your site uses `remote_theme: mmistakes/minimal-mistakes`. Jekyll lets your repo
**override** any theme file by placing a file at the same path. So:

1. **Copy these files into your site repo root**, preserving paths
   (`assets/…`, `_sass/…`, `_includes/…`, `_layouts/…`, `_data/…`).
2. **Fonts:** the two `.ttf` files are already in `assets/fonts/`. They're
   self-hosted, so no Google Fonts request.
3. **Config:** merge the keys from `_config-snippet.yml` into your `_config.yml`
   (most already exist — the important adds are `subtitle`, `words_per_minute`,
   and the `home` layout note below).
4. **Home page:** set the landing page to the new layout. In `index.html`
   front matter use:
   ```yaml
   ---
   layout: home
   ---
   ```
5. Build: `bundle exec jekyll serve`. The dark skin loads first, then the
   refresh layer overrides the look.

## Notes & conventions

- **Teasers drive the cards.** Each post's `header.teaser` (Minimal Mistakes
  convention) becomes the card thumbnail; posts without one fall back to the
  PowerShell logo on a gradient. Set a 16:9-ish image per post for best results.
- **Post hero** uses `header.overlay_image` (falls back to `header.teaser`,
  then `site.teaser`). Your existing front matter already sets these.
- **TOC** renders when a post has `toc: true` (the config snippet turns it on
  by default) and is highlighted on scroll by `toc-active.js`.
- **Code blocks** inherit the base16 *Material* palette via the tokens — your
  existing rouge/`highlight` output is restyled automatically.
- **Notices** (`.notice--warning` etc.) are restyled as dark left-accent
  callouts; your Kramdown `{: .notice--warning}` blocks keep working.
- All colour/spacing values are CSS custom properties at the top of
  `_sass/lukeleigh-refresh.scss` — tweak `--primary`, fonts, or `--max-width`
  in one place.

## Tuning the direction

The default is **calm**: Unica One for the big display moments (masthead
wordmark, featured + hero + section titles) and **Exo** for card/post headings
and nav (sentence case, highly readable). If you want it more brutalist /
technical, switch card and post `h2` headings to the display face — in
`_sass/lukeleigh-refresh.scss` change `.ll-card h3` and `.ll-prose h2`
`font-family` to `var(--font-display)` and add `text-transform: uppercase`.

---

*Built from the design system in this project. Source theme:
[`BanterBoy/BanterBoy.github.io`](https://github.com/BanterBoy/BanterBoy.github.io)
(Minimal Mistakes 4.x, dark skin).*
