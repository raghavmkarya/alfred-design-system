import React from "react";

/**
 * Alfred AI — Pagination
 * Page navigator with prev/next chevrons and a windowed page list (first, last,
 * and a window around the current page, with … gaps). Controlled via `page` /
 * `onChange`. The active page reads orange.
 */
export function Pagination({ page = 1, pageCount = 1, onChange, style = {} }) {
  const go = (p) => p >= 1 && p <= pageCount && onChange && onChange(p);
  const nums = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) nums.push(p);
    else if (nums[nums.length - 1] !== "…") nums.push("…");
  }
  const chev = (d) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
  const cell = (content, { key, active, disabled, onClick, label } = {}) => (
    <button key={key} type="button" disabled={disabled} onClick={onClick} aria-current={active ? "page" : undefined} aria-label={label}
      style={{
        minWidth: 34, height: 34, padding: "0 8px", borderRadius: "var(--radius-sm)",
        border: `1px solid ${active ? "var(--orange-500)" : "var(--border-subtle)"}`,
        background: active ? "var(--orange-50)" : "var(--surface-card)",
        color: active ? "var(--orange-600)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, fontVariantNumeric: "tabular-nums",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>{content}</button>
  );
  return (
    <nav aria-label="Pagination" style={{ display: "flex", alignItems: "center", gap: 6, ...style }}>
      {cell(chev("M15 6l-6 6 6 6"), { key: "prev", disabled: page <= 1, onClick: () => go(page - 1), label: "Previous page" })}
      {nums.map((n, i) => n === "…"
        ? <span key={"e" + i} aria-hidden="true" style={{ padding: "0 4px", color: "var(--text-muted)" }}>…</span>
        : cell(n, { key: n, active: n === page, onClick: () => go(n) }))}
      {cell(chev("M9 6l6 6-6 6"), { key: "next", disabled: page >= pageCount, onClick: () => go(page + 1), label: "Next page" })}
    </nav>
  );
}
