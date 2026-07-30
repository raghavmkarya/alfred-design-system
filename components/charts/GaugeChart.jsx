import React from "react";
import { ChartTable } from "../hooks/chartTable.jsx";
import { useChartCursor, ChartLive, CHART_FOCUS_STYLE } from "../hooks/chartCursor.jsx";

/**
 * Alfred AI — GaugeChart
 * A 270° radial gauge for a single score (AI Visibility Score, account health).
 * A sunken background rail carries a brand-gradient value arc that sweeps
 * clockwise from the 7-o'clock start, proportional to value/max. Optional
 * `segments` ([{ upTo, color, label }]) tint threshold zones (red/amber/green)
 * along the rail so you can read where the score sits. `valueFormat` formats the
 * big center readout; `label` sits above it and `sub` below. Theme-aware:
 * surfaces and text invert on dark, while the brand gradient stays identical.
 *
 * The cursor walks the BANDS, and only exists when there are bands. The value is
 * already printed large in the middle, so a cursor over it would be a tab stop
 * announcing what is on screen — but a band is a tinted arc with no label, no
 * bounds and no name anywhere in the graphic, which is exactly the case the
 * cursor is for. A gauge with no `segments` therefore has no tab stop, the same
 * way a `Legend` with no `onToggle` stays plain text.
 */
