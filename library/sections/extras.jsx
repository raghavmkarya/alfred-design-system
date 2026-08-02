/* ============================================================
   Alfred, Inspiration Library · EXTRAS.
   Five utility patterns from the tail of the competitor sweep,
   rebuilt on design-system tokens so they render truthfully in
   light and in data-theme="dark": team grid, careers band, 404,
   cookie consent, and the ask-an-AI GEO block. Every component
   ships complete default copy: a bare <LibError404 /> is a
   finished section. Compiled to a committed .js twin by
   scripts/build-kits.mjs; catalogued in library/meta/extras.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Avatar, Badge,
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

window.LibTeamGrid2 = LibTeamGrid2;
window.LibCareersBand = LibCareersBand;
window.LibError404 = LibError404;
window.LibCookieConsent = LibCookieConsent;
window.LibAskAi = LibAskAi;
