import React from "react";

/**
 * Alfred AI — BulletChart
 * Horizontal actual-vs-target bullet bars for KPI-vs-goal reads (ROAS vs
 * target, pipeline vs plan, CAC vs ceiling). Each row pairs a measure bar
 * against a target tick, optionally over graded qualitative bands.
 *
 * `items`: [{ label, value, target, max, ranges }]
 *   - max     scales the row (defaults to value/target headroom).
 *   - target  draws a vertical tick mark.
 *   - ranges  optional [poorUpTo, okUpTo] — graded light-gray bands behind
 *             the measure bar (poor → ok → good, lightening as they improve).
 * The measure bar is the brand gradient; the value is printed right, tabular.
 * Pass `valueFormat` to control how value + target are printed.
 */
const addCommas = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const niceNum = (v) => {
  if (typeof v !== "number" || !Number.isFinite(v)) return v;
  const a = Math.abs(v);
  if (a >= 1000) return addCommas(Math.round(v));
  if (a >= 100) return String(Math.round(v));
  if (a >= 10) return String(Math.round(v * 10) / 10);
  return String(Math.round(v * 100) / 100);
};
const clampPct = (n) => Math.max(0, Math.min(100, n));

export function BulletChart({ items = [], valueFormat, style = {} }) {
  const fmt = valueFormat || niceNum;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", ...style }}>
      {items.map((it, i) => {
        const value = Number(it.value) || 0;
        const target = typeof it.target === "number" ? it.target : null;
        const top = it.max || Math.max(value, target || 0, 1);
        const ranges = Array.isArray(it.ranges) ? it.ranges : [];

        const valuePct = clampPct((value / top) * 100);
        const targetPct = target != null ? clampPct((target / top) * 100) : null;
        const poorPct = ranges.length > 0 ? clampPct((ranges[0] / top) * 100) : null;
        const okPct = ranges.length > 1 ? clampPct((ranges[1] / top) * 100) : null;

        const ariaLabel =
          `${it.label || `Metric ${i + 1}`}: ${fmt(value)}` +
          (target != null ? `, target ${fmt(target)}` : "");

        return (
          <div
            key={it.label != null ? `${it.label}-${i}` : i}
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            {/* label */}
            <div
              style={{
                width: 132,
                flex: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--fw-medium)",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {it.label}
            </div>

            {/* track */}
            <div
              role="img"
              aria-label={ariaLabel}
              style={{
                position: "relative",
                flex: 1,
                minWidth: 0,
                height: 36,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
                background: "var(--surface-sunken)",
                overflow: "hidden",
              }}
            >
              {/* qualitative bands (poor → ok → good), lightening as they improve */}
              {poorPct != null && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: `${poorPct}%`,
                    background: "var(--border-default)",
                  }}
                />
              )}
              {okPct != null && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${poorPct}%`,
                    width: `${Math.max(okPct - poorPct, 0)}%`,
                    background: "var(--border-subtle)",
                  }}
                />
              )}

              {/* measure bar — the brand gradient */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translateY(-50%)",
                  width: `${valuePct}%`,
                  height: 14,
                  borderRadius: "var(--radius-pill)",
                  background: "var(--gradient-brand)",
                  boxShadow: "var(--shadow-xs)",
                }}
              />

              {/* target tick */}
              {targetPct != null && (
                <div
                  style={{
                    position: "absolute",
                    top: 5,
                    bottom: 5,
                    left: `${targetPct}%`,
                    width: 3,
                    transform: "translateX(-50%)",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--text-primary)",
                    boxShadow: "0 0 0 1.5px var(--surface-card)",
                  }}
                />
              )}
            </div>

            {/* value */}
            <div
              style={{
                flex: "none",
                minWidth: 52,
                textAlign: "right",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--fw-semibold)",
                letterSpacing: "var(--ls-tight)",
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(value)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
