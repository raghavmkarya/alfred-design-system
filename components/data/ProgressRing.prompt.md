# ProgressRing

Circular progress for confidence, goal attainment and visibility scores. The brand tone draws the arc with the signature periwinkle→orange gradient; the value sits at the centre in Clash Display with an optional caps label (inside for md/lg, below the ring for sm).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value?` | `number` | `0` | 0–100. |
| `size?` | `"sm" \| "md" \| "lg"` | `"md"` | Ring diameter — 56 / 84 / 120px. |
| `label?` | `string` | — | Small caps label (inside for md/lg, below the ring for sm). |
| `sublabel?` | `string` | — | Muted line under the ring. |
| `showValue?` | `boolean` | `true` | Show the centred value. |
| `tone?` | `"brand" \| "positive" \| "warning" \| "danger"` | `"brand"` | `brand` = periwinkle→orange gradient arc. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ProgressRing } = window.AlfredAIDesignSystem_1ce241;

<ProgressRing value={72} label="Attained" sublabel="of Q3 target" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
