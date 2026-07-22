import React from "react";

/**
 * Alfred AI — Combobox
 * Type-ahead input with a filtered listbox (ARIA 1.2 combobox). Typing filters
 * options by label; arrows move the active option, Enter picks it, Escape
 * closes. Each option is `{ value, label, hint }` — the hint sits right-aligned
 * and muted. Forwards its ref to the input.
 */
export const Combobox = React.forwardRef(function Combobox({
  label,
  placeholder = "Search…",
  options = [],
  value,
  onChange,
  onInputChange,
  disabled = false,
  emptyText = "No matches",
  maxVisible = 7,
  id,
  style = {},
  ...rest
}, ref) {
  const uid = React.useId().replace(/:/g, "");
  const inputId = id || `cbx-in-${uid}`;
  const listId = `cbx-list-${uid}`;
  const selected = options.find((o) => o.value === value);
  const [text, setText] = React.useState(selected ? selected.label : "");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [focus, setFocus] = React.useState(false);

  // Keep the input text in sync when the selected value changes from outside.
  React.useEffect(() => {
    const match = options.find((o) => o.value === value);
    if (match) setText(match.label);
  }, [value]);

  const q = text.trim().toLowerCase();
  const filtered = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  const activeIdx = Math.min(active, Math.max(0, filtered.length - 1));
  const showList = open && !disabled;

  const pick = (opt) => {
    setText(opt.label);
    setOpen(false);
    onChange && onChange(opt.value);
  };

  const handleInput = (e) => {
    setText(e.target.value);
    setOpen(true);
    setActive(0);
    onInputChange && onInputChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      if (!filtered.length) return;
      const delta = e.key === "ArrowDown" ? 1 : -1;
      setActive((activeIdx + delta + filtered.length) % filtered.length);
    } else if (e.key === "Home" && open && filtered.length) {
      e.preventDefault(); setActive(0);
    } else if (e.key === "End" && open && filtered.length) {
      e.preventDefault(); setActive(filtered.length - 1);
    } else if (e.key === "Enter") {
      if (open && filtered[activeIdx]) { e.preventDefault(); pick(filtered[activeIdx]); }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", fontFamily: "var(--font-sans)", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
          fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
        }}>{label}</label>
      )}
      <div style={{ position: "relative" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, height: 52, padding: "0 14px 0 16px",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-input-plain)",
          border: `1px solid ${focus ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--shadow-focus)" : "none",
          opacity: disabled ? "var(--opacity-disabled)" : 1,
          transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        }}>
          <input
            ref={ref}
            id={inputId}
            type="text"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-activedescendant={showList && filtered[activeIdx] ? `cbx-opt-${uid}-${activeIdx}` : undefined}
            aria-autocomplete="list"
            placeholder={placeholder}
            value={text}
            disabled={disabled}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocus(true); setOpen(true); }}
            onBlur={() => { setFocus(false); setOpen(false); }}
            style={{
              flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
              color: "var(--text-primary)", height: "100%",
              cursor: disabled ? "not-allowed" : "text",
            }}
            {...rest}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            style={{
              flex: "none", pointerEvents: "none",
              transform: showList ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform var(--dur-base) var(--ease-standard)",
            }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {showList && (
          <div
            role="listbox"
            id={listId}
            aria-label={typeof label === "string" ? label : "Options"}
            style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
              zIndex: "var(--z-dropdown)",
              background: "var(--surface-raised)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)",
              padding: 6, maxHeight: maxVisible * 38 + 12, overflowY: "auto",
            }}
          >
            {filtered.length === 0 ? (
              <div style={{ padding: "9px 12px", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{emptyText}</div>
            ) : filtered.map((o, i) => (
              <div
                key={o.value}
                id={`cbx-opt-${uid}-${i}`}
                role="option"
                aria-selected={o.value === value}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(o)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                  borderRadius: "var(--radius-sm)", cursor: "pointer",
                  background: i === activeIdx ? "var(--accent-soft)" : "transparent",
                  transition: "background var(--dur-fast) var(--ease-standard)",
                }}
              >
                <span style={{
                  flex: 1, minWidth: 0, fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
                  color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{o.label}</span>
                {o.hint && (
                  <span style={{ flex: "none", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{o.hint}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
