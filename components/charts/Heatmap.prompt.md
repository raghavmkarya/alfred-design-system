# Heatmap

A matrix heatmap for two-dimensional intensity — e.g. creative fatigue by audience segment × week. `rows` label each row (left), `cols` label each column (top), and `values` is a rows×cols grid of numbers. Each cell is tinted from a faint peach (low) to full brand orange (high) by value / maxValue, where `maxValue` defaults to the data max. Numbers print centered with theme-aware contrast (dark on light cells, white on strong cells). Pass `valueFormat` to format the printed value; an optional intensity legend strip shows the scale.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { Heatmap } = window.AlfredAIDesignSystem_1ce241;

<Heatmap />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
