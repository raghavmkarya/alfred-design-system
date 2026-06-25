import React from "react";

/**
 * Alfred AI — DataFreshness
 * A compact trust indicator. Silent stale data is a trust failure, so I
 * surface it: a status dot (fresh = live green pulse, syncing = amber,
 * stale = red), the line "Synced <updatedAgo>" and, when a source count is
 * given, "· <count> sources live". Self-contained — the pulse is a CSS
 * keyframe scoped by a unique useId class, no external timers.
 */
export function DataFreshness({
  updatedAgo = "just now",
  count,
  status = "fresh",
  label,
  style = {},
}) {
  const STATUS = {
    fresh:   { color: "var(--success-500)", word: "",        pulse: true },
    syncing: { color: "var(--warning-500)", word: "Syncing", pulse: false },
    stale:   { color: "var(--danger-500)",  word: "Stale",   pulse: false },
  };
  const s = STATUS[status] || STATUS.fresh;
  const word = label != null ? label : s.word;

  const uid = React.useId().replace(/:/g, "");
  const cls = `df-${uid}`;

  const dotBase = {
    position: "absolute", left: "50%", top: "50%",
    width: 8, height: 8, borderRadius: "var(--radius-circle)",
    background: s.color, transform: "translate(-50%, -50%)",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 11px 5px 9px",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-xs)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <style>{`
        @keyframes ${cls}-pulse {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.55; }
          70%  { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
        }
        .${cls}-ring { animation: ${cls}-pulse 2.1s var(--ease-standard) infinite; }
        @media (prefers-reduced-motion: reduce) { .${cls}-ring { animation: none; } }
      `}</style>

      <span style={{ position: "relative", width: 8, height: 8, flex: "none" }}>
        {s.pulse && <span className={`${cls}-ring`} style={dotBase} />}
        <span
          style={{
            ...dotBase,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${s.color} 18%, transparent)`,
          }}
        />
      </span>

      {word ? (
        <span style={{ fontWeight: "var(--fw-bold)", color: s.color, letterSpacing: "0.01em" }}>
          {word}
        </span>
      ) : null}

      <span style={{ color: "var(--text-secondary)", fontWeight: "var(--fw-medium)" }}>
        Synced {updatedAgo}
      </span>

      {count != null ? (
        <span style={{ color: "var(--text-muted)" }}>
          · {count} {count === 1 ? "source" : "sources"} live
        </span>
      ) : null}
    </span>
  );
}
