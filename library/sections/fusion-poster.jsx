/* ============================================================
   Alfred, Inspiration Library · FUSION POSTER.
   The vivid absorption's deep set: six poster-register sections
   that spend the loud budgets deliberately. Every section keeps
   the contract from guidelines/style-absorption.md: at most ONE
   gradient element, ONE phosphor element and ONE grain layer per
   section; the marquee/rotation motion tokens never turn orange
   ornamental; mono labels, never mono headlines or body. Every
   component ships complete default copy: a bare <LibQuotePoster />
   is a finished section. Compiled to a committed .js twin by
   scripts/build-kits.mjs; catalogued in library/meta/fusion-poster.json.
   ============================================================ */
const {
  EyebrowBadge, Button, AnimatedCounter,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.06, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
/* The poster face: --font-poster keeps Clash Display on every theme,
   deliberately bypassing the marketing-dark headline swap. */
const libPoster = (size) => ({
  fontFamily: "var(--font-poster)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.02, letterSpacing: "-0.02em",
  color: "var(--text-display)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
/* Mono is the instrument voice: labels and metadata only, 11-12px,
   uppercase with --ls-caps. Never headlines, never body. */
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
/* The one gradient element of any section that renders it. */
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
/* The one ambient grain layer of any section that renders it. */
const LibGrain = ({ opacity = 0.05 }) => (
  <div aria-hidden="true" style={{
    position: "absolute", inset: 0, backgroundImage: "var(--texture-grain)",
    opacity, pointerEvents: "none",
  }} />
);
/* Spring lives on marketing CTAs only; hover scale stays inside 1.03-1.04. */
const libSpringCss = `
.lib-fpost-cta { display: inline-flex; transition: transform var(--dur-base) var(--ease-spring); }
.lib-fpost-cta:hover { transform: scale(1.04); }
`;
const libSrOnly = {
  position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
  overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
};

/* === quote-poster · a testimonial at poster scale ================= */

function LibQuotePoster({
  quote = "Alfred found the wasted spend my agency swore did not exist. Now the Monday brief runs my Monday.",
  name = "Priya Menon",
  role = "VP marketing",
  company = "Meridian",
  variant = "default", /* "default" | "compact" */
}) {
  const compact = variant === "compact";
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)" }}>
      {/* the section's one grain layer */}
      <LibGrain opacity={0.05} />
      <div style={libContainer({
        position: "relative", maxWidth: 1000,
        paddingBlock: compact ? "72px 64px" : "112px 96px",
      })}>
        {/* oversized decorative quotemark: ornament, not content */}
        <div aria-hidden="true" style={{
          ...libPoster(compact ? "clamp(80px, 11vw, 150px)" : "clamp(110px, 15vw, 200px)"),
          lineHeight: 1, color: "var(--text-display)", opacity: 0.12, userSelect: "none",
          marginBlockEnd: compact ? "-0.42em" : "-0.46em",
        }}>{"“"}</div>
        <blockquote style={{ margin: 0 }}>
          <p style={{
            ...libPoster(compact ? "clamp(30px, 4.4vw, 60px)" : "clamp(40px, 6vw, 96px)"),
            lineHeight: 1.06, maxWidth: compact ? 720 : undefined,
          }}>{quote}</p>
        </blockquote>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBlockStart: compact ? 28 : 40 }}>
          <span aria-hidden="true" style={{ width: 36, borderBlockStart: "2px solid var(--accent)", flexShrink: 0 }} />
          {/* attribution in mono caps: the instrument voice labels the poster */}
          <span style={libMonoCaps({ fontSize: 12, color: "var(--text-secondary)" })}>
            {name} :: {role}, {company}
          </span>
        </div>
      </div>
    </section>
  );
}

/* === stamp-badges · circular rotating-text stamps ================= */

/* Ring text set on an SVG textPath around a circle of r=56 (circumference
   ~352). The label repeats twice and stretches to fill the ring evenly.
   Rotation runs on --dur-marquee (slow, ambient) and goes static under
   prefers-reduced-motion. One orange stamp max: orange is action, the rest
   of the row stays ink or periwinkle. */
