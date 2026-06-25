# Badge

Compact status pill. Semantic tones map to the brand's success/warning/ danger/info palette; `brand` uses orange, `neutral` is a quiet gray.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children?` | `React.ReactNode` | — |  |
| `tone?` | `BadgeTone` | `"neutral"` |  |
| `dot?` | `boolean` | `false` | Show a leading status dot. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Badge } = window.AlfredAIDesignSystem_1ce241;

<Badge tone="danger" dot>3 need action</Badge>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
