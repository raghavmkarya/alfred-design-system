import React from "react";
import { Legend } from "../charts/Legend.jsx";

/**
 * Alfred AI — StackedBarChart
 * Vertical bars for comparing several series across categories, with a real plot
 * frame: y-axis gridlines + ticks, x-axis labels under each group, and an inline
 * legend. `stacked` (default) stacks series within one bar per label; set it false
 * to render grouped, side-by-side bars. `data`: [{ label, [key]: number }];
 * `keys`: the series keys to plot, in stack order (bottom → top). Colors default
 * through the brand categorical palette; pass `colors` to override per index.
 * `valueFormat` formats the y-axis ticks. Built for channel-mix views — e.g.
 * "I've split each quarter's pipeline across social, search and email for you."
 */
const PALETTE = ["#FF8431", "#A7A7FC", "#2FB67C", "#7B7BF5", "#F26A1B", "#E5484D"];
const BAR_RADIUS = 8; // top-corner rounding — mirrors var(--radius-sm)

const num = (v) => (Number.isFinite(+v) ? +v : 0);
const niceRound = (v) => {
  const a = Math.abs(v);
  if (a >= 100) return Math.round(v);
  if (a >= 10) return Math.round(v * 10) / 10;
  return Math.round(v * 100) / 100;
};
const niceCeil = (v) => {
  if (!(v > 0)) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * pow;
};
// Rectangle path with only the two TOP corners rounded (radius clamped to fit).
const topRounded = (x, y, w, h, r) => {
  const rr = Math.max(0, Math.min(r, w / 2, h));
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`;
};

export function StackedBarChart({ data = [], keys = [], colors, height = 220, stacked = true, valueFormat, style = {} }) {
  const uid = React.useId().replace(/:/g, "");
  const W = 660, padL = 46, padR = 14, padT = 14, padB = 30;
  const plotW = W - padL - padR, plotH = height - padT - padB;
  const yTicks = 4;
  const grouped = !stacked;
  const palAt = (i) => (Array.isArray(colors) && colors[i]) || PALETTE[i % PALETTE.length];
  const fmt = valueFormat || niceRound;

  const totals = data.map((d) => keys.reduce((s, k) => s + num(d && d[k]), 0));
  const rawMax = grouped
    ? Math.max(0, ...data.flatMap((d) => keys.map((k) => num(d && d[k]))))
    : Math.max(0, ...totals);
  const top = niceCeil(rawMax);

  const n = data.length;
  const bandW = n ? plotW / n : plotW;
  const yScale = (v) => padT + plotH - (v / top) * plotH;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (top * i) / yTicks);

  const barW = Math.min(bandW * 0.5, 56);            // single stacked bar
  const innerW = bandW * 0.74;                       // grouped cluster footprint
  const nKeys = keys.length || 1;
  const gGap = nKeys > 1 ? Math.min(6, innerW * 0.05) : 0;
  const gBarW = Math.max((innerW - gGap * (nKeys - 1)) / nKeys, 1);

  return (
    <div style={{ width: "100%", ...style }}>
      <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{ display: "block" }}>
        <defs>
          {/* Soft top sheen — a single light source from above, theme-neutral. */}
          <linearGradient id={`${uid}sheen`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--white)", stopOpacity: 0.16 }} />
            <stop offset="58%" style={{ stopColor: "var(--white)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* y-axis gridlines + ticks (0-line reads as the baseline) */}
        {ticks.map((t, i) => (
          <g key={`grid${i}`}>
            <line x1={padL} x2={W - padR} y1={yScale(t)} y2={yScale(t)} stroke={i === 0 ? "var(--border-default)" : "var(--border-subtle)"} strokeWidth="1" />
            <text x={padL - 8} y={yScale(t) + 4} textAnchor="end" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)">{fmt(t)}</text>
          </g>
        ))}

        {/* bars */}
        {data.map((d, i) => {
          const xc = padL + bandW * (i + 0.5);

          if (grouped) {
            const start = xc - innerW / 2;
            return (
              <g key={`bar${i}`}>
                {keys.map((k, j) => {
                  const v = num(d && d[k]);
                  if (v <= 0) return null;
                  const bx = start + j * (gBarW + gGap);
                  const by = yScale(v);
                  const bh = Math.max(yScale(0) - by, 2);
                  const dPath = topRounded(bx, by, gBarW, bh, Math.min(BAR_RADIUS, gBarW / 2));
                  return (
                    <g key={`seg${i}-${j}`}>
                      <path d={dPath} fill={palAt(j)} />
                      <path d={dPath} fill={`url(#${uid}sheen)`} />
                    </g>
                  );
                })}
              </g>
            );
          }

          // stacked
          const bx = xc - barW / 2;
          let acc = 0;
          let lastIdx = -1;
          keys.forEach((k, j) => { if (num(d && d[k]) > 0) lastIdx = j; });
          return (
            <g key={`bar${i}`}>
              {keys.map((k, j) => {
                const v = num(d && d[k]);
                if (v <= 0) return null;
                const y0 = yScale(acc); acc += v; const y1 = yScale(acc);
                const h = y0 - y1;
                return j === lastIdx
                  ? <path key={`seg${i}-${j}`} d={topRounded(bx, y1, barW, h, Math.min(BAR_RADIUS, barW / 2))} fill={palAt(j)} />
                  : <rect key={`seg${i}-${j}`} x={bx} y={y1} width={barW} height={h} fill={palAt(j)} />;
              })}
              {totals[i] > 0 && (
                <path d={topRounded(bx, yScale(totals[i]), barW, yScale(0) - yScale(totals[i]), Math.min(BAR_RADIUS, barW / 2))} fill={`url(#${uid}sheen)`} />
              )}
            </g>
          );
        })}

        {/* x-axis labels */}
        {data.map((d, i) => (
          <text key={`lbl${i}`} x={padL + bandW * (i + 0.5)} y={height - 9} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)">{d && d.label}</text>
        ))}
      </svg>

      {keys.length > 0 && (
        <Legend items={keys.map((k, i) => ({ label: k, color: palAt(i) }))} style={{ marginTop: 14 }} />
      )}
    </div>
  );
}
