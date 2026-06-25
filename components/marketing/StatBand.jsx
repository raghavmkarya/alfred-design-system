import React from "react";

/**
 * Alfred AI — StatBand
 * Row of headline outcome metrics (e.g. 90+, $90M+, 90x) with gradient
 * numerals and a caption. Used in the "Leaders trust Alfred" band.
 */
export function StatBand({ stats = [], gradient = true, style = {} }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 24, ...style }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "center" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: 64, lineHeight: 1, letterSpacing: "-0.03em",
            ...(gradient
              ? { background: "var(--gradient-brand-reverse)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
              : { color: "var(--text-primary)" }),
          }}>{s.value}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
