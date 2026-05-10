---
name: github-management
description: >
  GitHub specialist for the BanterBoy/BanterBoy.github.io repository (blog.lukeleigh.com).
  Manages repository settings, issue and PR templates, labels, and release/deploy
  workflows. USE FOR: creating or updating issue templates, PR templates, managing
  labels, triaging issues, reviewing PRs for blog post compliance, setting up branch
  protection, managing GitHub Actions, auditing repo configuration. DO NOT USE FOR:
  writing blog posts (use ai-blogger agent), writing PowerShell scripts (use default
  agent), or managing other repositories.
---

# GitHub Management Skill — BanterBoy/BanterBoy.github.io

## Purpose

Provide a structured, repeatable workflow for managing the **BanterBoy/BanterBoy.github.io** GitHub repository — covering repository configuration, issue/PR lifecycle, label management, and deploy/publish workflows. All operations target the `master` branch (default).

## When This Skill Applies

Activate when the user:

- Wants to **create or manage issues** (templates, labels, triage)
- Needs to **create or review pull requests** (templates, checklists, post compliance)
- Asks about **publishing**, deploying, or GitHub Pages build status
- Wants to **configure repository settings** (branch protection, labels, Actions)
- Mentions "GitHub", "issue template", "PR template", "labels", "repo settings", or "branch protection" in context of this blog
- Asks to audit or improve the repository's GitHub configuration

## Repository Context

| Property | Value |
|---|---|
| **Owner** | BanterBoy |
| **Repository** | BanterBoy.github.io |
| **Default Branch** | master |
| **Current Branch** | master |
| **Description** | Jekyll blog — blog.lukeleigh.com — PowerShell, infrastructure, IT contracting |
| **Key Folders** | `_posts/`, `_drafts/`, `_pages/`, `_includes/`, `_layouts/`, `_sass/`, `assets/`, `_data/`, `_docs/` |
| **Theme** | Minimal Mistakes `mmistakes/minimal-mistakes@4.17.2` — do NOT bump without Docker test |
| **CI** | Azure Pipelines (`azure-pipelines.yml`) + GitHub Pages (push to master triggers build) |
| **Local Dev** | `docker-compose up` → port 4000, drafts enabled |

### Current GitHub Configuration State

| Feature | Status |
|---|---|
| Issue Templates | Present — `.github/ISSUE_TEMPLATE/` (4 files: bug_report, feature_request, documentation, support) |
| PR Template | Present — `.github/PULL_REQUEST_TEMPLATE.md` |
| GitHub Actions Workflows | **Not configured** — uses Azure Pipelines instead |
| Azure Pipelines | Configured — `azure-pipelines.yml` |
| stale.yml | Configured — issues go stale at 30 days, close at 37 |
| Labels | Configured (default GitHub set) |
| CHANGELOG | **Not present** |
| CONTRIBUTING.md | Present — `.github/CONTRIBUTING.md` (needs blog-specific content) |
| LICENSE | **Not present** |
| Wiki | Not used — internal docs in `_docs/` |

## Available Tools

This skill uses the following tools depending on the task:

| Tool Category | Tools Available | Used For |
|---|---|---|
| **Issue/PR Queries** | `github-pull-request_issue_fetch`, `github-pull-request_doSearch`, `github-pull-request_currentActivePullRequest` | Fetching issues, searching, active PR details |
| **Labels** | `github-pull-request_labels_fetch` | Listing repository labels |
| **PR Status** | `github-pull-request_pullRequestStatusChecks`, `github-pull-request_pullRequestInViewport` | PR checks, open PR details |
| **Notifications** | `github-pull-request_notification_fetch` | Fetching GitHub notifications |
| **Repo Info** | `github_repo` | Repository metadata |
| **File Operations** | `create_file`, `replace_string_in_file`, `multi_replace_string_in_file` | Creating/updating templates, configs |
| **Web Search** | `vscode-websearchforcopilot_webSearch` | GitHub docs, Jekyll troubleshooting |
| **Terminal** | `run_in_terminal` | Git commands, `gh` CLI operations |

> **Note:** The `gh` CLI may not be installed. For operations requiring it, install with: `winget install --id GitHub.cli`

