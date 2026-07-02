import React from "react";
import { Modal } from "../overlay/Modal.jsx";
import { Button } from "../core/Button.jsx";

/**
 * Alfred AI — UpgradeModal
 * The in-app paywall moment. A Modal (which owns the focus trap, Escape and
 * backdrop) filled with structured upgrade content: Alfred explains the limit
 * in first person, a compact 2–3 column plan mini-compare shows the jump, and
 * the footer offers a primary upgrade CTA with a quiet escape. Controlled via
 * `open`/`onClose`; an optional `trigger` node (e.g. the locked control)
 * renders inline before the dialog.
 */
export function UpgradeModal({
  open,
  onClose,
  trigger = null,
  title = "You've used all 3 seats",
  body = "I've been briefing all 3 of your seats, and two more people on your team asked me questions this week. On Growth I can cover everyone — 10 seats, unlimited data sources, and approval routing built in.",
  plans = [
    { name: "Starter", price: "$99/mo", features: ["3 seats", "2 data sources", "Weekly briefings"] },
    { name: "Growth", price: "$299/mo", highlight: true, features: ["10 seats", "Unlimited data sources", "Daily briefings + approvals"] },
  ],
  cta = { label: "Upgrade to Growth" },
  secondaryCta = { label: "Not now" },
  style = {},
}) {
  const list = Array.isArray(plans) ? plans : [];
  const cols = Math.max(1, Math.min(list.length, 3));

  const check = (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 2 }}>
      <path d="M2.8 8.6l3.2 3.2 7.2-7.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const renderPrice = (price) => {
    if (typeof price !== "string" || price.indexOf("/") === -1) {
      return (
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-snug)", color: "var(--text-primary)" }}>{price}</span>
      );
    }
    const at = price.indexOf("/");
    return (
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: 2 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-snug)", color: "var(--text-primary)" }}>{price.slice(0, at)}</span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{price.slice(at)}</span>
      </span>
    );
  };

  const footer = (
    <React.Fragment>
      {secondaryCta && (
        <Button variant="ghost" onClick={secondaryCta.onClick || onClose} style={{ color: "var(--text-secondary)" }}>
          {secondaryCta.label}
        </Button>
      )}
      {cta && (
        <Button variant="primary" onClick={cta.onClick}>
          {cta.label}
        </Button>
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {trigger}
      <Modal open={open} onClose={onClose} title={title} size={cols >= 3 ? "lg" : "md"} footer={footer} style={style}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {body && <p style={{ margin: 0 }}>{body}</p>}

          {list.length > 0 && (
            <ul
              role="list"
              aria-label="Compare plans"
              style={{
                listStyle: "none", margin: 0, padding: 0,
                display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 12,
              }}
            >
              {list.map((plan, i) => {
                const hi = !!plan.highlight;
                return (
                  <li
                    key={plan.name || i}
                    style={{
                      boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10,
                      padding: "16px 16px 14px", borderRadius: "var(--radius-lg)",
                      background: hi ? "var(--accent-soft)" : "var(--surface-sunken)",
                      border: hi ? "1px solid var(--orange-500)" : "1px solid var(--border-subtle)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{
                        fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--fw-semibold)",
                        letterSpacing: "var(--ls-tight)", color: "var(--text-primary)", minWidth: 0,
                      }}>
                        {plan.name}
                      </span>
                      {hi && (
                        <span style={{
                          flex: "none", display: "inline-flex", alignItems: "center", height: 20, padding: "0 9px",
                          borderRadius: "var(--radius-pill)", background: "var(--orange-500)", color: "var(--text-on-brand)",
                          fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
                          textTransform: "uppercase", whiteSpace: "nowrap",
                        }}>
                          Recommended
                        </span>
                      )}
                    </div>

                    {plan.price != null && renderPrice(plan.price)}

                    {Array.isArray(plan.features) && plan.features.length > 0 && (
                      <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                        {plan.features.map((feature, j) => (
                          <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "var(--text-xs)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
                            <span style={{ color: "var(--orange-500)", display: "inline-flex", flex: "none" }}>{check}</span>
                            <span style={{ minWidth: 0 }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
}
