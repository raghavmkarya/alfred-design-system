/* ============================================================
   Alfred, Inspiration Library · AUTH AND ONBOARDING.
   Four auth-and-onboarding patterns distilled from the competitor
   sweep (Linear, Notion, Clay, Attio, PostHog), rebuilt on
   design-system tokens so they render truthfully in light and in
   data-theme="dark". Every component ships complete default copy:
   a bare <LibAuthSplit /> is a finished page.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/auth-flows.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Divider, Avatar, AvatarStack,
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
const libFine = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", margin: 0, lineHeight: "var(--lh-normal)",
};
const libEyebrowText = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
  textTransform: "uppercase", margin: 0,
};
const libCard = (extra) => ({
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)", boxShadow: "var(--elevation-raised)", ...extra,
});
const libField = {
  boxSizing: "border-box", width: "100%", height: 48, paddingInline: 16,
  borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)",
  background: "var(--surface-input-plain)", color: "var(--text-primary)",
  fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const libLink = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
  fontWeight: "var(--fw-semibold)", color: "var(--text-link)", textDecoration: "none",
};
/* The one gradient element of any section that renders it. */
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
/* Headline with an optional gradient-accented substring, the heroes idiom. */
const libAccent = (title, accent) => (accent && title.includes(accent)) ? (
  <>
    {title.slice(0, title.indexOf(accent))}
    <LibGradientText>{accent}</LibGradientText>
    {title.slice(title.indexOf(accent) + accent.length)}
  </>
) : title;
const libWordmark = {
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: 21, letterSpacing: "-0.01em", color: "var(--text-muted)",
  whiteSpace: "nowrap", lineHeight: 1,
};

/* single-color glyphs, drawn inline so they tint via currentColor */
const libGoogleGlyph = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 10.2v3.7h5.24c-.23 1.36-1.58 3.98-5.24 3.98-3.15 0-5.72-2.61-5.72-5.83S8.85 6.22 12 6.22c1.8 0 3 .77 3.69 1.43l2.51-2.42C16.59 3.72 14.5 2.8 12 2.8 6.92 2.8 2.8 6.92 2.8 12S6.92 21.2 12 21.2c5.31 0 8.83-3.73 8.83-8.98 0-.6-.06-1.06-.14-1.52H12z" />
  </svg>
);
const libKeyGlyph = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="12" r="3.4" />
    <path d="M11.4 12h9" />
    <path d="M17 12v3.2" />
    <path d="M20.4 12v2.2" />
  </svg>
);
const libLockGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
const libPlugGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M9 6.5V3.5" />
    <path d="M15 6.5V3.5" />
    <path d="M6.5 6.5h11v4.2a5.5 5.5 0 0 1-11 0V6.5z" />
    <path d="M12 16.2V20.5" />
  </svg>
);
/* numbered step marker, tinted brand */
const LibStepNumber = ({ n, size = 40 }) => (
  <span aria-hidden="true" style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: size, height: size, borderRadius: "var(--radius-circle)", flexShrink: 0,
    background: "var(--accent-soft)", color: "var(--text-on-tint-brand)",
    fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: size >= 36 ? 17 : 14,
  }}>{n}</span>
);
const libTimePill = {
  display: "inline-flex", alignItems: "center", paddingInline: 10, height: 24,
  borderRadius: "var(--radius-pill)", border: "1px solid var(--border-default)",
  color: "var(--text-muted)", fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)", fontWeight: "var(--fw-medium)", whiteSpace: "nowrap",
};

