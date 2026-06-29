import React from "react";

/**
 * Alfred AI — SeekComposer
 * The "Seek Alfred" prompt box — the product's primary conversational surface.
 * An auto-growing textarea inside a card that lights up with the signature
 * periwinkle→orange gradient ring on focus, a toolbar with an add-context affordance
 * and a quiet model pill, and a circular send button that warms to orange (with the
 * brand glow) once there's something to ask. Enter submits, Shift+Enter newlines.
 * Optional starter-prompt chips sit beneath. Works controlled (`value`/`onChange`)
 * or uncontrolled; `onSubmit(text)` fires on send.
 */
export function SeekComposer({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask Alfred anything about your marketing…",
  suggestions = [],
  model = "Alfred 4.8",
  disabled = false,
  busy = false,
  style = {},
}) {
  const [internal, setInternal] = React.useState("");
  const isControlled = onChange != null && value !== undefined;
  const text = isControlled ? value : internal;
  const [focus, setFocus] = React.useState(false);

  const setText = (v) => { if (!isControlled) setInternal(v); };
  const handleChange = (e) => { setText(e.target.value); onChange && onChange(e); };

  const canSend = !!(text && String(text).trim()) && !disabled && !busy;

  const submit = () => {
    if (!canSend) return;
    onSubmit && onSubmit(String(text).trim());
    if (!isControlled) setInternal("");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };
  const grow = (e) => { const t = e.target; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 200) + "px"; };

  return (
    <div style={{ width: "100%", fontFamily: "var(--font-sans)", ...style }}>
      {/* Gradient focus ring — a thin gradient frame revealed on focus */}
      <div style={{
        borderRadius: "var(--radius-2xl)",
        padding: 1.5,
        background: focus ? "var(--gradient-brand)" : "var(--border-default)",
        boxShadow: focus ? "var(--shadow-focus)" : "var(--shadow-sm)",
        transition: "box-shadow var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)",
        opacity: disabled ? 0.6 : 1,
      }}>
        <div style={{
          background: "var(--surface-card)",
          borderRadius: "calc(var(--radius-2xl) - 2px)",
          padding: "14px 14px 12px",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          <textarea
            value={text}
            onChange={handleChange}
            onInput={grow}
            onKeyDown={onKeyDown}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            aria-label="Ask Alfred"
            style={{
              border: "none", outline: "none", resize: "none", background: "transparent",
              width: "100%", boxSizing: "border-box", minHeight: 26, maxHeight: 200, overflowY: "auto",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
              lineHeight: "var(--lh-normal)", color: "var(--text-primary)",
            }}
          />

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SeekToolButton title="Add context" disabled={disabled}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </SeekToolButton>

            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              height: 30, padding: "0 10px", borderRadius: "var(--radius-pill)",
              background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
              fontSize: "var(--text-xs)", fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z"
                  fill="var(--orange-500)" />
              </svg>
              {model}
            </span>

            <span style={{ flex: 1 }} />

            <button
              type="button"
              onClick={submit}
              disabled={!canSend}
              aria-label="Send to Alfred"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, flex: "none", borderRadius: "var(--radius-circle)",
                border: "none", cursor: canSend ? "pointer" : "not-allowed",
                background: canSend ? "var(--orange-500)" : "var(--gray-150)",
                color: canSend ? "#fff" : "var(--text-placeholder)",
                boxShadow: canSend ? "var(--shadow-brand)" : "none",
                transition: "background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
              }}
            >
              {busy ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-6.2-8.6" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Starter prompts */}
      {Array.isArray(suggestions) && suggestions.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setText(s)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                height: 32, padding: "0 12px", borderRadius: "var(--radius-pill)",
                background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
                cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                fontWeight: "var(--fw-medium)", color: "var(--text-secondary)", whiteSpace: "nowrap",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
                <path d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z"
                  fill="var(--periwinkle-400)" />
              </svg>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Internal — a quiet square toolbar button. */
function SeekToolButton({ children, title, disabled }) {
  return (
    <button
      type="button" title={title} aria-label={title} disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 30, height: 30, flex: "none", borderRadius: "var(--radius-sm)",
        background: "transparent", border: "1px solid var(--border-subtle)",
        color: "var(--text-secondary)", cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}
