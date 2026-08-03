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

/* ==================================================================
   FUSION WAVE 2 — the dial turned up. Same budgets, louder execution:
   each section is allowed ONE loud thing and earns it.
   ================================================================== */

/* Shared grain layer (one per section that uses it). */
const LibGrain = ({ opacity = 0.05 }) => (
  <div aria-hidden="true" style={{
    position: "absolute", inset: 0, backgroundImage: "var(--texture-grain)",
    opacity, pointerEvents: "none",
  }} />
);

/* —— ops-board · the live instrument panel as a full section ——— */
const LIB_OPS_CELLS = [
  { label: "Spend today", value: "$48.2K", meta: "+4% vs plan", live: true },
  { label: "Blended ROAS", value: "3.4x", meta: "holding" },
  { label: "CAC", value: "$142", meta: "-9% this month" },
  { label: "Decisions queued", value: "3", meta: "ranked by impact" },
];
function LibOpsBoard({
  boardLabel = "ALFRED :: LIVE OPS",
  syncLabel = "last synced 08:02 · read-only",
  cells = LIB_OPS_CELLS,
  streamLine = "watching 14 campaigns · 3 platforms · nothing needs you yet",
  hintKey = "/",
  hintAfter = "to ask about any number",
  variant = "default", /* "default" | "compact" */
}) {
  const compact = variant === "compact";
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)" }}>
      <LibGrain opacity={0.04} />
      <div style={libContainer({ position: "relative", paddingBlock: compact ? "56px 56px" : "88px 88px" })}>
        <div style={{
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
          background: "var(--surface-card)", overflow: "hidden",
        }}>
          {/* instrument header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
            paddingBlock: 12, paddingInline: 20, borderBlockEnd: "1px solid var(--border-subtle)",
            flexWrap: "wrap",
          }}>
            <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{boardLabel}</span>
            <span style={libMonoCaps({})}>{syncLabel}</span>
          </div>
          {/* cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {cells.map((c, i) => (
              <div key={i} style={{
                paddingBlock: compact ? 20 : 30, paddingInline: 22,
                borderInlineStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
              }}>
                <div style={libMonoCaps({})}>{c.label}</div>
                <div style={{
                  ...libNumeral(compact ? 34 : 44), marginBlockStart: 10,
                  textShadow: c.live ? "var(--shadow-phosphor)" : undefined,
                }}>{c.value}</div>
                <div style={{ ...libMonoLine, fontSize: 11, marginBlockStart: 6, color: "var(--text-muted)" }}>{c.meta}</div>
              </div>
            ))}
          </div>
          {/* stream footer */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
            paddingBlock: 12, paddingInline: 20, borderBlockStart: "1px solid var(--border-subtle)",
            background: "var(--surface-sunken)", flexWrap: "wrap",
          }}>
            <span style={{ ...libMonoLine, fontSize: 12, display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "var(--radius-circle)", background: "var(--accent)", flexShrink: 0 }} />
              {streamLine}
            </span>
            <span style={{ ...libMonoCaps({}), display: "flex", alignItems: "center", gap: 7 }}>
              <span>Press</span><Kbd>{hintKey}</Kbd><span>{hintAfter}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— command-strip · run your marketing from the keyboard ——— */
