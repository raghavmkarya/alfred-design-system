import React from "react";

/**
 * Alfred AI — Skeleton
 * Theme-aware shimmer placeholder for loading states. Renders `lines` bars
 * (last one shortened when multi-line). Compose several to mock a card or row
 * while data loads. Surfaces read the theme tokens, so it works on light + dark.
 */
export function Skeleton({ width = "100%", height = 16, radius = "var(--radius-sm)", lines = 1, style = {} }) {
  const bar = (w, key) => (
    <span key={key} style={{
      display: "block", width: w, height, borderRadius: radius,
      background: "linear-gradient(90deg, var(--surface-sunken) 25%, var(--border-subtle) 37%, var(--surface-sunken) 63%)",
      backgroundSize: "400% 100%", animation: "ds-shimmer 1.4s ease infinite",
    }} />
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width, ...style }}>
      <style>{"@keyframes ds-shimmer{0%{background-position:100% 50%}100%{background-position:0 50%}}"}</style>
      {Array.from({ length: lines }).map((_, i) => bar(i === lines - 1 && lines > 1 ? "70%" : "100%", i))}
    </div>
  );
}
