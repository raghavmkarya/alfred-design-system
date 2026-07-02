const { Logo, Button, StepFlow, StatBand, FaqItem } = window.AlfredAIDesignSystem_1ce241;
const Container2 = window.SiteContainer;
const Eyebrow2 = window.SiteEyebrow;
const LR = "../../assets/logos";

/* ——— How it works ——— */
function HowItWorks() {
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <Container2 style={{ padding: "84px 40px" }}>
        <Eyebrow2>How it works</Eyebrow2>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 40, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 40px" }}>
          Alfred works for you, works with you
        </h2>
        <StepFlow steps={[
          { title: "Learn", body: "Builds a continuously evolving understanding of how your business operates — the relationships between signals, decisions and outcomes." },
          { title: "Nudges", body: "Surfaces emerging signals early and notifies the right people, with reasons, before they become measurable issues." },
          { title: "Recommends", body: "Provides structured direction grounded in your organisation's own patterns and operating history." },
          { title: "Acts", body: "Converts decisions into execution on command — fully traceable, aligned and immediate." },
        ]} />
      </Container2>
    </section>
  );
}

/* ——— Outcomes / stats ——— */
function Outcomes() {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <Container2 style={{ padding: "84px 40px", textAlign: "center" }}>
        <Eyebrow2>Outcomes</Eyebrow2>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 40, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 48px" }}>
          Leaders trust Alfred AI
        </h2>
        <StatBand stats={[
          { value: "90+", label: "AI implementations" },
          { value: "$90M+", label: "Cost savings delivered" },
          { value: "90x", label: "Productivity boost" },
        ]} />
      </Container2>
    </section>
  );
}

/* ——— Security ——— */
function Security() {
  const items = [
    ["Data isolation", "Your data is stored in a logically isolated Alfred environment."],
    ["Private pattern library", "A living memory of your history, decisions, signals and outcomes — yours alone."],
    ["No cross-customer training", "Your data never trains shared models, benchmarks or playbooks."],
    ["Foundational model usage", "We use API access to foundational models purely as inference infrastructure."],
    ["No third-party sharing", "Your data is never sold, licensed or shared for training or resale."],
    ["No commercialization", "Your data is not our product. Your subscription is."],
  ];
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <Container2 style={{ padding: "84px 40px" }}>
        <Eyebrow2>Security</Eyebrow2>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 40, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 40px" }}>
          Enterprise-Grade Security
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {items.map(([t, d]) => (
            <div key={t} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ width: 18, height: 18, background: "var(--orange-400)", WebkitMaskImage: "url(../../assets/icons/security-lock.svg)", maskImage: "url(../../assets/icons/security-lock.svg)", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain" }} />
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBottom: 6 }}>{t}</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </Container2>
    </section>
  );
}

/* ——— FAQ ——— */
function Faq() {
  const [open, setOpen] = React.useState(0);
  const qs = [
    ["What is Alfred AI?", "Alfred is a decision intelligence platform for business leaders. It connects your stack, learns how your organisation actually works, and delivers decision-ready answers — what changed, why, and what to do next."],
    ["What is decision intelligence?", "Turning raw business data into clear, explained, decision-ready answers. It sits between your data and your decisions — detecting what changed, explaining why, and recommending what to do next."],
    ["How is it different from a dashboard or BI tool?", "Dashboards show you numbers; Alfred does the synthesis and reasoning a leader would otherwise do by hand, and tells you what to act on."],
    ["What does Alfred connect to?", "Your marketing, sales and finance stack — campaigns, channels, CRM, analytics and performance systems."],
    ["Who is Alfred built for?", "The leaders who decide things — marketing, sales, finance and operations, and the people running it all."],
    ["What is live today, and what is coming?", "Alfred for Marketing is live today. Alfred for Sales is in development, and Finance, Operations and Founders modules are planned next — each one built on the same shared memory."],
    ["Is my data used to train models?", "No. Your data is logically isolated, never trains shared models, and is never sold or shared with third parties."],
  ];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <Container2 style={{ padding: "84px 40px", maxWidth: 880 }}>
        <Eyebrow2>FAQ</Eyebrow2>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 40, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 24px" }}>
          Got Any Questions? We've Got Answers
        </h2>
        {qs.map(([q, a], i) => (
          <FaqItem key={i} question={q} open={open === i} onToggle={(v) => setOpen(v ? i : -1)}>{a}</FaqItem>
        ))}
      </Container2>
    </section>
  );
}

/* ——— CTA ——— */
function CTA() {
  return (
    <section style={{ background: "var(--bg-page)", paddingBottom: 84 }}>
      <Container2>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-3xl)", background: "var(--gradient-brand-reverse)", padding: "72px 56px", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 120% at 50% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }} />
          <h2 style={{ position: "relative", fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: 48, letterSpacing: "-0.025em", color: "var(--text-on-brand)", margin: "0 0 14px" }}>
            Built for the leaders who decide things.
          </h2>
          <p style={{ position: "relative", fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.92)", margin: "0 auto 28px", maxWidth: 560 }}>
            Marketing, sales, finance, operations — and the people running it all. Alfred is the intelligence layer underneath.
          </p>
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <Button variant="secondary" size="lg" style={{ background: "#fff", color: "var(--ink-900)" }}>Seek Alfred</Button>
          </div>
        </div>
      </Container2>
    </section>
  );
}

/* ——— Footer ——— */
function SiteFooter() {
  const col = (title, links) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)" }}>{title}</span>
      {links.map((l) => <span key={l} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", cursor: "pointer" }}>{l}</span>)}
    </div>
  );
  return (
    <footer style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <Container2 style={{ padding: "56px 40px 40px", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <Logo height={26} tone="white" root={LR} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", maxWidth: 320, marginTop: 16 }}>
            Alfred is the decision intelligence platform for marketing, sales, and the leaders running them. We connect your stack, synthesise what matters, and deliver decision-ready intelligence every day.
          </p>
        </div>
        {col("Product", ["Home", "Alfred for Marketing", "Alfred Core", "Integrations", "Pricing", "Blog", "Contact"])}
        {col("Company", ["Team", "Career", "Docs", "Waitlist"])}
        {col("Legal", ["Privacy Policy", "Terms & Conditions", "Cookies"])}
      </Container2>
      <Container2 style={{ padding: "0 40px 36px" }}>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 20, fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>© 2026 E902 AI Labs Private Limited. All rights reserved.</div>
      </Container2>
    </footer>
  );
}

window.HowItWorks = HowItWorks;
window.Outcomes = Outcomes;
window.Security = Security;
window.Faq = Faq;
window.CTA = CTA;
window.SiteFooter = SiteFooter;
