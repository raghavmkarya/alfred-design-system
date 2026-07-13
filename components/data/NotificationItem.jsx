import React from "react";

/**
 * Alfred AI — NotificationItem
 * A single row in Alfred's notification inbox: a tone-coloured icon, a title and body in
 * his voice, a timestamp, an unread dot, and optional inline actions. Set `unread` to mark
 * the row. Compose a list of these for a notification center or drawer.
 */
export function NotificationItem({
  title = "I've flagged a budget risk",
  body,
  time = "2m ago",
  tone = "brand",            // "brand" | "info" | "success" | "warning" | "danger"
  icon,                      // optional custom SVG node (defaults to a tone glyph)
  unread = false,
  actions = [],
  onClick,
  style = {},
}) {
  const T = {
    brand: { color: "var(--orange-500)", bg: "var(--accent-soft)" },
    info: { color: "var(--periwinkle-500)", bg: "var(--info-100)" },
    success: { color: "var(--success-500)", bg: "var(--success-100)" },
    warning: { color: "var(--warning-500)", bg: "var(--warning-100)" },
    danger: { color: "var(--danger-500)", bg: "var(--danger-100)" },
  }[tone] || { color: "var(--orange-500)", bg: "var(--accent-soft)" };

  const defaultGlyph = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );

  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      style={{
        display: "flex", gap: 12, padding: "14px 16px", boxSizing: "border-box", width: "100%",
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--border-subtle)", cursor: onClick ? "pointer" : "default",
        fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <span aria-hidden="true" style={{
        width: 36, height: 36, flex: "none", borderRadius: "var(--radius-md)", background: T.bg,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon || defaultGlyph}
      </span>

      <span style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ flex: 1, minWidth: 0, fontSize: "var(--text-sm)", fontWeight: unread ? "var(--fw-bold)" : "var(--fw-medium)", color: unread ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: "var(--lh-snug)" }}>{title}</span>
          <span style={{ flex: "none", fontSize: "var(--text-2xs)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{time}</span>
        </span>
        {body && <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{body}</span>}

        {Array.isArray(actions) && actions.length > 0 && (
          <span style={{ display: "inline-flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
            {actions.map((a, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); a.onClick && a.onClick(); }}
                style={{
                  height: 30, padding: "0 12px", borderRadius: "var(--radius-md)", cursor: "pointer",
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)",
                  border: i === 0 ? "1px solid var(--border-subtle)" : "1px solid var(--border-default)",
                  background: i === 0 ? "var(--orange-50)" : "transparent",
                  color: i === 0 ? "var(--text-on-tint-brand)" : "var(--text-secondary)",
                }}
              >
                {a.label}
              </button>
            ))}
          </span>
        )}
      </span>

      {unread && <span aria-label="Unread" style={{ width: 9, height: 9, flex: "none", marginTop: 4, borderRadius: "var(--radius-circle)", background: "var(--orange-500)" }} />}
    </div>
  );
}
