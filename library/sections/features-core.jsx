/* ============================================================
   Alfred : Inspiration Library · FEATURES (core).
   Six feature-section patterns distilled from the 107-site
   competitor sweep, rebuilt on design-system tokens so they
   render truthfully in light and in data-theme="dark". Every
   component ships complete default copy: a bare
   <LibIconFeatureGrid /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/features-core.json.
   ============================================================ */
const {
  EyebrowBadge, Button, AlfredMessage,
} = window.AlfredAIDesignSystem_1ce241;

/* file-private helpers (const arrows stay off window) */
const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.08, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
const libBody = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
const libKicker = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  fontWeight: "var(--fw-bold)", letterSpacing: "0.08em",
  textTransform: "uppercase", color: "var(--text-muted)",
};
const libCard = {
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)",
};
const libLinkCta = {
  display: "inline-flex", alignItems: "center", gap: 6, marginBlockStart: 20,
  paddingInline: 0, paddingBlock: 0, background: "transparent", border: "none",
  cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
  fontWeight: "var(--fw-semibold)", color: "var(--text-link)",
};

const LibSectionHead = ({ eyebrow, headline, sub, size = 40 }) => (
  <div style={{ textAlign: "center", marginBlockEnd: 56 }}>
    <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
    <h2 style={{ ...libDisplay(size), maxWidth: 760, marginInline: "auto", marginBlockStart: 18 }}>{headline}</h2>
    {sub ? <p style={{ ...libSub, maxWidth: 580, marginInline: "auto", marginBlockStart: 16 }}>{sub}</p> : null}
  </div>
);

