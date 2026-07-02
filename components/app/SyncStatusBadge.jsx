import React from "react";

/**
 * Alfred AI — SyncStatusBadge
 * The small sync-status pill reused across connection surfaces (integration
 * rows, source panels, settings). A colored dot plus one short word: fresh
 * data is "Live" (green), an active sync is "Syncing" (warm orange, gentle
 * pulse), aged data goes quiet ("Stale", gray) and a broken connection asks
 * for action ("Reconnect needed", red). The pulse is a CSS keyframe scoped
 * by a unique useId class and switches off under prefers-reduced-motion,
 * where the static dot + halo still reads complete.
 */
export function SyncStatusBadge({ status = "fresh", label, size = "md", style = {} }) {
  const STATUS = {
    fresh:   { dot: "var(--success-500)", fg: "var(--success-500)",   word: "Live",             pulse: false },
    syncing: { dot: "var(--warning-500)", fg: "var(--warning-500)",   word: "Syncing",          pulse: true },
    stale:   { dot: "var(--text-muted)",  fg: "var(--text-secondary)", word: "Stale",           pulse: false },
    error:   { dot: "var(--danger-500)",  fg: "var(--danger-500)",    word: "Reconnect needed", pulse: false },
  };
  const s = STATUS[status] || STATUS.fresh;
  const word = label != null ? label : s.word;

  const SIZES = {
    sm: { font: "var(--text-2xs)", dot: 6, gap: 6, padding: "3px 9px 3px 8px" },
    md: { font: "var(--text-xs)", dot: 8, gap: 7, padding: "5px 11px 5px 9px" },
  };
  const z = SIZES[size] || SIZES.md;

  const uid = React.useId().replace(/:/g, "");
  const cls = `ssb-${uid}`;

  const dotBase = {
    position: "absolute", left: "50%", top: "50%",
    width: z.dot, height: z.dot, borderRadius: "var(--radius-circle)",
    background: s.dot, transform: "translate(-50%, -50%)",
  };

  return (
    <span
      role="status"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: z.gap,
        padding: z.padding,
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-xs)",
        fontFamily: "var(--font-sans)",
        fontSize: z.font,
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {s.pulse && (
        <style>{`
          @keyframes ${cls}-pulse {
            0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
            70%  { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
          }
          .${cls}-ring { animation: ${cls}-pulse 1.8s var(--ease-standard) infinite; }
          @media (prefers-reduced-motion: reduce) {
            .${cls}-ring { animation: none; opacity: 0; }
          }
        `}</style>
      )}

      <span aria-hidden="true" style={{ position: "relative", width: z.dot, height: z.dot, flex: "none" }}>
        {s.pulse && <span className={`${cls}-ring`} style={dotBase} />}
        <span
          style={{
            ...dotBase,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${s.dot} 18%, transparent)`,
          }}
        />
      </span>

      <span style={{ fontWeight: "var(--fw-bold)", color: s.fg, letterSpacing: "0.01em" }}>
        {word}
      </span>
    </span>
  );
}
