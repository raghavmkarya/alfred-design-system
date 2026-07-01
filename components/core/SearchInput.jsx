import React from "react";

/**
 * Alfred AI — SearchInput
 * A search field with a leading magnifier, a clear button, an optional loading spinner,
 * and a results dropdown that opens on focus. Each result is `{ label, hint }` and calls
 * `onSelect`. Works controlled (`value`/`onChange`) or uncontrolled; `onSubmit` fires on Enter.
 * Follows the ARIA combobox pattern: ArrowDown/ArrowUp move the active option,
 * Enter selects it, Escape closes the dropdown. Forwards its ref to the inner input.
 */
export const SearchInput = React.forwardRef(function SearchInput(props, ref) {
  const {
    value,
    onChange,
    onSubmit,
    onSelect,
    placeholder = "Search campaigns, metrics, decisions…",
    results = [],
    loading = false,
    open,                     // force the dropdown open (else opens on focus)
    fill = "plain",          // "plain" | "tint"
    style = {},
  } = props;

  const [internal, setInternal] = React.useState("");
  const isControlled = onChange != null && value !== undefined;
  const text = isControlled ? value : internal;
  const [focus, setFocus] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const baseId = React.useId();
  const listboxId = `${baseId}-listbox`;
  const optionId = (i) => `${baseId}-option-${i}`;

  const items = Array.isArray(results) ? results.map((r) => (typeof r === "string" ? { label: r } : r)) : [];
  const showResults = (open != null ? open : (focus && !dismissed)) && items.length > 0;

  const handleChange = (e) => {
    if (!isControlled) setInternal(e.target.value);
    setDismissed(false);
    setActiveIndex(-1);
    onChange && onChange(e);
  };
  const clear = () => {
    if (!isControlled) setInternal("");
    setActiveIndex(-1);
    onChange && onChange({ target: { value: "" } });
  };
  const pick = (label) => {
    setDismissed(true);
    setActiveIndex(-1);
    onSelect && onSelect(label);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (!items.length) return;
      e.preventDefault();
      if (!showResults) { setDismissed(false); setActiveIndex(0); }
      else setActiveIndex((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      if (!showResults) return;
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? items.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (showResults && activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        pick(items[activeIndex].label);
      } else if (onSubmit) {
        onSubmit(String(text || ""));
      }
    } else if (e.key === "Escape") {
      if (showResults) { e.preventDefault(); setDismissed(true); setActiveIndex(-1); }
    }
  };

  const wrapBg = fill === "tint" ? "var(--surface-input)" : "var(--surface-input-plain)";
  const borderColor = focus ? "var(--orange-500)" : (fill === "tint" ? "transparent" : "var(--border-default)");

  return (
    <div style={{ position: "relative", width: "100%", fontFamily: "var(--font-sans)", ...style }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, height: 48, padding: "0 14px",
        background: wrapBg, border: `1.5px solid ${borderColor}`, borderRadius: "var(--radius-md)",
        boxShadow: focus ? "var(--shadow-focus)" : "none",
        transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
          strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          ref={ref}
          type="text"
          role="combobox"
          aria-label="Search"
          aria-expanded={showResults}
          aria-controls={showResults ? listboxId : undefined}
          aria-activedescendant={showResults && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-autocomplete="list"
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); setDismissed(false); setActiveIndex(-1); }}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-primary)",
          }}
        />
        {loading ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange-500)" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ flex: "none" }}>
            <path d="M21 12a9 9 0 1 1-6.2-8.6" />
          </svg>
        ) : text ? (
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={clear} aria-label="Clear search"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, flex: "none",
              padding: 0, border: "none", borderRadius: "var(--radius-circle)", cursor: "pointer",
              background: "var(--surface-sunken)", color: "var(--text-muted)",
            }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>
        ) : null}
      </div>

      {showResults && (
        <div id={listboxId} role="listbox" aria-label="Search results" style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: "var(--z-dropdown)",
          background: "var(--surface-raised)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", overflow: "hidden", padding: 6,
        }}>
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                role="option"
                id={optionId(i)}
                aria-selected={isActive}
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex((cur) => (cur === i ? -1 : cur))}
                onClick={() => pick(item.label)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
                  padding: "10px 12px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
                  background: isActive ? "var(--surface-sunken)" : "transparent", fontFamily: "var(--font-sans)",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                </svg>
                <span style={{ flex: 1, minWidth: 0, fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
                {item.hint && (
                  <span style={{
                    flex: "none", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
                    textTransform: "uppercase", color: "var(--text-muted)",
                  }}>{item.hint}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
