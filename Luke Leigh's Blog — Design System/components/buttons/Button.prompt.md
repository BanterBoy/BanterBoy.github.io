Branded action button — the theme's `.btn`, with palette variants, type-scale sizes, and optional Font Awesome icons. Use for any call to action, share link, or "Back to Top" control.

```jsx
<Button variant="primary" icon="fas fa-download">Download module</Button>
<Button variant="info" size="small" icon="fas fa-caret-up">Back to Top</Button>
<Button variant="github" href="https://github.com/BanterBoy">View on GitHub</Button>
```

Variants: `primary` (teal), `inverse` (outline), `light-outline` (on imagery), `success`/`warning`/`danger`/`info`, plus brand `github`/`linkedin`. Sizes: `small`, `medium`, `large`, `x-large`. Props: `href` (renders an anchor), `block` (full width), `disabled`.
