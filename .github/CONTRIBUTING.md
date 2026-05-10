# Contributing to blog.lukeleigh.com

Thanks for taking the time to raise an issue or open a pull request.

This is a personal blog — [blog.lukeleigh.com](https://blog.lukeleigh.com) — run by Luke Leigh. It covers PowerShell, IT infrastructure, and the occasional detour into airsoft and other projects. Contributions in the form of bug reports, content corrections, and suggestions are very welcome.

## What to contribute

- **Bug reports** — something broken on the site: layout issues, broken links, images not loading, build failures
- **Content corrections** — factual errors, outdated code samples, broken external links in posts
- **Suggestions** — post topic ideas, site improvements, feature requests

Please use the issue templates in `.github/ISSUE_TEMPLATE/` — they're short and they help get things resolved faster.

## Raising an issue

Open an issue and pick the appropriate template. Include the URL of the affected page wherever possible.

## Opening a pull request

If you've spotted a typo or broken link and want to fix it directly:

1. Fork the repo
2. Create a branch off `master` with a descriptive name (e.g. `fix/broken-link-psreadline-post`)
3. Make your change
4. Open a pull request — the PR template will guide you through the checklist

For post content, the key things to check:
- Filename is `YYYY-MM-DD-kebab-case-title.md` in `_posts/`
- `date:` is bare `YYYY-MM-DD` format (no time component)
- British English throughout
- Formspree endpoint unchanged if the contact form boilerplate is present

## What this repo is not

This is not the Minimal Mistakes theme repository. For theme bugs, please open issues at [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes/issues) instead.
