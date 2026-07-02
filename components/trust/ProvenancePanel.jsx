import React from "react";
import { ConfidenceMeter } from "../trust/ConfidenceMeter.jsx";
import { SourceTrace } from "../trust/SourceTrace.jsx";

/**
 * Alfred AI — ProvenancePanel
 * The glass-box primitive: a "How I know this" disclosure that ships with any
 * insight. The header is a real button carrying an eye icon, the confidence %
 * chip and freshness; the panel eases open (grid-rows trick) to reveal the
 * one-line method, a ConfidenceMeter and a SourceTrace of connected sources.
 */
export function ProvenancePanel({
  sources = [],
  confidence = 0,
  method,
  updated,
  defaultOpen = false,
  style = {},
}) {
  const uid = React.useId().replace(/:/g, "");
  const headId = `prov-${uid}-head`;
  const panelId = `prov-${uid}-panel`;

  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);

  const raw = typeof confidence === "number" ? confidence : Number(confidence) || 0;
  const pct = Math.max(0, Math.min(100, Math.round(raw)));
  const tone =
    pct >= 70 ? "var(--success-500)" : pct >= 40 ? "var(--warning-500)" : "var(--danger-500)";

  const eyebrow = {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-2xs)",
    fontWeight: "var(--fw-bold)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    color: "var(--text-muted)",
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        width: "100%",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        overflow: "hidden",
        boxShadow: "var(--shadow-xs)",
        ...style,
      }}
    >
      {/* Disclosure header */}
      <button
        type="button"
        id={headId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "14px 18px",
          border: "none",
          textAlign: "left",
          background: hover ? "var(--surface-sunken)" : "transparent",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          transition: "background var(--dur-fast) var(--ease-standard)",
        }}
      >
        {/* Eye — the glass-box mark */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{ flex: "none", color: "var(--text-secondary)" }}
        >
          <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-semibold)",
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          How I know this
        </span>

        {/* Confidence % chip */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            flex: "none",
            padding: "3px 10px",
            background: "var(--surface-sunken)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "var(--radius-circle)", background: tone }} />
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--fw-bold)",
              color: tone,
              lineHeight: 1.4,
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            {pct}%
          </span>
        </span>

        {updated && (
          <span
            style={{
              flex: "none",
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-medium)",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            Updated {updated}
          </span>
        )}

        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{
            flex: "none",
            color: "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--dur-base) var(--ease-standard)",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Collapsible panel — grid-rows trick keeps content in the DOM for SSR */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--dur-base) var(--ease-standard)",
        }}
      >
        <div role="region" id={panelId} aria-labelledby={headId} style={{ overflow: "hidden", minHeight: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              padding: "4px 18px 18px",
              borderTop: "1px solid var(--border-subtle)",
              paddingTop: 14,
              opacity: open ? 1 : 0,
              transition: "opacity var(--dur-base) var(--ease-standard)",
            }}
          >
            {method && (
              <div>
                <div style={{ ...eyebrow, marginBottom: 6 }}>Method</div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {method}
                </p>
              </div>
            )}

            <ConfidenceMeter value={pct} label="Causal confidence" size="sm" />

            <SourceTrace sources={sources} layout="row" />
          </div>
        </div>
      </div>
    </div>
  );
}
