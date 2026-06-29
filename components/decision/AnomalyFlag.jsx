import React from "react";

/**
 * Alfred AI — AnomalyFlag
 * A small "Alfred flagged this" marker to pin on any metric, row or chart. A pulsing
 * dot draws the eye; the tone grades the severity (watch → periwinkle, anomaly → orange,
 * critical → danger). Use `inline` for a compact pill beside a value, or the default
 * block row with an optional detail line and trailing value.
 */
export function AnomalyFlag({
  label = "Alfred flagged this",
  tone = "anomaly",          // "watch" | "anomaly" | "critical"
  detail,
  value,
  inline = false,
  style = {},
}) {
  const uid = React.useId().replace(/:/g, "");
  const pulse = `af-pulse-${uid}`;

  const t = {
    watch: { color: "var(--periwinkle-500)", bg: "var(--info-100)" },
    anomaly: { color: "var(--orange-500)", bg: "var(--accent-soft)" },
    critical: { color: "var(--danger-500)", bg: "var(--danger-100)" },
  }[tone] || { color: "var(--orange-500)", bg: "var(--accent-soft)" };

  const dot = (
    <span aria-hidden="true" style={{ position: "relative", width: 10, height: 10, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ position: "absolute", inset: -3, borderRadius: "var(--radius-circle)", background: t.color, opacity: 0.35, animation: `${pulse} 1.6s var(--ease-standard) infinite` }} />
      <span style={{ position: "relative", width: 7, height: 7, borderRadius: "var(--radius-circle)", background: t.color }} />
    </span>
  );

  const keyframes = <style>{`@keyframes ${pulse}{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.6;transform:scale(1.55)}}`}</style>;

  if (inline) {
    return (
      <span
        role="status"
        style={{
          display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 11px 4px 9px",
          borderRadius: "var(--radius-pill)", background: t.bg, color: t.color,
          fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
          lineHeight: 1, whiteSpace: "nowrap", ...style,
        }}
      >
        {keyframes}{dot}{label}
      </span>
    );
  }

  return (
    <div
      role="status"
      style={{
        display: "flex", alignItems: "center", gap: 12, boxSizing: "border-box", width: "100%",
        padding: "12px 14px", borderRadius: "var(--radius-md)", background: t.bg,
        border: `1px solid ${t.color}`, fontFamily: "var(--font-sans)", ...style,
      }}
    >
      {keyframes}
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, flex: "none" }}>{dot}</span>
      <span style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{label}</span>
        {detail && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{detail}</span>}
      </span>
      {value != null && (
        <span style={{ flex: "none", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: t.color, fontVariantNumeric: "tabular-nums" }}>{value}</span>
      )}
    </div>
  );
}
