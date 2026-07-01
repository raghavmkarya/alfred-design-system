import React from "react";

/**
 * Alfred AI — LineChart
 * Labelled trend line (a sparkline with x-axis labels) for performance over
 * time. Gradient stroke + soft area fill. Pass `points` and matching `labels`.
 */
export function LineChart({ points = [], labels = [], height = 200, style = {} }) {
  const uid = React.useId().replace(/[:]/g, "");
  const w = 640;
  const max = Math.max(...points), min = Math.min(...points);
  const nx = (i) => (i / ((points.length - 1) || 1)) * w;
  const ny = (v) => height - ((v - min) / ((max - min) || 1)) * (height - 30) - 15;
  const line = points.map((v, i) => `${i === 0 ? "M" : "L"} ${nx(i).toFixed(1)} ${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${w} ${height} L 0 ${height} Z`;
  return (
    <div style={{ width: "100%", ...style }}>
      <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} preserveAspectRatio="none" style={{ display: "block" }}>
        <defs>
          <linearGradient id={`${uid}l`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--chart-2)" /><stop offset="100%" stopColor="var(--chart-1)" /></linearGradient>
          {/* rgba(255,132,49,…) mirrors --orange-500 — alpha ramps can't be composed from a CSS var. */}
          <linearGradient id={`${uid}f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,132,49,0.20)" /><stop offset="100%" stopColor="rgba(255,132,49,0)" /></linearGradient>
        </defs>
        <path d={area} fill={`url(#${uid}f)`} />
        <path d={line} fill="none" stroke={`url(#${uid}l)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {labels.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {labels.map((l, i) => <span key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{l}</span>)}
        </div>
      )}
    </div>
  );
}
