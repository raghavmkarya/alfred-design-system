import React from "react";

/**
 * Alfred AI — ConsolePanel
 * The console evidence pane from the terminal-dev style absorption
 * (guidelines/style-absorption.md): Alfred showing its work as prompt-prefixed
 * mono lines inside an ordinary soft-cornered card. A connected-sources header,
 * a transcript of verb-led lines, and a ready line with a blinking phosphor
 * cursor. No window chrome, no scanlines, no green — the instrument layer,
 * not a costume.
 */
const VERB_TONE = {
  neutral: "var(--text-primary)",
  info: "var(--text-on-tint-info)",
  brand: "var(--text-on-tint-brand)",
  success: "var(--text-on-tint-success)",
};

const monoLine = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  lineHeight: "var(--lh-normal)",
  color: "var(--text-secondary)",
};

export function ConsolePanel({
  connectedLabel = "connected",
  connected = [],
  transcript = [],
  readyLine,
  cursor = true,
  label = "Alfred's evidence trail",
  style = {},
}) {
  const prompt = (
    <span aria-hidden="true" style={{ color: "var(--text-muted)", flexShrink: 0, userSelect: "none" }}>&gt;</span>
  );
  return (
    <div role="group" aria-label={label} style={{
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)", boxShadow: "var(--elevation-raised)",
      paddingBlock: 20, paddingInline: 22, minWidth: 0, ...style,
    }}>
      {connected.length > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 9,
          paddingBlockEnd: 14, marginBlockEnd: 14, borderBlockEnd: "1px solid var(--border-subtle)",
        }}>
          <span aria-hidden="true" style={{
            width: 7, height: 7, borderRadius: "var(--radius-circle)", flexShrink: 0,
            background: "var(--accent)",
          }} />
          <span style={{
            ...monoLine, fontSize: "var(--text-2xs)", color: "var(--text-muted)",
            textTransform: "uppercase", letterSpacing: "var(--ls-caps)",
          }}>{connectedLabel + " :: " + connected.join(" · ")}</span>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {transcript.map((l, i) => (
          <div key={i} style={{ ...monoLine, display: "flex", gap: 10 }}>
            {prompt}
            <span style={{ minWidth: 0 }}>
              <span style={{ color: VERB_TONE[l.tone || "neutral"] || VERB_TONE.neutral, fontWeight: "var(--fw-semibold)" }}>{l.verb}</span>
              {" " + l.text}
            </span>
          </div>
        ))}
        {readyLine && (
          <div style={{ ...monoLine, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 10 }}>
            {prompt}
            <span style={{ fontWeight: "var(--fw-semibold)", minWidth: 0 }}>{readyLine}</span>
            {cursor && (
              /* The one phosphor element of the view this panel sits in. */
              <span aria-hidden="true" style={{
                display: "inline-block", width: 7, height: 15, borderRadius: 1, flexShrink: 0,
                background: "var(--accent)", boxShadow: "var(--shadow-phosphor)",
                animation: "dsConsoleBlink 1.2s steps(2, jump-none) infinite",
              }} />
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes dsConsoleBlink{0%,49%{opacity:1}50%,100%{opacity:0.15}}`}</style>
    </div>
  );
}
