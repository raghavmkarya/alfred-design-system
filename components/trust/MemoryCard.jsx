import React from "react";

/* Category → chip dot color. "Compounding" earns the brand gradient —
   memories whose value compounds are the signature accent of the view. */
const CATEGORY_DOT = {
  "Root cause": "var(--accent)",
  Institutional: "var(--info-500)",
  "Cross-function": "var(--success-500)",
  Compounding: "var(--gradient-brand)",
};

function MemoryIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flex: "none" }}
    >
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  );
}

function CheckIcon({ size = 13, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flex: "none" }}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Alfred AI — MemoryCard
 * One item of Alfred Core memory — what Alfred knows about your org. Shows the
 * learned fact, where it came from ("Learned from HubSpot · Mar 12") and a
 * category chip, with small text actions to confirm, edit or remove the memory.
 * Confirming swaps the button for a green check and announces it politely.
 */
export function MemoryCard({
  fact,
  source,
  category,
  onConfirm,
  onEdit,
  onRemove,
  style = {},
}) {
  const [hovered, setHovered] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const confirmedNote = "Confirmed — I'll keep relying on this.";

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    if (typeof onConfirm === "function") onConfirm();
  };

  const showConfirm = confirmed || typeof onConfirm === "function";
  const showEdit = typeof onEdit === "function";
  const showRemove = typeof onRemove === "function";
  const hasFooter = showConfirm || showEdit || showRemove;

  const actionBtn = (key, { color, hoverColor, weight }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 28,
    padding: "0 10px",
    border: "1px solid transparent",
    borderRadius: "var(--radius-md)",
    background: hovered === key ? "var(--surface-sunken)" : "transparent",
    color: hovered === key ? hoverColor : color,
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: weight,
    lineHeight: 1,
    cursor: "pointer",
    transition:
      "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
    whiteSpace: "nowrap",
    userSelect: "none",
  });

  const visuallyHidden = {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    border: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
  };

  return (
    <article
      aria-label="Alfred memory"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
        boxSizing: "border-box",
        padding: 18,
        fontFamily: "var(--font-sans)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-xs)",
        ...style,
      }}
    >
      {/* Header — memory mark, eyebrow, category chip */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            flex: "none",
            background: "var(--surface-sunken)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-secondary)",
          }}
        >
          <MemoryIcon />
        </span>

        <span
          style={{
            fontSize: "var(--text-2xs)",
            fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Memory
        </span>

        {category ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              flex: "none",
              marginLeft: "auto",
              padding: "3px 10px",
              background: "var(--surface-sunken)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-pill)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--fw-semibold)",
              lineHeight: 1.4,
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                flex: "none",
                borderRadius: "var(--radius-circle)",
                background: CATEGORY_DOT[category] || "var(--border-strong)",
              }}
            />
            {category}
          </span>
        ) : null}
      </div>

      {/* The learned fact */}
      <p
        style={{
          margin: 0,
          fontSize: "var(--text-sm)",
          fontWeight: "var(--fw-medium)",
          lineHeight: 1.55,
          color: "var(--text-primary)",
        }}
      >
        {fact}
      </p>

      {/* Provenance line */}
      <span
        style={{
          fontSize: "var(--text-xs)",
          fontWeight: "var(--fw-medium)",
          color: "var(--text-muted)",
        }}
      >
        {source}
      </span>

      {/* Actions */}
      {hasFooter ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            paddingTop: 10,
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          {confirmed ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 28,
                padding: "0 10px",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--fw-semibold)",
                lineHeight: 1,
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              <CheckIcon color="var(--success-500)" />
              Confirmed
            </span>
          ) : showConfirm ? (
            <button
              type="button"
              onClick={handleConfirm}
              onMouseEnter={() => setHovered("confirm")}
              onMouseLeave={() => setHovered(null)}
              style={actionBtn("confirm", {
                color: "var(--text-primary)",
                hoverColor: "var(--text-primary)",
                weight: "var(--fw-semibold)",
              })}
            >
              <CheckIcon color="var(--success-500)" />
              Confirm
            </button>
          ) : null}

          {showEdit ? (
            <button
              type="button"
              onClick={onEdit}
              onMouseEnter={() => setHovered("edit")}
              onMouseLeave={() => setHovered(null)}
              style={actionBtn("edit", {
                color: "var(--text-secondary)",
                hoverColor: "var(--text-primary)",
                weight: "var(--fw-medium)",
              })}
            >
              Edit
            </button>
          ) : null}

          {showRemove ? (
            <button
              type="button"
              onClick={onRemove}
              onMouseEnter={() => setHovered("remove")}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...actionBtn("remove", {
                  color: "var(--text-secondary)",
                  hoverColor: "var(--danger-500)",
                  weight: "var(--fw-medium)",
                }),
                marginLeft: "auto",
              }}
            >
              Remove
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Polite announcement once the memory is confirmed */}
      <span aria-live="polite" style={visuallyHidden}>
        {confirmed ? confirmedNote : ""}
      </span>
    </article>
  );
}
