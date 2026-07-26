import React from "react";
import { GLYPH } from "../hooks/glyphs.jsx";

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
          background: checked ? "var(--accent)" : "var(--info-100)",
          border: checked ? "1.5px solid var(--border-focus)" : "1.5px solid var(--border-default)",
          boxShadow: focusRing ? "var(--shadow-focus)" : "none",
          transition: "background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)", flex: "none",
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
        {/* the tick is on the 24 grid so it is GLYPH.check, not a fourth spelling
            of it. strokeWidth is 3.6, not the icon-grid 2, because the viewBox
            doubled: 1.8 on a 12 box is the same rendered weight. A checkbox tick
            is deliberately heavier than a body icon, being 12px and still needing
            to read. */}
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ pointerEvents: "none" }}>
            <path d={GLYPH.check} stroke="var(--text-on-orange)" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
