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
