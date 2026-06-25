# Avatar

Round monogram or image. Falls back to brand-gradient initials.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name?` | `string` | — |  |
| `src?` | `string` | — |  |
| `size?` | `number` | — |  |
| `tone?` | `"gradient" \| "ink" \| "periwinkle"` | `"gradient"` | Fallback fill behind initials. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Avatar } = window.AlfredAIDesignSystem_1ce241;

<Avatar name="Priya Menon" size={40} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
