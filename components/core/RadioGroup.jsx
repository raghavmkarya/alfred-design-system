import React from "react";

/**
 * Alfred AI — RadioGroup
 * Vertical set of single-choice options; the selected dot fills brand orange.
 * Controlled via `value` / `onChange`.
 */
export function RadioGroup({ options = [], value, onChange, name, label, style = {} }) {
  return (
    <div role="radiogroup" aria-label={label} style={{ display: "flex", flexDirection: "column", gap: 10, ...style }}>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{label}</span>}
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value} onClick={() => onChange && onChange(o.value)}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-primary)" }}
          >
            <span aria-checked={checked} role="radio" style={{
              width: 20, height: 20, borderRadius: "50%", flex: "none",
              border: `2px solid ${checked ? "var(--orange-500)" : "var(--border-default)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color var(--dur-base) var(--ease-standard)",
            }}>
              {checked && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--orange-500)" }} />}
            </span>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
