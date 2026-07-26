import React from "react";

/**
 * Alfred AI — Legend
 * Swatch + label key for any chart. Row (default) or column layout; each item
 * may carry an optional right-aligned value. Colors default through the brand
 * categorical palette so a legend always matches the chart beside it.
 */
// Shared categorical palette — same 6 tokens, same order, same cycle length as
// the charts, so an auto-colored legend always matches the chart beside it
// (both wrap to --chart-1 on a 7th series). --chart-7/8 stay explicit-use only.
const PALETTE = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--chart-6)"];

/* A legend becomes interactive only when `onToggle` is supplied. A static key
   stays plain text: making every legend a row of buttons would add tab stops to
   charts where nothing can be toggled. */
export function Legend({ items = [], direction = "row", ariaLabel = "Chart legend", hidden = [], onToggle, style = {} }) {
  const isHidden = (it, i) => hidden.includes(it.key != null ? it.key : i);
  return (
    // A legend is a key: a list of series names, not a graphic. `list`/`listitem`
    // keeps each entry readable and countable; the swatch itself is decorative.
    <div role="list" aria-label={ariaLabel} style={{
      display: "flex", flexDirection: direction === "column" ? "column" : "row",
      flexWrap: "wrap", gap: direction === "column" ? 8 : 18, ...style,
    }}>
      {items.map((it, i) => {
        const off = isHidden(it, i);
        const swatch = it.color || PALETTE[i % PALETTE.length];
        const inner = (
          <>
            {/* hidden reads as an outline, not just a faded fill — colour alone
                would be the only signal, and that fails for colour-blind users */}
            <span style={{
              width: 11, height: 11, borderRadius: 3, flex: "none",
              background: off ? "transparent" : swatch,
              boxShadow: off ? `inset 0 0 0 2px ${swatch}` : "none",
            }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", textDecoration: off ? "line-through" : "none" }}>{it.label}</span>
            {it.value != null && (
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{it.value}</span>
            )}
          </>
        );
        const row = { display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 };
        return (
          <span key={i} role="listitem" style={row}>
            {onToggle ? (
              <button
                type="button"
                aria-pressed={!off}
                onClick={() => onToggle(it.key != null ? it.key : i, i)}
                style={{
                  ...row, cursor: "pointer", background: "transparent",
                  border: "1px solid transparent", borderRadius: "var(--radius-sm)",
                  padding: "2px 4px", font: "inherit", opacity: off ? "var(--opacity-disabled)" : 1,
                  transition: "opacity var(--dur-fast) var(--ease-standard)",
                }}
              >
                {inner}
              </button>
            ) : inner}
          </span>
        );
      })}
    </div>
  );
}
