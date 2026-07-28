/**
 * Alfred AI — canonical glyph path data (internal)
 *
 * The drift these fix is in the PATH DATA, not the delivery mechanism.
 * `M20 6 L9 17 L4 12` and `M20 6 9 17l-5-5` are the same checkmark written two
 * ways; four spellings of "check" had accumulated across components.
 *
 * Why not route every inline glyph through `<Icon>` instead:
 * `Icon` renders a CSS mask over a file in assets/icons, so it needs a correct
 * `root` path for whatever page is loading it — which means threading an
 * `iconRoot` prop through every component that draws a tick. An inline `<svg>`
 * has no such dependency and works at any depth. For a glyph drawn inside a
 * component's own markup, inline is the better trade; it just has to be drawn
 * from ONE definition.
 *
 * So: `<Icon>` for a glyph the caller chooses, these constants for a glyph the
 * component draws itself. Both end up single-sourced.
 *
 * Geometry is on the 24×24 grid (see guidelines/icon-grid.md) so a site can use
 * `viewBox="0 0 24 24"` and scale with width/height.
 *
 * Internal: components/hooks/ is kept off the public namespace by the bundle.
 */
export const GLYPH = {
  /** tick — from (20,6) through (9,17) to (4,12) */
  check: "M20 6 L9 17 L4 12",
  /** bare cross, not the circled `close.svg` */
  close: "M6 6 L18 18 M18 6 L6 18",
  chevronDown: "M6 9 l6 6 l6 -6",
  chevronUp: "M18 15 l-6 -6 l-6 6",
  chevronRight: "M9 6 l6 6 l-6 6",
  chevronLeft: "M15 6 l-6 6 l6 6",
  plus: "M12 5 v14 M5 12 h14",
  minus: "M5 12 h14",
  /** shaft + head as ONE path; it was drawn as two <path> elements in three
      marketing components, which read as a stray minus and a stray chevron */
  arrowRight: "M5 12 h14 M13 6 l6 6 l-6 6",
  /** the Alfred mark. Drawn BOTH ways: filled (`fill="currentColor"`, no stroke)
      in the conversation and trust components, and stroked in `Callout`'s
      insight tone, which sits in a row of stroked tone glyphs and would read as
      a blob if filled. One shape, two treatments — Callout used to carry its own
      slightly rounder, more inset four-point star, which no duplication check
      could ever have flagged because it was drawn exactly once. */
  sparkle: "M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z",
  /** the "integration" plug: two pins, a body, a lead. Four subpaths, one glyph
      — it was four separate <path> elements in two components. */
  plug: "M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z M12 17v4",

  /* —— the alert family ————————————————————————————————————————————————
     There were THREE warning triangles. Two differed only in decimal
     precision (`1.9 18` vs `1.82 18`), which is why no duplication check
     could see them as the same glyph — they are byte-different strings for
     the same drawing. The third was a separate sharp-cornered triangle.
     The rounded one is canonical: every other glyph in the set is drawn with
     round caps and joins, and a hard apex was the odd one out.

     Triangle and bang ship together at every call site, so they are one
     glyph, like `plug`. The two circle-inscribed bangs below cannot fold in
     their <circle> the same way, so they stay bare paths. */

  /** rounded warning triangle WITH its exclamation. Symmetric about x=12. */
  warningTriangle:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  /** exclamation for a `<circle cx=12 cy=12 r=9>`. Sits ~1 unit higher than
      the triangle's, because a triangle's visual centroid is lower than a
      circle's — the same bang in both containers looks bottom-heavy in one. */
  bang: "M12 8v5 M12 16.5h.01",
  /** the inverted bang: an "i". Not currently duplicated, but it is the third
      member of this family and would have been the next thing to drift. */
  infoBang: "M12 11v5 M12 8h.01",
  /** tick inset for a `<circle r=9>`. `check` is full-bleed and its (20,6)
      corner sits 10 units from centre, so it pokes through the ring. */
  checkInCircle: "M8.5 12.2 l2.4 2.4 l4.6 -5",
};
