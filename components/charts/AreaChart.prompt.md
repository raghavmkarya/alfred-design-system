# AreaChart

Multi-series area/line trend with a real plot frame: y-axis gridlines + ticks, x-axis labels, and an inline legend for 2+ series. Built for performance-over- time views (ROAS vs target, spend by channel). `series`: [{ name, color?, points: number[] }]; `labels` align to the point index. Colors default through the brand categorical palette. Pass `valueFormat` to format the y-axis ticks.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { AreaChart } = window.AlfredAIDesignSystem_1ce241;

<AreaChart />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
