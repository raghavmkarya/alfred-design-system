import React from "react";

/**
 * Alfred AI — AuditLogRow
 * One entry in the audit trail: who did what to which target, and when.
 * Human actors get an initials disc; Alfred gets the logo-dot treatment —
 * a small orange dot inside a soft halo, no robot iconography. An optional
 * detail expands below via an aria-expanded chevron button (grid-rows trick
 * keeps the detail in the DOM for SSR).
 */
export function AuditLogRow({
  actor,
  isAlfred = false,
  action,
  target,
  time,
  detail,
  defaultOpen = false,
  style = {},
  ...rest
}) {
  const uid = React.useId().replace(/:/g, "");
  const btnId = `alr-${uid}-btn`;
  const panelId = `alr-${uid}-panel`;

  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);

  const initials = String(actor || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

  // Detail indent lines the text up under the sentence: row pad 16 + mark 26 + gap 12.
  const INDENT = 54;

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        width: "100%",
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--border-subtle)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
        {/* Actor mark — logo-dot for Alfred, initials disc for people */}
        {isAlfred ? (
          <span
            aria-hidden="true"
            style={{
              width: 26,
              height: 26,
              flex: "none",
              borderRadius: "var(--radius-circle)",
              background: "var(--accent-soft)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "var(--radius-circle)",
                background: "var(--orange-500)",
              }}
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            style={{
              width: 26,
              height: 26,
              flex: "none",
              borderRadius: "var(--radius-circle)",
              background: "var(--surface-sunken)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {initials}
          </span>
        )}

        {/* Sentence: actor — action — target chip */}
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
            lineHeight: "var(--lh-normal)",
          }}
        >
          <span style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{actor}</span>
          {action && <> {action}</>}
          {target && (
            <>
              {" "}
              <span
                style={{
                  display: "inline-block",
                  padding: "1px 8px",
                  background: "var(--surface-sunken)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-pill)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--fw-semibold)",
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  verticalAlign: "baseline",
                }}
              >
                {target}
              </span>
            </>
          )}
        </span>

        {time && (
          <span
            style={{
              flex: "none",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--fw-medium)",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            {time}
          </span>
        )}

        {detail && (
          <button
            type="button"
            id={btnId}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Hide detail" : "Show detail"}
            onClick={() => setOpen((o) => !o)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              flex: "none",
              width: 28,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              border: "none",
              borderRadius: "var(--radius-sm)",
              background: hover ? "var(--surface-sunken)" : "transparent",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "background var(--dur-fast) var(--ease-standard)",
            }}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform var(--dur-base) var(--ease-standard)",
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Collapsible detail — grid-rows trick keeps content in the DOM for SSR */}
      {detail && (
        <div
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows var(--dur-base) var(--ease-standard)",
          }}
        >
          <div
            role="region"
            id={panelId}
            aria-label="Audit detail"
            style={{ overflow: "hidden", minHeight: 0 }}
          >
            <div
              style={{
                padding: `0 16px 14px ${INDENT}px`,
                opacity: open ? 1 : 0,
                transition: "opacity var(--dur-base) var(--ease-standard)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  paddingLeft: 12,
                  borderLeft: "2px solid var(--border-default)",
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  lineHeight: "var(--lh-normal)",
                }}
              >
                {detail}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
