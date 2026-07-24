# Alfred — forced colors (Windows High Contrast)

When a user turns on Windows High Contrast, the OS replaces the page's palette with their own.
Two consequences drive everything below:

1. **Every author `background-color` flattens to `Canvas`.**
2. **Every `box-shadow` is dropped.**

So anything Alfred communicated with a *fill* or a *shadow* silently disappears. Not degrades:
disappears. A selected tab became pixel-identical to an unselected one. That is the failure mode
this guideline exists to prevent.

All of it lives in [`tokens/forced-colors.css`](../tokens/forced-colors.css), keyed off semantic
hooks components already emit (`:focus-visible`, `role`, `aria-selected` / `aria-checked` /
`aria-current`). **There are no per-component high-contrast overrides**, and there should not be.

## What is restored

| Lost in HCM | Restored as |
|---|---|
| focus ring drawn as a `box-shadow` | a real `outline` on `:focus-visible`, `!important` so it beats inline `outline: none` |
| floating-surface boundary (shadow) | `1px solid CanvasText` on `[role=dialog/menu/listbox/tooltip]` |
| selection conveyed by a tinted or orange fill | the system `Highlight` / `HighlightText` pair |
| chart series colour | opted out of forcing entirely (see below) |

## Selection needs `forced-color-adjust: none`

Setting `background: Highlight` alone does nothing: the forcing pass overrides it. The selected
element must opt out of forcing *and* then name system colors explicitly. Its descendants need the
same treatment, or the label keeps `CanvasText` and vanishes into the highlight fill.

Selection rules are scoped to interactive selection roles (`[role=radio][aria-checked=true]`,
`[role=tab][aria-selected=true]`, `[role=option][aria-selected=true]`, `[aria-current=page|step]`,
…) rather than to bare `[aria-current]`, so they cannot leak onto ordinary prose that happens to
carry the attribute.

## Charts opt out of forcing, deliberately

A chart encodes meaning in colour. Forcing the palette collapses six series into a single
`CanvasText` silhouette, which is worse than useless. So chart graphics carry
`forced-color-adjust: none` and keep the categorical palette.

**This is only defensible because nothing here is colour-only.** Every chart also carries a text
alternative (`role="img"` / `role="group"` + `aria-label`), added by the chart a11y contract. If you
ever add a chart without one, this exemption stops being justified. See
[`chart-contract.md`](./chart-contract.md).

## Testing it

`tests/forced-colors.spec.js` runs as its own Playwright project under
`emulateMedia({ forcedColors: "active" })`. Chromium substitutes the real system palette, so the
tests assert **computed colors**, not merely that the media query fires.

The suite starts by asserting the emulation is actually on. That guard matters: if emulation ever
stopped applying, every other assertion would pass vacuously against ordinary light-theme colors,
and the gate would look green while checking nothing.

The tests are known to catch the regression they exist for. Removing the selection layer fails two
of them; removing the chart opt-out or the `[aria-selected]` rule fails `verify-craft`'s
`forced-colors-contract`.

## Authoring rule

Never communicate state with fill or shadow **alone**. If a component invents a new selected,
active or error state, it must either reuse an existing ARIA hook (so the rules here pick it up for
free) or ship its own `@media (forced-colors: active)` handling. When in doubt, turn on high
contrast and look: the state either survives or it does not.

Related: [`elevation.md`](./elevation.md) (shadows are dropped here) ·
[`craft-checklist.md`](./craft-checklist.md).
