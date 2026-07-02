import React from "react";
import { Spinner } from "../core/Spinner.jsx";

/**
 * Alfred AI — ReasoningState
 * Branded "Alfred is reasoning" loading treatment for Seek Alfred surfaces.
 * The gradient spark mark leads, a status line narrates what Alfred is doing
 * right now ("Reading your spend data…"), and a small spinner plus an optional
 * elapsed tag sit at the trailing edge. Server render shows the first line and
 * the spinner statically; an effect rotates through the lines every ~1.8s
 * (paused when the user prefers reduced motion). `compact` drops the strip
 * chrome for inline use next to a message.
 */
export function ReasoningState({
  lines = ["Reading your spend data…", "Isolating what changed…", "Drafting the move…"],
  elapsed,
  compact = false,
  style = {},
}) {
  const safe = Array.isArray(lines) && lines.length > 0
    ? lines
    : ["Reading your spend data…", "Isolating what changed…", "Drafting the move…"];

  const [index, setIndex] = React.useState(0);
  const [entering, setEntering] = React.useState(true); // false during the swap fade

  React.useEffect(() => {
    if (safe.length < 2) return;
    let reduced = false;
    try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { /* leave animated */ }
    if (reduced) return; // static first line is a complete state
    let swap;
    const tick = setInterval(() => {
      setEntering(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % safe.length);
        setEntering(true);
      }, 180);
    }, 1800);
    return () => { clearInterval(tick); clearTimeout(swap); };
  }, [safe.length]);

  const line = (
    <span
      style={{
        display: "block", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        opacity: entering ? 1 : 0,
        transform: entering ? "translateY(0)" : "translateY(-4px)",
        transition: "opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
      }}
    >
      {safe[index % safe.length]}
    </span>
  );

  const elapsedTag = elapsed ? (
    <span style={{
      flex: "none", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)",
    }}>
      {elapsed}
    </span>
  ) : null;

  if (compact) {
    return (
      <span
        role="status"
        aria-live="polite"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8, maxWidth: "100%",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", ...style,
        }}
      >
        <span aria-hidden="true" style={{ display: "inline-flex", flex: "none" }}>
          <Spinner size="sm" />
        </span>
        {line}
        {elapsedTag}
      </span>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "inline-flex", alignItems: "center", gap: 12, maxWidth: "100%", boxSizing: "border-box",
        padding: "10px 14px", background: "var(--surface-sunken)",
        border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
        fontFamily: "var(--font-sans)", ...style,
      }}
    >
      {/* Alfred spark mark */}
      <span aria-hidden="true" style={{
        width: 26, height: 26, flex: "none", borderRadius: "var(--radius-sm)",
        background: "var(--gradient-brand)", color: "var(--text-on-brand)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z" fill="currentColor" />
        </svg>
      </span>

      <span style={{
        minWidth: 0, flex: 1, fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
        color: "var(--text-secondary)", lineHeight: "var(--lh-normal)",
      }}>
        {line}
      </span>

      <span aria-hidden="true" style={{ display: "inline-flex", flex: "none" }}>
        <Spinner size="sm" />
      </span>
      {elapsedTag}
    </div>
  );
}
