import React from "react";

/**
 * Alfred AI — SegmentedControl
 * Pill-track segmented switch; the active segment fills orange. Use for small,
 * mutually-exclusive view toggles (e.g. Day / Week / Month). Controlled.
 * Radiogroup semantics with a roving tabindex: ArrowRight/ArrowDown select the
 * next segment, ArrowLeft/ArrowUp the previous (wrapping); Space or Enter
 * selects the focused segment.
 */
export function SegmentedControl({ options = [], value, onChange, size = "md", style = {} }) {
  const pad = size === "sm" ? "6px 12px" : "9px 16px";
  const fs = size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  const [focusIdx, setFocusIdx] = React.useState(-1);
  const segRefs = React.useRef([]);
  const activeIndex = options.findIndex((o) => o.value === value);
  const tabbableIndex = activeIndex >= 0 ? activeIndex : 0;

  const selectAt = (i) => {
    const n = options.length;
    if (!n) return;
    const next = ((i % n) + n) % n;
    onChange && onChange(options[next].value);
    const el = segRefs.current[next];
    if (el && el.focus) el.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); selectAt(i + 1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); selectAt(i - 1); }
  };

  return (
    <div role="radiogroup" style={{
      display: "inline-flex", background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)", padding: 4, gap: 2, ...style,
    }}>
      {options.map((o, i) => {
        const active = value === o.value;
        const ring = focusIdx === i;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={i === tabbableIndex ? 0 : -1}
            ref={(el) => { segRefs.current[i] = el; }}
            onClick={() => onChange && onChange(o.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onFocus={(e) => { let kb = true; try { kb = e.target.matches(":focus-visible"); } catch { /* older engines */ } setFocusIdx(kb ? i : -1); }}
            onBlur={() => setFocusIdx(-1)}
            style={{
              border: "none", cursor: "pointer", padding: pad, borderRadius: "var(--radius-pill)",
              fontFamily: "var(--font-sans)", fontSize: fs, fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
              color: active ? "var(--text-on-orange)" : "var(--text-secondary)", background: active ? "var(--orange-500)" : "transparent",
              boxShadow: ring
                ? (active ? "var(--shadow-sm), var(--shadow-focus)" : "var(--shadow-focus)")
                : (active ? "var(--shadow-sm)" : "none"),
              transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
            }}
          >{o.label}</button>
        );
      })}
    </div>
  );
}
