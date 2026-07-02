import React from "react";

/**
 * Alfred AI — OfferSwitch
 * Launch-offer toggle for live pricing. The whole pill is one real switch
 * (role="switch" aria-checked): click or Space toggles it, the border and
 * tag warm to orange while the offer is applied, and keyboard focus shows
 * the warm focus ring on the pill.
 */
export function OfferSwitch({
  checked = false,
  onChange,
  label = "50% launch offer applied",
  detail,
  disabled = false,
  style = {},
}) {
  const id = React.useId();
  const labelId = id + "-label";
  const detailId = id + "-detail";
  const [focusRing, setFocusRing] = React.useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelId}
      aria-describedby={detail ? detailId : undefined}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      onFocus={(e) => { let kb = true; try { kb = e.target.matches(":focus-visible"); } catch { /* older engines */ } setFocusRing(kb); }}
      onBlur={() => setFocusRing(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 14,
        margin: 0, padding: "10px 12px 10px 16px",
        background: "var(--surface-card)",
        border: "1px solid " + (checked ? "var(--orange-500)" : "var(--border-default)"),
        borderRadius: "var(--radius-pill)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
        boxShadow: focusRing ? "var(--shadow-focus)" : "none",
        transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        fontFamily: "var(--font-sans)", textAlign: "left", userSelect: "none",
        ...style,
      }}
    >
      <span aria-hidden="true" style={{
        display: "inline-flex", flex: "none",
        color: checked ? "var(--orange-500)" : "var(--text-muted)",
        transition: "color var(--dur-base) var(--ease-standard)",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
          <circle cx="7.5" cy="7.5" r="1.3" />
        </svg>
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span id={labelId} style={{
          fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)",
          color: "var(--text-primary)", lineHeight: 1.25,
        }}>{label}</span>
        {detail && (
          <span id={detailId} style={{
            fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.25,
          }}>{detail}</span>
        )}
      </span>
      <span aria-hidden="true" style={{
        width: 40, height: 24, flex: "none", padding: 3,
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--orange-500)" : "var(--border-default)",
        display: "inline-flex", alignItems: "center",
        transition: "background var(--dur-base) var(--ease-standard)",
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: "50%", background: "var(--white)",
          boxShadow: "var(--shadow-sm)", pointerEvents: "none",
          transform: checked ? "translateX(16px)" : "translateX(0)",
          transition: "transform var(--dur-base) var(--ease-emphasized)",
        }} />
      </span>
    </button>
  );
}
