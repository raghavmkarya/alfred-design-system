# Breadcrumb

Path trail with chevron separators; the final crumb is the bold current page. `items`: [{label, href?}].

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `Crumb[]` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Breadcrumb } = window.AlfredAIDesignSystem_1ce241;

<Breadcrumb items={[{ label: "Home" }, { label: "Marketing" }, { label: "Spend & ROI" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
