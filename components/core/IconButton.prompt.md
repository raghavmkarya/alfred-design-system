# IconButton

Square/round button wrapping a single brand Icon. For toolbars and headers.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | — | Brand icon name (see Icon). |
| `size?` | `number` | — |  |
| `iconSize?` | `number` | — |  |
| `variant?` | `"ghost" \| "subtle" \| "solid" \| "outline"` | `"ghost"` |  |
| `shape?` | `"rounded" \| "circle"` | `"rounded"` |  |
| `iconRoot?` | `string` | — |  |
| `title?` | `string` | — |  |
| `onClick?` | `(e: React.MouseEvent) => void` | — |  |
| `disabled?` | `boolean` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { IconButton } = window.AlfredAIDesignSystem_1ce241;

<IconButton name="refresh" variant="ghost" title="Refresh" iconRoot="../../assets/icons" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
