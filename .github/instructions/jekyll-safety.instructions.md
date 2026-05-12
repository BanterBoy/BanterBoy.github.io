---
applyTo: "_config.yml,Gemfile,_layouts/**,_includes/**,_sass/**"
---

# Jekyll Safety Rules — Auto-Injected Context

You are editing a Jekyll/Minimal Mistakes site (`blog.lukeleigh.com`). These rules protect
known-fragile configuration. Read `ORCHESTRATOR.md` for full architectural context.

---

## Absolute Constraints — Do Not Touch Without Explicit Instruction

| What | Why |
|------|-----|
| `remote_theme: mmistakes/minimal-mistakes@4.17.2` | Pinned deliberately. Upgrading requires a full Docker local test first — theme upgrades routinely break layouts. |
| `algolia.application_id` and `algolia.search_only_api_key` in `_config.yml` | The search-only key is safe in the repo. The **admin key** must NEVER appear in any repo file — CI env vars only. |
| Formspree endpoint `https://formspree.io/xvowjgjd` | Verbatim. Changing it silently breaks the contact form on every post. |
| Disqus `shortname: lukeleigh` | Currently disabled (commented out in `_config.yml`). One line re-enables it. Do not delete the config block. |
| `future: false` | Required for scheduled publishing to work correctly with UTC dates. |

---

## Known Fragile Files

- `_posts/2026-05-10-powershell-history-tips.md` — published and live. There is also a root-level `powershell-history-tips.md` with no front matter that Jekyll ignores. Do not delete either without confirmation.
- `favicon.ico.7` and `favicon.ico5` — stale but do not delete without confirmation.
- `Blog/` directory — intentionally empty. Do not add content.

---

## Local Development

```bash
docker-compose up   # port 4000, --drafts enabled
```

Do not suggest `bundle exec jekyll serve` directly — use Docker to match the CI environment.

---

## Deployment Path

`push to master` → Azure Pipelines (`azure-pipelines.yml`) → GitHub Pages  
Scheduled posts go live via `.github/workflows/scheduled-publish.yml` at 07:35 UTC daily.
