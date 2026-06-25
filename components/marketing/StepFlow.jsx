import React from "react";

/**
 * Alfred AI — StepFlow
 * The "Alfred works for you" process strip: numbered steps
 * (Learn → Nudges → Recommends → Acts) with a connecting rail.
 * Lays out horizontally; wraps responsively.
 */
export function StepFlow({ steps = [], style = {} }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 0, ...style }}>
      {steps.map((s, i) => (
        <div key={i} style={{ position: "relative", padding: "0 22px", display: "flex", flexDirection: "column", gap: 12 }}>
          {/* connector rail */}
          {i < steps.length - 1 && (
            <span style={{ position: "absolute", top: 19, left: "calc(50% + 24px)", right: "calc(-50% + 24px)", height: 2, background: "var(--border-default)" }} />
          )}
          <span style={{
            width: 40, height: 40, borderRadius: "var(--radius-md)", flex: "none", position: "relative", zIndex: 1,
            background: "var(--gradient-brand)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-lg)",
            boxShadow: "var(--shadow-brand)",
          }}>{i + 1}</span>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", marginBottom: 6, letterSpacing: "var(--ls-tight)" }}>{s.title}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{s.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
