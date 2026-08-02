# Alfred — reflow (WCAG 1.4.10)

Content must be usable at a **320px CSS viewport** without a second scroll axis. 320px is not a
phone guess: it is 1280px at 400% zoom, which is what the success criterion is really about.

The `reflow` Playwright project renders at 320×720. Every other project pins **1240px**, so until it
existed the whole suite could only ever see one width.

## Two things account for nearly every failure

### 1. `1fr` cannot shrink below its content

A `1fr` track's **automatic minimum is min-content**, not zero. So a grid column will not go narrower
than its widest unbreakable child, however narrow the viewport gets.

```jsx
gridTemplateColumns: `repeat(${stats.length}, 1fr)`              // floor ≈ content width
gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`   // floor 0
```

`StatBand` prints its numbers at 64px, so three columns had a floor around 400px and spilled a 320px
page by 80. `minmax(0, 1fr)` is what a bare `1fr` almost always means. Blocked by `verify-craft`'s
**`grid-1fr-min-content`** rule; a track that genuinely must not shrink carries a `reflow-ok` marker.

The same shape appears in flex: `flex: "none"` with a fixed `width` cannot reflow either. `Stepper`'s
three 120px steps were 360px wide before they were `flex: "0 1 120px"`, which keeps the 120 whenever
there is room and gives it up when there is not.

### 2. A visually-hidden element still takes part in layout

This is the one that cost real time, and it is invisible in the most literal sense.

The charts' data table used the canonical sr-only recipe:

```jsx
{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }
```

That is correct **on a block container** and wrong **on a `<table>`**. A table box ignores a width
below its min-content width, and `overflow` does not clip it, so the table laid out at its natural
~390px. `clip` suppresses *painting*, not *layout* — and an absolutely positioned box still
contributes to its containing block's scrollable overflow.

Result: one chart on a 320px page made the document **389px** wide. Sixty-nine pixels of horizontal
scroll, caused by an element that paints nothing at all.

The fix is to put the hidden style on a wrapping `<div>` and leave the table plain. Assert it
structurally, not only by effect: reverting it fails only the charts whose fixture data happens to
be wide, which is not a reliable guard.

**`table-layout: fixed` is not enough on its own**, which is worth knowing because it looks like the
tidier answer. It does make the declared width bind — for the table *grid*. A `<caption>` sits
outside that grid, and its nowrap text still pushes the wrapper box wide. Only a block container
clips the whole thing.

**A clipping wrapper is a real element, and positional selectors count it.** Rendering `<ChartTable>`
before a chart's visual content shifted every `> div` index under that root by one, which moved
`BulletChart`'s first row from `nth(0)` to `nth(1)` and broke two cursor tests. Render the hidden
table *after* the graphic: the reading order is better that way round anyway, since the table
restates what the chart already showed.

## Long strings are the same bug from the other side

Every fixture in this system is short English. Real copy is not: German UI text runs about **35%
longer**, and a single unbreakable token — a compound noun, a URL, an account ID, a file name — has
no break opportunity at all.

**The failure mode is not overflow. It is oversizing.** A flex item's automatic minimum size is its
min-content size, so a component holding an unbreakable word does not spill its box: the box *grows*,
and takes the row with it. That is the same `min-width: auto` floor as the `1fr` case above, and it
is why the global `overflow-wrap: break-word` in `tokens/base.css` fixed **none** of the failures on
its own. Nothing was overflowing. The container has to be allowed to shrink first; only then does
breaking or truncating have anything to act on.

**`white-space: nowrap` on a caller's string is the specific mistake.** A component cannot know how
long a prop is, so `nowrap` there makes the caller's string the component's minimum width. It is only
safe paired with a cap and an ellipsis:

```jsx
whiteSpace: "nowrap", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"
```

`nowrap` on text the component *authors* — a "/" separator, a unit, a tabular number — is fine.

`tests/strings.spec.js` renders each component with a 55-character unbreakable word in a plain 360px
block container and asserts nothing leaves the box.

**A shrink-to-fit root makes `max-width: 100%` meaningless.** `DateRangePicker` is an `inline-flex`
root, so the percentage cap on its segmented pill resolved against a width that was itself
content-sized: circular, and the cap did nothing. Capping the root as well gave the percentage
something real to measure against. If a `max-width: 100%` appears to have no effect, look at whether
its containing block has a definite width at all.

**Test in a BLOCK container, not the playground canvas.** The canvas is a flex container, and a flex
item's `min-width: auto` floor beats its own `max-width: 100%`, so a sweep there reports failures no
ordinary page would ever see. `PageHeader`, `DateRangePicker`, `AlfredMessage` and `ReasoningState`
all looked broken there and are all completely fine. Sweeping the canvas said 27 of 117 were
affected; the block container said **five**.

## What is exempt

WCAG 1.4.10 exempts content that requires two-dimensional layout — **data tables** among them. That
is an exemption from *reflowing*, not a licence to spill the page: put the table in a container that
scrolls on its own axis. `DataTable` and `CapabilityTicker`'s marquee both do this and both are
correctly silent.

## Sweeping for the rest

Same method as [`rtl.md`](./rtl.md): drive the playground at 320px, walk each component's subtree and
report anything whose right edge passes the container's. **Skip any element with a clipping or
scrolling ancestor**, or every correctly-contained scroll region reports as a bug. Position-`fixed`
components (`Drawer`, `Modal`) measure against the viewport, not the container, so a canvas-pinned
sweep reports them falsely — `Drawer` already carries `maxWidth: "90vw"`.

Related: [`rtl.md`](./rtl.md) · [`density.md`](./density.md) · [`chart-contract.md`](./chart-contract.md).
