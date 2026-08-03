/* ============================================================
   Alfred, Inspiration Library · FUSION.
   The reference executions of the two style absorptions defined in
   guidelines/style-absorption.md: the instrument layer taken from
   terminal dev-retro, and scale-and-spring taken from vivid
   maximalist. Token-level borrowing under a budget, never a
   costume: no window chrome, no scanlines, no green, no rainbow.
   Every component ships complete default copy: a bare
   <LibConsoleHero /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/fusion.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Kbd, ConsolePanel,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.06, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
const libNumeral = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1, letterSpacing: "-0.02em",
  color: "var(--text-display)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
/* The instrument layer's voice: true mono (the absorption token), 11-12px,
   uppercase with --ls-caps where it labels. Mono never sets headlines or body. */
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
const libMonoLine = {
  fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.8,
  color: "var(--text-secondary)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
/* The one gradient element of any section that renders it. */
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
/* Headline with a gradient-accented substring, the heroes idiom. */
const libAccent = (title, accent) => (accent && title.includes(accent)) ? (
  <>
    {title.slice(0, title.indexOf(accent))}
    <LibGradientText>{accent}</LibGradientText>
    {title.slice(title.indexOf(accent) + accent.length)}
  </>
) : title;

/* === console-hero · the terminal absorption, executed on-brand === */

/* The pane itself is the bundle's ConsolePanel (the absorption promoted it to
   a real component); this section supplies the hero framing and the runs.
   Verb tones: analysis reads cool (info), what needs attention reads warm
   (brand) — never raw ramps. */
const LIB_CONSOLE_RUNS = {
  default: {
    connected: ["Google Ads", "GA4", "CRM"],
    transcript: [
      { verb: "checked", text: "spend pacing across 14 live campaigns" },
      { verb: "traced", text: "CPL drift to two search campaigns", tone: "info" },
      { verb: "flagged", text: "$18K of monthly spend below target return", tone: "brand" },
    ],
    readyLine: "brief ready :: 3 decisions, ranked by impact",
  },
  briefing: {
    connected: ["CRM", "Billing", "Support desk"],
    transcript: [
      { verb: "checked", text: "pipeline against Friday's forecast" },
      { verb: "traced", text: "the slip to two stalled enterprise deals", tone: "info" },
      { verb: "flagged", text: "renewal risk on one strategic account", tone: "brand" },
    ],
    readyLine: "monday brief ready :: on your desk by 07:00",
  },
};

function LibConsoleHero({
  eyebrow = "Alfred, at work",
  title = "I show my work",
  titleAccent = "work", /* exactly one gradient-filled word */
  sub = "Every recommendation arrives with its evidence trail: what I checked, what I traced, and what I flagged on the way to the call.",
  primaryCta = "get started",
  secondaryCta = "See how I work",
  hintKey = "/",
  hintAfter = "to ask Alfred",
  connected = null, /* string[] · null = the variant's default */
  transcript = null, /* Array<{verb, text}> · null = the variant's default */
  readyLine = null, /* string · null = the variant's default */
  variant = "default", /* "default" | "briefing" */
}) {
  const run = LIB_CONSOLE_RUNS[variant] || LIB_CONSOLE_RUNS.default;
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(52), marginBlockStart: 22 }}>{libAccent(title, titleAccent)}</h1>
          <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 20 }}>{sub}</p>
          <div style={{ display: "flex", gap: 12, marginBlockStart: 32, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", margin: 0, marginBlockStart: 24, display: "flex", alignItems: "center", gap: 7 }}>
            <span>Press</span>
            <Kbd>{hintKey}</Kbd>
            <span>{hintAfter}</span>
          </p>
        </div>
        {/* The pane is the bundle's ConsolePanel — the absorption's reference
            execution, promoted to a real component in stage 2. Its cursor is
            the one phosphor element of this view. */}
        <ConsolePanel
          connected={connected || run.connected}
          transcript={transcript || run.transcript}
          readyLine={readyLine || run.readyLine}
        />
      </div>
    </section>
  );
}

/* === marquee strip · shared by the divider and the poster hero === */

/* The ticker translates only 0 → -50% (direction-neutral: the second,
   aria-hidden copy makes the loop seamless). Static under
   prefers-reduced-motion via the explicit override below, on top of the
   global contract in tokens/base.css. */
const libMarqueeCss = `
@keyframes lib-fusion-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .lib-fusion-marquee-track { animation: none; } }
`;
const LIB_MARQUEE_ITEMS = [
  "Decisions, ranked", "Evidence attached", "Briefed by 07:00",
  "Every channel, watched", "Spend, paced", "Pipeline, covered",
];
const libDiamond = (
  <svg width="7" height="7" viewBox="0 0 8 8" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5, marginInline: 22 }}>
    <path d="M4 0L8 4L4 8L0 4Z" fill="currentColor" />
  </svg>
);
/* Monochrome ink or periwinkle only. Never orange: the marquee is ambience,
   and orange is reserved for action. */
