# ORCHESTRATOR.md — A.I. Blogger Living Context

> This file is maintained by the A.I. Blogger orchestrator agent.  
> It is the source of truth for repo architecture, conventions, decisions, and subagent briefings.  
> Updated whenever meaningful changes are made or decisions are taken.

---

## Identity

**Role**: A.I. Blogger — orchestrator for `BanterBoy/BanterBoy.github.io`  
**Agent identity established**: 2026-05-10  
**Primary thread**: GitHub Copilot chat (VS Code), master branch only

---

## Site Overview

| Property | Value |
|----------|-------|
| Site | `blog.lukeleigh.com` |
| Subtitle | "Yet another IT Admin Blog" (intentional, self-aware) |
| Owner | Luke Leigh (BanterBoy), IT contractor, Essex, UK |
| Company | Leigh Services (Leigh IT Services Limited) |
| Focus | PowerShell, infrastructure engineering, IT admin |
| GitHub repo | `BanterBoy/BanterBoy.github.io` |
| Default branch | `master` |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Static site generator | Jekyll |
| Theme | Minimal Mistakes `mmistakes/minimal-mistakes@4.17.2` (pinned, dark skin) |
| Ruby gems | rouge, webrick, liquid, github-pages |
| Jekyll plugins | jekyll-paginate, jekyll-feed, jekyll-sitemap, jekyll-gist, jekyll-algolia, jekyll-json-feed, jekyll-include-cache |
| Local dev | Docker (`docker-compose.yml` → `jekyll/jekyll:latest`, port 4000, `--drafts` enabled) |
| CI/CD | Azure Pipelines (`azure-pipelines.yml`, triggers on `master`, builds via Docker) |
| Hosting | GitHub Pages (CNAME → `blog.lukeleigh.com`) |
| Search | Algolia (index: `blogindex`, app ID: `LOEP7YNBRV`) |
| Analytics | Google Universal (`G-PK0X4FK6KJ`) |
| Contact form | Formspree (`https://formspree.io/xvowjgjd`) — inline `<script>` in every post |
| Comments | Disqus (shortname: `lukeleigh`) — **currently disabled** (commented out in `_config.yml`) |
| Locale | `en-GB` |
| Timezone | `GB` |

---

## Directory Map

```
/
├── _config.yml          # Site config (theme, plugins, defaults, Algolia, GA)
├── Gemfile              # Ruby dependencies
├── docker-compose.yml   # Local dev server (port 4000, --drafts)
├── azure-pipelines.yml  # CI/CD (build on master)
├── index.html           # Home page
├── CNAME                # blog.lukeleigh.com
├── robots.txt           # SEO
├── .mergify.yml         # Auto-merge rules
│
├── _posts/              # 10 published posts (2019–2021) + 1 undated
├── _drafts/             # 4 unpublished drafts
├── _docs/               # Jekyll docs collection (templates/reference, NOT user-facing)
├── _pages/              # Static pages (About, 404, Contact, Resources, archives)
├── _layouts/            # Jekyll layout HTML (single, home, archive, tags, etc.)
├── _includes/           # HTML partials (masthead, footer, sidebar, SEO, etc.)
├── _sass/               # SCSS stylesheets
├── _data/               # navigation.yml, ui-text.yml
├── assets/              # images/, css/, js/, video/, lightbox/, slick/
├── Blog/                # EMPTY — reserved, do not fill without instruction
│
├── .github/
│   ├── copilot-instructions.md   # Always-on repo instructions (A.I. Blogger identity)
│   ├── agents/
│   │   └── ai-blogger.agent.md   # A.I. Blogger custom agent mode
│   ├── skills/
│   │   ├── brand-voice/SKILL.md      # Canonical brand voice source
│   │   └── github-management/SKILL.md
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CONTRIBUTING.md
│   └── stale.yml
│
├── .agents/
│   └── skills/                   # Universal skills (installed via npx skills CLI)
│       ├── content-strategy/SKILL.md
│       ├── seo-audit/SKILL.md
│       └── subagent-driven-development/SKILL.md
│
└── .claude/
    └── brand-voice.local.md   # Mirrored brand voice for Claude (same content as SKILL.md)
```

