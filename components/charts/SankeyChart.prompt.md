# SankeyChart

A simplified left→right Sankey for attribution / cross-module signal routing. `nodes`: [{ id, label, col }] where `col` is the 0-based column index. `links`: [{ source, target, value }] referencing node ids. Nodes are laid out in evenly spaced columns; each node's height is proportional to the larger of its in/out flow, and links render as filled bezier ribbons whose thickness equals `value`, tinted from the source node's palette color. Built for a handful of links across 2–3 columns (e.g. "Paid social → MQL → Won"). Pass `valueFormat` to format the throughput printed next to each node.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { SankeyChart } = window.AlfredAIDesignSystem_1ce241;

<SankeyChart />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
