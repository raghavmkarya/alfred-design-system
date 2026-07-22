import React from "react";

/**
 * Alfred AI — ThinkingTrace
 * Alfred's agentic reasoning, made visible. A header ("I'm working through this…")
 * with a pulsing gradient mark, then a collapsible list of steps — each marked
 * done (check), active (a pulsing ring) or pending (a quiet dot) — connected by a
 * rail. Shows that the answer is being reasoned to, not guessed. Collapsed once the
 * answer lands. Pass `steps: [{ label, status, detail }]`.
 */
export function ThinkingTrace({
  steps = [],
  title,
  done = false,
  defaultOpen = true,
  elapsed,                  // e.g. "4s"
  style = {},
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const uid = React.useId().replace(/:/g, "");
  const pulse = `tt-pulse-${uid}`;

  const heading = title || (done ? "Here's how I worked it out" : "I'm working through this…");

  const STATUS = {
    done:    { color: "var(--success-500)" },
    active:  { color: "var(--accent)" },
    pending: { color: "var(--text-placeholder)" },
  };

  return (
    <section
      aria-label={heading}
      style={{
        fontFamily: "var(--font-sans)", width: "100%", boxSizing: "border-box",
        background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)", padding: "12px 14px", ...style,
      }}
    >
      <style>{`@keyframes ${pulse}{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.65;transform:scale(1.5)}}`}</style>

      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
        }}
      >
        <span aria-hidden="true" style={{
          position: "relative", width: 22, height: 22, flex: "none", borderRadius: "var(--radius-sm)",
          background: "var(--gradient-brand)", display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          {!done && (
            <span style={{
              position: "absolute", inset: -3, borderRadius: "var(--radius-md)",
              background: "var(--gradient-brand)", opacity: 0.4,
              animation: `${pulse} 1.6s var(--ease-standard) infinite`,
            }} />
          )}
          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" style={{ position: "relative" }}>
            <path d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z"
              fill="var(--text-on-brand)" />
          </svg>
        </span>

        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", flex: 1, minWidth: 0 }}>
          {heading}
        </span>

        {elapsed && (
          <span style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)" }}>
            {elapsed}
          </span>
        )}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
          strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{ flex: "none", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-base) var(--ease-standard)" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Steps */}
      {open && Array.isArray(steps) && steps.length > 0 && (
        <ol style={{ listStyle: "none", margin: "12px 0 2px", padding: 0, display: "flex", flexDirection: "column" }}>
          {steps.map((s, i) => {
            const st = STATUS[s.status] || STATUS.pending;
            const last = i === steps.length - 1;
            return (
              <li key={i} style={{ display: "flex", gap: 12, position: "relative", paddingBottom: last ? 0 : 14 }}>
                {/* Rail + node */}
                <span style={{ position: "relative", width: 16, flex: "none", display: "flex", justifyContent: "center" }}>
                  {!last && (
                    <span aria-hidden="true" style={{
                      position: "absolute", top: 18, bottom: -14, left: "50%", width: 2, marginLeft: -1,
                      background: "var(--border-default)",
                    }} />
                  )}
                  <span aria-hidden="true" style={{
                    position: "relative", width: 16, height: 16, borderRadius: "var(--radius-circle)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: s.status === "done" ? st.color : "var(--surface-card)",
                    border: `1.5px solid ${st.color}`, flex: "none",
                  }}>
                    {s.status === "done" ? (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 L9 17 L4 12" />
                      </svg>
                    ) : s.status === "active" ? (
                      <span style={{ position: "relative", width: 7, height: 7 }}>
                        <span style={{ position: "absolute", inset: -3, borderRadius: "var(--radius-circle)", background: st.color, opacity: 0.4, animation: `${pulse} 1.6s var(--ease-standard) infinite` }} />
                        <span style={{ position: "relative", display: "block", width: 7, height: 7, borderRadius: "var(--radius-circle)", background: st.color }} />
                      </span>
                    ) : (
                      <span style={{ width: 5, height: 5, borderRadius: "var(--radius-circle)", background: st.color }} />
                    )}
                  </span>
                </span>

                <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2, paddingTop: 0 }}>
                  <span style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: s.status === "active" ? "var(--fw-semibold)" : "var(--fw-medium)",
                    color: s.status === "pending" ? "var(--text-muted)" : "var(--text-primary)",
                  }}>
                    {s.label}
                  </span>
                  {s.detail && (
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>{s.detail}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
