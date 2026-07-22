import React from "react";

/**
 * Alfred AI — Input
 * Text field with an optional label, peach-tinted or plain fill, and a
 * trailing slot (e.g. password reveal). Focus shows the warm orange ring.
 * Forwards its ref to the inner input element.
 */
export const Input = React.forwardRef(function Input(props, ref) {
  const {
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    fill = "tint",          // "tint" (peach, auth) | "plain" (white, app)
    trailing = null,
    error,
    disabled = false,
    id,
    style = {},
    ...rest
  } = props;

  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  const wrapBg = fill === "plain" ? "var(--surface-input-plain)" : "var(--surface-input)";
  const borderColor = error
    ? "var(--danger-500)"
    : focus
    ? "var(--border-focus)"
    : (fill === "plain" ? "var(--border-default)" : "transparent");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
          fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
        }}>{label}</label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: disabled ? "var(--surface-sunken)" : wrapBg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        padding: "0 16px", height: 52,
        boxShadow: focus ? "var(--shadow-focus)" : "none",
        transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
      }}>
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
            color: "var(--text-primary)", height: "100%",
          }}
          {...rest}
        />
        {trailing}
      </div>
      {error && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--danger-500)" }}>{error}</span>
      )}
    </div>
  );
});