/* === auth-split · full-height login/signup: minimal form beside a brand panel === */
function LibAuthSplit({
  mode = "signup", /* "signup" | "login" */
  brand = "Alfred",
  headline = "", /* empty string = the mode's default headline */
  sub = "",      /* empty string = the mode's default subline */
  ssoPrimary = "Continue with Google",
  ssoSecondary = "Continue with SSO",
  emailLabel = "Work email",
  emailPlaceholder = "you@company.com",
  emailCta = "Continue with email",
  legal = "By continuing you agree to the terms of service and privacy policy.",
  swapPrompt = "", /* empty string = the mode's default swap line */
  swapCta = "",
  panel = "quote", /* "quote" | "stat" */
  panelQuote = "Alfred flagged a 12% overspend in our launch budget before the finance review did.",
  panelQuoteName = "Dana Whitfield",
  panelQuoteTitle = "Head of Marketing",
  panelQuoteCompany = "Northwind Group",
  panelStatValue = "4 min",
  panelStatLabel = "median time from first sign-in to a first briefing on your own data.",
  panelFootnote = "Example customer shown is illustrative.",
}) {
  const login = mode === "login";
  const h = headline || (login ? "Welcome back" : "Let's get you a chief of staff");
  const s = sub || (login
    ? "Pick up where we left off. Your next briefing is already forming."
    : "I'll be ready with your first briefing in about four minutes.");
  const prompt = swapPrompt || (login ? "No account yet?" : "Already working with me?");
  const promptCta = swapCta || (login ? "Create one" : "Sign in");
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.08fr)", minHeight: 700 }}>
        {/* form column: everything effortless, under 400px wide */}
        <div style={{ display: "flex", flexDirection: "column", paddingBlock: 36, paddingInline: 48, boxSizing: "border-box" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 22, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text-primary)" }}>{brand}</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", paddingBlock: 40 }}>
            <div style={{ width: "100%", maxWidth: 400, marginInline: "auto" }}>
              <h1 style={libDisplay(34)}>{h}</h1>
              <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 12 }}>{s}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBlockStart: 28 }}>
                <Button variant="outline" size="lg" fullWidth iconLeft={libGoogleGlyph} style={libGhostCta}>{ssoPrimary}</Button>
                {ssoSecondary ? <Button variant="outline" size="lg" fullWidth iconLeft={libKeyGlyph} style={libGhostCta}>{ssoSecondary}</Button> : null}
              </div>
              <Divider label="or" spacing={22} />
              <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input type="email" required placeholder={emailPlaceholder} aria-label={emailLabel} style={libField} />
                <Button variant="primary" size="lg" type="submit" fullWidth>{emailCta}</Button>
              </form>
              {!login && legal ? <p style={{ ...libFine, marginBlockStart: 14 }}>{legal}</p> : null}
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", margin: 0, marginBlockStart: 28 }}>
                {prompt}{" "}
                <a href="#" style={libLink}>{promptCta}</a>
              </p>
            </div>
          </div>
        </div>
        {/* brand panel: carries all the visual weight; the section's one gradient element */}
        <div style={{ position: "relative", overflow: "hidden", background: "var(--gradient-brand)", display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: 64, paddingInline: 56, boxSizing: "border-box" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 120% at 50% 0%, color-mix(in srgb, var(--text-on-brand) 18%, transparent) 0%, transparent 62%)" }} />
          <div style={{ position: "relative", maxWidth: 460 }}>
            {panel === "stat" ? (
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 84, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--text-on-brand)" }}>{panelStatValue}</div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--text-on-brand)", opacity: 0.92, lineHeight: "var(--lh-relaxed)", margin: 0, marginBlockStart: 16, maxWidth: 360 }}>{panelStatLabel}</p>
              </div>
            ) : (
              <figure style={{ margin: 0 }}>
                <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 30, lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--text-on-brand)" }}>
                  {"“" + panelQuote + "”"}
                </blockquote>
                <figcaption style={{ marginBlockStart: 24, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-on-brand)", opacity: 0.9 }}>
                  {panelQuoteName} · {panelQuoteTitle}, {panelQuoteCompany}
                </figcaption>
              </figure>
            )}
            {panelFootnote ? <p style={{ ...libFine, color: "var(--text-on-brand)", opacity: 0.66, marginBlockStart: 44 }}>{panelFootnote}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* === signup-proof · the form beside exactly ONE form of live social proof === */
function LibSignupProof({
  eyebrow = "GET STARTED",
  headline = "Join 4,000 marketing leaders",
  headlineAccent = "4,000",
  sub = "They start Monday with my briefing already written: the numbers that moved, and the one decision to make first.",
  proofType = "testimonial", /* "testimonial" | "number" | "logos" */
  quote = "I stopped preparing Monday reports. Alfred has them waiting, with the two decisions that matter on top.",
  quoteName = "Elena Marsh",
  quoteTitle = "VP Marketing",
  quoteCompany = "Bluepeak",
  proofNames = ["Priya Menon", "Daniel Okafor", "Mei Lin", "Sofia Alvarez", "James Carter", "Ana Ribeiro"],
  proofLabel = "4,000+ marketing leaders get my briefing every week",
  logoLabel = "Trusted by teams at growth-stage companies",
  logoItems = ["Meridian", "Northwind Group", "Bluepeak", "Harborline", "Fernwell Labs", "Solstice"],
  disclaimer = "Example companies shown are illustrative.",
  formTitle = "Create your account",
  ssoLabel = "Continue with Google",
  emailLabel = "Work email",
  emailPlaceholder = "you@company.com",
  ctaLabel = "Start with Alfred",
  riskReversal = "Free for 14 days. No credit card, no setup call.",
}) {
  let proof = null;
  if (proofType === "number") {
    proof = <AvatarStack names={proofNames} max={5} label={proofLabel} />;
  } else if (proofType === "logos") {
    proof = (
      <div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-muted)", margin: 0 }}>{logoLabel}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", rowGap: 24, columnGap: 32, marginBlockStart: 22 }}>
          {logoItems.map((m, i) => (
            <span key={i} style={{ ...libWordmark, whiteSpace: "normal", fontSize: 19 }}>{m}</span>
          ))}
        </div>
        {disclaimer ? <p style={{ ...libFine, marginBlockStart: 24 }}>{disclaimer}</p> : null}
      </div>
    );
  } else {
    proof = (
      <div>
        <figure style={{ ...libCard({ padding: 28 }), margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          <blockquote style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: "var(--lh-relaxed)", color: "var(--text-primary)" }}>
            {"“" + quote + "”"}
          </blockquote>
          <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name={quoteName} size={40} />
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{quoteName}</div>
              <div style={{ ...libFine, marginBlockStart: 2 }}>{quoteTitle} · {quoteCompany}</div>
            </div>
          </figcaption>
        </figure>
        {disclaimer ? <p style={{ ...libFine, marginBlockStart: 16 }}>{disclaimer}</p> : null}
      </div>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "92px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), maxWidth: 480, marginBlockStart: 18 }}>{libAccent(headline, headlineAccent)}</h2>
          <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ marginBlockStart: 36 }}>{proof}</div>
        </div>
        <div style={libCard({ paddingBlock: 32, paddingInline: 32 })}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{formTitle}</div>
          <div style={{ marginBlockStart: 20 }}>
            <Button variant="outline" size="lg" fullWidth iconLeft={libGoogleGlyph} style={libGhostCta}>{ssoLabel}</Button>
          </div>
          <Divider label="or" spacing={18} />
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input type="email" required placeholder={emailPlaceholder} aria-label={emailLabel} style={libField} />
            <Button variant="primary" size="lg" type="submit" fullWidth>{ctaLabel}</Button>
          </form>
          {riskReversal ? <p style={{ ...libFine, textAlign: "center", marginBlockStart: 12 }}>{riskReversal}</p> : null}
        </div>
      </div>
    </section>
  );
}

