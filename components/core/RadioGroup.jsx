import React from "react";

/**
 * Alfred AI — RadioGroup
 * Vertical set of single-choice options; the selected dot fills brand orange.
 * Controlled via `value` / `onChange`. Roving tabindex: ArrowDown/ArrowRight
 * select the next option, ArrowUp/ArrowLeft the previous (wrapping); Space
 * selects the focused option. The dot shows the warm focus ring on keyboard focus.
 */
export function RadioGroup({ options = [], value, onChange, name, label, style = {} }) {
  const [focusIdx, setFocusIdx] = React.useState(-1);
  const itemRefs = React.useRef([]);
  const checkedIndex = options.findIndex((o) => o.value === value);
  const tabbableIndex = checkedIndex >= 0 ? checkedIndex : 0;

  const selectAt = (i) => {
    const n = options.length;
    if (!n) return;
    const next = ((i % n) + n) % n;
    onChange && onChange(options[next].value);
    const el = itemRefs.current[next];
    if (el && el.focus) el.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); selectAt(i + 1); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); selectAt(i - 1); }
    else if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); onChange && onChange(options[i].value); }
  };

  return (
    <div role="radiogroup" aria-label={label} style={{ display: "flex", flexDirection: "column", gap: 10, ...style }}>
      {label && <span aria-hidden="true" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{label}</span>}
      {options.map((o, i) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            role="radio"
            aria-checked={checked}
            tabIndex={i === tabbableIndex ? 0 : -1}
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={() => onChange && onChange(o.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onFocus={(e) => { let kb = true; try { kb = e.target.matches(":focus-visible"); } catch { /* older engines */ } setFocusIdx(kb ? i : -1); }}
            onBlur={() => setFocusIdx(-1)}
            style={{
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-primary)",
              outline: "none", boxShadow: "none",
            }}
          >
            <span aria-hidden="true" style={{
              width: 20, height: 20, borderRadius: "50%", flex: "none",
              border: `2px solid ${checked ? "var(--border-focus)" : "var(--border-default)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: focusIdx === i ? "var(--shadow-focus)" : "none",
              transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
            }}>
              {checked && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />}
            </span>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
