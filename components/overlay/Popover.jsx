import React from "react";

/**
 * Alfred AI — Popover
 * Floating panel anchored to a trigger. Controlled via `open` / `onOpenChange`.
 * Use it to host a Menu, a small form, or contextual detail. For plain text
 * hints use Tooltip instead.
 */
export function Popover({ open, onOpenChange, trigger, children, placement = "bottom", style = {} }) {
  const pos = {
    bottom: { top: "100%", left: 0, marginTop: 8 },
    "bottom-end": { top: "100%", right: 0, marginTop: 8 },
    top: { bottom: "100%", left: 0, marginBottom: 8 },
  };
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <span onClick={() => onOpenChange && onOpenChange(!open)}>{trigger}</span>
      {open && (
        <div role="dialog" style={{
          position: "absolute", zIndex: 60, minWidth: 200, background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)", padding: 8, ...(pos[placement] || pos.bottom), ...style,
        }}>{children}</div>
      )}
    </span>
  );
}
