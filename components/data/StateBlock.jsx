import React from "react";
import { Button } from "../core/Button.jsx";
import { Spinner } from "../core/Spinner.jsx";

/**
 * Alfred AI — StateBlock
 * Unified empty / error / loading block for any surface — panels, tables,
 * cards, full views. `loading` composes the Spinner inside a polite status
 * region, `error` is an assertive alert with danger accents and a retry
 * action, `empty` stays neutral with a next-step action. Copy defaults speak
 * in Alfred's first person; pass `icon` to override the per-kind glyph.
 */
export function StateBlock({
  kind = "empty",
  title,
  body,
  action,
  icon,
  compact = false,
  style = {},
}) {
  const defaults = {
    empty: {
      title: "All clear",
      body: "I haven't found any alerts today — you're all caught up.",
    },
    error: {
      title: "I hit a snag",
      body: "I couldn't load this view — retry and I'll pull the data again.",
    },
    loading: {
      title: "One moment",
      body: "I'm pulling your latest numbers together.",
    },
  };
  const k = defaults[kind] ? kind : "empty";
  const heading = title || defaults[k].title;
  const copy = body === undefined ? defaults[k].body : body;

  const glyphSize = compact ? 18 : 24;
  const glyphs = {
    empty: (
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
    error: (
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  };

  // danger-500 at 12% — same soft danger fill Callout uses; reads in both themes
  const chipBg = k === "error" ? "rgba(229,72,77,0.12)" : "var(--accent-soft)";
  const chipColor = k === "error" ? "var(--danger-500)" : "var(--orange-500)";

  const live =
    k === "error"
      ? { role: "alert" }
      : k === "loading"
        ? { role: "status", "aria-live": "polite", "aria-busy": true }
        : {};

  return (
    <div
      {...live}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 6,
        padding: compact ? "24px 16px" : "48px 24px",
        ...style,
      }}
    >
      {k === "loading" && !icon ? (
        <span aria-hidden="true" style={{ display: "inline-flex", marginBottom: compact ? 4 : 8 }}>
          <Spinner size={compact ? "md" : "lg"} />
        </span>
      ) : (
        <div
          style={{
            width: compact ? 40 : 56,
            height: compact ? 40 : 56,
            borderRadius: "var(--radius-xl)",
            background: chipBg,
            color: chipColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: compact ? 4 : 8,
            flex: "none",
          }}
        >
          {icon || glyphs[k] || glyphs.empty}
        </div>
      )}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--fw-semibold)",
          fontSize: compact ? "var(--text-lg)" : "var(--text-h4)",
          color: "var(--text-primary)",
          letterSpacing: "var(--ls-tight)",
        }}
      >
        {heading}
      </div>
      {copy && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: compact ? "var(--text-sm)" : "var(--text-base)",
            color: "var(--text-muted)",
            maxWidth: 360,
            margin: "2px 0 0",
            lineHeight: "var(--lh-normal)",
          }}
        >
          {copy}
        </p>
      )}
      {action && action.label && (
        <div style={{ marginTop: compact ? 10 : 14 }}>
          <Button variant="primary" size={compact ? "sm" : "md"} onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
