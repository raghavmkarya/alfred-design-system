import React from "react";
import { Button } from "../core/Button.jsx";
import { Badge } from "../core/Badge.jsx";
import { ConfidenceMeter } from "../trust/ConfidenceMeter.jsx";

/**
 * Alfred AI — RecommendationCard
 * Alfred's recommendation in the draft → approve → act loop. A soft card with a
 * left priority rail (high = danger, opportunity = success, medium = orange), an
 * "I recommend" eyebrow + priority Badge, the title, reasoning and an
 * emphasised projected-impact line, an optional inline ConfidenceMeter, and a
 * footer of actions — defaulting to a primary "Approve" and a ghost "Dismiss".
 */
export function RecommendationCard({
  title = "Scale LinkedIn ABM +30%",
  reasoning = "Cost-per-lead fell 22% on the new ABM audience and is holding. Scaling while efficiency lasts captures pipeline before competitors.",
  impact = "+$30K pipeline this month",
  confidence = 78,
  priority = "opportunity",        // "high" | "opportunity" | "medium"
  actions = [],                    // [{ label, onClick, variant }]
  onApprove = () => {},
  onDismiss = () => {},
  style = {},
}) {
  const map = {
    high: { rail: "var(--danger-500)", badge: "danger", label: "High priority" },
    opportunity: { rail: "var(--success-500)", badge: "success", label: "Opportunity" },
    medium: { rail: "var(--orange-500)", badge: "warning", label: "Medium priority" },
  };
  const p = map[priority] || map.opportunity;

  const useActions = Array.isArray(actions) && actions.length > 0;
  const ghostFix = { color: "var(--text-secondary)" };

  const check = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 L9 17 L4 12" />
    </svg>
  );
  const cross = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  );

  return (
    <div
      role="group"
      aria-label={`Alfred recommendation: ${title}`}
      style={{
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: 460,
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-md)",
        padding: "20px 22px 20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {/* Priority rail */}
      <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: p.rail }} />

      {/* Header: Alfred mark + eyebrow, priority badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span
            aria-hidden="true"
            style={{
              width: 24, height: 24, flex: "none",
              borderRadius: "var(--radius-sm)",
              background: "var(--gradient-brand)",
              boxShadow: "var(--shadow-xs)",
              color: "var(--text-on-brand)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z" fill="currentColor" />
            </svg>
          </span>
          <span style={{
            fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
            color: "var(--text-muted)", whiteSpace: "nowrap",
          }}>
            I recommend
          </span>
        </span>
        <Badge tone={p.badge} dot>{p.label}</Badge>
      </div>

      {/* Body: title + reasoning */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "var(--text-h4)",
          fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)",
          lineHeight: "var(--lh-snug)", color: "var(--text-primary)",
        }}>
          {title}
        </div>
        {reasoning ? (
          <p style={{
            margin: 0, fontSize: "var(--text-sm)",
            lineHeight: "var(--lh-normal)", color: "var(--text-secondary)",
          }}>
            {reasoning}
          </p>
        ) : null}
      </div>

      {/* Projected impact */}
      {impact ? (
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 12px", borderRadius: "var(--radius-md)",
          background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
        }}>
          <span
            aria-hidden="true"
            style={{
              width: 30, height: 30, flex: "none",
              borderRadius: "var(--radius-sm)", background: "var(--accent-soft)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange-500)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 L17 7" />
              <path d="M7 7 H17 V17" />
            </svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
            <span style={{
              fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
              color: "var(--text-muted)",
            }}>
              Projected impact
            </span>
            <span style={{ fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>
              {impact}
            </span>
          </span>
        </div>
      ) : null}

      {/* Confidence */}
      {confidence != null ? (
        <ConfidenceMeter value={confidence} label="Alfred's confidence" size="sm" />
      ) : null}

      {/* Footer actions */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 2 }}>
        {useActions ? (
          actions.map((a, i) => {
            const v = a.variant || (i === 0 ? "primary" : "ghost");
            return (
              <Button
                key={a.label ? `${a.label}-${i}` : i}
                size="sm"
                variant={v}
                onClick={a.onClick || (() => {})}
                style={v === "ghost" ? ghostFix : undefined}
              >
                {a.label}
              </Button>
            );
          })
        ) : (
          <>
            <Button size="sm" variant="primary" onClick={onApprove} iconLeft={check}>
              Approve
            </Button>
            <Button size="sm" variant="ghost" onClick={onDismiss} iconLeft={cross} style={ghostFix}>
              Dismiss
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