export function GaugeChart({ value = 0, max = 100, label = "", sub = "", segments = [], size = 200, valueFormat = (v) => `${Math.round(v)}`, ariaLabel, style = {} }) {
  const uid = React.useId().replace(/:/g, "");

  const m = max || 1;
  const ratio = Math.max(0, Math.min(1, value / m));
  const fmt = valueFormat || ((v) => `${Math.round(v)}`);

  // —— Geometry: 270° sweep with a 90° gap centered on the bottom ——
  const START = 135;            // lower-left start (~7 o'clock)
  const SWEEP = 270;
  const sw = Math.max(10, Math.round(size * 0.085));   // rail thickness
  const pad = sw / 2 + 2;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - pad;

  const polar = (deg) => {
    const a = (Math.PI / 180) * deg;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const arc = (startDeg, endDeg) => {
    const [x0, y0] = polar(startDeg);
    const [x1, y1] = polar(endDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  };

  const valueAngle = START + ratio * SWEEP;
  const [knobX, knobY] = polar(valueAngle);

  // threshold zones across the full rail (sorted, clamped), each carrying the
  // value range it covers so the cursor and the data table read the same bounds
  // the arc is drawn from
  const zones = (segments || [])
    .filter((z) => z && typeof z.upTo === "number")
    .map((z) => ({ upTo: Math.max(0, Math.min(m, z.upTo)), color: z.color, label: z.label }))
    .sort((a, b) => a.upTo - b.upTo)
    .map((z, i, all) => ({ ...z, from: i === 0 ? 0 : all[i - 1].upTo, name: z.label || `Band ${i + 1}` }));

  // bottom-end labels + cropped viewBox height
  const bottomArc = cy + r * Math.sin((135 * Math.PI) / 180) + sw / 2;
  const endFont = Math.max(10, Math.round(size * 0.06));
  const endY = bottomArc + endFont + 2;
  const H = Math.ceil(endY + endFont * 0.35);

  const valueFont = Math.round(size * 0.26);
  const aria = ariaLabel || `${label ? `${label}: ` : ""}${fmt(value)} of ${fmt(m)}`;

  /* Angular hit-testing, as on the donut, with one extra case: the gauge is not
     a closed ring. Its sweep is 270° with a 90° gap at the bottom, so a pointer
     below the gauge is inside the circle's radius and still on nothing — that
     has to return null rather than clamp to the nearest end, or the rail would
     appear to wrap around through the gap. */
  const hitTest = React.useCallback((px, py, rect) => {
    if (!zones.length) return null;
    const scale = rect.width / size || 1;
    const dx = px / scale - cx;
    const dy = py / scale - cy;
    const dist = Math.hypot(dx, dy);
    if (Math.abs(dist - r) > sw / 2 + 2) return null;                 // off the rail
    let rel = (Math.atan2(dy, dx) * 180) / Math.PI - START;           // same convention as polar()
    while (rel < 0) rel += 360;
    if (rel > SWEEP) return null;                                     // the bottom gap
    const v = (rel / SWEEP) * m;
    const i = zones.findIndex((z) => v >= z.from && v < z.upTo);
    return i === -1 ? null : i;
  }, [zones.length, size, cx, cy, r, sw, m]);

  const cursor = useChartCursor(zones.length, { hitTest });
  const at = cursor.index;
  const band = at != null ? zones[at] : null;
  const bandText = band ? `${band.name}: ${fmt(band.from)} to ${fmt(band.upTo)}` : "";
  const bandLive = band
    ? `${bandText}${value >= band.from && value < band.upTo ? `, holds the current ${fmt(value)}` : ""}`
    : "";

  return (
    /* With bands the gauge is interactive, so the name moves to the focusable
       group and the graphic goes aria-hidden — carrying role="img" as well would
       announce the chart twice. Without bands there is nothing to walk, so it
       stays the static shape. See guidelines/chart-contract.md. */
    <div
      {...(zones.length ? cursor.bind : null)}
      role={zones.length ? "group" : undefined}
      aria-label={zones.length ? aria : undefined}
      style={{ position: "relative", width: size, ...(zones.length ? CHART_FOCUS_STYLE : null), ...style }}
    >
      {zones.length > 0 && <ChartLive text={cursor.keyboard && band ? bandLive : ""} />}
      <ChartTable caption={aria} columns={["Measure", "Value"]}
        rows={[[label || "Value", fmt(value)], ["Maximum", fmt(m)]]
          /* the bands read their bounds off `zones`, which is what the arcs are
             drawn from. This row used to read `s.to ?? s.value`, neither of which
             a segment has — every band printed an empty value. */
          .concat(zones.map((z) => [z.name, `${fmt(z.from)} to ${fmt(z.upTo)}`]))} />
      <svg
        width={size}
        height={H}
        viewBox={`0 0 ${size} ${H}`}
        role={zones.length ? undefined : "img"}
        aria-label={zones.length ? undefined : aria}
        aria-hidden={zones.length ? "true" : undefined}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id={`${uid}g`} gradientUnits="userSpaceOnUse" x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r}>
            <stop offset="0%" stopColor="var(--periwinkle-400)" />
            <stop offset="72%" stopColor="var(--orange-500)" />
          </linearGradient>
        </defs>

        {/* background rail */}
        <path d={arc(START, START + SWEEP)} fill="none" stroke="var(--surface-sunken)" strokeWidth={sw} strokeLinecap="round" />

        {/* threshold zones tint the rail */}
        {zones.map((z, i) => {
          const startFrac = z.from / m;
          const endFrac = z.upTo / m;
          if (endFrac <= startFrac) return null;
          /* The active band thickens as well as brightening: opacity alone would
             be the only signal in forced-colors mode, where the tint is gone. */
          const on = i === at;
          return (
            <path
              key={`z${i}`}
              d={arc(START + startFrac * SWEEP, START + endFrac * SWEEP)}
              fill="none"
              stroke={z.color}
              strokeWidth={on ? sw + 4 : sw}
              strokeOpacity={on ? "0.95" : "0.5"}
              strokeLinecap="butt"
            />
          );
        })}

        {/* value arc + tip marker */}
        {ratio > 0.0001 && (
          <>
            <path d={arc(START, valueAngle)} fill="none" stroke={`url(#${uid}g)`} strokeWidth={sw} strokeLinecap="round" />
            <circle cx={knobX} cy={knobY} r={sw * 0.34} fill="var(--surface-card)" stroke="var(--accent)" strokeWidth="2.5" />
          </>
        )}

        {/* min / max end labels */}
        <text x={polar(START)[0]} y={endY} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={endFont} fill="var(--text-muted)">{fmt(0)}</text>
        <text x={polar(START + SWEEP)[0]} y={endY} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={endFont} fill="var(--text-muted)">{fmt(m)}</text>
      </svg>

      {/* center readout — centered on the gauge axis (cy = size / 2) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,   /* rtl-ok: chart coordinate space, see guidelines/rtl.md */
          width: size,
          height: size,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pointerEvents: "none",
          padding: `0 ${sw}px`,
        }}
      >
        {label && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)", lineHeight: 1.2 }}>{label}</span>
        )}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-bold)",
            fontSize: valueFont,
            lineHeight: 1,
            letterSpacing: "var(--ls-tight)",
            color: "var(--text-primary)",
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
            marginTop: label ? 4 : 0,
          }}
        >
          {fmt(value)}
        </span>
        {/* The band readout takes the `sub` slot rather than floating over the
            rail. A pill anchored to an arc has the donut's problem — inward it
            covers the band it describes, outward it leaves the box — and the
            centre is empty by construction, already the slot this component
            reserves for a caption, and the same distance from every band.
            aria-hidden only while the cursor owns it: ChartLive is saying it. */}
        {(band || sub) && (
          <span
            aria-hidden={band ? "true" : undefined}
            style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: band ? "var(--text-secondary)" : "var(--text-muted)", lineHeight: 1.2, marginTop: 4, textAlign: "center" }}
          >
            {band ? bandText : sub}
          </span>
        )}
      </div>
    </div>
  );
}
