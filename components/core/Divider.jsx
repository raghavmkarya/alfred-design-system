import React from "react";

/**
 * Alfred AI — Divider
 * Quiet 1px separator. Horizontal by default with an optional centred eyebrow
 * label (line — label — line); vertical stretches inside flex rows. `spacing`
 * controls the margin either side.
 */
export function Divider({ orientation = "horizontal", label, spacing = 16, style = {} }) {
  const line = { flex: 1, height: 1, background: "var(--border-subtle)" };

  if (orientation === "vertical") {
    return (
      <span role="separator" aria-orientation="vertical" style={{
        display: "inline-block", alignSelf: "stretch", width: 1, minHeight: 16,
        background: "var(--border-subtle)", margin: `0 ${spacing}px`, ...style,
      }} />
    );
  }

  if (label) {
    return (
      <div role="separator" aria-orientation="horizontal" style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        margin: `${spacing}px 0`, ...style,
      }}>
        <span aria-hidden="true" style={line} />
        <span style={{
          flex: "none", fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)",
          fontWeight: "var(--fw-bold)", textTransform: "uppercase",
          letterSpacing: "var(--ls-caps)", color: "var(--text-muted)", whiteSpace: "nowrap",
        }}>{label}</span>
        <span aria-hidden="true" style={line} />
      </div>
    );
  }

  return (
    <div role="separator" aria-orientation="horizontal" style={{
      height: 1, width: "100%", background: "var(--border-subtle)",
      margin: `${spacing}px 0`, ...style,
    }} />
  );
}
