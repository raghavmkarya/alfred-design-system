# NumberInput

Stepper numeric field for budget caps, thresholds and targets. − / + buttons step the value within [min, max]; the centred value accepts typing and commits on blur or enter, with an optional prefix ("$") and unit ("%", "K").

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `value?` | `number` | `0` | Controlled numeric value. |
| `onChange?` | `(next: number) => void` | — | Called with the next clamped number on step, enter or blur. |
| `min?` | `number` | — |  |
| `max?` | `number` | — |  |
| `step?` | `number` | `1` |  |
| `unit?` | `string` | — | Muted suffix rendered after the value (e.g. "%" or "K"). |
| `prefix?` | `string` | — | Muted prefix rendered before the value (e.g. "$"). |
| `size?` | `"md" \| "sm"` | `"md"` |  |
| `disabled?` | `boolean` | `false` |  |
| `id?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { NumberInput } = window.AlfredAIDesignSystem_1ce241;

<NumberInput label="Monthly budget cap" value={cap} onChange={setCap} min={0} max={100} step={5} prefix="$" unit="K" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
