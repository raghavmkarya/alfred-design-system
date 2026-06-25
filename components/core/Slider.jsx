import React from "react";

/**
 * Alfred AI — Slider
 * Single-value range control with an orange fill and thumb (native input for
 * accessibility). Optional label and live value. Use for budgets, thresholds
 * and any bounded numeric input.
 */
export function Slider({ value = 50, onChange, min = 0, max = 100, step = 1, label, showValue = true, style = {} }) {
  const pct = ((value - min) / ((max - min) || 1)) * 100;
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
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        style={{
          width: "100%", height: 6, cursor: "pointer", accentColor: "var(--orange-500)",
          appearance: "none", WebkitAppearance: "none", borderRadius: "var(--radius-pill)",
          background: `linear-gradient(to right, var(--orange-500) ${pct}%, var(--border-default) ${pct}%)`,
        }}
      />
    </div>
  );
}