---

## Skills Reference

| Skill | Location | Invoke When |
|-------|----------|--------------|
| `brand-voice` | `.github/skills/brand-voice/SKILL.md` | Writing or reviewing any blog content |
| `github-management` | `.github/skills/github-management/SKILL.md` | PRs, branches, GitHub workflow |
| `content-strategy` | `.agents/skills/content-strategy/SKILL.md` | Planning post topics, content pillars, editorial calendar |
| `seo-audit` | `.agents/skills/seo-audit/SKILL.md` | Auditing post SEO, meta descriptions, heading structure, internal linking |
| `subagent-driven-development` | `.agents/skills/subagent-driven-development/SKILL.md` | Orchestrating multi-step tasks via subagents |
| `copywriting` | `.agents/skills/copywriting/SKILL.md` | Writing or reviewing post copy — structure, clarity, voice alignment |
| `ai-seo` | `.agents/skills/ai-seo/SKILL.md` | Optimising posts for AI search visibility (AI Overviews, Perplexity, ChatGPT citation) |
| `schema-markup` | `.agents/skills/schema-markup/SKILL.md` | Implementing or auditing structured data (BlogPosting, BreadcrumbList JSON-LD) |

> **Note:** `.github/skills/` = manually maintained. `.agents/skills/` = installed via `npx skills add`. Both are read by GitHub Copilot automatically.

---

## Post Anatomy (Standard Pattern)

Every published post **must** follow this structure exactly:

### 1. Filename
`YYYY-MM-DD-kebab-case-title.md` in `_posts/`

### 2. YAML Front Matter
```yaml
---
layout: single
title: "Title Here"
excerpt: "Short excerpt, HTML allowed.<br> Second line if needed."
header:
    overlay_image: /assets/images/<banner-image>.png
    overlay_filter: rgba(90, 104, 129, 0.7)   # or 0.75, 0.8 — varies
    teaser: /assets/images/default-teaser-image.png
toc: true
toc_label: Short Label
toc_icon: font-awesome-icon-name
toc_sticky: true
date: YYYY-MM-DDTHH:MM:SS
last_modified_at: YYYY-MM-DDTHH:MM:SS
categories:
    - Blog
tags:
    - PowerShell
    - (additional tags)
---
```

### 3. Formspree Contact Button (boilerplate — copy verbatim)
```html
<script src="https://formspree.io/js/formbutton-v1.0.0.min.js" defer></script>
<script>
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
  formbutton("create", {
    action: "https://formspree.io/xvowjgjd",
    buttonImg: "<i class='fas fa-envelope' style='font-size:20px'/>",
    theme: "minimal",
    title: "Contact Me!",
    fields: [
      { type: "email", label: "Email:", name: "email", required: true, placeholder: "your@email.com" },
      { type: "textarea", label: "Message:", name: "message", required: true, placeholder: "What's on your mind?" },
      { type: "submit" }
    ],
    styles: {
      fontFamily: "Roboto", fontSize: "1em",
      title: { background: "#999999" },
      button: { background: "#999999" }
    },
    initiallyVisible: false
  });
</script>
```

### 4. Print Button
```html
{: .text-right}
<span style="font-size:11px;"><button onclick="window.print()"><i class="fas fa-print" aria-hidden="true" style="color: black; margin-right:5px;"></i>Print</button></span>
```

### 5. Section Headings (with Font Awesome icons)
```html
# <i class="fas fa-code" aria-hidden="true" style="color: white; margin-right:5px;"></i> Heading Text
```

### 6. "Back to Top" links between major sections
```html
{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>
```

