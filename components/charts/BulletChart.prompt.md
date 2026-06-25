# BulletChart

Horizontal actual-vs-target bullet bars for KPI-vs-goal reads (ROAS vs target, pipeline vs plan, CAC vs ceiling). Each row pairs a measure bar against a target tick, optionally over graded qualitative bands. `items`: [{ label, value, target, max, ranges }] - max     scales the row (defaults to value/target headroom). - target  draws a vertical tick mark. - ranges  optional [poorUpTo, okUpTo] — graded light-gray bands behind the measure bar (poor → ok → good, lightening as they improve). The measure bar is the brand gradient; the value is printed right, tabular. Pass `valueFormat` to control how value + target are printed.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { BulletChart } = window.AlfredAIDesignSystem_1ce241;

<BulletChart />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
