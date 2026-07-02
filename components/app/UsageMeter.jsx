import React from "react";
import { ProgressBar } from "../data/ProgressBar.jsx";

/**
 * Alfred AI — UsageMeter
 * Plan-limit meter for billing and settings surfaces. Label on the left, a
 * "used / limit unit" readout on the right, and the brand ProgressBar below.
 * The fill communicates headroom: brand gradient while healthy, solid orange
 * from 80% of the allowance, and danger red once the limit is reached.
 * An optional muted footnote (reset date, upgrade hint) sits under the bar.
 */
export function UsageMeter({
  label,
  used = 0,
  limit = 0,
  unit = "",
  footnote = "",
  style = {},
}) {
  const labelId = React.useId();
  const fmt = (n) => (typeof n === "number" && isFinite(n) ? n.toLocaleString("en-US") : String(n));

  const max = typeof limit === "number" && isFinite(limit) && limit > 0 ? limit : 0;
  const now = typeof used === "number" && isFinite(used) && used > 0 ? used : 0;
  const pct = max > 0 ? Math.min(100, (now / max) * 100) : 0;
  const atLimit = max > 0 && now >= max;
  const status = atLimit ? "danger" : pct >= 80 ? "warn" : "ok";

  const usedColor = {
    ok: "var(--text-primary)",
    warn: "var(--orange-600)",
    danger: "var(--danger-500)",
  }[status];

  // ProgressBar's fill is var(--gradient-brand-reverse) (gradient) or
  // var(--orange-500) (plain); re-scoping --orange-500 on the track turns the
  // plain fill danger red without leaving the token system.
  const barProps = {
    ok: { tone: "gradient" },
    warn: { tone: "plain" },
    danger: { tone: "plain", style: { "--orange-500": "var(--danger-500)" } },
  }[status];

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 8, minWidth: 220,
      fontFamily: "var(--font-sans)", ...style,
    }}>
      {/* Header row — label + used/limit readout */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <span id={labelId} style={{
          fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-secondary)",
          minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{label}</span>
        <span style={{ fontSize: "var(--text-sm)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", flex: "none", lineHeight: 1.4 }}>
          <span style={{
            fontWeight: "var(--fw-bold)", color: usedColor,
            transition: "color var(--dur-base) var(--ease-standard)",
          }}>{fmt(used)}</span>
          <span style={{ color: "var(--text-muted)" }}> / {fmt(limit)}{unit ? ` ${unit}` : ""}</span>
        </span>
      </div>

      {/* Meter — progressbar semantics wrap the composed brand track */}
      <div
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.min(now, max)}
        aria-valuetext={`${fmt(now)} of ${fmt(max)}${unit ? ` ${unit}` : ""} used`}
      >
        <ProgressBar value={pct} height={8} {...barProps} />
      </div>

      {footnote != null && footnote !== "" && (
        <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5 }}>{footnote}</div>
      )}
    </div>
  );
}
