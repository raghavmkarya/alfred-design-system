import React from "react";

/**
 * Alfred AI — EmptyState
 * Centered placeholder for empty lists, zero-result searches and not-yet-connected
 * surfaces. Soft orange glyph chip, a calm title, one line of guidance and an
 * optional action. Pass a custom `icon` node to override the default.
 */
export function EmptyState({ title, body, action, icon, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 24px", gap: 6, ...style }}>
      <div style={{ width: 56, height: 56, borderRadius: "var(--radius-xl)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, color: "var(--accent)" }}>
        {icon || <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-h4)", color: "var(--text-primary)", letterSpacing: "var(--ls-tight)" }}>{title}</div>
      {body && <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-muted)", maxWidth: 340, margin: "2px 0 0", lineHeight: "var(--lh-normal)" }}>{body}</p>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </div>
  );
}
