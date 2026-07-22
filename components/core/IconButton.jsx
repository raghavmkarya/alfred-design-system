import React from "react";
import { Icon } from "../brand/Icon.jsx";

/**
 * Alfred AI — IconButton
 * Square/round button wrapping a single brand Icon. For toolbars and headers.
 */
export function IconButton({
  name,
  size = 40,
  iconSize = 18,
  variant = "ghost",       // "ghost" | "subtle" | "solid" | "outline"
  shape = "rounded",       // "rounded" | "circle"
  iconRoot = "assets/icons",
  title,
  onClick,
  disabled = false,
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    ghost: { bg: "transparent", fg: "var(--text-secondary)", hbg: "var(--surface-hover)" },
    subtle: { bg: "var(--accent-soft)", fg: "var(--text-on-tint-brand)", hbg: "var(--accent-soft)" },
    solid: { bg: "var(--accent)", fg: "#fff", hbg: "var(--accent-hover)" },
    outline: { bg: "transparent", fg: "var(--text-body)", hbg: "var(--surface-hover)", border: "1px solid var(--border-default)" },
  };
  const v = variants[variant] || variants.ghost;
  return (
    <button
      title={title} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: size, height: size, flex: "none",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: shape === "circle" ? "50%" : "var(--radius-md)",
        background: !disabled && hover ? v.hbg : v.bg,
        border: v.border || "1px solid transparent",
        color: v.fg, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        transition: "background var(--dur-base) var(--ease-standard)", ...style,
      }}
    >
      <Icon name={name} size={iconSize} color="currentColor" root={iconRoot} title={title} />
    </button>
  );
}
