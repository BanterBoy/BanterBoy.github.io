---
name: github-management
description: >
  GitHub specialist for the BanterBoy/RDGScripts repository. Manages repository
  settings, wiki documentation, issues, pull requests, labels, releases, and
  changelogs. USE FOR: creating or updating wiki pages, generating issue/PR
  templates, triaging issues, reviewing PRs with checklists, creating releases
  with changelogs, setting up branch protection, managing labels, generating
  release notes, auditing repo configuration. DO NOT USE FOR: writing PowerShell
  scripts (use default agent), creating change requests (use change-request skill),
  or managing other repositories.
---

# GitHub Management Skill — BanterBoy/RDGScripts

## Purpose

Provide a structured, repeatable workflow for managing the **BanterBoy/RDGScripts** GitHub repository — covering repository configuration, wiki documentation, issue/PR lifecycle, and release management. All operations target the `prod` branch (default).

## When This Skill Applies

Activate when the user:

- Asks to create, update, or review **wiki pages** or repository documentation
- Wants to **create or manage issues** (templates, labels, triage)
- Needs to **create or review pull requests** (templates, checklists, descriptions)
- Asks about **releases**, changelogs, tagging, or release notes
- Wants to **configure repository settings** (branch protection, labels, collaborators)
- Mentions "GitHub", "wiki", "issue template", "PR template", "release", "changelog", or "repo settings" in context of RDGScripts
- Asks to audit or improve the repository's GitHub configuration

## Repository Context

| Property | Value |
|---|---|
| **Owner** | BanterBoy |
| **Repository** | RDGScripts |
| **Default Branch** | prod |
| **Current Branch** | prod |
| **Description** | PowerShell scripts and modules for Windows infrastructure automation |
| **Key Folders** | Functions/, Scripts/, AdminFunctions/, AutomatedLab/, FirewallUpgrade/, DHCPmigration/ |

### Current GitHub Configuration State

| Feature | Status |
|---|---|
| Issue Templates | **Not configured** — `.github/ISSUE_TEMPLATE/` missing |
| PR Template | **Not configured** — `.github/pull_request_template.md` missing |
| GitHub Actions Workflows | **Not configured** — `.github/workflows/` missing |
| Labels | Configured (bug, codex, documentation, duplicate, enhancement, good first issue, help wanted, invalid, question, wontfix) |
| CHANGELOG | **Not present** |
| CONTRIBUTING.md | **Not present** |
| LICENSE | **Not present** |
| Wiki | Use GitHub wiki or in-repo `/docs` folder |

## Available Tools

This skill uses the following tools depending on the task:

| Tool Category | Tools Available | Used For |
|---|---|---|
| **Issue/PR Queries** | `github-pull-request_issue_fetch`, `github-pull-request_doSearch`, `github-pull-request_activePullRequest` | Fetching issues, searching, active PR details |
| **Labels** | `github-pull-request_labels_fetch` | Listing repository labels |
| **PR Status** | `github-pull-request_pullRequestStatusChecks`, `github-pull-request_openPullRequest` | PR checks, opening PRs |
| **Notifications** | `github-pull-request_notification_fetch` | Fetching GitHub notifications |
| **Repo Info** | `github_repo` | Repository metadata |
| **File Operations** | `create_file`, `replace_string_in_file` | Creating templates, wiki pages, configs |
| **Web Search** | `vscode-websearchforcopilot_webSearch` | Looking up GitHub API docs, best practices |
| **Terminal** | `run_in_terminal` | Git commands, future `gh` CLI operations |

> **Note:** The `gh` CLI is **not currently installed**. For operations requiring `gh` (creating releases, managing settings via CLI), the skill will provide the commands and prompt the user to install it first: `winget install --id GitHub.cli`

---

## Workflow 1 — Wiki Documentation

### When to Use

User asks to create wiki pages, document a folder/module, generate documentation, or maintain wiki structure.

