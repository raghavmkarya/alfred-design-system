import React from "react";
import { ChartTable } from "../hooks/chartTable.jsx";
import { useChartCursor, ChartLive, ChartTooltip, CHART_FOCUS_STYLE } from "../hooks/chartCursor.jsx";

/**
 * Alfred AI — BulletChart
 * Horizontal actual-vs-target bullet bars for KPI-vs-goal reads (ROAS vs
 * target, pipeline vs plan, CAC vs ceiling). Each row pairs a measure bar
 * against a target tick, optionally over graded qualitative bands.
 *
 * `items`: [{ label, value, target, max, ranges }]
 *   - max     scales the row (defaults to value/target headroom).
 *   - target  draws a vertical tick mark.
 *   - ranges  optional [poorUpTo, okUpTo] — graded light-gray bands behind
 *             the measure bar (poor → ok → good, lightening as they improve).
 * The measure bar is the brand gradient; the value is printed right, tabular.
 * Pass `valueFormat` to control how value + target are printed.
 *
 * The cursor walks the ROWS, and what it announces is the half of each row that
 * is not written down: the value is printed at the right, but the target is only
 * a tick mark and the ratio between them is nowhere at all. Rows are separate
 * elements, so each sets the cursor on `onPointerEnter` (as a sankey's ribbons
 * do) rather than the component deriving a row from a y coordinate.
 */
const addCommas = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const niceNum = (v) => {
  if (typeof v !== "number" || !Number.isFinite(v)) return v;
  const a = Math.abs(v);
  if (a >= 1000) return addCommas(Math.round(v));
  if (a >= 100) return String(Math.round(v));
  if (a >= 10) return String(Math.round(v * 10) / 10);
  return String(Math.round(v * 100) / 100);
};
const clampPct = (n) => Math.max(0, Math.min(100, n));

export function BulletChart({ items = [], valueFormat, style = {} }) {
  const fmt = valueFormat || niceNum;

  const cursor = useChartCursor(items.length);
  const at = cursor.index;

  const scaleOf = (it) => {
    const value = Number(it.value) || 0;
    const target = typeof it.target === "number" ? it.target : null;
    return { value, target, top: it.max || Math.max(value, target || 0, 1) };
  };
  const pctOfTarget = (value, target) => (target ? Math.round((value / target) * 100) : null);
  const describe = (i) => {
    const it = items[i];
    if (!it) return "";
    const { value, target } = scaleOf(it);
    const pct = pctOfTarget(value, target);
    return `${it.label || `Metric ${i + 1}`}: ${fmt(value)}`
      + (target != null ? `, target ${fmt(target)}` : "")
      + (pct != null ? `, ${pct}% of target` : "");
  };

  return (
    /* Interactive: one tab stop for the whole set of rows, the name on the
       focusable group, and each track aria-hidden — the row's own label and
       value are real text and stay readable, it is only the graphic that would
       otherwise be announced twice. See guidelines/chart-contract.md. */
    <div
      {...cursor.groupBind}
      onPointerLeave={cursor.clear}
      role="group"
      aria-label={`Bullet chart, ${items.length} ${items.length === 1 ? "measure" : "measures"}`}
      style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", ...CHART_FOCUS_STYLE, ...style }}
    >
      <ChartLive text={cursor.keyboard && at != null ? describe(at) : ""} />
      <ChartTable caption="Bullet chart" columns={["Measure", "Value", "Target"]}
        rows={items.map((it) => [
          String(it.label ?? ""),
          String(it.value ?? ""),
          typeof it.target === "number" ? String(it.target) : "—",
        ])} />
      {items.map((it, i) => {
        const { value, target, top } = scaleOf(it);
        const ranges = Array.isArray(it.ranges) ? it.ranges : [];

        const valuePct = clampPct((value / top) * 100);
        const targetPct = target != null ? clampPct((target / top) * 100) : null;
        const poorPct = ranges.length > 0 ? clampPct((ranges[0] / top) * 100) : null;
        const okPct = ranges.length > 1 ? clampPct((ranges[1] / top) * 100) : null;

        const on = i === at;
        const pct = pctOfTarget(value, target);

        return (
          <div
            key={it.label != null ? `${it.label}-${i}` : i}
            onPointerEnter={() => cursor.point(i)}
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            {/* label */}
            <div
              style={{
                width: 132,
                flex: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--fw-medium)",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {it.label}
            </div>

            {/* track — inside a wrapper the readout can hang in, because the
                track itself clips (the bands and the bar are drawn to its
                edges, so `overflow: hidden` is what keeps its corners round) */}
            <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
            <div
              aria-hidden="true"
              style={{
                position: "relative",
                height: 36,
                borderRadius: "var(--radius-sm)",
                border: on ? "1px solid var(--border-focus)" : "1px solid var(--border-subtle)",
                background: "var(--surface-sunken)",
                overflow: "hidden",
              }}
            >
              {/* qualitative bands (poor → ok → good), lightening as they improve */}
              {poorPct != null && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,   /* rtl-ok: chart coordinate space, see guidelines/rtl.md */
                    width: `${poorPct}%`,
                    background: "var(--border-default)",
                  }}
                />
              )}
              {okPct != null && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${poorPct}%`,   /* rtl-ok: chart coordinate space, see guidelines/rtl.md */
                    width: `${Math.max(okPct - poorPct, 0)}%`,
                    background: "var(--border-subtle)",
                  }}
                />
              )}

              {/* measure bar — the brand gradient */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,   /* rtl-ok: chart coordinate space, see guidelines/rtl.md */
                  transform: "translateY(-50%)",
                  width: `${valuePct}%`,
                  /* the active row thickens as well as taking an accent border:
                     in forced-colors mode the border colour is overridden and
                     geometry is the only signal left */
                  height: on ? 18 : 14,
                  borderRadius: "var(--radius-pill)",
                  background: "var(--gradient-brand)",
                  boxShadow: "var(--elevation-surface)",
                }}
              />

              {/* target tick */}
              {targetPct != null && (
                <div
                  style={{
                    position: "absolute",
                    top: 5,
                    bottom: 5,
                    left: `${targetPct}%`,   /* rtl-ok: chart coordinate space, see guidelines/rtl.md */
                    width: 3,
                    transform: "translateX(-50%)",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--text-primary)",
                    boxShadow: "0 0 0 1.5px var(--surface-card)",
                  }}
                />
              )}
            </div>
            {/* The readout is anchored to the TARGET tick, not to the bar: the
                bar's value is printed at the end of the row already, and the
                tick is the mark on this chart that carries no label at all. */}
            <ChartTooltip x={(targetPct != null ? targetPct : valuePct) / 100} y={0.5} visible={on}>
              {target != null
                ? `target ${fmt(target)}${pct != null ? ` · ${pct}%` : ""}`
                : `${fmt(value)} of ${fmt(top)}`}
            </ChartTooltip>
            </div>

            {/* value */}
            <div
              style={{
                flex: "none",
                minWidth: 52,
                textAlign: "end",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--fw-semibold)",
                letterSpacing: "var(--ls-tight)",
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(value)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
