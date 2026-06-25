import React from "react";

/**
 * Alfred AI — WaterfallChart
 * Shows how a total is built from running increments / decrements (e.g. starting
 * budget → channel adds → waste cut → projected pipeline). `items`:
 * [{ label, value, type?, color? }]. `type` "start" | "end" draws an absolute
 * total from the baseline in a neutral ink; an omitted `type` is a delta that
 * floats from the running cumulative — positive reads as a gain (success green),
 * negative as a cut (danger red). Bars are linked by thin dashed connectors at the
 * running-total level. Pass `valueFormat` to format y-axis ticks + value labels
 * (e.g. v => "$" + v + "K").
 */
const niceRound = (v) => {
  const a = Math.abs(v);
  if (a >= 100) return Math.round(v);
  if (a >= 10) return Math.round(v * 10) / 10;
  return Math.round(v * 100) / 100;
};

// Smallest "nice" number (1/2/2.5/5/10 × 10ⁿ) ≥ x — for round axis ticks.
const niceCeil = (x) => {
  if (!(x > 0)) return 0;
  const exp = Math.floor(Math.log10(x));
  const f = x / Math.pow(10, exp);
  const nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nf * Math.pow(10, exp);
};

export function WaterfallChart({ items = [], height = 240, valueFormat, style = {} }) {
  const W = 680, padL = 50, padR = 14, padT = 16, padB = 30;
  const plotW = W - padL - padR, plotH = height - padT - padB;
  const yTicks = 4;
  const fmt = valueFormat || ((v) => niceRound(v));

  // —— Resolve each item into a drawable bar (running cumulative) ——
  let cum = 0;
  const bars = items.map((it, i) => {
    const value = it.value || 0;
    const isTotal = it.type === "start" || it.type === "end";
    let bottom, top;
    if (isTotal) {
      bottom = 0; top = value; cum = value;
    } else if (value >= 0) {
      bottom = cum; top = cum + value; cum += value;
    } else {
      bottom = cum + value; top = cum; cum += value;
    }
    return { key: `${it.label ?? "bar"}-${i}`, label: it.label, value, isTotal, color: it.color, bottom, top, cumAfter: cum };
  });

  // —— Vertical domain with a little headroom, snapped to round ticks ——
  const edges = bars.flatMap((b) => [b.top, b.bottom]).concat([0]);
  const dataMax = Math.max(...edges);
  const dataMin = Math.min(...edges);
  const loV = Math.min(0, dataMin);
  const hiPad = dataMax + ((dataMax - loV) || 1) * 0.08;
  const step = niceCeil((hiPad - loV) / yTicks) || 1;
  const minD = Math.floor(loV / step) * step;
  const maxD = Math.max(Math.ceil(hiPad / step) * step, minD + step);
  const span = (maxD - minD) || 1;

  const ticks = [];
  for (let v = minD; v <= maxD + 1e-9; v += step) ticks.push(v);

  // —— Geometry ——
  const n = bars.length || 1;
  const band = plotW / n;
  const barW = Math.min(band * 0.56, 46);
  const cx = (i) => padL + band * (i + 0.5);
  const y = (v) => padT + plotH - ((v - minD) / span) * plotH;

  const barColor = (b) =>
    b.color || (b.isTotal ? "var(--text-primary)" : b.value >= 0 ? "var(--success-500)" : "var(--danger-500)");

  const labelText = (b) => {
    if (b.isTotal) return fmt(b.value);
    const sign = b.value > 0 ? "+" : b.value < 0 ? "−" : "";
    return sign + fmt(Math.abs(b.value));
  };

  const legend = [
    bars.some((b) => b.isTotal) && { k: "total", label: "Total", color: "var(--text-primary)" },
    bars.some((b) => !b.isTotal && b.value > 0) && { k: "inc", label: "Increase", color: "var(--success-500)" },
    bars.some((b) => !b.isTotal && b.value < 0) && { k: "dec", label: "Decrease", color: "var(--danger-500)" },
  ].filter(Boolean);

  const aria = items.length
    ? `Waterfall from ${bars[0].label ?? "start"} to ${bars[bars.length - 1].label ?? "end"}`
    : "Waterfall chart";

  if (bars.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          color: "var(--text-muted)",
          ...style,
        }}
      >
        I don't have any steps to chart yet.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", ...style }}>
      <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{ display: "block" }} role="img" aria-label={aria}>
        {/* gridlines + y-axis ticks */}
        {ticks.map((t, i) => (
          <g key={`t${i}`}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="var(--border-subtle)" strokeWidth="1" />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)" style={{ fontVariantNumeric: "tabular-nums" }}>
              {fmt(niceRound(t))}
            </text>
          </g>
        ))}

        {/* emphasized zero baseline when the domain dips below zero */}
        {minD < 0 && <line x1={padL} x2={W - padR} y1={y(0)} y2={y(0)} stroke="var(--border-default)" strokeWidth="1.5" />}

        {/* dashed connectors at each running-total level */}
        {bars.map((b, i) =>
          i < bars.length - 1 ? (
            <line
              key={`c${b.key}`}
              x1={cx(i) + barW / 2}
              x2={cx(i + 1) - barW / 2}
              y1={y(b.cumAfter)}
              y2={y(b.cumAfter)}
              stroke="var(--text-muted)"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.7"
            />
          ) : null
        )}

        {/* bars + value labels */}
        {bars.map((b, i) => {
          const lowV = Math.min(b.top, b.bottom);
          const highV = Math.max(b.top, b.bottom);
          const ry = y(highV);
          const rh = Math.max(y(lowV) - y(highV), 1);
          return (
            <g key={b.key}>
              <rect x={cx(i) - barW / 2} y={ry} width={barW} height={rh} rx={Math.min(4, barW / 2)} fill={barColor(b)} />
              <text
                x={cx(i)}
                y={ry - 8}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize="11"
                fontWeight="700"
                fill={barColor(b)}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {labelText(b)}
              </text>
            </g>
          );
        })}

        {/* x-axis labels */}
        {bars.map((b, i) => (
          <text key={`x${b.key}`} x={cx(i)} y={height - 9} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--text-muted)">
            {b.label}
          </text>
        ))}
      </svg>

      {legend.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 12, paddingLeft: padL }}>
          {legend.map((l) => (
            <span key={l.k} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, flex: "none", background: l.color }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{l.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
