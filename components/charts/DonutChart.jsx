import React from "react";
import { ChartTable } from "../hooks/chartTable.jsx";
import { useChartCursor, ChartLive, CHART_FOCUS_STYLE } from "../hooks/chartCursor.jsx";

/**
 * Alfred AI — DonutChart
 * Ring chart for share-of-total (channel mix, budget split). `segments`:
 * [{label, value, color?}] — colors default through the brand ramp. Optional
 * center label/sub. The track reads the theme so it works on light + dark.
 */
const RAMP = ["var(--chart-1)", "var(--chart-2)", "var(--chart-7)", "var(--chart-4)", "var(--border-default)"];

export function DonutChart({ segments = [], size = 180, thickness = 22, centerLabel, centerSub, ariaLabel, style = {} }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  // WCAG 1.1.1 — a bare <svg> exposes nothing to a screen reader.
  const aria = ariaLabel || (segments.length
    ? `Donut chart: ${segments.map((s) => `${s.label} ${Math.round((s.value / total) * 100)}%`).join(", ")}`
    : "Donut chart, no data");

  // Cumulative arc bounds, as fractions of the ring, walked clockwise from 12
  // o'clock. Used to draw the segments AND to find the one under the pointer,
  // so the two can never disagree about where a segment starts.
  const bounds = [];
  let acc = 0;
  segments.forEach((s) => {
    const f = (Number(s.value) || 0) / total;
    bounds.push([acc, acc + f]);
    acc += f;
  });

  /* Angular hit-testing. A donut is not indexed along x: the segment under the
     pointer is the one whose arc contains the pointer's ANGLE, and only when the
     pointer is actually on the ring. Inside the hole returns null, so the centre
     label is not a dead zone that silently keeps the last segment lit. */
  const hitTest = React.useCallback((px, py, rect) => {
    if (!segments.length) return null;
    const scale = rect.width / size || 1;
    const dx = px / scale - mid;
    const dy = py / scale - mid;
    const dist = Math.hypot(dx, dy);
    if (dist < r - thickness / 2 || dist > r + thickness / 2) return null;
    // atan2(dx, -dy) measures clockwise from 12 o'clock, which is where the
    // dash pattern starts once the ring group is rotated -90°.
    let a = Math.atan2(dx, -dy);
    if (a < 0) a += Math.PI * 2;
    const f = a / (Math.PI * 2);
    const i = bounds.findIndex(([lo, hi]) => f >= lo && f < hi);
    return i === -1 ? null : i;
  }, [segments.length, size, thickness, r, mid, total]);

  const cursor = useChartCursor(segments.length, { hitTest });
  const at = cursor.index;
  const share = (i) => Math.round((segments[i].value / total) * 100);
  const segLabel = (i) => `${segments[i].label}: ${segments[i].value} (${share(i)}%)`;

  /* The readout goes in the HOLE, not in a floating pill on the ring.
     A pill anchored to the active arc has nowhere good to go: placed inward it
     covers the segment it is describing, and placed outward it runs off the
     container — the donut's box is exactly the donut, so on a left-hand segment
     it lands at a negative offset and disappears off the page. Both were tried.
     The centre is empty by construction, already the slot this component
     reserves for a label, and is the same distance from every segment. */
  const big = { fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: "var(--text-h3)", color: "var(--text-primary)", letterSpacing: "var(--ls-tight)", lineHeight: 1.1 };
  const small = { fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", textAlign: "center" };

  return (
    /* Interactive chart: the name moves to the focusable group and the graphic
       goes aria-hidden. Keeping role="img" as well would announce it twice.
       See guidelines/chart-contract.md. */
    <div {...cursor.bind} role="group" aria-label={aria}
      style={{ position: "relative", width: size, height: size, ...CHART_FOCUS_STYLE, ...style }}>
      <ChartLive text={cursor.keyboard && at != null ? segLabel(at) : ""} />
      <ChartTable caption={aria} columns={["Segment", "Value", "Share"]}
        rows={segments.map((s) => [String(s.label), String(s.value), `${Math.round((s.value / total) * 100)}%`])} />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {/* The -90° turn that puts the dash origin at 12 o'clock used to be a CSS
            transform on the <svg>. That put it in the element's screen matrix,
            where it rotated any overlay and any coordinate read back out of it.
            As a <g> it is confined to the ring, and the svg's own space stays
            upright and honest. Identical geometry: same angle, same centre. */}
        <g transform={`rotate(-90 ${mid} ${mid})`}>
          <circle cx={mid} cy={mid} r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={thickness} />
          {segments.map((s, i) => {
            const len = ((Number(s.value) || 0) / total) * c;
            return (
              <circle key={i} cx={mid} cy={mid} r={r} fill="none"
                stroke={s.color || RAMP[i % RAMP.length]}
                strokeWidth={i === at ? thickness + 5 : thickness}
                strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-bounds[i][0] * c} />
            );
          })}
        </g>
      </svg>
      {(at != null || centerLabel || centerSub) && (
        <div
          /* aria-hidden only while the cursor owns it, because ChartLive is
             already announcing that. `centerLabel` is the caller's own content
             and stays readable. */
          aria-hidden={at != null ? "true" : undefined}
          style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 2,
            padding: thickness + 6, boxSizing: "border-box", pointerEvents: "none",
          }}
        >
          {at != null ? (
            <>
              <span style={big}>{segments[at].value}</span>
              <span style={small}>{segments[at].label} · {share(at)}%</span>
            </>
          ) : (
            <>
              {centerLabel && <span style={big}>{centerLabel}</span>}
              {centerSub && <span style={small}>{centerSub}</span>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
