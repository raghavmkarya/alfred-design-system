/* ============================================================
   Alfred — Inspiration Library · AGENT-STORY.
   The homepage story of an AI teammate sold like a hire, translated
   to Alfred: superlative hero with a three-verb cadence, operation
   highlights as token-built product stills, voice learning, the
   night shift, the overnight diff, the pre-planned week, the
   agency contrast and live counters. Pattern anatomy is borrowed;
   every word and pixel is Alfred's (first-person chief of staff,
   fictional entities only, tokens only, truthful in both themes).
   Every component ships complete default copy: a bare
   <LibEmployeeHero /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/agent-story.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Badge, Sparkline, AnimatedCounter,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.06, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
/* The instrument layer's voice: true mono, 11-13px, uppercase where it
   labels. Mono never sets headlines or body. */
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
const libMono = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)", ...extra,
});
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const libVisuallyHidden = {
  position: "absolute", width: 1, height: 1, overflow: "hidden",
  clip: "rect(0 0 0 0)", whiteSpace: "nowrap",
};
/* The one gradient element of any section that renders it. */
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
const libAccent = (title, accent) => (accent && title.includes(accent)) ? (
  <>
    {title.slice(0, title.indexOf(accent))}
    <LibGradientText>{accent}</LibGradientText>
    {title.slice(title.indexOf(accent) + accent.length)}
  </>
) : title;
const libPane = (extra) => ({
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-lg)", boxShadow: "var(--elevation-raised)",
  overflow: "hidden", minWidth: 0, ...extra,
});
const libPaneHeader = {
  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
  paddingBlock: 10, paddingInline: 16, borderBlockEnd: "1px solid var(--border-subtle)",
  flexWrap: "wrap",
};
const libPlayGlyph = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.8l5 3.2-5 3.2z" fill="currentColor" stroke="none" />
  </svg>
);
/* Centered section intro shared by the band-style sections. */
function LibIntro({ eyebrow, title, titleAccent, sub, maxSub = 620 }) {
  return (
    <div style={{ textAlign: "center" }}>
      <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
      <h2 style={{ ...libDisplay(42), maxWidth: 720, marginInline: "auto", marginBlockStart: 18 }}>{libAccent(title, titleAccent)}</h2>
      {sub ? <p style={{ ...libSub, maxWidth: maxSub, marginInline: "auto", marginBlockStart: 16 }}>{sub}</p> : null}
    </div>
  );
}

/* === employee-hero · the last-hire claim with a verb cadence ====== */

function LibEmployeeHero({
  eyebrow = "Alfred for Marketing",
  title = "The last hire your marketing plan needs",
  titleAccent = "hire",
  cadence = "Watches. Reasons. Ships.",
  cadenceTail = "Every morning, before your first meeting.",
  sub = "I read every channel overnight, draft the moves with the reasoning attached, and hand you a ranked brief. Nothing ships without your sign-off.",
  primaryCta = "get started",
  secondaryCta = "Watch the film",
  finePrint = "Free for 14 days. Cancel anytime. Set up in one afternoon.",
  variant = "centered", /* "centered" | "poster" */
}) {
  const poster = variant === "poster";
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "112px 96px", textAlign: "center" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        {poster ? (
          /* the page's ONE poster statement (style-absorption budget) */
          <h1 style={{
            fontFamily: "var(--font-poster)", fontWeight: "var(--fw-semibold)",
            fontSize: "var(--text-poster)", lineHeight: 1.0, letterSpacing: "-0.02em",
            color: "var(--text-primary)", margin: 0, marginBlockStart: 26,
          }}>{libAccent(title, titleAccent)}</h1>
        ) : (
          <h1 style={{ ...libDisplay(60), maxWidth: 840, marginInline: "auto", marginBlockStart: 24 }}>{libAccent(title, titleAccent)}</h1>
        )}
        {/* the three-verb cadence line: display voice, then the tail settles */}
        <p style={{ margin: 0, marginBlockStart: 22, fontSize: "var(--text-xl)", lineHeight: "var(--lh-normal)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{cadence}</span>
          {" "}
          <span style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>{cadenceTail}</span>
        </p>
        {sub ? <p style={{ ...libSub, maxWidth: 600, marginInline: "auto", marginBlockStart: 16 }}>{sub}</p> : null}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBlockStart: 34, flexWrap: "wrap" }}>
          <Button variant="primary" size="lg">{primaryCta}</Button>
          <Button variant="outline" size="lg" style={{ ...libGhostCta, display: "inline-flex", alignItems: "center", gap: 8 }}>
            {libPlayGlyph}
            {secondaryCta}
          </Button>
        </div>
        {finePrint ? (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 16, marginBlockEnd: 0 }}>{finePrint}</p>
        ) : null}
      </div>
    </section>
  );
}

