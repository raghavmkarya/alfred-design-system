# Alfred — the chart contract

The 14 charts share the `--chart-*` palette but historically shared nothing else. This is the
contract every chart must meet. Today it covers **accessibility**; interaction, tooltip and legend
conventions are still open (roadmap 4.4) and belong here when they land.

## Text alternative (WCAG 1.1.1) — required

A chart is non-text content, so it needs a text alternative. **A bare `<svg>` announces nothing at
all**: a screen reader user gets silence where the number was. Ten of the fourteen charts shipped
that way before this contract existed.

Two shapes, chosen by where the information actually lives:

| Shape | Use when | Charts |
|---|---|---|
| `role="img"` + `aria-label` | the **graphic** carries the data, with no readable text equivalent | Line, Sparkline, Area, Donut, Scatter, StackedBar, Sankey, Gauge, Waterfall, Bullet (per track) |
| `role="group"` + `aria-label` | every value is **already readable text**; the container just needs a name to group it under | Bar, Funnel, Heatmap |
| `role="list"` + `role="listitem"` | it is a key, not a graphic | Legend |

Do **not** put `role="img"` on a container whose labels and values are real text: that role makes
its contents presentational and throws away the detail the sighted user can see.

## Every chart takes `ariaLabel`

Each chart derives a sensible default and accepts an `ariaLabel` prop to override it. The derived
label always states the chart type and its shape, and degrades to a `no data` form on empty input:

```jsx
<LineChart points={[12, 18, 15, 24]} />
// aria-label="Line chart, 4 points, from 12 to 24"

<LineChart points={[]} />
// aria-label="Line chart, no data"

<LineChart points={roas} ariaLabel="Blended ROAS by week, rising from 2.1x to 3.8x" />
```

Prefer an explicit `ariaLabel` on any chart that carries a real decision. The derived label
describes the *shape* of the data; only the caller knows what it *means*, and the meaning is what
a screen reader user needs.

## Authoring a new chart

1. Pick the shape from the table above.
2. Accept `ariaLabel` and derive a default that handles the empty case.
3. Add a case to `scripts/verify-a11y.mjs` asserting the role and the derived label. Charts are
   gated there (92 contracts) — a chart with no case is a chart that can silently lose its label.

## The data behind the chart — required for `role="img"` charts

A summary label says *"Line chart, 4 points, from 12 to 24"*. It does not let anyone **read the
values**. For a chart whose data lives only in the graphic, that leaves the numbers unreachable.

So every `role="img"` chart also renders a **visually-hidden `<table>`** of its data, via the
internal `ChartTable` primitive: a `<caption>` (the chart's own summary), `<th scope="col">` headers
and `<th scope="row">` row labels.

- **Visually hidden, not toggleable.** It changes nothing on screen, so it needs no per-chart layout
  decision and cannot move a visual baseline.
- **Clip-rect, not `display: none`.** The latter removes the table from the accessibility tree, which
  would defeat the whole point.
- **The `role="group"` charts deliberately have NO table.** Bar, Funnel and Heatmap already render
  their labels and values as readable text; adding one would make a screen reader announce every
  number twice. `verify-a11y` asserts **both** halves — the ten that must have a table, and the three
  that must not.

Adding a chart? Give it a table if the data is only in the graphic, and skip it if the values are
already text. That is the same distinction as the role table above, so the two decisions are really
one decision.

## What is not settled yet

Roadmap **4.4** still owns the *pointer* half: one hover/focus interaction model, a shared tooltip,
and legend interaction (toggle a series). Those need per-chart geometry work — hit-testing an SVG
path is a different problem in each chart — so they are deliberately not half-built here. Charts
today have **no hover or keyboard interaction at all** except SankeyChart's hover state and Heatmap's
native `title` attributes. Until that lands, do not invent per-chart interaction patterns.

Related: [`craft-checklist.md`](./craft-checklist.md) (the pre-ship gate).
