import React from "react";

/**
 * Alfred AI — Chip
 * Compact filter / tag pill. Tonal by default, solid orange when `selected`,
 * optionally removable. Use for filters, applied facets and entity tags.
 */
export function Chip({ children, tone = "neutral", selected = false, onRemove, onClick, style = {} }) {
  const tones = {
    neutral: ["var(--gray-100)", "var(--ink-700)"],
    brand: ["var(--orange-50)", "var(--orange-600)"],
    info: ["var(--info-100)", "var(--periwinkle-600)"],
    success: ["var(--success-100)", "var(--success-500)"],
    warning: ["var(--warning-100)", "var(--orange-600)"],
    danger: ["var(--danger-100)", "var(--danger-500)"],
  };
  const [bg, fg] = selected ? ["var(--orange-500)", "#fff"] : tones[tone] || tones.neutral;
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, height: 28, padding: "0 12px",
        borderRadius: "var(--radius-pill)", background: bg, color: fg, width: "auto",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
        cursor: onClick ? "pointer" : "default", ...style,
      }}
    >
      {children}
      {onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} aria-label="Remove"
          style={{ border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", padding: 0, color: "inherit", opacity: 0.7 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </span>
  );
}
