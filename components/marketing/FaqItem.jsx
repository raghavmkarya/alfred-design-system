import React from "react";

/**
 * Alfred AI — FaqItem
 * Accordion row with a plus/minus toggle. Uncontrolled by default;
 * pass `open` + `onToggle` to control it.
 */
export function FaqItem({ question, children, open, defaultOpen = false, onToggle, style = {} }) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open != null ? open : internal;
  const toggle = () => { onToggle ? onToggle(!isOpen) : setInternal(!isOpen); };
  const panelId = React.useId();
  return (
    <div style={{ borderBottom: "1px solid var(--border-subtle)", ...style }}>
      <button type="button" onClick={toggle} aria-expanded={isOpen} aria-controls={panelId} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "22px 4px",
        background: "transparent", border: "none", cursor: "pointer", textAlign: "start",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)",
      }}>
        <span style={{ flex: 1 }}>{question}</span>
        <span style={{
          width: 28, height: 28, flex: "none", borderRadius: "var(--radius-sm)", background: isOpen ? "var(--accent)" : "var(--accent-soft)",
          color: isOpen ? "#fff" : "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: "var(--fw-medium)", transition: "background var(--dur-base) var(--ease-standard)",
        }}>{isOpen ? "–" : "+"}</span>
      </button>
      {/* `inert="inert"`, and it has to be that exact spelling: React 18 and
          React 19 disagree about every other form, and this component is
          published to npm with `react: >=18` as a peer.

            value      React 18.3.1              React 19.2.8
            true       DROPPED + warns           inert=""
            ""         inert=""                  DROPPED + warns
            "inert"    inert="inert"             inert=""

          It shipped as `""`, which is why a closed panel lost its `inert`
          entirely for anyone on React 19 — the attribute the panel needs most,
          silently absent, on the version most consumers install today. Found by
          smoke-testing the published package rather than by a gate: the repo
          develops against 18, where the old form worked.

          `inert="inert"` is a valid HTML boolean attribute (presence is what
          counts, the value is ignored) and warns on neither version. */}
      <div id={panelId} aria-hidden={!isOpen} inert={!isOpen ? "inert" : undefined} style={{
        display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows var(--dur-slow) var(--ease-standard)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", padding: "0 4px 22px", margin: 0, maxWidth: 760 }}>{children}</p>
        </div>
      </div>
    </div>
  );
}
