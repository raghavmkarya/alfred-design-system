import React from "react";

/**
 * Alfred AI — GoalPacing
 * Are you on track to hit the number? A gradient attainment bar with an "on-pace"
 * marker showing where you should be by now, a verdict (ahead / on track / behind)
 * derived from attainment versus elapsed time, and Alfred's projected landing at the
 * current run-rate. Pass numeric `value`/`target`, the fraction of the period
 * `elapsed`, and an optional `format` for the numbers.
 */
export function GoalPacing({
  label = "Q3 pipeline",
  value = 1.84,
  target = 3.2,
  elapsed = 0.62,
  format = (n) => "$" + n.toFixed(2) + "M",
  period = "Q3 · 62% elapsed",
  projected,
  style = {},
}) {
  const pct = clamp((value / (target || 1)) * 100);
  const pace = clamp(elapsed * 100);
  const proj = projected != null ? projected : elapsed > 0 ? value / elapsed : value;

  const diff = pct - pace;
  const verdict =
    diff >= 4 ? { word: "Ahead of pace", color: "var(--success-500)", bg: "var(--success-100)" }
    : diff <= -4 ? { word: "Behind pace", color: "var(--danger-500)", bg: "var(--danger-100)" }
    : { word: "On track", color: "var(--text-on-tint-brand)", bg: "var(--accent-soft)" };

  return (
    <section
      aria-label={`${label} pacing`}
      style={{
        boxSizing: "border-box", width: "100%", maxWidth: 460,
        background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-sm)", padding: 22,
        display: "flex", flexDirection: "column", gap: 16, fontFamily: "var(--font-sans)", ...style,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-muted)" }}>{label}</span>
          <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 30, fontWeight: "var(--fw-semibold)",
              letterSpacing: "var(--ls-tight)", color: "var(--text-primary)", lineHeight: 1, fontVariantNumeric: "tabular-nums",
            }}>{format(value)}</span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>/ {format(target)}</span>
          </span>
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6, flex: "none", padding: "5px 11px",
          borderRadius: "var(--radius-pill)", background: verdict.bg, color: verdict.color,
          fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", lineHeight: 1,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "var(--radius-pill)", background: verdict.color }} />
          {verdict.word}
        </span>
      </div>

      {/* Track with on-pace marker */}
      <div style={{ position: "relative", paddingTop: 4 }}>
        <div style={{ position: "relative", height: 12, borderRadius: "var(--radius-pill)", background: "var(--border-default)", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0, width: `${pct}%`, borderRadius: "var(--radius-pill)",
            background: "var(--gradient-brand-reverse)",
          }} />
        </div>
        {/* On-pace marker */}
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, bottom: 0, left: `${pace}%`, transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <span style={{ width: 2, height: 20, background: "var(--text-primary)", borderRadius: "var(--radius-pill)", opacity: 0.55 }} />
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{period}</span>
        <span style={{ marginLeft: "auto", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
          {Math.round(pct)}% to goal · on-pace {Math.round(pace)}%
        </span>
      </div>

      {/* Projection */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: "var(--radius-md)",
        background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
      }}>
        <span aria-hidden="true" style={{
          width: 28, height: 28, flex: "none", borderRadius: "var(--radius-sm)", background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-on-tint-info)"
            strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 17l6-6 4 4 8-8" /><path d="M21 7v5h-5" />
          </svg>
        </span>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
          At this run-rate I project you'll land at{" "}
          <span style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{format(proj)}</span>.
        </span>
      </div>
    </section>
  );
}

function clamp(n) { return Math.max(0, Math.min(100, n)); }
