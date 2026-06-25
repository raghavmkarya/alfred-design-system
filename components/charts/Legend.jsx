import React from "react";

/**
 * Alfred AI — Legend
 * Swatch + label key for any chart. Row (default) or column layout; each item
 * may carry an optional right-aligned value. Colors default through the brand
 * categorical palette so a legend always matches the chart beside it.
 */
const PALETTE = ["#FF8431", "#A7A7FC", "#FFB07B", "#7B7BF5", "#2FB67C", "#F26A1B", "#C9C9FF", "#E5484D"];

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
