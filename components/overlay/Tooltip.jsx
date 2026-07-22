import React from "react";

/**
 * Alfred AI — Tooltip
 * Wraps a trigger and reveals a small ink label on hover/focus. The label is
 * announced via aria-describedby while visible. Use for terse clarifications
 * (what a KPI means, an icon-button's action). Keep labels to a few words —
 * anything longer belongs in a Popover.
 *
 * Open timing: the tip waits OPEN_DELAY before appearing so a pointer sweeping
 * across a row of icons doesn't flash every label. A lightweight module-scoped
 * delay group makes sibling tips feel connected — once ANY tooltip is open (or
 * closed within GROUP_GRACE), the next one opens INSTANTLY; when the group has
 * gone cold, the delay applies again. This is hover-intent timing, not motion,
 * so it is independent of the enter animation and of prefers-reduced-motion.
 */

// ~300ms hover-intent delay before a cold tooltip opens.
const OPEN_DELAY = 300;
// ~300ms grace window after the group was last active, during which siblings
// open with no delay.
const GROUP_GRACE = 300;

// Shared delay group (module-scoped, intentionally not React state — it is a
// cross-instance coordination signal, not render data).
let groupOpenCount = 0; // how many tooltips are open right now
let groupLastActiveAt = 0; // timestamp of the last open/close in the group

function groupIsWarm() {
  return groupOpenCount > 0 || Date.now() - groupLastActiveAt < GROUP_GRACE;
}

export function Tooltip({ label, placement = "top", children, style = {} }) {
  const [show, setShow] = React.useState(false);
  const rawId = React.useId();
  const tipId = rawId;
  const cls = `tt${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const timerRef = React.useRef(null);
  const openRef = React.useRef(false); // this instance's contribution to the group

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const doOpen = React.useCallback(() => {
    if (!openRef.current) {
      openRef.current = true;
      groupOpenCount += 1;
      groupLastActiveAt = Date.now();
    }
    setShow(true);
  }, []);

  const requestOpen = React.useCallback(() => {
    clearTimer();
    if (groupIsWarm()) {
      doOpen();
    } else {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        doOpen();
      }, OPEN_DELAY);
    }
  }, [clearTimer, doOpen]);

  const requestClose = React.useCallback(() => {
    clearTimer();
    if (openRef.current) {
      openRef.current = false;
      groupOpenCount = Math.max(0, groupOpenCount - 1);
      groupLastActiveAt = Date.now();
    }
    setShow(false);
  }, [clearTimer]);

  // On unmount, drop any pending timer and this instance's group contribution
  // so a tooltip that disappears while open can't leave the group warm forever.
  React.useEffect(() => {
    return () => {
      clearTimer();
      if (openRef.current) {
        openRef.current = false;
        groupOpenCount = Math.max(0, groupOpenCount - 1);
        groupLastActiveAt = Date.now();
      }
    };
  }, [clearTimer]);

  const pos = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
  };
  // Grow the tip from the edge nearest its trigger.
  const origin = {
    top: "bottom center",
    bottom: "top center",
    left: "right center",
    right: "left center",
  };

  return (
    <span
      aria-describedby={show ? tipId : undefined}
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={requestOpen} onMouseLeave={requestClose}
      onFocus={requestOpen} onBlur={requestClose}
    >
      {children}
      {show && (
        <>
          <style>{`
            @keyframes ${cls}-in { from { opacity: 0; } to { opacity: 1; } }
            .${cls} { animation: ${cls}-in var(--dur-fast) var(--ease-standard); }
          `}</style>
          <span role="tooltip" id={tipId} className={cls} style={{
            position: "absolute", zIndex: "var(--z-tooltip)", whiteSpace: "nowrap", background: "var(--surface-tooltip)", color: "var(--text-on-tooltip)",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-medium)",
            padding: "6px 10px", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-md)", pointerEvents: "none",
            transformOrigin: origin[placement],
            ...pos[placement],
          }}>{label}</span>
        </>
      )}
    </span>
  );
}
