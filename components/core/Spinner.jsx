import React from "react";

/**
 * Alfred AI — Spinner
 * Loading indicator — a warm orange arc sweeping over a quiet track, rotated
 * with SMIL so it keeps spinning in inline-style-only surfaces. Respects
 * prefers-reduced-motion by rendering the arc static. Optional label sits
 * beside it; the accessible name is always set.
 */
export function Spinner({ size = "md", label, tone = "brand", style = {} }) {
  const px = { sm: 16, md: 24, lg: 36 }[size] || 24;
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReduced(mq.matches);
      update();
      if (mq.addEventListener) mq.addEventListener("change", update);
      else if (mq.addListener) mq.addListener(update);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", update);
        else if (mq.removeListener) mq.removeListener(update);
      };
    } catch (e) { /* no matchMedia — leave animated */ }
  }, []);

  const stroke = tone === "muted" ? "var(--text-muted)" : "var(--orange-500)";
  const c = 2 * Math.PI * 9;                    // r = 9 in a 24-unit viewBox
  const arc = (c * (80 / 360)).toFixed(2);      // ~80deg sweep
  const gap = (c - c * (80 / 360)).toFixed(2);

  return (
    <span role="status" aria-label={label || "Loading"} style={{ display: "inline-flex", alignItems: "center", gap: 10, ...style }}>
      <svg width={px} height={px} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: "none" }}>
        <circle cx="12" cy="12" r="9" stroke="var(--border-subtle)" strokeWidth="2.5" />
        <g>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={`${arc} ${gap}`} transform="rotate(-90 12 12)" />
          {!reduced && (
            <animateTransform attributeName="transform" attributeType="XML" type="rotate"
              from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite" />
          )}
        </g>
      </svg>
      {label && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{label}</span>
      )}
    </span>
  );
}
