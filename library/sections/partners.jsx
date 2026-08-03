/* ============================================================
   Alfred, Inspiration Library · PARTNERS.
   Agency and partner-program patterns: the program hero, the
   three-tier ladder, agency proof with a per-client console, and
   the four-step co-sell path. The instrument layer carries the
   program mechanics (requirements, time estimates, console rows
   in mono); headlines stay Clash, body stays Satoshi. Every
   component ships complete default copy: a bare
   <LibPartnerHero /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/partners.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Badge,
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
/* The instrument layer's voice: true mono, 11-12px, uppercase with --ls-caps
   where it labels. Mono never sets headlines or body. */
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
const libMonoLine = {
  fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.7,
  color: "var(--text-secondary)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
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
const libCheckGlyph = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: 4 }}>
    <path d="M4 12.5l5.5 5.5L20 6.5" />
  </svg>
);

/* === partner-hero · the program opener with three quick stats === */
function LibPartnerHero({
  eyebrow = "Alfred partner program",
  title = "Run every client on Alfred",
  titleAccent = "every client", /* exactly one gradient-filled phrase */
  sub = "I sit inside each client account, write the Monday brief before your team logs in, and leave your strategists selling judgment instead of reporting hours.",
  primaryCta = "Apply to the program",
  secondaryCta = "Read the partner guide",
  stats = [
    { value: "20%", label: "Margin share", note: "on every client seat you manage" },
    { value: "40+", label: "Client seats", note: "run from one partner console" },
    { value: "2 wks", label: "To certification", note: "for your first operator cohort" },
  ],
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 72px", textAlign: "center" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h1 style={{ ...libDisplay(56), maxWidth: 820, marginInline: "auto", marginBlockStart: 22 }}>{libAccent(title, titleAccent)}</h1>
        <p style={{ ...libSub, maxWidth: 580, marginBlockStart: 20, marginInline: "auto" }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBlockStart: 32, flexWrap: "wrap" }}>
          <Button variant="primary" size="lg">{primaryCta}</Button>
          <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
        </div>
        {/* the program in three numbers, instrument-labeled */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          rowGap: 28, marginBlockStart: 64, paddingBlockStart: 36,
          borderBlockStart: "1px solid var(--border-subtle)",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              minWidth: 0, paddingInline: 24,
              borderInlineStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
            }}>
              <div style={libNumeral(42)}>{s.value}</div>
              <div style={{ ...libMonoCaps({}), marginBlockStart: 12 }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBlockStart: 6 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === partner-tiers · the three-rung program ladder === */
const LIB_PARTNER_TIERS = [
  {
    name: "Registered",
    summary: "For agencies putting their first client on Alfred.",
    benefits: [
      "Partner console with your first three client seats",
      "Self-serve certification track for two operators",
      "Co-branded one-pager for your pitches",
      "Standard support, one business day",
    ],
    ctaLabel: "Start here",
    requirement: "req :: 1 live client · 2 certified operators",
  },
  {
    name: "Certified",
    badge: "Most partners",
    summary: "For agencies making Alfred part of the retainer.",
    benefits: [
      "20% margin share on every managed seat",
      "Priority onboarding for each new client",
      "Quarterly roadmap briefing with our team",
      "Listing in the partner directory",
      "Co-sell support on deals over $25K",
    ],
    ctaLabel: "Apply now",
    requirement: "req :: 5 live clients · 4 certified operators",
  },
  {
    name: "Strategic",
    summary: "For groups running Alfred across the whole book.",
    benefits: [
      "Named partner manager and a shared channel",
      "Joint go-to-market budget each quarter",
      "Early access to new Alfred modules",
      "Custom margin terms at portfolio scale",
    ],
    ctaLabel: "Talk to us",
    requirement: "req :: 20 live clients · by invitation",
  },
];
function LibPartnerTiers({
  eyebrow = "Program tiers",
  title = "Three tiers, one direction",
  sub = "Every tier keeps the same promise: your clients get briefed, your team keeps the margin. The ladder only changes how much of it I carry.",
  tiers = LIB_PARTNER_TIERS,
  highlightIndex = 1,
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{title}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          gap: 24, marginBlockStart: 56, alignItems: "stretch",
        }}>
          {tiers.map((t, i) => {
            const hot = i === highlightIndex;
            return (
              <div key={i} style={{
                minWidth: 0, display: "flex", flexDirection: "column",
                background: "var(--surface-card)",
                border: hot ? "2px solid var(--accent)" : "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-2xl)", padding: 28,
                boxShadow: hot ? "var(--elevation-floating)" : "var(--elevation-surface)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 24, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{t.name}</div>
                  {t.badge ? <Badge tone="brand">{t.badge}</Badge> : null}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 8 }}>{t.summary}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBlockStart: 20, display: "flex", flexDirection: "column", gap: 11, flexGrow: 1 }}>
                  {t.benefits.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>
                      <span style={{ color: hot ? "var(--accent)" : "var(--text-muted)" }}>{libCheckGlyph}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginBlockStart: 24 }}>
                  <Button variant={hot ? "primary" : "outline"} size="md" fullWidth style={hot ? undefined : libGhostCta}>{t.ctaLabel}</Button>
                </div>
                {/* the tier's entry bar, in the instrument voice */}
                <div style={{ ...libMonoCaps({}), marginBlockStart: 16, paddingBlockStart: 14, borderBlockStart: "1px dashed var(--border-subtle)" }}>{t.requirement}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* === agency-proof · wordmarks, one operator quote, the client console === */
const LIB_AGENCY_MARKS = [
  { name: "Harborline", style: "display" },
  { name: "BLUEPEAK MEDIA", style: "tracked" },
  { name: "Northwind Growth", style: "sans" },
  { name: "Fernway & Co", style: "display" },
  { name: "COBALT ROW", style: "tracked" },
];
const LIB_CONSOLE_CLIENTS = [
  { client: "Meridian", spend: "$48.2K", pace: "+2% vs plan", state: "on plan", tone: "success" },
  { client: "Bluepeak retail", spend: "$31.4K", pace: "on pace", state: "on plan", tone: "success" },
  { client: "Northwind", spend: "$22.9K", pace: "-6% vs plan", state: "review", tone: "warning" },
];
function LibAgencyProof({
  eyebrow = "Working with agencies",
  title = "Agencies sell the decision, I do the reading",
  quote = "We stopped selling reporting hours and started selling calls. Alfred writes the Monday brief for nine clients before my first strategist logs in.",
  quoteName = "Dana Whitfield",
  quoteRole = "Managing partner, Harborline",
  marks = LIB_AGENCY_MARKS,
  marksLabel = "Fictional partner roster, for layout",
  consoleLabel = "Partner console :: client view",
  consoleMeta = "read-only · synced 08:02",
  clients = LIB_CONSOLE_CLIENTS,
  consoleFoot = "9 clients watched · 2 briefs waiting on approval",
}) {
  const markFace = {
    display: { fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 21, letterSpacing: "-0.01em" },
    tracked: { fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)", fontSize: 14, letterSpacing: "0.14em" },
    sans: { fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)", fontSize: 18, letterSpacing: "-0.01em" },
  };
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "80px 88px" })}>
        {/* the wordmark strip: text marks only, deliberately fictional */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "28px 44px", flexWrap: "wrap", color: "var(--text-muted)" }}>
          {marks.map((m, i) => (
            <span key={i} style={{ ...markFace[m.style] || markFace.sans, whiteSpace: "nowrap" }}>{m.name}</span>
          ))}
        </div>
        <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 18, marginBlockEnd: 0 }}>{marksLabel}</p>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
          gap: 56, alignItems: "center", marginBlockStart: 64,
        }}>
          <div style={{ minWidth: 0 }}>
            <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(38), marginBlockStart: 18, maxWidth: 460 }}>{title}</h2>
            <blockquote style={{ margin: 0, marginBlockStart: 24, paddingInlineStart: 20, borderInlineStart: "3px solid var(--accent)" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--text-primary)", lineHeight: "var(--lh-relaxed)", margin: 0 }}>&ldquo;{quote}&rdquo;</p>
              <footer style={{ marginBlockStart: 16 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{quoteName}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 2 }}>{quoteRole}</div>
              </footer>
            </blockquote>
          </div>
          {/* the per-client mini console */}
          <div style={{
            minWidth: 0, background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--elevation-raised)",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
              paddingBlock: 12, paddingInline: 18, borderBlockEnd: "1px solid var(--border-subtle)",
            }}>
              <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{consoleLabel}</span>
              <span style={libMonoCaps({})}>{consoleMeta}</span>
            </div>
            <div>
              {clients.map((c, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr) auto",
                  gap: 12, alignItems: "center", paddingBlock: 13, paddingInline: 18,
                  borderBlockEnd: "1px solid var(--border-subtle)",
                }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", minWidth: 0 }}>{c.client}</span>
                  <span style={{ ...libMonoLine, fontSize: 12 }}>{c.spend}</span>
                  <span style={{ ...libMonoLine, fontSize: 12, color: "var(--text-muted)" }}>{c.pace}</span>
                  <Badge tone={c.tone} dot>{c.state}</Badge>
                </div>
              ))}
            </div>
            <div style={{ ...libMonoCaps({}), display: "flex", alignItems: "center", gap: 9, paddingBlock: 11, paddingInline: 18, background: "var(--surface-sunken)" }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "var(--radius-circle)", background: "var(--accent)", flexShrink: 0 }} />
              {consoleFoot}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === co-sell-steps · the four-step path, timed in mono === */
