import React from "react";
import { Pagination } from "../data/Pagination.jsx";

/**
 * Alfred AI — DataTable
 * A real product data table: uppercase tracked headers, hairline rows, a
 * prominent first label column and right-aligned numeric columns set in
 * tabular numerals. Headers sort client-side (numbers vs strings, with a caret
 * glyph marking direction), rows can carry selection checkboxes, and when a
 * pageSize is given the body pages with the composed Pagination control below.
 * Theme-aware (light app / dark site), SSR-safe and self-contained.
 *
 * columns: [{ key, header, align, render, sortable }]
 *   align   — "left" (default) | "right" | "center"; "right" gets tabular nums
 *   render  — (value, row) => node, for custom cells
 *   sortable — set false to lock a single column when the table is sortable
 */

/* Pull a comparable number out of a formatted cell ("$84.2K", "5.1x", "62%"). */
function toNumber(v) {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return null;
  const m = v.replace(/[\s,]/g, "").match(/^[^\d.-]*(-?\d*\.?\d+)\s*([kmb%x]?)/i);
  if (!m) return null;
  let n = parseFloat(m[1]);
  if (!Number.isFinite(n)) return null;
  const suffix = (m[2] || "").toLowerCase();
  if (suffix === "k") n *= 1e3;
  else if (suffix === "m") n *= 1e6;
  else if (suffix === "b") n *= 1e9;
  return n;
}

function compareValues(a, b) {
  const an = toNumber(a);
  const bn = toNumber(b);
  if (an != null && bn != null) return an - bn;
  return String(a == null ? "" : a).localeCompare(String(b == null ? "" : b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function SortGlyph({ dir }) {
  // dir: "asc" | "desc" | null (inactive = faint up/down)
  const active = dir === "asc" || dir === "desc";
  const path =
    dir === "asc"
      ? <path d="M7 14l5-5 5 5" />
      : dir === "desc"
        ? <path d="M7 10l5 5 5-5" />
        : <g><path d="M8 10l4-4 4 4" /><path d="M8 14l4 4 4-4" /></g>;
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: "none", opacity: active ? 1 : 0.4, color: active ? "var(--accent)" : "currentColor" }}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

function CheckBox({ checked = false, mixed = false, onChange = () => {}, label = "Select" }) {
  const on = checked || mixed;
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleFocus = (e) => {
    let visible = true;
    try { visible = e.target.matches(":focus-visible"); } catch (err) { visible = true; }
    setFocusVisible(visible);
  };
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={mixed ? "mixed" : checked}
      aria-label={label}
      onClick={onChange}
      onFocus={handleFocus}
      onBlur={() => setFocusVisible(false)}
      style={{
        width: 18,
        height: 18,
        flex: "none",
        padding: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-xs)",
        border: `1.5px solid ${on ? "var(--border-focus)" : "var(--border-default)"}`,
        background: on ? "var(--accent)" : "var(--surface-card)",
        color: "var(--text-on-orange)",
        cursor: "pointer",
        boxShadow: focusVisible ? "var(--shadow-focus)" : "none",
        transition: "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
      }}
    >
      {mixed ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
          <path d="M6 12h12" />
        </svg>
      ) : checked ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4 4 10-10" />
        </svg>
      ) : null}
    </button>
  );
}

