## Writing and Scheduling a Blog Post

### 1. Create the draft

Create the file in _drafts with today's date as a placeholder name:

```
_drafts/YYYY-MM-DD-your-post-slug.md
```

Use the standard front matter but leave `date` as just a date (no time) while drafting:

```yaml
date: 2026-05-10
last_modified_at: 2026-05-10
```

Write and iterate freely — drafts are excluded from Jekyll builds, so nothing leaks to the live site.

---

### 2. Decide a release date, then move and update

When the post is ready, pick a release date and:

**Rename and move** the file to _posts:
```
_posts/2026-05-20-your-post-slug.md
```

**Update the front matter** to the exact release time:
```yaml
date: 2026-05-20 07:30:00 +0000
last_modified_at: 2026-05-20 07:30:00 +0000
```

**Commit and push** to `master`. The post is now in _posts but Jekyll will suppress it because the date is in the future — it won't appear on the live site yet.

---

### 3. Automatic publication

At **07:35 UTC on 2026-05-20**, the scheduled-publish.yml workflow fires. It pushes an empty commit, GitHub Pages rebuilds, and Jekyll now sees `2026-05-20 07:30:00 +0000` as a past date — the post goes live. No manual action required.

---

### Quick rule

| Scenario | `date` time to use |
|---|---|
| Publish immediately (today) | `01:00:00–05:00:00 +0000` (sequential if multiple posts) |
| Schedule for a future date | `07:30:00 +0000` on the target date |