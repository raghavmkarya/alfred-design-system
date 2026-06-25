import React from "react";

/**
 * Alfred AI — Heatmap
 * A matrix heatmap for two-dimensional intensity — e.g. creative fatigue by
 * audience segment × week. `rows` label each row (left), `cols` label each
 * column (top), and `values` is a rows×cols grid of numbers. Each cell is
 * tinted from a faint peach (low) to full brand orange (high) by
 * value / maxValue, where `maxValue` defaults to the data max. Numbers print
 * centered with theme-aware contrast (dark on light cells, white on strong
 * cells). Pass `valueFormat` to format the printed value; an optional
 * intensity legend strip shows the scale.
 */
const ORANGE_RGB = "255, 132, 49"; // var(--orange-500) #FF8431

export function Heatmap({ rows = [], cols = [], values = [], maxValue, valueFormat, legend = true, style = {} }) {
  const nCols = cols.length;
  const fmt = typeof valueFormat === "function"
    ? valueFormat
    : (v) => (Number.isInteger(v) ? `${v}` : `${Math.round(v * 10) / 10}`);

  // Gather every defined numeric value to derive the scale.
  const flat = [];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < nCols; c++) {
      const v = values?.[r]?.[c];
      if (typeof v === "number" && !Number.isNaN(v)) flat.push(v);
    }
  }
  const dataMax = flat.length ? Math.max(...flat) : 0;
  const dataMin = flat.length ? Math.min(...flat) : 0;
  const top = typeof maxValue === "number" && maxValue > 0 ? maxValue : dataMax || 1;

  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-medium)",
    color: "var(--text-muted)",
  };

  // Empty / prop-less render.
  if (rows.length === 0 || nCols === 0) {
    return (
      <div style={{ width: "100%", ...style }}>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          I don't have any data to map yet.
        </p>
      </div>
    );
  }

  // alpha = value / maxValue, floored so the lightest cells still read as a
  // soft orange-50 tint rather than vanishing into the surface.
  const cellBg = (t) => `rgba(${ORANGE_RGB}, ${(0.08 + t * 0.92).toFixed(3)})`;
  const cellFg = (t) => (t >= 0.66 ? "var(--text-on-brand)" : "var(--text-primary)");

  return (
    <div style={{ width: "100%", ...style }} role="figure" aria-label="Intensity heatmap">
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(64px, auto) repeat(${nCols}, minmax(40px, 1fr))`,
            gap: 6,
            minWidth: nCols > 6 ? `${nCols * 56 + 72}px` : undefined,
          }}
        >
          {/* top-left corner spacer */}
          <div key="corner" />

          {/* column headers */}
          {cols.map((c, ci) => (
            <div
              key={`col-${ci}`}
              style={{ ...labelStyle, display: "flex", alignItems: "flex-end", justifyContent: "center", textAlign: "center", paddingBottom: 2 }}
            >
              {c}
            </div>
          ))}

          {/* rows: label + cells */}
          {rows.map((rLabel, r) => (
            <React.Fragment key={`row-${r}`}>
              <div
                style={{
                  ...labelStyle,
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 10,
                  whiteSpace: "nowrap",
                }}
              >
                {rLabel}
              </div>
              {cols.map((cLabel, c) => {
                const raw = values?.[r]?.[c];
                const has = typeof raw === "number" && !Number.isNaN(raw);
                const t = has ? Math.max(0, Math.min(1, raw / top)) : 0;
                return (
                  <div
                    key={`cell-${r}-${c}`}
                    title={has ? `${rLabel} · ${cLabel}: ${fmt(raw)}` : `${rLabel} · ${cLabel}`}
                    style={{
                      minHeight: 42,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--radius-md)",
                      background: has ? cellBg(t) : "var(--surface-sunken)",
                      border: has ? "none" : "1px dashed var(--border-subtle)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--fw-semibold)",
                      letterSpacing: "var(--ls-tight)",
                      fontVariantNumeric: "tabular-nums",
                      color: has ? cellFg(t) : "var(--text-placeholder)",
                    }}
                  >
                    {has ? fmt(raw) : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {legend && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
          <span style={{ ...labelStyle, fontVariantNumeric: "tabular-nums" }}>{fmt(dataMin)}</span>
          <span
            aria-hidden="true"
            style={{
              flex: 1,
              maxWidth: 240,
              height: 8,
              borderRadius: "var(--radius-pill)",
              background: "linear-gradient(90deg, var(--orange-50) 0%, var(--orange-200) 45%, var(--orange-500) 100%)",
              border: "1px solid var(--border-subtle)",
            }}
          />
          <span style={{ ...labelStyle, fontVariantNumeric: "tabular-nums" }}>{fmt(top)}</span>
          <span
            style={{
              ...labelStyle,
              marginLeft: 4,
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              textTransform: "uppercase",
              letterSpacing: "var(--ls-caps)",
            }}
          >
            Intensity
          </span>
        </div>
      )}
    </div>
  );
}
