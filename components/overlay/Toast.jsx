import React from "react";

/**
 * Alfred AI — Toast
 * A single transient notification card with a tonal status dot. Render one (or
 * stack several, newest on top, fixed bottom-right) to confirm actions or relay
 * a decision alert. Pass `onClose` for a dismiss ×.
 */
export function Toast({ tone = "info", title, children, onClose, style = {} }) {
  const tones = { info: "var(--periwinkle-500)", success: "var(--success-500)", warning: "var(--orange-500)", danger: "var(--danger-500)" };
  const fg = tones[tone] || tones.info;
  const assertive = tone === "danger";
  return (
    <div role={assertive ? "alert" : "status"} aria-live={assertive ? "assertive" : "polite"} aria-atomic="true" style={{ display: "flex", alignItems: "flex-start", gap: 12, width: 360, maxWidth: "90vw", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", padding: "14px 16px", ...style }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: fg, marginTop: 6, flex: "none" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{title}</div>}
        {children && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: title ? 2 : 0 }}>{children}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-placeholder)", display: "inline-flex", padding: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}
