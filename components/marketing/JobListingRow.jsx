import React from "react";
import { usePress } from "../hooks/usePress.jsx";

/**
 * Alfred AI — JobListingRow
 * Careers job row for the About careers band: role title, a meta line
 * (team · location · type) and a circular arrow affordance. The whole row is
 * the target — it lifts on hover while the arrow fills orange. Renders as an
 * anchor when `href` is given, otherwise as a button row.
 */
export function JobListingRow({
  title,
  team,
  location,
  type = null,
  href,
  onClick,
  style = {},
  ...rest
}) {
  const { hover, focusVisible: focusRing, bind } = usePress({ focus: true });
  const active = hover || focusRing;

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    boxSizing: "border-box",
    margin: 0,
    padding: "20px 24px",
    background: "var(--surface-card)",
    border: "1px solid " + (active ? "var(--border-default)" : "var(--border-subtle)"),
    borderRadius: "var(--radius-2xl)",
    boxShadow: focusRing
      ? "var(--shadow-focus), var(--shadow-sm)"
      : hover
        ? "var(--shadow-md)"
        : "var(--shadow-sm)",
    transform: hover ? "translateY(-2px)" : "translateY(0)",
    fontFamily: "var(--font-sans)",
    textAlign: "left",
    textDecoration: "none",
    cursor: "pointer",
    outline: "none",
    transition:
      "transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)",
    ...style,
  };

  const sep = (
    <span aria-hidden="true" style={{ color: "var(--text-secondary)", opacity: 0.55 }}>
      ·
    </span>
  );

  const arrowTile = (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 38,
        height: 38,
        flex: "none",
        borderRadius: "var(--radius-circle)",
        border: "1px solid " + (active ? "var(--border-focus)" : "var(--border-subtle)"),
        background: active ? "var(--accent)" : "var(--surface-sunken)",
        color: active ? "var(--text-on-orange)" : "var(--text-secondary)",
        transition:
          "background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: active ? "translateX(2px)" : "translateX(0)",
          transition: "transform var(--dur-fast) var(--ease-standard)",
        }}
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </span>
  );

  const content = (
    <>
      <span style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <span
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: "var(--fw-bold)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)",
            lineHeight: 1.4,
            color: "var(--text-secondary)",
          }}
        >
          <span>{team}</span>
          {sep}
          <span>{location}</span>
          {type != null && type !== "" && (
            <>
              {sep}
              <span>{type}</span>
            </>
          )}
        </span>
      </span>
      {arrowTile}
    </>
  );

  const shared = {
    onClick,
    ...bind,
    style: rowStyle,
    ...rest,
  };

  return href ? (
    <a href={href} {...shared}>
      {content}
    </a>
  ) : (
    <button type="button" {...shared}>
      {content}
    </button>
  );
}
