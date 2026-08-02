/* ============================================================
   Alfred, Inspiration Library · EXTRAS.
   Eight utility patterns from the tail of the competitor sweep,
   rebuilt on design-system tokens so they render truthfully in
   light and in data-theme="dark": team grid, careers band, 404,
   cookie consent, the ask-an-AI GEO block, a sunset/migration
   notice, insight data-headline cards, and curated collection
   rows. Every component ships complete default copy: a bare
   <LibError404 /> is a finished section. Compiled to a committed
   .js twin by scripts/build-kits.mjs; catalogued in
   library/meta/extras.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Avatar, Badge, Sparkline, LineChart,
} = window.AlfredAIDesignSystem_1ce241;

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
  color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libKicker = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  fontWeight: "var(--fw-bold)", color: "var(--text-muted)",
  textTransform: "uppercase", letterSpacing: "0.08em", margin: 0,
};
const libFine = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libCard = {
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)", boxShadow: "var(--elevation-raised)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
/* split `text` around `accent` so the accent renders in the brand gradient */
const libAccented = (text, accent) => (accent && text.includes(accent) ? (
  <>
    {text.slice(0, text.indexOf(accent))}
    <LibGradientText>{accent}</LibGradientText>
    {text.slice(text.indexOf(accent) + accent.length)}
  </>
) : text);
const libGlyph = (paths, size, style) => (
  <svg width={size || 17} height={size || 17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, ...style }}>{paths}</svg>
);
/* forward arrow: mirrored under RTL by scaleX(var(--flip)) where it is used */
const libArrowGlyph = libGlyph(<>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</>, 16);
/* external-link arrow: directional, so callers wrap it in scaleX(var(--flip)) */
const libExternalGlyph = libGlyph(<>
  <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
  <path d="M14 3h7v7" />
  <path d="M10 14 21 3" />
</>, 14);
const libMailGlyph = libGlyph(<>
  <rect x="3" y="5" width="18" height="14" rx="2" />
  <path d="m3 7 9 6 9-6" />
</>, 15);
const libCheckGlyph = libGlyph(<>
  <path d="M4 12.5l5.5 5.5L20 6.5" />
</>, 14);
const libPillLink = {
  display: "inline-flex", alignItems: "center", gap: 8, height: 40, paddingInline: 16,
  borderRadius: "var(--radius-pill)", border: "1px solid var(--border-default)",
  color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
  fontWeight: "var(--fw-medium)", textDecoration: "none", background: "transparent",
};