/* === highlights-grid · four claims, each with a token-built still == */

/* The stills are built from tokens, never images: each is a small
   product moment that proves the card's claim. */
function LibStillBrief() {
  return (
    <div style={libPane({ borderRadius: "var(--radius-md)", boxShadow: "none" })}>
      <div style={libPaneHeader}>
        <span style={libMonoCaps({})}>Morning brief</span>
        <span style={libMonoCaps({})}>07:30</span>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Blended ROAS", value: "4.6x", delta: "+0.3", tone: "var(--text-on-tint-success)" },
          { label: "CAC", value: "$182", delta: "-6%", tone: "var(--text-on-tint-success)" },
          { label: "Search CPC", value: "$3.41", delta: "+9%", tone: "var(--text-on-tint-danger)" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", flex: 1, minWidth: 0 }}>{r.label}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{r.value}</span>
            <span style={libMono({ color: r.tone })}>{r.delta}</span>
          </div>
        ))}
        <Sparkline points={[3.9, 4.1, 4.0, 4.3, 4.4, 4.6]} height={36} ariaLabel="Blended ROAS trend, six weeks rising" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
function LibStillMove() {
  return (
    <div style={libPane({ borderRadius: "var(--radius-md)", boxShadow: "none" })}>
      <div style={libPaneHeader}>
        <span style={libMonoCaps({})}>Drafted move</span>
        <Badge tone="brand" dot>Awaiting sign-off</Badge>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-lg)", color: "var(--text-primary)" }}>$6K to the winning creative pair</div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 8 }}>
          Search CPCs rose for a third straight week while PMax held 22% under target cost-per-lead. Reasoning attached.
        </p>
        <div style={{ display: "flex", gap: 8, marginBlockStart: 14 }}>
          <Button variant="primary" size="sm">Approve</Button>
          <Button variant="outline" size="sm" style={libGhostCta}>Ask me why</Button>
        </div>
      </div>
    </div>
  );
}
function LibStillWatch() {
  return (
    <div style={libPane({ borderRadius: "var(--radius-md)", boxShadow: "none" })}>
      <div style={libPaneHeader}>
        <span style={libMonoCaps({})}>Change watch</span>
        <span style={libMonoCaps({})}>Overnight</span>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          "Ardent moved its demo CTA above the fold",
          "Lanternworks started bidding on your brand terms",
          "A new G2 category page listed you fourth",
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={libMono({ color: "var(--text-on-tint-brand)", flexShrink: 0 })}>+</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function LibStillDraft() {
  return (
    <div style={libPane({ borderRadius: "var(--radius-md)", boxShadow: "none" })}>
      <div style={libPaneHeader}>
        <span style={libMonoCaps({})}>Wednesday send</span>
        <Badge tone="success" dot>On voice</Badge>
      </div>
      <div style={{ padding: 16 }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-relaxed)", margin: 0 }}>
          "One number moved this week that deserves your attention. Here is why it did."
        </p>
        <p style={{ ...libMono({ color: "var(--text-muted)" }), marginBlockStart: 12, marginBlockEnd: 0 }}>drafted from 214 shipped pieces</p>
      </div>
    </div>
  );
}
const LIB_STILLS = { brief: LibStillBrief, move: LibStillMove, watch: LibStillWatch, draft: LibStillDraft };
const LIB_HIGHLIGHT_CARDS = [
  { claim: "A ranked brief, every morning.", outcome: "What moved, why it moved, and the move I'd make next.", panel: "brief", lead: true },
  { claim: "Reallocations drafted, not suggested.", outcome: "Approve in one tap and I ship it, on the record.", panel: "move" },
  { claim: "Competitor watch through the night.", outcome: "What changed while you slept, ranked by what it costs you.", panel: "watch" },
  { claim: "Content that sounds like you.", outcome: "Drafts held against your voice before you ever see them.", panel: "draft" },
];

function LibHighlightsGrid({
  eyebrow = "The highlights",
  title = "What a morning with me looks like",
  sub = "Four things that are already done before you sit down. Each one lands with the evidence attached.",
  cards = LIB_HIGHLIGHT_CARDS, /* Array<{claim, outcome, panel: 'brief'|'move'|'watch'|'draft', lead?}> */
  variant = "grid", /* "grid" | "lead-card" */
}) {
  const leadWide = variant === "lead-card";
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h2 style={{ ...libDisplay(42), maxWidth: 640, marginBlockStart: 18 }}>{title}</h2>
        <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 16 }}>{sub}</p>
        {/* default reads 2x2 at desktop; lead-card puts the wide lead over a row of three */}
        <div style={{
          display: "grid",
          gridTemplateColumns: leadWide
            ? "repeat(auto-fit, minmax(min(300px, 100%), 1fr))"
            : "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
          gap: 20, marginBlockStart: 44,
        }}>
          {cards.map((c, i) => {
            const Still = LIB_STILLS[c.panel] || LibStillBrief;
            const isLead = !!c.lead;
            return (
              <div key={i} style={{
                minWidth: 0,
                gridColumn: leadWide && isLead ? "1 / -1" : undefined,
                background: isLead ? "var(--accent-soft)" : "var(--surface-sunken)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xl)", padding: 24,
                display: "grid",
                gridTemplateColumns: leadWide && isLead ? "minmax(0, 1fr) minmax(0, 1.1fr)" : "minmax(0, 1fr)",
                gap: 20, alignItems: "center",
              }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-xl)", lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>
                    {c.claim}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 8 }}>{c.outcome}</p>
                </div>
                <Still />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* === voice-learned · generic rejected, on-voice shipped =========== */

const LIB_VOICE_SAMPLES = [
  {
    tag: "Generic", verdict: "rejected", onVoice: false,
    text: "We are thrilled to announce our latest product update, packed with powerful new features designed to supercharge your workflow!",
    note: "sounds like everyone",
  },
  {
    tag: "Yours", verdict: "shipped", onVoice: true,
    text: "Two changes this week worth your time. The first one saves your team an afternoon; the second is why CAC just fell.",
    note: "matched to 214 shipped pieces",
  },
];

function LibVoiceLearned({
  eyebrow = "Voice",
  title = "It sounds like you wrote it",
  titleAccent = "you",
  sub = "I learn your voice from what you have already shipped: the site, the sends, the decks. Then I hold every draft against it and reject the ones that read like a template.",
  paneLabel = "Voice check",
  paneMeta = "weekly send",
  samples = LIB_VOICE_SAMPLES, /* Array<{tag, verdict, onVoice, text, note}> */
  footLine = "voice model rebuilt weekly from your shipped work",
  mediaSide = "end", /* "end" | "start" */
}) {
  const pane = (
    <div style={libPane({})}>
      <div style={libPaneHeader}>
        <span style={libMonoCaps({})}>{paneLabel}</span>
        <span style={libMonoCaps({})}>{paneMeta}</span>
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
        {samples.map((s, i) => (
          <div key={i} style={{
            background: s.onVoice ? "var(--accent-soft)" : "var(--surface-sunken)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)", padding: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={libMonoCaps({ color: s.onVoice ? "var(--text-on-tint-brand)" : "var(--text-muted)" })}>{s.tag} · {s.verdict}</span>
              <span style={libMono({ fontSize: 11, color: "var(--text-muted)" })}>{s.note}</span>
            </div>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)",
              color: s.onVoice ? "var(--text-primary)" : "var(--text-muted)", margin: 0, marginBlockStart: 10,
            }}>"{s.text}"</p>
          </div>
        ))}
      </div>
      <div style={{ ...libPaneHeader, borderBlockEnd: "none", borderBlockStart: "1px solid var(--border-subtle)" }}>
        <span style={libMonoCaps({})}>{footLine}</span>
      </div>
    </div>
  );
  const copy = (
    <div>
      <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
      <h2 style={{ ...libDisplay(44), marginBlockStart: 18 }}>{libAccent(title, titleAccent)}</h2>
      <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 16 }}>{sub}</p>
    </div>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 96px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        gap: 56, alignItems: "center",
      })}>
        {mediaSide === "start" ? <>{pane}{copy}</> : <>{copy}{pane}</>}
      </div>
    </section>
  );
}

