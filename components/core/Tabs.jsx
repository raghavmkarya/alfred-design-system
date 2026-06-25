import React from "react";

/**
 * Alfred AI — Tabs
 * Underline tab bar. The active tab is ink with a warm orange indicator.
 */
export function Tabs({ tabs = [], value, onChange, style = {} }) {
  const active = value ?? (tabs[0] && tabs[0].id);
  return (
    <div style={{ display: "flex", gap: 28, borderBottom: "1px solid var(--border-subtle)", ...style }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange && onChange(t.id)} style={{
            position: "relative", border: "none", background: "transparent", cursor: "pointer",
            padding: "0 0 14px", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
            fontWeight: on ? "var(--fw-bold)" : "var(--fw-medium)",
            color: on ? "var(--text-primary)" : "var(--text-muted)",
            transition: "color var(--dur-base) var(--ease-standard)",
          }}>
            {t.label}
            <span style={{
              position: "absolute", left: 0, right: 0, bottom: -1, height: 3, borderRadius: "3px 3px 0 0",
              background: on ? "var(--orange-500)" : "transparent",
              transition: "background var(--dur-base) var(--ease-standard)",
            }} />
          </button>
        );
      })}
    </div>
  );
}
