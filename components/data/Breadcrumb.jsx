import React from "react";

/**
 * Alfred AI — Breadcrumb
 * Path trail with chevron separators; the final crumb is the bold current page.
 * `items`: [{label, href?}].
 */
export function Breadcrumb({ items = [], style = {} }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", ...style }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: last ? "var(--fw-bold)" : "var(--fw-medium)", color: last ? "var(--text-primary)" : "var(--text-muted)", cursor: last ? "default" : "pointer" }}>{it.label}</span>
            {!last && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
