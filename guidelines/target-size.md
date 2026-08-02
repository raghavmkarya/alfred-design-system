# Alfred — target size (WCAG 2.5.8)

A pointer target must be at least **24×24 CSS px**. AA in WCAG 2.2.

**A control can be small to look at and large to hit.** The icon-only dismiss and remove buttons here
draw a 14–16px glyph on purpose: a 24px close cross in a `Toast` would compete with the message. The
glyph is not the thing to change.

## `HitArea`, and why not padding

The obvious repair is to pad the button out to 24×24. That is not free: it changes the button's box,
which changes the row's layout, which changes every visual baseline — for a control nobody wanted to
look bigger.

So the button keeps its box and gains a transparent absolutely-positioned child that overhangs it:

```jsx
import { HitArea, HIT_RELATIVE } from "../hooks/hitArea.jsx";

<button aria-label="Remove" style={{ …, ...HIT_RELATIVE }}>
  <HitArea />                {/* default inset -5: 14px glyph becomes a 24px target */}
  <svg width="14" height="14" …/>
</button>
```

Out of flow, so it costs no layout and moves no pixel. Inside the button, so the button is what
receives the click.

Two things it needs, both easy to forget:

1. **`position: relative` on the button** — `HIT_RELATIVE` exists so this is one spread, not a
   remembered line. Without it the overhang anchors to some ancestor and lands nowhere useful.
2. **Room around the control.** An overhang can reach across a gap and swallow a *neighbouring*
   target's clicks. Check the spacing before widening the inset.

`tests/target-size.spec.js` measures the **union** of the button and its descendants — measuring the
button's own box would report every one of these as still broken — and separately asserts that a
`Chip` is exactly the same height with and without a remove button, which is the whole justification
for the approach.

## What is exempt, and must not be "fixed"

2.5.8 exempts targets in a **sentence or block of text**. Several controls here measure 14–18px tall
for exactly that reason, and padding them to 24 would put visible gaps in prose:

- `IntegrationCard` and `ModuleStatusCard`'s "learn more" links, `Callout`'s inline action.
- `DataTable`'s column sort buttons, which *are* the header text.

Two more that a sweep reports and that are not violations:

- **`Tabs` at 11px wide is a fixture artifact.** The playground generates single-character tab
  labels; a real label makes the tab far wider. Sweeping generated defaults measures the fixtures,
  not the component — see the frame warning in [`reflow.md`](./reflow.md).
- **Range inputs** (`Slider`, `ScenarioSimulator`) report a 6px-tall box, but the target is the thumb
  and the UA hit-tests it with its own slop.

## The other half of touch: hover parity

A touch or keyboard user cannot hover. **Anything revealed by hover must also be revealed by focus**
(WCAG 2.1.1 Keyboard, 1.4.13 Content on Hover or Focus).

This system already does it: `Tooltip` pairs `onMouseEnter` with `onFocus`, no component gates
rendered content behind a hover-only state (the ~23 `onMouseEnter` handlers all set *styling* state,
which is decorative and correctly ignored on touch), and every chart cursor has a documented keyboard
model.

It was true by care and guarded by nothing. `Tooltip` had **no test coverage at all** — not in any
spec, not in `verify-a11y` — so its `onFocus` could have been dropped in a refactor with every gate
still green. `tests/pointer-parity.spec.js` now holds it: focus reveals the tip, `aria-describedby`
resolves to a real element, and blur closes it so it cannot strand on screen after tabbing away.
Removing `onFocus` fails all three.

Related: [`reflow.md`](./reflow.md) · [`craft-checklist.md`](./craft-checklist.md) ·
[`forced-colors.md`](./forced-colors.md).
