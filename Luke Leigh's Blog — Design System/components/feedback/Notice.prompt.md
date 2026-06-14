Tinted callout block — the theme's `.notice--*`. Renders as a light panel with dark text and a soft coloured shadow on the dark skin. Use for asides, tips, and warnings inside posts.

```jsx
<Notice variant="warning" title="Heads up" icon="fas fa-triangle-exclamation">
  This script deletes files. Run it with <code>-WhatIf</code> first.
</Notice>
```

Variants: `default`, `primary`, `info`, `warning`, `success`, `danger`. `title` + `icon` are optional.
