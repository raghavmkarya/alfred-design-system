import React from "react";

function ThumbIcon({ down = false, size = 15 }) {
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
      {down ? (
        <>
          <path d="M17 14V2" />
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
        </>
      ) : (
        <>
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </>
      )}
    </svg>
  );
}

/**
 * Alfred AI — InsightFeedback
 * Rate-an-insight control: "Was this useful?" with thumbs up / down. A negative
 * verdict offers optional reason chips ("Wrong data", "Not relevant", "Already
 * knew") or skip. Once chosen, Alfred thanks you in first person and the
 * message is announced politely to assistive tech.
 */
export function InsightFeedback({
  onFeedback,
  question = "Was this useful?",
  reasons = ["Wrong data", "Not relevant", "Already knew"],
  compact = false,
  style = {},
}) {
  const [stage, setStage] = React.useState("idle"); // idle → reason → done
  const [hovered, setHovered] = React.useState(null);
  const [pressed, setPressed] = React.useState(null);
  const firstReasonRef = React.useRef(null);

  // Hover treatment is mirrored onto keyboard focus, and press mirrors the
  // house Button (scale 0.98). Shared handlers keep every pressable in step.
  const pressable = (key) => ({
    onMouseEnter: () => setHovered(key),
    onMouseLeave: () => {
      setHovered(null);
      setPressed(null);
    },
    onFocus: () => setHovered(key),
    onBlur: () => {
      setHovered(null);
      setPressed(null);
    },
    onMouseDown: () => setPressed(key),
    onMouseUp: () => setPressed(null),
  });

  const thanks = "Thanks — I'll learn from this.";
  const reasonPrompt = "Got it — what did I get wrong?";

  const fire = (verdict, reason) => {
    if (typeof onFeedback === "function") onFeedback(verdict, reason);
  };

  const choose = (verdict) => {
    if (stage !== "idle") return;
    if (verdict === "useful") {
      fire("useful");
      setStage("done");
    } else if (Array.isArray(reasons) && reasons.length > 0) {
      setStage("reason");
    } else {
      fire("not-useful");
      setStage("done");
    }
  };

  // Keep keyboard focus alive when the thumb buttons are swapped for chips.
  React.useEffect(() => {
    if (stage === "reason" && firstReasonRef.current) firstReasonRef.current.focus();
  }, [stage]);

  const font = {
    fontFamily: "var(--font-sans)",
    fontSize: compact ? "var(--text-xs)" : "var(--text-sm)",
    fontWeight: "var(--fw-medium)",
  };

  const thumbBtn = (key) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: compact ? 0 : 7,
    height: compact ? 28 : 32,
    padding: compact ? "0 8px" : "0 12px",
    borderRadius: "var(--radius-pill)",
    border: `1px solid ${hovered === key ? "var(--border-default)" : "var(--border-subtle)"}`,
    background: hovered === key ? "var(--surface-hover)" : "transparent",
    color: hovered === key ? "var(--text-primary)" : "var(--text-secondary)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-medium)",
    lineHeight: 1,
    cursor: "pointer",
    transform: pressed === key ? "scale(0.98)" : "scale(1)",
    transition:
      "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
    whiteSpace: "nowrap",
    userSelect: "none",
  });

  const reasonChip = (key) => ({
    display: "inline-flex",
    alignItems: "center",
    height: compact ? 26 : 28,
    padding: "0 12px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    background: hovered === key ? "var(--accent-soft)" : "var(--gray-100)",
    color: hovered === key ? "var(--text-on-tint-brand)" : "var(--text-secondary)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-medium)",
    lineHeight: 1,
    cursor: "pointer",
    transform: pressed === key ? "scale(0.98)" : "scale(1)",
    transition:
      "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
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
    <div
      role="group"
      aria-label={question}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: compact ? 6 : 8,
        maxWidth: "100%",
        ...style,
      }}
    >
      {stage === "idle" ? (
        <div style={{ display: "flex", alignItems: "center", gap: compact ? 8 : 10, flexWrap: "wrap" }}>
          <span style={{ ...font, color: "var(--text-secondary)" }}>{question}</span>
          <span style={{ display: "inline-flex", gap: 6 }}>
            <button
              type="button"
              aria-label="Useful"
              onClick={() => choose("useful")}
              {...pressable("up")}
              style={thumbBtn("up")}
            >
              <ThumbIcon size={compact ? 14 : 15} />
              {compact ? null : "Useful"}
            </button>
            <button
              type="button"
              aria-label="Not useful"
              onClick={() => choose("not-useful")}
              {...pressable("down")}
              style={thumbBtn("down")}
            >
              <ThumbIcon down size={compact ? 14 : 15} />
              {compact ? null : "Not useful"}
            </button>
          </span>
        </div>
      ) : null}

      {stage === "reason" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: compact ? 6 : 8 }}>
          <span style={{ ...font, color: "var(--text-secondary)" }}>{reasonPrompt}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {reasons.map((reason, i) => (
              <button
                key={reason}
                type="button"
                ref={i === 0 ? firstReasonRef : null}
                onClick={() => {
                  fire("not-useful", reason);
                  setStage("done");
                }}
                {...pressable(`r-${i}`)}
                style={reasonChip(`r-${i}`)}
              >
                {reason}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                fire("not-useful");
                setStage("done");
              }}
              {...pressable("skip")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: compact ? 26 : 28,
                padding: "0 8px",
                border: "1px solid transparent",
                borderRadius: "var(--radius-pill)",
                background: "transparent",
                color: hovered === "skip" ? "var(--text-secondary)" : "var(--text-muted)",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--fw-medium)",
                lineHeight: 1,
                cursor: "pointer",
                transform: pressed === "skip" ? "scale(0.98)" : "scale(1)",
                transition:
                  "color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              Skip
            </button>
          </div>
        </div>
      ) : null}

      {stage === "done" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg
            width={compact ? 14 : 16}
            height={compact ? 14 : 16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--success-500)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            style={{ flex: "none" }}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span style={{ ...font, color: "var(--text-secondary)" }}>{thanks}</span>
        </div>
      ) : null}

      {/* Persistent polite live region — announces the thanks once a verdict lands. */}
      <span aria-live="polite" style={visuallyHidden}>
        {stage === "done" ? thanks : ""}
      </span>
    </div>
  );
}
