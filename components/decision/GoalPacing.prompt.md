# GoalPacing

Are you on track to hit the number? A gradient attainment bar with an "on-pace" marker showing where you should be by now, a verdict (ahead / on track / behind) derived from attainment versus elapsed time, and Alfred's projected landing at the current run-rate. Pass numeric `value`/`target`, the fraction of the period `elapsed`, and an optional `format` for the numbers.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `value?` | `number` | — | Current attainment (same unit as target). |
| `target?` | `number` | — |  |
| `elapsed?` | `number` | `0.62` | Fraction of the period elapsed, 0–1. |
| `format?` | `(n: number) => React.ReactNode` | `"${n}M"` | Formats value/target/projection. |
| `period?` | `string` | — | Caption under the bar, e.g. "Q3 · 62% elapsed". |
| `projected?` | `number` | — | Explicit projected landing; defaults to value / elapsed. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { GoalPacing } = window.AlfredAIDesignSystem_1ce241;

<GoalPacing label="Q3 pipeline" value={1.84} target={3.2} elapsed={0.62} period="Q3 · 62% elapsed" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
