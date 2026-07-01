import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Alfred AI — CommandPalette
 * The flagship "Seek Alfred" surface: an elevated, rounded panel with a
 * controlled ask/search field (gradient sparkle mark — the single gradient
 * element of the view), a primary Ask affordance, and selectable suggestion
 * rows grouped under a quiet eyebrow. Supports an optional recent section and
 * a footer hint. Keyboard-aware (Enter asks, ↑/↓ moves selection) and fully
 * theme-aware so it reads cleanly on the light app and the dark site.
 *
 * onChange(nextValue, event) — mirrors value, like a search box.
 * onSubmit(query)            — fires on Enter, the Ask button, or a row click.
 */

function SparkleIcon({ size = 18, color = "currentColor", strokeWidth = 1.75 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5l1.55 4.6a3 3 0 0 0 1.9 1.9L20 11.5l-4.55 1.5a3 3 0 0 0-1.9 1.9L12 19.5l-1.55-4.6a3 3 0 0 0-1.9-1.9L4 11.5l4.55-1.5a3 3 0 0 0 1.9-1.9z" />
      <path d="M19 4.2l.32.95.95.33-.95.32-.32.95-.32-.95-.95-.32.95-.33z" />
    </svg>
  );
}

function EnterIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}

const DEFAULT_SUGGESTIONS = [
  { label: "Why did CAC rise 18% last week?", hint: "diagnose" },
  { label: "Forecast Q3 pipeline against plan", hint: "forecast" },
  { label: "Which channel is underspending today?", hint: "spend" },
  { label: "Draft the Monday revenue standup", hint: "summarize" },
];

