import React from "react";

/**
 * Alfred AI — Tabs
 * Underline tab bar. The active tab is ink with a warm orange indicator.
 * Follows the WAI-ARIA tabs pattern: roving tabindex, ArrowLeft/ArrowRight
 * move focus and selection (wrapping), Home/End jump to the first/last tab.
 */
export function Tabs({ tabs = [], value, onChange, style = {} }) {
  const active = value ?? (tabs[0] && tabs[0].id);
  const foundIndex = tabs.findIndex((t) => t.id === active);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;
  const tabRefs = React.useRef([]);

  const moveTo = (i) => {
    const n = tabs.length;
    if (!n) return;
    const next = ((i % n) + n) % n;
    onChange && onChange(tabs[next].id);
    const el = tabRefs.current[next];
    if (el && el.focus) el.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "ArrowRight") { e.preventDefault(); moveTo(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); moveTo(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); moveTo(0); }
    else if (e.key === "End") { e.preventDefault(); moveTo(tabs.length - 1); }
  };

  return (
    <div role="tablist" style={{ display: "flex", gap: 28, borderBottom: "1px solid var(--border-subtle)", ...style }}>
      {tabs.map((t, i) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={i === activeIndex ? 0 : -1}
            ref={(el) => { tabRefs.current[i] = el; }}
            onClick={() => onChange && onChange(t.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={{
              position: "relative", border: "none", background: "transparent", cursor: "pointer",
              padding: "0 0 14px", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
              fontWeight: on ? "var(--fw-bold)" : "var(--fw-medium)",
              color: on ? "var(--text-primary)" : "var(--text-muted)",
              transition: "color var(--dur-base) var(--ease-standard)",
            }}
          >
            {t.label}
            <span aria-hidden="true" style={{
              position: "absolute", left: 0, right: 0, bottom: -1, height: 3, borderRadius: "3px 3px 0 0",
              background: on ? "var(--orange-500)" : "transparent",
              transition: "background var(--dur-base) var(--ease-standard)",
            }} />
          </button>
        );
      })}
    </div>
  );
}