---

## Workflow 1 — Issue Management

### When to Use

User asks to create issues, triage existing issues, update issue templates, or manage labels.

### Issue Templates

All issue templates live in `.github/ISSUE_TEMPLATE/`. This repo uses four:

#### Bug Report — `.github/ISSUE_TEMPLATE/bug_report.md`

Reports of something broken on the site — layout issues, broken links, Jekyll build failures, missing assets.

```markdown
---
name: "Bug Report"
about: "Something on the site isn't working correctly"
title: "[BUG] "
labels: bug
assignees: BanterBoy
---

## What's broken

Describe the issue. Include the URL of the affected page if applicable.

## Steps to reproduce

1. Go to `{URL}`
2. {Action}
3. Observe `{unexpected behaviour}`

## Expected behaviour

What should happen.

## Actual behaviour

What actually happens. Include screenshots, error messages, or browser console output.

## Environment

- **Browser:** {Chrome / Firefox / Safari / Edge + version}
- **OS:** {Windows / macOS / iOS / Android}
- **Device:** {Desktop / Mobile / Tablet}

## Additional context

{Any other context — e.g. does it happen on mobile only, in a specific browser, after a recent post was published?}
```

#### Feature Request — `.github/ISSUE_TEMPLATE/feature_request.md`

Suggestions for new site features, post topics, or blog improvements.

```markdown
---
name: "Feature / Content Request"
about: "Suggest a new post topic, site feature, or improvement"
title: "[REQUEST] "
labels: enhancement
assignees: BanterBoy
---

## Summary

A brief description of the request.

## Type of request

- [ ] New blog post topic
- [ ] Site feature or layout improvement
- [ ] Navigation or UX change
- [ ] Other

## Detail

For **post topics**: What should the post cover? Why would it be useful?

For **site features**: What should it do? How should it work?

## Why this matters

What problem does this solve or what value does it add?

## Additional context

{Any references, examples from other sites, or other context.}
```

#### Documentation — `.github/ISSUE_TEMPLATE/documentation.md`

Corrections to post content — factual errors, outdated code samples, broken reference links.

```markdown
---
name: "Documentation / Content Correction"
about: "Found a factual error, outdated code sample, or broken link in a post"
title: "[DOCS] "
labels: documentation
assignees: BanterBoy
---

## Affected post

URL or filename of the post: `{URL or _posts/YYYY-MM-DD-filename.md}`

## What's wrong

Describe the error or outdated content.

## Suggested correction

What should it say instead? Include corrected code samples if applicable.

## Source / reference

{Link to the correct documentation, updated module release, or other reference.}
```

#### Support / Question — `.github/ISSUE_TEMPLATE/support.md`

General questions about posts, code samples, or the blog.

```markdown
---
name: "Question"
about: "A question about a post, code sample, or something on the site"
title: "[QUESTION] "
labels: question
assignees: BanterBoy
---

## Your question

{Ask your question here. Include the URL of the relevant post if applicable.}

## What you've already tried

{Have you checked the docs? Tried the code sample? What happened?}

## Context

{PowerShell version, OS, relevant module versions — anything that helps.}
```

### Triage Workflow

1. **Is it a duplicate?** → Label `duplicate`, link the original, close
2. **Is it a site bug?** → Label `bug`, assess:
   - **Build failure / site down** → also label `help wanted`, priority fix
   - **Cosmetic / single page** → label as-is
3. **Is it a content correction?** → Label `documentation`
4. **Is it a post/feature request?** → Label `enhancement`
5. **Is it a question?** → Label `question`, answer if possible, close when resolved
6. **Won't address?** → Label `wontfix`, brief explanation, close

### Label Reference

