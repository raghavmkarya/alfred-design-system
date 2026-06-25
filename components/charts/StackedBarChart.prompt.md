# StackedBarChart

Vertical bars for comparing several series across categories, with a real plot frame: y-axis gridlines + ticks, x-axis labels under each group, and an inline legend. `stacked` (default) stacks series within one bar per label; set it false to render grouped, side-by-side bars. `data`: [{ label, [key]: number }]; `keys`: the series keys to plot, in stack order (bottom → top). Colors default through the brand categorical palette; pass `colors` to override per index. `valueFormat` formats the y-axis ticks. Built for channel-mix views — e.g. "I've split each quarter's pipeline across social, search and email for you."

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { StackedBarChart } = window.AlfredAIDesignSystem_1ce241;

<StackedBarChart />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
