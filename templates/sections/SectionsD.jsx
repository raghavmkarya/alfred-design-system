/* ============================================================
   Alfred — reusable marketing SECTION templates (part D).
   Hero (default / waitlist / product) · Statement · Closing CTA · FAQ.
   Dark theme, composed from the design-system primitives. Each
   function is a self-contained <section> you can lift into any page.
   Reuses the Container helper exposed by SectionsA when present.
   ============================================================ */
const { EyebrowBadge, AvatarStack, Countdown, CapabilityTicker, DotMatrix, Accordion, Button } =
  window.AlfredAIDesignSystem_1ce241;

const ContainerD = window.SecContainer || (({ children, style }) => (
  <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px", ...style }}>{children}</div>
));

/* Live display spec on dark: Satoshi carries headlines, 52–64px, weight 400. */
const displayStyle = (size) => ({
  fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: size,
  lineHeight: 1.06, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0,
});
const subStyle = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--text-secondary)",
  lineHeight: "var(--lh-relaxed)", margin: 0,
};
const GradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
/* Ghost CTA on dark — transparent with a white-alpha hairline (the live secondary). */
const ghostCtaStyle = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };

/* ——— 12 · Hero (default | waitlist | product) ——— */
function Hero({
  eyebrow = "Decision intelligence platform",
  title = (
    <>The AI memory powering <GradientText>every decision</GradientText> across your organisation</>
  ),
  sub = "Operate your business as a unified intelligence where signals, decisions and actions are continuously connected.",
  primaryCta = "get started",
  secondaryCta = "How it works",
  variant = "default",
  tickerItems = ["Budget reallocation", "CAC diagnosis", "Pipeline forecasting", "Creative fatigue alerts", "Spend pacing guardrails", "Channel mix planning"],
  countdownTarget = "2026-09-01T09:00:00",
}) {
  const [email, setEmail] = React.useState("");
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--glow-orange), var(--bg-page)" }}>
      <ContainerD style={{ padding: variant === "product" ? "96px 40px 72px" : "96px 40px 96px", textAlign: "center" }}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h1 style={{ ...displayStyle(60), maxWidth: 820, margin: "22px auto 0" }}>{title}</h1>
        <p style={{ ...subStyle, maxWidth: 560, margin: "20px auto 0" }}>{sub}</p>

        {variant === "waitlist" ? (
          <div>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10, justifyContent: "center", maxWidth: 460, margin: "32px auto 0" }}>
              <input
                value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                placeholder="you@company.com" aria-label="Work email"
                style={{ flex: 1, height: 48, padding: "0 18px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)",
                  background: "var(--surface-input-plain)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", outline: "none" }}
              />
              <Button variant="primary" size="lg" type="submit">Join the waitlist</Button>
            </form>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", margin: "12px 0 0" }}>
              We'll only reach out when your early access is ready.
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
              <AvatarStack
                names={["Priya Menon", "Daniel Okafor", "Mei Lin", "Sofia Alvarez", "James Carter"]}
                max={4} label="Join the leaders putting Alfred to work."
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
              <Countdown target={countdownTarget} size="md" />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={ghostCtaStyle}>{secondaryCta}</Button>
          </div>
        )}

        {variant === "product" && (
          <CapabilityTicker items={tickerItems} style={{ maxWidth: 680, margin: "48px auto 0" }} />
        )}
      </ContainerD>
    </section>
  );
}

/* ——— 13 · Statement (the /alfred_core pattern) ——— */
function Statement({
  eyebrow = "Alfred Core",
  statement = "Not another dashboard, not another chatbot, not another analytics tool.",
  body = "Decision intelligence sits between your data and your decisions — it detects what changed, explains why, and recommends what to do next. Alfred Core remembers every signal, decision and outcome behind that loop, so no briefing ever starts from zero.",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <ContainerD style={{ padding: "92px 40px", maxWidth: 960 }}>
        <EyebrowBadge tone="periwinkle">{eyebrow}</EyebrowBadge>
        <h2 style={{ ...displayStyle(44), lineHeight: 1.12, maxWidth: 800, margin: "22px 0 0" }}>{statement}</h2>
        <p style={{ ...subStyle, fontSize: "var(--text-base)", maxWidth: 620, margin: "20px 0 0" }}>{body}</p>
      </ContainerD>
    </section>
  );
}

