import React from "react";
import { Chip } from "../core/Chip.jsx";

/**
 * Alfred AI — TagInput
 * Multi-value tag field — type, press enter (or comma) and each entry becomes
 * a removable Chip. For audiences, channels and keyword lists; optional
 * suggestion dropdown filtered by the current text, max count and duplicate
 * guard. Backspace on an empty field removes the last tag.
 */
export const TagInput = React.forwardRef(function TagInput({
  label,
  value = [],
  onChange,
  placeholder = "Add and press enter",
  suggestions,
  maxTags,
  disabled = false,
  allowDuplicates = false,
  id,
  style = {},
}, ref) {
  const [text, setText] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const [ring, setRing] = React.useState(false);
  const [announce, setAnnounce] = React.useState("");
  const innerRef = React.useRef(null);
  const uid = React.useId().replace(/:/g, "");
  const inputId = id || `tag-in-${uid}`;
  const labelId = label ? `tag-lb-${uid}` : undefined;

  const setRefs = (node) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const tags = Array.isArray(value) ? value : [];
  const atMax = typeof maxTags === "number" && tags.length >= maxTags;

  const commit = (raw) => {
    const next = String(raw != null ? raw : text).trim();
    if (!next || atMax || disabled) return;
    if (!allowDuplicates && tags.some((t) => t.toLowerCase() === next.toLowerCase())) { setText(""); return; }
    onChange && onChange([...tags, next]);
    setText("");
  };

  const removeAt = (i) => {
    const removed = tags[i];
    onChange && onChange(tags.filter((_, j) => j !== i));
    setAnnounce(`Removed ${removed}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); commit(); }
    else if (e.key === "Backspace" && !text && tags.length) removeAt(tags.length - 1);
  };

  const handleFocus = (e) => {
    let visible = true;
    try { visible = e.target.matches(":focus-visible"); } catch (err) { visible = true; }
    setFocus(true);
    setRing(visible);
  };

  const query = text.trim().toLowerCase();
  const matches = Array.isArray(suggestions) && !disabled && !atMax
    ? suggestions.filter((s) => {
        if (!allowDuplicates && tags.some((t) => t.toLowerCase() === s.toLowerCase())) return false;
        return !query || s.toLowerCase().includes(query);
      })
    : [];
  const showSuggestions = focus && matches.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", fontFamily: "var(--font-sans)", ...style }}>
      {label && (
        <label id={labelId} htmlFor={inputId} style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
          fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
        }}>{label}</label>
      )}
      <div style={{ position: "relative" }}>
        <div
          role="group"
          aria-labelledby={labelId}
          onClick={() => { if (!disabled && innerRef.current) innerRef.current.focus(); }}
          style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6,
            minHeight: 52, padding: "10px 14px", boxSizing: "border-box",
            background: "var(--surface-input-plain)",
            border: `1px solid ${ring ? "var(--border-focus)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-md)",
            boxShadow: ring ? "var(--shadow-focus)" : "none",
            transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
            cursor: disabled ? "not-allowed" : "text",
            opacity: disabled ? "var(--opacity-disabled)" : 1,
          }}
        >
          {tags.map((tag, i) => (
            <Chip key={`${tag}-${i}`} onRemove={disabled ? undefined : () => removeAt(i)}>{tag}</Chip>
          ))}
          <input
            ref={setRefs}
            id={inputId}
            type="text"
            value={text}
            disabled={disabled}
            placeholder={tags.length ? "" : placeholder}
            aria-label={label || "Add tag"}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={() => { setFocus(false); setRing(false); }}
            style={{
              flex: 1, minWidth: 80, height: 28, padding: 0, border: "none", outline: "none",
              background: "transparent", boxShadow: "none", fontFamily: "var(--font-sans)",
              fontSize: "var(--text-base)", color: "var(--text-primary)",
              cursor: disabled ? "not-allowed" : "text",
            }}
          />
        </div>

        {showSuggestions && (
          <div role="listbox" aria-label="Suggestions" style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: "var(--z-dropdown)",
            background: "var(--surface-raised)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", overflow: "hidden", padding: 6,
          }}>
            {matches.map((s, i) => (
              <button
                key={`${s}-${i}`}
                type="button"
                role="option"
                aria-selected={false}
                onMouseDown={(e) => { e.preventDefault(); commit(s); }}
                style={{
                  display: "flex", alignItems: "center", width: "100%", textAlign: "left",
                  padding: "9px 12px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
                  background: "transparent", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                  fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
                }}
              >
                <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s}</span>
              </button>
            ))}
          </div>
        )}

        <span aria-live="polite" style={{
          position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
          overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
        }}>{announce}</span>
      </div>
    </div>
  );
});
