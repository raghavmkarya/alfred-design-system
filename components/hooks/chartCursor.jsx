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
export function useChartCursor(count) {
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
    const frac = (e.clientX - r.left) / r.width;
    move(Math.round(frac * (count - 1)), false);
  };

  return {
    index,
    keyboard,
    clear,
    /* spread onto the chart's outer element */
    bind: {
      tabIndex: count ? 0 : -1,
      onKeyDown,
      onPointerMove,
      onPointerLeave: clear,
      onBlur: clear,
      style: { outlineOffset: 2 },
    },
  };
}

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
export function ChartTooltip({ x, children, visible }) {
  if (!visible || children == null) return null;
  const past = x > 0.6;
  return (
    <div
      aria-hidden="true"
      style={{
        /* This tracks a point in the chart's own coordinate space, which
           guidelines/rtl.md keeps physical. Mirroring the readout while the plot
           stays put would point it at the wrong data. */
        position: "absolute", top: 0, left: `${x * 100}%`,   /* rtl-ok: chart coordinate space */
        transform: `translate(${past ? "calc(-100% - 10px)" : "10px"}, 0)`,
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