const libStampCss = `
@keyframes lib-fpost-stamp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.lib-fpost-stamp-rotor { animation: lib-fpost-stamp-spin var(--dur-marquee) linear infinite; }
@media (prefers-reduced-motion: reduce) { .lib-fpost-stamp-rotor { animation: none; } }
`;
const LIB_STAMP_TONES = {
  ink: "var(--text-secondary)",
  periwinkle: "var(--text-on-tint-info)",
  orange: "var(--accent)",
};
const LIB_STAMPS = [
  { text: "Briefed by 07:00", tone: "ink" },
  { text: "Receipts not promises", tone: "orange" },
  { text: "Every channel watched", tone: "periwinkle" },
  { text: "Nothing ships unapproved", tone: "ink" },
];
const LibStamp = ({ text, tone, pathId, reverse }) => {
  const ring = `${text.toUpperCase()} • ${text.toUpperCase()} • `;
  return (
    <div role="img" aria-label={text} style={{ color: LIB_STAMP_TONES[tone] || LIB_STAMP_TONES.ink }}>
      <div className="lib-fpost-stamp-rotor" style={{ width: 150, height: 150, animationDirection: reverse ? "reverse" : undefined }}>
        <svg viewBox="0 0 150 150" width="150" height="150" aria-hidden="true" style={{ display: "block" }}>
          <defs>
            <path id={pathId} d="M 75,75 m -56,0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0" />
          </defs>
          <circle cx="75" cy="75" r="73" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="75" cy="75" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          <text style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: 2 }} fill="currentColor">
            <textPath href={`#${pathId}`} textLength="350" lengthAdjust="spacing">{ring}</textPath>
          </text>
          <path d="M75 64 L86 75 L75 86 L64 75 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};
function LibStampBadges({
  lead = "The working agreement, stamped on every brief",
  stamps = LIB_STAMPS, /* Array<{text, tone: 'ink' | 'periwinkle' | 'orange'}> · one orange max */
  footnote = "Four commitments, kept weekly",
  idPrefix = "lib-fpost-stamp", /* unique per instance if two rows share a page */
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <style>{libStampCss}</style>
      <div style={libContainer({ paddingBlock: "80px 72px", textAlign: "center" })}>
        <p style={{ ...libMonoCaps({ fontSize: 12, color: "var(--text-secondary)" }), margin: 0 }}>{lead}</p>
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center",
          gap: 36, marginBlockStart: 40,
        }}>
          {stamps.map((s, i) => (
            <LibStamp key={i} text={s.text} tone={s.tone} pathId={`${idPrefix}-${i}`} reverse={i % 2 === 1} />
          ))}
        </div>
        {footnote ? <p style={{ ...libMonoCaps({}), marginBlockStart: 40, marginBlockEnd: 0 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

/* === split-flap · the departure-board stat row ==================== */

/* Each value renders as per-letter tiles with the split-flap midline
   hairline; the letterforms are Clash via --font-poster so the board keeps
   its face on marketing dark. Exactly one value carries the phosphor glow:
   the live one. */
const LIB_FLAP_STATS = [
  { value: "07:00", label: "Morning brief lands", live: true },
  { value: "$18K", label: "Reallocation ready" },
  { value: "14", label: "Campaigns watched" },
  { value: "3", label: "Calls ranked" },
];
const LibFlapValue = ({ value, live }) => (
  <div style={{ position: "relative" }}>
    <span style={libSrOnly}>{value}</span>
    <div aria-hidden="true" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {String(value).split("").map((ch, i) => (
        <span key={i} style={{
          position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center",
          minWidth: 34, height: 50, paddingInline: 5,
          background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)", overflow: "hidden",
          fontFamily: "var(--font-poster)", fontWeight: "var(--fw-semibold)",
          fontSize: 28, lineHeight: 1, color: "var(--text-display)",
          /* the one phosphor element of this view: the live value's glyphs */
          textShadow: live ? "var(--shadow-phosphor)" : undefined,
        }}>
          {ch}
          <span style={{ position: "absolute", insetInline: 0, insetBlockStart: "50%", borderBlockStart: "1px solid var(--border-subtle)" }} />
        </span>
      ))}
    </div>
  </div>
);
function LibSplitFlap({
  boardLabel = "Departures :: this week's decisions",
  updatedLabel = "Board updated 08:02",
  stats = LIB_FLAP_STATS, /* Array<{value, label, live?}> · one live value max */
  footline = "Figures illustrative :: refreshed at every sync",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "80px 72px" })}>
        <div style={{
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
          background: "var(--surface-card)", overflow: "hidden",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12,
            paddingBlock: 13, paddingInline: 22, borderBlockEnd: "1px solid var(--border-subtle)", flexWrap: "wrap",
          }}>
            <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{boardLabel}</span>
            <span style={libMonoCaps({})}>{updatedLabel}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))" }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                paddingBlock: 28, paddingInline: 22,
                borderInlineStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
              }}>
                <LibFlapValue value={s.value} live={s.live} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBlockStart: 14 }}>
                  <span style={libMonoCaps({})}>{s.label}</span>
                  {s.live ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "var(--radius-circle)", background: "var(--accent)", flexShrink: 0 }} />
                      <span style={libMonoCaps({ color: "var(--text-on-tint-brand)" })}>Live</span>
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            paddingBlock: 12, paddingInline: 22, borderBlockStart: "1px solid var(--border-subtle)",
            background: "var(--surface-sunken)",
          }}>
            <span style={libMonoCaps({})}>{footline}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === gradient-panel-poster · ink type on the brand gradient ======= */

