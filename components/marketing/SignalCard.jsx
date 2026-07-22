import React from "react";

/**
 * Alfred AI — SignalCard
 * The site's recurring "signal" tile: an uppercase status eyebrow with a
 * colored dot, a bold plain-language statement, and a muted trace/footnote.
 * Tones map to the decision lifecycle (signal · truth · early · action).
 */
export function SignalCard({ label, statement, trace, tone = "signal", style = {} }) {
  const tones = {
    truth: "var(--info-500)",     // ONE SOURCE OF TRUTH
    signal: "var(--accent)",         // SIGNAL DETECTED
    early: "var(--warning-500)",         // CAUGHT EARLY
    action: "var(--success-500)",        // ALIGNED ACTION
  };
  const c = tones[tone] || tones.signal;
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)", padding: "18px 20px", boxShadow: "var(--shadow-sm)",
      display: "flex", flexDirection: "column", gap: 10, ...style,
    }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, flex: "none" }} />
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
          letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: c,
        }}>{label}</span>
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", lineHeight: 1.3 }}>{statement}</span>
      {trace && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{trace}</span>}
    </div>
  );
}
