---
applyTo: "_posts/**,_drafts/**"
---

# Blog Post Rules — Auto-Injected Context

You are editing a post for `blog.lukeleigh.com` (Luke Leigh, IT contractor, Essex UK).
These rules apply to every `_posts/` and `_drafts/` file. For the full brand voice spec,
read `.github/skills/brand-voice/SKILL.md`. For the full post anatomy spec, read `ORCHESTRATOR.md`.
For Luke's personal background and recurring themes, read `.github/luke-personal-context.md`.

---

## Post Anatomy — Fixed Order, No Exceptions

Every post must contain these elements, in this exact order:

1. **YAML front matter** — see template below
2. **Formspree contact button boilerplate** — JavaScript snippet with `action: "https://formspree.io/xvowjgjd"` — copy verbatim, never alter the endpoint
3. **Print button** — right-aligned, Font Awesome icon
4. **Body sections** — each opened with a Font Awesome icon heading, `style="color: white; margin-right:5px;"`
5. **Back-to-top link** — after each major section
6. **Numbered reference links** — at the end, format `[1]: https://...`, always use `{:target="\_blank"}` inline

---

## Front Matter Template

```yaml
---
layout: single
title: "Title Here"
excerpt: "Short hook sentence or two. HTML allowed.<br> Second line if needed."
header:
    overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
    overlay_filter: rgba(90, 104, 129, 0.7)
    teaser: /assets/images/PowerShell_5.0_icon.png
toc: true
toc_label: "Contents"
toc_icon: "icon-name"
toc_sticky: true
date: YYYY-MM-DD 01:00:00 +0000
last_modified_at: YYYY-MM-DD 01:00:00 +0000
categories:
    - Blog
tags:
    - TagOne
    - TagTwo
---
```

**Date rules:**
- Same-day posts: use sequential UTC times (`01:00:00`, `02:00:00`, …) to control ordering. Never use BST offsets.
- Scheduled future posts: use `07:30:00 +0000` — the daily workflow triggers at 07:35 UTC.

---

## Section Heading Format

```markdown
## <i class="fas fa-[icon]" aria-hidden="true" style="color: white; margin-right:5px;"></i>Section Title
```

Choose icons semantically (e.g., `fa-terminal` for shell, `fa-lock` for security, `fa-history` for history, `fa-book-open` for reference). Never use decorative icons that don't relate to the section.

---

## Back-to-Top Format

```markdown
<p class="text-center"><a href="#toc">Back to Top ↑</a></p>
```

Place after every major section, before the next `##` heading.

---

## Brand Voice — Non-Negotiable Constants

- **British English always** — colour, behaviour, organisation, whilst, licence (noun), analyse, programme. No American spellings.
- **Contractions everywhere** — it's, I'm, didn't, wasn't, shouldn't, you'll, he'd. Never use formal expansions in conversational prose.
- **Personal context FIRST** — open with a scene, anecdote, or honest moment before making any technical point. Even 2–3 sentences. Never lead with a definition or a code block.
- **Self-deprecating by default** — acknowledge gaps, admit past naivety, share the rough edges. The humility is the authority.
- **Never oversell** — no superlatives about your own work, no "excited to share", no "game-changing". Genuine enthusiasm is fine; marketing language is not.
- **Attribute generously** — quote sources, credit others, link to further reading.
- **Double ellipsis** — `……` for conversational pauses, not `...`
- **Emoji sparingly** — 👌 ¯\_(ツ)/¯ 1️⃣ — only where it genuinely adds something.

---

## Anti-Patterns — Never Write These

- Corporate buzzwords: "synergistic", "leverage", "cutting-edge", "world-class", "holistic", "seamless"
- Fake enthusiasm: "excited to share", "thrilled to announce", "I'm passionate about", "delighted to"
- Overselling: "best-in-class", "industry-leading", "game-changing", "unique value proposition"
- American spellings or idioms
- Opening with a compliment, pleasantry, or rhetorical question before getting to the point
- Bullet lists as a substitute for prose in narrative/conversational sections
- Avoiding self-deprecation to sound more authoritative

---

## Reference Links

At the end of the post:
```markdown
[1]: https://example.com
[2]: https://example.com
```

Inline usage:
```markdown
[Link text][1]{:target="\_blank"}
```

Every external link **must** have `{:target="\_blank"}`.

---

## Files Never to Modify Without Explicit Instruction

- Formspree endpoint: `https://formspree.io/xvowjgjd` — copy verbatim, never change
- Post anatomy element order — do not reorder or omit elements
