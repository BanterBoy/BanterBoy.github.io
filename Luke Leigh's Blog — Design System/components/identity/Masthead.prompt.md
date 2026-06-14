Site identity: `Masthead` (header bar) and `AuthorCard` (sidebar profile).

```jsx
<Masthead
  logo="/assets/images/PowerShell_5.0_icon88x88.png"
  items={["Home", "Posts", "Categories", "Tags", "About Luke"]}
  current="Home"
/>
<AuthorCard
  avatar="/assets/images/ProfilePicCircleTransparent_100x100.png"
  links={[
    { label: "GitHub", icon: "fab fa-github", url: "https://github.com/BanterBoy" },
    { label: "LinkedIn", icon: "fab fa-linkedin", url: "#" },
  ]}
/>
```

`Masthead` items accept strings or `{label, href}`. Both use Font Awesome — load it in the page.
