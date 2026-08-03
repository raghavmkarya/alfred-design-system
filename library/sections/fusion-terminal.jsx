/* ============================================================
   Alfred, Inspiration Library · FUSION-TERMINAL.
   The terminal absorption's deep set: six sections that treat the
   page as an instrument (guidelines/style-absorption.md). Mono is
   metadata, timestamps and code surfaces only, never headlines or
   body; phosphor is one element per view; no window chrome, no
   scanlines, no green. Every component ships complete default
   copy: a bare <LibLogStream /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/fusion-terminal.json.
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
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
/* The instrument layer's voice: true mono, 11-13px, uppercase with
   --ls-caps where it labels. Mono never sets headlines or body. */
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
/* The instrument card every pane in this file sits in: soft 12px
   corners and hairline borders, the absorption's floor. */
const libPane = (extra) => ({
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-md)", boxShadow: "var(--elevation-raised)",
  overflow: "hidden", minWidth: 0, ...extra,
});
const libPaneHeader = {
  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
  paddingBlock: 11, paddingInline: 18, borderBlockEnd: "1px solid var(--border-subtle)",
  flexWrap: "wrap",
};
const libCheckGlyph = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M4 12.5l5.5 5.5L20 6.5" />
  </svg>
);

/* === log-stream · the live decision-log feed ====================== */

/* Severity is semantic, never a raw ramp: info reads cool, warn reads
   warm on the warning tint, and exactly ONE line per feed carries the
   brand flag. */
const LIB_LOG_TONES = {
  info: { bg: "var(--info-100)", fg: "var(--text-on-tint-info)" },
  warn: { bg: "var(--warning-100)", fg: "var(--text-on-tint-brand)" },
  ok: { bg: "var(--success-100)", fg: "var(--text-on-tint-success)" },
  flag: { bg: "var(--accent-soft)", fg: "var(--text-on-tint-brand)" },
};
const LIB_LOG_LINES = [
  { time: "07:58:41", level: "ok", text: "sync complete :: 12 sources, 0 gaps" },
  { time: "08:00:12", level: "info", text: "checked spend pacing across 14 campaigns" },
  { time: "08:01:27", level: "warn", text: "search CPC up 9% for the third straight week" },
  { time: "08:01:59", level: "info", text: "traced the drift to two brand campaigns" },
  { time: "08:02:14", level: "flag", text: "reallocation drafted :: $18K to Performance Max" },
  { time: "08:02:15", level: "info", text: "queued for approval, nothing ships without you" },
];
/* The newest line fades in slowly; static under prefers-reduced-motion
   on top of the global contract in tokens/base.css. */
const libStreamCss = `
@keyframes lib-ft-stream-in { from { opacity: 0; } to { opacity: 1; } }
.lib-ft-stream-new { animation: lib-ft-stream-in 2s var(--ease-standard) both; }
@media (prefers-reduced-motion: reduce) { .lib-ft-stream-new { animation: none; } }
`;

