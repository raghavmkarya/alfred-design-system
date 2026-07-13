import React from "react";
import { Icon } from "../brand/Icon.jsx";

/**
 * Alfred AI — KpiCard
 * A single metric tile for the KPI Cockpit: label, big value, and a trend
 * delta. Direction drives the arrow glyph only; `valence` drives the color,
 * so a falling cost metric can read as the good news it is ("−8.0%" in
 * green with a down arrow). Valence defaults from direction (up = good).
 */
export function KpiCard({
  label,
  value,
  delta,                  // e.g. "+12.4%"
  direction = "up",       // "up" | "down" | "flat" — arrow glyph
  valence,                // "good" | "bad" | "neutral" — chip color; defaults from direction
  caption,                // e.g. "vs last 30 days"
  icon,                   // brand icon name (optional, quiet)
  iconRoot = "assets/icons",
  style = {},
}) {
  const v = valence || (direction === "up" ? "good" : direction === "down" ? "bad" : "neutral");
  const tone = {
    good: { color: "var(--text-on-tint-success)", bg: "var(--success-100)" },
    bad: { color: "var(--text-on-tint-danger)", bg: "var(--danger-100)" },
    neutral: { color: "var(--text-muted)", bg: "var(--gray-100)" },
  }[v] || { color: "var(--text-muted)", bg: "var(--gray-100)" };
  const arrow = { up: "trend-up", down: "trend-down", flat: "trend-flat" }[direction] || "trend-flat";
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)", padding: 22, boxShadow: "var(--shadow-sm)",
      display: "flex", flexDirection: "column", gap: 14, minWidth: 200, ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-muted)" }}>{label}</span>
        {icon && (
          <span style={{ width: 32, height: 32, borderRadius: "var(--radius-md)", background: "var(--gray-100)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={icon} size={16} color="var(--text-muted)" root={iconRoot} />
          </span>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", color: "var(--text-display)", lineHeight: 1 }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {delta != null && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px",
            borderRadius: "var(--radius-pill)", background: tone.bg, color: tone.color,
            fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
          }}>
            <Icon name={arrow} size={12} color={tone.color} root={iconRoot} />
            {delta}
          </span>
        )}
        {caption && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{caption}</span>}
      </div>
    </div>
  );
}
