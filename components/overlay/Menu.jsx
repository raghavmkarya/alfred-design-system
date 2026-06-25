import React from "react";

/**
 * Alfred AI — Menu
 * Vertical action list, typically rendered inside a Popover. `items`:
 * [{label, onClick, icon?, danger?}] or {divider:true}. Rows tint on hover and
 * danger items read in red.
 */
export function Menu({ items = [], style = {} }) {
  return (
    <div role="menu" style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 180, ...style }}>
      {items.map((it, i) => it.divider ? (
        <div key={i} style={{ height: 1, background: "var(--border-subtle)", margin: "4px 0" }} />
      ) : (
        <button
          key={i} role="menuitem" onClick={it.onClick}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-sunken)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", border: "none", background: "transparent", cursor: "pointer", padding: "9px 12px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: it.danger ? "var(--danger-500)" : "var(--text-primary)" }}
        >
          {it.icon && <span style={{ display: "inline-flex", color: it.danger ? "var(--danger-500)" : "var(--ink-500)" }}>{it.icon}</span>}
          {it.label}
        </button>
      ))}
    </div>
  );
}