const LIB_COSELL_STEPS = [
  {
    title: "Apply",
    body: "Tell us about your roster and the clients you would start with. We reply within two business days.",
    time: "t :: 10 min",
  },
  {
    title: "Certify",
    body: "Two of your operators run the certification track: connecting a stack, reading a brief, approving a move.",
    time: "t :: 2 weeks",
  },
  {
    title: "Launch your first client",
    body: "We sit with you on the first connect. One afternoon of setup, and the first Monday brief lands that week.",
    time: "t :: 1 afternoon",
  },
  {
    title: "Share the margin",
    body: "Every managed seat pays your margin share monthly, itemized per client in the partner console.",
    time: "t :: from day 30",
  },
];
function LibCoSellSteps({
  eyebrow = "How partnering works",
  title = "From application to margin share",
  sub = "Four steps, no procurement maze. Most agencies take their first client live inside a month.",
  steps = LIB_COSELL_STEPS,
  cta = "Apply to the program",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <div style={{ maxWidth: 640 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{title}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 16 }}>{sub}</p>
        </div>
        <ol style={{
          listStyle: "none", margin: 0, padding: 0, marginBlockStart: 52,
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))",
          gap: "36px 28px",
        }}>
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={i} style={{ minWidth: 0 }}>
                {/* number chip + connector line; flex order follows the writing direction */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span aria-hidden="true" style={{
                    width: 34, height: 34, borderRadius: "var(--radius-circle)", flexShrink: 0,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 15,
                    background: last ? "var(--accent-soft)" : "var(--surface-card)",
                    color: last ? "var(--text-on-tint-brand)" : "var(--text-primary)",
                    border: last ? "1px solid transparent" : "1px solid var(--border-default)",
                  }}>{i + 1}</span>
                  {!last ? <span aria-hidden="true" style={{ flexGrow: 1, height: 1, background: "var(--border-default)" }} /> : null}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockStart: 18 }}>{s.title}</div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 8 }}>{s.body}</p>
                <div style={{ ...libMonoCaps({}), marginBlockStart: 12 }}>{s.time}</div>
              </li>
            );
          })}
        </ol>
        <div style={{ marginBlockStart: 48 }}>
          <Button variant="primary" size="lg">{cta}</Button>
        </div>
      </div>
    </section>
  );
}

window.LibPartnerHero = LibPartnerHero;
window.LibPartnerTiers = LibPartnerTiers;
window.LibAgencyProof = LibAgencyProof;
window.LibCoSellSteps = LibCoSellSteps;