export function DataTable({
  columns = [],
  rows = [],
  sortable = true,
  initialSort,
  pageSize,
  selectable = false,
  style = {},
}) {
  const [sort, setSort] = React.useState(() =>
    initialSort && initialSort.key
      ? { key: initialSort.key, dir: initialSort.dir === "desc" ? "desc" : "asc" }
      : null
  );
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState(() => new Set());
  const [hovered, setHovered] = React.useState(null);

  const canSort = (col) => sortable && col && col.sortable !== false;

  // Stable identity per row (row.id when present, else original index).
  const keyed = React.useMemo(
    () => rows.map((row, i) => ({ row, k: row && row.id != null ? row.id : i })),
    [rows]
  );

  const sorted = React.useMemo(() => {
    if (!sort || !sort.key) return keyed;
    const dir = sort.dir === "desc" ? -1 : 1;
    const copy = keyed.slice();
    copy.sort((A, B) => compareValues(A.row[sort.key], B.row[sort.key]) * dir);
    return copy;
  }, [keyed, sort]);

  const total = sorted.length;
  const paginated = pageSize != null && pageSize > 0;
  const pageCount = paginated ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const safePage = Math.min(Math.max(1, page), pageCount); // clamp for display, never set state in render
  const view = paginated ? sorted.slice((safePage - 1) * pageSize, safePage * pageSize) : sorted;

  const viewKeys = view.map((item) => item.k);
  const allSelected = viewKeys.length > 0 && viewKeys.every((k) => selected.has(k));
  const someSelected = viewKeys.some((k) => selected.has(k));

  const toggleSort = (col) => {
    if (!canSort(col)) return;
    setSort((prev) =>
      prev && prev.key === col.key
        ? { key: col.key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key: col.key, dir: "asc" }
    );
  };

  const toggleRow = (k) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) viewKeys.forEach((k) => next.delete(k));
      else viewKeys.forEach((k) => next.add(k));
      return next;
    });

  const align = (col) => (col && (col.align === "right" || col.align === "center") ? col.align : "left");
  const cellPad = "13px 18px";

  // Label-ish value from the first column, so each row checkbox announces what it selects.
  const firstKey = columns.length && columns[0] ? columns[0].key : null;
  const rowLabel = (row) => {
    const v = firstKey != null && row ? row[firstKey] : null;
    return v == null || v === "" ? "Select row" : `Select row ${v}`;
  };

  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = paginated ? Math.min(safePage * pageSize, total) : total;
  const showFooter = paginated || (selectable && selected.size > 0);

  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-xs)",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
          <thead>
            <tr style={{ background: "var(--surface-sunken)" }}>
              {selectable && (
                <th
                  scope="col"
                  style={{
                    width: 1,
                    padding: cellPad,
                    borderBottom: "1px solid var(--border-default)",
                    verticalAlign: "middle",
                  }}
                >
                  <CheckBox
                    checked={allSelected}
                    mixed={someSelected && !allSelected}
                    onChange={toggleAll}
                    label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col, ci) => {
                const a = align(col);
                const sortable_ = canSort(col);
                const dir = sort && sort.key === col.key ? sort.dir : null;
                const headerStyle = {
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-2xs)",
                  fontWeight: "var(--fw-bold)",
                  letterSpacing: "var(--ls-caps)",
                  textTransform: "uppercase",
                  color: dir ? "var(--text-secondary)" : "var(--text-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  flexDirection: a === "right" ? "row-reverse" : "row",
                };
                return (
                  <th
                    key={col.key != null ? col.key : ci}
                    scope="col"
                    aria-sort={dir ? (dir === "asc" ? "ascending" : "descending") : undefined}
                    style={{
                      padding: cellPad,
                      textAlign: a,
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid var(--border-default)",
                      verticalAlign: "middle",
                    }}
                  >
                    {sortable_ ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col)}
                        style={{
                          ...headerStyle,
                          appearance: "none",
                          background: "transparent",
                          border: "none",
                          margin: 0,
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        <span>{col.header}</span>
                        <SortGlyph dir={dir} />
                      </button>
                    ) : (
                      <span style={headerStyle}>{col.header}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {view.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{
                    padding: "40px 18px",
                    textAlign: "center",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  I don't have any rows to show yet.
                </td>
              </tr>
            ) : (
              view.map((item, ri) => {
                const isSel = selected.has(item.k);
                const isHover = hovered === item.k;
                const last = ri === view.length - 1;
                const bg = isSel ? "var(--accent-soft)" : isHover ? "var(--surface-sunken)" : "transparent";
                return (
                  <tr
                    key={item.k}
                    onMouseEnter={() => setHovered(item.k)}
                    onMouseLeave={() => setHovered(null)}
                    aria-selected={selectable ? isSel : undefined}
                    style={{
                      background: bg,
                      transition: "background var(--dur-fast) var(--ease-standard)",
                    }}
                  >
                    {selectable && (
                      <td
                        style={{
                          padding: cellPad,
                          borderBottom: last ? "none" : "1px solid var(--border-subtle)",
                          verticalAlign: "middle",
                        }}
                      >
                        <CheckBox
                          checked={isSel}
                          onChange={() => toggleRow(item.k)}
                          label={rowLabel(item.row)}
                        />
                      </td>
                    )}
                    {columns.map((col, ci) => {
                      const a = align(col);
                      const value = item.row[col.key];
                      const content = typeof col.render === "function" ? col.render(value, item.row) : value;
                      const isLabel = ci === 0;
                      return (
                        <td
                          key={col.key != null ? col.key : ci}
                          style={{
                            padding: cellPad,
                            textAlign: a,
                            verticalAlign: "middle",
                            borderBottom: last ? "none" : "1px solid var(--border-subtle)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-sm)",
                            lineHeight: "var(--lh-normal)",
                            fontWeight:
                              a === "right" || isLabel ? "var(--fw-semibold)" : "var(--fw-medium)",
                            color: a === "right" || isLabel ? "var(--text-primary)" : "var(--text-secondary)",
                            fontVariantNumeric: a === "right" ? "tabular-nums" : "normal",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showFooter && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 18px",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--fw-medium)",
              color: "var(--text-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {selectable && selected.size > 0
              ? `${selected.size} selected`
              : paginated
                ? `Showing ${start}–${end} of ${total}`
                : `${total} rows`}
          </span>
          {paginated && pageCount > 1 && (
            <Pagination page={safePage} pageCount={pageCount} onChange={setPage} />
          )}
        </div>
      )}
    </div>
  );
}