### Wiki Page Standard Format

All wiki pages for RDGScripts follow this structure:

```markdown
# {Page Title}

> **Last Updated:** {DATE} | **Author:** Luke Leigh

## Overview

{One to three sentences describing the purpose and scope.}

## Prerequisites

- {Required modules, permissions, or tools}
- {PowerShell version requirements}

## Contents

| Script/Function | Description | Parameters |
|---|---|---|
| `{Name}` | {What it does} | `-Param1`, `-Param2` |

## Usage Examples

### {Example Title}

```powershell
# {Description of what this example does}
{Code example}
`` `

## Related Pages

- [{Related Topic}]({link})

## Notes

- {Important caveats, known issues, or tips}
```

### Workflow Steps

1. **Identify the target** — Which folder, module, or topic needs documentation?
2. **Scan existing content** — Read scripts in the target folder to extract:
   - Function names and their `SYNOPSIS`/`DESCRIPTION` from comment-based help
   - Parameter definitions and validation attributes
   - Example usage from `.EXAMPLE` blocks
   - Dependencies and required modules
3. **Generate the wiki page** — Fill in the standard format above with extracted details
4. **Create the file** — Save to `.github/wiki/{slug}.md` (or the repo wiki if using GitHub wiki)
5. **Update the Home page** — Add the new page to the wiki navigation/index

### Wiki Navigation Structure (Home.md)

```markdown
# RDGScripts Wiki

## Quick Links

- [Getting Started](Getting-Started)
- [Contributing](Contributing)
- [Coding Standards](Coding-Standards)

## Script Documentation

| Folder | Description | Wiki Page |
|---|---|---|
| Functions/ | Shared reusable functions | [Functions](Functions) |
| AutomatedLab/ | Hyper-V lab automation | [AutomatedLab](AutomatedLab) |
| DHCPmigration/ | DHCP server migration tools | [DHCP-Migration](DHCP-Migration) |
| FirewallUpgrade/ | Firewall upgrade scripts | [Firewall-Upgrade](Firewall-Upgrade) |
| AdminFunctions/ | Infrastructure submodules (loaded by UserAdminModule PSGallery framework) | [AdminFunctions](AdminFunctions) |
| Scripts/ | Standalone utility scripts | [Scripts](Scripts) |

## Repository Management

- [Release Process](Release-Process)
- [Branch Strategy](Branch-Strategy)
- [Change Requests](Change-Requests)
```

---

## Workflow 2 — Issue Management

### When to Use

User asks to create issues, triage existing issues, set up issue templates, or manage labels.

### Issue Templates

Create issue templates in `.github/ISSUE_TEMPLATE/` with this structure:

#### Bug Report Template

**File:** `.github/ISSUE_TEMPLATE/bug_report.md`

```markdown
---
name: Bug Report
about: Report a script or module that isn't working correctly
title: "[BUG] "
labels: bug
assignees: BanterBoy
---

## Description

A clear description of what the bug is.

## Script/Function Affected

- **File:** `{path to script}`
- **Function:** `{function name if applicable}`

## Steps to Reproduce

1. Run `{command}`
2. With parameters `{params}`
3. Observe `{unexpected behavior}`

## Expected Behaviour

What should happen instead.

## Actual Behaviour

What actually happens. Include error messages verbatim.

## Environment

- **PowerShell Version:** {5.1 / 7.x}
- **OS:** {Windows Server 2022 / Windows 11 / etc.}
- **Required Modules:** {list any relevant modules and versions}

## Additional Context

Any other context, screenshots, or log output.
```

#### Enhancement Template

**File:** `.github/ISSUE_TEMPLATE/enhancement.md`

