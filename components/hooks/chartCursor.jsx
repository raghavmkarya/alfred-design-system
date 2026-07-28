import React from "react";

/**
 * Alfred AI — chart cursor (internal)
 *
 * One interaction model for every x-indexed chart: hover with a pointer, or
 * focus the chart once and walk it with the arrow keys. Both drive the same
 * "active index", so there is one code path and one visual result.
 *
 * Why a single tab stop rather than a focusable element per data point:
 * the `<svg>` carries `role="img"` (the chart a11y contract), which makes its
 * descendants presentational — focusable children inside it would be
 * contradictory markup that assistive tech is entitled to ignore. And a chart
 * with 40 points would otherwise be 40 tab stops between the user and the rest
 * of the page.
 *
 * So the chart is one stop. Arrow keys move the cursor, Home/End jump to the
 * ends, Escape dismisses. The active point is announced through a polite live
 * region rather than by moving focus, which is what keeps it from
 * double-announcing against the hidden data table.
 *
 * Internal: components/hooks/ is kept off the public namespace by the bundle.
 */
export function useChartCursor(count, options = {}) {
  /* `hitTest(offsetX, offsetY, rect)` — for charts that are not indexed along x.
     A donut's segments are found by angle, a scatter's points by 2D distance;
     neither is "round the x fraction to the nearest column". Returning null
     means "nothing here" (the donut's hole, empty plot space), which clears the
     cursor rather than snapping to the nearest thing regardless of distance. */
  const { hitTest } = options;
  const [index, setIndex] = React.useState(null);
  const [keyboard, setKeyboard] = React.useState(false);

  const clamp = (i) => Math.max(0, Math.min(count - 1, i));
  const move = (next, viaKey) => { setKeyboard(!!viaKey); setIndex(count ? clamp(next) : null); };
  const clear = () => setIndex(null);

  const onKeyDown = (e) => {
    if (!count) return;
    const cur = index == null ? -1 : index;
    switch (e.key) {
      case "ArrowRight": case "ArrowDown": move(cur + 1, true); break;
      case "ArrowLeft": case "ArrowUp": move(cur <= 0 ? 0 : cur - 1, true); break;
      case "Home": move(0, true); break;
      case "End": move(count - 1, true); break;
      case "Escape": clear(); return;                       // let Escape bubble too
      default: return;                                       // don't swallow Tab et al
    }
    e.preventDefault();
  };

  // Pointer position → nearest index. The chart is drawn in viewBox units and
  // stretched to the container, so work in fractions of the box rather than px.
  const onPointerMove = (e) => {
    if (!count) return;
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width) return;
    if (hitTest) {
      const i = hitTest(e.clientX - r.left, e.clientY - r.top, r);
      if (i == null) clear(); else move(i, false);
      return;
    }
    const frac = (e.clientX - r.left) / r.width;
    move(Math.round(frac * (count - 1)), false);
  };

  /* Two halves, because not every chart's plot IS its outer element. Where the
     drawing is a sub-element that scales independently of its container (an
     <svg> letterboxing under the default preserveAspectRatio), the pointer half
     belongs on the plot and the focus half on the labelled group. `bind` is the
     union, for charts where they are the same element. */
  const groupBind = { tabIndex: count ? 0 : -1, onKeyDown, onBlur: clear };
  const plotBind = { onPointerMove, onPointerLeave: clear };

  /* Set the cursor from outside, as a pointer would.
     Some plots are drawn as one element per datum, and an SVG `<path>` already
     hit-tests its own filled shape exactly and for free. A sankey's ribbons are
     cubic beziers; re-deriving containment for those in a `hitTest` would be a
     second, worse implementation of something the browser is already doing. So
     those charts put `onPointerEnter={() => cursor.point(i)}` on each shape and
     `onPointerLeave={cursor.clear}` on the plot as a whole — leaving the plot is
     what clears, not leaving one shape, or moving between two touching ribbons
     could clear and re-set in the wrong order. */
  const point = (i) => move(i, false);

  return { index, keyboard, clear, point, groupBind, plotBind, bind: { ...groupBind, ...plotBind } };
}