/* ==== team-grid · founders and team, avatar initials only ==== */
function LibTeamGrid2({
  eyebrow = "The people",
  headline = "Built by E902",
  sub = "A small team building the decision intelligence platform for the person who makes the call. Alfred does the briefing, these people build Alfred.",
  members = [
    { name: "Arjun Mehta", title: "Co-founder, E902", bio: "Owns the product call: what Alfred learns to do next." },
    { name: "Lena Fischer", title: "Co-founder, E902", bio: "Owns the platform: Alfred Core, the memory, and the governance model." },
    { name: "Tunde Adeyemi", title: "Product engineering", bio: "Builds the surfaces leaders read before their first meeting." },
    { name: "Mei Lin", title: "Design", bio: "Makes decision-ready intelligence read like it was written for you, because it was." },
  ],
  showBios = true,
  ctaLabel = "Work with us",
  footnote = "Placeholder entries. Replace with the real team at publish.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{headline}</h2>
          <p style={{ ...libSub, marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))",
          gap: 20, marginBlockStart: 48,
        }}>
          {members.map((m, i) => (
            <div key={i} style={{ ...libCard, padding: 24, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Avatar name={m.name} size={56} />
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockStart: 14 }}>{m.name}</div>
              <div style={{ ...libKicker, marginBlockStart: 4 }}>{m.title}</div>
              {showBios && m.bio ? (
                <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 10 }}>{m.bio}</p>
              ) : null}
            </div>
          ))}
        </div>
        {ctaLabel || footnote ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBlockStart: 40 }}>
            {ctaLabel ? <Button variant="outline" size="lg" style={libGhostCta}>{ctaLabel}</Button> : null}
            {footnote ? <p style={libFine}>{footnote}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ==== careers-band · mission + values beside an open-roles card ==== */
function LibCareersBand({
  eyebrow = "Careers",
  headline = "Help build the memory every leader runs on",
  sub = "E902 is small on purpose. Every hire owns a decision surface, not a ticket queue.",
  values = [
    { title: "Lead with the number", body: "We argue from evidence, decide fast, and log why." },
    { title: "Build for the person at the top", body: "Every feature answers one question: does this help a leader decide?" },
    { title: "Memory over motion", body: "We'd rather compound one thing than ship ten forgettable ones." },
  ],
  rolesTitle = "Open roles",
  roles = [
    { title: "Founding product engineer", location: "Bengaluru or remote (IST overlap)", type: "Full time" },
    { title: "Product designer, decision surfaces", location: "Remote", type: "Full time" },
    { title: "Founding GTM lead", location: "Bengaluru", type: "Full time" },
  ],
  ctaLabel = "See open roles",
  emptyStateText = "No open roles right now. Send a note anyway: the best hires rarely wait for a listing.",
  contactEmail = "careers@seekalfred.ai",
  footnote = "Illustrative openings. Replace with live roles at publish.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 96px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
        gap: 64, alignItems: "start",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), maxWidth: 480, marginBlockStart: 18 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBlockStart: 40 }}>
            {values.map((v, i) => (
              <div key={i} style={{ borderInlineStart: "2px solid var(--border-default)", paddingInlineStart: 18 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{v.title}</div>
                <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 4 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...libCard, padding: 28 }}>
          <p style={libKicker}>{rolesTitle}</p>
          {roles.length ? (
            <>
              <div style={{ marginBlockStart: 6 }}>
                {roles.map((r, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                    paddingBlock: 14, borderBlockEnd: i < roles.length - 1 ? "1px solid var(--border-subtle)" : "0",
                  }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{r.title}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBlockStart: 2 }}>{r.location} · {r.type}</div>
                    </div>
                    <span style={{ display: "inline-flex", color: "var(--text-muted)", transform: "scaleX(var(--flip))" }}>{libArrowGlyph}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginBlockStart: 18 }}>
                <Button variant="primary" size="lg" fullWidth>{ctaLabel}</Button>
              </div>
            </>
          ) : (
            <>
              <p style={{ ...libBody, marginBlockStart: 12 }}>{emptyStateText}</p>
              <div style={{ marginBlockStart: 18 }}>
                <a href={"mailto:" + contactEmail} style={libPillLink}>
                  <span style={{ display: "inline-flex", color: "var(--text-muted)" }}>{libMailGlyph}</span>
                  Write to {contactEmail}
                </a>
              </div>
            </>
          )}
          {roles.length && contactEmail ? (
            <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "inline-flex", color: "var(--text-muted)" }}>{libMailGlyph}</span>
              <span>
                Prefer to write first?{" "}
                <a href={"mailto:" + contactEmail} style={{ color: "var(--text-link)", textDecorationLine: "underline" }}>{contactEmail}</a>
              </span>
            </p>
          ) : null}
          {footnote ? <p style={{ ...libFine, marginBlockStart: 14 }}>{footnote}</p> : null}
        </div>
      </div>
    </section>
  );
}

