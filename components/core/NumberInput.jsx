import React from "react";

/**
 * Alfred AI — NumberInput
 * Stepper numeric field for budget caps, thresholds and targets. − / + buttons
 * step the value within [min, max]; the centred value accepts typing and
 * commits on blur or enter, with an optional prefix ("$") and unit ("%", "K").
 */
export const NumberInput = React.forwardRef(function NumberInput({
  label,
  value = 0,
  onChange,
  min,
  max,
  step = 1,
  unit,
  prefix,
  size = "md",
  disabled = false,
  id,
  style = {},
}, ref) {
  const sizes = {
    sm: { h: 40, btn: 28, font: "var(--text-sm)", icon: 12 },
    md: { h: 52, btn: 36, font: "var(--text-base)", icon: 14 },
  };
  const s = sizes[size] || sizes.md;

  const uid = React.useId().replace(/:/g, "");
  const inputId = id || `num-in-${uid}`;

  const clamp = (n) => {
    let x = n;
    if (typeof min === "number") x = Math.max(min, x);
    if (typeof max === "number") x = Math.min(max, x);
    return x;
  };
  const decimals = Math.min((String(step).split(".")[1] || "").length, 6);
  const round = (n) => Number(n.toFixed(decimals));

  const [text, setText] = React.useState(String(value));
  const [focus, setFocus] = React.useState(false);
  const [hoverBtn, setHoverBtn] = React.useState(null);

  React.useEffect(() => { setText(String(value)); }, [value]);

  const apply = (next) => {
    setText(String(next));
    if (next !== value && onChange) onChange(next);
  };
  const stepBy = (dir) => {
    const base = typeof value === "number" && !Number.isNaN(value) ? value : 0;
    apply(clamp(round(base + dir * step)));
  };
  const commitText = () => {
    const parsed = parseFloat(String(text).replace(/,/g, ""));
    if (Number.isNaN(parsed)) { setText(String(value)); return; }
    apply(clamp(parsed));
  };

  const atMin = typeof min === "number" && value <= min;
  const atMax = typeof max === "number" && value >= max;

  const btnStyle = (key, off) => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none",
    width: s.btn, height: s.btn, padding: 0, border: "none",
    borderRadius: "var(--radius-sm)",
    background: hoverBtn === key && !off ? "var(--surface-sunken)" : "transparent",
    color: "var(--text-secondary)",
    cursor: off ? "not-allowed" : "pointer",
    opacity: off ? "var(--opacity-disabled)" : 1,
    transition: "background var(--dur-fast) var(--ease-standard)",
  });

  const affixStyle = {
    flex: "none", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
    fontWeight: "var(--fw-medium)", color: "var(--text-muted)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", fontFamily: "var(--font-sans)", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
          fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
        }}>{label}</label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 4, height: s.h, padding: "0 8px",
        boxSizing: "border-box",
        background: "var(--surface-input-plain)",
        border: `1px solid ${focus ? "var(--border-focus)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focus ? "var(--shadow-focus)" : "none",
        transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
        cursor: disabled ? "not-allowed" : "default",
      }}>
        <button
          type="button"
          aria-label="Decrease"
          disabled={disabled || atMin}
          onClick={() => stepBy(-1)}
          onMouseEnter={() => setHoverBtn("dec")}
          onMouseLeave={() => setHoverBtn(null)}
          style={btnStyle("dec", disabled || atMin)}
        >
          <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
        </button>

        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, flex: 1, minWidth: 0, height: "100%" }}>
          {prefix && <span style={affixStyle}>{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            type="text"
            role="spinbutton"
            inputMode="decimal"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            value={text}
            disabled={disabled}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => { setFocus(false); commitText(); }}
            onFocus={() => setFocus(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitText();
              else if (e.key === "ArrowUp") { e.preventDefault(); stepBy(1); }
              else if (e.key === "ArrowDown") { e.preventDefault(); stepBy(-1); }
            }}
            style={{
              flex: 1, minWidth: 0, height: "100%", padding: 0, border: "none", outline: "none",
              background: "transparent", textAlign: "center",
              fontFamily: "var(--font-sans)", fontSize: s.font, fontWeight: "var(--fw-semibold)",
              color: "var(--text-primary)", fontVariantNumeric: "tabular-nums",
              cursor: disabled ? "not-allowed" : "text",
            }}
          />
          {unit && <span style={affixStyle}>{unit}</span>}
        </span>

        <button
          type="button"
          aria-label="Increase"
          disabled={disabled || atMax}
          onClick={() => stepBy(1)}
          onMouseEnter={() => setHoverBtn("inc")}
          onMouseLeave={() => setHoverBtn(null)}
          style={btnStyle("inc", disabled || atMax)}
        >
          <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </button>
      </div>
    </div>
  );
});