/* === always-on-band · the night shift, timestamped ================ */

const LIB_NIGHT_SHIFT = [
  { time: "01:12", text: "Synced all 12 sources. Zero gaps." },
  { time: "02:47", text: "Reran pacing on 14 live campaigns." },
  { time: "04:05", text: "Caught search CPCs rising for a third week." },
  { time: "05:38", text: "Drafted the reallocation, reasoning attached." },
  { time: "07:30", text: "Your brief is ready. Three decisions, ranked.", payoff: true },
];

function LibAlwaysOnBand({
  eyebrow = "Always on",
  title = "I work while you sleep",
  sub = "The night shift runs every night. By the time you open your laptop the checking is done, the drafts are written and the decisions are ranked.",
  entries = LIB_NIGHT_SHIFT, /* Array<{time, text, payoff?}> */
  footLine = "runs nightly · nothing ships without you",
  variant = "default", /* "default" | "compact" */
}) {
  const rows = variant === "compact" ? entries.filter((e) => e.payoff || entries.indexOf(e) % 2 === 0) : entries;
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <LibIntro eyebrow={eyebrow} title={title} sub={sub} />
        <div style={{ maxWidth: 620, marginInline: "auto", marginBlockStart: 44 }}>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
            {rows.map((e, i) => (
              <li key={i} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                paddingBlock: 14,
                borderBlockStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
                background: e.payoff ? "var(--accent-soft)" : "transparent",
                borderRadius: e.payoff ? "var(--radius-md)" : 0,
                paddingInline: e.payoff ? 16 : 0,
              }}>
                <span style={libMono({ color: e.payoff ? "var(--text-on-tint-brand)" : "var(--text-muted)", flexShrink: 0, lineHeight: "22px" })}>{e.time}</span>
                <span aria-hidden="true" style={{
                  width: 7, height: 7, borderRadius: "var(--radius-pill)", flexShrink: 0,
                  marginBlockStart: 8,
                  background: e.payoff ? "var(--accent)" : "var(--border-default)",
                  /* the view's ONE phosphor element: the morning-ready dot */
                  boxShadow: e.payoff ? "var(--shadow-phosphor)" : "none",
                }} />
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", lineHeight: "22px",
                  color: e.payoff ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: e.payoff ? "var(--fw-semibold)" : "var(--fw-regular)",
                }}>{e.text}</span>
              </li>
            ))}
          </ol>
          <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 28, marginBlockEnd: 0 }}>{footLine}</p>
        </div>
      </div>
    </section>
  );
}