/* ==== error-404 · not-found page in Alfred's voice ==== */
function LibError404({
  errorCode = "404",
  headline = "This page isn't in my memory",
  sub = "I remember every signal, decision, and outcome. This URL isn't one of them. Let me point you somewhere useful.",
  primaryCta = "Back to the homepage",
  secondaryCta = "Browse the library",
  linksLabel = "Or jump straight to",
  links = [
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Talk to sales", href: "/contact" },
  ],
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "112px 112px", textAlign: "center", maxWidth: 760 })}>
        {/* the section's one gradient element: the display numeral */}
        <div style={{ ...libDisplay(128), lineHeight: 1 }}>
          <LibGradientText>{errorCode}</LibGradientText>
        </div>
        <h1 style={{ ...libDisplay(40), marginBlockStart: 20 }}>{headline}</h1>
        <p style={{ ...libSub, maxWidth: 520, marginBlockStart: 16, marginInline: "auto" }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBlockStart: 32 }}>
          <Button variant="primary" size="lg">{primaryCta}</Button>
          {secondaryCta ? <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button> : null}
        </div>
        {links && links.length ? (
          <div style={{ marginBlockStart: 48 }}>
            <p style={libKicker}>{linksLabel}</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBlockStart: 14 }}>
              {links.map((l, i) => (
                <a key={i} href={l.href} style={{ ...libPillLink, height: 36, color: "var(--text-secondary)" }}>{l.label}</a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ==== cookie-consent · floating banner card with a preferences panel ==== */
function LibCookieConsent({
  headline = "Cookies, plainly",
  body = "I use a few cookies to keep this site working and to understand which pages earn your time. No ad trackers, no resale.",
  acceptLabel = "Accept all",
  rejectLabel = "Essentials only",
  settingsLabel = "Manage preferences",
  saveLabel = "Save my choices",
  policyLinkLabel = "Read the cookie policy",
  policyHref = "/cookies",
  preferences = [
    { id: "essential", title: "Essential", body: "Sign-in, security, and remembering this choice. The site does not work without these.", locked: true },
    { id: "analytics", title: "Product analytics", body: "First-party page metrics so I know which pages earn your time. No ad networks involved.", defaultOn: true },
    { id: "preferences", title: "Preferences", body: "Remembers your theme and language so you do not have to reset them each visit.", defaultOn: false },
  ],
  defaultExpanded = false,
  savedText = "Saved. You can change this any time from the footer.",
}) {
  const [expanded, setExpanded] = React.useState(!!defaultExpanded);
  const [prefs, setPrefs] = React.useState(() => {
    const on = {};
    for (const p of preferences) on[p.id] = p.locked ? true : !!p.defaultOn;
    return on;
  });
  const [saved, setSaved] = React.useState(false);
  const setAll = (value) => {
    const on = {};
    for (const p of preferences) on[p.id] = p.locked ? true : value;
    setPrefs(on);
    setSaved(true);
  };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px" })}>
        <div style={{ ...libCard, boxShadow: "var(--elevation-floating)", maxWidth: 640, marginInline: "auto", padding: 28 }}>
          <h2 style={libDisplay(24)}>{headline}</h2>
          <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 8 }}>{body}</p>
          {expanded ? (
            <div style={{ borderBlockStart: "1px solid var(--border-subtle)", marginBlockStart: 18 }}>
              {preferences.map((p) => (
                <div key={p.id} style={{
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16,
                  paddingBlock: 12, borderBlockEnd: "1px solid var(--border-subtle)",
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{p.title}</div>
                    <p style={{ ...libFine, color: "var(--text-secondary)", marginBlockStart: 2 }}>{p.body}</p>
                  </div>
                  {p.locked ? (
                    <Badge>Always on</Badge>
                  ) : (
                    <button
                      type="button"
                      aria-pressed={!!prefs[p.id]}
                      onClick={() => { setPrefs({ ...prefs, [p.id]: !prefs[p.id] }); setSaved(false); }}
                      style={{
                        minWidth: 52, paddingBlock: 5, paddingInline: 12, borderRadius: "var(--radius-pill)",
                        border: prefs[p.id] ? "1px solid var(--accent)" : "1px solid var(--border-default)",
                        background: prefs[p.id] ? "var(--accent-soft)" : "var(--surface-sunken)",
                        color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
                        fontWeight: "var(--fw-bold)", cursor: "pointer",
                        transition: "background-color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
                      }}
                    >
                      {prefs[p.id] ? "On" : "Off"}
                    </button>
                  )}
                </div>
              ))}
              <div style={{ marginBlockStart: 14 }}>
                <Button variant="outline" size="sm" style={libGhostCta} onClick={() => setSaved(true)}>{saveLabel}</Button>
              </div>
            </div>
          ) : null}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBlockStart: 20 }}>
            <Button variant="primary" onClick={() => setAll(true)}>{acceptLabel}</Button>
            <Button variant="outline" style={libGhostCta} onClick={() => setAll(false)}>{rejectLabel}</Button>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "transparent", border: "1px solid transparent", cursor: "pointer",
                paddingBlock: 8, paddingInline: 6, fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-link)",
              }}
            >
              {settingsLabel}
            </button>
          </div>
          {saved ? (
            <p role="status" style={{ ...libFine, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6, marginBlockStart: 12 }}>
              <span style={{ display: "inline-flex", color: "var(--accent)" }}>{libCheckGlyph}</span>
              {savedText}
            </p>
          ) : null}
          <p style={{ ...libFine, marginBlockStart: 12 }}>
            <a href={policyHref} style={{ color: "var(--text-link)", textDecorationLine: "underline" }}>{policyLinkLabel}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==== ask-ai · GEO block, prefilled prompts handed to other assistants ==== */
