import React from "react";

/**
 * Alfred AI — Badge
 * Compact status pill. Semantic tones map to the brand's success/warning/
 * danger/info palette; `brand` uses orange, `neutral` is a quiet gray.
 */
export function Badge({ children, tone = "neutral", dot = false, style = {} }) {
  const tones = {
    neutral: { bg: "var(--gray-100)", fg: "var(--ink-600)", dotc: "var(--ink-400)" },
    brand: { bg: "var(--orange-50)", fg: "var(--orange-700)", dotc: "var(--orange-500)" },
    info: { bg: "var(--info-100)", fg: "var(--periwinkle-600)", dotc: "var(--periwinkle-500)" },
    success: { bg: "var(--success-100)", fg: "#1B7A52", dotc: "var(--success-500)" },
    warning: { bg: "var(--warning-100)", fg: "var(--orange-700)", dotc: "var(--warning-500)" },
    danger: { bg: "var(--danger-100)", fg: "#B5363A", dotc: "var(--danger-500)" },
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