/* single-color line glyphs, drawn like the design-system icon set */
const LIB_GLYPH_PATHS = {
  brief: ["M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z", "M14 3v4h4", "M9.5 12.5h5", "M9.5 16h5"],
  alert: ["M18 9.5a6 6 0 1 0-12 0c0 4.6-1.8 6-1.8 6h15.6s-1.8-1.4-1.8-6", "M10.4 19.5a1.8 1.8 0 0 0 3.2 0"],
  chat: ["M21 11.7a7.7 7.7 0 0 1-8.5 7.6 8 8 0 0 1-3.2-.8L4 20l1.5-4.6a7.7 7.7 0 1 1 15.5-3.7z"],
  action: ["M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z"],
  memory: ["M12 3 3.5 7.5 12 12l8.5-4.5z", "M3.5 12.5 12 17l8.5-4.5", "M3.5 17 12 21.5 20.5 17"],
  shield: ["M12 21.5s7.5-3 7.5-9.5V5.5L12 2.8 4.5 5.5V12c0 6.5 7.5 9.5 7.5 9.5z"],
  check: ["M4.5 12.5 10 18 19.5 6.5"],
  x: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
  chevron: ["M9.5 5.5 16 12l-6.5 6.5"],
};
const libGlyph = (name, size = 20, strokeWidth = 1.8) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, display: "block" }}>
    {(LIB_GLYPH_PATHS[name] || LIB_GLYPH_PATHS.check).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const LIB_TAG_TONES = {
  brand: { background: "var(--accent-soft)", color: "var(--text-on-tint-brand)" },
  success: { background: "var(--success-100)", color: "var(--text-on-tint-success)" },
  neutral: { background: "var(--surface-sunken)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" },
};
const LibTag = ({ tone = "neutral", children }) => (
  <span style={{
    ...LIB_TAG_TONES[tone] || LIB_TAG_TONES.neutral,
    fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: "var(--fw-semibold)",
    letterSpacing: "0.02em", paddingInline: 9, paddingBlock: 3,
    borderRadius: "var(--radius-pill)", whiteSpace: "nowrap",
  }}>{children}</span>
);

/* ===== icon-feature-grid · icon + headline + body cards; checklist variant for breadth ===== */
function LibIconFeatureGrid({
  eyebrow = "What I do",
  headline = "Briefs, flags, answers, action",
  sub = "Four jobs, done every day, so you decide faster than the market moves.",
  items = [
    { icon: "brief", title: "A prioritised daily brief", body: "Every morning: what changed, why it changed, what to do about it, ranked by business impact." },
    { icon: "alert", title: "Proactive flags", body: "I surface risks and opportunities before you ask. The first sign of trouble is my alert, not a board question." },
    { icon: "chat", title: "On-demand answers", body: "Ask any business question in plain language and get an answer grounded in your actual data, in seconds." },
    { icon: "action", title: "Execution on command", body: "Approve a recommendation and I carry it out inside your connected tools. Every change logged, every step traceable." },
    { icon: "memory", title: "Memory that compounds", body: "I remember every signal, decision, and outcome. Not your files, not your meetings: your decisions and what caused what." },
    { icon: "shield", title: "Governed by design", body: "Read-only connections by default, write-back only on your say-so, and a full audit trail behind every action." },
  ],
  layout = "three-col", /* "three-col" | "two-by-two" | "checklist" */
}) {
  if (layout === "checklist") {
    return (
      <section style={{ background: "var(--bg-page)" }}>
        <div style={libContainer({ paddingBlock: "96px 104px" })}>
          <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
          <ul style={{
            listStyle: "none", margin: 0, padding: 0, maxWidth: 880, marginInline: "auto",
            display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12,
          }}>
            {items.map((it, i) => (
              <li key={i} style={{
                ...libCard, borderRadius: "var(--radius-lg)", paddingInline: 18, paddingBlock: 14,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ color: "var(--accent)" }}>{libGlyph("check", 16, 2.2)}</span>
                <span style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{it.title}</span>
                <span style={{ color: "var(--text-muted)", transform: "scaleX(var(--flip))" }}>{libGlyph("chevron", 14, 2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  const cols = layout === "two-by-two" ? 2 : 3;
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 24, maxWidth: cols === 2 ? 880 : undefined, marginInline: "auto" }}>
          {items.map((it, i) => (
            <article key={i} style={{ ...libCard, padding: 28 }}>
              <div style={{
                inlineSize: 40, blockSize: 40, borderRadius: "var(--radius-md)",
                background: "var(--accent-soft)", color: "var(--text-on-tint-brand)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{libGlyph(it.icon || "brief")}</div>
              <h3 style={{ ...libDisplay(20), marginBlockStart: 18 }}>{it.title}</h3>
              <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 10 }}>{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== feature-split artifacts · proof sits next to every claim ===== */
const LibBriefArtifact = () => (
  <div style={{ ...libCard, boxShadow: "var(--elevation-raised)", padding: 24 }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBlockEnd: 14 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>Your morning brief</span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Monday, 8:02 AM</span>
    </div>
    {[
      { rank: "1", line: "Paid search costs rose 14% week over week", tag: "Act today", tone: "brand" },
      { rank: "2", line: "The Meridian renewal conversation slipped a week", tag: "Watch", tone: "neutral" },
      { rank: "3", line: "Email reactivation is running 9% ahead of plan", tag: "On track", tone: "success" },
    ].map((r, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, paddingBlock: 12, borderBlockStart: "1px solid var(--border-subtle)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 17, color: "var(--text-muted)", inlineSize: 14 }}>{r.rank}</span>
        <span style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{r.line}</span>
        <LibTag tone={r.tone}>{r.tag}</LibTag>
      </div>
    ))}
    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", margin: 0, marginBlockStart: 10 }}>Ranked by business impact. Three items, never fifty.</p>
  </div>
);

const LibAuditArtifact = () => (
  <div style={{ ...libCard, boxShadow: "var(--elevation-raised)", padding: 24 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBlockEnd: 14 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>Audit trail</span>
      <LibTag tone="success">Every action logged</LibTag>
    </div>
    {[
      { dot: "var(--success-500)", line: "Alfred paused two ad sets with under 2% pipeline contribution", time: "09:42" },
      { dot: "var(--accent)", line: "Priya Menon approved the reallocation into the winning channel", time: "09:38" },
      { dot: "var(--text-muted)", line: "Flag raised: paid search costs trending up for a third week", time: "07:15" },
    ].map((r, i) => (
      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingBlock: 12, borderBlockStart: "1px solid var(--border-subtle)" }}>
        <span style={{ inlineSize: 8, blockSize: 8, borderRadius: "var(--radius-circle)", background: r.dot, flexShrink: 0, marginBlockStart: 5 }} />
        <span style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{r.line}</span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{r.time}</span>
      </div>
    ))}
    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", margin: 0, marginBlockStart: 10 }}>Attributable, reversible, and yours to inspect.</p>
  </div>
);

const LIB_SPLIT_ANSWER = [
  { role: "user", text: "Which campaigns look good but add nothing to pipeline?" },
  {
    role: "alfred",
    text: "Two. Both have strong platform metrics and under 2% pipeline contribution. Pausing them frees an estimated 12% of monthly spend. Want me to stage it?",
    sources: [
      { name: "Ad platforms", detail: "spend", status: "live" },
      { name: "CRM", detail: "pipeline", status: "live" },
    ],
  },
];
const LibConversationArtifact = ({ messages = LIB_SPLIT_ANSWER }) => (
  <div style={{ ...libCard, boxShadow: "var(--elevation-raised)", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
    {messages.map((m, i) => (
      m.role === "alfred"
        ? <AlfredMessage key={i} role="alfred" sources={m.sources}>{m.text}</AlfredMessage>
        : <AlfredMessage key={i} role="user" name="You">{m.text}</AlfredMessage>
    ))}
  </div>
);

/* ===== feature-split · numbered zig-zag chapters, a different artifact per split ===== */
function LibFeatureSplit2({
  eyebrow = "The work",
  headline = "The layer between your data and your decisions",
  items = [
    {
      eyebrow: "The brief", headline: "Read less, know more",
      body: "Every morning I hand you one prioritised brief: what moved, what's at risk, what to act on today. One version of the truth, not five versions that contradict each other at board time.",
      ctaLabel: "See a sample brief", artifact: "brief",
      screenshotAlt: "The Alfred daily brief ranked by business impact",
    },
    {
      eyebrow: "Seek Alfred", headline: "Every answer starts in your data",
      body: "Ask in plain language, get an answer grounded in your actual numbers in seconds. 85% of marketing questions answered without waiting on an analyst.",
      ctaLabel: "See it answer", artifact: "answer",
      screenshotAlt: "A plain-language question answered from connected marketing data",
    },
    {
      eyebrow: "From flag to fix", headline: "From insight to execution in one step",
      body: "Detection without action has no financial value. When you approve a recommendation, I execute it inside the connected ad platform or CRM, and every change lands in a full audit trail.",
      ctaLabel: "See the audit trail", artifact: "audit",
      screenshotAlt: "An approved recommendation executing inside a connected ad platform",
    },
  ],
  layout = "zigzag", /* "zigzag" | "sticky" */
}) {
  const sticky = layout === "sticky";
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} />
        <div style={{ display: "flex", flexDirection: "column", gap: 88 }}>
          {items.map((it, i) => {
            const artifactFirst = !sticky && i % 2 === 1;
            const artifact = (
              <div role="img" aria-label={it.screenshotAlt || it.headline}
                style={sticky ? { minWidth: 0, position: "sticky", insetBlockStart: 96 } : { minWidth: 0 }}>
                {it.paneMessages ? <LibConversationArtifact messages={it.paneMessages} />
                  : it.artifact === "answer" ? <LibConversationArtifact />
                  : it.artifact === "audit" ? <LibAuditArtifact />
                  : <LibBriefArtifact />}
              </div>
            );
            const text = (
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 15, letterSpacing: "-0.01em", color: "var(--text-on-tint-brand)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={libKicker}>{it.eyebrow}</span>
                </div>
                <h3 style={{ ...libDisplay(32), maxWidth: 440, marginBlockStart: 14 }}>{it.headline}</h3>
                <p style={{ ...libBody, maxWidth: 440, marginBlockStart: 14 }}>{it.body}</p>
                {it.ctaLabel ? (
                  <button type="button" style={libLinkCta}>
                    {it.ctaLabel}
                    <span style={{ display: "inline-flex", transform: "scaleX(var(--flip))" }}>{libGlyph("chevron", 14, 2.2)}</span>
                  </button>
                ) : null}
              </div>
            );
            return (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: artifactFirst ? "minmax(0, 1.08fr) minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1.08fr)",
                gap: 56, alignItems: sticky ? "start" : "center",
              }}>
                {artifactFirst ? <>{artifact}{text}</> : <>{text}{artifact}</>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== bento-grid · mixed-size platform map with one glowing hero cell ===== */
const LIB_BENTO_SPANS = {
  large: { gridColumn: "span 2", gridRow: "span 2" },
  tall: { gridRow: "span 2" },
  wide: { gridColumn: "1 / -1" },
  small: {},
};
function LibBentoGrid2({
  eyebrow = "The platform",
  headline = "One memory, every decision",
  sub = "Alfred for Marketing is live today. Underneath it sits Alfred Core, the memory every future module shares.",
  items = [
    { size: "large", title: "Alfred Core remembers", body: "Every signal, decision, and outcome feeds one organisational memory, so my recommendations get sharper with every quarter you run. Not your files, not your meetings: your decisions and what caused what." },
    { size: "tall", title: "The daily brief", body: "What changed, why it changed, what to do about it. Ranked by impact, on your desk before your first meeting." },
    { size: "small", title: "70% faster decisions", body: "From question to call in minutes, not days." },
    { size: "small", title: "Plain language, both ways", body: "No query builder. Ask the way you'd ask a person." },
    { size: "small", title: "Audit trail on everything", body: "Every action I take is logged, attributable, and traceable." },
    { size: "wide", title: "Your stack stays your stack", body: "I connect to the tools you already run through secure, read-only APIs. I don't replace the stack, I make sense of it.", tags: ["Ads", "CRM", "Analytics", "Email", "Data warehouse"] },
  ],
  layout = "bento", /* "bento" | "uniform" */
}) {
  const uniform = layout === "uniform";
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
          {items.map((it, i) => {
            const size = uniform ? "small" : (it.size || "small");
            const hero = !uniform && size === "large";
            return (
              <article key={i} style={{
                ...libCard,
                ...LIB_BENTO_SPANS[size] || {},
                padding: hero ? 36 : 28,
                background: hero ? "var(--glow-periwinkle), var(--surface-card)" : "var(--surface-card)",
                display: "flex", flexDirection: "column", justifyContent: hero ? "flex-end" : "flex-start",
              }}>
                <h3 style={libDisplay(hero ? 28 : 19)}>{it.title}</h3>
                <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 10, maxWidth: hero ? 520 : undefined }}>{it.body}</p>
                {it.tags && it.tags.length ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBlockStart: 16 }}>
                    {it.tags.map((t, ti) => (
                      <span key={ti} style={{
                        fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
                        paddingInline: 10, paddingBlock: 4,
                      }}>{t}</span>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== how-it-works · numbered verb-led steps, ending in a CTA that defuses fear ===== */
function LibHowItWorks({
  eyebrow = "How it works",
  headline = "Learn. Nudge. Recommend. Act.",
  sub = "Four stages between your raw data and a confident call.",
  items = [
    { number: "01", title: "Learn", body: "I connect to your existing stack through secure, read-only APIs and sync up to a year of history. No engineering effort, no workflow change." },
    { number: "02", title: "Nudge", body: "I correlate signals across channels, spend, and funnel stages around the clock, and flag what needs your eyes before you go looking." },
    { number: "03", title: "Recommend", body: "Every flag arrives with the cause, the options, and a recommended action in plain language, ranked by business impact." },
    { number: "04", title: "Act", body: "Approve, and I execute inside your connected tools. Every change is logged in a full audit trail." },
  ],
  ctaLabel = "See it on your data",
  ctaCaption = "Read-only by default. Nothing changes without your approval.",
  orientation = "horizontal", /* "horizontal" | "vertical" */
}) {
  const cta = ctaLabel ? (
    <div style={{ textAlign: "center", marginBlockStart: 56 }}>
      <Button variant="primary" size="lg">{ctaLabel}</Button>
      {ctaCaption ? <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 14, marginBlockEnd: 0 }}>{ctaCaption}</p> : null}
    </div>
  ) : null;
  if (orientation === "vertical") {
    return (
      <section style={{ background: "var(--bg-page)" }}>
        <div style={libContainer({ paddingBlock: "96px 104px", maxWidth: 800 })}>
          <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "44px minmax(0, 1fr)", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <span style={{
                    inlineSize: 44, blockSize: 44, borderRadius: "var(--radius-circle)",
                    border: "1px solid var(--border-default)", background: "var(--surface-card)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 14,
                    letterSpacing: "-0.01em", color: "var(--text-primary)", flexShrink: 0,
                  }}>{it.number}</span>
                  {i < items.length - 1 ? <span style={{ inlineSize: 1, flex: 1, background: "var(--border-subtle)" }} /> : null}
                </div>
                <div style={{ paddingBlockEnd: i < items.length - 1 ? 36 : 0 }}>
                  <h3 style={libDisplay(22)}>{it.title}</h3>
                  <p style={{ ...libBody, marginBlockStart: 8, maxWidth: 560 }}>{it.body}</p>
                </div>
              </div>
            ))}
          </div>
          {cta}
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`, gap: 32 }}>
          {items.map((it, i) => (
            <div key={i} style={{ borderBlockStart: "1px solid var(--border-default)", paddingBlockStart: 22 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 16, letterSpacing: "-0.01em", color: "var(--text-muted)" }}>{it.number}</span>
              <h3 style={{ ...libDisplay(22), marginBlockStart: 12 }}>{it.title}</h3>
              <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 10 }}>{it.body}</p>
            </div>
          ))}
        </div>
        {cta}
      </div>
    </section>
  );
}

/* ===== comparison-table · category-level matrix, Alfred column tinted ===== */
function LibComparisonTable({
  eyebrow = "The difference",
  headline = "Dashboards forget. Alfred remembers.",
  sub = "BI was built for analysts. Assistants were built for inboxes. I was built for the person who makes the call.",
  columns = ["", "Dashboards and BI", "Generic AI assistants", "Alfred"],
  items = [
    { label: "Who it serves", cells: ["Analysts who build the queries", "Whoever types the prompt", "The leader who owns the number"] },
    { label: "When it speaks", cells: ["When you ask", "When you ask", "Before you ask: flags arrive proactively"] },
    { label: "What it gives you", cells: ["Charts of what happened", "Fluent text, thin data", "What changed, why it changed, what to do about it"] },
    { label: "Memory", cells: ["Forgets last quarter's context", "Forgets last week's chat", "Remembers every signal, decision, and outcome"] },
    { label: "Action", cells: ["Stops at the chart", "Stops at the draft", "Executes in your tools on command, fully logged"] },
  ],
  highlight = -1, /* column index to tint; -1 = the last column */
  ctaLabel = "Talk to sales",
}) {
  const hi = highlight === -1 ? columns.length - 1 : highlight;
  const cellType = {
    paddingInline: 20, paddingBlock: 16, fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-normal)", verticalAlign: "top", textAlign: "start",
  };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px", maxWidth: 1040 })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ inlineSize: "100%", minInlineSize: 700, borderCollapse: "separate", borderSpacing: 0, fontFamily: "var(--font-sans)" }}>
            <thead>
              <tr>
                {columns.map((c, ci) => (
                  <th key={ci} scope="col" style={{
                    ...cellType, fontWeight: "var(--fw-bold)",
                    color: ci === hi ? "var(--text-primary)" : "var(--text-secondary)",
                    background: ci === hi ? "var(--accent-soft)" : "transparent",
                    borderStartStartRadius: ci === hi ? "var(--radius-lg)" : 0,
                    borderStartEndRadius: ci === hi ? "var(--radius-lg)" : 0,
                    borderBlockEnd: "1px solid var(--border-default)",
                  }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row, ri) => {
                const last = ri === items.length - 1;
                const divider = last ? "none" : "1px solid var(--border-subtle)";
                return (
                  <tr key={ri}>
                    <th scope="row" style={{ ...cellType, fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", borderBlockEnd: divider }}>{row.label}</th>
                    {row.cells.map((cell, ci) => {
                      const isHi = ci + 1 === hi;
                      return (
                        <td key={ci} style={{
                          ...cellType,
                          color: isHi ? "var(--text-primary)" : "var(--text-secondary)",
                          fontWeight: isHi ? "var(--fw-medium)" : undefined,
                          background: isHi ? "var(--accent-soft)" : "transparent",
                          borderBlockEnd: divider,
                          borderEndStartRadius: isHi && last ? "var(--radius-lg)" : 0,
                          borderEndEndRadius: isHi && last ? "var(--radius-lg)" : 0,
                        }}>{cell}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {ctaLabel ? (
          <div style={{ display: "flex", justifyContent: "center", marginBlockStart: 44 }}>
            <Button variant="primary" size="lg">{ctaLabel}</Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ===== before-after · the same Monday, two ways; pains in second person ===== */
function LibBeforeAfter({
  eyebrow = "Before and after",
  headline = "The same Monday, two ways",
  beforeTitle = "Before Alfred",
  beforeItems = [
    "Five dashboards, three contradicting numbers",
    "An analyst request queue two days deep",
    "The board question you can't answer in the room",
    "Sunday night spent stitching reports",
  ],
  afterTitle = "With Alfred",
  afterItems = [
    "One brief, one version of the truth",
    "85% of questions answered without an analyst",
    "What changed, why it changed, what to do about it",
    "15+ hours a week back for strategy",
  ],
  ctaLabel = "Talk to sales",
}) {
  const listStyle = { listStyle: "none", margin: 0, padding: 0, marginBlockStart: 20, display: "flex", flexDirection: "column", gap: 14 };
  const rowStyle = { display: "flex", gap: 10, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", lineHeight: "var(--lh-normal)" };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24, maxWidth: 940, marginInline: "auto" }}>
          <div style={{ background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 32 }}>
            <h3 style={{ ...libDisplay(20), color: "var(--text-secondary)" }}>{beforeTitle}</h3>
            <ul style={listStyle}>
              {beforeItems.map((b, i) => (
                <li key={i} style={{ ...rowStyle, color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-muted)", marginBlockStart: 3 }}>{libGlyph("x", 14, 2)}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "var(--glow-periwinkle), var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-2xl)", padding: 32, boxShadow: "var(--elevation-raised)" }}>
            <h3 style={libDisplay(20)}>{afterTitle}</h3>
            <ul style={listStyle}>
              {afterItems.map((a, i) => (
                <li key={i} style={{ ...rowStyle, color: "var(--text-primary)" }}>
                  <span style={{ color: "var(--accent)", marginBlockStart: 3 }}>{libGlyph("check", 15, 2.2)}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {ctaLabel ? (
          <div style={{ display: "flex", justifyContent: "center", marginBlockStart: 48 }}>
            <Button variant="primary" size="lg">{ctaLabel}</Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

window.LibIconFeatureGrid = LibIconFeatureGrid;
window.LibFeatureSplit2 = LibFeatureSplit2;
window.LibBentoGrid2 = LibBentoGrid2;
window.LibHowItWorks = LibHowItWorks;
window.LibComparisonTable = LibComparisonTable;
window.LibBeforeAfter = LibBeforeAfter;