function LibAskAi({
  eyebrow = "Second opinion",
  headline = "Don't take my word for it, ask another AI",
  headlineAccent = "ask another AI",
  sub = "These assistants read the open web, not my marketing. Pick a question, open it where you already ask things, and compare what comes back with what I've told you.",
  promptsTitle = "Pick a question",
  prompts = [
    "What is Alfred by E902, and what does it actually do for a marketing leader?",
    "How is Alfred different from a BI dashboard or a weekly reporting deck?",
    "What should I check before trusting an AI chief of staff with budget decisions?",
  ],
  assistantsTitle = "Open it in",
  assistants = [
    { name: "ChatGPT", url: "https://chatgpt.com/?q=" },
    { name: "Claude", url: "https://claude.ai/new?q=" },
    { name: "Perplexity", url: "https://www.perplexity.ai/search?q=" },
    { name: "Gemini", url: "https://gemini.google.com/app?q=" },
  ],
  copyLabel = "Copy the prompt",
  copiedLabel = "Copied",
  note = "Every link opens a fresh session with the prompt prefilled. I never see the conversation.",
}) {
  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const prompt = prompts[active] || prompts[0] || "";
  const copyPrompt = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(prompt);
    } catch (e) { /* clipboard unavailable: the label change still confirms the intent */ }
    setCopied(true);
  };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <div style={{
          ...libCard, borderRadius: "var(--radius-3xl)", padding: 48,
          display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: 48, alignItems: "start",
        }}>
          <div>
            <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(38), maxWidth: 420, marginBlockStart: 18 }}>{libAccented(headline, headlineAccent)}</h2>
            <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 420, marginBlockStart: 16 }}>{sub}</p>
            {note ? <p style={{ ...libFine, maxWidth: 400, marginBlockStart: 24 }}>{note}</p> : null}
          </div>
          <div>
            <p style={libKicker}>{promptsTitle}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBlockStart: 14 }}>
              {prompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => { setActive(i); setCopied(false); }}
                  style={{
                    textAlign: "start", paddingBlock: 12, paddingInline: 16, borderRadius: "var(--radius-lg)",
                    border: i === active ? "1px solid var(--accent)" : "1px solid var(--border-default)",
                    background: i === active ? "var(--accent-soft)" : "transparent",
                    color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                    lineHeight: "var(--lh-normal)", cursor: "pointer",
                    transition: "border-color var(--dur-fast) var(--ease-standard), background-color var(--dur-fast) var(--ease-standard)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <p style={{ ...libKicker, marginBlockStart: 24 }}>{assistantsTitle}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBlockStart: 12 }}>
              {assistants.map((a) => (
                <a key={a.name} href={a.url + encodeURIComponent(prompt)} target="_blank" rel="noreferrer" style={libPillLink}>
                  {a.name}
                  <span style={{ display: "inline-flex", color: "var(--text-muted)", transform: "scaleX(var(--flip))" }}>{libExternalGlyph}</span>
                </a>
              ))}
              <button
                type="button"
                onClick={copyPrompt}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, background: "transparent",
                  border: "1px solid transparent", cursor: "pointer", paddingBlock: 8, paddingInline: 6,
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
                  color: "var(--text-link)",
                }}
              >
                {copied ? (
                  <span style={{ display: "inline-flex", color: "var(--accent)" }}>{libCheckGlyph}</span>
                ) : null}
                {copied ? copiedLabel : copyLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==== sunset-migration-band · acquisition notice: letter, timeline, one CTA ==== */
const libCalendarGlyph = libGlyph(<>
  <rect x="3" y="4" width="18" height="17" rx="2" />
  <path d="M8 2v4" />
  <path d="M16 2v4" />
  <path d="M3 10h18" />
</>, 16);
function LibSunsetMigrationBand({
  layout = "panel", /* "panel" | "band" */
  eyebrow = "An update from Bluepeak",
  headline = "Bluepeak is now part of Meridian",
  sub = "Nothing changes for you today. Your data, pricing, and workspace carry over, and I will walk you through every step.",
  deadlineLine = "Bluepeak workspaces migrate automatically by June 30, 2027.",
  letterTitle = "A note from our CEO",
  letterSalutation = "To every Bluepeak customer,",
  letterParagraphs = [
    "When you hired Bluepeak, you hired a kind of judgment: watch the business, flag what matters, say it plainly. Meridian asked for exactly that, at a scale we could not reach alone.",
    "So nothing about how I work for you changes. Your data stays yours, your pricing holds, and every workspace carries over with its full history.",
  ],
  letterPullQuote = "Joining Meridian lets me watch more of your business with the same judgment you hired me for.",
  signatureName = "Priya Rao",
  signatureRole = "CEO, Bluepeak",
  timelineTitle = "What happens when",
  timeline = [
    { date: "Today", title: "Nothing to do", body: "Your workspace, pricing, and history stay exactly where they are." },
    { date: "March 2027", title: "Early migration opens", body: "Move on your own schedule: one click, a full dry run, and a 30-day rollback window." },
    { date: "June 30, 2027", title: "Automatic migration", body: "Any workspace still on Bluepeak moves to Meridian automatically, with nothing lost." },
  ],
  ctaLabel = "Read the full plan",
  footnote = "Fictional entities. Swap in the real names, dates, and announcement link at publish.",
}) {
  if (layout === "band") {
    /* Slim awareness strip for above the nav. A deadline exists, so it is
       deliberately not dismissible; the date rides in the band itself. */
    return (
      <section style={{ background: "var(--surface-card)", borderBlockEnd: "1px solid var(--border-subtle)" }}>
        <div style={libContainer({
          paddingBlock: "14px 14px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16, flexWrap: "wrap",
        })}>
          <p style={{ ...libBody, fontSize: "var(--text-sm)" }}>
            <span style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{headline}.</span>{" "}
            {deadlineLine}
          </p>
          <a href="#announcement" style={{
            display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
            color: "var(--text-link)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)", textDecoration: "none",
          }}>
            {ctaLabel}
            <span style={{ display: "inline-flex", transform: "scaleX(var(--flip))" }}>{libArrowGlyph}</span>
          </a>
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <div style={{ maxWidth: 680 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: 48, alignItems: "start", marginBlockStart: 48,
        }}>
          <div style={{ ...libCard, padding: 32 }}>
            <p style={libKicker}>{letterTitle}</p>
            <p style={{ ...libBody, color: "var(--text-primary)", marginBlockStart: 18 }}>{letterSalutation}</p>
            {letterParagraphs.map((p, i) => (
              <p key={i} style={{ ...libBody, marginBlockStart: 12 }}>{p}</p>
            ))}
            {letterPullQuote ? (
              <p style={{
                fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 20,
                lineHeight: 1.4, letterSpacing: "-0.01em", color: "var(--text-primary)",
                borderInlineStart: "3px solid var(--accent)", paddingInlineStart: 16,
                margin: 0, marginBlockStart: 20,
              }}>{"“"}{letterPullQuote}{"”"}</p>
            ) : null}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBlockStart: 24 }}>
              <Avatar name={signatureName} size={40} />
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{signatureName}</div>
                <div style={{ ...libFine, marginBlockStart: 2 }}>{signatureRole}</div>
              </div>
            </div>
          </div>
          <div>
            <p style={libKicker}>{timelineTitle}</p>
            <div style={{ marginBlockStart: 18 }}>
              {timeline.map((t, i) => (
                <div key={i} style={{
                  position: "relative", paddingInlineStart: 24,
                  paddingBlockEnd: i < timeline.length - 1 ? 24 : 0,
                  borderInlineStart: i < timeline.length - 1 ? "2px solid var(--border-subtle)" : "2px solid transparent",
                }}>
                  <span aria-hidden="true" style={{
                    position: "absolute", insetInlineStart: -7, insetBlockStart: 2,
                    width: 12, height: 12, borderRadius: "var(--radius-pill)",
                    background: i === 0 ? "var(--accent)" : "var(--surface-card)",
                    border: i === 0 ? "2px solid var(--accent)" : "2px solid var(--border-strong)",
                  }} />
                  <p style={libKicker}>{t.date}</p>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockStart: 4 }}>{t.title}</div>
                  <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 4 }}>{t.body}</p>
                </div>
              ))}
            </div>
            {deadlineLine ? (
              <div style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                background: "var(--accent-soft)", border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)", paddingBlock: 14, paddingInline: 16, marginBlockStart: 28,
              }}>
                <span style={{ display: "inline-flex", color: "var(--accent)", marginBlockStart: 2 }}>{libCalendarGlyph}</span>
                <p style={{ ...libBody, fontSize: "var(--text-sm)", color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>{deadlineLine}</p>
              </div>
            ) : null}
            <div style={{ marginBlockStart: 20 }}>
              <Button variant="primary" size="lg">{ctaLabel}</Button>
            </div>
            {footnote ? <p style={{ ...libFine, marginBlockStart: 14 }}>{footnote}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==== insight-data-cards · the number IS the headline, with its reasoning ==== */
function LibInsightDataCards({
  eyebrow = "Answers, not dashboards",
  headline = "You ask, I bring the number and the reasoning",
  sub = "Each card below is an answer exactly as I hand it over: the figure, how it moved, and where it came from.",
  showCharts = true,
  cards = [
    {
      kicker: "Net new ARR · April",
      value: "$156K",
      delta: "Up 9.7% on March",
      tone: "good",
      trustLine: "I computed this from closed-won in your CRM, net of the two Northwind downgrades.",
      followUp: "Ask me why it moved",
      chart: null,
    },
    {
      kicker: "Qualified pipeline · this quarter",
      value: "$4.8M",
      delta: "Pacing 12 days ahead",
      tone: "good",
      trustLine: "Weighted by stage across your CRM, refreshed this morning at 6:04.",
      followUp: "Show the pacing math",
      chart: { type: "line", points: [3.2, 3.5, 3.4, 3.9, 4.3, 4.8], labels: ["W1", "W2", "W3", "W4", "W5", "W6"], ariaLabel: "Qualified pipeline by week, from $3.2M to $4.8M" },
    },
    {
      kicker: "Blended CAC · six months",
      value: "$412",
      delta: "Down 9% since February",
      tone: "good",
      trustLine: "All spend across four channels over customers won. No signup counted twice.",
      followUp: "See which channel drove it",
      chart: { type: "spark", points: [486, 472, 455, 449, 431, 412], ariaLabel: "Blended CAC by month, falling from $486 to $412" },
    },
  ],
  footnote = "Fictional Meridian numbers, so the demo stays a demo.",
}) {
  const deltaTone = { good: "success", bad: "danger", neutral: "neutral" };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{headline}</h2>
          <p style={{ ...libSub, marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
          gap: 20, marginBlockStart: 48,
        }}>
          {cards.map((c, i) => (
            <div key={i} style={{ ...libCard, padding: 24, display: "flex", flexDirection: "column" }}>
              <p style={libKicker}>{c.kicker}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBlockStart: 12 }}>
                <span style={libDisplay(40)}>{c.value}</span>
                {c.delta ? <Badge tone={deltaTone[c.tone] || "neutral"}>{c.delta}</Badge> : null}
              </div>
              {showCharts && c.chart ? (
                <div style={{ marginBlockStart: 18 }}>
                  {c.chart.type === "line" ? (
                    <LineChart points={c.chart.points} labels={c.chart.labels || []} height={120} ariaLabel={c.chart.ariaLabel} />
                  ) : (
                    <Sparkline points={c.chart.points} height={64} ariaLabel={c.chart.ariaLabel} />
                  )}
                </div>
              ) : null}
              <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 16 }}>{c.trustLine}</p>
              {c.followUp ? (
                <div style={{ marginBlockStart: "auto", paddingBlockStart: 16 }}>
                  <a href="#ask" style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    color: "var(--text-link)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                    fontWeight: "var(--fw-medium)", textDecoration: "none",
                  }}>
                    {c.followUp}
                    <span style={{ display: "inline-flex", transform: "scaleX(var(--flip))" }}>{libArrowGlyph}</span>
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {footnote ? <p style={{ ...libFine, textAlign: "center", marginBlockStart: 28 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

/* ==== curated-collections · gallery rows with named curation and depth counts ==== */
const libCollectionGlyphs = {
  review: <>
    <path d="M4 6h16" />
    <path d="M4 12h9" />
    <path d="M4 18h6" />
    <path d="m15 16 2.5 2.5L22 14" />
  </>,
  board: <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 13v-3" />
    <path d="M12 13V7" />
    <path d="M16 13v-2" />
    <path d="M12 16v4" />
    <path d="M8 20h8" />
  </>,
  vendor: <>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7.5" cy="7.5" r="1" />
  </>,
  forecast: <>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </>,
  pipeline: <>
    <path d="M3 4h18l-7 8v6l-4 2v-8Z" />
  </>,
  renewal: <>
    <path d="M21 12a9 9 0 1 1-2.6-6.4" />
    <path d="M21 3v6h-6" />
  </>,
  launch: <>
    <path d="M5 21V4" />
    <path d="M5 4h12l-2.5 4L17 12H5" />
  </>,
  hiring: <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M18 8v6" />
    <path d="M15 11h6" />
  </>,
};
function LibCuratedCollections({
  eyebrow = "The library",
  headline = "Start from a playbook that already worked",
  headlineAccent = "already worked",
  sub = "Curated rows, not an endless grid. Every playbook here ran on a live workspace before it earned a card.",
  showChips = true,
  chips = [
    { label: "All playbooks", count: 42 },
    { label: "Budgeting", count: 12 },
    { label: "Forecasting", count: 9 },
    { label: "Board prep", count: 7 },
    { label: "Vendor spend", count: 8 },
    { label: "Pipeline", count: 6 },
  ],
  rows = [
    {
      title: "Playbooks I run for finance teams",
      subtitle: "Handpicked from what worked at Meridian and Northwind",
      viewAll: "Browse all 42 playbooks",
      items: [
        { glyph: "review", title: "Weekly spend review", meta: "For CFOs", value: "12 minutes to first decision" },
        { glyph: "board", title: "Board pack in an afternoon", meta: "For controllers", value: "Built from live numbers" },
        { glyph: "vendor", title: "Vendor spend triage", meta: "For finance ops", value: "Flags the top five contracts" },
        { glyph: "forecast", title: "Forecast sanity check", meta: "For FP&A", value: "Catches drift before the review" },
      ],
    },
    {
      title: "New this week",
      subtitle: "Added by the Alfred team, each one proven on a live workspace first",
      viewAll: "See all 18 recent additions",
      items: [
        { glyph: "pipeline", title: "Pipeline coverage brief", meta: "For CROs", value: "Coverage against two quarters" },
        { glyph: "renewal", title: "Renewal early-warning sweep", meta: "For customer teams", value: "Scans renewals 90 days out" },
        { glyph: "launch", title: "Launch spend retro", meta: "For marketing leaders", value: "Closes the loop on launch week" },
        { glyph: "hiring", title: "Hiring plan reality check", meta: "For COOs", value: "Headcount against the cash curve" },
      ],
    },
  ],
  footnote = "Fictional catalog. Wire each card to a real playbook at publish.",
}) {
  const [activeChip, setActiveChip] = React.useState(0);
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <div style={{ maxWidth: 640 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{libAccented(headline, headlineAccent)}</h2>
          <p style={{ ...libSub, marginBlockStart: 16 }}>{sub}</p>
        </div>
        {showChips && chips.length ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBlockStart: 32 }}>
            {chips.map((c, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={i === activeChip}
                onClick={() => setActiveChip(i)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7, height: 36, paddingInline: 14,
                  borderRadius: "var(--radius-pill)",
                  border: i === activeChip ? "1px solid var(--accent)" : "1px solid var(--border-default)",
                  background: i === activeChip ? "var(--accent-soft)" : "transparent",
                  color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                  fontWeight: "var(--fw-medium)", cursor: "pointer",
                  transition: "border-color var(--dur-fast) var(--ease-standard), background-color var(--dur-fast) var(--ease-standard)",
                }}
              >
                {c.label}
                <span style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)" }}>{c.count}</span>
              </button>
            ))}
          </div>
        ) : null}
        {rows.map((row, i) => (
          <div key={i} style={{ marginBlockStart: i === 0 ? 44 : 40 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <h3 style={libDisplay(24)}>{row.title}</h3>
                {row.subtitle ? <p style={{ ...libBody, fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBlockStart: 6 }}>{row.subtitle}</p> : null}
              </div>
              {row.viewAll ? (
                <a href="#browse" style={{ ...libPillLink, height: 36, flexShrink: 0, color: "var(--text-secondary)" }}>
                  {row.viewAll}
                  <span style={{ display: "inline-flex", color: "var(--text-muted)", transform: "scaleX(var(--flip))" }}>{libArrowGlyph}</span>
                </a>
              ) : null}
            </div>
            {/* horizontal gallery: 4-up when it fits, scroll with a peeking card when it doesn't */}
            <div style={{
              display: "grid", gridAutoFlow: "column", gridAutoColumns: "minmax(232px, 1fr)",
              gap: 16, overflowX: "auto", marginBlockStart: 18, paddingBlockEnd: 8,
              scrollSnapType: "x proximity",
            }}>
              {row.items.map((item, j) => (
                <a key={j} href="#playbook" style={{
                  ...libCard, boxShadow: "var(--elevation-surface)", padding: 14,
                  textDecoration: "none", display: "flex", flexDirection: "column",
                  scrollSnapAlign: "start",
                }}>
                  <div style={{
                    background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-lg)", height: 104, display: "grid", placeItems: "center",
                    color: "var(--chart-2)",
                  }}>
                    {libGlyph(libCollectionGlyphs[item.glyph] || libCollectionGlyphs.review, 30)}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockStart: 14 }}>{item.title}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBlockStart: 4 }}>{item.meta}</div>
                  <div style={{
                    fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)",
                    marginBlockStart: "auto", paddingBlockStart: 12,
                  }}>{item.value}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
        {footnote ? <p style={{ ...libFine, marginBlockStart: 20 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

window.LibTeamGrid2 = LibTeamGrid2;
window.LibCareersBand = LibCareersBand;
window.LibError404 = LibError404;
window.LibCookieConsent = LibCookieConsent;
window.LibAskAi = LibAskAi;
window.LibSunsetMigrationBand = LibSunsetMigrationBand;
window.LibInsightDataCards = LibInsightDataCards;
window.LibCuratedCollections = LibCuratedCollections;
