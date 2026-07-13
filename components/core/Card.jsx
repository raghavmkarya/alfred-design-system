import React from "react";

/**
 * Alfred AI — Card
 * The floating white surface used across the app: generous radius, soft
 * shadow, hairline border. `tone` swaps to the canvas or brand-gradient fill.
 */
export function Card({
  children,
  tone = "surface",       // "surface" | "sunken" | "gradient" | "ink"
  padding = 24,
  radius = "var(--radius-2xl)",
  shadow = "md",          // "none" | "sm" | "md" | "lg"
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    surface: { background: "var(--surface-card)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" },
    sunken: { background: "var(--surface-sunken)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" },
    gradient: { background: "var(--gradient-brand)", color: "#fff", border: "none" },
    ink: { background: "var(--surface-ink)", color: "#fff", border: "1px solid rgba(255,255,255,0.10)" },
  };
  const shadows = { none: "none", sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)" };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: radius,
        padding,
        boxShadow: interactive && hover ? "var(--shadow-lg)" : shadows[shadow],
        transform: interactive && hover ? "translateY(-2px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
        cursor: interactive ? "pointer" : "default",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
