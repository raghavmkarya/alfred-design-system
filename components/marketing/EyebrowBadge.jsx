import React from "react";

/**
 * Alfred AI — EyebrowBadge
 * Pill eyebrow chip — the live-site signature section opener. A tracked
 * uppercase label inside a pill with a soft tone hairline (~35% alpha via a
 * faded currentColor overlay, no color-mix) and a small tone dot. The `mono`
 * variant renders the ONE SOURCE OF TRUTH style.
 */
export function EyebrowBadge({
  children,
  tone = "brand",
  dot = true,
  mono = false,
  size = "md",
  style = {},
  ...rest
}) {
  const tones = {
    brand: "var(--text-link)",           /* brand orange, theme-adapted */
    periwinkle: "var(--text-on-tint-info)", /* legible cool accent on both themes */
    neutral: "var(--text-secondary)",
    urgent: "var(--urgent-500)",
  };
  const sizes = {
    sm: { font: "var(--text-2xs)", padding: "5px 12px", dot: 5, gap: 7 },
    md: { font: "var(--text-xs)", padding: "7px 14px", dot: 6, gap: 8 },
    lg: { font: "13px", padding: "9px 18px", dot: 6, gap: 9 },
  };
  const s = sizes[size] || sizes.md;
  const color = tones[tone] || tones.brand;

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        padding: s.padding,
        borderRadius: "var(--radius-pill)",
        color,
        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        fontSize: s.font,
        fontWeight: mono ? "var(--fw-medium)" : "var(--fw-semibold)",
        letterSpacing: "var(--ls-caps)",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...style,
      }}
      {...rest}
    >
      {/* Tone border at ~35% alpha — a faded currentColor hairline overlay,
          so it tracks the tone in both light and dark themes. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: "1px solid currentColor",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />
      {dot && (
        <span
          aria-hidden="true"
          style={{
            width: s.dot,
            height: s.dot,
            flex: "none",
            borderRadius: "var(--radius-circle)",
            background: "currentColor",
          }}
        />
      )}
      {children}
    </span>
  );
}
