# Chip

Compact filter / tag pill. Tonal by default, solid orange when `selected`, optionally removable. Use for filters, applied facets and entity tags.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children?` | `React.ReactNode` | — |  |
| `tone?` | `"neutral" \| "brand" \| "info" \| "success" \| "warning" \| "danger"` | `"neutral"` |  |
| `selected?` | `boolean` | `false` | Solid orange selected state. |
| `onRemove?` | `() => void` | — | Show a trailing × that calls this. |
| `onClick?` | `() => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Chip } = window.AlfredAIDesignSystem_1ce241;

<Chip tone="brand" onRemove={() => removeFilter("paid-social")}>Paid social</Chip>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
