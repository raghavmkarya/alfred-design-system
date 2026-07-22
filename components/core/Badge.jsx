import React from "react";

/**
 * Alfred AI — Badge
 * Compact status pill. Semantic tones map to the brand's success/warning/
 * danger/info palette; `brand` uses orange, `neutral` is a quiet gray.
 */
export function Badge({ children, tone = "neutral", dot = false, style = {} }) {
  const tones = {
    neutral: { bg: "var(--surface-sunken)", fg: "var(--text-secondary)", dotc: "var(--text-placeholder)" },
    brand: { bg: "var(--accent-soft)", fg: "var(--text-on-tint-brand)", dotc: "var(--accent)" },
    info: { bg: "var(--info-100)", fg: "var(--text-on-tint-info)", dotc: "var(--info-500)" },
    success: { bg: "var(--success-100)", fg: "var(--text-on-tint-success)", dotc: "var(--success-500)" },
    warning: { bg: "var(--warning-100)", fg: "var(--text-on-tint-brand)", dotc: "var(--warning-500)" },
    danger: { bg: "var(--danger-100)", fg: "var(--text-on-tint-danger)", dotc: "var(--danger-500)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: "var(--radius-pill)",
      background: t.bg, color: t.fg,
      fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
      letterSpacing: "0.01em", lineHeight: 1.3, whiteSpace: "nowrap", ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.dotc, flex: "none" }} />}
      {children}
    </span>
  );
}
