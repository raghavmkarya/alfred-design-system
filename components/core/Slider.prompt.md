# Slider

Single-value range control with an orange fill and thumb (native input for accessibility). Optional label and live value. Use for budgets, thresholds and any bounded numeric input.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value?` | `number` | — |  |
| `onChange?` | `(value: number) => void` | — |  |
| `min?` | `number` | — |  |
| `max?` | `number` | — |  |
| `step?` | `number` | — |  |
| `label?` | `React.ReactNode` | — |  |
| `showValue?` | `boolean` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Slider } = window.AlfredAIDesignSystem_1ce241;

<Slider label="Budget cap" value={cap} onChange={setCap} min={0} max={500} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
