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

## Post checklist _(complete for new posts or post edits)_

### Front matter
- [ ] Filename: `YYYY-MM-DD-kebab-case-title.md` in `_posts/`
- [ ] `date:` uses `YYYY-MM-DD HH:MM:SS +0000` — time must be early UTC (01:00–05:00) so GitHub Pages never suppresses as a future post; increment by 1h per post for same-day ordering
- [ ] `layout: single`
- [ ] `title`, `excerpt`, `categories`, `tags` all present
- [ ] `toc: true`, `toc_label`, `toc_icon`, `toc_sticky: true` present
- [ ] `header.overlay_image` and `header.overlay_filter: rgba(90, 104, 129, 0.7)` set

### Post anatomy (in order)
- [ ] Formspree boilerplate present (`action: https://formspree.io/xvowjgjd` — verbatim, never change)
- [ ] Print button present (`{: .text-right}` + `<button onclick="window.print()">`)
- [ ] Section headings use Font Awesome icons with `style="color: white"`
- [ ] Back-to-top links present between sections
- [ ] Reference links at end: `[1]: https://...` with `{:target="\_blank"}` used inline

### Brand voice
- [ ] British English throughout (colour, behaviour, organisation, whilst, licence)
- [ ] Contractions used (it's, I'm, didn't, wasn't)
- [ ] Personal context / anecdote before the technical point
- [ ] Not overselling anything

### Jekyll safety
- [ ] `_config.yml` not modified (or change is explicitly scoped and safe)
- [ ] `remote_theme` pin unchanged (`mmistakes/minimal-mistakes@4.17.2`)
- [ ] Formspree endpoint unchanged (`https://formspree.io/xvowjgjd`)
- [ ] No Algolia admin key in any repo file

## Related issues

Closes #{issue_number}

## Notes

{Anything reviewers should know — images referenced, external links verified, etc.}