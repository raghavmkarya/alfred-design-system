import React from "react";

/**
 * Alfred AI — AgentStatus
 * The "Seek Alfred" reasoning panel: a query, a stack of reasoning steps that
 * progress (done → active → pending) with a pulsing active dot, and a footer.
 * Pass `activeStep` to control progress, or let it auto-advance.
 */
export function AgentStatus({
  query,
  steps = [],
  activeStep,
  autoplay = true,
  footer = "Thought for 1 minute…",
  style = {},
}) {
  const [idx, setIdx] = React.useState(0);
  const active = activeStep != null ? activeStep : idx;
  React.useEffect(() => {
    if (activeStep != null || !autoplay) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % (steps.length + 1)), 1100);
    return () => clearInterval(t);
  }, [autoplay, activeStep, steps.length]);

  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)", padding: 20, boxShadow: "var(--shadow-md)",
      display: "flex", flexDirection: "column", gap: 16, ...style,
    }}>
      {query && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
          background: "var(--surface-sunken)", borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--orange-500)", flex: "none" }} />
          {query}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {steps.map((s, i) => {
          const done = i < active, on = i === active;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: done || on ? 1 : 0.4, transition: "opacity var(--dur-base) var(--ease-standard)" }}>
              <span style={{
                width: 18, height: 18, flex: "none", borderRadius: "50%",
                background: done ? "var(--success-500)" : on ? "transparent" : "var(--border-default)",
                border: on ? "2px solid var(--orange-500)" : "none",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                animation: on ? "alfredPulse 1.1s var(--ease-standard) infinite" : "none",
              }}>
                {done && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </span>
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", letterSpacing: "0.04em", textTransform: "uppercase",
                fontWeight: "var(--fw-bold)", color: done ? "var(--text-secondary)" : on ? "var(--orange-600)" : "var(--text-muted)",
              }}>{s}</span>
            </div>
          );
        })}
      </div>
      {footer && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)", paddingTop: 14 }}>{footer}</div>}
      <style>{`@keyframes alfredPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,132,49,0.35)}50%{box-shadow:0 0 0 6px rgba(255,132,49,0)}}`}</style>
    </div>
  );
}
