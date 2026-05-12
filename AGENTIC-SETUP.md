# Agentic Repository Setup — A Complete Guide

This document explains how to configure a GitHub repository for effective use with GitHub
Copilot's agentic features. It covers the mental model, every file type, how they interact,
and a step-by-step setup process.

This repository (`BanterBoy/BanterBoy.github.io`) is the reference implementation.
Use `.github/prompts/agentic-setup.prompt.md` to bootstrap a new repository automatically.

---

## The Mental Model — Four Tiers of Context

The single most important thing to understand is **when each file type loads**. Getting this
wrong is why agentic setups often feel inconsistent — you expect the AI to know something,
but it was never loaded into context.

```
┌─────────────────────────────────────────────────────────────┐
│  TIER 1 — Always-On                                         │
│  .github/copilot-instructions.md                            │
│  Loaded in every Copilot session in this repo.              │
│  Use for: identity, non-negotiable rules, critical facts.   │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  TIER 2 — Auto-Injected by File Context                     │
│  .github/instructions/*.instructions.md (applyTo pattern)  │
│  Loaded automatically when you open a matching file.        │
│  Use for: file-type rules, domain-specific conventions.     │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  TIER 3 — On-Demand Skills                                  │
│  .github/skills/*/SKILL.md                                  │
│  .agents/skills/*/SKILL.md                                  │
│  Loaded when Copilot judges them relevant, or when          │
│  explicitly referenced. Use for: deep specialist knowledge, │
│  reference docs, templates, style guides.                   │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  TIER 4 — Reusable Prompts (Slash Commands)                 │
│  .github/prompts/*.prompt.md                                │
│  Loaded when explicitly referenced by the user.             │
│  Use for: repeatable multi-step workflows, guided tasks.    │
└─────────────────────────────────────────────────────────────┘
```

Additionally: **Custom Agent Modes** (`.github/agents/*.agent.md`) define a specialised
identity and tool set that the user manually switches to for complex, multi-step work.

---

## File Reference — Every File Type Explained

### `.github/copilot-instructions.md` — Always-On Repo Instructions

**Loads:** Every Copilot chat session in this repository, automatically.  
**Scope:** Entire repository.  
**Size:** Keep concise — it loads every time, so bloat has a real cost.

**What to put here:**
- The agent's identity and role ("You are the X orchestrator for Y")
- Non-negotiable rules (endpoints that must never change, config that must not be touched)
- A pointer to the living context document (e.g., `ORCHESTRATOR.md`)
- A skills reference table so the AI knows what's available
- Critical conventions that must never be forgotten

**What not to put here:**
- Full brand voice specs (those go in a SKILL.md)
- Post templates or detailed format rules (those go in instructions files)
- Anything that only applies to specific file types

**Example frontmatter:** None — this file has no frontmatter.

---

### `.github/instructions/*.instructions.md` — Auto-Injected Context

**Loads:** Automatically when a file matching the `applyTo` glob pattern is open in the editor.  
**Scope:** Files matching the `applyTo` pattern only.

**Frontmatter:**
```yaml
---
applyTo: "_posts/**,_drafts/**"
---
```

**What to put here:**
- Rules that apply to a specific file type or directory
- Conventions that should always be active when editing those files
- Pointers to the full SKILL.md for deeper reference
- Anti-patterns specific to that file type

**Common patterns:**
| File | applyTo | Contains |
|------|---------|----------|
| `posts.instructions.md` | `_posts/**,_drafts/**` | Post anatomy, brand voice constants, front matter template |
| `jekyll-safety.instructions.md` | `_config.yml,Gemfile,_layouts/**,_includes/**` | Safety rules, pinned dependencies, deployment notes |
| `tests.instructions.md` | `tests/**,**/*.test.ts` | Testing conventions, what to mock, coverage expectations |
| `api.instructions.md` | `src/api/**` | API conventions, auth patterns, error handling |

**Why this matters:** Without `applyTo` instructions, brand voice and post format rules only
load if the AI decides they're relevant. With them, they're always present when you open a
post file — no manual invocation needed.

---

### `.github/agents/*.agent.md` — Custom Agent Modes

**Loads:** When the user manually selects this agent in the Copilot agent picker.  
**Scope:** Entire session while that agent is active.

