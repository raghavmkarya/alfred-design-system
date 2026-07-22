import React from "react";

/**
 * Alfred AI — Callout
 * Inline structured aside for Alfred's observations and contextual notes — a
 * quieter, non-dismissible cousin of the Banner. A 3px accent bar, a tonal
 * translucent fill that reads on both themes, an optional icon and a single
 * text action. `insight` (periwinkle) is Alfred's own voice.
 */
export function Callout({
  tone = "insight",
  title,
  children,
  icon,
  action,
  compact = false,
  style = {},
}) {
  const tones = {
    insight: { accent: "var(--text-on-tint-info)", bg: "rgba(167,167,252,0.14)", actionColor: "var(--text-on-tint-info)" },
    success: { accent: "var(--success-500)", bg: "rgba(47,182,124,0.14)", actionColor: "var(--success-500)" },
    warning: { accent: "var(--text-on-tint-brand)", bg: "rgba(255,132,49,0.14)", actionColor: "var(--text-on-tint-brand)" },
    danger: { accent: "var(--danger-500)", bg: "rgba(229,72,77,0.12)", actionColor: "var(--danger-500)" },
    neutral: { accent: "var(--text-muted)", bg: "var(--surface-sunken)", actionColor: "var(--text-primary)" },
  };
  const t = tones[tone] || tones.insight;
  const [hoverAction, setHoverAction] = React.useState(false);

  const glyphs = {
    insight: <path d="M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6-5.6-1.9 5.6-1.9L12 3z" />,
    success: <><circle cx="12" cy="12" r="9" /><path d="M8.5 12.2l2.4 2.4 4.6-5" /></>,
    warning: <><path d="M12 4l9 15H3l9-15z" /><path d="M12 10v4M12 17h.01" /></>,
    danger: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5h.01" /></>,
    neutral: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  };
  const glyphSize = compact ? 14 : 16;
  const defaultIcon = (
    <svg width={glyphSize} height={glyphSize} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {glyphs[tone] || glyphs.insight}
    </svg>
  );

  return (
    <div
      role="note"
      aria-label={title || undefined}
      style={{
        display: "flex", alignItems: "flex-start", gap: compact ? 8 : 12,
        padding: compact ? "10px 12px" : "14px 16px",
        background: t.bg, borderRadius: "var(--radius-lg)",
        borderLeft: `3px solid ${t.accent}`,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      <span style={{ marginTop: 1, color: t.accent, flex: "none", display: "inline-flex" }}>
        {icon || defaultIcon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{title}</div>
        )}
        {children && (
          <div style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: title ? 2 : 0, lineHeight: "var(--lh-normal)" }}>{children}</div>
        )}
        {action && action.label && (
          <button
            type="button"
            onClick={action.onClick}
            onMouseEnter={() => setHoverAction(true)}
            onMouseLeave={() => setHoverAction(false)}
            style={{
              marginTop: compact ? 6 : 10, padding: 0, border: "none", background: "transparent",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)",
              color: t.actionColor, cursor: "pointer",
              textDecoration: "underline", textUnderlineOffset: 3,
              textDecorationColor: hoverAction ? "currentColor" : "transparent",
              transition: "text-decoration-color var(--dur-fast) var(--ease-standard)",
            }}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
