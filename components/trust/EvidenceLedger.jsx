import React from "react";

/**
 * Alfred AI EvidenceLedger
 * A compact claim audit that separates evidence which supports, weakens, or
 * merely contextualizes a conclusion. It makes uncertainty visible without
 * forcing the user into a full provenance view.
 */
export function EvidenceLedger({
  claim = "LinkedIn ABM is now the most efficient place to add budget.",
  evidence = DEFAULT_EVIDENCE,
  confidence = 82,
  updated = "6 min ago",
  onSourceOpen,
  style = {},
}) {
  const score = Math.max(0, Math.min(100, Math.round(Number(confidence) || 0)));
  const supporting = evidence.filter((item) => item.stance === "supports").length;
  const contradicting = evidence.filter((item) => item.stance === "contradicts").length;

  return (
    <section
      aria-label="Evidence ledger"
      style={{
        boxSizing: "border-box",
        width: "100%",
        maxWidth: 620,
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-md)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      <div style={{ padding: 20, borderBlockEnd: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <LedgerMark />
            <span style={{
              fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)",
            }}>
              Evidence ledger
            </span>
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            Updated {updated}
          </span>
        </div>

        <h3 style={{
          marginBlock: "15px 13px", fontFamily: "var(--font-display)", fontSize: "var(--text-h4)",
          fontWeight: "var(--fw-semibold)", lineHeight: "var(--lh-snug)",
          letterSpacing: "var(--ls-tight)", color: "var(--text-primary)",
        }}>
          {claim}
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 14 }}>
          <div
            role="meter"
            aria-label={`Evidence confidence: ${score}%`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={score}
            style={{ height: 7, overflow: "hidden", borderRadius: "var(--radius-pill)", background: "var(--surface-sunken)" }}
          >
            <span style={{
              display: "block", width: `${score}%`, height: "100%", borderRadius: "inherit",
              background: "var(--gradient-brand)", transition: "width var(--dur-base) var(--ease-out)",
            }} />
          </div>
          <strong style={{
            fontSize: "var(--text-sm)", color: "var(--text-primary)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {score}%
          </strong>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBlockStart: 13 }}>
          <SummaryChip tone="support">{supporting} support</SummaryChip>
          <SummaryChip tone={contradicting ? "contradict" : "context"}>
            {contradicting} contradict
          </SummaryChip>
          <SummaryChip tone="context">{evidence.length} sources</SummaryChip>
        </div>
      </div>

      <div role="list" style={{ display: "flex", flexDirection: "column" }}>
        {evidence.map((item, index) => (
          <EvidenceRow
            key={item.id || `${item.source}-${index}`}
            item={item}
            isLast={index === evidence.length - 1}
            onOpen={onSourceOpen}
          />
        ))}
      </div>
    </section>
  );
}

function EvidenceRow({ item, isLast, onOpen }) {
  const tones = {
    supports: { label: "Supports", color: "var(--success-500)", bg: "var(--success-100)", symbol: "+" },
    contradicts: { label: "Contradicts", color: "var(--danger-500)", bg: "var(--danger-100)", symbol: "−" },
    context: { label: "Context", color: "var(--info-500)", bg: "var(--info-100)", symbol: "·" },
  };
  const tone = tones[item.stance] || tones.context;
  const content = (
    <>
      <span aria-hidden="true" style={{
        width: 28, height: 28, flex: "none", display: "inline-flex", alignItems: "center",
        justifyContent: "center", borderRadius: "var(--radius-md)", color: tone.color,
        background: tone.bg, fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)",
      }}>
        {tone.symbol}
      </span>
      <span style={{ minWidth: 0, display: "flex", flex: 1, flexDirection: "column", gap: 4 }}>
        <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <strong style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>{item.source}</strong>
          <span style={{
            flex: "none", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: tone.color,
          }}>
            {tone.label}
          </span>
        </span>
        <span style={{ fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
          {item.finding}
        </span>
        {item.freshness ? (
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{item.freshness}</span>
        ) : null}
      </span>
      {onOpen ? <Arrow /> : null}
    </>
  );
  const shared = {
    boxSizing: "border-box", width: "100%", display: "flex", alignItems: "flex-start",
    gap: 12, padding: "14px 20px", border: 0,
    borderBlockEnd: isLast ? 0 : "1px solid var(--border-subtle)",
    background: "transparent", color: "inherit", textAlign: "start", font: "inherit",
  };

  return onOpen ? (
    <button type="button" role="listitem" onClick={() => onOpen(item)} style={{ ...shared, cursor: "pointer" }}>
      {content}
    </button>
  ) : (
    <div role="listitem" style={shared}>{content}</div>
  );
}

function SummaryChip({ tone, children }) {
  const map = {
    support: ["var(--success-100)", "var(--success-500)"],
    contradict: ["var(--danger-100)", "var(--danger-500)"],
    context: ["var(--surface-sunken)", "var(--text-muted)"],
  };
  const [background, color] = map[tone] || map.context;
  return (
    <span style={{
      padding: "4px 9px", borderRadius: "var(--radius-pill)", background, color,
      fontSize: "var(--text-xs)", fontWeight: "var(--fw-semibold)",
    }}>
      {children}
    </span>
  );
}

function LedgerMark() {
  return (
    <span aria-hidden="true" style={{
      width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center",
      borderRadius: "var(--radius-md)", background: "var(--gradient-brand)", color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-xs)",
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M6 5h12M6 12h12M6 19h7" />
        <path d="m16 18 2 2 4-5" />
      </svg>
    </span>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginBlockStart: 6 }}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const DEFAULT_EVIDENCE = [
  { source: "LinkedIn Ads", stance: "supports", finding: "Qualified pipeline per dollar improved 24% over the last 28 days.", freshness: "Live data · 2 min ago" },
  { source: "HubSpot", stance: "supports", finding: "ABM opportunities are progressing 1.4 times faster than paid search.", freshness: "Synced · 8 min ago" },
  { source: "Finance plan", stance: "contradicts", finding: "The proposed shift leaves paid search 6% below its monthly floor.", freshness: "Plan version 12 · today" },
];
