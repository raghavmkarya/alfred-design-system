import React from "react";

/**
 * Alfred AI — Banner
 * Inline, tonal message bar with a leading icon and a colored rail. Use for
 * page-level info / success / warning / danger notices (a passive cousin of the
 * DecisionAlert). Optional action and dismiss.
 */
export function Banner({ tone = "info", title, children, action, onDismiss, style = {} }) {
  const tones = {
    info: ["var(--info-100)", "var(--periwinkle-600)"],
    success: ["var(--success-100)", "var(--success-500)"],
    warning: ["var(--warning-100)", "var(--orange-600)"],
    danger: ["var(--danger-100)", "var(--danger-500)"],
  };
  const [bg, fg] = tones[tone] || tones.info;
  return (
    <div role={tone === "danger" ? "alert" : "status"} aria-live={tone === "danger" ? "assertive" : "polite"} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: bg, borderRadius: "var(--radius-lg)", padding: "14px 16px", borderLeft: `3px solid ${fg}`, ...style }}>
      <span style={{ marginTop: 1, color: fg, flex: "none" }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{title}</div>}
        {children && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-body)", marginTop: title ? 2 : 0, lineHeight: "var(--lh-normal)" }}>{children}</div>}
        {action && <div style={{ marginTop: 10 }}>{action}</div>}
      </div>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" style={{ border: "none", background: "transparent", cursor: "pointer", color: fg, opacity: 0.7, padding: 0, display: "inline-flex" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}
