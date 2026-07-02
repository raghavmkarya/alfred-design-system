import React from "react";

/**
 * Alfred AI — Countdown
 * Launch countdown for the live waitlist: DD:HH:MM:SS blocks in Clash Display
 * tabular numerals with small tracked labels. Server-renders a deterministic
 * "00" state, then hydrates to a live once-per-second tick.
 */
export function Countdown({
  target,
  labels = true,
  size = "md",
  style = {},
  ...rest
}) {
  const targetMs = React.useMemo(() => {
    if (target == null) return null;
    const t = typeof target === "number" ? target : Date.parse(target);
    return Number.isFinite(t) ? t : null;
  }, [target]);

  // null = not yet hydrated → deterministic "00" fallback on the server.
  const [now, setNow] = React.useState(null);

  React.useEffect(() => {
    if (targetMs == null) return undefined;
    setNow(Date.now());
    if (targetMs - Date.now() <= 0) return undefined;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= targetMs) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const live = targetMs != null && now != null;
  const totalSeconds = live ? Math.max(0, Math.floor((targetMs - now) / 1000)) : 0;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");

  const blocks = [
    { unit: "Days", value: pad(days) },
    { unit: "Hours", value: pad(hours) },
    { unit: "Minutes", value: pad(minutes) },
    { unit: "Seconds", value: pad(seconds) },
  ];

  const sizes = {
    sm: { digit: 24, pad: "8px 10px", minWidth: 46, label: 10, gap: 6, colGap: 8 },
    md: { digit: 40, pad: "12px 14px", minWidth: 74, label: 11, gap: 8, colGap: 10 },
    lg: { digit: 56, pad: "16px 18px", minWidth: 100, label: 12, gap: 10, colGap: 12 },
  };
  const s = sizes[size] || sizes.md;

  const ariaLabel = live
    ? `Launch countdown: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`
    : "Launch countdown";

  const digitStyle = {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--fw-semibold)",
    fontSize: s.digit,
    lineHeight: 1,
    letterSpacing: "var(--ls-tight)",
    fontVariantNumeric: "tabular-nums",
    color: "var(--text-primary)",
  };

  return (
    <div
      role="timer"
      aria-label={ariaLabel}
      style={{ display: "inline-flex", flexDirection: "column", gap: s.gap, ...style }}
      {...rest}
    >
      <div aria-hidden="true" style={{ display: "inline-flex", alignItems: "flex-start", gap: s.colGap }}>
        {blocks.map((b, i) => (
          <React.Fragment key={b.unit}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: s.gap }}>
              <span
                style={{
                  ...digitStyle,
                  display: "inline-flex",
                  justifyContent: "center",
                  minWidth: s.minWidth,
                  padding: s.pad,
                  background: "var(--surface-sunken)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  transition: "color var(--dur-fast) var(--ease-standard)",
                }}
              >
                {b.value}
              </span>
              {labels && (
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: s.label,
                    fontWeight: "var(--fw-bold)",
                    letterSpacing: "var(--ls-caps)",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {b.unit}
                </span>
              )}
            </div>
            {i < blocks.length - 1 && (
              <span style={{ ...digitStyle, color: "var(--text-muted)", padding: `${s.pad.split(" ")[0]} 0` }}>:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
