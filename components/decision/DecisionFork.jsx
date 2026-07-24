import React from "react";

/**
 * Alfred AI DecisionFork
 * A side by side strategic choice with recommendation, tradeoffs, confidence,
 * reversibility, and explicit selection.
 */
export function DecisionFork({
  title = "Where should the next $30K go?",
  context = "Both options clear the pipeline goal. The difference is speed versus certainty.",
  options = DEFAULT_OPTIONS,
  selected,
  defaultSelected,
  onSelect,
  actionLabel = "Choose this path",
  style = {},
}) {
  const initial = defaultSelected || options.find((option) => option.recommended)?.id || options[0]?.id;
  const [internal, setInternal] = React.useState(initial);
  const active = selected === undefined ? internal : selected;

  function choose(id) {
    if (selected === undefined) setInternal(id);
    if (onSelect) onSelect(id);
  }

  return (
    <section
      aria-label={title}
      style={{
        boxSizing: "border-box", width: "100%", maxWidth: 820, minWidth: 0,
        padding: 22, border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)", background: "var(--surface-card)",
        boxShadow: "var(--shadow-md)", fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBlockEnd: 18 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            marginBlockEnd: 7, fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)",
          }}>
            Decision fork
          </div>
          <h3 style={{
            margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-h3)",
            fontWeight: "var(--fw-semibold)", lineHeight: "var(--lh-snug)",
            letterSpacing: "var(--ls-tight)", color: "var(--text-primary)",
          }}>
            {title}
          </h3>
          {context ? (
            <p style={{ marginBlock: "7px 0", maxWidth: 600, fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
              {context}
            </p>
          ) : null}
        </div>
        <ForkGlyph />
      </div>

      <div role="radiogroup" aria-label="Decision options" style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 12,
      }}>
        {options.map((option) => (
          <Option
            key={option.id}
            option={option}
            checked={active === option.id}
            actionLabel={actionLabel}
            onChoose={() => choose(option.id)}
          />
        ))}
      </div>
    </section>
  );
}

function Option({ option, checked, actionLabel, onChoose }) {
  return (
    <div style={{
      position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
      minWidth: 0, padding: 17, border: `1px solid ${checked ? "var(--border-focus)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-xl)", background: checked ? "var(--accent-soft)" : "var(--surface-sunken)",
      boxShadow: checked ? "var(--shadow-sm)" : "none",
      transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
    }}>
      {option.recommended ? (
        <span style={{
          alignSelf: "flex-start", marginBlockEnd: 14, padding: "4px 9px",
          borderRadius: "var(--radius-pill)", background: "var(--accent)", color: "var(--text-on-brand)",
          fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
          textTransform: "uppercase",
        }}>
          Alfred's pick
        </span>
      ) : <span style={{ height: 22, marginBlockEnd: 14 }} />}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockEnd: 4 }}>{option.eyebrow}</div>
          <strong style={{
            display: "block", fontFamily: "var(--font-display)", fontSize: "var(--text-h4)",
            lineHeight: "var(--lh-snug)", color: "var(--text-primary)",
          }}>
            {option.label}
          </strong>
        </div>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 30, fontWeight: "var(--fw-semibold)",
          lineHeight: 1, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums",
        }}>
          {option.outcome}
        </span>
      </div>

      {option.description ? (
        <p style={{ marginBlock: "13px 15px", fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
          {option.description}
        </p>
      ) : null}

      <dl style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: 0 }}>
        <Metric label="Confidence" value={`${option.confidence}%`} />
        <Metric label="Reversibility" value={option.reversibility} />
      </dl>

      {option.tradeoffs?.length ? (
        <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBlock: "15px 18px", padding: 0, listStyle: "none" }}>
          {option.tradeoffs.map((tradeoff, index) => (
            <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "var(--text-xs)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
              <span aria-hidden="true" style={{ color: index === 0 ? "var(--success-500)" : "var(--warning-500)", fontWeight: "var(--fw-bold)" }}>
                {index === 0 ? "+" : "−"}
              </span>
              {tradeoff}
            </li>
          ))}
        </ul>
      ) : null}

      <button
        type="button"
        role="radio"
        aria-checked={checked}
        onClick={onChoose}
        style={{
          width: "100%", marginBlockStart: "auto", minHeight: 40, border: checked ? 0 : "1px solid var(--border-strong)",
          borderRadius: "var(--radius-md)", background: checked ? "var(--text-primary)" : "var(--surface-card)",
          color: checked ? "var(--surface-card)" : "var(--text-primary)",
          font: "inherit", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", cursor: "pointer",
          transition: "transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-standard)",
        }}
      >
        {checked ? "Selected" : actionLabel}
      </button>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={{ padding: 10, borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)" }}>
      <dt style={{ marginBlockEnd: 3, fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{label}</dt>
      <dd style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{value}</dd>
    </div>
  );
}

function ForkGlyph() {
  return (
    <span aria-hidden="true" style={{
      width: 40, height: 40, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
      borderRadius: "var(--radius-lg)", background: "var(--gradient-brand)", color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-sm)",
    }}>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v5c0 2.2 1.8 4 4 4h8" />
        <path d="m15 9 3 3-3 3" />
        <path d="M6 21v-5c0-2.2 1.8-4 4-4" />
      </svg>
    </span>
  );
}

const DEFAULT_OPTIONS = [
  {
    id: "abm", eyebrow: "Option A", label: "Scale LinkedIn ABM", outcome: "+$54K",
    description: "Captures the strongest current efficiency signal while the audience is still under-saturated.",
    confidence: 82, reversibility: "High", recommended: true,
    tradeoffs: ["Fastest projected pipeline gain", "Higher creative fatigue risk in 3 weeks"],
  },
  {
    id: "search", eyebrow: "Option B", label: "Protect paid search", outcome: "+$38K",
    description: "Keeps the proven acquisition floor intact and gives the ABM signal another cycle to mature.",
    confidence: 91, reversibility: "Medium",
    tradeoffs: ["Most predictable conversion volume", "Leaves an estimated $16K of pipeline unrealized"],
  },
];