/* === overnight-watch · the diff-flavored change feed ============== */

const LIB_DIFF_ROWS = [
  { sign: "+", text: "Northwind cut its starter price by 12%", meta: "pricing page" },
  { sign: "+", text: "Bluepeak shipped a comparison page against you", meta: "new url" },
  { sign: "-", text: "Coreline paused its LinkedIn retargeting", meta: "auction data" },
  { sign: "+", text: "Two of your money keywords got a new bidder", meta: "search terms" },
];

function LibOvernightWatch({
  eyebrow = "Change watch",
  title = "Know what changed overnight",
  titleAccent = "overnight",
  sub = "I watch your accounts, your competitors and your market while you are off the clock. Most of it never needs you. The part that does is ranked and waiting at 9am.",
  primaryCta = "get started",
  secondaryCta = "See a full watch report",
  paneLabel = "Overnight diff",
  paneMeta = "06:58 · 7 sources",
  rows = LIB_DIFF_ROWS, /* Array<{sign: '+'|'-', text, meta}> */
  responseRow = "I drafted a pricing response for your 9am.",
  showResponse = true,
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 96px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 18 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ display: "flex", gap: 12, marginBlockStart: 30, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
        </div>
        <div style={libPane({})}>
          <div style={libPaneHeader}>
            <span style={libMonoCaps({})}>{paneLabel}</span>
            <span style={libMonoCaps({})}>{paneMeta}</span>
          </div>
          <div style={{ padding: "8px 0" }}>
            {rows.map((r, i) => {
              const added = r.sign !== "-";
              return (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "baseline",
                  paddingBlock: 10, paddingInline: 16,
                  borderBlockStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
                }}>
                  <span aria-hidden="true" style={{
                    ...libMono({ fontWeight: "var(--fw-bold)" }),
                    flexShrink: 0, width: 18, height: 18, lineHeight: "18px", textAlign: "center",
                    borderRadius: "var(--radius-sm)",
                    background: added ? "var(--success-100)" : "var(--danger-100)",
                    color: added ? "var(--text-on-tint-success)" : "var(--text-on-tint-danger)",
                  }}>{r.sign}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", flex: 1, minWidth: 0 }}>{r.text}</span>
                  <span style={libMono({ fontSize: 11, color: "var(--text-muted)", flexShrink: 0 })}>{r.meta}</span>
                </div>
              );
            })}
            {showResponse && responseRow ? (
              <div style={{
                display: "flex", gap: 12, alignItems: "baseline",
                marginBlockStart: 8, marginInline: 8, paddingBlock: 12, paddingInline: 12,
                background: "var(--accent-soft)", borderRadius: "var(--radius-md)",
              }}>
                <span aria-hidden="true" style={libMono({ color: "var(--text-on-tint-brand)", fontWeight: "var(--fw-bold)", flexShrink: 0 })}>&gt;</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{responseRow}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* === week-in-motion · Mon-Fri, already queued ===================== */

/* Channel chips ride the Badge's semantic tones: no new hues. */
const LIB_WEEK = [
  { day: "Mon", tasks: [
    { title: "Weekly brief to your inbox", channel: "Brief", tone: "neutral" },
    { title: "Budget pacing reset", channel: "Paid", tone: "neutral" },
  ] },
  { day: "Tue", tasks: [
    { title: "Search query cleanup", channel: "Paid", tone: "neutral" },
    { title: "Case-study draft to review", channel: "Content", tone: "info" },
  ] },
  { day: "Wed", tasks: [
    { title: "Newsletter send, on voice", channel: "Email", tone: "info" },
    { title: "Landing page test reads out", channel: "Web", tone: "success" },
  ] },
  { day: "Thu", tasks: [
    { title: "Competitor watch digest", channel: "Watch", tone: "info" },
    { title: "Creative refresh queued", channel: "Paid", tone: "neutral", approval: true },
  ] },
  { day: "Fri", tasks: [
    { title: "Week retro, what moved", channel: "Brief", tone: "neutral" },
  ] },
];

function LibWeekInMotion({
  eyebrow = "The week ahead",
  title = "A full week, already in motion",
  titleAccent = "motion",
  sub = "Every Monday at 07:30 the week arrives planned: what runs, what ships and the one or two things I need from you. Approve once and it is moving.",
  week = LIB_WEEK, /* Array<{day, tasks: {title, channel, tone, approval?}[]}> */
  today = "wed",
  approvalLabel = "needs sign-off",
  footLine = "planned by Alfred · approved by you",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px" })}>
        <LibIntro eyebrow={eyebrow} title={title} titleAccent={titleAccent} sub={sub} />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
          gap: 16, marginBlockStart: 44, alignItems: "stretch",
        }}>
          {week.map((d, i) => {
            const isToday = today && d.day.toLowerCase().startsWith(String(today).toLowerCase().slice(0, 3));
            return (
              <div key={i} style={{
                minWidth: 0, display: "flex", flexDirection: "column", gap: 10,
                background: "var(--surface-card)",
                border: isToday ? "1px solid var(--accent)" : "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)", padding: 14,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <span style={libMonoCaps({ color: isToday ? "var(--text-on-tint-brand)" : "var(--text-muted)" })}>{d.day}</span>
                  {isToday ? <span style={libMonoCaps({ color: "var(--text-on-tint-brand)" })}>today</span> : null}
                </div>
                {d.tasks.map((t, j) => (
                  <div key={j} style={{
                    background: t.approval ? "var(--accent-soft)" : "var(--surface-sunken)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)", padding: 12,
                  }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{t.title}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBlockStart: 8, flexWrap: "wrap" }}>
                      <Badge tone={t.tone || "neutral"}>{t.channel}</Badge>
                      {t.approval ? <span style={libMonoCaps({ color: "var(--text-on-tint-brand)" })}>{approvalLabel}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 32, marginBlockEnd: 0 }}>{footLine}</p>
      </div>
    </section>
  );
}

/* === agency-compare · the retainer way vs the Alfred way ========== */

const LIB_AGENCY_STEPS = [
  { step: "Write the brief", cost: "2 hrs" },
  { step: "Wait for the deck", cost: "2 wks" },
  { step: "Feedback, round two", cost: "1 wk" },
  { step: "The invoice arrives", cost: "$8,500/mo" },
];
const LIB_ALFRED_STEPS = [
  { step: "Ask the question", cost: "10 sec" },
  { step: "Answer, sources attached", cost: "40 sec" },
  { step: "You approve", cost: "one tap" },
  { step: "Shipped and logged", cost: "same morning" },
];

function LibAgencyCompare({
  eyebrow = "The math",
  title = "Never brief an agency again",
  titleAccent = "again",
  sub = "No pitches, no retainers, no waiting for the Thursday call. The plan is on your desk every morning, and the work starts the second you approve it.",
  beforeLabel = "The retainer way",
  afterLabel = "The Alfred way",
  beforeSteps = LIB_AGENCY_STEPS, /* Array<{step, cost}> */
  afterSteps = LIB_ALFRED_STEPS,
  deltas = ["2 wks to same morning", "$8,500/mo to one plan", "3 handoffs to none"],
  alfredFirst = false,
}) {
  const beforeCard = (
    <div style={{
      minWidth: 0, background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)", padding: 26,
    }}>
      <div style={libMonoCaps({})}>{beforeLabel}</div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, marginBlockStart: 16 }}>
        {beforeSteps.map((s, i) => (
          <li key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12,
            paddingBlock: 12, borderBlockStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
          }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-muted)" }}>{s.step}</span>
            <span style={libMono({ color: "var(--text-muted)", flexShrink: 0 })}>{s.cost}</span>
          </li>
        ))}
      </ol>
    </div>
  );
  const afterCard = (
    <div style={{
      minWidth: 0, background: "var(--surface-card)", border: "1px solid var(--accent)",
      borderRadius: "var(--radius-xl)", padding: 26, boxShadow: "var(--elevation-raised)",
    }}>
      <div style={libMonoCaps({ color: "var(--text-on-tint-brand)" })}>{afterLabel}</div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, marginBlockStart: 16 }}>
        {afterSteps.map((s, i) => (
          <li key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12,
            paddingBlock: 12, borderBlockStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
          }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{s.step}</span>
            {/* neutral mono: the accent border already marks this card as the winner */}
            <span style={libMono({ color: "var(--text-secondary)", fontWeight: "var(--fw-semibold)", flexShrink: 0 })}>{s.cost}</span>
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px" })}>
        <LibIntro eyebrow={eyebrow} title={title} titleAccent={titleAccent} sub={sub} />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
          gap: 24, marginBlockStart: 44, alignItems: "stretch",
        }}>
          {alfredFirst ? <>{afterCard}{beforeCard}</> : <>{beforeCard}{afterCard}</>}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBlockStart: 28 }}>
          {deltas.map((d, i) => (
            <span key={i} style={{
              ...libMono({ color: "var(--text-secondary)" }),
              paddingBlock: 6, paddingInline: 12,
              border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
              background: "var(--surface-card)",
            }}>{d}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === numbers-live · counters plus the acceptance progression ====== */

const LIB_LIVE_COUNTERS = [
  { value: 1248, label: "Decisions shipped", sublabel: "this quarter, on the record" },
  { value: 38, label: "Sources connected", sublabel: "synced nightly, zero gaps" },
  { value: 11, suffix: " hrs", label: "Back every week", sublabel: "reporting hours returned" },
];

function LibNumbersLive({
  eyebrow = "By the numbers",
  title = "Already doing the work",
  sub = "Not a someday promise. These are the running totals from the Meridian rollout, updating as I work.",
  counters = LIB_LIVE_COUNTERS, /* Array<{value, prefix?, suffix?, label, sublabel?}> */
  progressionLabel = "Acceptance of my drafted moves",
  startPct = 82, startLabel = "wk 1",
  endPct = 96, endLabel = "wk 10",
  footnote = "Illustrative figures from the fictional Meridian rollout",
  showProgression = true,
}) {
  const span = Math.max(0, Math.min(100, endPct) - Math.max(0, startPct));
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "88px 80px" })}>
        <LibIntro eyebrow={eyebrow} title={title} sub={sub} />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          columnGap: 0, rowGap: 28, marginBlockStart: 48,
        }}>
          {counters.map((c, i) => (
            <div key={i} style={{
              minWidth: 0, textAlign: "center",
              paddingInline: 24,
              borderInlineStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
            }}>
              <AnimatedCounter value={c.value} prefix={c.prefix || ""} suffix={c.suffix || ""} />
              <div style={{ ...libMonoCaps({ color: "var(--text-secondary)" }), marginBlockStart: 10 }}>{c.label}</div>
              {c.sublabel ? (
                <div style={libMono({ fontSize: 11, color: "var(--text-muted)", marginBlockStart: 5 })}>{c.sublabel}</div>
              ) : null}
            </div>
          ))}
        </div>
        {showProgression ? (
          <div style={{ maxWidth: 560, marginInline: "auto", marginBlockStart: 52 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{progressionLabel}</span>
              <span style={libMono({ fontSize: 11, color: "var(--text-muted)" })}>{startLabel} {startPct}% to {endLabel} {endPct}%</span>
            </div>
            <div style={{ position: "relative", height: 6, marginBlockStart: 14, borderRadius: "var(--radius-pill)", background: "var(--border-subtle)" }}>
              {/* the learned span, start to now */}
              <div style={{
                position: "absolute", insetBlock: 0,
                insetInlineStart: `${startPct}%`, width: `${span}%`,
                background: "var(--accent-soft)", borderRadius: "var(--radius-pill)",
              }} />
              <span aria-hidden="true" style={{
                position: "absolute", insetBlockStart: "50%", insetInlineStart: `${startPct}%`,
                width: 10, height: 10, borderRadius: "var(--radius-pill)",
                background: "var(--border-default)",
                transform: "translateX(-50%) translateY(-50%)",
              }} />
              {/* the view's ONE phosphor element: where acceptance sits today */}
              <span aria-hidden="true" style={{
                position: "absolute", insetBlockStart: "50%", insetInlineStart: `${endPct}%`,
                width: 12, height: 12, borderRadius: "var(--radius-pill)",
                background: "var(--accent)", boxShadow: "var(--shadow-phosphor)",
                transform: "translateX(-50%) translateY(-50%)",
              }} />
            </div>
            <p style={libVisuallyHidden}>{progressionLabel}: from {startPct} percent at {startLabel} to {endPct} percent at {endLabel}.</p>
          </div>
        ) : null}
        <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 44, marginBlockEnd: 0 }}>{footnote}</p>
      </div>
    </section>
  );
}

window.LibEmployeeHero = LibEmployeeHero;
window.LibHighlightsGrid = LibHighlightsGrid;
window.LibVoiceLearned = LibVoiceLearned;
window.LibAlwaysOnBand = LibAlwaysOnBand;
window.LibOvernightWatch = LibOvernightWatch;
window.LibWeekInMotion = LibWeekInMotion;
window.LibAgencyCompare = LibAgencyCompare;
window.LibNumbersLive = LibNumbersLive;
