import React from "react";
import { Button } from "../core/Button.jsx";
import { Badge } from "../core/Badge.jsx";
import { Avatar } from "../core/Avatar.jsx";

/**
 * Alfred AI — ApprovalGate
 * The human-in-the-loop pause. Alfred has prepared an action and is holding for your
 * sign-off: an "Awaiting your approval" header with a pause mark and priority badge, the
 * action title and reasoning, a "what I'll do" checklist, and the approver. Footer offers
 * approve / modify / decline. Lighter than RecommendationCard — this is the gate, not the pitch.
 */
export function ApprovalGate({
  title = "Reallocate $18K from Search to Performance Max",
  summary = "Search is pacing 22% under efficiency target while Performance Max has headroom. Moving spend now protects this month's pipeline.",
  steps = [],
  priority = "medium",       // "high" | "medium" | "low"
  approver = "Priya Menon",
  requestedAt = "Alfred · just now",
  onApprove,
  onModify,
  onDecline,
  approveLabel = "Approve",
  modifyLabel = "Modify",
  declineLabel = "Decline",
  style = {},
}) {
  const pr = {
    high: { rail: "var(--danger-500)", badge: "danger", label: "High priority" },
    medium: { rail: "var(--periwinkle-400)", badge: "info", label: "Needs approval" },
    low: { rail: "var(--text-placeholder)", badge: "neutral", label: "Low priority" },
  }[priority] || { rail: "var(--periwinkle-400)", badge: "info", label: "Needs approval" };

  const ghostFix = { color: "var(--text-secondary)" };

  return (
    <section
      aria-label={`Approval required: ${title}`}
      style={{
        position: "relative", overflow: "hidden", boxSizing: "border-box", width: "100%", maxWidth: 460,
        background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-md)", padding: "20px 22px 20px 24px",
        display: "flex", flexDirection: "column", gap: 16, fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: pr.rail }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span aria-hidden="true" style={{
            width: 24, height: 24, flex: "none", borderRadius: "var(--radius-sm)", background: "var(--info-100)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--periwinkle-600)"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 5v14M16 5v14" />
            </svg>
          </span>
          <span style={{
            fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap",
          }}>
            Awaiting your approval
          </span>
        </span>
        <Badge tone={pr.badge} dot>{pr.label}</Badge>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)",
          letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-snug)", color: "var(--text-primary)",
        }}>
          {title}
        </div>
        {summary && (
          <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
            {summary}
          </p>
        )}
      </div>

      {/* What I'll do */}
      {Array.isArray(steps) && steps.length > 0 && (
        <div style={{
          display: "flex", flexDirection: "column", gap: 9, padding: "12px 14px",
          borderRadius: "var(--radius-md)", background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
        }}>
          <span style={{
            fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase", color: "var(--text-muted)",
          }}>If you approve, I'll</span>
          {steps.map((s, i) => (
            <span key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange-500)"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: 2 }}>
                <path d="M20 6 L9 17 L4 12" />
              </svg>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{s}</span>
            </span>
          ))}
        </div>
      )}

      {/* Approver */}
      {approver && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={approver} size={28} tone="ink" />
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            Routed to <span style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)" }}>{approver}</span> · {requestedAt}
          </span>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 2 }}>
        <Button size="sm" variant="primary" onClick={onApprove} iconLeft={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 L9 17 L4 12" /></svg>
        }>{approveLabel}</Button>
        <Button size="sm" variant="outline" onClick={onModify}>{modifyLabel}</Button>
        <Button size="sm" variant="ghost" onClick={onDecline} style={ghostFix} iconLeft={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 6 L18 18 M18 6 L6 18" /></svg>
        }>{declineLabel}</Button>
      </div>
    </section>
  );
}
