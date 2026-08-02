/* ============================================================
   Alfred — Inspiration Library · HEROES.
   Three hero patterns distilled from the competitor sweep, rebuilt
   on design-system tokens so they render truthfully in light and
   in data-theme="dark". Every component ships complete default
   copy: a bare <LibHeroGlow /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/heroes.json.
   ============================================================ */
const {
  EyebrowBadge, Button, DashboardMock, AlfredMessage, ThinkingTrace,
  SeekComposer, AvatarStack,
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
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const libFieldStyle = {
  flex: 1, height: 48, paddingInline: 18, borderRadius: "var(--radius-md)",
  border: "1px solid var(--border-default)", background: "var(--surface-input-plain)",
  color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
};
const libCheckGlyph = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: 4 }}>
    <path d="M4 12.5l5.5 5.5L20 6.5" />
  </svg>
);

/* ——— hero-glow · the one blurred brand glow, headline, dual CTA ——— */
function LibHeroGlow({
  eyebrow = "Decision intelligence platform",
  title = "Every decision, briefed before you ask",
  titleAccent = "briefed before you ask",
  sub = "I connect your marketing, sales and finance stack, learn how your organisation decides, and hand you the next move with the reasoning attached.",
  primaryCta = "get started",
  secondaryCta = "See how I work",
  proofLine = "Set up in one afternoon. No dashboards to build.",
  media = "none", /* "none" | "dashboard" */
}) {
  const accented = titleAccent && title.includes(titleAccent) ? (
    <>
      {title.slice(0, title.indexOf(titleAccent))}
      <LibGradientText>{titleAccent}</LibGradientText>
      {title.slice(title.indexOf(titleAccent) + titleAccent.length)}
    </>
  ) : title;
  const centered = media === "none";
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--glow-orange), var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: centered ? "104px 104px" : "96px 88px",
        display: centered ? "block" : "grid",
        gridTemplateColumns: centered ? undefined : "minmax(0, 1.05fr) minmax(0, 1fr)",
        gap: centered ? undefined : 56, alignItems: "center",
        textAlign: centered ? "center" : "start",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(centered ? 60 : 52), maxWidth: centered ? 840 : undefined, marginBlockStart: 22, marginInline: centered ? "auto" : undefined }}>{accented}</h1>
          <p style={{ ...libSub, maxWidth: centered ? 560 : 480, marginBlockStart: 20, marginInline: centered ? "auto" : undefined }}>{sub}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: centered ? "center" : "flex-start", marginBlockStart: 32, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
          {proofLine ? (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 16, marginBlockEnd: 0 }}>{proofLine}</p>
          ) : null}
        </div>
        {media === "dashboard" ? (
          <div style={{ minWidth: 0 }}>
            <DashboardMock />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ——— hero-conversation · Alfred answering a real question, as the hero ——— */
function LibHeroConversation({
  eyebrow = "Alfred for Marketing",
  title = "Ask the question you actually have",
  sub = "Not a dashboard to interpret. A chief of staff who answers, shows the sources, and takes the follow-up.",
  question = "Where should I move budget this week?",
  answerTime = "8:02 AM",
  answer = "I'd shift $18K from Search to Performance Max. Cost-per-lead there is 22% under target and holding, while Search CPCs rose for the third straight week.",
  sources = [
    { name: "Google Ads", detail: "spend", status: "live" },
    { name: "GA4", status: "live" },
    { name: "CRM", detail: "pipeline", status: "live" },
  ],
  trace = [
    { label: "Pulling spend and pacing", status: "done" },
    { label: "Isolating the cause", status: "done" },
    { label: "Drafting the move", status: "done" },
  ],
  composerPlaceholder = "Ask Alfred anything…",
  suggestions = ["Why did CAC rise?", "Forecast Q3 pipeline"],
  variant = "composer", /* "composer" | "briefing" */
  primaryCta = "get started",
  secondaryCta = "How it works",
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--glow-orange), var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "92px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(52), marginBlockStart: 22 }}>{title}</h1>
          <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 20 }}>{sub}</p>
          <div style={{ display: "flex", gap: 12, marginBlockStart: 32, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
        </div>
        <div style={{
          minWidth: 0, background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-2xl)", padding: 24, boxShadow: "var(--elevation-raised)",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          <AlfredMessage role="user" name="You" time="8:01 AM">{question}</AlfredMessage>
          {variant === "briefing" ? <ThinkingTrace steps={trace} done elapsed="4s" /> : null}
          <AlfredMessage role="alfred" time={answerTime} sources={sources}>{answer}</AlfredMessage>
          {variant === "composer" ? (
            <SeekComposer placeholder={composerPlaceholder} suggestions={suggestions} onSubmit={() => {}} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ——— hero-capture · gated-content / waitlist email capture ——— */
function LibHeroCapture({
  eyebrow = "PLAYBOOK",
  title = "The weekly budget reallocation playbook",
  sub = "The exact five-step review I run for marketing leaders every Monday morning, with the thresholds that trigger a move.",
  bullets = [
    "The five signals I check before moving a dollar",
    "Reallocation thresholds you can copy into your own review",
    "A worked example: finding $24K of wasted spend in one pass",
  ],
  bulletsTitle = "What's inside",
  ctaLabel = "Send me the playbook",
  emailPlaceholder = "you@company.com",
  finePrint = "One email with the playbook. No sequence, no spam.",
  proofNames = ["Priya Menon", "Daniel Okafor", "Mei Lin", "Sofia Alvarez", "James Carter"],
  proofLabel = "Read by 2,300+ marketing leaders",
  layout = "split", /* "split" | "centered" */
}) {
  const [email, setEmail] = React.useState("");
  const form = (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: layout === "split" ? "column" : "row", gap: 10, maxWidth: layout === "split" ? undefined : 460, marginInline: layout === "split" ? undefined : "auto" }}>
      <input
        value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
        placeholder={emailPlaceholder} aria-label="Work email" style={libFieldStyle}
      />
      <Button variant="primary" size="lg" type="submit">{ctaLabel}</Button>
    </form>
  );
  if (layout === "centered") {
    return (
      <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--glow-orange), var(--bg-page)" }}>
        <div style={libContainer({ paddingBlock: "104px 96px", textAlign: "center", maxWidth: 760 })}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(56), marginBlockStart: 22 }}>{title}</h1>
          <p style={{ ...libSub, maxWidth: 540, marginBlockStart: 20, marginInline: "auto" }}>{sub}</p>
          <div style={{ marginBlockStart: 32 }}>{form}</div>
          {finePrint ? <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 12, marginBlockEnd: 0 }}>{finePrint}</p> : null}
          {proofNames && proofNames.length ? (
            <div style={{ display: "flex", justifyContent: "center", marginBlockStart: 32 }}>
              <AvatarStack names={proofNames} label={proofLabel} />
            </div>
          ) : null}
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "92px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
        gap: 64, alignItems: "start",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(48), marginBlockStart: 22 }}>{title}</h1>
          <p style={{ ...libSub, maxWidth: 500, marginBlockStart: 20 }}>{sub}</p>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockStart: 36, textTransform: "uppercase", letterSpacing: "0.08em" }}>{bulletsTitle}</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBlockStart: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>
                <span style={{ color: "var(--accent)" }}>{libCheckGlyph}</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {proofNames && proofNames.length ? (
            <div style={{ marginBlockStart: 36 }}>
              <AvatarStack names={proofNames} label={proofLabel} />
            </div>
          ) : null}
        </div>
        <div style={{
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-2xl)", padding: 32, boxShadow: "var(--elevation-raised)",
          position: "sticky", insetBlockStart: 32,
        }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockEnd: 6 }}>Get the playbook</div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockEnd: 20 }}>Delivered to your work inbox in the next five minutes.</p>
          {form}
          {finePrint ? <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 12, marginBlockEnd: 0 }}>{finePrint}</p> : null}
        </div>
      </div>
    </section>
  );
}

window.LibHeroGlow = LibHeroGlow;
window.LibHeroConversation = LibHeroConversation;
window.LibHeroCapture = LibHeroCapture;
