import React from "react";

/**
 * Alfred AI — FunnelChart
 * Horizontal descending bars for a conversion funnel (Visitors → MQL → SQL →
 * Won). `steps`: [{label, value, color?, display?}]. Bars are scaled to the
 * largest step; the track reads the theme so it works on light + dark.
 */
export function FunnelChart({ steps = [], style = {} }) {
  const top = Math.max(...steps.map((s) => s.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", ...style }}>
      {steps.map((s, i) => {
        const pct = Math.round((s.value / top) * 100);
        return (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)" }}>
              <span style={{ color: "var(--text-secondary)" }}>{s.label}</span>
              <span style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{s.display ?? s.value}</span>
            </div>
            <div style={{ height: 10, background: "var(--surface-sunken)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: s.color || "var(--gradient-brand-reverse)", borderRadius: "var(--radius-pill)" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