### 7. Numbered reference links (at end of file)
```markdown
[1]: https://link-url.com
[2]: https://another-link.com
```
Reference inline as `[link text][1]{:target="\_blank"}` — always `target="_blank"`.

---

## Content Taxonomy

### Categories (use one or more)
- `Blog` — general posts
- `Module` — PowerShell module posts
- `Build` / `Development` — infrastructure/dev tooling
- `Series` — multi-part series

### Common Tags
`PowerShell`, `Scripting`, `Admin`, `Resources`, `Docker`, `Jekyll`, `GitHub`, `Learning`, `Azure Pipelines`, `Markdown`

### Navigation (site main nav)
Home → Posts → Categories → Tags → Resources → About Luke → Cookies

### URL Structure
- Posts: `/:categories/:title/`
- Pages: defined per page (e.g., `/about.html`)
- Docs collection: `/:collection/:path/`
- Pagination: `/page:num/`, 5 posts per page

---

## Brand Voice — Summary (canonical source: `.github/skills/brand-voice/SKILL.md`)

**Voice**: Senior engineer having a conversation. Warm, British, self-deprecating, unpretentious.

| Rule | Detail |
|------|--------|
| Language | British English always: colour, behaviour, organisation, whilst, licence (noun) |
| Contractions | Everywhere: it's, I'm, didn't, wasn't, shouldn't |
| Structure | Personal context FIRST — anecdote/backstory before the technical point |
| Tone | Self-deprecating by default, never oversell |
| Attribution | Generous — quote sources, credit others, link to further reading |
| Ellipses | `……` (double ellipsis) for conversational mid-sentence pauses |
| Emoji | Very sparingly: 👌 ¯\_(ツ)/¯ 1️⃣ |
| Mild language | OK where it fits ("massive kick up the ass") |

### Signature Devices
- **Self-Questioning Format**: Mock Q&A with self ("That's a bit strange. Is it? Yes, surely…")
- **Knowing Aside**: Wink at the audience ("I can tell you are all on the edge of your seats")
- **Parenthetical Aside**: `(yes I am that old)`, `(I think I laughed when he told me but I can't be sure)`
- **Wry Footnote**: Numbered footnotes for humorous asides

---

## Known Fragile / Non-Obvious Areas

| Area | Risk | Notes |
|------|------|-------|
| Formspree boilerplate | Copy-pasted in every post — if endpoint changes, all posts need updating | Action: `https://formspree.io/xvowjgjd` |
| `powershell-history-tips.md` | Missing date prefix in filename | Jekyll won't publish it correctly; needs `YYYY-MM-DD-` prefix AND front matter |
| `remote_theme` pinned at `@4.17.2` | Upgrading requires full regression test | Do not bump without testing locally via Docker first |
| Algolia API key in `_config.yml` | This is the search-only key — safe to be public | Admin/write key must stay in CI environment variables, never in repo |
| Azure Pipelines inconsistency | Initial script step uses `jekyll build`, Docker task adds `--future` flag | Posts dated in the future will appear in Docker task output but not initial step |
| `.github/agents/` contains `ai-blogger.agent.md` | Orchestrator agent definition | Do not overwrite without reviewing tool list and skill references |
| `Blog/` directory is empty | Purpose unclear | Do not add content without confirmation |
| `favicon.ico.7` and `favicon.ico5` | Stale/duplicate favicon files at root | Do not delete without confirmation |
| `_docs/` collection | Outputs to `/docs/:path/` — template/reference docs, NOT user-facing posts | Don't confuse with `_posts/` |
| Disqus comments | Config present (`shortname: lukeleigh`) but commented out | Re-enabling is a one-line change in `_config.yml` |

---

## Deployment Flow

1. Push to `master`
2. Azure Pipelines triggered — Docker runs `jekyll build` (and `jekyll build --future` in second step)
3. GitHub Pages serves `_site/` output
4. `.mergify.yml` controls auto-merge behaviour
5. Algolia index updated separately via `jekyll algolia` with admin API key (not in repo)