| Label | Colour | Use For |
|---|---|---|
| `bug` | Red (#d73a4a) | Something isn't working on the site |
| `enhancement` | Teal (#a2eeef) | New post topic or site feature |
| `documentation` | Blue (#0075ca) | Content corrections, outdated posts |
| `duplicate` | Grey (#cfd3d7) | Already reported |
| `good first issue` | Purple (#7057ff) | Simple fix, good for contributors |
| `help wanted` | Green (#008672) | Needs attention |
| `question` | Pink (#d876e3) | Reader question |
| `invalid` | Yellow (#e4e669) | Not a valid issue for this repo |
| `wontfix` | White (#ffffff) | Deliberate decision not to change |

---

## Workflow 2 — Pull Request Management

### When to Use

User asks to create, review, or update the PR template, or to review an open PR for blog post compliance.

### PR Template — `.github/PULL_REQUEST_TEMPLATE.md`

```markdown
## Summary

{Describe what this PR does — new post, layout fix, config change, etc.}

## Type of change

- [ ] New blog post
- [ ] Post correction / update
- [ ] Jekyll / theme change
- [ ] Site configuration change
- [ ] Asset / image addition
- [ ] Other

## Files changed

| File | Change |
|------|--------|
| `{path}` | {what changed} |

## Post checklist (complete for new posts or post edits)

### Front matter
- [ ] Filename: `YYYY-MM-DD-kebab-case-title.md` in `_posts/`
- [ ] `date:` uses bare `YYYY-MM-DD` format (no time component)
- [ ] `layout: single`
- [ ] `title`, `excerpt`, `categories`, `tags` all present
- [ ] `toc: true`, `toc_label`, `toc_icon`, `toc_sticky: true` present
- [ ] `header.overlay_image` and `header.overlay_filter: rgba(90, 104, 129, 0.7)` set

### Post anatomy (in order)
- [ ] Formspree boilerplate present (`action: https://formspree.io/xvowjgjd` — verbatim)
- [ ] Print button present (`{: .text-right}` + `<button onclick="window.print()">`)
- [ ] Section headings use Font Awesome icons (`color: white`)
- [ ] Back-to-top links present between sections
- [ ] Reference links at end: `[1]: https://...` with `{:target="\_blank"}` inline

### Brand voice
- [ ] British English throughout (colour, behaviour, whilst, licence)
- [ ] Contractions used (it's, I'm, didn't)
- [ ] Personal context / anecdote before the technical point
- [ ] No overselling

### Jekyll safety
- [ ] `_config.yml` not modified (or change is explicitly scoped and safe)
- [ ] `remote_theme` pin unchanged (`mmistakes/minimal-mistakes@4.17.2`)
- [ ] Formspree endpoint unchanged (`https://formspree.io/xvowjgjd`)
- [ ] No Algolia admin key introduced anywhere in repo files

## Related issues

Closes #{issue_number}

## Notes

{Anything reviewers should know — images referenced, external links verified, etc.}
```

### PR Review Checklist

When reviewing a PR, check in this order:

1. **Filename** — `YYYY-MM-DD-kebab-case.md` in `_posts/`
2. **Date format** — `date: YYYY-MM-DD` bare format only — no `T` time component (causes `future: false` exclusion)
3. **Formspree endpoint** — must be `https://formspree.io/xvowjgjd` verbatim
4. **Remote theme pin** — `remote_theme` unchanged in `_config.yml` if touched
5. **Post anatomy** — Formspree → print button → FA icon headings → back-to-top → numbered refs
6. **British English** — colour, behaviour, organisation, whilst, licence (noun)
7. **Reference links** — `{:target="\_blank"}` on every external link
8. **Images** — all `overlay_image` and `teaser` paths exist in `assets/`
9. **No secrets** — no Algolia admin key, no API keys, no credentials

---

## Workflow 3 — Deploy and Publish

### How Publishing Works

Pushing to `master` triggers two build paths:

1. **GitHub Pages** — Automatic build via GitHub's Jekyll builder. Posts appear live within 1–3 minutes of push.
2. **Azure Pipelines** — Configured in `azure-pipelines.yml` for additional CI steps.

### Common Publish Commands

```powershell
# Stage and commit a new post
git -C "C:\GitRepos\BanterBoy.github.io" add "_posts/YYYY-MM-DD-post-slug.md"
git -C "C:\GitRepos\BanterBoy.github.io" commit -m "Add: Post title"
git -C "C:\GitRepos\BanterBoy.github.io" push origin master

# Stage multiple posts
git -C "C:\GitRepos\BanterBoy.github.io" add "_posts/2026-05-10-*.md"
git -C "C:\GitRepos\BanterBoy.github.io" commit -m "Add: DigitalTAK series Parts 1-6"
git -C "C:\GitRepos\BanterBoy.github.io" push origin master
```

### Publish Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Post doesn't appear after push | `date:` has time component (`T09:00:00`) | Change to bare `YYYY-MM-DD` |
| Post doesn't appear after push | Post in `_drafts/` not `_posts/` | Move file to `_posts/` |
| Post doesn't appear after push | No front matter (`---` delimiters) | Add YAML front matter block |
| Site build fails | Liquid syntax error in post | Check `{{ }}` and `{% %}` tags |
| Site build fails | Invalid YAML in front matter | Validate YAML (no tabs, correct quoting) |
| CSS broken after config change | `remote_theme` bumped | Restore `mmistakes/minimal-mistakes@4.17.2` |

---

## Workflow 4 — Repository Configuration

### When to Use

User asks to set up branch protection, configure repo settings, add GitHub Actions, or audit configuration.

### Recommended Branch Protection Rules (master)

| Setting | Recommended Value |
|---|---|
| Require pull request before merging | Optional — solo repo, direct push to master is normal workflow |
| Require status checks to pass | **Yes** — once Jekyll build Action is configured |
| Require branches to be up to date | **Yes** |
| Allow force pushes | **No** |
| Allow deletions | **No** |

### Recommended GitHub Actions

#### Jekyll Build Validation

**File:** `.github/workflows/jekyll-build.yml`

```yaml
name: Jekyll Build Check

on:
  pull_request:
    branches: [master]
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Jekyll site
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site
```

This catches front matter errors, Liquid syntax errors, and broken includes before they reach GitHub Pages.

---

## Quality Checks

Before completing any GitHub management task, verify:

### Issue Templates
- [ ] YAML frontmatter includes `name`, `about`, `title`, `labels`, `assignees`
- [ ] Labels reference actual repository labels
- [ ] Questions guide the reporter to actionable information
- [ ] No references to `mmistakes/minimal-mistakes/issues` (wrong repo)

### PR Template
- [ ] Post anatomy checklist complete and accurate
- [ ] Brand voice items present (British English, contractions, personal context)
- [ ] Jekyll safety items present (config.yml, remote_theme, Formspree endpoint)
- [ ] Date format warning present (`YYYY-MM-DD` bare, no time component)

### Repository Configuration
- [ ] Branch protection prevents accidental force pushes
- [ ] stale.yml exempts issues under active consideration
- [ ] No Algolia admin key in any repo file

---

## Defaults Reference

| Field | Default Value |
|---|---|
| Repository | BanterBoy/BanterBoy.github.io |
| Default Branch | master |
| Assignee | BanterBoy |
| Author | Luke Leigh |
| Theme | mmistakes/minimal-mistakes@4.17.2 |
| Formspree Endpoint | `https://formspree.io/xvowjgjd` (never change) |
| Issue Template Location | `.github/ISSUE_TEMPLATE/` |
| PR Template Location | `.github/PULL_REQUEST_TEMPLATE.md` |
| Workflow Location | `.github/workflows/` |
| CI | Azure Pipelines (`azure-pipelines.yml`) |

---

## Example Prompts

> "Set up issue templates for the blog"

→ Creates four templates (bug report, feature/content request, documentation correction, question) in `.github/ISSUE_TEMPLATE/`

> "Create a PR template"

→ Generates `.github/PULL_REQUEST_TEMPLATE.md` with blog post anatomy checklist and Jekyll safety checks

> "What issues are open right now?"

→ Fetches and summarises open issues with labels and status

> "Review the current PR"

→ Fetches active PR, runs through the post compliance checklist, reports findings

> "Set up Jekyll build validation"

→ Creates `.github/workflows/jekyll-build.yml` to catch build errors on push/PR

> "Triage this issue"

→ Reads the issue, applies the triage decision tree, recommends labels and next steps

> "Why isn't my post showing on the site?"

→ Runs through publish troubleshooting table — date format, file location, front matter, Liquid errors