function LibLogStream({
  eyebrow = "The record",
  title = "Everything I do, on the record",
  titleAccent = "record",
  sub = "Every check, trace and draft lands in the log the second it happens, with the sources named. You can audit me the way you audit code.",
  primaryCta = "get started",
  secondaryCta = "See a full day's log",
  paneLabel = "ALFRED :: DECISION LOG",
  paneMeta = "meridian workspace",
  lines = LIB_LOG_LINES,
  followingLine = "following · everything logged",
  pausedLine = "paused · the log keeps writing",
  retentionLine = "history kept in full",
  variant = "default", /* "default" | "paused" */
}) {
  const paused = variant === "paused";
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <style>{libStreamCss}</style>
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
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
        </div>
        {/* the feed */}
        <div style={libPane({})}>
          <div style={libPaneHeader}>
            <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{paneLabel}</span>
            <span style={libMonoCaps({})}>{paneMeta}</span>
          </div>
          <div dir="ltr" style={{ paddingBlock: 14, paddingInline: 18, display: "flex", flexDirection: "column", gap: 9 }}>
            {lines.map((l, i) => {
              const t = LIB_LOG_TONES[l.level] || LIB_LOG_TONES.info;
              const newest = !paused && i === lines.length - 1;
              return (
                <div key={i} className={newest ? "lib-ft-stream-new" : undefined}
                  style={{ display: "flex", alignItems: "baseline", gap: 12, minWidth: 0 }}>
                  <span style={{ ...libMonoLine, fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>{l.time}</span>
                  <span style={{
                    ...libMonoCaps({ fontSize: 10, color: t.fg }), background: t.bg,
                    paddingBlock: 2, paddingInline: 7, borderRadius: "var(--radius-pill)", flexShrink: 0,
                  }}>{l.level}</span>
                  <span style={{
                    ...libMonoLine, fontSize: 12.5, minWidth: 0,
                    color: l.level === "flag" ? "var(--text-primary)" : undefined,
                    fontWeight: l.level === "flag" ? "var(--fw-semibold)" : undefined,
                  }}>{l.text}</span>
                </div>
              );
            })}
          </div>
          <div style={{ ...libPaneHeader, borderBlockEnd: "none", borderBlockStart: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}>
            <span style={{ ...libMonoCaps({}), display: "flex", alignItems: "center", gap: 8 }}>
              {/* the one phosphor element of this view, off while paused */}
              <span aria-hidden="true" style={{
                width: 6, height: 6, borderRadius: "var(--radius-circle)", flexShrink: 0,
                background: paused ? "var(--border-default)" : "var(--accent)",
                boxShadow: paused ? undefined : "var(--shadow-phosphor)",
              }} />
              <span>{paused ? pausedLine : followingLine}</span>
            </span>
            <span style={libMonoCaps({})}>{retentionLine}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === api-quickstart · the tabbed shell pane ======================= */

const LIB_API_TABS = [
  { id: "curl", label: "curl", lines: [
    { prompt: true, text: "curl https://api.seekalfred.ai/v1/ask \\" },
    { prompt: true, text: '  -H "Authorization: Bearer alfred_live_51x…" \\' },
    { prompt: true, text: '  -d \'{ "question": "Where should budget move this week?" }\'' },
  ] },
  { id: "typescript", label: "TypeScript", lines: [
    { text: 'const alfred = new Alfred({ key: process.env.ALFRED_KEY });' },
    { text: 'const brief = await alfred.ask(' },
    { text: '  "Where should budget move this week?"' },
    { text: ');' },
  ] },
  { id: "python", label: "Python", lines: [
    { text: "alfred = Alfred(key=os.environ[\"ALFRED_KEY\"])" },
    { text: "brief = alfred.ask(" },
    { text: "    \"Where should budget move this week?\"" },
    { text: ")" },
  ] },
];
const LIB_API_RESPONSE = [
  '{',
  '  "decision": "shift $18K to Performance Max",',
  '  "confidence": 0.86,',
  '  "evidence": ["google_ads", "ga4", "crm"]',
  '}',
];
const LIB_API_STEPS = [
  { num: "01", title: "Create a key", body: "One key per workspace, scoped read-only until you widen it." },
  { num: "02", title: "Ask a real question", body: "Plain language in. I pull from every connected source before answering." },
  { num: "03", title: "Read the evidence", body: "Each answer returns its confidence and the sources it stands on." },
];

function LibApiQuickstart({
  eyebrow = "For your engineers",
  title = "The whole brief, one call away",
  titleAccent = "one call",
  sub = "Ask from your own tools. Three lines of shell and I answer with the decision, the confidence and the evidence attached.",
  endpoint = "POST https://api.seekalfred.ai/v1/ask",
  steps = LIB_API_STEPS,
  tabs = LIB_API_TABS,
  responseLabel = "200 OK · 412 ms",
  responseLines = LIB_API_RESPONSE,
  copyLabel = "copy",
  showResponse = false, /* the response-open variant renders the output block */
}) {
  const [active, setActive] = React.useState(tabs[0]?.id);
  const tab = tabs.find((t) => t.id === active) || tabs[0];
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({
        paddingBlock: "88px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 420, marginBlockStart: 18 }}>{sub}</p>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, marginBlockStart: 30, display: "flex", flexDirection: "column", gap: 18 }}>
            {steps.map((s) => (
              <li key={s.num} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                <span style={libMonoCaps({ color: "var(--text-on-tint-brand)", flexShrink: 0 })}>{s.num}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{s.title}</span>
                  <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", marginBlockStart: 3 }}>{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        {/* the shell pane */}
        <div style={libPane({})}>
          <div style={{ ...libPaneHeader, paddingBlock: 8, paddingInline: 10 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {tabs.map((t) => {
                const on = t.id === active;
                return (
                  <button key={t.id} type="button" aria-pressed={on} onClick={() => setActive(t.id)} style={{
                    fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: "var(--fw-medium)",
                    color: on ? "var(--text-primary)" : "var(--text-muted)",
                    background: on ? "var(--surface-sunken)" : "transparent",
                    border: "1px solid " + (on ? "var(--border-default)" : "transparent"),
                    borderRadius: "var(--radius-sm)", paddingBlock: 5, paddingInline: 12,
                    cursor: "pointer", transition: "color var(--dur-fast) var(--ease-standard), background-color var(--dur-fast) var(--ease-standard)",
                  }}>{t.label}</button>
                );
              })}
            </div>
            <button type="button" aria-label="Copy the request"
              onClick={() => { if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(tab.lines.map((l) => l.text).join("\n")); }}
              style={{
                ...libMonoCaps({ color: "var(--text-secondary)" }), display: "inline-flex", alignItems: "center", gap: 6,
                background: "transparent", border: "1px solid var(--border-default)", borderRadius: "var(--radius-pill)",
                paddingBlock: 4, paddingInline: 11, cursor: "pointer",
              }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
              {copyLabel}
            </button>
          </div>
          <div dir="ltr" style={{ paddingBlock: 16, paddingInline: 18 }}>
            {/* a URL is a code surface, not a label: mono, but never uppercased */}
            <div style={{ ...libMonoLine, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em", marginBlockEnd: 12 }}>{endpoint}</div>
            {tab.lines.map((l, i) => (
              <div key={i} style={{ ...libMonoLine, fontSize: 12.5, display: "flex", gap: 10, whiteSpace: "pre-wrap" }}>
                {l.prompt ? <span aria-hidden="true" style={{ color: "var(--text-muted)", flexShrink: 0, userSelect: "none" }}>$</span> : <span aria-hidden="true" style={{ width: 8, flexShrink: 0 }} />}
                <span style={{ minWidth: 0, color: "var(--text-primary)" }}>{l.text}</span>
              </div>
            ))}
          </div>
          {showResponse ? (
            <div dir="ltr" style={{ borderBlockStart: "1px solid var(--border-subtle)", background: "var(--info-100)", paddingBlock: 14, paddingInline: 18 }}>
              <div style={libMonoCaps({ color: "var(--text-on-tint-info)", marginBlockEnd: 8 })}>{responseLabel}</div>
              {responseLines.map((l, i) => (
                <div key={i} style={{ ...libMonoLine, fontSize: 12.5, color: "var(--text-on-tint-info)", whiteSpace: "pre-wrap" }}>{l}</div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* === shortcut-grid · the product as a keyboard map ================ */

const LIB_SHORTCUT_GROUPS = [
  { group: "Ask", items: [
    { label: "Ask me anything", keys: ["⌘", "K"] },
    { label: "Rerun this morning's brief", keys: ["B"] },
    { label: "Explain this number", keys: ["E"] },
  ] },
  { group: "Act", items: [
    { label: "Approve the queued reallocation", keys: ["A"], highlight: true },
    { label: "Pause the fatigued ad set", keys: ["P"] },
    { label: "Send the brief to Slack", keys: ["S"] },
  ] },
  { group: "Navigate", items: [
    { label: "Jump to spend", keys: ["G", "S"] },
    { label: "Jump to pipeline", keys: ["G", "P"] },
    { label: "Open the decision log", keys: ["G", "L"] },
  ] },
];

function LibShortcutGrid({
  eyebrow = "Keyboard first",
  title = "The whole product, under your hands",
  titleAccent = "hands",
  sub = "Ask, act and navigate without leaving the keys. Every action is one combo away, and each one keeps an audit line.",
  groups = LIB_SHORTCUT_GROUPS,
  footerHint = "press ? anywhere for the full map",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <div style={{ textAlign: "center" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), maxWidth: 700, marginInline: "auto", marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 520, marginInline: "auto", marginBlockStart: 18 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          gap: 20, marginBlockStart: 48,
        }}>
          {groups.map((g) => (
            <div key={g.group} style={libPane({ boxShadow: "none" })}>
              <div style={{ ...libPaneHeader, background: "var(--surface-sunken)" }}>
                <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{g.group}</span>
                <span style={libMonoCaps({})}>{"[" + g.items.length + "]"}</span>
              </div>
              <div style={{ paddingBlock: 8, paddingInline: 8, display: "flex", flexDirection: "column" }}>
                {g.items.map((it, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                    paddingBlock: 11, paddingInline: 12, borderRadius: "var(--radius-sm)",
                    background: it.highlight ? "var(--accent-soft)" : "transparent",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", minWidth: 0,
                      color: it.highlight ? "var(--text-on-tint-brand)" : "var(--text-primary)",
                      fontWeight: it.highlight ? "var(--fw-semibold)" : "var(--fw-regular)",
                    }}>{it.label}</span>
                    <span style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                      {it.keys.map((k, j) => <Kbd key={j}>{k}</Kbd>)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 36, marginBlockEnd: 0 }}>{footerHint}</p>
      </div>
    </section>
  );
}

/* === boot-sequence · connecting your stack as a boot log ========== */

const LIB_BOOT_LINES = [
  { text: "handshake :: Google Ads connected", time: "0.8s" },
  { text: "handshake :: GA4 connected", time: "1.2s" },
  { text: "handshake :: CRM connected", time: "0.9s" },
  { text: "backfill :: 24 months of spend history", time: "2m 41s" },
  { text: "model :: learning how Meridian decides", time: "1m 22s" },
];
/* Lines check in one after another; static under prefers-reduced-motion
   (no inline opacity, so animation:none lands on the finished state). */
const libBootCss = `
@keyframes lib-ft-boot-in { from { opacity: 0; } to { opacity: 1; } }
.lib-ft-boot-line { animation: lib-ft-boot-in 0.6s var(--ease-standard) both; }
@keyframes lib-ft-boot-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.15; } }
.lib-ft-boot-cursor { animation: lib-ft-boot-blink 1.2s steps(2, jump-none) infinite; }
@media (prefers-reduced-motion: reduce) {
  .lib-ft-boot-line, .lib-ft-boot-cursor { animation: none; }
}
`;

function LibBootSequence({
  eyebrow = "First afternoon",
  title = "From cold start to first brief",
  titleAccent = "first brief",
  sub = "Connecting your stack is a boot sequence, not a migration project. This is a real first run, timed.",
  paneLabel = "ALFRED :: FIRST RUN",
  paneMeta = "no dashboards to build",
  lines = LIB_BOOT_LINES,
  readyLine = "ready in 4m 12s :: first brief tomorrow, 07:00",
  cta = "Start your first run",
  variant = "default", /* "default" | "done" */
}) {
  const animate = variant !== "done";
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <style>{libBootCss}</style>
      <div style={libContainer({ paddingBlock: "88px 88px", maxWidth: 860 })}>
        <div style={{ textAlign: "center" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), maxWidth: 620, marginInline: "auto", marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 480, marginInline: "auto", marginBlockStart: 18 }}>{sub}</p>
        </div>
        <div style={libPane({ marginBlockStart: 44 })}>
          <div style={libPaneHeader}>
            <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{paneLabel}</span>
            <span style={libMonoCaps({})}>{paneMeta}</span>
          </div>
          <div dir="ltr" style={{ paddingBlock: 16, paddingInline: 20, display: "flex", flexDirection: "column", gap: 9 }}>
            {lines.map((l, i) => (
              <div key={i} className={animate ? "lib-ft-boot-line" : undefined}
                style={{ display: "flex", alignItems: "baseline", gap: 12, animationDelay: animate ? (i * 0.45) + "s" : undefined }}>
                <span style={{ color: "var(--text-on-tint-success)", flexShrink: 0, alignSelf: "center", display: "inline-flex" }}>{libCheckGlyph}</span>
                <span style={{ ...libMonoLine, fontSize: 12.5, minWidth: 0, flexGrow: 1 }}>{l.text}</span>
                <span style={{ ...libMonoLine, fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>{l.time}</span>
              </div>
            ))}
            <div className={animate ? "lib-ft-boot-line" : undefined}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBlockStart: 4, animationDelay: animate ? (lines.length * 0.45) + "s" : undefined }}>
              <span aria-hidden="true" style={{ ...libMonoLine, fontSize: 12.5, color: "var(--text-muted)", flexShrink: 0, userSelect: "none" }}>&gt;</span>
              <span style={{ ...libMonoLine, fontSize: 12.5, fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", minWidth: 0 }}>{readyLine}</span>
              {/* the one phosphor element of this view */}
              <span className={animate ? "lib-ft-boot-cursor" : undefined} aria-hidden="true" style={{
                display: "inline-block", width: 7, height: 14, borderRadius: 1, flexShrink: 0,
                background: "var(--accent)", boxShadow: "var(--shadow-phosphor)",
              }} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBlockStart: 32 }}>
          <Button variant="primary" size="lg">{cta}</Button>
        </div>
      </div>
    </section>
  );
}

/* === man-page-faq · the FAQ styled as a help page ================= */

const LIB_MAN_QUESTIONS = [
  { q: "Does Alfred ship changes on its own?", a: "No. I draft the move and attach the reasoning; nothing reaches a platform until you approve it. Auto-approval thresholds exist, and you set them." },
  { q: "How long does setup take?", a: "One afternoon. You grant the connections, I backfill the history and learn how your organisation decides. The first brief lands the next morning at 07:00." },
  { q: "Where does my data live?", a: "In your stack. I read through the connections you grant, keep an audit line for every read, and never move your data into places you have not named." },
  { q: "What if I disagree with a call?", a: "Tell me. Every recommendation carries its evidence trail, so you can challenge the reasoning line by line, and I learn your thresholds from the verdict." },
];

function LibManPageFaq({
  headerStart = "ALFRED(1)",
  headerMid = "User commands",
  headerEnd = "ALFRED(1)",
  nameLabel = "NAME",
  nameBody = "alfred, a decision-intelligence chief of staff for your marketing stack.",
  synopsisLabel = "SYNOPSIS",
  synopsisLine = 'alfred connect <stack> · alfred brief --at 07:00 · alfred ask "<question>"',
  questionsLabel = "QUESTIONS",
  questions = LIB_MAN_QUESTIONS,
  footerLine = "seekalfred.ai · section 1 · answers maintained by Alfred",
}) {
  /* Mono sets the section headers and the synopsis specimen only;
     every answer is Satoshi body. */
  const manHeader = (label) => (
    <div style={{ ...libMonoCaps({ color: "var(--text-secondary)" }), marginBlockEnd: 12 }}>{label}</div>
  );
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px", maxWidth: 800 })}>
        <div style={libPane({ boxShadow: "var(--elevation-raised)" })}>
          <div style={libPaneHeader}>
            <span style={libMonoCaps({})}>{headerStart}</span>
            <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{headerMid}</span>
            <span style={libMonoCaps({})}>{headerEnd}</span>
          </div>
          <div style={{ paddingBlock: 28, paddingInline: 28 }}>
            {manHeader(nameLabel)}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", margin: 0 }}>{nameBody}</p>
            <div aria-hidden="true" style={{ borderBlockEnd: "1px solid var(--border-subtle)", marginBlock: 24 }} />
            {manHeader(synopsisLabel)}
            <p dir="ltr" style={{ ...libMonoLine, fontSize: 12.5, color: "var(--text-primary)", margin: 0, whiteSpace: "pre-wrap" }}>{synopsisLine}</p>
            <div aria-hidden="true" style={{ borderBlockEnd: "1px solid var(--border-subtle)", marginBlock: 24 }} />
            {manHeader(questionsLabel)}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {questions.map((it, i) => (
                <div key={i} style={{
                  paddingBlock: i === 0 ? "0 18px" : "18px",
                  borderBlockStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
                }}>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", margin: 0 }}>{it.q}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0, marginBlockStart: 7 }}>{it.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...libPaneHeader, borderBlockEnd: "none", borderBlockStart: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", justifyContent: "center" }}>
            <span style={libMonoCaps({})}>{footerLine}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === replay-pane · the reasoning replay =========================== */

const LIB_REPLAY_TRANSCRIPT = [
  { verb: "checked", text: "spend pacing across 14 live campaigns", tone: "info" },
  { verb: "traced", text: "CPL drift to two search campaigns", tone: "info" },
  { verb: "compared", text: "against the last six Mondays", tone: "info" },
  { verb: "flagged", text: "$18K of monthly spend below target return", tone: "brand" },
];
const LIB_REPLAY_MARKERS = [
  { at: 8, label: "checked" },
  { at: 26, label: "traced" },
  { at: 44, label: "compared" },
  { at: 62, label: "flagged" },
  { at: 84, label: "drafted" },
];

function LibReplayPane({
  eyebrow = "Receipts on demand",
  title = "Scrub back through my reasoning",
  titleAccent = "my reasoning",
  sub = "Every decision keeps its full working session. Replay it step by step and see exactly why the call was made, months later.",
  primaryCta = "get started",
  secondaryCta = "Watch a replay",
  connected = ["Google Ads", "GA4", "CRM"],
  transcript = LIB_REPLAY_TRANSCRIPT,
  readyLine = "replay paused at 01:16 :: the flag, in context",
  markers = LIB_REPLAY_MARKERS,
  playheadAt = 62, /* percent along the timeline */
  startStamp = "00:00",
  midStamp = "session 08:00 to 08:02 · monday",
  endStamp = "02:03",
}) {
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
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          {/* the transcript, cursor off: the replay's phosphor budget goes
              to the playhead below */}
          <ConsolePanel connected={connected} transcript={transcript} readyLine={readyLine} cursor={false} label="Replay transcript" />
          {/* the scrubber. Static specimen: markers sit at logical offsets
              so the strip mirrors under RTL. */}
          <div style={{ paddingBlockStart: 22, paddingInline: 6 }}>
            <div style={{ position: "relative", height: 22 }}>
              <div aria-hidden="true" style={{
                position: "absolute", insetInline: 0, insetBlockStart: 9, height: 4,
                background: "var(--border-subtle)", borderRadius: "var(--radius-pill)",
              }} />
              <div aria-hidden="true" style={{
                position: "absolute", insetInlineStart: 0, insetBlockStart: 9, height: 4,
                inlineSize: playheadAt + "%",
                background: "var(--border-default)", borderRadius: "var(--radius-pill)",
              }} />
              {markers.map((m, i) => (
                <span key={i} title={m.label} style={{
                  position: "absolute", insetInlineStart: "calc(" + m.at + "% - 3px)", insetBlockStart: 8,
                  width: 6, height: 6, borderRadius: "var(--radius-circle)",
                  background: m.at <= playheadAt ? "var(--text-muted)" : "var(--border-default)",
                }} />
              ))}
              {/* the one phosphor element of this view: the playhead */}
              <span aria-hidden="true" style={{
                position: "absolute", insetInlineStart: "calc(" + playheadAt + "% - 6px)", insetBlockStart: 5,
                width: 12, height: 12, borderRadius: "var(--radius-circle)",
                background: "var(--accent)", boxShadow: "var(--shadow-phosphor)",
                border: "2px solid var(--surface-card)",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBlockStart: 8 }}>
              <span style={{ ...libMonoLine, fontSize: 11, color: "var(--text-muted)" }}>{startStamp}</span>
              <span style={libMonoCaps({ fontSize: 10 })}>{midStamp}</span>
              <span style={{ ...libMonoLine, fontSize: 11, color: "var(--text-muted)" }}>{endStamp}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LibLogStream = LibLogStream;
window.LibApiQuickstart = LibApiQuickstart;
window.LibShortcutGrid = LibShortcutGrid;
window.LibBootSequence = LibBootSequence;
window.LibManPageFaq = LibManPageFaq;
window.LibReplayPane = LibReplayPane;
