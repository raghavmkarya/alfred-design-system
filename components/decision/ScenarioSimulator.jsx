import React from "react";
import { Slider } from "../core/Slider.jsx";
import { ConfidenceMeter } from "../trust/ConfidenceMeter.jsx";
import { Button } from "../core/Button.jsx";

/**
 * Alfred AI — ScenarioSimulator
 * The what-if card at the heart of decision intelligence. Drag the lever(s) and Alfred
 * re-projects the outcome live — a big projected value, a direction-coloured delta versus
 * baseline, and a ConfidenceMeter that decays as you push further from what he's seen.
 * Supply your own `project(values)` model or use the built-in budget-shift default.
 * `onApply(values)` commits the scenario.
 */
export function ScenarioSimulator({
  title = "What if I shift budget to LinkedIn ABM?",
  levers = DEFAULT_LEVERS,
  project = defaultProject,
  outcomeLabel = "Projected pipeline",
  baselineLabel = "Today",
  baselineValue = "$120K",
  applyLabel = "Apply scenario",
  onApply,
  style = {},
}) {
  const init = {};
  levers.forEach((l) => { init[l.id] = l.value != null ? l.value : (l.min != null ? l.min : 0); });
  const [values, setValues] = React.useState(init);

  const out = project(values) || {};
  const dir = out.direction || "up";
  const dCol = dir === "down" ? "var(--danger-500)" : dir === "flat" ? "var(--text-muted)" : "var(--success-500)";
  const dBg = dir === "down" ? "var(--danger-100)" : dir === "flat" ? "var(--surface-sunken)" : "var(--success-100)";

  return (
    <section
      aria-label={title}
      style={{
        boxSizing: "border-box", width: "100%", maxWidth: 460,
        background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-md)", padding: 22,
        display: "flex", flexDirection: "column", gap: 18, fontFamily: "var(--font-sans)", ...style,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span aria-hidden="true" style={{
          width: 30, height: 30, flex: "none", borderRadius: "var(--radius-sm)", background: "var(--accent-soft)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--orange-500)"
            strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 20v-5M4 9V4M12 20v-8M12 6V4M20 20v-3M20 11V4" />
            <path d="M2 15h4M10 12h4M18 17h4" />
          </svg>
        </span>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)",
          letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-snug)", color: "var(--text-primary)",
        }}>
          {title}
        </span>
      </div>

      {/* Levers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {levers.map((l) => (
          <Slider
            key={l.id}
            label={l.unit ? `${l.label} (${l.unit})` : l.label}
            value={values[l.id]}
            min={l.min} max={l.max} step={l.step}
            onChange={(n) => setValues((v) => ({ ...v, [l.id]: n }))}
          />
        ))}
      </div>

      {/* Outcome */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 14, padding: 16,
        borderRadius: "var(--radius-lg)", background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <span style={{
              fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>{outcomeLabel}</span>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 34, fontWeight: "var(--fw-semibold)",
              letterSpacing: "var(--ls-tight)", lineHeight: 1, color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}>{out.value}</span>
          </span>
          {out.delta != null && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4, flex: "none",
              padding: "4px 10px", borderRadius: "var(--radius-pill)", background: dBg, color: dCol,
              fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", lineHeight: 1,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={dir === "down" ? "M12 5v14M6 13l6 6 6-6" : dir === "flat" ? "M5 12h14" : "M12 19V5M6 11l6-6 6 6"} />
              </svg>
              {out.delta}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
          <span>{baselineLabel}</span>
          <span style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)" }}>{baselineValue}</span>
          {out.caption && <span style={{ marginLeft: "auto" }}>{out.caption}</span>}
        </div>

        {out.confidence != null && <ConfidenceMeter value={out.confidence} label="Alfred's confidence" size="sm" />}
      </div>

      <Button variant="primary" fullWidth onClick={() => onApply && onApply(values)}>{applyLabel}</Button>
    </section>
  );
}

const DEFAULT_LEVERS = [
  { id: "shift", label: "Shift from Search to LinkedIn ABM", min: 0, max: 60, step: 5, value: 30, unit: "%" },
];

function defaultProject(v) {
  const shift = v.shift || 0;
  const pipeline = Math.round(120 + shift * 1.8);
  const delta = Math.round(shift * 1.8);
  const confidence = Math.max(35, Math.round(90 - shift * 0.7));
  return {
    value: "$" + pipeline + "K",
    delta: (delta >= 0 ? "+$" : "−$") + Math.abs(delta) + "K",
    direction: delta > 0 ? "up" : delta < 0 ? "down" : "flat",
    confidence,
    caption: shift > 45 ? "Beyond tested range" : "Within tested range",
  };
}
