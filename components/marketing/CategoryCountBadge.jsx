import React from "react";

/**
 * Alfred AI — CategoryCountBadge
 * Zero-padded category count chip from the integrations index ("05", "02").
 * Mono tracked digits inside a 1px-border pill; optionally pairs the count
 * with its category label ("05 · Ad platforms").
 */
export function CategoryCountBadge({ count = 0, label, style = {}, ...rest }) {
  const digits = String(count).padStart(2, "0");
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: label ? "5px 14px" : "5px 12px",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-pill)",
        background: "transparent",
        color: "var(--text-muted)",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--fw-medium)",
          letterSpacing: "0.14em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {digits}
      </span>
      {label && (
        <React.Fragment>
          <span aria-hidden="true" style={{ opacity: 0.6 }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--fw-medium)",
              letterSpacing: "0.02em",
            }}
          >
            {label}
          </span>
        </React.Fragment>
      )}
    </span>
  );
}
