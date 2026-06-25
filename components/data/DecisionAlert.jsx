import React from "react";
import { Icon } from "../brand/Icon.jsx";
import { Badge } from "../core/Badge.jsx";

/**
 * Alfred AI — DecisionAlert
 * A row in the Real-Time Decision Alerts hub: a priority-coloured rail, the
 * alert title + insight, a priority badge and an optional primary action.
 */
export function DecisionAlert({
  title,
  insight,
  priority = "medium",     // "high" | "medium" | "low" | "opportunity"
  time,
  action,                  // string label for the CTA (optional)
  onAction,
  iconRoot = "assets/icons",
  style = {},
}) {
  const map = {
    high: { rail: "var(--danger-500)", icon: "alert-warning", badge: "danger", label: "High" },
    medium: { rail: "var(--orange-500)", icon: "alert-warning", badge: "warning", label: "Medium" },
    low: { rail: "var(--periwinkle-400)", icon: "bookmark", badge: "info", label: "Low" },
    opportunity: { rail: "var(--success-500)", icon: "trend-up", badge: "success", label: "Opportunity" },
  };
  const p = map[priority] || map.medium;
  return (
    <div style={{
      display: "flex", gap: 14, alignItems: "flex-start",
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)", padding: "16px 18px 16px 14px",
      boxShadow: "var(--shadow-xs)", position: "relative", overflow: "hidden", ...style,
    }}>
      <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: p.rail }} />
      <span style={{
        width: 38, height: 38, borderRadius: "var(--radius-md)", flex: "none", marginLeft: 6,
        background: "var(--orange-50)", display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={p.icon} size={18} color={p.rail} root={iconRoot} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{title}</span>
          <Badge tone={p.badge} dot>{p.label}</Badge>
          {time && <span style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{time}</span>}
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{insight}</p>
        {action && (
          <button onClick={onAction} style={{
            marginTop: 12, border: "none", cursor: "pointer", background: "var(--orange-500)", color: "#fff",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)",
            padding: "8px 16px", borderRadius: "var(--radius-md)",
          }}>{action}</button>
        )}
      </div>
    </div>
  );
}
