import React from "react";
import { Icon } from "../brand/Icon.jsx";

/**
 * Alfred AI — KpiCard
 * A single metric tile for the KPI Cockpit: label, big value, and a trend
 * delta coloured by direction (up = success, down = danger, flat = muted).
 */
export function KpiCard({
  label,
  value,
  delta,                  // e.g. "+12.4%"
  direction = "up",       // "up" | "down" | "flat"
  caption,                // e.g. "vs last 30 days"
  icon,                   // brand icon name (optional accent)
  iconRoot = "assets/icons",
  style = {},
}) {
  const dir = {
    up: { icon: "trend-up", color: "var(--success-500)", bg: "var(--success-100)" },
    down: { icon: "trend-down", color: "var(--danger-500)", bg: "var(--danger-100)" },
    flat: { icon: "trend-flat", color: "var(--text-muted)", bg: "var(--gray-100)" },
  }[direction];
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)", padding: 22, boxShadow: "var(--shadow-sm)",
      display: "flex", flexDirection: "column", gap: 14, minWidth: 200, ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-muted)" }}>{label}</span>
        {icon && (
          <span style={{ width: 32, height: 32, borderRadius: "var(--radius-md)", background: "var(--orange-50)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={icon} size={16} color="var(--orange-500)" root={iconRoot} />
          </span>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {delta != null && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px",
            borderRadius: "var(--radius-pill)", background: dir.bg, color: dir.color,
            fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
          }}>
            <Icon name={dir.icon} size={12} color={dir.color} root={iconRoot} />
            {delta}
          </span>
        )}
        {caption && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{caption}</span>}
      </div>
    </div>
  );
}
