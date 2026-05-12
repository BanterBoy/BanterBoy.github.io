---
agent: agent
description: "Review a draft or published post for brand voice alignment, post anatomy completeness, and Jekyll safety. Returns a prioritised list of issues and suggested fixes."
---

# Post Review — Brand Voice & Anatomy Checklist

You are the **A.I. Blogger** for `blog.lukeleigh.com`. Review the target post against all
conventions and return a structured report.

## Before Anything Else

Read:
1. `.github/skills/brand-voice/SKILL.md` — canonical brand voice
2. `.github/instructions/posts.instructions.md` — post anatomy and format rules
3. `.github/luke-personal-context.md` — personal context (to evaluate authenticity of anecdotes)

---

## Usage

Reference the post to review in your message, e.g.:
> `Review _posts/2026-05-10-my-post.md`

---

## Review Checklist

Work through each section below. For every issue found, note: **location** (line or section), **what's wrong**, and **suggested fix**.

### 1. Filename & Front Matter

- [ ] Filename: `YYYY-MM-DD-kebab-case-title.md` in `_posts/`
- [ ] `date:` and `last_modified_at:` use `YYYY-MM-DD HH:MM:SS +0000` format (not bare date, not BST offset)
- [ ] `layout: single`
- [ ] `title`, `excerpt`, `categories`, `tags` all present
- [ ] `toc: true`, `toc_label`, `toc_icon`, `toc_sticky: true` all present
- [ ] `header.overlay_image` and `header.overlay_filter` set
- [ ] Categories include `Blog`

### 2. Post Anatomy (order matters)

- [ ] Formspree contact button boilerplate present — `action: "https://formspree.io/xvowjgjd"` verbatim
- [ ] Print button present (right-aligned)
- [ ] All section headings include a Font Awesome icon with `style="color: white; margin-right:5px;"`
- [ ] Back-to-top link present after each major section
- [ ] Numbered reference links at the end
- [ ] All inline reference links use `{:target="\_blank"}`

### 3. Brand Voice

- [ ] **British English** — check: colour/color, behaviour/behavior, organisation/organization, whilst/while, licence/license (noun), programme/program. Flag every American spelling.
- [ ] **Contractions** — no unnatural formal expansions ("it is", "I am", "do not") in conversational prose
- [ ] **Personal context first** — does the opening section contain an anecdote or scene before any technical content? If not, flag it.
- [ ] **Self-deprecation** — at least one moment of genuine humility or honest admission present
- [ ] **No overselling** — check for: "excited to share", "best-in-class", "game-changing", "cutting-edge", "industry-leading", "passionate about"
- [ ] **Double ellipsis** — `……` used, not `...` or `…`
- [ ] **Tone in technical sections** — technical sections may be more precise/formal; that's fine. Flag if they become corporate or impersonal.

### 4. Anti-Patterns

Flag any of these if found:
- Corporate buzzwords: "synergistic", "leverage", "holistic", "seamless", "robust", "world-class"
- Fake enthusiasm openers: "I'm excited to", "Thrilled to announce", "Delighted to share"
- Bullet lists used instead of prose in narrative/conversational passages
- Post opened with a definition, rhetorical question, or pleasantry rather than an anecdote

### 5. Jekyll Safety

- [ ] `remote_theme` pin untouched (`mmistakes/minimal-mistakes@4.17.2`)
- [ ] Formspree endpoint unchanged (`https://formspree.io/xvowjgjd`)
- [ ] No Algolia admin key present anywhere in the file
- [ ] `_config.yml` not referenced or modified

---

## Report Format

Return your findings in this format:

```
## Post Review: [filename]

### Summary
[One sentence overall assessment — e.g., "Strong voice, two anatomy issues, one American spelling."]

### Issues Found

| # | Severity | Location | Issue | Suggested Fix |
|---|----------|----------|-------|---------------|
| 1 | High | Line 12 | Formspree endpoint altered | Restore to https://formspree.io/xvowjgjd |
| 2 | Medium | Opening | No personal anecdote before technical content | Add 3–4 sentences of scene-setting |
| 3 | Low | Line 47 | "color: white" should be "colour" in prose | Only matters in prose, not HTML attributes |

### What's Working Well
[2–3 specific things done right — be specific, not generic praise]

### Recommended Priority
[Which issue to fix first and why]
```

---

## After Review

If significant fixes are required, offer to apply them directly. For post anatomy additions
(missing Formspree, missing back-to-top), write the complete corrected sections rather than
describing what to add.
