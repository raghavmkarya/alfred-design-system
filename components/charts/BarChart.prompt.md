# BarChart

Vertical bars for categorical comparisons. Bars use the brand gradient by default; pass a per-datum `color` to override. `data`: [{label, value, color?, display?}] — `display` overrides the printed value (e.g. "$84K").

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `data` | `BarDatum[]` | — |  |
| `height?` | `number` | — |  |
| `max?` | `number` | — | Force the scale max; defaults to the largest value. |
| `showValues?` | `boolean` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { BarChart } = window.AlfredAIDesignSystem_1ce241;

<BarChart data={[{ label: "Search", value: 26 }, { label: "Social", value: 38, display: "$84K" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