/* === onboarding-preview · setup as three numbered, time-boxed steps === */
function LibOnboardingPreview({
  eyebrow = "GETTING STARTED",
  headline = "Your first briefing in under ten minutes",
  headlineAccent = "ten minutes",
  sub = "No dashboards to build and no tracking plan to migrate. Point me at the stack you already run, and I do the reading.",
  steps = [
    { title: "Connect your channels", body: "Point me at your ad accounts and analytics. Read-only, and nothing moves without you.", time: "~3 min" },
    { title: "Tell me what matters", body: "Pick the targets I should watch: pipeline, CAC or spend. I calibrate to how you decide.", time: "~2 min" },
    { title: "Get your first briefing", body: "I come back with the numbers that moved and the one decision I would make first.", time: "~4 min" },
  ],
  ctaLabel = "Start setup",
  secondaryLabel = "or read a sample briefing first",
  variant = "band", /* "band" | "vertical" */
}) {
  const ctaRow = (justify) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: justify, gap: 18, flexWrap: "wrap" }}>
      <Button variant="primary" size="lg">{ctaLabel}</Button>
      {secondaryLabel ? <a href="#" style={{ ...libLink, fontWeight: "var(--fw-medium)" }}>{secondaryLabel}</a> : null}
    </div>
  );
  if (variant === "vertical") {
    return (
      <section style={{ background: "var(--bg-page)" }}>
        <div style={libContainer({
          paddingBlock: "96px 88px",
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)",
          gap: 64, alignItems: "center",
        })}>
          <div>
            <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(40), maxWidth: 440, marginBlockStart: 18 }}>{libAccent(headline, headlineAccent)}</h2>
            <p style={{ ...libSub, maxWidth: 440, marginBlockStart: 16 }}>{sub}</p>
            <div style={{ marginBlockStart: 32 }}>{ctaRow("flex-start")}</div>
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={i} style={{ display: "flex", gap: 20 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <LibStepNumber n={i + 1} />
                    {!last ? <span aria-hidden="true" style={{ width: 1, flex: 1, minHeight: 24, background: "var(--border-subtle)" }} /> : null}
                  </div>
                  <div style={{ paddingBlockEnd: last ? 0 : 30, paddingBlockStart: 6, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", margin: 0 }}>{s.title}</h3>
                      {s.time ? <span style={libTimePill}>{s.time}</span> : null}
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 6, maxWidth: 420 }}>{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 88px" })}>
        <div style={{ textAlign: "center", maxWidth: 680, marginInline: "auto" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 18 }}>{libAccent(headline, headlineAccent)}</h2>
          <p style={{ ...libSub, maxWidth: 560, marginInline: "auto", marginBlockStart: 16 }}>{sub}</p>
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, marginBlockStart: 56, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 36 }}>
          {steps.map((s, i) => (
            <li key={i} style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <LibStepNumber n={i + 1} />
                {i < steps.length - 1 ? <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} /> : null}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBlockStart: 18, flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", margin: 0 }}>{s.title}</h3>
                {s.time ? <span style={libTimePill}>{s.time}</span> : null}
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 8 }}>{s.body}</p>
            </li>
          ))}
        </ol>
        <div style={{ marginBlockStart: 48 }}>{ctaRow("center")}</div>
      </div>
    </section>
  );
}

