# Avatar

Round monogram or image. The default "auto" tone hashes the name onto a muted tint palette so lists of people read as people, not a row of identical brand discs; explicit tones (gradient/ink/periwinkle) remain for the places identity should carry the brand.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name?` | `string` | — |  |
| `src?` | `string` | — |  |
| `size?` | `number` | — |  |
| `tone?` | `"auto" \| "gradient" \| "ink" \| "periwinkle"` | `"auto"` | Fallback fill behind initials. "auto" hashes the name onto a muted tint palette; the fixed tones carry the brand. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Avatar } = window.AlfredAIDesignSystem_1ce241;

<Avatar name="Priya Menon" size={40} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
