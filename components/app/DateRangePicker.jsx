import React from "react";

/**
 * Alfred AI — DateRangePicker
 * A preset date-range control: a connected segmented pill group (active preset
 * fills orange) with an optional date readout. When "custom" is selected — or a
 * `rangeLabel` is supplied — it reveals the resolved range (e.g. "1 Apr – 30 Jun")
 * beside a small calendar glyph. Controlled via `value`; emits onChange(value).
 */
const DEFAULT_PRESETS = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "qtd", label: "Quarter" },
  { value: "custom", label: "Custom" },
];

export function DateRangePicker({ value = "30d", presets = DEFAULT_PRESETS, onChange = () => {}, rangeLabel = "", style = {} }) {
  const items = Array.isArray(presets) && presets.length ? presets : DEFAULT_PRESETS;
  const emit = (v) => { if (typeof onChange === "function") onChange(v); };

  const [hover, setHover] = React.useState(null);
  const showRange = value === "custom" || !!rangeLabel;

  // Per-segment state, used to drop the hairline divider next to any
  // active / hovered segment so the orange pill reads as one clean shape.
  const stateAt = (i) => ({ active: value === items[i].value, hot: hover === items[i].value });

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: 10,
      fontFamily: "var(--font-sans)", ...style,
    }}>
      <div role="group" aria-label="Date range" style={{
        display: "inline-flex", alignItems: "center",
        background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-pill)", padding: 4, boxShadow: "var(--shadow-xs)",
      }}>
        {items.map((p, i) => {
          const active = value === p.value;
          const hot = hover === p.value;
          const prev = i > 0 ? stateAt(i - 1) : null;
          const cur = stateAt(i);
          const divider = prev && !prev.active && !prev.hot && !cur.active && !cur.hot;
          return (
            <React.Fragment key={p.value}>
              {i > 0 && (
                <span aria-hidden="true" style={{
                  width: 1, height: 16, flex: "none", margin: "0 1px",
                  background: divider ? "var(--border-default)" : "transparent",
                  transition: "background var(--dur-base) var(--ease-standard)",
                }} />
              )}
              <button
                type="button"
                aria-pressed={active}
                onClick={() => emit(p.value)}
                onMouseEnter={() => setHover(p.value)}
                onMouseLeave={() => setHover(null)}
                style={{
                  border: "none", cursor: "pointer", padding: "8px 16px", lineHeight: 1,
                  borderRadius: "var(--radius-pill)", whiteSpace: "nowrap",
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                  fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
                  color: active ? "var(--text-on-orange)" : (hot ? "var(--orange-600)" : "var(--text-secondary)"),
                  background: active ? "var(--orange-500)" : (hot ? "var(--accent-soft)" : "transparent"),
                  boxShadow: active ? "var(--shadow-sm)" : "none",
                  transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
                }}
              >
                {p.label}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {showRange && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
          borderRadius: "var(--radius-pill)", border: "1px solid var(--border-subtle)",
          background: "var(--surface-card)", boxShadow: "var(--shadow-xs)", whiteSpace: "nowrap",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            style={{ color: "var(--orange-500)", flex: "none" }}>
            <rect x="3.5" y="5" width="17" height="16" rx="3" />
            <path d="M3.5 9.5h17" />
            <path d="M8 3.5v3M16 3.5v3" />
          </svg>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
            fontWeight: rangeLabel ? "var(--fw-semibold)" : "var(--fw-medium)",
            color: rangeLabel ? "var(--text-primary)" : "var(--text-muted)",
          }}>
            {rangeLabel || "Pick a range"}
          </span>
        </span>
      )}
    </div>
  );
}
