import React from "react";

/**
 * Alfred AI — SourceTrace
 * The "no black box" trust pattern: shows exactly which connected tools an
 * insight was grounded in, each with a live sync status. Renders a small
 * uppercase eyebrow, then either a wrapping row of chips (layout="row") or a
 * stacked list of rows (layout="list"). Self-contained — no asset deps.
 *
 * sources: [{ name, detail, status }]  status ∈ "live" | "syncing" | "stale"
 */
export function SourceTrace({
  sources = [],
  title = "Grounded in",
  layout = "row",        // "row" | "list"
  style = {},
}) {
  const uid = React.useId().replace(/:/g, "");
  const pulse = `st-pulse-${uid}`;

  const STATUS = {
    live:    { color: "var(--success-500)", label: "Live",    animate: false },
    syncing: { color: "var(--warning-500)", label: "Syncing", animate: true },
    stale:   { color: "var(--danger-500)",  label: "Stale",   animate: false },
  };
  const resolve = (s) => STATUS[s] || STATUS.live;

  const eyebrow = (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        style={{ flex: "none" }}>
        <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
        letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)",
      }}>{title}</span>
    </div>
  );

  return (
    <section aria-label={`${title} — ${sources.length} connected ${sources.length === 1 ? "source" : "sources"}`}
      style={{ fontFamily: "var(--font-sans)", ...style }}>
      <style>{`@keyframes ${pulse}{0%,100%{opacity:.18;transform:scale(1)}50%{opacity:.7;transform:scale(1.45)}}`}</style>
      {eyebrow}

      {sources.length === 0 ? (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          I haven't grounded this in any connected sources yet.
        </span>
      ) : layout === "list" ? (
        <div style={{
          display: "flex", flexDirection: "column",
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-xs)",
        }}>
          {sources.map((src, i) => {
            const s = resolve(src.status);
            return (
              <div key={`${src.name}-${i}`} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
                borderTop: i > 0 ? "1px solid var(--border-subtle)" : "none",
              }}>
                <StatusDot color={s.color} animate={s.animate} pulse={pulse} />
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                  fontWeight: "var(--fw-semibold)", color: "var(--text-primary)",
                }}>{src.name}</span>
                {src.detail && (
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)",
                  }}>{src.detail}</span>
                )}
                <span style={{
                  marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)",
                  fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
                  color: s.color,
                }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {sources.map((src, i) => {
            const s = resolve(src.status);
            return (
              <span key={`${src.name}-${i}`} title={`${src.name} — ${s.label}`} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 12px 6px 9px",
                background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-pill)",
              }}>
                <StatusDot color={s.color} animate={s.animate} pulse={pulse} />
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                  fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", lineHeight: 1,
                }}>{src.name}</span>
                {src.detail && (
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
                    color: "var(--text-muted)", lineHeight: 1,
                  }}>{src.detail}</span>
                )}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* Internal — a status dot with a soft halo (pulsing when actively syncing). */
function StatusDot({ color = "var(--success-500)", animate = false, pulse = "" }) {
  return (
    <span style={{
      position: "relative", width: 16, height: 16, flex: "none",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "var(--radius-circle)",
        background: color, opacity: 0.18,
        ...(animate && pulse ? { animation: `${pulse} 1.6s var(--ease-standard) infinite` } : {}),
      }} />
      <span style={{
        position: "relative", width: 8, height: 8,
        borderRadius: "var(--radius-circle)", background: color,
      }} />
    </span>
  );
}
