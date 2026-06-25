# Card

The floating white surface used across the app: generous radius, soft shadow, hairline border. `tone` swaps to the canvas or brand-gradient fill.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children?` | `React.ReactNode` | — |  |
| `tone?` | `"surface" \| "sunken" \| "gradient" \| "ink"` | `"surface"` | surface (white) · sunken (canvas) · gradient (brand) · ink (near-black). |
| `padding?` | `number \| string` | — |  |
| `radius?` | `string` | — |  |
| `shadow?` | `"none" \| "sm" \| "md" \| "lg"` | — |  |
| `interactive?` | `boolean` | `false` | Lift + deepen shadow on hover. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Card } = window.AlfredAIDesignSystem_1ce241;

<Card tone="surface" padding={24} shadow="md">Floating content</Card>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