/* ——— 14 · Closing CTA band (DotMatrix) ——— */
function ClosingCTA({
  title = "Built for the leaders who decide things.",
  sub = "Marketing, sales, finance, operations, and the people running it all. Alfred is the intelligence layer underneath.",
  primaryCta = "get started",
  secondaryCta = "Talk to us",
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)", borderTop: "1px solid var(--border-subtle)" }}>
      <DotMatrix height={340} tone="brand" style={{ position: "absolute", inset: 0, height: "100%" }} />
      {/* Centre scrim so the headline stays legible over the lit dots. */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(56% 76% at 50% 50%, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.34) 70%, rgba(0,0,0,0) 100%)" }} />
      <ContainerD style={{ position: "relative", padding: "112px 40px", textAlign: "center" }}>
        <h2 style={{ ...displayStyle(52), maxWidth: 720, margin: "0 auto" }}>{title}</h2>
        <p style={{ ...subStyle, maxWidth: 600, margin: "18px auto 0" }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
          <Button variant="primary" size="lg">{primaryCta}</Button>
          <Button variant="outline" size="lg" style={ghostCtaStyle}>{secondaryCta}</Button>
        </div>
      </ContainerD>
    </section>
  );
}

/* ——— 15 · FAQ (accordion + support rail) ——— */
function Faq({
  title = "Got Any Questions? We've Got Answers",
  items = [
    { q: "What is Alfred AI?", a: "Alfred is a decision intelligence platform for business leaders. It connects your stack, learns how your organisation actually works, and delivers decision-ready answers — what changed, why, and what to do next." },
    { q: "What is decision intelligence?", a: "Turning raw business data into clear, explained, decision-ready answers. It sits between your data and your decisions — detecting what changed, explaining why, and recommending what to do next." },
    { q: "How is it different from a dashboard or BI tool?", a: "Dashboards show you numbers; Alfred does the synthesis and reasoning a leader would otherwise do by hand, and tells you what to act on." },
    { q: "What does Alfred connect to?", a: "Your marketing, sales and finance stack — campaigns, channels, CRM, analytics and performance systems." },
    { q: "Who is Alfred built for?", a: "The leaders who decide things — marketing, sales, finance and operations, and the people running it all." },
    { q: "What is live today, and what is coming?", a: "Alfred for Marketing is live today. Alfred for Sales is in development, and Finance, Operations and Founders modules are planned next — each one built on the same shared memory." },
    { q: "Is my data used to train models?", a: "No. Your data is logically isolated, never trains shared models, and is never sold or shared with third parties." },
  ],
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <ContainerD style={{ padding: "84px 40px", display: "grid", gridTemplateColumns: "0.9fr 1.4fr", gap: 48, alignItems: "start" }}>
        <div>
          <EyebrowBadge tone="brand">FAQ</EyebrowBadge>
          <h2 style={{ ...displayStyle(36), lineHeight: 1.12, margin: "20px 0 0" }}>{title}</h2>
          {/* Support rail */}
          <div style={{ marginTop: 28, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 24 }}>
            <div style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange-400)", marginBottom: 14 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
                <path d="M3.5 7.5l8.5 6 8.5-6" />
              </svg>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBottom: 6 }}>Still curious?</div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: "0 0 12px" }}>
              Write to us and a human will get back to you.
            </p>
            <a href="mailto:hello@seekalfred.ai" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-link)", textDecoration: "none" }}>
              hello@seekalfred.ai
            </a>
          </div>
        </div>
        <Accordion
          items={items.map((it, i) => ({ id: `q${i}`, title: it.q, content: it.a }))}
          defaultOpen={["q0"]}
        />
      </ContainerD>
    </section>
  );
}

window.SecHero = Hero;
window.SecStatement = Statement;
window.SecClosingCTA = ClosingCTA;
window.SecFaq = Faq;
