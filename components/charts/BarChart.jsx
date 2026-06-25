import React from "react";

/**
 * Alfred AI — BarChart
 * Vertical bars for categorical comparisons. Bars use the brand gradient by
 * default; pass a per-datum `color` to override. `data`: [{label, value, color?,
 * display?}] — `display` overrides the printed value (e.g. "$84K").
 */
export function BarChart({ data = [], height = 200, max, showValues = true, style = {} }) {
  const top = max || Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ width: "100%", ...style }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", gap: 6 }}>
            {showValues && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{d.display ?? d.value}</span>}
            <div style={{ width: "100%", maxWidth: 52, height: `${Math.max((d.value / top) * 100, 2)}%`, borderRadius: "var(--radius-sm)", background: d.color || "var(--gradient-brand-reverse)" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
        {data.map((d, i) => (
          <span key={i} style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
