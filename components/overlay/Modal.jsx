import React from "react";

/**
 * Alfred AI — Modal
 * Centered dialog over a dimmed, blurred backdrop. Controlled via `open`;
 * renders nothing when closed. Clicking the backdrop or the × calls `onClose`.
 * Pass a `footer` (usually a Button row) for actions.
 */
export function Modal({ open, onClose, title, children, footer, size = "md", style = {} }) {
  if (!open) return null;
  const widths = { sm: 400, md: 520, lg: 680 };
  return (
    <div role="dialog" aria-modal="true" style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(2,2,30,0.42)", backdropFilter: "blur(2px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: widths[size] || 520, background: "var(--surface-card)", borderRadius: "var(--radius-3xl)", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border-subtle)", overflow: "hidden", ...style }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "24px 24px 0" }}>
          {title && <h3 style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-h3)", color: "var(--text-primary)", letterSpacing: "var(--ls-tight)", margin: 0 }}>{title}</h3>}
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--ink-400)", padding: 4, display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div style={{ padding: "12px 24px 24px", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{children}</div>
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}>{footer}</div>}
      </div>
    </div>
  );
}
