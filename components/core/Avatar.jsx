import React from "react";

/**
 * Alfred AI — Avatar
 * Round monogram or image. Falls back to brand-gradient initials.
 */
export function Avatar({ name = "", src, size = 40, tone = "gradient", style = {} }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
  const bg = tone === "gradient" ? "var(--gradient-brand)" : tone === "ink" ? "var(--ink-900)" : "var(--periwinkle-400)";
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%", overflow: "hidden",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: src ? "transparent" : bg, color: "#fff", flex: "none",
      fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)",
      fontSize: Math.round(size * 0.38), letterSpacing: "0.01em", ...style,
    }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </span>
  );
}
