import React from "react";

/**
 * Alfred AI — AreaChart
 * Multi-series area/line trend with a real plot frame: y-axis gridlines + ticks,
 * x-axis labels, and an inline legend for 2+ series. Built for performance-over-
 * time views (ROAS vs target, spend by channel). `series`: [{ name, color?,
 * points: number[] }]; `labels` align to the point index. Colors default through
 * the brand categorical palette. Pass `valueFormat` to format the y-axis ticks.
 */
// Shared categorical palette (--chart-1..8); kept at 6 entries so series cycling is unchanged.
const PALETTE = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--chart-6)"];
const niceRound = (v) => {
  const a = Math.abs(v);
  if (a >= 100) return Math.round(v);
  if (a >= 10) return Math.round(v * 10) / 10;
  return Math.round(v * 100) / 100;
};

export function AreaChart({ series = [], labels = [], height = 220, yTicks = 4, valueFormat, fill = true, style = {} }) {
  const uid = React.useId().replace(/:/g, "");
  const W = 660, padL = 46, padR = 10, padT = 12, padB = 26;
  const plotW = W - padL - padR, plotH = height - padT - padB;
  const all = series.flatMap((s) => s.points);
  const rawMax = Math.max(...all, 0), rawMin = Math.min(...all, 0);
  const max = rawMax, min = rawMin < 0 ? rawMin : 0;
  const span = (max - min) || 1;
  const n = labels.length || Math.max(...series.map((s) => s.points.length), 1);
  const x = (i) => padL + (i / ((n - 1) || 1)) * plotW;
  const y = (v) => padT + plotH - ((v - min) / span) * plotH;
  const fmt = valueFormat || ((v) => niceRound(v));
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => min + (span * i) / yTicks);
  const every = Math.ceil(n / 8) || 1;

  return (
    <div style={{ width: "100%", ...style }}>
      <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{ display: "block" }}>
        <defs>
          {series.map((s, si) => {
            const c = s.color || PALETTE[si % PALETTE.length];
            return (
              <linearGradient key={si} id={`${uid}f${si}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" style={{ stopColor: c, stopOpacity: 0.22 }} />
                <stop offset="100%" style={{ stopColor: c, stopOpacity: 0 }} />
              </linearGradient>
            );
          })}
        </defs>

        {/* gridlines + y-axis ticks */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="var(--border-subtle)" strokeWidth="1" />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)">{fmt(t)}</text>
          </g>
        ))}

        {/* areas + lines */}
        {series.map((s, si) => {
          const c = s.color || PALETTE[si % PALETTE.length];
          const line = s.points.map((v, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
          const area = `${line} L ${x(s.points.length - 1).toFixed(1)} ${y(min).toFixed(1)} L ${x(0).toFixed(1)} ${y(min).toFixed(1)} Z`;
          return (
            <g key={si}>
              {fill && <path d={area} fill={`url(#${uid}f${si})`} />}
              <path d={line} fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}

        {/* x-axis labels */}
        {labels.map((l, i) => (i % every === 0 ? (
          <text key={i} x={x(i)} y={height - 7} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)">{l}</text>
        ) : null))}
      </svg>

      {series.length > 1 && series.some((s) => s.name) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 10, paddingLeft: padL }}>
          {series.map((s, si) => (
            <span key={si} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, flex: "none", background: s.color || PALETTE[si % PALETTE.length] }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{s.name}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