/* The section IS the page's one gradient element, worn full-bleed. Type on
   it is ink (via --surface-ink, which stays dark on every theme), the CTA
   is an ink fill, and the grain layer gives the panel its print feel. */
function LibGradientPanelPoster({
  eyebrow = "Alfred for Marketing",
  claim = "Decisions, delivered daily.",
  sub = "Every morning opens with the three calls that matter, ranked, with the evidence attached.",
  cta = "get started",
  variant = "default", /* "default" | "justified" */
}) {
  const justified = variant === "justified";
  const ink = "var(--surface-ink)";
  const inkCta = (
    <span className="lib-fpost-cta">
      <Button variant="primary" size="lg" style={{ background: ink, color: "var(--text-on-brand)", borderColor: "transparent" }}>{cta}</Button>
    </span>
  );
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--gradient-brand)" }}>
      <style>{libSpringCss}</style>
      {/* the section's one grain layer, over the gradient */}
      <LibGrain opacity={0.05} />
      <div style={libContainer({
        position: "relative", paddingBlock: justified ? "96px 80px" : "104px 96px",
        textAlign: justified ? "start" : "center",
      })}>
        <p style={{ ...libMonoCaps({ fontSize: 12, color: ink, opacity: 0.72 }), margin: 0 }}>{eyebrow}</p>
        <h2 style={{
          ...libPoster("clamp(48px, 7.5vw, 112px)"), lineHeight: 1.0, color: ink,
          maxWidth: justified ? undefined : 900,
          marginInline: justified ? undefined : "auto", marginBlockStart: 22,
        }}>{claim}</h2>
        {justified ? (
          /* CTA sits under the subcopy on the same left axis — pushed to the
             far right it shared no axis with anything and the composition
             fell apart (critic). */
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            gap: 26, marginBlockStart: 44,
          }}>
            <p style={{ ...libSub, fontSize: "var(--text-base)", color: ink, opacity: 0.8, maxWidth: 420 }}>{sub}</p>
            {inkCta}
          </div>
        ) : (
          <>
            <p style={{ ...libSub, color: ink, opacity: 0.8, maxWidth: 540, marginInline: "auto", marginBlockStart: 22 }}>{sub}</p>
            <div style={{ marginBlockStart: 36 }}>{inkCta}</div>
          </>
        )}
      </div>
    </section>
  );
}

/* === counter-band · animated big counters with mono labels ======== */

