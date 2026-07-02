import React from "react";

/**
 * Alfred AI — CapabilityTicker
 * Horizontal marquee of capability chips for the live product hero: pill chips
 * separated by small orange dots, drifting left in a seamless loop behind edge
 * fade masks. The loop is a rAF-driven transform (no keyframes stylesheets).
 * Under SSR or prefers-reduced-motion it renders a static single row, clipped
 * with the same fade masks; the duplicated run only mounts while animating and
 * is aria-hidden.
 */
export function CapabilityTicker({
  items = [
    "Budget reallocation",
    "CAC diagnosis",
    "Pipeline forecasting",
    "Creative fatigue alerts",
    "Spend pacing guardrails",
    "Channel mix planning",
  ],
  speed = 40,
  label = "Alfred capabilities",
  style = {},
}) {
  const GAP = 14; // px between chips AND between the two runs — keeps the loop seamless
  const trackRef = React.useRef(null);
  const runRef = React.useRef(null);
  // null = unknown (SSR / first paint) → static single row until proven safe to move.
  const [reduced, setReduced] = React.useState(null);

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
    } catch (e) { setReduced(true); /* no matchMedia — stay static */ }
  }, []);

  const animate = reduced === false && items.length > 0 && speed > 0;

  React.useEffect(() => {
    if (!animate) return;
    let raf = 0;
    let offset = 0;
    let last = null;
    const step = (now) => {
      if (last == null) last = now;
      const dt = Math.min(now - last, 64) / 1000; // clamp tab-switch jumps
      last = now;
      const run = runRef.current;
      const cycle = run ? run.offsetWidth + GAP : 0;
      if (cycle > 0) {
        offset = (offset + speed * dt) % cycle;
        if (trackRef.current) {
          trackRef.current.style.transform = "translate3d(" + -offset + "px, 0, 0)";
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      if (trackRef.current) trackRef.current.style.transform = "translate3d(0, 0, 0)";
    };
  }, [animate, speed]);

  const runStyle = {
    display: "flex",
    alignItems: "center",
    gap: GAP,
    listStyle: "none",
    margin: 0,
    padding: 0,
    flex: "none",
  };

  // Each item is chip + separator dot; a trailing dot only renders while the
  // marquee tiles (seamless loop) — the static row ends cleanly on a chip.
  const renderRun = () =>
    items.map((text, i) => (
      <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: GAP, whiteSpace: "nowrap" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: 34,
            padding: "0 14px",
            background: "var(--surface-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-pill)",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)",
            lineHeight: 1,
          }}
        >
          {text}
        </span>
        {(animate || i < items.length - 1) && (
          <span
            aria-hidden="true"
            style={{
              width: 5,
              height: 5,
              flex: "none",
              borderRadius: "var(--radius-circle)",
              background: "var(--orange-400)",
            }}
          />
        )}
      </li>
    ));

  const fadeMask =
    "linear-gradient(90deg, transparent 0, black 40px, black calc(100% - 40px), transparent 100%)";

  return (
    <div
      style={{
        overflow: "hidden",
        maxWidth: "100%",
        padding: "6px 0",
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
        ...style,
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: GAP,
          width: "max-content",
          willChange: animate ? "transform" : "auto",
        }}
      >
        <ul ref={runRef} role="list" aria-label={label} style={runStyle}>
          {renderRun()}
        </ul>
        {animate && (
          <ul role="list" aria-hidden="true" style={runStyle}>
            {renderRun()}
          </ul>
        )}
      </div>
    </div>
  );
}
