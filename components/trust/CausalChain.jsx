import React from "react";

/**
 * Alfred AI — CausalChain
 * The etiological signature of Alfred Core's Causal Reasoning Engine: a
 * horizontal cause → effect → impact chain. Each step is a small node card,
 * tinted by `kind` (cause = periwinkle, effect = orange, impact = danger),
 * connected by chevron glyphs. An optional uppercase title eyebrow sits above,
 * and when `confidence` is given a trailing "<n>% causal confidence" chip
 * closes the chain like a verdict. Wraps responsively; fully self-contained.
 *
 * steps: [{ label, detail, kind }]   kind ∈ "cause" | "effect" | "impact"
 */
export function CausalChain({ steps = [], confidence = null, title = "", style = {} }) {
  const KIND = {
    cause: { accent: "var(--periwinkle-400)", label: "Cause" },
    effect: { accent: "var(--orange-500)", label: "Effect" },
    impact: { accent: "var(--danger-500)", label: "Impact" },
  };
  const resolve = (k) => KIND[k] || KIND.effect;

  const tabular = { fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum" 1' };

  const hasConf =
    confidence !== undefined &&
    confidence !== null &&
    confidence !== "" &&
    !Number.isNaN(Number(confidence));
  const conf = hasConf ? Math.max(0, Math.min(100, Math.round(Number(confidence)))) : null;
  const confTone =
    conf == null
      ? "var(--text-muted)"
      : conf >= 70
      ? "var(--success-500)"
      : conf >= 40
      ? "var(--warning-500)"
      : "var(--danger-500)";

  // Eyebrow ----------------------------------------------------------------
  const eyebrow = title ? (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ flex: "none" }}
      >
        <circle cx="5" cy="6" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M7.5 6H13a4 4 0 0 1 4 4v5.5" />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-2xs)",
          fontWeight: "var(--fw-bold)",
          letterSpacing: "var(--ls-caps)",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {title}
      </span>
    </div>
  ) : null;

  // Empty state ------------------------------------------------------------
  if (steps.length === 0) {
    return (
      <div style={{ fontFamily: "var(--font-sans)", ...style }}>
        {eyebrow}
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--text-muted)",
          }}
        >
          I haven't traced a causal chain for this yet.
        </span>
      </div>
    );
  }

  // Build the interleaved row of nodes + connectors -----------------------
  const items = [];
  steps.forEach((step, i) => {
    const meta = resolve(step.kind);
    items.push(
      <article
        key={`node-${i}`}
        style={{
          flex: "1 1 158px",
          minWidth: 148,
          maxWidth: 280,
          display: "flex",
          flexDirection: "column",
          gap: 9,
          background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          padding: 15,
          boxShadow: "var(--shadow-xs)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* kind accent rail */}
        <span
          aria-hidden="true"
          style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: meta.accent }}
        />

        {/* header: glyph badge + kind eyebrow + ordinal */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span
            style={{
              position: "relative",
              width: 30,
              height: 30,
              flex: "none",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, background: meta.accent, opacity: 0.14 }}
            />
            <span style={{ position: "relative", display: "inline-flex" }}>
              <KindGlyph kind={step.kind} color={meta.accent} />
            </span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-caps)",
              textTransform: "uppercase",
              color: meta.accent,
            }}
          >
            {meta.label}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              color: "var(--text-muted)",
              ...tabular,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        {/* label */}
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-semibold)",
            lineHeight: "var(--lh-snug)",
            color: "var(--text-primary)",
          }}
        >
          {step.label}
        </span>

        {/* detail */}
        {step.detail ? (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              lineHeight: "var(--lh-normal)",
              color: "var(--text-muted)",
            }}
          >
            {step.detail}
          </span>
        ) : null}
      </article>
    );

    if (i < steps.length - 1) items.push(<Chevron key={`chev-${i}`} />);
  });

  // Trailing confidence chip — the verdict that closes the chain
  if (conf != null) {
    items.push(<Chevron key="chev-conf" />);
    items.push(
      <span
        key="conf"
        title={`${conf}% causal confidence`}
        style={{
          alignSelf: "center",
          flex: "none",
          position: "relative",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          padding: "9px 15px",
          borderRadius: "var(--radius-pill)",
          background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <span
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, background: confTone, opacity: 0.1 }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "relative",
            width: 8,
            height: 8,
            flex: "none",
            borderRadius: "var(--radius-pill)",
            background: confTone,
          }}
        />
        <span style={{ position: "relative", display: "inline-flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-tight)",
              color: confTone,
              ...tabular,
            }}
          >
            {conf}%
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--fw-medium)",
              color: "var(--text-secondary)",
            }}
          >
            causal confidence
          </span>
        </span>
      </span>
    );
  }

  return (
    <div
      role="group"
      aria-label={title || "Causal chain"}
      style={{ fontFamily: "var(--font-sans)", ...style }}
    >
      {eyebrow}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 10 }}>
        {items}
      </div>
    </div>
  );
}

/* Internal — the directional connector between two nodes. */
function Chevron() {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "none",
        alignSelf: "center",
        display: "inline-flex",
        alignItems: "center",
        color: "var(--text-muted)",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 6l6 6-6 6" opacity="0.4" />
        <path d="M12 6l6 6-6 6" />
      </svg>
    </span>
  );
}

/* Internal — a distinct line glyph per causal role. */
function KindGlyph({ kind, color = "currentColor", size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (kind === "cause") {
    // spark — the trigger that sets the chain in motion
    return (
      <svg {...common}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }
  if (kind === "impact") {
    // target — where the consequence lands
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }
  // effect (default) — the downstream ripple
  return (
    <svg {...common}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
