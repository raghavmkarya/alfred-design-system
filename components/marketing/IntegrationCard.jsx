import React from "react";

/**
 * Alfred AI — IntegrationCard
 * Integration directory tile: an icon in a soft 12px tile, the integration
 * name, a one-line description in Alfred's voice, a self-contained live /
 * planned status pill, and a "Learn more" arrow link.
 */
export function IntegrationCard({
  icon = null,
  name,
  body,
  status = "live",
  href,
  onClick,
  style = {},
  ...rest
}) {
  const [linkHover, setLinkHover] = React.useState(false);

  const statuses = {
    live: { dot: "var(--success-500)", label: "Live" },
    planned: { dot: "var(--periwinkle-400)", label: "Planned" },
  };
  const st = statuses[status] || statuses.live;

  const defaultIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3v5" />
      <path d="M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
      <path d="M12 17v4" />
    </svg>
  );

  const arrow = (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      style={{
        flex: "none",
        transform: linkHover ? "translateX(3px)" : "translateX(0)",
        transition: "transform var(--dur-fast) var(--ease-standard)",
      }}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );

  const linkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    width: "fit-content",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--fw-bold)",
    lineHeight: 1,
    color: linkHover ? "var(--orange-600)" : "var(--text-link)",
    textDecoration: linkHover ? "underline" : "none",
    textUnderlineOffset: 3,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    borderRadius: "var(--radius-xs)",
    transition: "color var(--dur-fast) var(--ease-standard)",
  };
  const linkShared = {
    "aria-label": `Learn more about ${name}`,
    onMouseEnter: () => setLinkHover(true),
    onMouseLeave: () => setLinkHover(false),
    style: linkStyle,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 12,
        padding: "22px 24px",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, width: "100%" }}>
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            flex: "none",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-sunken)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-primary)",
          }}
        >
          {icon || defaultIcon}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-sunken)",
            fontSize: "var(--text-2xs)",
            fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            whiteSpace: "nowrap",
          }}
        >
          <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "var(--radius-circle)", background: st.dot, flex: "none" }} />
          {st.label}
        </span>
      </div>

      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-lg)",
          fontWeight: "var(--fw-bold)",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
          color: "var(--text-primary)",
        }}
      >
        {name}
      </h3>

      <p
        style={{
          margin: 0,
          fontSize: "var(--text-sm)",
          lineHeight: 1.55,
          color: "var(--text-secondary)",
        }}
      >
        {body}
      </p>

      {href ? (
        <a href={href} onClick={onClick} {...linkShared}>
          Learn more
          {arrow}
        </a>
      ) : (
        <button type="button" onClick={onClick} {...linkShared}>
          Learn more
          {arrow}
        </button>
      )}
    </div>
  );
}
