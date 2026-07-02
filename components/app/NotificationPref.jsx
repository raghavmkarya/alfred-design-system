import React from "react";
import { Switch } from "../core/Switch.jsx";

/**
 * Alfred AI — NotificationPref
 * Per-agent notification preference row for the settings surface: agent name
 * and a one-line description on the left, three channel switches (email /
 * Slack / in-app) in a labeled group on the right. Rows stack flush in a
 * settings list — each closes with a subtle bottom border.
 *
 * Each switch carries a visually hidden accessible name ("<agent> via email",
 * "<agent> via Slack", "<agent> in-app") so screen readers announce exactly
 * which agent-channel pair is toggling, while the visible caption above each
 * track stays short.
 */
export function NotificationPref({
  agent,
  description,
  channels = {},
  onChange,
  style = {},
  ...rest
}) {
  // Visually hidden but announced — carries the full per-switch label.
  const hidden = {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    border: 0,
  };

  const cells = [
    { key: "email", caption: "Email", name: `${agent} via email` },
    { key: "slack", caption: "Slack", name: `${agent} via Slack` },
    { key: "inApp", caption: "In-app", name: `${agent} in-app` },
  ];

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "14px 16px",
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--border-subtle)",
        ...style,
      }}
      {...rest}
    >
      {/* Agent identity */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-bold)",
            color: "var(--text-primary)",
            lineHeight: "var(--lh-snug)",
          }}
        >
          {agent}
        </div>
        {description && (
          <p
            style={{
              margin: "3px 0 0",
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              lineHeight: "var(--lh-normal)",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Channel switches */}
      <div
        role="group"
        aria-label={`${agent} notification channels`}
        style={{ display: "flex", alignItems: "flex-start", gap: 18, flex: "none" }}
      >
        {cells.map((c) => (
          <div
            key={c.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              minWidth: 48,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize: "var(--text-2xs)",
                fontWeight: "var(--fw-semibold)",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {c.caption}
            </span>
            {/* gap: 0 keeps the zero-width hidden label from offsetting the track */}
            <Switch
              checked={!!channels[c.key]}
              onChange={(value) => onChange && onChange(c.key, value)}
              label={<span style={hidden}>{c.name}</span>}
              style={{ gap: 0 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
