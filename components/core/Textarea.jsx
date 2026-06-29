import React from "react";

/**
 * Alfred AI — Textarea
 * Multi-line text field — the Input's sibling for notes, prompts and longer answers.
 * Peach-tinted or plain fill, the warm orange focus ring, an optional character counter
 * and error text. Works controlled (`value`/`onChange`) or uncontrolled.
 */
export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  fill = "plain",          // "plain" (white, app) | "tint" (peach, auth)
  maxLength,
  showCount = false,
  error,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState("");
  const isControlled = onChange != null && value !== undefined;
  const text = isControlled ? value : internal;
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `ta-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  const handleChange = (e) => { if (!isControlled) setInternal(e.target.value); onChange && onChange(e); };

  const wrapBg = fill === "tint" ? "var(--surface-input)" : "var(--surface-input-plain)";
  const borderColor = error ? "var(--danger-500)" : focus ? "var(--orange-500)" : (fill === "tint" ? "transparent" : "var(--border-default)");
  const count = (text == null ? "" : String(text)).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
        }}>{label}</label>
      )}
      <div style={{
        background: disabled ? "var(--gray-100)" : wrapBg,
        border: `1.5px solid ${borderColor}`, borderRadius: "var(--radius-md)",
        padding: "10px 14px", boxShadow: focus ? "var(--shadow-focus)" : "none",
        transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        opacity: disabled ? 0.6 : 1,
      }}>
        <textarea
          id={fieldId}
          rows={rows}
          placeholder={placeholder}
          value={text}
          maxLength={maxLength}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%", boxSizing: "border-box", border: "none", outline: "none", resize: "vertical",
            background: "transparent", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
            lineHeight: "var(--lh-normal)", color: "var(--text-primary)", minHeight: 24,
          }}
          {...rest}
        />
      </div>
      {(error || (showCount && maxLength)) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {error && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--danger-500)" }}>{error}</span>}
          {showCount && maxLength && (
            <span style={{
              marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
              color: count >= maxLength ? "var(--danger-500)" : "var(--text-muted)", fontVariantNumeric: "tabular-nums",
            }}>{count} / {maxLength}</span>
          )}
        </div>
      )}
    </div>
  );
}