export function CommandPalette({
  placeholder = "Ask Alfred or search anything…",
  suggestions = [],
  value,
  onChange,
  onSubmit,
  footer,
  recent,
  style = {},
}) {
  const uid = React.useId().replace(/:/g, "");
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(-1);

  const current = isControlled ? value : internal;
  const currentStr = current == null ? "" : String(current);
  const query = currentStr.trim();

  const sugList = suggestions.length ? suggestions : DEFAULT_SUGGESTIONS;
  const recentList = (Array.isArray(recent) ? recent : [])
    .map((r) => (typeof r === "string" ? { label: r } : r))
    .filter((r) => r && r.label);

  const askRow = query ? [{ label: query }] : [];
  const items = [...askRow, ...sugList, ...recentList];
  const sugStart = askRow.length;
  const recentStart = askRow.length + sugList.length;

  // Combobox wiring: the input controls the listbox and points at the active option.
  const listboxId = `cp-list-${uid}`;
  const optionId = (i) => `cp-opt-${uid}-${i}`;

  const submit = (text) => {
    const q = (text == null ? "" : String(text)).trim();
    if (!q) return;
    if (onSubmit) onSubmit(q);
  };

  const handleChange = (e) => {
    const next = e.target.value;
    if (!isControlled) setInternal(next);
    setActiveIdx(-1);
    if (onChange) onChange(next, e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Home" && items.length) {
      e.preventDefault();
      setActiveIdx(0);
    } else if (e.key === "End" && items.length) {
      e.preventDefault();
      setActiveIdx(items.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const sel = activeIdx >= 0 ? items[activeIdx] : null;
      submit(sel ? sel.label : currentStr);
    } else if (e.key === "Escape") {
      setActiveIdx(-1);
    }
  };

  const rowBase = {
    display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
    border: "none", cursor: "pointer", padding: "10px 10px", borderRadius: "var(--radius-md)",
    background: "transparent", font: "inherit",
    transition: "background var(--dur-fast) var(--ease-standard)",
  };
  const chipBase = {
    width: 30, height: 30, flex: "none", borderRadius: "var(--radius-sm)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    transition: "color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)",
  };
  const hintPill = {
    flex: "none", fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)",
    fontWeight: "var(--fw-medium)", letterSpacing: "0.02em", color: "var(--text-muted)",
    padding: "3px 9px", borderRadius: "var(--radius-pill)",
    border: "1px solid var(--border-subtle)", background: "var(--surface-card)",
  };
  const kbd = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
    height: 20, minWidth: 20, padding: "0 5px", borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border-subtle)", background: "var(--surface-card)", color: "var(--text-muted)",
  };

  const eyebrow = (text) => (
    <div role="presentation" style={{
      fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)",
      padding: "12px 10px 5px",
    }}>{text}</div>
  );

  const renderRow = (item, flatIdx, variant) => {
    const active = activeIdx === flatIdx;
    const isAsk = variant === "ask";
    return (
      <button
        key={`${variant}-${flatIdx}-${item.label}`}
        type="button"
        role="option"
        id={optionId(flatIdx)}
        aria-selected={active}
        onClick={() => submit(item.label)}
        onMouseEnter={() => setActiveIdx(flatIdx)}
        onMouseLeave={() => setActiveIdx((i) => (i === flatIdx ? -1 : i))}
        style={{ ...rowBase, background: active ? "var(--accent-soft)" : "transparent" }}
      >
        <span style={{
          ...chipBase,
          background: isAsk ? "var(--orange-500)" : "var(--surface-sunken)",
          color: isAsk ? "var(--text-on-brand)" : (active ? "var(--orange-500)" : "var(--text-muted)"),
        }}>
          {item.icon ? item.icon : <SparkleIcon size={15} color="currentColor" />}
        </span>
        <span style={{
          flex: 1, minWidth: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
          fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {isAsk ? (
            <span>
              <span style={{ color: "var(--text-secondary)", fontWeight: "var(--fw-semibold)" }}>Ask Alfred</span>
              <span style={{ color: "var(--text-muted)" }}>{`  “${item.label}”`}</span>
            </span>
          ) : item.label}
        </span>
        {item.hint && !isAsk && <span style={hintPill}>{item.hint}</span>}
        <span style={{
          ...kbd, opacity: active || isAsk ? 1 : 0,
          transition: "opacity var(--dur-fast) var(--ease-standard)",
        }}>
          <EnterIcon size={13} />
        </span>
      </button>
    );
  };

  const defaultFooter = (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      padding: "11px 16px", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-sunken)",
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", whiteSpace: "nowrap",
      }}>
        <span style={{ ...kbd, padding: "0 6px" }}><EnterIcon size={13} /></span>
        Enter to ask
        <span style={{ opacity: 0.5 }}>·</span>
        Arrow keys to browse
      </span>
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>I reason over your live data</span>
    </div>
  );
  const footerNode = footer === undefined ? defaultFooter : footer;

  return (
    <div style={{
      width: "100%", maxWidth: 600, fontFamily: "var(--font-sans)",
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-lg)", overflow: "hidden",
      ...style,
    }}>
      <style>{`.cp-input-${uid}::placeholder{color:var(--text-placeholder);opacity:1;}`}</style>

      {/* Ask / search field */}
      <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 8px 10px",
          background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
          border: `1.5px solid ${focused ? "var(--orange-500)" : "var(--border-default)"}`,
          boxShadow: focused ? "var(--shadow-focus)" : "var(--shadow-xs)",
          transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        }}>
          <span style={{
            width: 38, height: 38, flex: "none", borderRadius: "var(--radius-md)",
            background: "var(--gradient-brand)", boxShadow: "var(--shadow-xs)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <SparkleIcon size={20} color="var(--text-on-brand)" />
          </span>
          <input
            className={`cp-input-${uid}`}
            type="text"
            role="combobox"
            aria-expanded={items.length > 0}
            aria-controls={listboxId}
            aria-activedescendant={activeIdx >= 0 ? optionId(activeIdx) : undefined}
            aria-autocomplete="list"
            aria-label={placeholder}
            placeholder={placeholder}
            value={currentStr}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-primary)",
              height: 38, lineHeight: "38px",
            }}
          />
          <Button
            size="sm"
            variant="primary"
            disabled={!query}
            onClick={() => submit(currentStr)}
            iconLeft={<SparkleIcon size={15} color="var(--text-on-brand)" />}
            style={{ flex: "none" }}
          >
            Ask
          </Button>
        </div>
      </div>

      {/* Results */}
      <div id={listboxId} role="listbox" aria-label="Suggestions" style={{ padding: "8px 8px", maxHeight: 340, overflowY: "auto" }}>
        {askRow.map((it, i) => renderRow(it, i, "ask"))}
        {sugList.length > 0 && eyebrow("Suggested")}
        {sugList.map((it, i) => renderRow(it, sugStart + i, "sug"))}
        {recentList.length > 0 && eyebrow("Recent")}
        {recentList.map((it, i) => renderRow(it, recentStart + i, "recent"))}
      </div>

      {footerNode}
    </div>
  );
}
