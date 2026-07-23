import React from "react";

/**
 * Alfred AI — Stepper
 * Horizontal numbered progress for multi-step flows (onboarding, setup). Done
 * steps fill orange with a tick, the current step has an orange ring, upcoming
 * steps are muted. `steps`: [{label}], `current` is the active index (0-based).
 */
export function Stepper({ steps = [], current = 0, style = {} }) {
  return (
    <div role="list" aria-label="Progress" style={{ display: "flex", alignItems: "flex-start", width: "100%", ...style }}>
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        const ring = done || active ? "var(--border-focus)" : "var(--border-default)";
        const state = done ? "completed" : active ? "current step" : "upcoming";
        return (
          <React.Fragment key={i}>
            <div role="listitem" aria-current={active ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${s.label}, ${state}`}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: "none", width: 120 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? "var(--accent)" : active ? "var(--accent-soft)" : "transparent",
                border: `2px solid ${ring}`, color: done ? "var(--text-on-orange)" : active ? "var(--text-on-tint-brand)" : "var(--text-placeholder)",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)",
              }}>
                {done ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5" /></svg> : i + 1}
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)", color: active || done ? "var(--text-primary)" : "var(--text-muted)", textAlign: "center" }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < current ? "var(--accent)" : "var(--border-subtle)", marginTop: 15 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
