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
        const crumbStyle = { fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: last ? "var(--fw-bold)" : "var(--fw-medium)", color: last ? "var(--text-primary)" : "var(--text-muted)", textDecoration: "none" };
        return (
          <React.Fragment key={i}>
            {last ? (
              <span aria-current="page" style={crumbStyle}>{it.label}</span>
            ) : it.href ? (
              <a href={it.href} style={crumbStyle}>{it.label}</a>
            ) : (
              <span style={crumbStyle}>{it.label}</span>
            )}
            {!last && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-placeholder)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