/* === migration-promise · the switch-to-us band: import promise, read-only reassurance === */
function LibMigrationPromise({
  eyebrow = "SWITCHING",
  headline = "Bring your history. I'll do the reading.",
  headlineAccent = "history",
  body = "Connect the stack you already run and I'll ingest your past twelve months of campaign data, so my first briefing starts from your history, not from zero.",
  sourcesLabel = "I read from the tools you already use",
  sources = ["Google Ads", "Meta Ads", "LinkedIn Ads", "Google Analytics 4", "HubSpot", "Salesforce"],
  steps = [
    { title: "Connect read-only", body: "OAuth into each tool. I never ask for write access." },
    { title: "I ingest twelve months", body: "Campaigns, spend, conversions and pipeline, reconciled into one history." },
    { title: "Your first briefing knows you", body: "Day one starts from your trend lines, not from a cold start." },
  ],
  guarantee = "Read-only access, and your data stays exportable at any time. Nothing gets locked in.",
  concierge = "Running an unusual stack at scale? My team wires it up with you on a 30-minute call.",
  ctaLabel = "Connect my stack",
  secondaryCtaLabel = "Book the 30-minute call",
  variant = "split", /* "split" | "band" */
}) {
  const guaranteeRow = guarantee ? (
    <p style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0 }}>
      <span style={{ color: "var(--accent)", marginBlockStart: 2 }}>{libLockGlyph}</span>
      <span>{guarantee}</span>
    </p>
  ) : null;
  if (variant === "band") {
    return (
      <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
        <div style={libContainer({ paddingBlock: 80, textAlign: "center", maxWidth: 860 })}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(38), maxWidth: 620, marginInline: "auto", marginBlockStart: 18 }}>{libAccent(headline, headlineAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 560, marginInline: "auto", marginBlockStart: 14 }}>{body}</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginBlockStart: 28 }}>
            {sources.map((name, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 8, paddingInline: 14, height: 34,
                borderRadius: "var(--radius-pill)", border: "1px solid var(--border-default)",
                background: "var(--surface-card)", color: "var(--text-secondary)",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", whiteSpace: "nowrap",
              }}>
                {libPlugGlyph}
                {name}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBlockStart: 24 }}>{guaranteeRow}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBlockStart: 28 }}>
            <Button variant="primary" size="lg">{ctaLabel}</Button>
            {secondaryCtaLabel ? <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCtaLabel}</Button> : null}
          </div>
          {concierge ? <p style={{ ...libFine, marginBlockStart: 16 }}>{concierge}</p> : null}
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "92px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), maxWidth: 460, marginBlockStart: 18 }}>{libAccent(headline, headlineAccent)}</h2>
          <p style={{ ...libSub, maxWidth: 470, marginBlockStart: 16 }}>{body}</p>
          <div style={{ maxWidth: 440, marginBlockStart: 26 }}>{guaranteeRow}</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBlockStart: 32 }}>
            <Button variant="primary" size="lg">{ctaLabel}</Button>
            {secondaryCtaLabel ? <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCtaLabel}</Button> : null}
          </div>
          {concierge ? <p style={{ ...libFine, maxWidth: 440, marginBlockStart: 16 }}>{concierge}</p> : null}
        </div>
        <div style={libCard({ paddingBlock: 30, paddingInline: 30 })}>
          <p style={{ ...libEyebrowText, color: "var(--text-muted)" }}>{sourcesLabel}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginBlockStart: 16 }}>
            {sources.map((name, i) => (
              <span key={i} style={{
                display: "flex", alignItems: "center", gap: 10, paddingInline: 12, height: 44, minWidth: 0,
                borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)",
                background: "var(--surface-sunken)", color: "var(--text-secondary)",
              }}>
                {libPlugGlyph}
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
              </span>
            ))}
          </div>
          <Divider spacing={24} />
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18 }}>
            {steps.map((s, i) => (
              <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <LibStepNumber n={i + 1} size={28} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{s.title}</div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 3 }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

window.LibAuthSplit = LibAuthSplit;
window.LibSignupProof = LibSignupProof;
window.LibOnboardingPreview = LibOnboardingPreview;
window.LibMigrationPromise = LibMigrationPromise;