const LibMarqueeStrip = ({ items, tone }) => {
  const peri = tone === "periwinkle";
  const row = (hidden) => (
    <div aria-hidden={hidden || undefined} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span style={{ ...libMonoCaps({ fontSize: 12, color: "inherit" }), whiteSpace: "nowrap" }}>{it}</span>
          {libDiamond}
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div style={{
      overflow: "hidden", paddingBlock: 15,
      background: peri ? "var(--info-100)" : "var(--surface-sunken)",
      /* A divider is ambience, not a headline row: secondary ink, not full-strength. */
      color: peri ? "var(--text-on-tint-info)" : "var(--text-secondary)",
      borderBlock: peri ? "1px solid transparent" : "1px solid var(--border-subtle)",
    }}>
      <style>{libMarqueeCss}</style>
      <div className="lib-fusion-marquee-track" style={{
        display: "flex", width: "max-content",
        animation: "lib-fusion-marquee var(--dur-marquee) linear infinite",
      }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

/* === poster-hero · the vivid absorption, executed on-brand === */

/* Spring is allowed on marketing CTAs only, and hover scale stays inside
   1.03-1.04 (guidelines/style-absorption.md). */
const libPosterCss = `
.lib-poster-cta { display: inline-flex; transition: transform var(--dur-base) var(--ease-spring); }
.lib-poster-cta:hover { transform: scale(1.04); }
`;

function LibPosterHero({
  eyebrow = "Alfred for Marketing",
  title = "Know your next move",
  titleAccent = "move", /* exactly one gradient-filled word */
  sub = "I read every channel overnight and open your morning with the three calls that matter, ranked, with the reasoning attached.",
  primaryCta = "get started",
  secondaryCta = "See a live brief",
  marqueeItems = LIB_MARQUEE_ITEMS,
  variant = "with-marquee", /* "with-marquee" | "quiet" — the marquee IS the vivid signature; bare render carries it */
}) {
  return (
    /* One cool ambient only: the poster page's gradient element is the
       accented word, so the warm corner wash stays out (critic-flagged as a
       second gradient field reading as wallpaper). */
    <section style={{
      position: "relative", overflow: "hidden",
      background: "var(--glow-periwinkle), var(--bg-page)",
      display: "flex", flexDirection: "column",
      minHeight: "min(92vh, 860px)",
    }}>
      <style>{libPosterCss}</style>
      <div style={libContainer({
        flexGrow: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        paddingBlock: "96px 72px", width: "100%", boxSizing: "border-box",
      })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        {/* The ONE poster statement of the page: --text-poster at line-height
            1.0, set in --font-poster so Clash Display survives marketing dark
            (the theme's Satoshi headline swap de-fanged the poster). */}
        <h1 style={{
          ...libDisplay("var(--text-poster)"), fontFamily: "var(--font-poster)",
          fontWeight: "var(--fw-semibold)", lineHeight: 1.0, letterSpacing: "-0.02em",
          color: "var(--text-display)", maxWidth: 980, marginBlockStart: 28,
        }}>{libAccent(title, titleAccent)}</h1>
        <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 26 }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBlockStart: 36, flexWrap: "wrap" }}>
          <span className="lib-poster-cta">
            <Button variant="primary" size="lg">{primaryCta}</Button>
          </span>
          <span className="lib-poster-cta">
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </span>
        </div>
      </div>
      {variant !== "quiet" ? <LibMarqueeStrip items={marqueeItems} tone="ink" /> : null}
      {/* The one ambient grain layer of the page, over everything, inert.
          0.05 is the top of the budget — the texture should be felt at
          poster scale, not hunted for. */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, backgroundImage: "var(--texture-grain)",
        opacity: 0.05, pointerEvents: "none",
      }} />
    </section>
  );
}

/* === marquee-divider · the ticker strip as a section divider === */
function LibMarqueeDivider({
  items = LIB_MARQUEE_ITEMS,
  tone = "ink", /* "ink" | "periwinkle" */
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <LibMarqueeStrip items={items} tone={tone} />
    </section>
  );
}

/* === instrument-stat-band · the stat band wearing the instrument layer === */
function LibInstrumentStatBand({
  leftMeta = "Alfred :: marketing ops",
  rightMeta = "Last synced 08:02",
  counts = "Sources [12] · Alerts [2] · Decisions [3]",
  items = [
    { value: "14", label: "Campaigns watched" },
    { value: "$18K", label: "Reallocation ready" },
    { value: "22%", label: "CPL under target" },
    { value: "07:00", label: "Next brief" },
  ],
  liveIndex = 3,
  liveLabel = "Live",
  footnote = "example figures, refreshed at every sync",
  variant = "default", /* "default" | "live" */
}) {
  const live = variant === "live";
  const metaRow = (start, end, endMuted) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
      <span style={libMonoCaps({})}>{start}</span>
      <span style={endMuted ? { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" } : libMonoCaps({})}>{end}</span>
    </div>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "72px 64px" })}>
        <div style={{ paddingBlockEnd: 16, borderBlockEnd: "1px solid var(--border-subtle)" }}>
          {metaRow(leftMeta, rightMeta, false)}
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
          columnGap: 0, rowGap: 28, paddingBlock: 36,
        }}>
          {items.map((s, i) => {
            const isLive = live && i === liveIndex;
            return (
              <div key={i} style={{
                minWidth: 0,
                paddingInline: i === 0 ? "0 28px" : "28px",
                borderInlineStart: i === 0 ? undefined : "1px solid var(--border-subtle)",
              }}>
                {/* The one phosphor element of this view: the live value. */}
                <div style={{ ...libNumeral(46), textShadow: isLive ? "var(--shadow-phosphor)" : undefined }}>{s.value}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBlockStart: 12 }}>
                  <span style={libMonoCaps({})}>{s.label}</span>
                  {isLive ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "var(--radius-circle)", background: "var(--accent)", flexShrink: 0 }} />
                      <span style={libMonoCaps({ color: "var(--text-on-tint-brand)" })}>{liveLabel}</span>
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ paddingBlockStart: 16, borderBlockStart: "1px solid var(--border-subtle)" }}>
          {metaRow(counts, footnote, true)}
        </div>
      </div>
    </section>
  );
}

window.LibConsoleHero = LibConsoleHero;
window.LibPosterHero = LibPosterHero;
window.LibMarqueeDivider = LibMarqueeDivider;
window.LibInstrumentStatBand = LibInstrumentStatBand;
