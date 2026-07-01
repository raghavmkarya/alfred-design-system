import React from "react";

/**
 * Alfred AI — Switch. Pill toggle; track turns orange when on.
 * Keyboard-operable: a hidden native checkbox (role="switch") sits over the
 * track, so Space toggles it and screen readers announce on/off state. The
 * track shows the warm focus ring on keyboard focus.
 */
export function Switch({ checked = false, onChange, disabled = false, label, style = {} }) {
  const [focusRing, setFocusRing] = React.useState(false);
  return (
    <label style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? "var(--opacity-disabled)" : 1,
      fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)",
      userSelect: "none", ...style,
    }}>
      <span
        style={{
          position: "relative",
          width: 44, height: 26, borderRadius: "var(--radius-pill)", padding: 3,
          background: checked ? "var(--orange-500)" : "var(--gray-200)",
          display: "inline-flex", alignItems: "center",
          boxShadow: focusRing ? "var(--shadow-focus)" : "none",
          transition: "background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
          flex: "none",
        }}
      >
        <input
          type="checkbox"
          role="switch"
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
        <span aria-hidden="true" style={{
          width: 20, height: 20, borderRadius: "50%", background: "var(--white)",
          boxShadow: "var(--shadow-sm)", pointerEvents: "none",
          transform: checked ? "translateX(18px)" : "translateX(0)",
          transition: "transform var(--dur-base) var(--ease-emphasized)",
        }} />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
