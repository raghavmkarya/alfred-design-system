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
  /** the Alfred mark. FILLED, not stroked — the only one here that is, so it
      wants `fill="currentColor"` and no stroke on its <svg>. */
  sparkle: "M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z",
  /** the "integration" plug: two pins, a body, a lead. Four subpaths, one glyph
      — it was four separate <path> elements in two components. */
  plug: "M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z M12 17v4",
};