**Frontmatter:**
```yaml
---
name: my-agent
description: "One sentence — shown in the agent picker. Include when to use it."
tools: [vscode/askQuestions, read/readFile, edit/editFiles, search/codebase, ...]
---
```

**What to put here:**
- The agent's identity, role, and responsibilities
- First-action instructions (e.g., "read ORCHESTRATOR.md before doing anything")
- The orchestrator pattern (what the agent does vs. what it delegates to subagents)
- Skills reference table
- Trivial actions the agent handles directly vs. tasks requiring subagents
- Files the agent must never touch without explicit instruction
- The subagent briefing template

**Tool list guidance:**
- Include only tools the agent genuinely needs
- `read/readFile` and `search/codebase` are almost always needed
- `edit/editFiles` only if the agent makes direct edits (orchestrators often don't)
- `agent/runSubagent` for orchestrators that spawn subagents
- `web/fetch` if the agent needs to look things up
- Omit browser tools unless the agent genuinely needs them

**When to use an agent vs. instructions:** Use an agent when you want a distinct persona
with a specific tool set for complex, multi-step work. Use instructions files for always-on,
file-type-specific context.

---

### `.github/skills/*.md` / `.agents/skills/*.md` — On-Demand Skills

**Loads:** When Copilot judges the skill relevant to the current task, or when explicitly
referenced (e.g., "read `.github/skills/brand-voice/SKILL.md`").  
**Scope:** Session-wide once loaded.

**Two locations:**
- `.github/skills/` — hand-crafted, repo-specific skills maintained manually
- `.agents/skills/` — installed via `npx skills add <skill>` from the skills registry

**Frontmatter:**
```yaml
---
name: brand-voice
description: >
  One paragraph describing what this skill covers and when to invoke it.
  This text is used by the AI to decide whether to load the skill.
---
```

**What to put here:**
- Deep reference material (brand voice, coding conventions, security patterns)
- Templates and examples the AI should follow
- Decision frameworks ("when to use X vs. Y")
- Anti-patterns with explanations
- Supporting reference files in a `references/` subdirectory
- Test cases in an `evals/evals.json` file (optional, for automated testing)

**Structure of a well-formed skill:**
```
.github/skills/brand-voice/
├── SKILL.md              # The skill itself
├── references/
│   ├── examples.md       # Worked examples
│   └── anti-patterns.md  # What to avoid
└── evals/
    └── evals.json        # Test prompts with expected outputs
```

**Important:** Keep the frontmatter clean — only `name` and `description`. Leftover YAML
fields from skill installers (`platforms`, `enforcement`, `discovery`) should be removed as
they inject noise into context.

---

### `.github/prompts/*.prompt.md` — Reusable Prompt Templates

**Loads:** When explicitly referenced by the user (e.g., "use `#new-post.prompt.md`").  
**Scope:** The current conversation.

**Frontmatter:**
```yaml
---
mode: agent
description: "What this prompt does — shown when browsing prompts."
---
```

**Modes:**
- `mode: agent` — runs as a full agent with tool access; best for multi-step workflows
- `mode: ask` — runs as a chat response; best for information/explanation tasks
- `mode: edit` — applies edits to specified files; best for targeted transformations

**What to put here:**
- A complete guided workflow the user invokes by name
- Step-by-step instructions the AI follows
- Questions the AI should ask before proceeding
- Verification steps after completing the task
- Pointers to relevant skills and context files

**Good prompts to create:**
| Prompt | Mode | Purpose |
|--------|------|---------|
| `new-post.prompt.md` | agent | Create a new blog post end-to-end |
| `post-review.prompt.md` | agent | Review a post for brand voice and conventions |
| `agentic-setup.prompt.md` | agent | Bootstrap agentic setup in a new repo |
| `code-review.prompt.md` | agent | Review a PR against conventions |
| `release.prompt.md` | agent | Cut a release with changelog and version bump |

---

### `ORCHESTRATOR.md` — Living Context Document

Not a Copilot file type — just a Markdown file the agent is instructed to read first.
The most important pattern in this repo's setup.

**What to put here:**
- Architecture overview (tech stack, directory structure)
- All active conventions (the "why" not just the "what")
- Skills reference table
- Known fragile areas (things that break if touched carelessly)
- Decision log (dated entries: decision made, rationale)
- Posts/content inventory

**Why it works:** Rather than trying to fit everything into `copilot-instructions.md`,
the orchestrator agent is instructed to read this file first in every session. It's loaded
on-demand but reliably — the agent won't proceed without it.

**Maintenance:** Update the decision log whenever a meaningful change is made. This gives
future sessions (and future you) full context without re-explaining history.

---

### Personal / Project Context Files

Files like `.github/luke-personal-context.md` or `.agents/product-marketing-context.md`
are plain Markdown files referenced by skills and agents to provide persistent context that
would otherwise be re-asked every session.

**Use for:**
- Personal background (for a personal blog/portfolio)
- Product/company context (for a product or SaaS repo)
- Audience definition
- Business goals and constraints

**Pattern:** Reference from `copilot-instructions.md` and from relevant skills/prompts.
The AI reads it when told to — it doesn't auto-load, so the reference is important.

---

## Step-by-Step Setup Process

### Step 1 — Define Your Orchestrator Identity

Before writing any files, answer these questions:
1. What is this repository for? (one sentence)
2. What is the AI's role? (orchestrator? code reviewer? content writer?)
3. What are the non-negotiable rules? (endpoints never to change, files never to touch)
4. What workflows will you repeat? (these become `.prompt.md` files)
5. What domain knowledge should the AI always carry? (these become skills)

---

### Step 2 — Create `ORCHESTRATOR.md`

Create a living context document at the repo root. Include:

```markdown
# ORCHESTRATOR.md — [Agent Name] Living Context

## Identity
Role, repository, established date.

## Project Overview
Tech stack table. Directory map.

## Skills Reference
Table of all skills with locations and invoke-when guidance.

## Known Fragile Areas
Table of things that break if touched carelessly.

## Decision Log
| Date | Decision | Rationale |
```

---

### Step 3 — Create `.github/copilot-instructions.md`

```markdown
# [Agent Name] — Repo Instructions

You are the **[Agent Name]** for `owner/repo`.

## First Action — Always
Read `ORCHESTRATOR.md` before doing anything else.

## Your Role
[What you do, what you delegate]

## Skills
[Table of skills]

## Non-Negotiable Rules
[Critical constraints]

## Subagent Briefing Template
[If using subagents]
```

---

### Step 4 — Create `.github/agents/[name].agent.md`

```markdown
---
name: my-agent
description: "One sentence. Use when: [scenarios]. Do NOT use for: [anti-cases]."
tools: [vscode/askQuestions, read/readFile, edit/editFiles, search/codebase, agent/runSubagent]
---

# [Agent Name]

## First Action — Always
Read `ORCHESTRATOR.md`.

## What You Do
[Responsibilities and delegation pattern]

## Skills Reference
[Table]

## Files Never to Touch Without Instruction
[List]
```

---

### Step 5 — Create `.github/instructions/*.instructions.md`

For each major file type or directory:

```markdown
---
applyTo: "path/pattern/**"
---

# [File Type] Rules

[Concise rules that apply whenever this file type is open]
[Pointers to full SKILL.md for deeper reference]
```

Create one file per distinct context — don't combine unrelated file types in a single
instructions file.

---

### Step 6 — Create a Personal / Project Context File

```markdown
# [Project/Person] Context

## Who / What This Is
[Identity, background, role]

## Technical Background
[Stack, tools, environment]

## Conventions and Patterns
[Things that recur, things that are real and should not be invented]

## Things the AI Should NOT Invent
[Explicit constraints]
```

Reference this from `copilot-instructions.md` and relevant skills.

---

### Step 7 — Create Brand Voice or Domain SKILL.md

For any repo where content or code style matters:

```markdown
---
name: [skill-name]
description: >
  [One paragraph — what this skill covers, when to invoke it]
---

# [Skill Title]

## Voice / Style Summary
[The core of what makes this repo's output distinctive]

## Constants (Always Apply)
[Non-negotiable rules]

## Anti-Patterns
[What to avoid and why]

## Examples
[Worked examples]
```

---

### Step 8 — Create Reusable Prompts

For every repeating workflow:

```markdown
---
mode: agent
description: "[What this prompt does]"
---

# [Workflow Name]

## Before Anything Else
[Files to read first]

## Step 1 — Gather Information
[Questions to ask]

## Step 2 — Execute
[What to do with the answers]

## Step 3 — Verify
[How to confirm it worked]
```

---

### Step 9 — Verify the Setup

1. Open a file matching one of your `applyTo` patterns — confirm the instructions file loads
   (VS Code shows active instructions in the Copilot context panel)
2. Start a new chat without switching agents — ask a question that requires brand voice or
   domain knowledge. Confirm `copilot-instructions.md` is applied automatically.
3. Switch to your custom agent — confirm it reads `ORCHESTRATOR.md` first
4. Reference a prompt file — confirm it asks the right questions and follows the workflow
5. Ask a question the AI should refuse or defer — confirm constraints are enforced

---

## Common Mistakes

| Mistake | Effect | Fix |
|---------|--------|-----|
| Putting everything in `copilot-instructions.md` | File becomes enormous; context cost is high every session | Move detailed specs to SKILL.md files; keep instructions concise |
| Not using `applyTo` instructions files | Brand voice and format rules only load when AI judges them relevant | Create instructions files with `applyTo` patterns for every major file type |
| Leftover YAML in SKILL.md (`platforms`, `enforcement`) | Noise injected into context every time skill loads | Remove all metadata YAML except `name` and `description` |
| No ORCHESTRATOR.md / living context | Conventions are forgotten between sessions; decisions are re-litigated | Create and maintain ORCHESTRATOR.md; instruct the agent to read it first |
| Skills that are too generic | AI loads skill but doesn't know how to apply it to this specific repo | Add project-specific examples and a personal context file |
| Agent with every tool enabled | Slow; agents make tool calls they don't need | Restrict tools list to only what the agent genuinely requires |
| No decision log | Future sessions have no context for why things are the way they are | Add a decision log to ORCHESTRATOR.md; update it after every meaningful change |
| Duplicating context across `.claude/` and `.agents/` | Two copies to maintain in sync; they drift | Pick one workflow (Copilot or Claude) and maintain only that location |

---

## Directory Structure Reference

```
.github/
├── copilot-instructions.md     # Always-on instructions (loads every session)
├── ORCHESTRATOR.md or AGENTS.md # Optional: can live at repo root instead
├── [context-file].md           # Personal or project context
│
├── agents/
│   └── [name].agent.md         # Custom agent mode definition
│
├── instructions/
│   ├── [type].instructions.md  # Auto-injected by applyTo pattern
│   └── [type].instructions.md
│
├── prompts/
│   ├── [workflow].prompt.md    # Reusable prompt / slash command
│   └── [workflow].prompt.md
│
└── skills/
    └── [skill-name]/
        ├── SKILL.md            # The skill
        └── references/         # Supporting docs (optional)

.agents/                        # Universal skills (not VS Code-specific)
└── skills/
    └── [skill-name]/
        └── SKILL.md

ORCHESTRATOR.md                 # Living context (read by agent on every session)
```

---

## Relationship Between File Types

```
copilot-instructions.md
    │  "Read ORCHESTRATOR.md first"
    │  "Available skills: ..."
    │  "Non-negotiable: ..."
    ▼
ORCHESTRATOR.md
    │  Full architecture, conventions, decision log
    │  Points to skills for depth
    ▼
SKILL.md files (on-demand)
    │  Deep brand voice / domain knowledge
    │  Templates and examples
    │  Invoked by agent when needed
    │
instructions/*.instructions.md (auto, by file type)
    │  Post anatomy when editing posts
    │  Safety rules when editing config
    │  Always present for matching files
    │
prompts/*.prompt.md (on-demand by user)
    Guided workflows — new post, review, setup
    Reads ORCHESTRATOR.md + skills at start
    Asks questions → executes → verifies
```

---

## Quick Reference Card

| I want the AI to... | Use this |
|---------------------|----------|
| Always know the project rules | `copilot-instructions.md` |
| Always know rules when editing a specific file type | `.github/instructions/*.instructions.md` with `applyTo` |
| Know deep domain knowledge on demand | `SKILL.md` |
| Have a specialised identity and tool set | `.github/agents/*.agent.md` |
| Follow a repeatable multi-step workflow | `.github/prompts/*.prompt.md` |
| Know my personal background / project context | Context `.md` file, referenced from instructions |
| Remember decisions made across sessions | `ORCHESTRATOR.md` decision log |
