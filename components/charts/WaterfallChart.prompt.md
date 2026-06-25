# WaterfallChart

Shows how a total is built from running increments / decrements (e.g. starting budget → channel adds → waste cut → projected pipeline). `items`: [{ label, value, type?, color? }]. `type` "start" | "end" draws an absolute total from the baseline in a neutral ink; an omitted `type` is a delta that floats from the running cumulative — positive reads as a gain (success green), negative as a cut (danger red). Bars are linked by thin dashed connectors at the running-total level. Pass `valueFormat` to format y-axis ticks + value labels (e.g. v => "$" + v + "K").

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { WaterfallChart } = window.AlfredAIDesignSystem_1ce241;

<WaterfallChart />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
