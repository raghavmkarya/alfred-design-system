import React from "react";

/**
 * Alfred AI — DonutChart
 * Ring chart for share-of-total (channel mix, budget split). `segments`:
 * [{label, value, color?}] — colors default through the brand ramp. Optional
 * center label/sub. The track reads the theme so it works on light + dark.
 */
const RAMP = ["var(--orange-500)", "var(--periwinkle-400)", "var(--orange-300)", "var(--periwinkle-600)", "var(--gray-200)"];

export function DonutChart({ segments = [], size = 180, thickness = 22, centerLabel, centerSub, style = {} }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={s.color || RAMP[i % RAMP.length]} strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} />
          );
          offset += len;
          return el;
        })}
      </svg>
      {(centerLabel || centerSub) && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {centerLabel && <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: "var(--text-h3)", color: "var(--text-primary)", letterSpacing: "var(--ls-tight)" }}>{centerLabel}</span>}
          {centerSub && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{centerSub}</span>}
        </div>
      )}
    </div>
  );
}
