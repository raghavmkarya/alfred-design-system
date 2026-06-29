import React from "react";

/**
 * Alfred AI — ActivityTimeline
 * A vertical feed of what's happened — Alfred's actions, alerts and milestones — on a
 * connecting rail. Each item's node is coloured by kind (action → orange, alert → danger,
 * success → green, info → periwinkle, default → muted), with a time, title, optional detail
 * and an optional actor line. Broader than DecisionLog: any chronological event stream.
 */
export function ActivityTimeline({ items = [], style = {} }) {
  const KIND = {
    action: "var(--orange-500)",
    alert: "var(--danger-500)",
    success: "var(--success-500)",
    info: "var(--periwinkle-400)",
    neutral: "var(--ink-400)",
  };

  return (
    <ol aria-label="Activity" style={{ listStyle: "none", margin: 0, padding: 0, fontFamily: "var(--font-sans)", ...style }}>
      {items.map((it, i) => {
        const color = KIND[it.kind] || KIND.neutral;
        const last = i === items.length - 1;
        return (
          <li key={i} style={{ display: "flex", gap: 14, position: "relative", paddingBottom: last ? 0 : 20 }}>
            {/* Rail + node */}
            <span style={{ position: "relative", width: 18, flex: "none", display: "flex", justifyContent: "center" }}>
              {!last && (
                <span aria-hidden="true" style={{
                  position: "absolute", top: 20, bottom: -20, left: "50%", width: 2, marginLeft: -1, background: "var(--border-default)",
                }} />
              )}
              <span aria-hidden="true" style={{
                position: "relative", marginTop: 3, width: 14, height: 14, flex: "none", borderRadius: "var(--radius-circle)",
                background: "var(--surface-card)", border: `3px solid ${color}`, boxShadow: "var(--shadow-xs)",
              }} />
            </span>

            <span style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
              {it.time && (
                <span style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)" }}>{it.time}</span>
              )}
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", lineHeight: "var(--lh-snug)" }}>{it.title}</span>
              {it.detail && (
                <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{it.detail}</span>
              )}
              {it.actor && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 2, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                    <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                  {it.actor}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
