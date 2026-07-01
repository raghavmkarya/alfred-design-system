import React from "react";

/**
 * Alfred AI — Table
 * Lightweight data table with an uppercase tracked header, hairline row
 * dividers and tabular numerals on right-aligned columns. Columns may supply a
 * `render(value, row)` for custom cells (badges, deltas). Wrap-scrolls on x.
 */
export function Table({ columns = [], rows = [], dense = false, style = {} }) {
  const py = dense ? "10px" : "15px";
  return (
    <div style={{ width: "100%", overflowX: "auto", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", ...style }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={c.key || i} scope="col" style={{
                padding: "12px 20px", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
                textTransform: "uppercase", letterSpacing: "var(--ls-caps)", color: "var(--text-muted)",
                textAlign: c.align || "left", background: "var(--surface-sunken)", borderBottom: "1px solid var(--border-subtle)",
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {columns.map((c, ci) => (
                <td key={c.key || ci} style={{
                  padding: `${py} 20px`, fontSize: "var(--text-sm)", color: "var(--text-secondary)",
                  textAlign: c.align || "left", borderTop: ri > 0 ? "1px solid var(--border-subtle)" : "none",
                  fontVariantNumeric: c.align === "right" ? "tabular-nums" : "normal",
                }}>
                  {c.render ? c.render(r[c.key], r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
