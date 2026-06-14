---
name: luke-leigh-blog-design
description: Use this skill to generate well-branded interfaces and assets for Luke Leigh's Blog (blog.lukeleigh.com) — a dark-themed IT/PowerShell admin blog built on the Minimal Mistakes Jekyll theme. Contains essential design guidelines, colours, type, fonts, assets, and UI kit components for prototyping posts, pages, and marketing assets.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Identity:** Luke Leigh's Blog — "Yet another IT Admin Blog". PowerShell + infrastructure, dry self-deprecating British voice, first-person, no emoji.
- **Theme:** Minimal Mistakes (Jekyll), **dark skin**. Background `#252a34`, text `#eaeaea`, accent teal `#00adb5`.
- **Type:** system stacks (sans for UI/body, mono for code, Georgia for captions); em-based ~1.25 scale off 16px; bold headings.
- **Icons:** Font Awesome (`fas` solid, `fab` brands) — load `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`. No emoji.
- **Style:** flat, dark, 4px radius, hairline borders, subtle shadows, `all 0.2s ease-in-out`. Full-bleed code photography heroes under a slate overlay.

## Files

- `styles.css` — link this one file to get all tokens (colours, type, spacing, syntax).
- `tokens/` — the raw CSS custom properties, one file per concern.
- `components/` — React primitives (Button, Tag, Badge, Notice, TeaserCard, PageMeta, Pagination, Masthead, AuthorCard). Each has a `.prompt.md` with usage.
- `ui_kits/blog/` — interactive home + single-post recreation to copy patterns from.
- `guidelines/*.card.html` — foundation specimens.
- `assets/images/` — logos, avatars, teasers, code banners.

## Using the components in an HTML artifact

The components are bundled to `window.LukeLeighSBlogDesignSystem_87513a` by the compiled `_ds_bundle.js`. In an HTML file: link `styles.css` + Font Awesome, load React UMD + Babel, then `_ds_bundle.js`, then read components with `const { Button, Notice } = window.LukeLeighSBlogDesignSystem_87513a;`. See any `components/*/*.card.html` or `ui_kits/blog/index.html` for the exact pattern. When producing standalone/static output, copy the assets and styles you reference into your output folder.

## Voice checklist (don't skip)

Write copy in Luke's voice: first person, British spelling, dry humour, plain-English analogies, em-dash asides, the occasional `……` or `¯\_(ツ)_/¯`, and **no emoji**. Title Case headings with colon-subtitles; sentence case everywhere else.
