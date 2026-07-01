import React from "react";

/**
 * Alfred AI — Slider
 * Single-value range control with an orange fill and thumb (native input for
 * accessibility). Optional label and live value. Use for budgets, thresholds
 * and any bounded numeric input. The track shows the warm focus ring on
 * keyboard focus; `aria-label` falls back to the label prop. Extra props are
 * spread onto the native range input.
 */
export function Slider({ value = 50, onChange, min = 0, max = 100, step = 1, label, showValue = true, style = {}, ...rest }) {
  const pct = ((value - min) / ((max - min) || 1)) * 100;
  const [focusRing, setFocusRing] = React.useState(false);
  return (
    <div style={{ width: "100%", ...style }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)" }}>
          {label && <span style={{ color: "var(--text-secondary)" }}>{label}</span>}
          {showValue && <span style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{value}</span>}
        </div>
      )}
      <input
        type="range" min={min} max={max} step={step} value={value}
        aria-label={typeof label === "string" ? label : undefined}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        onFocus={(e) => { let kb = true; try { kb = e.target.matches(":focus-visible"); } catch { /* older engines */ } setFocusRing(kb); }}
        onBlur={() => setFocusRing(false)}
        style={{
          width: "100%", height: 6, cursor: "pointer", accentColor: "var(--orange-500)",
          appearance: "none", WebkitAppearance: "none", borderRadius: "var(--radius-pill)",
          background: `linear-gradient(to right, var(--orange-500) ${pct}%, var(--border-default) ${pct}%)`,
          boxShadow: focusRing ? "var(--shadow-focus)" : "none",
          transition: "box-shadow var(--dur-base) var(--ease-standard)",
        }}
        {...rest}
      />
    </div>
  );
}
