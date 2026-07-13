import React from "react";

/**
 * Alfred AI — Checkbox. Square check with the brand orange when selected.
 * A hidden native checkbox sits over the box, so it stays keyboard-operable
 * (Space toggles) and the visible box shows the warm focus ring on keyboard focus.
 */
export function Checkbox({ checked = false, onChange, label, disabled = false, id, style = {} }) {
  const [focusRing, setFocusRing] = React.useState(false);
  const inputId = id || (label ? `cb-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <label htmlFor={inputId} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? "var(--opacity-disabled)" : 1,
      fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)",
      userSelect: "none", ...style,
    }}>
      <span
        style={{
          position: "relative",
          width: 20, height: 20, borderRadius: "var(--radius-xs)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          background: checked ? "var(--orange-500)" : "var(--periwinkle-100)",
          border: checked ? "1.5px solid var(--orange-500)" : "1.5px solid var(--periwinkle-200)",
          boxShadow: focusRing ? "var(--shadow-focus)" : "none",
          transition: "all var(--dur-base) var(--ease-standard)", flex: "none",
        }}
      >
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.checked)}
          onFocus={(e) => { let kb = true; try { kb = e.target.matches(":focus-visible"); } catch { /* older engines */ } setFocusRing(kb); }}
          onBlur={() => setFocusRing(false)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            margin: 0, opacity: 0, cursor: "inherit",
          }}
        />
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ pointerEvents: "none" }}>
            <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="var(--text-on-orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
