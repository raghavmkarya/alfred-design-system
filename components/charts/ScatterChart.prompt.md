# ScatterChart

An x/y scatter for two-variable comparison (e.g. spend vs ROAS by campaign). Real plot frame: x + y axes, both gridlines, formatted axis tick labels, and small axis titles (`xLabel` along the bottom, `yLabel` rotated up the left). `points`: [{ x, y, label?, color?, r? }] — each renders as a soft glowing circle (palette color by index unless `color` set, radius 6 unless `r` set) with its label beside it. Axes auto-scale to nice rounded maxima; override with `xMax`/`yMax`, and format ticks with `valueFormatX` / `valueFormatY`.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { ScatterChart } = window.AlfredAIDesignSystem_1ce241;

<ScatterChart />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
