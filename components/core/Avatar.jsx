import React from "react";

/**
 * Alfred AI — Avatar
 * Round monogram or image. The default "auto" tone hashes the name onto a
 * muted tint palette so lists of people read as people, not as a row of
 * identical brand discs; explicit tones (gradient/ink/periwinkle) remain
 * for the places identity should carry the brand.
 */
const AUTO_TONES = [
  { bg: "var(--periwinkle-100)", fg: "var(--text-on-tint-info)" },  /* raw-ramp-ok: fixed auto-avatar tint palette (re-maps in app-dark; light monogram disc on marketing dark is intentional) */
  { bg: "var(--success-100)", fg: "var(--text-on-tint-success)" },
  { bg: "var(--orange-100)", fg: "var(--text-on-tint-brand)" },  /* raw-ramp-ok: fixed auto-avatar tint palette */
  { bg: "var(--gray-100)", fg: "var(--text-secondary)" },  /* raw-ramp-ok: fixed auto-avatar tint palette */
];

export function Avatar({ name = "", src, size = 40, tone = "auto", style = {} }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
  const hash = [...name].reduce((n, c) => n + c.charCodeAt(0), 0);
  const auto = AUTO_TONES[hash % AUTO_TONES.length];
  const fixed = { gradient: "var(--gradient-brand)", ink: "var(--ink-900)", periwinkle: "var(--periwinkle-400)" }[tone];  /* raw-ramp-ok: fixed brand-identity avatar tones (solid ink / periwinkle discs) */
  const bg = fixed || auto.bg;
  const fg = fixed ? "#fff" : auto.fg;
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%", overflow: "hidden",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: src ? "transparent" : bg, color: fg, flex: "none",
      fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)",
      fontSize: Math.round(size * 0.38), letterSpacing: "0.01em", ...style,
    }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </span>
  );
}
