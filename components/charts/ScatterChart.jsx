import React from "react";

/**
 * Alfred AI — ScatterChart
 * An x/y scatter for two-variable comparison (e.g. spend vs ROAS by campaign).
 * Real plot frame: x + y axes, both gridlines, formatted axis tick labels, and
 * small axis titles (`xLabel` along the bottom, `yLabel` rotated up the left).
 * `points`: [{ x, y, label?, color?, r? }] — each renders as a soft glowing
 * circle (palette color by index unless `color` set, radius 6 unless `r` set)
 * with its label beside it. Axes auto-scale to nice rounded maxima; override
 * with `xMax`/`yMax`, and format ticks with `valueFormatX` / `valueFormatY`.
 */
const PALETTE = ["#FF8431", "#A7A7FC", "#2FB67C", "#7B7BF5", "#F26A1B", "#E5484D"];
const X_TICKS = 4, Y_TICKS = 4;

const niceRound = (v) => {
  const a = Math.abs(v);
  if (a >= 100) return Math.round(v);
  if (a >= 10) return Math.round(v * 10) / 10;
  return Math.round(v * 100) / 100;
};

// Round a data maximum up to a clean axis maximum, giving natural headroom.
const niceMax = (v, ticks) => {
  if (!(v > 0)) return ticks;
  const rough = v / ticks;
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const n = rough / pow;
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * pow;
  return Math.ceil(v / step) * step;
};

export function ScatterChart({ points = [], xLabel, yLabel, height = 260, xMax, yMax, valueFormatX, valueFormatY, style = {} }) {
  const uid = React.useId().replace(/:/g, "");
  const W = 660, padL = 54, padR = 18, padT = 16, padB = 46;
  const plotW = W - padL - padR, plotH = height - padT - padB;
  const plotB = padT + plotH;

  const xs = points.map((p) => Number(p.x) || 0);
  const ys = points.map((p) => Number(p.y) || 0);
  const xTop = (xMax ?? niceMax(Math.max(...xs, 0), X_TICKS)) || 1;
  const yTop = (yMax ?? niceMax(Math.max(...ys, 0), Y_TICKS)) || 1;

  const xPx = (v) => padL + (v / xTop) * plotW;
  const yPx = (v) => plotB - (v / yTop) * plotH;
  const fmtX = valueFormatX || ((v) => niceRound(v));
  const fmtY = valueFormatY || ((v) => niceRound(v));

  const xTickVals = Array.from({ length: X_TICKS + 1 }, (_, i) => (xTop * i) / X_TICKS);
  const yTickVals = Array.from({ length: Y_TICKS + 1 }, (_, i) => (yTop * i) / Y_TICKS);

  return (
    <div style={{ width: "100%", ...style }}>
      <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{ display: "block", overflow: "visible" }}>
        <defs>
          {points.map((p, i) => {
            const c = p.color || PALETTE[i % PALETTE.length];
            return (
              <radialGradient key={i} id={`${uid}h${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: c, stopOpacity: 0.34 }} />
                <stop offset="100%" style={{ stopColor: c, stopOpacity: 0 }} />
              </radialGradient>
            );
          })}
        </defs>

        {/* vertical gridlines + x tick labels */}
        {xTickVals.map((t, i) => (
          <g key={`x${i}`}>
            <line x1={xPx(t)} x2={xPx(t)} y1={padT} y2={plotB} stroke="var(--border-subtle)" strokeWidth="1" />
            <text x={xPx(t)} y={plotB + 17} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)" style={{ fontVariantNumeric: "tabular-nums" }}>{fmtX(t)}</text>
          </g>
        ))}

        {/* horizontal gridlines + y tick labels */}
        {yTickVals.map((t, i) => (
          <g key={`y${i}`}>
            <line x1={padL} x2={W - padR} y1={yPx(t)} y2={yPx(t)} stroke="var(--border-subtle)" strokeWidth="1" />
            <text x={padL - 9} y={yPx(t) + 4} textAnchor="end" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)" style={{ fontVariantNumeric: "tabular-nums" }}>{fmtY(t)}</text>
          </g>
        ))}

        {/* axis baselines (slightly stronger than gridlines) */}
        <line x1={padL} x2={padL} y1={padT} y2={plotB} stroke="var(--border-default)" strokeWidth="1" />
        <line x1={padL} x2={W - padR} y1={plotB} y2={plotB} stroke="var(--border-default)" strokeWidth="1" />

        {/* points: soft glow halo + solid core, label beside */}
        {points.map((p, i) => {
          const c = p.color || PALETTE[i % PALETTE.length];
          const r = p.r || 6;
          const cx = xPx(Number(p.x) || 0);
          const cy = yPx(Number(p.y) || 0);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r + 7} fill={`url(#${uid}h${i})`} />
              <circle cx={cx} cy={cy} r={r} fill={c} fillOpacity="0.92" stroke="var(--surface-card)" strokeWidth="1.5" />
              {p.label != null && p.label !== "" && (
                <text x={cx + r + 7} y={cy + 4} fontFamily="var(--font-sans)" fontSize="11" fontWeight="var(--fw-medium)" fill="var(--text-secondary)">{p.label}</text>
              )}
            </g>
          );
        })}

        {/* x-axis title */}
        {xLabel ? (
          <text x={padL + plotW / 2} y={height - 6} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="var(--fw-semibold)" letterSpacing="0.04em" fill="var(--text-muted)">{xLabel}</text>
        ) : null}

        {/* y-axis title (rotated) */}
        {yLabel ? (
          <text x={15} y={padT + plotH / 2} textAnchor="middle" transform={`rotate(-90 15 ${padT + plotH / 2})`} fontFamily="var(--font-sans)" fontSize="11" fontWeight="var(--fw-semibold)" letterSpacing="0.04em" fill="var(--text-muted)">{yLabel}</text>
        ) : null}
      </svg>
    </div>
  );
}
