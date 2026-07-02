import React from "react";

/**
 * Alfred AI — AnimatedCounter
 * Count-up outcome stat for marketing bands. Server-renders the FINAL value
 * (never 0 — fixes the classic SSR-at-zero counter defect), then counts up
 * from zero on mount once the element scrolls into view. Respects
 * prefers-reduced-motion by keeping the static final value.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  label,
  sublabel,
  style = {},
  ...rest
}) {
  const target = Number.isFinite(value) ? value : 0;

  const decimals = React.useMemo(() => {
    const s = String(target);
    const i = s.indexOf(".");
    return i === -1 ? 0 : Math.min(2, s.length - i - 1);
  }, [target]);

  const format = React.useCallback(
    (n) => {
      try {
        return n.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      } catch (e) {
        return String(Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals));
      }
    },
    [decimals]
  );

  // SSR and first paint show the final value; the count-up only ever
  // replaces it after mount, so a non-hydrated page still reads correctly.
  const [display, setDisplay] = React.useState(target);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    let raf = 0;
    let observer = null;
    let cancelled = false;
    let started = false;

    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      reduced = false;
    }

    if (reduced || !(duration > 0) || target === 0 || typeof requestAnimationFrame !== "function") {
      setDisplay(target);
      return undefined;
    }

    const start = () => {
      if (started || cancelled) return;
      started = true;
      const t0 = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
      const tick = (ts) => {
        if (cancelled) return;
        const t = Math.min(1, (ts - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(t < 1 ? target * eased : target);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      setDisplay(0);
      raf = requestAnimationFrame(tick);
    };

    try {
      if (typeof IntersectionObserver !== "undefined" && rootRef.current) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((en) => en.isIntersecting)) {
              if (observer) observer.disconnect();
              observer = null;
              start();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(rootRef.current);
      } else {
        start();
      }
    } catch (e) {
      start();
    }

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, [target, duration]);

  const finalText = `${prefix}${format(target)}${suffix}`;
  const ariaLabel = [finalText, label, sublabel].filter(Boolean).join(" — ");

  return (
    <div
      ref={rootRef}
      role="figure"
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 6,
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--fw-semibold)",
          fontSize: 40,
          lineHeight: 1.05,
          letterSpacing: "var(--ls-tight)",
          fontVariantNumeric: "tabular-nums",
          color: "var(--text-primary)",
        }}
      >
        {`${prefix}${format(display)}${suffix}`}
      </span>
      {label && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
      )}
      {sublabel && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
            lineHeight: "var(--lh-normal)",
            maxWidth: 260,
          }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