const LIB_COMMANDS = [
  { group: "Ask", items: [
    { label: "Where should I move budget this week?", keys: ["enter"] },
    { label: "Why did CAC rise on Tuesday?", keys: ["enter"] },
  ] },
  { group: "Act", items: [
    { label: "Approve the $18K reallocation", keys: ["A"] },
    { label: "Pause the fatigued ad set", keys: ["P"] },
    { label: "Send the brief to Slack", keys: ["S"] },
  ] },
];
function LibCommandStrip({
  eyebrow = "Keyboard first",
  title = "The whole function, one palette away",
  titleAccent = "one palette",
  sub = "Every question I can answer and every action I can take lives behind one keystroke. No dashboard spelunking, no tab archaeology.",
  paletteHint = "Ask or act…",
  groups = LIB_COMMANDS,
  footerHint = "esc to dismiss · everything logged",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({
        paddingBlock: "88px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 440, marginBlockStart: 18 }}>{sub}</p>
          <p style={{ ...libMonoCaps({}), display: "flex", alignItems: "center", gap: 7, marginBlockStart: 28, marginBlockEnd: 0 }}>
            <Kbd>⌘</Kbd><Kbd>K</Kbd><span>from anywhere</span>
          </p>
        </div>
        {/* the palette specimen, shown open */}
        <div style={{
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--elevation-overlay)", overflow: "hidden", minWidth: 0,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, paddingBlock: 14, paddingInline: 18,
            borderBlockEnd: "1px solid var(--border-subtle)",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
              <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
            </svg>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{paletteHint}</span>
            <span aria-hidden="true" style={{ width: 2, height: 16, background: "var(--accent)", boxShadow: "var(--shadow-phosphor)", marginInlineStart: -6 }} />
          </div>
          {groups.map((g) => (
            <div key={g.group} style={{ paddingBlock: 10, paddingInline: 8, borderBlockEnd: "1px solid var(--border-subtle)" }}>
              <div style={libMonoCaps({ paddingInline: 10, marginBlockEnd: 4 })}>{g.group}</div>
              {g.items.map((it, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                  paddingBlock: 9, paddingInline: 10, borderRadius: "var(--radius-sm)",
                  background: g.group === "Act" && i === 0 ? "var(--accent-soft)" : "transparent",
                }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: g.group === "Act" && i === 0 ? "var(--text-on-tint-brand)" : "var(--text-primary)", minWidth: 0 }}>{it.label}</span>
                  <span style={{ display: "flex", gap: 4, flexShrink: 0 }}>{it.keys.map((k) => <Kbd key={k}>{k}</Kbd>)}</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ ...libMonoCaps({}), paddingBlock: 10, paddingInline: 18 }}>{footerHint}</div>
        </div>
      </div>
    </section>
  );
}

/* —— decision-diff · what I changed, as a diff ——— */
const LIB_DIFF_LINES = [
  { kind: "ctx", text: "campaign: meridian-search-brand · budget review" },
  { kind: "del", text: "daily budget: $2,400 · CPL $61 and climbing" },
  { kind: "add", text: "daily budget: $1,400 · $1K/day to performance max" },
  { kind: "ctx", text: "reason: CPL 22% under target and holding for 3 weeks" },
  { kind: "del", text: "creative: launch set, 9 weeks old, fatigue flagged" },
  { kind: "add", text: "creative: refresh pair from the July winners" },
];
function LibDecisionDiff({
  eyebrow = "Receipts, not promises",
  title = "Every change, reviewable like code",
  titleAccent = "like code",
  sub = "I don't describe what I did in a paragraph. I show the exact before and after, with the reason attached, and nothing ships without your approval.",
  fileLabel = "reallocation.diff · proposed by Alfred · awaiting approval",
  lines = LIB_DIFF_LINES,
  approveCta = "Approve the change",
  secondaryCta = "See the full trail",
}) {
  const tone = {
    ctx: { color: "var(--text-muted)", background: "transparent", mark: " " },
    del: { color: "var(--text-on-tint-danger, var(--text-secondary))", background: "var(--danger-100)", mark: "-" },
    add: { color: "var(--text-on-tint-success, var(--text-primary))", background: "var(--success-100)", mark: "+" },
  };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "88px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 440, marginBlockStart: 18 }}>{sub}</p>
          <div style={{ display: "flex", gap: 12, marginBlockStart: 30, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{approveCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
        </div>
        <div style={{
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)", overflow: "hidden", minWidth: 0, boxShadow: "var(--elevation-raised)",
        }}>
          <div style={{ ...libMonoCaps({}), paddingBlock: 11, paddingInline: 18, borderBlockEnd: "1px solid var(--border-subtle)" }}>{fileLabel}</div>
          <div dir="ltr" style={{ paddingBlock: 12 }}>
            {lines.map((l, i) => {
              const t = tone[l.kind] || tone.ctx;
              return (
                <div key={i} style={{
                  ...libMonoLine, fontSize: 12.5, display: "flex", gap: 12,
                  paddingBlock: 4, paddingInline: 18, background: t.background, color: t.color,
                }}>
                  <span aria-hidden="true" style={{ width: 10, flexShrink: 0, userSelect: "none", fontWeight: "var(--fw-bold)" }}>{t.mark}</span>
                  <span style={{ minWidth: 0 }}>{l.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— sticker-stats · the vivid wall, on the orange budget ——— */
const LIB_STICKERS = [
  { value: "70%", label: "faster decisions", tone: "orange", tilt: -3 },
  { value: "15+ hrs", label: "back every week", tone: "outline", tilt: 2 },
  { value: "12%", label: "less wasted spend", tone: "peri", tilt: -1.5 },
  { value: "07:00", label: "brief on your desk", tone: "card", tilt: 2.5 },
  { value: "0", label: "dashboards to build", tone: "outline", tilt: -2 },
];
function LibStickerStats({
  eyebrow = "The numbers do the talking",
  title = "Proof you can slap on a wall",
  stickers = LIB_STICKERS,
  footnote = "Illustrative scenario figures for Alfred for Marketing.",
}) {
  const skin = {
    orange: { background: "var(--accent)", color: "var(--text-on-brand)", border: "1px solid transparent" },
    peri: { background: "var(--info-100)", color: "var(--text-on-tint-info)", border: "1px solid transparent" },
    card: { background: "var(--surface-card)", color: "var(--text-primary)", border: "1px solid var(--border-default)" },
    outline: { background: "transparent", color: "var(--text-primary)", border: "2px solid var(--border-default)" },
  };
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)" }}>
      <LibGrain opacity={0.05} />
      <style>{`.lib-sticker { transition: transform var(--dur-base) var(--ease-spring); } .lib-sticker:hover { transform: scale(1.04) rotate(0deg) !important; }`}</style>
      <div style={libContainer({ position: "relative", paddingBlock: "96px 88px", textAlign: "center" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h2 style={{ ...libDisplay(48), maxWidth: 680, marginInline: "auto", marginBlockStart: 20 }}>{title}</h2>
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center",
          gap: 22, marginBlockStart: 52,
        }}>
          {stickers.map((s, i) => (
            <div key={i} className="lib-sticker" style={{
              ...skin[s.tone] || skin.card,
              borderRadius: "var(--radius-2xl)", paddingBlock: 26, paddingInline: 34,
              transform: `rotate(${s.tilt}deg)`, boxShadow: "var(--elevation-raised)",
            }}>
              <div style={{ ...libNumeral(52), color: "inherit" }}>{s.value}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", marginBlockStart: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{ ...libMonoCaps({}), marginBlockStart: 44, marginBlockEnd: 0 }}>{footnote}</p>
      </div>
    </section>
  );
}

/* —— type-stack · the poster word wall ——— */
function LibTypeStack({
  lines = [
    { text: "Read less.", style: "solid" },
    { text: "Know more.", style: "outline" },
    { text: "Decide faster.", style: "gradient" },
  ],
  sub = "The whole pitch in nine words. Everything else on this site is evidence.",
  primaryCta = "get started",
  variant = "default", /* "default" | "left" */
}) {
  const centered = variant !== "left";
  const face = (l, i) => {
    const base = {
      fontFamily: "var(--font-poster)", fontWeight: "var(--fw-semibold)",
      fontSize: "clamp(48px, 7.4vw, 116px)", lineHeight: 1.02, letterSpacing: "-0.02em",
      margin: 0, color: "var(--text-display)",
    };
    if (l.style === "outline") return { ...base, color: "transparent", WebkitTextStroke: "2px var(--text-secondary)" };
    return base;
  };
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)" }}>
      <LibGrain opacity={0.04} />
      <div style={libContainer({
        position: "relative", paddingBlock: "104px 96px",
        textAlign: centered ? "center" : "start", maxWidth: 1000,
      })}>
        <h2 style={{ margin: 0 }}>
          {lines.map((l, i) => (
            <span key={i} style={{ display: "block", ...face(l, i) }}>
              {l.style === "gradient" ? <LibGradientText>{l.text}</LibGradientText> : l.text}
            </span>
          ))}
        </h2>
        <p style={{ ...libSub, maxWidth: 480, marginBlockStart: 30, marginInline: centered ? "auto" : undefined }}>{sub}</p>
        <div style={{ display: "flex", justifyContent: centered ? "center" : "flex-start", marginBlockStart: 32 }}>
          <Button variant="primary" size="lg">{primaryCta}</Button>
        </div>
      </div>
    </section>
  );
}

/* —— big-number · the full-viewport stat takeover ——— */
function LibBigNumber({
  eyebrow = "FOUND IN ONE PASS",
  value = "$24K",
  caption = "of wasted monthly spend, surfaced in Meridian's first review with me",
  detail = "One afternoon of connecting the stack. No migration, no dashboard build, no analyst queue.",
  cta = "See it on your data",
  variant = "default", /* "default" | "quiet" */
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)" }}>
      {variant !== "quiet" && <LibGrain opacity={0.05} />}
      <div style={libContainer({
        position: "relative", paddingBlock: "120px 104px", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center",
      })}>
        <p style={{ ...libMonoCaps({ color: "var(--text-secondary)" }), margin: 0 }}>{eyebrow}</p>
        {/* The one loud thing: a poster-scale numeral, gradient-filled. */}
        <div style={{
          fontFamily: "var(--font-poster)", fontWeight: "var(--fw-semibold)",
          fontSize: "clamp(96px, 16vw, 240px)", lineHeight: 1.0, letterSpacing: "-0.03em",
          marginBlockStart: 18,
        }}>
          <LibGradientText>{value}</LibGradientText>
        </div>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-xl, 20px)", color: "var(--text-primary)",
          maxWidth: 560, lineHeight: "var(--lh-normal)", marginBlockStart: 22, marginBlockEnd: 0,
        }}>{caption}</p>
        <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 480, marginBlockStart: 14 }}>{detail}</p>
        <div style={{ marginBlockStart: 34 }}>
          <Button variant="primary" size="lg">{cta}</Button>
        </div>
      </div>
    </section>
  );
}

/* —— tape-cta · the CTA band framed by ticker tapes ——— */
function LibTapeCta({
  title = "Stop reading reports. Start making decisions.",
  sub = "Bring your stack to a 30-minute walkthrough and watch your own data brief you back.",
  primaryCta = "Talk to sales",
  secondaryCta = "See pricing",
  tapeItems = LIB_MARQUEE_ITEMS,
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <LibMarqueeStrip items={tapeItems} tone="ink" />
      <div style={libContainer({ paddingBlock: "88px 88px", textAlign: "center" })}>
        <h2 style={{ ...libDisplay(52), maxWidth: 760, marginInline: "auto" }}>{title}</h2>
        <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 18, marginInline: "auto" }}>{sub}</p>
        <style>{`.lib-tape-cta { display: inline-flex; transition: transform var(--dur-base) var(--ease-spring); } .lib-tape-cta:hover { transform: scale(1.04); }`}</style>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBlockStart: 32, flexWrap: "wrap" }}>
          <span className="lib-tape-cta"><Button variant="primary" size="lg">{primaryCta}</Button></span>
          <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
        </div>
      </div>
      <LibMarqueeStrip items={tapeItems} tone="periwinkle" />
    </section>
  );
}

/* —— decision-receipt · the itemized proof, printed ——— */
const LIB_RECEIPT_ITEMS = [
  { label: "Search brand budget trimmed", amount: "-$1,000/day" },
  { label: "Performance Max topped up", amount: "+$1,000/day" },
  { label: "Fatigued creative paused", amount: "CTR +9%" },
  { label: "Renewal risk flagged early", amount: "1 account" },
  { label: "Reporting hours returned", amount: "15 hrs/wk" },
];
function LibDecisionReceipt({
  eyebrow = "Kept, not claimed",
  title = "A week with me, itemized",
  sub = "Every decision lands on the record with its outcome. This is what one week's receipt looks like.",
  storeLine = "ALFRED FOR MARKETING · WEEK 31",
  items = LIB_RECEIPT_ITEMS,
  totalLabel = "Decisions shipped",
  totalValue = "12",
  barcodeLine = "reviewed · approved · logged",
  footnote = "Illustrative week at the fictional Meridian.",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({
        paddingBlock: "88px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{title}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 460, marginBlockStart: 18 }}>{sub}</p>
          <p style={{ ...libMonoCaps({}), marginBlockStart: 26, marginBlockEnd: 0 }}>{footnote}</p>
        </div>
        {/* the receipt */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div dir="ltr" style={{
            background: "var(--surface-card)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)", paddingBlock: 26, paddingInline: 26,
            width: "min(340px, 100%)", transform: "rotate(1.2deg)",
            boxShadow: "var(--elevation-floating)",
          }}>
            <div style={{ ...libMonoCaps({ color: "var(--text-secondary)" }), textAlign: "center" }}>{storeLine}</div>
            <div aria-hidden="true" style={{ borderBlockEnd: "1px dashed var(--border-default)", marginBlock: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((it, i) => (
                <div key={i} style={{ ...libMonoLine, fontSize: 12.5, display: "flex", justifyContent: "space-between", gap: 14 }}>
                  <span style={{ minWidth: 0 }}>{it.label}</span>
                  <span style={{ flexShrink: 0, color: "var(--text-primary)", fontWeight: "var(--fw-semibold)" }}>{it.amount}</span>
                </div>
              ))}
            </div>
            <div aria-hidden="true" style={{ borderBlockEnd: "1px dashed var(--border-default)", marginBlock: 16 }} />
            <div style={{ ...libMonoLine, fontSize: 13, display: "flex", justifyContent: "space-between", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>
              <span>{totalLabel}</span>
              {/* the one phosphor element of this view */}
              <span style={{ textShadow: "var(--shadow-phosphor)" }}>{totalValue}</span>
            </div>
            <div aria-hidden="true" style={{
              marginBlockStart: 18, height: 34,
              background: "repeating-linear-gradient(90deg, var(--text-primary) 0 2px, transparent 2px 5px, var(--text-primary) 5px 6px, transparent 6px 11px)",
              opacity: 0.55, borderRadius: 2,
            }} />
            <div style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 10 }}>{barcodeLine}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LibConsoleHero = LibConsoleHero;
window.LibPosterHero = LibPosterHero;
window.LibMarqueeDivider = LibMarqueeDivider;
window.LibInstrumentStatBand = LibInstrumentStatBand;
window.LibOpsBoard = LibOpsBoard;
window.LibCommandStrip = LibCommandStrip;
window.LibDecisionDiff = LibDecisionDiff;
window.LibStickerStats = LibStickerStats;
window.LibTypeStack = LibTypeStack;
window.LibBigNumber = LibBigNumber;
window.LibTapeCta = LibTapeCta;
window.LibDecisionReceipt = LibDecisionReceipt;
