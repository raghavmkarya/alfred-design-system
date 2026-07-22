import React from "react";

/**
 * Alfred AI — Select
 * Labelled dropdown matching the Input treatments (peach "tint" on auth,
 * white "plain" in the app). Native <select> for accessibility, brand-styled
 * with a custom chevron and the warm orange focus ring.
 * Forwards its ref to the inner select element.
 */
export const Select = React.forwardRef(function Select(props, ref) {
  const {
    label,
    value,
    onChange,
    options = [],
    placeholder = "Select…",
    fill = "plain",
    disabled = false,
    error,
    id,
    style = {},
    ...rest
  } = props;

  const [focus, setFocus] = React.useState(false);
  const selId = id || (label ? `sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const bg = fill === "plain" ? "var(--surface-input-plain)" : "var(--surface-input)";
  const border = error
    ? "var(--danger-500)"
    : focus
    ? "var(--border-focus)"
    : fill === "plain" ? "var(--border-default)" : "transparent";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", ...style }}>
      {label && (
        <label htmlFor={selId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{label}</label>
      )}
      <div style={{
        position: "relative", display: "flex", alignItems: "center",
        background: disabled ? "var(--surface-sunken)" : bg, border: `1.5px solid ${border}`,
        borderRadius: "var(--radius-md)", height: 52, opacity: disabled ? "var(--opacity-disabled)" : 1,
        boxShadow: focus ? "var(--shadow-focus)" : "none",
        transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
      }}>
        <select
          ref={ref}
          id={selId} value={value} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            appearance: "none", WebkitAppearance: "none", flex: 1, border: "none", outline: "none",
            background: "transparent", height: "100%", padding: "0 40px 0 16px",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
            color: value ? "var(--text-primary)" : "var(--text-placeholder)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-placeholder)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position: "absolute", right: 14, pointerEvents: "none" }}><path d="M6 9l6 6 6-6" /></svg>
      </div>
      {error && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--danger-500)" }}>{error}</span>}
    </div>
  );
});