### Local Dev
```bash
docker-compose up
# Serves at http://localhost:4000 with --drafts enabled
```

---

## Subagent Briefing Template

When spawning a subagent, always include:

```
GOAL: [what to produce]
FILES TO CREATE/EDIT: [exact paths]
FILES TO NOT TOUCH: [list anything fragile or out of scope]
CONVENTIONS:
  - Follow post anatomy in ORCHESTRATOR.md exactly
  - Brand voice: .github/skills/brand-voice/SKILL.md (British English, self-deprecating, personal context first)
  - Formspree boilerplate: copy verbatim from ORCHESTRATOR.md
  - Numbered reference links, always target="_blank"
  - Font Awesome icons in section headings (color: white)
VERIFICATION: [how to check the work is correct]
```

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-10 | Created ORCHESTRATOR.md as living context file | Repo complex enough that compaction would lose critical detail |
| 2026-05-10 | Brand voice skill confirmed at `.github/skills/brand-voice/SKILL.md` and mirrored in `.claude/brand-voice.local.md` | Both files identical — SKILL.md is canonical |
| 2026-05-10 | A.I. Blogger identity established, orchestrator pattern adopted | Per user instruction |
| 2026-05-10 | Installed `content-strategy` and `seo-audit` skills from `coreyhaines31/marketingskills` via npx | Blog content planning and SEO auditing capability |
| 2026-05-10 | Installed `subagent-driven-development` skill from `obra/superpowers` via npx | Formalises subagent orchestration pattern |
| 2026-05-10 | Created `.github/copilot-instructions.md` — always-on repo instructions | Establishes A.I. Blogger identity and conventions in every Copilot session |
| 2026-05-10 | Created `.github/agents/ai-blogger.agent.md` — custom Copilot agent mode | On-demand orchestrator with full skill/convention context and tool restrictions |
| 2026-05-10 | Skills from npx CLI install to `.agents/skills/` (universal path) — not `.github/skills/` | Both locations are read by GitHub Copilot; CLI-installed skills go to `.agents/`, hand-crafted skills stay in `.github/skills/` |
| 2026-05-10 | Created `2026-05-10-useradminmodule.md` — UserAdminModule introduction post | Standalone post; categories [Blog]; pending push |
| 2026-05-10 | Created DigitalTAK series (Parts 1–6) — all dated 2026-05-10 | 6-article series covering TAK overview, stack, DigitalTAK architecture, deployment, onboarding, and TAKServerPS API; categories [Blog, Series]; pending push |
| 2026-05-10 | All posts use bare `date: YYYY-MM-DD` (no time component) | Avoids Jekyll `future: false` UTC exclusion — lesson learned from powershell-history-tips.md datetime issue |
| 2026-05-10 | DigitalTAK series internal links use `/blog/series/` permalink pattern | Consistent with Minimal Mistakes category URL structure; will resolve once posts are published |
| 2026-05-10 | Installed `copywriting`, `ai-seo`, `schema-markup` skills from `coreyhaines31/marketingskills` via npx | Closes skill gaps: copywriting formalises post-drafting framework; ai-seo adds AI citation optimisation; schema-markup enables JSON-LD structured data for BlogPosting/BreadcrumbList |
| 2026-05-10 | Created `.agents/product-marketing-context.md` | Provides persistent site context for all skills that check this file — prevents repeated context questions each session |
| 2026-05-10 | Updated `ai-blogger.agent.md`, `copilot-instructions.md`, `ORCHESTRATOR.md` Skills tables | Added rows for `copywriting`, `ai-seo`, `schema-markup` to all three docs |
| 2026-05-10 | Fixed stale Known Fragile Areas entries in `ORCHESTRATOR.md` and `copilot-instructions.md` | `.github/agents/` is not empty (ai-blogger.agent.md exists); `powershell-history-tips.md` dated version is published |
| 2026-05-10 | Created `2026-05-10-new-shell-useradminmodule.md` — New-Shell blog post | Documents New-Shell function from UserAdminModule; categories [Blog, Module]; pending push |

