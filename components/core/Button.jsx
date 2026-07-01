import React from "react";

/**
 * Alfred AI — Button
 * Primary brand button is solid warm orange with a soft glow on hover.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { height: 36, padding: "0 16px", font: "var(--text-sm)", radius: "var(--radius-md)", gap: 8 },
    md: { height: 46, padding: "0 22px", font: "var(--text-base)", radius: "var(--radius-md)", gap: 10 },
    lg: { height: 56, padding: "0 30px", font: "var(--text-lg)", radius: "var(--radius-lg)", gap: 12 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontSize: s.font,
    fontWeight: "var(--fw-bold)",
    letterSpacing: "0.01em",
    lineHeight: 1,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? "var(--opacity-disabled)" : 1,
    transition: "background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const variants = {
    primary: { background: "var(--orange-500)", color: "var(--text-on-brand)" },
    secondary: { background: "var(--periwinkle-400)", color: "var(--ink-900)" },
    outline: { background: "transparent", color: "var(--ink-900)", borderColor: "var(--border-default)" },
    ghost: { background: "transparent", color: "var(--ink-700)" },
    subtle: { background: "var(--orange-50)", color: "var(--orange-600)" },
    danger: { background: "var(--danger-500)", color: "var(--text-on-brand)" },
  };

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const hoverStyle = !disabled && hover ? {
    primary: { background: "var(--orange-600)", boxShadow: "var(--shadow-brand)" },
    secondary: { background: "var(--periwinkle-500)" },
    outline: { borderColor: "var(--ink-900)", background: "var(--gray-50)" },
    ghost: { background: "var(--gray-100)" },
    subtle: { background: "var(--orange-100)" },
    danger: { background: "var(--danger-600)" },
  }[variant] : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, transform: press && !disabled ? "scale(0.98)" : "scale(1)", ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
