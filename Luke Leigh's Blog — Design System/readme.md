# Luke Leigh's Blog — Design System

> *Yet another IT Admin Blog.* PowerShell, infrastructure, and the occasional shipping-container office.

This is the design system for **[Luke Leigh's Blog](https://blog.lukeleigh.com)** — a personal IT/PowerShell blog by Luke Leigh (a.k.a. **BanterBoy**), an Infrastructure Engineer & PowerShell Developer based in Essex, UK. The site runs on **Jekyll** with the **[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)** theme (v4.17.2) and the **`dark`** skin. This system distils that theme into reusable tokens, components, and a click-through UI kit so you can produce on-brand pages, posts, and marketing assets.

## Sources

Everything here was reverse-engineered from the live theme source. If you have access, explore them to build with higher fidelity:

- **Blog repository** — [`BanterBoy/BanterBoy.github.io`](https://github.com/BanterBoy/BanterBoy.github.io) (branch `master`). The real source of truth.
  - `_sass/minimal-mistakes/_variables.scss` — type scale, base palette, radius, shadows, breakpoints.
  - `_sass/minimal-mistakes/skins/_dark.scss` — the dark-skin colour overrides (`#252a34` / `#00adb5`).
  - `_sass/minimal-mistakes/` — `_buttons`, `_archive` (teaser cards), `_notices`, `_masthead`, `_sidebar`, `_page`.
  - `_posts/` — voice & tone reference (e.g. *The Blinking Cursor Problem*, *60 Seconds With… Luke Leigh*).
  - `_config.yml` — site identity, author links, nav.
- **Related properties** (same author, same voice): [`scripts.lukeleigh.com`](http://scripts.lukeleigh.com/), [`digitaltak.lukeleigh.com`](https://digitaltak.lukeleigh.com/), and the many PowerShell module repos under [`github.com/BanterBoy`](https://github.com/BanterBoy).

> To build new designs at higher fidelity, browse the blog repo above — the `_sass` and `_posts` folders in particular.

---

## Content fundamentals — how the writing sounds

The voice is the brand. Get this right and everything else follows.

- **First person, always.** "I'll be honest…", "the post I wish someone had given me". Luke is a real person talking to you, not a content team.
- **Dry, self-deprecating British wit.** He's happy to call his own past work "rubbish" and admits to falling into the same traps as everyone else. Confidence without arrogance.
- **British spelling & idiom throughout** — *colour, behaviour, whilst, fobbed off, rubbish, can't stand, decent company, on reflection*. Use en-GB.
- **Conversational asides via em-dashes and ellipses.** Long sentences that double back on themselves — like this — and trail off with "……" for comic timing.
- **Plain-English over jargon.** Even deeply technical posts get explained "in terms a 10-year-old could understand". Analogies are everywhere (the tablecloth trick; the slot machine; the blinking cursor).
- **Casing:** Sentence case for body and meta. Post titles use **Title Case**, often with a colon + subtitle ("The Blinking Cursor Problem — Getting More Out of A.I.").
- **No emoji.** The one playful flourish is the occasional kaomoji — `¯\_(ツ)_/¯` — used very sparingly. Font Awesome icons do the decorative work instead.
- **Section headers carry an inline icon** (`<i class="fas fa-bullseye">`) and most sections end with a small "Back to Top" link.
- **Practical, generous, never gatekeeping.** Posts hand you copy-paste examples and admit when something is uncertain ("if you're not sure, say so rather than guessing").

**Example openers that capture the vibe:**
> "Most people treat A.I. like a search engine — type three words, hit enter, wonder why it's rubbish."

> "Infrastructure people aren't typically the ones being asked to put their name to anything. We're the ones who fix the thing that was quietly broken before anyone noticed, then disappear again."

---

## Visual foundations

A calm, flat, **dark** system. No gradients-for-the-sake-of-it, no glassmorphism, minimal shadow. The teal accent and code photography do the heavy lifting.

- **Colour.** Background is a desaturated slate `#252a34`; body text a soft off-white `#eaeaea`. The single signature accent is **teal `#00adb5`** (links, active nav, accent rules, primary buttons). Surfaces layer by *darkening*: page `#252a34` → raised card `#2d333f` → sunken/form `#1f242c` → footer/masthead `#1a1d24`. Status colours (`success #3fa63f`, `warning #d67f05`, `danger #ee5f5b`, `info #3b9cba`) are shared with the light theme. Links are a *muted* teal `#8cd2d5`, brightening on hover.
- **Type.** Two self-hosted **brand webfonts** lead: **Unica One** (condensed all-caps) for hero/section display titles via `--font-display`, and **Exo** (geometric technical sans, 500) for headings & UI accents via `--font-brand` / `--font-heading`. Body, UI and code stay on the theme's **system stacks** — sans (`-apple-system, Segoe UI, Roboto, …`) for everything, mono (`Monaco, Consolas, …`) for code, and a single serif touch (`Georgia`) for figure/teaser captions. An em-based ~1.25 modular scale off a 16px root (39 / 31 / 25 / 20 / 16 / 12px). Headings and buttons are **bold (700)**; body line-height is generous at **1.5**.
- **Backgrounds & imagery.** Heroes are **full-bleed photography of code** (dark navy screens of PowerShell, syntax in green/cyan) under a translucent slate overlay (`rgba(90,104,129,0.7)`) so white text stays legible. Imagery skews **cool, dark and technical**; the human warmth comes from the author's laughing avatar (with its little halo). No illustration, no stock-business photos.
- **Cards.** Teaser cards are the workhorse: a rounded (`4px`) image with `overflow:hidden`, a bold linked title, a muted meta row, and a short excerpt. They sit on the page background — no heavy border or drop shadow. The "raised card" surface (`#2d333f`) exists for when you genuinely need separation.
- **Corners & borders.** One radius everywhere: **`4px`** (`--radius`). Avatars are full circles with a 5px inset and a hairline ring. Borders are a single hairline `#51555d`; section headings (`h2`) and dividers use a 1px bottom rule. Blockquotes and the active TOC item use a **`0.25em` teal left rule**.
- **Shadows.** Deliberately subtle. `--shadow-sm` (`0 1px 1px rgba(0,0,0,.125)`) for the rare lifted element; `--shadow-pop` for dropdowns; a soft glow on hovered images. The theme is mostly **flat**.
- **Notices / callouts.** Inverted on purpose: on the dark skin, `.notice--*` blocks render as **light tinted panels with dark text** and a faint coloured shadow — they pop *out* of the dark page. Variants: default, primary, info, warning, success, danger.
- **Buttons.** Flat fill, bold 12px, `4px` radius, no border (except `inverse`/`light-outline`). Hover *darkens* the fill ~20%; there's no scale or lift. Variants map to the palette + brand colours (GitHub, LinkedIn).
- **Motion & states.** A single global transition: **`all 0.2s ease-in-out`**. Content fades/slides in gently on load (the theme's `intro` animation). Hover states change **colour** (links brighten, buttons darken, images glow); there are no bounces, springs, or parallax. Reduced-motion friendly.
- **Layout.** Centred content rail at **`max-width 1280px`**, with a right author/utility sidebar (`200px` narrow / `300px` wide). Breakpoints: 600 / 768 / 900 / 1024 / 1280. Generous `2em` section rhythm.

---

## Iconography

- **Font Awesome is the icon system** — loaded site-wide. The theme uses **solid** (`fas`) icons heavily and **brand** (`fab`) icons for social links. Examples seen in the wild: `fas fa-terminal`, `fa-laptop-code`, `fa-robot`, `fa-bullseye`, `fa-i-cursor`, `fa-satellite-dish`, `fa-caret-up`, `fab fa-github`, `fa-linkedin`, `fa-keybase`.
- **Inline before headings.** Section `h2`s in posts open with a white solid icon + `margin-right: 5px`. Social rows in the sidebar/footer are pure icon links.
- **The brand mark is the PowerShell glyph** (`assets/images/PowerShell_5.0_icon*.png`) — blue prompt tile, used as the site logo in the masthead.
- **No emoji as icons.** The only Unicode flourish is the kaomoji `¯\_(ツ)_/¯`. Don't substitute emoji for Font Awesome.
- In this system, load Font Awesome from CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`. The live site pins its own FA build; 6.x is a faithful match. **Flagged substitution:** the exact FA version/license build on the live site isn't bundled here — swap in the site's build for production.

---

## Index — what's in this system

**Foundations**
- `styles.css` — the single entry point (consumers link this). `@import`s the four token files.
- `tokens/colors.css` — palette, surfaces, links, status, social, semantic aliases.
- `tokens/typography.css` — font stacks + em modular scale.
- `tokens/fonts.css` — `@font-face` rules: self-hosted brand webfonts (Exo, Unica One) + local() system faces.
- `tokens/spacing.css` — spacing ramp, layout rails, radius, borders, shadows, motion.
- `tokens/syntax.css` — base16 "Material" code palette + a rouge `.highlight` mapping.

**Components** (`components/<group>/` — React, namespace `window.LukeLeighSBlogDesignSystem_87513a`)
- `buttons/` — **Button** (palette variants, sizes, icon, block, disabled).
- `labels/` — **Tag** (outlined taxonomy pill), **Badge** (filled status label).
- `feedback/` — **Notice** (tinted callout block).
- `blog/` — **TeaserCard**, **PageMeta**, **Pagination**.
- `identity/` — **Masthead** (site header + nav), **AuthorCard** (sidebar profile).

**UI kit** (`ui_kits/blog/`)
**UI kit** (`ui_kits/blog/`)
- `index.html` — the **refreshed** interactive blog: an image-led card-grid home with a featured hero, and a single-post view (hero overlay, sticky TOC, base16 code blocks, callouts, byline, related). Brand fonts (Unica One display, Exo headings) throughout. Vanilla-JS routing — click a card to read.
- `refresh.css` — the shared stylesheet for the kit, built on the tokens and mirrored by the production Jekyll theme.

**Production Jekyll theme** (`jekyll-theme/`)
- Drop-in overrides that apply the refresh to the live Minimal Mistakes site: `_sass/lukeleigh-refresh.scss` (tokens + `@font-face` + components), `_layouts/{default,home,single}.html`, `_includes/{masthead,footer,post-card,read-time}.html`, `assets/css/main.scss`, `assets/js/toc-active.js`, self-hosted fonts, and a `README.md` with install steps.

**Specimen cards** — `guidelines/*.card.html` populate the Design System tab (Colors, Type, Spacing, Brand).

**Assets** (`assets/images/`) — PowerShell logos, author avatars, the default teaser, and full-bleed code banners, all imported from the live repo.

**`SKILL.md`** — makes this folder usable as a downloadable Agent Skill.

---

*Built by reading the Minimal Mistakes dark-skin SCSS and the blog's own posts. Colours and the type scale are exact. Body/UI run on the theme's system stacks; **Exo** + **Unica One** are self-hosted brand webfonts used for headings and display.*
