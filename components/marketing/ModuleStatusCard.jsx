import React from "react";

/**
 * Alfred AI — ModuleStatusCard
 * Roadmap tile for an Alfred module: a status pill (live = success,
 * in development = orange, planned = neutral), the module name in the
 * display face, an optional slogan, agent chips, and an arrow CTA.
 */
export function ModuleStatusCard({
  module = "Alfred for Marketing",
  slogan,
  status = "live",
  agents = [],
  cta,
  href,
  onClick,
  style = {},
  ...rest
}) {
  const [linkHover, setLinkHover] = React.useState(false);

  const STATUSES = {
    live: {
      label: "Live",
      dot: "var(--success-500)",
      color: "var(--success-500)",
      bg: "color-mix(in srgb, var(--success-500) 10%, transparent)",
      border: "color-mix(in srgb, var(--success-500) 30%, transparent)",
    },
    "in-development": {
      label: "In development",
      dot: "var(--accent)",
      color: "var(--accent-hover)",
      bg: "var(--accent-soft)",
      border: "color-mix(in srgb, var(--accent) 30%, transparent)",
    },
    planned: {
      label: "Planned",
      dot: "var(--text-muted)",
      color: "var(--text-secondary)",
      bg: "var(--surface-sunken)",
      border: "var(--border-subtle)",
    },
  };
  const st = STATUSES[status] || STATUSES.live;

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
    marginTop: 4,
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--fw-bold)",
    lineHeight: 1,
    color: linkHover ? "var(--accent-hover)" : "var(--text-link)",
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
    "aria-label": `${cta} — ${module}`,
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
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          borderRadius: "var(--radius-pill)",
          border: `1px solid ${st.border}`,
          background: st.bg,
          fontSize: "var(--text-2xs)",
          fontWeight: "var(--fw-bold)",
          letterSpacing: "var(--ls-caps)",
          textTransform: "uppercase",
          color: st.color,
          whiteSpace: "nowrap",
        }}
      >
        <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "var(--radius-circle)", background: st.dot, flex: "none" }} />
        {st.label}
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h4)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: "var(--ls-tight)",
            lineHeight: "var(--lh-snug)",
            color: "var(--text-primary)",
          }}
        >
          {module}
        </h3>
        {slogan && (
          <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
            {slogan}
          </p>
        )}
      </div>

      {agents.length > 0 && (
        <ul
          role="list"
          aria-label={`${module} agents`}
          style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {agents.map((a, i) => (
            <li
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 11px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--border-subtle)",
                background: "var(--surface-sunken)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--fw-medium)",
                lineHeight: 1,
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              {a}
            </li>
          ))}
        </ul>
      )}

      {cta && (href ? (
        <a href={href} onClick={onClick} {...linkShared}>
          {cta}
          {arrow}
        </a>
      ) : (
        <button type="button" onClick={onClick} {...linkShared}>
          {cta}
          {arrow}
        </button>
      ))}
    </div>
  );
}
