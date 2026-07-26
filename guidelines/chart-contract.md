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
| `role="img"` + `aria-label` | the **graphic** carries the data, with no readable text equivalent | Sparkline, Sankey, Gauge, Bullet (per track) |
| `role="group"` + `aria-label` | every value is **already readable text**; the container just needs a name to group it under | Bar, Funnel, Heatmap |
| `role="group"` + `aria-label`, `<svg>` hidden | the graphic carries the data **and** the chart is focusable — see "Interactive charts" below | Line, Area, StackedBar, Waterfall, Donut, Scatter |
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

## Interactive charts: one cursor, one tab stop

An x-indexed chart is **focusable once** and walked with the keyboard, or hovered with a pointer.
Both drive the same active index, so there is one code path and one visual result.

| | |
|---|---|
| Pointer | move across the chart; the nearest point activates |
| Arrows | `←` `→` `↑` `↓` step, `Home` / `End` jump to the ends |
| `Esc` | dismiss |

**Not one tab stop per data point.** A 40-point chart would otherwise put 40 stops between the user
and the rest of the page. And focusable children inside a `role="img"` element are contradictory
markup that assistive tech is entitled to ignore.

**An interactive chart moves its name to the focusable group and hides the graphic:**

```jsx
<div role="group" aria-label={aria} tabIndex={0}>   {/* the name lives here */}
  <ChartLive … />                                    {/* polite announcements  */}
  <ChartTooltip … aria-hidden />                     {/* the visible readout   */}
  <ChartTable … />                                   {/* the full data         */}
  <svg aria-hidden="true"> … </svg>                  {/* now decorative        */}
</div>
```

A **static** chart keeps `role="img"` + `aria-label` on its `<svg>`, as above. Carrying both would
announce the chart twice. `verify-a11y` asserts each shape and asserts the *absence* of the other.

The active point is announced through a polite live region rather than by moving focus — that is what
stops it double-announcing against the hidden data table.

**Interactive today:** LineChart, AreaChart, StackedBarChart, WaterfallChart (the x-indexed SVG
charts), plus **DonutChart** and **ScatterChart**. **Sparkline is deliberately excluded**: it is a
glanceable micro-chart, often several to a row inside KPI cards, and making each one a tab stop would
be hostile.

### Hit-testing is per-chart; the rest of the model is not

`useChartCursor(count)` defaults to rounding the pointer's x fraction to the nearest column, which is
right for anything indexed along x and wrong for everything else. Pass `{ hitTest }` to replace just
that step — keyboard walking, the live region, the readout and the single tab stop stay identical.

A hit-test returns `null` for "nothing here", and that case matters as much as a hit:

- **Donut** finds the segment whose **arc** contains the pointer's angle, and only when the pointer is
  on the ring. The hole returns `null`, so the centre is not a dead zone that keeps the last segment
  lit while you read the total.
- **Scatter** finds the **nearest point within a radius**, not simply the nearest point. Without the
  radius, a pointer anywhere in empty plot space keeps some far-off point selected.

Two things bite when the plot is an `<svg>` that is not the focusable element:

- **The default `preserveAspectRatio` letterboxes.** A 660×260 viewBox in a 566px box draws at 0.858
  with ~19px of empty gutter. Hit-testing or positioning from container fractions therefore misses.
  `useSvgBox` reports the live scale and centring offsets; `boxFrac` / `boxPoint` convert.
- **Split the binds.** `cursor.plotBind` (pointer) goes on the plot, `cursor.groupBind` (focus) on the
  labelled group. `cursor.bind` is the union, for charts where they are the same element.

**Binds carry behaviour, never style** — see `CHART_FOCUS_STYLE` in `chartCursor.jsx` for why.

### Where a readout can go

The default readout is pinned to the top of the plot, where it cannot cover the line it describes. A
donut has no such safe row, and neither placement anchored to the arc works: **inward** covers the very
segment being read, **outward** runs off, because the donut's box is exactly the donut and a left-hand
segment lands at a negative offset. Both were built and looked at. It uses **the hole** instead —
empty by construction, already the slot the component reserves for a label, and equidistant from every
segment. A scatter has room, so it keeps a pill, centred on the point via the tooltip's optional `y`.

## What is not settled yet

**Legend interaction is done.** A legend becomes interactive **only** when given `onToggle` — a static
key stays plain text, because making every legend a row of buttons would add tab stops to charts where
nothing can be toggled.

Two things it has to get right:

- **Hiding a series rescales the chart.** Otherwise the y-axis keeps its old ceiling and the remaining
  bars look mysteriously short. The test asserts the axis ticks themselves (100 → 20), not bar
  geometry, because bars can look plausible either way.
- **A hidden series is not signalled by colour alone.** The swatch becomes an outline and the label is
  struck through, so the state survives for a colour-blind user.

A series keeps its palette colour when others are hidden — the colour is keyed to its original index,
not its position among the visible ones, or the chart appears to recolour itself as you toggle.

**SankeyChart still has no cursor.** Its hit-test is a third shape again — ribbons and nodes, not
points — and it already carries a pointer-only `hover` state that needs folding into the shared model
rather than sitting beside it.

**Gauge and Bullet are not obviously missing one.** A gauge is a single value already printed large in
its own centre; a bullet row prints its label, value and target as real text. In both, a cursor would
add a tab stop that announces what is already on screen and in the data table. They are listed here as
a decision, not an omission — if they get one, it should be for consistency, argued as such.

Related: [`craft-checklist.md`](./craft-checklist.md) (the pre-ship gate).
