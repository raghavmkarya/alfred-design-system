import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Alfred AI — BillingPlanCard
 * Current-plan card for billing settings: a "Current plan" eyebrow, the plan
 * name in Clash Display with the price + period on the right, a renewal +
 * payment-method meta line ("Renews Aug 2 · Visa ·· 4242"), simple used/limit
 * usage rows (no meters — the used figure tints orange at 80% of the
 * allowance and danger at the limit), and a Manage billing / Upgrade plan
 * action pair.
 */
export function BillingPlanCard({
  plan,
  price,
  period = "per month",
  renewal = "",
  usage = [],
  onManage,
  onUpgrade,
  style = {},
  ...rest
}) {
  const rows = Array.isArray(usage) ? usage : [];
  const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : String(n == null ? "" : n));

  const cardIcon = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M2.5 10h19" />
      <path d="M6.5 15h4" />
    </svg>
  );

  const divider = <div aria-hidden="true" style={{ height: 1, background: "var(--border-subtle)", flex: "none" }} />;

  return (
    <div
      role="group"
      aria-label={`${plan} plan`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxSizing: "border-box",
        width: "100%",
        maxWidth: 440,
        padding: 24,
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {/* Header — eyebrow + plan name on the left, price + period on the right */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
          <span
            style={{
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-caps)",
              textTransform: "uppercase",
              lineHeight: 1,
              color: "var(--text-muted)",
            }}
          >
            Current plan
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
              fontWeight: "var(--fw-semibold)",
              letterSpacing: "var(--ls-tight)",
              lineHeight: "var(--lh-snug)",
              color: "var(--text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {plan}
          </span>
        </span>

        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 5, flex: "none", paddingTop: 14 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h4)",
              fontWeight: "var(--fw-semibold)",
              letterSpacing: "var(--ls-tight)",
              lineHeight: "var(--lh-snug)",
              color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {price}
          </span>
          {period ? (
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{period}</span>
          ) : null}
        </span>
      </div>

      {/* Renewal + payment method meta line */}
      {renewal ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: -6, color: "var(--text-secondary)" }}>
          {cardIcon}
          <span style={{ fontSize: "var(--text-sm)", lineHeight: 1.4, minWidth: 0 }}>{renewal}</span>
        </div>
      ) : null}

      {/* Usage — simple used / limit rows, no meters */}
      {rows.length > 0 ? (
        <React.Fragment>
          {divider}
          <dl aria-label="Usage this cycle" style={{ margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {rows.map((row, i) => {
              const used = typeof row.used === "number" ? row.used : 0;
              const limit = typeof row.limit === "number" ? row.limit : 0;
              const ratio = limit > 0 ? used / limit : 0;
              const usedColor = ratio >= 1 ? "var(--danger-500)" : ratio >= 0.8 ? "var(--accent-hover)" : "var(--text-primary)";
              return (
                <div key={row.label || i} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <dt
                    style={{
                      margin: 0,
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      minWidth: 0,
                    }}
                  >
                    {row.label}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      flex: "none",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--fw-medium)",
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1.4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ color: usedColor }}>{fmt(row.used)}</span>
                    <span style={{ color: "var(--text-muted)" }}> / {fmt(row.limit)}</span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </React.Fragment>
      ) : null}

      {divider}

      {/* Actions — quiet manage, primary upgrade */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Button size="sm" variant="outline" onClick={onManage}>
          Manage billing
        </Button>
        <Button size="sm" variant="primary" onClick={onUpgrade}>
          Upgrade plan
        </Button>
      </div>
    </div>
  );
}
