import React from "react";

/**
 * Alfred AI — PriceCard
 * Pricing tier card from the live site: tier name in Clash Display, a big
 * price with an optional struck-through anchor price, a badge pill over the
 * top edge, a checklist of features with line-style SVG checks, and a
 * full-width CTA. `highlighted` adds the featured-tier orange treatment
 * (1px orange border + soft orange glow + solid orange CTA).
 */
export function PriceCard({
  name,
  price,
  anchorPrice,
  currency = "$",
  period = "/month",
  badge,
  features = [],
  cta,
  highlighted = false,
  footnote,
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);

  const onCtaFocus = (e) => {
    try { setFocusRing(e.target.matches(":focus-visible")); } catch (err) { setFocusRing(true); }
  };

  const check = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.8 8.6l3.2 3.2 7.2-7.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ctaStyle = {
    width: "100%",
    height: 46,
    marginTop: 24,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    fontWeight: "var(--fw-bold)",
    letterSpacing: "0.01em",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
    transform: press ? "scale(0.98)" : "scale(1)",
    ...(highlighted
      ? {
          background: hover ? "var(--orange-600)" : "var(--orange-500)",
          color: "var(--text-on-brand)",
          border: "1px solid transparent",
          boxShadow: focusRing ? "var(--shadow-focus)" : hover ? "var(--shadow-brand)" : "none",
        }
      : {
          background: "transparent",
          color: hover ? "var(--orange-500)" : "var(--text-primary)",
          border: hover ? "1px solid var(--orange-500)" : "1px solid var(--border-default)",
          boxShadow: focusRing ? "var(--shadow-focus)" : "none",
        }),
  };

  return (
    <section
      aria-label={name ? name + " plan" : "Pricing plan"}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-card)",
        border: highlighted ? "1px solid var(--orange-500)" : "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: highlighted ? "var(--shadow-brand)" : "var(--shadow-sm)",
        padding: "32px 28px 28px",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            display: "inline-flex",
            alignItems: "center",
            height: 26,
            padding: "0 14px",
            borderRadius: "var(--radius-pill)",
            background: "var(--orange-500)",
            color: "var(--text-on-brand)",
            fontSize: "var(--text-2xs)",
            fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      )}

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
        {name}
      </h3>

      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        {anchorPrice != null && (
          <s
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h4)",
              fontWeight: "var(--fw-medium)",
              letterSpacing: "var(--ls-tight)",
              color: "var(--text-muted)",
              textDecoration: "line-through",
            }}
          >
            {currency}{anchorPrice}
          </s>
        )}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: "var(--ls-tighter)",
            lineHeight: "var(--lh-tight)",
            color: "var(--text-primary)",
          }}
        >
          <span style={{ fontSize: "var(--text-h3)" }}>{currency}</span>
          <span style={{ fontSize: "var(--text-display-md)" }}>{price}</span>
        </span>
        {period && (
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{period}</span>
        )}
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: "22px 0 0",
          padding: "22px 0 0",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        {features.map((feature, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-normal)",
              color: "var(--text-secondary)",
            }}
          >
            <span style={{ color: "var(--orange-500)", flex: "none", display: "inline-flex", marginTop: 2 }}>
              {check}
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {cta && (
        <button
          type="button"
          onClick={cta.onClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => { setHover(false); setPress(false); }}
          onMouseDown={() => setPress(true)}
          onMouseUp={() => setPress(false)}
          onFocus={onCtaFocus}
          onBlur={() => setFocusRing(false)}
          style={ctaStyle}
        >
          {cta.label}
        </button>
      )}

      {footnote && (
        <p
          style={{
            margin: "12px 0 0",
            fontSize: "var(--text-xs)",
            lineHeight: "var(--lh-normal)",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          {footnote}
        </p>
      )}
    </section>
  );
}
