import React from "react";

/**
 * Alfred AI — Kbd
 * Keyboard key cap for shortcut hints — a sunken chip with a 2px bottom edge
 * for key depth. Pairs with CommandPalette footers and menu shortcuts.
 * Theme-aware via the surface and border tokens.
 */
export function Kbd({ children, size = "sm", style = {} }) {
  const s = size === "md"
    ? { font: "var(--text-xs)", height: 24, padding: "0 8px" }
    : { font: "var(--text-2xs)", height: 20, padding: "0 6px" };
  return (
    <kbd style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      height: s.height, minWidth: s.height, padding: s.padding,
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-default)", borderBottomWidth: 2,
      borderRadius: "var(--radius-xs)",
      fontFamily: "var(--font-sans)", fontSize: s.font, fontWeight: "var(--fw-semibold)",
      letterSpacing: "0.02em", lineHeight: 1, color: "var(--text-secondary)",
      whiteSpace: "nowrap",
      ...style,
    }}>
      {children}
    </kbd>
  );
}
