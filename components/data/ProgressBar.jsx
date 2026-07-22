import React from "react";

/**
 * Alfred AI — ProgressBar
 * The signature periwinkle→orange gradient track used for onboarding,
 * goal pacing and load states. `tone="plain"` renders a solid orange fill.
 */
export function ProgressBar({ value = 0, height = 8, tone = "gradient", showTrack = true, style = {} }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{
      width: "100%", height, borderRadius: "var(--radius-pill)",
      background: showTrack ? "var(--border-default)" : "transparent", overflow: "hidden", ...style,
    }}>
      <div style={{
        width: `${pct}%`, height: "100%", borderRadius: "var(--radius-pill)",
        background: tone === "gradient" ? "var(--gradient-brand-reverse)" : "var(--accent)",
        transition: "width var(--dur-slow) var(--ease-standard)",
      }} />
    </div>
  );
}