---

## Posts Inventory

| File | Date | Title | Status |
|------|------|-------|--------|
| `2019-11-23-post-installing-psciscomeraki.md` | 2019-11-23 | Installing PSCiscoMeraki | Published |
| `2020-03-28-PSCovid19Stats.md` | 2020-03-28 | PSCovid19Stats | Published |
| `2020-05-30-Container-refurb-v6.0.md` | 2020-05-30 | Container Refurb v6.0 | Published |
| `2020-08-07-Arctic-Code-Vault.md` | 2020-08-07 | Arctic Code Vault | Published |
| `2020-08-08-Learning-PowerShell-from-scripting-to-cmdlet-part1.md` | 2020-08-08 | Learning PowerShell Part 1 | Published |
| `2020-08-21-Its-official-I-am-old.md` | 2020-08-21 | It's Official (I am old) | Published |
| `2020-08-27-Unwanted-Parcels.md` | 2020-08-27 | Unwanted Parcels | Published |
| `2020-10-11-Text-alerts.md` | 2020-10-11 | Text Alerts | Published |
| `2020-10-23-script-blog.md` | 2020-10-23 | Hey people, I made a blog! | Published |
| `2021-01-03-The-PowerShell-Profile.md` | 2021-01-03 | The PowerShell Profile | Published |
| `2026-05-10-powershell-history-tips.md` | 2026-05-10 | Your PowerShell History is Trying to Help You | Published |
| `2026-05-10-useradminmodule.md` | 2026-05-10 | Stop Dot-Sourcing. Start Managing. — Introducing UserAdminModule | Pending push |
| `2026-05-10-digitaltak-part1-what-is-tak.md` | 2026-05-10 | DigitalTAK, Part 1 — What on Earth is TAK? | Pending push |
| `2026-05-10-digitaltak-part2-understanding-the-tak-stack.md` | 2026-05-10 | DigitalTAK, Part 2 — Understanding the TAK Stack | Pending push |
| `2026-05-10-digitaltak-part3-what-digitaltak-automates.md` | 2026-05-10 | DigitalTAK, Part 3 — What DigitalTAK Automates | Pending push |
| `2026-05-10-digitaltak-part4-running-the-deployment.md` | 2026-05-10 | DigitalTAK, Part 4 — Running the Deployment | Pending push |
| `2026-05-10-digitaltak-part5-onboarding-your-team.md` | 2026-05-10 | DigitalTAK, Part 5 — Onboarding Your Team | Pending push |
| `2026-05-10-digitaltak-part6-takserverps-api-wrapper.md` | 2026-05-10 | DigitalTAK, Part 6 — The TAKServerPS API Wrapper | Pending push |
| `2026-05-10-new-shell-useradminmodule.md` | 2026-05-10 | New-Shell — Stop Right-Clicking, Start Scripting | Pending push |
| `powershell-history-tips.md` | **MISSING** | (original broken file) | **DELETE** — no date prefix, no front matter; Jekyll ignores it |

### Drafts
| File | Approximate Topic |
|------|-------------------|
| `2022-06-02-Building-a-jekyll-blog-dev-server.md` | Why I built a Docker dev server |
| `Creating-a-PowerShell-Tool.md` | PowerShell tool creation |
| `Learning-PowerShell-from-scripting-to-cmdlet-part2.md` | PowerShell series Part 2 (companion to published Part 1) |
| `New-admin-session.md` | New admin session tooling |
| `PSCiscoMeraki-Downloads.md` | PSCiscoMeraki module downloads |

---

*Last updated: 2026-05-10 by A.I. Blogger*
