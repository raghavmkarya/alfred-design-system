import React from "react";
import { Sparkline } from "../charts/Sparkline.jsx";

/**
 * Alfred AI — StatTile
 * A KPI tile with an inline trend — a richer KpiCard. Card surface with a top
 * row (accent-dotted label + a delta pill), a big display value, an optional
 * caption, and a full-bleed sparkline footer when `points` is a non-empty
 * number array. `color` overrides the accent dot. `direction` drives the arrow
 * glyph only; optional `valence` drives the pill color, so a rising bad KPI can
 * read red — when `valence` is absent it falls back to the direction color.
 */
export function StatTile({
  label = "",
  value = "",
  delta = null,            // e.g. "+12.4%"
  direction = "up",        // "up" | "down" | "flat" — arrow glyph
  valence,                 // "good" | "bad" | "neutral" — pill color; defaults from direction
  caption = "",
  points = [],
  color = "var(--orange-500)",   // accent override
  style = {},
}) {
  const dirs = {
    up: { color: "var(--success-500)", bg: "var(--success-100)", border: "transparent", glyph: "M12 19V5M6 11l6-6 6 6" },
    down: { color: "var(--danger-500)", bg: "var(--danger-100)", border: "transparent", glyph: "M12 5v14M6 13l6 6 6-6" },
    flat: { color: "var(--text-muted)", bg: "var(--surface-sunken)", border: "var(--border-subtle)", glyph: "M5 12h14M15 8l4 4-4 4" },
  };
  const dir = dirs[direction] || dirs.up;
  const tones = {
    good: { color: "var(--success-500)", bg: "var(--success-100)", border: "transparent" },
    bad: { color: "var(--danger-500)", bg: "var(--danger-100)", border: "transparent" },
    neutral: { color: "var(--text-muted)", bg: "var(--surface-sunken)", border: "var(--border-subtle)" },
  };
  // Arrow always tracks direction; pill color tracks valence when given, else falls back to direction.
  const d = { ...dir, ...(valence ? tones[valence] || tones.neutral : null) };
  const hasTrend = Array.isArray(points) && points.length > 0;
  const pad = 20;

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 12, minWidth: 200,
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)", padding: pad, boxShadow: "var(--shadow-sm)",
      overflow: "hidden", ...style,
    }}>
      {/* Top row — accented label + delta pill (valence colour, direction arrow) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: "var(--radius-pill)", background: color, flex: "none" }} />
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
            color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{label}</span>
        </span>
        {delta != null && delta !== "" && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3, flex: "none",
            padding: "3px 8px", borderRadius: "var(--radius-pill)",
            background: d.bg, color: d.color, border: `1px solid ${d.border}`,
            fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
            lineHeight: 1,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={d.glyph} />
            </svg>
            {delta}
          </span>
        )}
      </div>

      {/* Headline value */}
      <div style={{
        fontFamily: "var(--font-display)", fontSize: 34, fontWeight: "var(--fw-semibold)",
        letterSpacing: "var(--ls-tight)", color: "var(--text-primary)", lineHeight: 1,
      }}>{value}</div>

      {caption !== "" && (
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{caption}</div>
      )}

      {/* Full-bleed trend footer */}
      {hasTrend && (
        <div style={{ margin: `8px ${-pad}px ${-pad}px`, lineHeight: 0 }}>
          <Sparkline points={points} height={48} stroke={2.5} />
        </div>
      )}
    </div>
  );
}
