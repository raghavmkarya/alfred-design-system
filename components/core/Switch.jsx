import React from "react";

/** Alfred AI — Switch. Pill toggle; track turns orange when on. */
export function Switch({ checked = false, onChange, disabled = false, label, style = {} }) {
  return (
    <label style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)",
      userSelect: "none", ...style,
    }}>
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 44, height: 26, borderRadius: "var(--radius-pill)", padding: 3,
          background: checked ? "var(--orange-500)" : "var(--gray-200)",
          display: "inline-flex", alignItems: "center",
          transition: "background var(--dur-base) var(--ease-standard)", flex: "none",
        }}
      >
        <span style={{
          width: 20, height: 20, borderRadius: "50%", background: "#fff",
          boxShadow: "var(--shadow-sm)",
          transform: checked ? "translateX(18px)" : "translateX(0)",
          transition: "transform var(--dur-base) var(--ease-emphasized)",
        }} />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
