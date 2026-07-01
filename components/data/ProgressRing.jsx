import React from "react";

/**
 * Alfred AI — ProgressRing
 * Circular progress for confidence, goal attainment and visibility scores.
 * The brand tone draws the arc with the signature periwinkle→orange gradient;
 * the value sits at the centre in Clash Display with an optional caps label
 * (inside for md/lg, below the ring for sm).
 */
export function ProgressRing({
  value = 0,
  size = "md",
  label,
  sublabel,
  showValue = true,
  tone = "brand",
  style = {},
}) {
  const sizes = {
    sm: { d: 56, sw: 5, valueFont: 16 },
    md: { d: 84, sw: 7, valueFont: 22 },
    lg: { d: 120, sw: 9, valueFont: 30 },
  };
  const s = sizes[size] || sizes.md;

  const raw = typeof value === "number" ? value : Number(value) || 0;
  const pct = Math.max(0, Math.min(100, raw));
  const shown = Math.round(pct);

  const uid = React.useId().replace(/:/g, "");
  const gradId = `prg-${uid}`;

  const strokes = {
    brand: `url(#${gradId})`,
    positive: "var(--success-500)",
    warning: "var(--warning-500)",
    danger: "var(--danger-500)",
  };
  const stroke = strokes[tone] || strokes.brand;

  const c = s.d / 2;
  const r = (s.d - s.sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  const labelInside = size !== "sm";
  const caps = {
    fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-semibold)",
    letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)",
    textAlign: "center", lineHeight: 1.3,
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={shown}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label || "Progress"}: ${shown} of 100`}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, ...style }}
    >
      <div style={{ position: "relative", width: s.d, height: s.d, flex: "none" }}>
        <svg width={s.d} height={s.d} viewBox={`0 0 ${s.d} ${s.d}`} aria-hidden="true" style={{ display: "block" }}>
          {tone === "brand" && (
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--periwinkle-400)" />
                <stop offset="72%" stopColor="var(--orange-500)" />
              </linearGradient>
            </defs>
          )}
          <circle cx={c} cy={c} r={r} fill="none" stroke="var(--border-subtle)" strokeWidth={s.sw} />
          <circle
            cx={c} cy={c} r={r} fill="none"
            stroke={stroke} strokeWidth={s.sw} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            transform={`rotate(-90 ${c} ${c})`}
            style={{ transition: "stroke-dashoffset var(--dur-slow) var(--ease-standard)" }}
          />
        </svg>
        {(showValue || (labelInside && label)) && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", padding: s.sw + 4,
          }}>
            {showValue && (
              <span style={{
                fontFamily: "var(--font-display)", fontSize: s.valueFont, fontWeight: "var(--fw-semibold)",
                letterSpacing: "var(--ls-tight)", lineHeight: 1, color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
              }}>{shown}%</span>
            )}
            {labelInside && label && (
              <span style={{
                ...caps, marginTop: showValue ? 3 : 0, maxWidth: s.d - s.sw * 2 - 10,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{label}</span>
            )}
          </div>
        )}
      </div>
      {!labelInside && label && <span style={caps}>{label}</span>}
      {sublabel && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", textAlign: "center" }}>{sublabel}</span>
      )}
    </div>
  );
}
