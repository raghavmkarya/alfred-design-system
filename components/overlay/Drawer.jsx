import React from "react";

/**
 * Alfred AI — Drawer
 * Side panel that slides in from the right (default) or left over a dimmed
 * backdrop. Controlled via `open`. Use for filters, detail views and settings
 * that shouldn't take the user off the page.
 */
export function Drawer({ open, onClose, side = "right", title, children, width = 380, style = {} }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(2,2,30,0.42)" }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, [side]: 0, width, maxWidth: "90vw",
        background: "var(--surface-card)", boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column",
        borderLeft: side === "right" ? "1px solid var(--border-subtle)" : "none",
        borderRight: side === "left" ? "1px solid var(--border-subtle)" : "none", ...style,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 22px", borderBottom: "1px solid var(--border-subtle)" }}>
          {title && <h3 style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-h4)", color: "var(--text-primary)", margin: 0 }}>{title}</h3>}
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--ink-400)", display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: 22, fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)" }}>{children}</div>
      </div>
    </div>
  );
}
