import React from "react";

/**
 * Alfred AI — DashboardMock
 * Marketing-site product mock: the embedded Daily Brief triage card from the
 * live module page, framed in dark browser chrome (three dots + url pill).
 * KPI row, gradient portfolio-health ring, and a P1/P2/P3 action queue with
 * KILL / SCALE / Continue chips. Purely presentational (role="img") — every
 * value is prop-driven with canonical demo defaults. The panel is
 * intentionally dark in both themes, like the live embed.
 */
export function DashboardMock({
  url = "app.seekalfred.ai",
  kpis,
  score = 72,
  actions,
  style = {},
  ...rest
}) {
  const gradId = "dm-grad-" + React.useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const kpiData = kpis || [
    { label: "Spend today", value: "$48.2K", delta: "+6.4% vs plan", tone: "neutral" },
    { label: "Blended ROAS", value: "3.4x", delta: "-0.2 WoW", tone: "bad" },
    { label: "CAC", value: "$142", delta: "+$18 WoW", tone: "bad" },
  ];
  const queue = actions || [
    { severity: "P1", insight: "Campaign burning $4.8K with zero conversions", detail: "Meta — prospecting, US broad", action: "KILL" },
    { severity: "P2", insight: "Brand search ROAS at 6.1x — headroom to scale +20%", detail: "Google Ads — brand exact", action: "SCALE" },
    { severity: "P3", insight: "Hero creative fatiguing — CTR down 12% this week", detail: "TikTok — spark ads", action: "Continue" },
  ];
  const urgentCount = queue.filter((a) => a.severity === "P1").length;

  // White-alpha helper — keeps every tint token-driven.
  const whiteA = (pct) => `color-mix(in srgb, var(--white) ${pct}%, transparent)`;
  const hairline = `1px solid ${whiteA(9)}`;

  const SEVERITY = {
    P1: "var(--urgent-500)",
    P2: "var(--orange-500)",
    P3: "var(--periwinkle-400)",
  };
  const deltaColor = { good: "var(--success-500)", bad: "var(--urgent-500)", neutral: whiteA(55) };
  const actionTone = (label) => {
    const s = String(label || "");
    if (/kill|pause|stop/i.test(s)) return "var(--urgent-500)";
    if (/scale|approve/i.test(s)) return "var(--success-500)";
    return null; // neutral
  };

  // —— Score ring geometry ——
  const pct = Math.max(0, Math.min(100, Number(score) || 0));
  const RING = 58, STROKE = 5;
  const r = (RING - STROKE) / 2;
  const c = 2 * Math.PI * r;

  const capsLabel = {
    fontSize: "var(--text-2xs)",
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    color: whiteA(48),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const tile = {
    background: "var(--ink-875)",
    border: `1px solid ${whiteA(7)}`,
    borderRadius: "var(--radius-md)",
    minWidth: 0,
  };

  const lockIcon = (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );

  return (
    <div
      role="img"
      aria-label="Product preview"
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--ink-950)",
        border: `1px solid ${whiteA(11)}`,
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-xl)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {/* —— Browser chrome —— */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "var(--ink-925)", borderBottom: hairline }}>
        <span aria-hidden="true" style={{ display: "inline-flex", gap: 6, flex: "none" }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "var(--radius-circle)", background: whiteA(18) }} />
          ))}
        </span>
        <span style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px",
            borderRadius: "var(--radius-pill)", background: whiteA(6), border: `1px solid ${whiteA(8)}`,
            fontSize: "var(--text-2xs)", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-wide)",
            color: whiteA(62), whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {lockIcon}
            {url}
          </span>
        </span>
        <span aria-hidden="true" style={{ width: 36, flex: "none" }} />
      </div>

      {/* —— Panel body —— */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "var(--radius-circle)", background: "var(--orange-500)", flex: "none" }} />
            <span style={{ ...capsLabel, fontWeight: "var(--fw-bold)", color: whiteA(75) }}>Daily brief</span>
          </span>
          <span style={{ fontSize: "var(--text-2xs)", color: whiteA(45), whiteSpace: "nowrap" }}>Updated 7:02 today</span>
        </div>

        {/* KPI row + score ring */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${kpiData.length}, 1fr) auto`, gap: 10 }}>
          {kpiData.map((k, i) => (
            <div key={i} style={{ ...tile, display: "flex", flexDirection: "column", gap: 5, padding: "12px 14px" }}>
              <span style={capsLabel}>{k.label}</span>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)",
                letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-snug)", color: "var(--white)", whiteSpace: "nowrap",
              }}>{k.value}</span>
              {k.delta && (
                <span style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--fw-medium)", color: deltaColor[k.tone] || deltaColor.neutral, whiteSpace: "nowrap" }}>
                  {k.delta}
                </span>
              )}
            </div>
          ))}

          <div style={{ ...tile, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: "10px 16px" }}>
            <span style={{ position: "relative", width: RING, height: RING, flex: "none" }}>
              <svg width={RING} height={RING} viewBox={`0 0 ${RING} ${RING}`} aria-hidden="true" style={{ display: "block" }}>
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "var(--periwinkle-400)" }} />
                    <stop offset="100%" style={{ stopColor: "var(--orange-500)" }} />
                  </linearGradient>
                </defs>
                <circle cx={RING / 2} cy={RING / 2} r={r} fill="none" stroke={whiteA(12)} strokeWidth={STROKE} />
                <circle
                  cx={RING / 2} cy={RING / 2} r={r} fill="none"
                  stroke={`url(#${gradId})`} strokeWidth={STROKE} strokeLinecap="round"
                  strokeDasharray={`${((c * pct) / 100).toFixed(2)} ${c.toFixed(2)}`}
                  transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
                />
              </svg>
              <span style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-semibold)",
                letterSpacing: "var(--ls-tight)", color: "var(--white)",
              }}>{pct}</span>
            </span>
            <span style={capsLabel}>Portfolio health</span>
          </div>
        </div>

        {/* Action queue */}
        <div style={{ ...tile, borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 14px", borderBottom: hairline }}>
            <span style={{ ...capsLabel, fontWeight: "var(--fw-bold)", color: whiteA(75) }}>Action queue</span>
            <span style={{ fontSize: "var(--text-2xs)", color: whiteA(45), whiteSpace: "nowrap" }}>
              {queue.length} queued · {urgentCount} urgent
            </span>
          </div>
          <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {queue.map((row, i) => {
              const sev = SEVERITY[row.severity] || SEVERITY.P3;
              const act = actionTone(row.action);
              return (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderTop: i > 0 ? `1px solid ${whiteA(6)}` : "none" }}>
                  <span style={{
                    flex: "none", padding: "3px 8px", borderRadius: "var(--radius-pill)",
                    fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "0.04em", lineHeight: 1,
                    color: sev, background: `color-mix(in srgb, ${sev} 14%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${sev} 36%, transparent)`,
                  }}>{row.severity}</span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", lineHeight: "var(--lh-snug)", color: whiteA(92) }}>
                      {row.insight}
                    </span>
                    {row.detail && (
                      <span style={{ fontSize: "var(--text-2xs)", color: whiteA(45) }}>{row.detail}</span>
                    )}
                  </span>
                  {row.action && (
                    <span style={{
                      flex: "none", padding: "5px 11px", borderRadius: "var(--radius-pill)",
                      fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "0.05em", lineHeight: 1,
                      whiteSpace: "nowrap",
                      color: act || whiteA(70),
                      background: act ? `color-mix(in srgb, ${act} 13%, transparent)` : whiteA(7),
                      border: `1px solid ${act ? `color-mix(in srgb, ${act} 34%, transparent)` : whiteA(14)}`,
                    }}>{row.action}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