```markdown
---
name: Enhancement
about: Suggest a new feature or improvement to an existing script
title: "[ENHANCEMENT] "
labels: enhancement
assignees: BanterBoy
---

## Description

Describe the enhancement or new feature.

## Use Case

Why is this needed? What problem does it solve?

## Proposed Solution

How should this work? Include example usage if possible.

```powershell
# Example of how the new feature would be used
Get-Example -NewParameter "value"
`` `

## Affected Scripts/Modules

- `{path to affected files}`

## Alternatives Considered

Any alternative approaches considered and why they were rejected.
```

#### Documentation Template

**File:** `.github/ISSUE_TEMPLATE/documentation.md`

```markdown
---
name: Documentation
about: Request new or updated documentation
title: "[DOCS] "
labels: documentation
assignees: BanterBoy
---

## What Needs Documenting

Describe what documentation is missing or needs updating.

## Location

Where should this documentation live?
- [ ] Wiki page
- [ ] Script comment-based help
- [ ] README file
- [ ] Inline code comments

## Current State

What documentation exists today (if any)?

## Desired State

What should the documentation cover?
```

### Triage Workflow

When triaging issues, apply this decision tree:

1. **Is it a duplicate?** → Label `duplicate`, reference original, close
2. **Is it a bug?** → Label `bug`, assess severity:
   - **Breaks core functionality** → also label `help wanted`
   - **Minor/cosmetic** → label as-is
3. **Is it an enhancement?** → Label `enhancement`
4. **Needs more info?** → Label `question`, ask for specifics
5. **Won't address?** → Label `wontfix`, explain why, close

### Label Reference

