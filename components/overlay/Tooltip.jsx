import React from "react";

/**
 * Alfred AI — Tooltip
 * Wraps a trigger and reveals a small ink label on hover/focus. Use for terse
 * clarifications (what a KPI means, an icon-button's action). Keep labels to a
 * few words — anything longer belongs in a Popover.
 */
export function Tooltip({ label, placement = "top", children, style = {} }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
  };
  return (
    <span
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span role="tooltip" style={{
          position: "absolute", zIndex: 60, whiteSpace: "nowrap", background: "var(--ink-900)", color: "#fff",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-medium)",
          padding: "6px 10px", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-md)", pointerEvents: "none",
          ...pos[placement],
        }}>{label}</span>
      )}
    </span>
  );
}
