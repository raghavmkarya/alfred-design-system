import React from "react";

/**
 * Alfred AI — HitArea (internal)
 *
 * Expands a control's POINTER TARGET without changing a single rendered pixel.
 *
 * WCAG 2.5.8 (Target Size, Minimum — AA in WCAG 2.2) asks for 24×24 CSS px.
 * The icon-only dismiss and remove buttons here draw a 14–16px glyph, and the
 * obvious repair — pad the button out to 24×24 — is not free: it changes the
 * button's box, which changes the row's layout, which changes every visual
 * baseline. A control can be small to look at and large to hit.
 *
 * So the button keeps its box and gains a transparent child that overhangs it.
 * The child is absolutely positioned, so it contributes nothing to layout, and
 * it sits inside the button, so it is the button that receives the click.
 *
 * Two things it needs from the caller, both easy to forget:
 *   1. `position: relative` on the button (export `HIT_RELATIVE` for this).
 *   2. Enough room around the button that the overhang does not swallow a
 *      NEIGHBOURING control's clicks. Check the spacing before widening it.
 *
 * `inset` is negative by convention: -5 on a 14px glyph gives 24px.
 *
 * Internal: lives under components/hooks/ so the bundle keeps it off the public
 * namespace, the same way usePress and ChartTable are internal.
 */
export const HIT_RELATIVE = { position: "relative" };

export function HitArea({ inset = -5 }) {
  return <span aria-hidden="true" style={{ position: "absolute", inset, borderRadius: "inherit" }} />;
}