| Label | Colour | Use For |
|---|---|---|
| `bug` | Red (#d73a4a) | Something isn't working |
| `enhancement` | Teal (#a2eeef) | New feature or request |
| `documentation` | Blue (#0075ca) | Documentation improvements |
| `duplicate` | Grey (#cfd3d7) | Already exists |
| `good first issue` | Purple (#7057ff) | Good for newcomers |
| `help wanted` | Green (#008672) | Extra attention needed |
| `question` | Pink (#d876e3) | Needs more information |
| `invalid` | Yellow (#e4e669) | Not valid |
| `wontfix` | White (#ffffff) | Will not be worked on |
| `codex` | Grey (#ededed) | Codex-related |

---

## Workflow 3 — Pull Request Management

### When to Use

User asks to create PRs, review PRs, set up PR templates, or establish review checklists.

### PR Template

**File:** `.github/pull_request_template.md`

```markdown
## Description

{Brief description of what this PR does.}

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to change)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Scripts/Modules Changed

| File | Change Summary |
|---|---|
| `{path}` | {what changed} |

## Checklist

### Coding Standards
- [ ] Functions use **approved PowerShell verbs** (Get-, Set-, New-, Remove-, Invoke-, Start-, Stop-, Export-, Import-, Enable-, Disable-, Test-, Find-, Add-, Update-)
- [ ] All functions include `[CmdletBinding()]`
- [ ] Parameters use validation attributes (`[ValidateNotNullOrEmpty()]`, `[ValidateSet()]`, etc.)
- [ ] Error handling uses **trap statements only** (no try/catch)
- [ ] String interpolation uses `$(variable)` before special characters (`:`, `.`)
- [ ] Complete comment-based help (SYNOPSIS, DESCRIPTION, PARAMETER, EXAMPLE, NOTES)

### Testing
- [ ] Tested in Windows PowerShell 5.1
- [ ] Tested in PowerShell 7.x (if applicable)
- [ ] Example usage verified and working
- [ ] No breaking changes to existing functions

### Documentation
- [ ] Updated relevant README or wiki page
- [ ] Added usage examples in comments
- [ ] Microsoft documentation referenced where applicable

## Related Issues

Closes #{issue_number}

## Additional Notes

{Any context reviewers should know.}
```

### PR Review Checklist

When reviewing a PR, check these items in order:

1. **Verb Compliance** — Every function uses an approved verb (Get-, Set-, New-, Remove-, Invoke-, Start-, Stop-, Export-, Import-, Enable-, Disable-, Test-, Find-, Add-, Update-)
2. **Advanced Functions** — All functions have `[CmdletBinding()]`
3. **Error Handling** — Only `trap` statements used, **no try/catch anywhere**
4. **Parameter Validation** — `[ValidateNotNullOrEmpty()]`, `[ValidateSet()]`, `[ValidateRange()]` where appropriate
5. **String Interpolation** — Variables followed by `:` or `.` are wrapped in `$()`
6. **Comment-Based Help** — SYNOPSIS, DESCRIPTION, PARAMETER, EXAMPLE, NOTES present
7. **No Write-Host** — Uses `Write-Verbose` or `Write-Information` instead
8. **Reusability** — Shared logic belongs in `Functions/`, not duplicated
9. **Module Structure** — If module code, follows `Public/Private/Resources` pattern
10. **Documentation** — Examples included, README updated if needed

---

## Workflow 4 — Release Management

### When to Use

User asks to create a release, generate a changelog, tag a version, or produce release notes.

### Version Numbering

Follow **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

| Increment | When |
|---|---|
| **MAJOR** | Breaking changes to existing function signatures or behaviour |
| **MINOR** | New functions, scripts, or non-breaking enhancements |
| **PATCH** | Bug fixes, documentation updates, minor corrections |

### Changelog Format

**File:** `CHANGELOG.md` (root of repository)

```markdown
# Changelog

All notable changes to the RDGScripts repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- {New scripts, functions, or features}

### Changed
- {Modifications to existing scripts or functions}

### Fixed
- {Bug fixes}

### Removed
- {Deprecated or removed scripts}

---

## [{VERSION}] - {YYYY-MM-DD}

### Added
- {Description of new additions}

### Changed
- {Description of changes}

### Fixed
- {Description of fixes}
```

### Release Workflow

1. **Gather changes** — Use git log to identify commits since last release:
   ```
   git log --oneline {last_tag}..HEAD
   ```
2. **Categorise changes** — Sort commits into Added / Changed / Fixed / Removed
3. **Update CHANGELOG.md** — Move items from `[Unreleased]` to new version section
4. **Create git tag** — Tag the release commit:
   ```
   git tag -a v{VERSION} -m "Release v{VERSION}: {summary}"
   ```
5. **Push tag** — Push the tag to remote:
   ```
   git push origin v{VERSION}
   ```
6. **Generate release notes** — Compile from changelog into GitHub release format:

```markdown
# Release v{VERSION} — {YYYY-MM-DD}

## Highlights

{One to three sentence summary of the most important changes.}

## What's New

- {Key additions}

## Changes

- {Key modifications}

## Bug Fixes

- {Key fixes}

## Full Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete details.

**Full Diff:** [{prev_version}...v{VERSION}](https://github.com/BanterBoy/RDGScripts/compare/{prev_version}...v{VERSION})
```

7. **Create GitHub release** — Once `gh` CLI is available:
   ```
   gh release create v{VERSION} --title "v{VERSION}" --notes-file release-notes.md
   ```

---

## Workflow 5 — Repository Configuration

### When to Use

User asks to set up branch protection, configure repo settings, manage collaborators, or audit configuration.

### Recommended Branch Protection Rules (prod)

| Setting | Recommended Value |
|---|---|
| Require pull request before merging | **Yes** |
| Required approving reviews | **1** |
| Dismiss stale reviews on new pushes | **Yes** |
| Require status checks to pass | **Yes** (once Actions are configured) |
| Require branches to be up to date | **Yes** |
| Restrict who can push | **Repository admins only** |
| Allow force pushes | **No** |
| Allow deletions | **No** |

### GitHub Actions — Recommended Starter Workflows

#### PSScriptAnalyzer Lint

**File:** `.github/workflows/lint.yml`

```yaml
name: PowerShell Lint

on:
  pull_request:
    branches: [prod]
    paths: ['**/*.ps1', '**/*.psm1', '**/*.psd1']
  push:
    branches: [prod]
    paths: ['**/*.ps1', '**/*.psm1', '**/*.psd1']

jobs:
  lint:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run PSScriptAnalyzer
        shell: pwsh
        run: |
          Install-Module -Name PSScriptAnalyzer -Force -Scope CurrentUser
          $results = Invoke-ScriptAnalyzer -Path . -Recurse -Settings PSGallery
          $results | Format-Table -AutoSize
          if ($results | Where-Object Severity -eq 'Error') {
            throw "PSScriptAnalyzer found errors"
          }
```

#### Pester Tests

**File:** `.github/workflows/test.yml`

```yaml
name: Pester Tests

on:
  pull_request:
    branches: [prod]
  push:
    branches: [prod]

jobs:
  test:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Pester Tests
        shell: pwsh
        run: |
          Install-Module -Name Pester -Force -Scope CurrentUser -MinimumVersion 5.0
          $config = New-PesterConfiguration
          $config.Run.Path = '.'
          $config.Run.Recurse = $true
          $config.Filter.Tag = @()
          $config.TestResult.Enabled = $true
          $config.TestResult.OutputFormat = 'NUnitXml'
          Invoke-Pester -Configuration $config
```

---

## Quality Checks

Before completing any GitHub management task, verify:

### Wiki Pages
- [ ] Follows the standard wiki page format
- [ ] All functions listed with accurate descriptions
- [ ] Usage examples are valid PowerShell (approved verbs, trap error handling)
- [ ] Prerequisites listed correctly
- [ ] Related pages linked

### Issue Templates
- [ ] YAML frontmatter includes `name`, `about`, `title`, `labels`, `assignees`
- [ ] Labels reference existing repository labels
- [ ] Template sections guide the reporter to provide actionable information

### PR Templates
- [ ] Checklist enforces RDGScripts coding standards (trap statements, approved verbs, CmdletBinding, validation, help)
- [ ] Type of change options cover all scenarios
- [ ] Related issues field included

### Releases
- [ ] Version follows SemVer
- [ ] CHANGELOG.md updated with all changes categorised
- [ ] Release notes include highlights, diff link, and full changelog reference
- [ ] Git tag created and pushed

### Repository Configuration
- [ ] Branch protection prevents direct pushes to prod
- [ ] Workflows validate PowerShell standards on PR

---

## Defaults Reference

| Field | Default Value |
|---|---|
| Repository | BanterBoy/RDGScripts |
| Default Branch | prod |
| Assignee | BanterBoy |
| Author | Luke Leigh |
| Version Scheme | SemVer (MAJOR.MINOR.PATCH) |
| Changelog Format | Keep a Changelog |
| Wiki Location | `.github/wiki/` or GitHub Wiki |
| Issue Template Location | `.github/ISSUE_TEMPLATE/` |
| PR Template Location | `.github/pull_request_template.md` |
| Workflow Location | `.github/workflows/` |

---

## Example Prompts

> "Create a wiki page for the Functions folder"

→ Scans `Functions/`, extracts function metadata, generates wiki page in standard format

> "Set up issue templates for the repo"

→ Creates bug report, enhancement, and documentation templates in `.github/ISSUE_TEMPLATE/`

> "Create a PR template"

→ Generates `.github/pull_request_template.md` with RDGScripts coding standards checklist

> "Generate release notes for everything since last month"

→ Runs git log, categorises changes, updates CHANGELOG.md, generates release notes

> "What issues are open right now?"

→ Fetches and summarises open issues with labels and status

> "Review the current PR"

→ Fetches active PR, runs through the review checklist, reports findings

> "Set up GitHub Actions for linting"

→ Creates PSScriptAnalyzer workflow in `.github/workflows/lint.yml`

> "Triage this issue"

→ Reads the issue, applies the triage decision tree, recommends labels and next steps
