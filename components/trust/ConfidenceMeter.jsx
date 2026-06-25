import React from "react";

/**
 * Alfred AI — ConfidenceMeter
 * A graded confidence bar for Alfred's Causal Confidence Score / calibration.
 * A pill-shaped track carries the full danger → warning → success spectrum; a
 * surface-coloured veil dims the unreached portion and a slim thumb marks the
 * value. The value reads "<n>% confident" and a tone word (low / moderate /
 * high) is derived from thresholds — both coloured by tone, in both themes.
 */
export function ConfidenceMeter({
  value = 0,
  label = "Confidence",
  showValue = true,
  size = "md",
  style = {},
}) {
  const raw = typeof value === "number" ? value : Number(value) || 0;
  const pct = Math.max(0, Math.min(100, Math.round(raw)));

  const tone =
    pct >= 70
      ? { word: "high", color: "var(--success-500)" }
      : pct >= 40
      ? { word: "moderate", color: "var(--warning-500)" }
      : { word: "low", color: "var(--danger-500)" };

  const sizes = {
    sm: { track: 7, notch: 4, poke: 2, labelFont: "var(--text-xs)", valueFont: "var(--text-sm)", subFont: "var(--text-2xs)", gap: 8 },
    md: { track: 10, notch: 5, poke: 3, labelFont: "var(--text-sm)", valueFont: "var(--text-base)", subFont: "var(--text-xs)", gap: 10 },
    lg: { track: 14, notch: 6, poke: 3, labelFont: "var(--text-base)", valueFont: "var(--text-lg)", subFont: "var(--text-sm)", gap: 12 },
  };
  const s = sizes[size] || sizes.md;

  const tabular = { fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum" 1' };

  return (
    <div
      role="meter"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label || "Confidence"}: ${pct}% confident, ${tone.word} confidence`}
      style={{ display: "block", width: "100%", fontFamily: "var(--font-sans)", ...style }}
    >
      {/* Label + value row */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: s.gap }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          {label ? (
            <span
              style={{
                fontSize: s.labelFont,
                fontWeight: "var(--fw-medium)",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </span>
          ) : null}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flex: "none" }}>
            <span style={{ width: 6, height: 6, borderRadius: "var(--radius-pill)", background: tone.color }} />
            <span
              style={{
                fontSize: "var(--text-2xs)",
                fontWeight: "var(--fw-bold)",
                letterSpacing: "var(--ls-caps)",
                textTransform: "uppercase",
                color: tone.color,
              }}
            >
              {tone.word}
            </span>
          </span>
        </span>

        {showValue ? (
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: 5, flex: "none" }}>
            <span
              style={{
                fontSize: s.valueFont,
                fontWeight: "var(--fw-bold)",
                letterSpacing: "var(--ls-tight)",
                color: tone.color,
                ...tabular,
              }}
            >
              {pct}%
            </span>
            <span style={{ fontSize: s.subFont, fontWeight: "var(--fw-medium)", color: "var(--text-muted)" }}>confident</span>
          </span>
        ) : null}
      </div>

      {/* Track */}
      <div style={{ position: "relative", height: s.track }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--radius-pill)",
            overflow: "hidden",
            background: "linear-gradient(90deg, var(--danger-500) 0%, var(--warning-500) 50%, var(--success-500) 100%)",
            boxShadow: "inset 0 0 0 1px var(--border-subtle)",
          }}
        >
          {/* Veil over the unreached portion */}
          <span
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${pct}%`,
              right: 0,
              background: "var(--surface-card)",
              opacity: 0.55,
            }}
          />
        </div>

        {/* Leading thumb marker — sits exactly at value%, pokes slightly proud of the track */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -s.poke,
            bottom: -s.poke,
            left: `${pct}%`,
            transform: `translateX(${-pct}%)`,
            width: s.notch,
            borderRadius: "var(--radius-pill)",
            background: "var(--surface-card)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-sm)",
          }}
        />
      </div>
    </div>
  );
}
