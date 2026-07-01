import React from "react";

/**
 * Alfred AI — Legend
 * Swatch + label key for any chart. Row (default) or column layout; each item
 * may carry an optional right-aligned value. Colors default through the brand
 * categorical palette so a legend always matches the chart beside it.
 */
// Shared categorical palette — same 6 tokens, same order, same cycle length as
// the charts, so an auto-colored legend always matches the chart beside it
// (both wrap to --chart-1 on a 7th series). --chart-7/8 stay explicit-use only.
const PALETTE = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--chart-6)"];

export function Legend({ items = [], direction = "row", style = {} }) {
  return (
    <div style={{
      display: "flex", flexDirection: direction === "column" ? "column" : "row",
      flexWrap: "wrap", gap: direction === "column" ? 8 : 18, ...style,
    }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, flex: "none", background: it.color || PALETTE[i % PALETTE.length] }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{it.label}</span>
          {it.value != null && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{it.value}</span>
          )}
        </span>
      ))}
    </div>
  );
}