/**
 * The focus ring wants a little air between it and the plot.
 *
 * This is a constant rather than part of `bind` ON PURPOSE. A bind that carries
 * `style` either clobbers the element's own `style` prop or is clobbered by it,
 * depending purely on spread order — and it silently did. Every chart wrote
 * `<div style={{ position: "relative", ...style }} {...cursor.bind}>`, so all
 * four x-indexed charts shipped with a wrapper whose entire style was
 * `outline-offset: 2px`: no `position: relative` (the absolutely-positioned
 * readout was anchoring to some ancestor, not the chart) and no `style`
 * passthrough at all. Nothing failed, because the cursor tests only ever
 * asserted the readout's TEXT.
 *
 * So: binds carry behaviour, never style.
 */
export const CHART_FOCUS_STYLE = { outlineOffset: 2 };

/**
 * Where a viewBox coordinate actually lands inside its container.
 *
 * An `<svg>` with the default `preserveAspectRatio` ("xMidYMid meet") scales to
 * fit and CENTRES the remainder, so a 660×260 viewBox in a 566px-wide box draws
 * at 0.858 with ~19px of empty gutter above and below. A percentage-positioned
 * HTML overlay computed from the container therefore misses the drawing — by
 * enough to point at the wrong data.
 *
 * Returns `{ s, ox, oy, w, h }` (scale and centring offsets) or null before
 * measurement. Null on the server and on first paint, which is fine: the things
 * that use it only appear after a pointer or key event.
 */
export function useSvgBox(ref, W, H) {
  const [box, setBox] = React.useState(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const read = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const s = Math.min(r.width / W, r.height / H);
      setBox({ w: r.width, h: r.height, s, ox: (r.width - W * s) / 2, oy: (r.height - H * s) / 2 });
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, W, H]);
  return box;
}

/** viewBox point → fraction of the container, for positioning an HTML overlay. */
export const boxFrac = (box, x, y) =>
  box ? { fx: (box.ox + x * box.s) / box.w, fy: (box.oy + y * box.s) / box.h } : null;

/** container offset → viewBox point, for hit-testing against plot geometry. */
export const boxPoint = (box, px, py) =>
  box && box.s ? { x: (px - box.ox) / box.s, y: (py - box.oy) / box.s } : null;

/**
 * The announcement channel for keyboard navigation. Polite, and only ever holds
 * the currently-focused point, so it says one thing at a time.
 */
export function ChartLive({ text }) {
  return (
    <span
      aria-live="polite"
      style={{
        position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
        overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0,
      }}
    >
      {text || ""}
    </span>
  );
}

/**
 * The visible readout. Positioned as a percentage of the chart's width so it
 * tracks the point through any container size, and flipped near the right edge
 * so it never runs off. `aria-hidden` because ChartLive already announces it —
 * showing the same string twice to a screen reader helps nobody.
 */
export function ChartTooltip({ x, y = null, children, visible }) {
  if (!visible || children == null) return null;
  const past = x > 0.6;
  /* `y` is opt-in. An x-indexed chart pins the readout to the top of the plot,
     where it never covers the line it describes; a donut or a scatter has no
     such safe row, so those pass a y and get a readout centred on the point. */
  const vert = y == null ? { top: 0, dy: "0" } : { top: `${y * 100}%`, dy: "-50%" };
  return (
    <div
      aria-hidden="true"
      style={{
        /* This tracks a point in the chart's own coordinate space, which
           guidelines/rtl.md keeps physical. Mirroring the readout while the plot
           stays put would point it at the wrong data. */
        position: "absolute", top: vert.top, left: `${x * 100}%`,   /* rtl-ok: chart coordinate space */
        transform: `translate(${past ? "calc(-100% - 10px)" : "10px"}, ${vert.dy})`,
        pointerEvents: "none", zIndex: "var(--z-tooltip)",
        background: "var(--surface-tooltip)", color: "var(--text-on-brand)",
        borderRadius: "var(--radius-md)", boxShadow: "var(--elevation-floating)",
        padding: "6px 10px", whiteSpace: "nowrap",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {children}
    </div>
  );
}