const LIB_COUNTERS = [
  { value: 24, prefix: "$", suffix: "K", label: "Wasted spend found", sublabel: "in Meridian's first pass" },
  { value: 70, suffix: "%", label: "Faster decisions", sublabel: "question to approved move" },
  { value: 15, suffix: " hrs", label: "Back every week", sublabel: "reporting hours returned" },
  { value: 12, label: "Decisions shipped", sublabel: "in a typical week" },
];
function LibCounterBand({
  eyebrow = "Kept, not claimed",
  title = "What a month with me returns",
  counters = LIB_COUNTERS, /* Array<{value, prefix?, suffix?, label, sublabel?}> */
  cta = "See it on your data",
  footnote = "Illustrative figures from the fictional Meridian rollout",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <style>{libSpringCss}</style>
      <div style={libContainer({ paddingBlock: "80px 72px" })}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 24, flexWrap: "wrap",
        }}>
          <div>
            <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(40), marginBlockStart: 16 }}>{title}</h2>
          </div>
          {/* the band's CTA carries the spring hover */}
          <span className="lib-fpost-cta">
            <Button variant="primary" size="lg">{cta}</Button>
          </span>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          columnGap: 0, rowGap: 28, marginBlockStart: 44,
        }}>
          {counters.map((c, i) => (
            <div key={i} style={{
              minWidth: 0,
              paddingInline: i === 0 ? "0 26px" : "26px",
              borderInlineStart: i === 0 ? undefined : "1px solid var(--border-subtle)",
            }}>
              {/* bundle AnimatedCounter: SSRs at the final value, counts up in view */}
              <AnimatedCounter
                value={c.value} prefix={c.prefix || ""} suffix={c.suffix || ""}
                style={{ alignItems: "flex-start", textAlign: "start" }}
              />
              <div style={{ ...libMonoCaps({ color: "var(--text-secondary)" }), marginBlockStart: 10 }}>{c.label}</div>
              {c.sublabel ? (
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginBlockStart: 5 }}>{c.sublabel}</div>
              ) : null}
            </div>
          ))}
        </div>
        <p style={{ ...libMonoCaps({}), marginBlockStart: 40, marginBlockEnd: 0 }}>{footnote}</p>
      </div>
    </section>
  );
}

/* === kinetic-stack · the staggered poster set piece =============== */

/* A static composition, no scroll-jacking: three poster lines with slight
   rotations, overlaps and z-offsets. Exactly one line is outlined and one
   is gradient-filled (the section's one gradient element). */
const LIB_KINETIC_LINES = [
  { text: "All signal.", style: "solid", tilt: -2, indent: 0, z: 2 },
  { text: "No noise.", style: "outline", tilt: 1.6, indent: 0.12, z: 1 },
  { text: "Your move.", style: "gradient-word", word: "move", tilt: -1.2, indent: 0.24, z: 3 },
];
function LibKineticStack({
  lines = LIB_KINETIC_LINES, /* Array<{text, style: 'solid' | 'outline' | 'gradient', tilt, indent, z}> */
  sub = "I read every channel overnight so the noise never reaches you. Your morning starts at the decision.",
  cta = "get started",
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)" }}>
      <style>{libSpringCss}</style>
      {/* the section's one grain layer */}
      <LibGrain opacity={0.04} />
      <div style={libContainer({ position: "relative", paddingBlock: "112px 96px" })}>
        <h2 style={{ margin: 0 }}>
          {lines.map((l, i) => {
            const base = {
              ...libPoster("clamp(52px, 8vw, 120px)"), lineHeight: 0.96,
              display: "block", width: "max-content", maxWidth: "100%",
              position: "relative", zIndex: l.z,
              transform: `rotate(${l.tilt}deg)`,
              marginBlockStart: i === 0 ? 0 : "-0.14em",
              marginInlineStart: `${(l.indent || 0) * 100}%`,
            };
            if (l.style === "outline") {
              return <span key={i} style={{ ...base, color: "transparent", WebkitTextStroke: "2px var(--text-secondary)" }}>{l.text}</span>;
            }
            if (l.style === "gradient") {
              return <span key={i} style={base}><LibGradientText>{l.text}</LibGradientText></span>;
            }
            if (l.style === "gradient-word" && l.word && l.text.includes(l.word)) {
              /* single-word gradient inside an otherwise solid line — the
                 budget-correct form of the gradient line */
              const at = l.text.indexOf(l.word);
              return (
                <span key={i} style={base}>
                  {l.text.slice(0, at)}
                  <LibGradientText>{l.word}</LibGradientText>
                  {l.text.slice(at + l.word.length)}
                </span>
              );
            }
            return <span key={i} style={base}>{l.text}</span>;
          })}
        </h2>
        <div style={{
          display: "flex", alignItems: "center", gap: 28,
          marginBlockStart: 48, flexWrap: "wrap",
        }}>
          <span className="lib-fpost-cta">
            <Button variant="primary" size="lg">{cta}</Button>
          </span>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 440 }}>{sub}</p>
        </div>
      </div>
    </section>
  );
}

window.LibQuotePoster = LibQuotePoster;
window.LibStampBadges = LibStampBadges;
window.LibSplitFlap = LibSplitFlap;
window.LibGradientPanelPoster = LibGradientPanelPoster;
window.LibCounterBand = LibCounterBand;
window.LibKineticStack = LibKineticStack;
