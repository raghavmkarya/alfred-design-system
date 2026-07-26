import React from "react";
import { ChartTable } from "../hooks/chartTable.jsx";
import { useChartCursor, ChartLive, ChartTooltip, CHART_FOCUS_STYLE } from "../hooks/chartCursor.jsx";

/**
 * Alfred AI — LineChart
 * Labelled trend line (a sparkline with x-axis labels) for performance over
 * time. Gradient stroke + soft area fill. Pass `points` and matching `labels`.
 */
export function LineChart({ points = [], labels = [], height = 200, ariaLabel, style = {} }) {
  const uid = React.useId().replace(/[:]/g, "");
  const w = 640;
  const max = Math.max(...points), min = Math.min(...points);
  const nx = (i) => (i / ((points.length - 1) || 1)) * w;
  const ny = (v) => height - ((v - min) / ((max - min) || 1)) * (height - 30) - 15;
  const line = points.map((v, i) => `${i === 0 ? "M" : "L"} ${nx(i).toFixed(1)} ${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${w} ${height} L 0 ${height} Z`;
  // Non-text content needs a text alternative (WCAG 1.1.1). The SVG carries the
  // summary; the label row below stays readable text.
  const aria = ariaLabel || (points.length
    ? `Line chart, ${points.length} points, from ${points[0]} to ${points[points.length - 1]}`
    : "Line chart, no data");

  // one interaction model: hover, or focus once and walk it with the arrows
  const cursor = useChartCursor(points.length);
  const at = cursor.index;
  const pointLabel = (i) => `${labels[i] != null ? labels[i] : `Point ${i + 1}`}: ${points[i]}`;

  return (
    /* Interactive chart: the NAME lives on the focusable group, and the graphic
       below is aria-hidden. A static chart keeps role="img" on its <svg>; once a
       chart can be focused and walked, having both would announce it twice.
       See guidelines/chart-contract.md. */
    <div {...cursor.bind} style={{ width: "100%", position: "relative", ...CHART_FOCUS_STYLE, ...style }}
      role="group" aria-label={aria}>
      <ChartLive text={cursor.keyboard && at != null ? pointLabel(at) : ""} />
      <ChartTooltip x={points.length > 1 ? at / (points.length - 1) : 0} visible={at != null}>
        {at != null ? pointLabel(at) : null}
      </ChartTooltip>
      <ChartTable
        caption={aria}
        columns={[labels.length ? "Point" : "Index", "Value"]}
        rows={points.map((v, i) => [labels[i] != null ? String(labels[i]) : `#${i + 1}`, String(v)])}
      />
      <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} preserveAspectRatio="none" aria-hidden="true" style={{ display: "block" }}>
        <defs>
          <linearGradient id={`${uid}l`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--chart-2)" /><stop offset="100%" stopColor="var(--chart-1)" /></linearGradient>
          {/* rgba(255,132,49,…) mirrors --orange-500 — alpha ramps can't be composed from a CSS var. */}
          <linearGradient id={`${uid}f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,132,49,0.20)" /><stop offset="100%" stopColor="rgba(255,132,49,0)" /></linearGradient>
        </defs>
        <path d={area} fill={`url(#${uid}f)`} />
        <path d={line} fill="none" stroke={`url(#${uid}l)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {at != null && (
          <g aria-hidden="true">
            <line x1={nx(at)} x2={nx(at)} y1="0" y2={height} stroke="var(--border-default)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx={nx(at)} cy={ny(points[at])} r="5" fill="var(--accent)" stroke="var(--surface-card)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </g>
        )}
      </svg>
      {labels.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {labels.map((l, i) => <span key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{l}</span>)}
        </div>
      )}
    </div>
  );
}
