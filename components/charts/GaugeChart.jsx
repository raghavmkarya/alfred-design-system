import React from "react";

/**
 * Alfred AI — GaugeChart
 * A 270° radial gauge for a single score (AI Visibility Score, account health).
 * A sunken background rail carries a brand-gradient value arc that sweeps
 * clockwise from the 7-o'clock start, proportional to value/max. Optional
 * `segments` ([{ upTo, color }]) tint threshold zones (red/amber/green) along
 * the rail so you can read where the score sits. `valueFormat` formats the big
 * center readout; `label` sits above it and `sub` below. Theme-aware: surfaces
 * and text invert on dark, while the brand gradient stays identical.
 */
export function GaugeChart({ value = 0, max = 100, label = "", sub = "", segments = [], size = 200, valueFormat = (v) => `${Math.round(v)}`, style = {} }) {
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

  // threshold zones across the full rail (sorted, clamped)
  const zones = (segments || [])
    .filter((z) => z && typeof z.upTo === "number")
    .map((z) => ({ upTo: Math.max(0, Math.min(m, z.upTo)), color: z.color }))
    .sort((a, b) => a.upTo - b.upTo);

  // bottom-end labels + cropped viewBox height
  const bottomArc = cy + r * Math.sin((135 * Math.PI) / 180) + sw / 2;
  const endFont = Math.max(10, Math.round(size * 0.06));
  const endY = bottomArc + endFont + 2;
  const H = Math.ceil(endY + endFont * 0.35);

  const valueFont = Math.round(size * 0.26);
  const aria = `${label ? `${label}: ` : ""}${fmt(value)} of ${fmt(m)}`;

  return (
    <div style={{ position: "relative", width: size, ...style }}>
      <svg
        width={size}
        height={H}
        viewBox={`0 0 ${size} ${H}`}
        role="img"
        aria-label={aria}
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
          const startFrac = (i === 0 ? 0 : zones[i - 1].upTo) / m;
          const endFrac = z.upTo / m;
          if (endFrac <= startFrac) return null;
          return (
            <path
              key={`z${i}`}
              d={arc(START + startFrac * SWEEP, START + endFrac * SWEEP)}
              fill="none"
              stroke={z.color}
              strokeWidth={sw}
              strokeOpacity="0.5"
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
          left: 0,
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
        {sub && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.2, marginTop: 4 }}>{sub}</span>
        )}
      </div>
    </div>
  );
}
