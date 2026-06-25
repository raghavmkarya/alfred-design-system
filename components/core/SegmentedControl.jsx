import React from "react";

/**
 * Alfred AI — SegmentedControl
 * Pill-track segmented switch; the active segment fills orange. Use for small,
 * mutually-exclusive view toggles (e.g. Day / Week / Month). Controlled.
 */
export function SegmentedControl({ options = [], value, onChange, size = "md", style = {} }) {
  const pad = size === "sm" ? "6px 12px" : "9px 16px";
  const fs = size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  return (
    <div role="tablist" style={{
      display: "inline-flex", background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)", padding: 4, gap: 2, ...style,
    }}>
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value} role="tab" aria-selected={active} onClick={() => onChange && onChange(o.value)}
            style={{
              border: "none", cursor: "pointer", padding: pad, borderRadius: "var(--radius-pill)",
              fontFamily: "var(--font-sans)", fontSize: fs, fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
              color: active ? "#fff" : "var(--text-secondary)", background: active ? "var(--orange-500)" : "transparent",
              boxShadow: active ? "var(--shadow-sm)" : "none",
              transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
            }}
          >{o.label}</button>
        );
      })}
    </div>
  );
}
