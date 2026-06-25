import React from "react";

/** Alfred AI — Checkbox. Square check with the brand orange when selected. */
export function Checkbox({ checked = false, onChange, label, disabled = false, id, style = {} }) {
  const inputId = id || (label ? `cb-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <label htmlFor={inputId} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)",
      userSelect: "none", ...style,
    }}>
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 20, height: 20, borderRadius: "var(--radius-xs)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          background: checked ? "var(--orange-500)" : "var(--periwinkle-100)",
          border: checked ? "1.5px solid var(--orange-500)" : "1.5px solid var(--periwinkle-200)",
          transition: "all var(--dur-base) var(--ease-standard)", flex: "none",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input id={inputId} type="checkbox" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      {label && <span>{label}</span>}
    </label>
  );
}
