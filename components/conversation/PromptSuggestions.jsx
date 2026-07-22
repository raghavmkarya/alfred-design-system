import React from "react";

/**
 * Alfred AI — PromptSuggestions
 * Tappable starter prompts in Alfred's first-person voice — the empty-state nudge
 * for Seek Alfred and a fast way to re-ask. Renders an optional eyebrow, then a set
 * of spark-marked pills (wrapping) or full-width rows (list) that call
 * `onSelect(prompt)` when tapped. Accepts plain strings or `{ label, hint }` items.
 */
export function PromptSuggestions({
  suggestions = [],
  onSelect,
  title = "Try asking",
  layout = "wrap",          // "wrap" | "list"
  style = {},
}) {
  const items = (suggestions || []).map((s) => (typeof s === "string" ? { label: s } : s));
  const isList = layout === "list";

  const [hover, setHover] = React.useState(-1);
  const [press, setPress] = React.useState(-1);
  const hoverable = typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(hover: hover)").matches;

  const spark = (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z"
        fill="var(--periwinkle-400)" />
    </svg>
  );

  return (
    <div style={{ fontFamily: "var(--font-sans)", width: "100%", ...style }}>
      {title && (
        <div style={{
          fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
          textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12,
        }}>
          {title}
        </div>
      )}

      <div style={{
        display: "flex",
        flexDirection: isList ? "column" : "row",
        flexWrap: isList ? "nowrap" : "wrap",
        gap: isList ? 8 : 10,
      }}>
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect && onSelect(it.label)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => { setHover((h) => (h === i ? -1 : h)); setPress((p) => (p === i ? -1 : p)); }}
            onMouseDown={() => setPress(i)}
            onMouseUp={() => setPress((p) => (p === i ? -1 : p))}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              width: isList ? "100%" : "auto", textAlign: "left",
              padding: isList ? "12px 14px" : "9px 14px",
              borderRadius: isList ? "var(--radius-md)" : "var(--radius-pill)",
              background: hoverable && hover === i ? "var(--surface-hover)" : "var(--surface-card)",
              border: `1px solid ${hoverable && hover === i ? "var(--border-default)" : "var(--border-subtle)"}`,
              boxShadow: "var(--shadow-xs)", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
              fontWeight: "var(--fw-medium)", color: "var(--text-primary)",
              transition: "transform var(--dur-fast) var(--ease-standard), background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)",
              transform: press === i ? "scale(0.98)" : "scale(1)",
            }}
          >
            {spark}
            <span style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ overflow: isList ? "visible" : "hidden", textOverflow: "ellipsis", whiteSpace: isList ? "normal" : "nowrap" }}>
                {it.label}
              </span>
              {isList && it.hint && (
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: "var(--fw-regular)" }}>{it.hint}</span>
              )}
            </span>
            {isList && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
                strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                <path d="M9 6l6 6-6 6" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
