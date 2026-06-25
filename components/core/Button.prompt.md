Brand button — use for any clickable action; solid orange is the primary CTA, periwinkle / outline / ghost / subtle for supporting actions.

```jsx
<Button variant="primary" size="md" onClick={save}>Sign in</Button>
<Button variant="outline" iconLeft={<Icon name="export" size={16} />}>Export</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants: `primary` (orange), `secondary` (periwinkle), `outline`, `ghost`, `subtle` (peach), `danger`. Sizes: `sm` / `md` / `lg`. Props: `fullWidth`, `disabled`, `iconLeft`, `iconRight`. Hover lifts the primary button with a warm glow; press scales to 0.98.
