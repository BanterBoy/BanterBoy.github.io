The blog's content primitives: `TeaserCard` (archive list item), `PageMeta` (byline row), `Pagination` (pager).

```jsx
<TeaserCard
  title="The Blinking Cursor Problem"
  image="/assets/images/default-teaser-image.png"
  date="12 Jun 2026" readTime="8 min read" category="Blog"
  excerpt="Most people treat A.I. like a search engine…"
/>
<PageMeta date="20 May 2026" readTime="5 min read" category="Personal" />
<Pagination current={2} total={5} onPage={(p) => setPage(p)} />
```

`TeaserCard` composes `PageMeta` internally. All three use Font Awesome icons — load FA in the page.
