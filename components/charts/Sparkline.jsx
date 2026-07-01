import React from "react";

/**
 * Alfred AI — Sparkline
 * Compact trend line with the signature periwinkle→orange gradient and a soft
 * orange area fill. Pass a `points` array of numbers. Stretches to its container
 * width. Uses a unique gradient id per instance so many can share a page.
 */
export function Sparkline({ points = [], width = 640, height = 160, stroke = 3, fill = true, style = {} }) {
  const uid = React.useId().replace(/[:]/g, "");
  const max = Math.max(...points), min = Math.min(...points);
  const nx = (i) => (i / ((points.length - 1) || 1)) * width;
  const ny = (v) => height - ((v - min) / ((max - min) || 1)) * (height - 20) - 10;
  const line = points.map((v, i) => `${i === 0 ? "M" : "L"} ${nx(i).toFixed(1)} ${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" style={{ display: "block", ...style }}>
      <defs>
        <linearGradient id={`${uid}l`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--chart-2)" /><stop offset="100%" stopColor="var(--chart-1)" /></linearGradient>
        {/* rgba(255,132,49,…) mirrors --orange-500 — alpha ramps can't be composed from a CSS var. */}
        <linearGradient id={`${uid}f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,132,49,0.20)" /><stop offset="100%" stopColor="rgba(255,132,49,0)" /></linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${uid}f)`} />}
      <path d={line} fill="none" stroke={`url(#${uid}l)`} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
