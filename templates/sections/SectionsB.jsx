/* ============================================================
   Alfred — reusable marketing SECTION templates (part B).
   Pricing · Testimonial · Integrations grid · Waitlist CTA.
   ============================================================ */
const { Badge, Button, Icon, Avatar } = window.AlfredAIDesignSystem_1ce241;
const Container = window.SecContainer;
const Eyebrow = window.SecEyebrow;
const H2 = window.SecH2;
const Check = window.SecCheck;
const SIR2 = "../../assets/icons";

/* ——— 5 · Pricing tiers ——— */
function PricingTiers() {
  const tiers = [
    { name: "Starter", price: "$0", note: "for a single leader", blurb: "The daily briefing and decision alerts for one connected channel.", cta: "Start free", variant: "outline", feats: ["Daily briefing", "Up to 2 integrations", "7-day memory", "Email alerts"] },
    { name: "Growth", price: "$1,200", note: "per workspace / mo", blurb: "The full marketing intelligence layer for the whole team.", cta: "Talk to sales", variant: "primary", featured: true, feats: ["Everything in Starter", "Unlimited integrations", "Unified KPI cockpit", "Real-time decision alerts", "Compounding Alfred Core memory"] },
    { name: "Enterprise", price: "Custom", note: "for the org", blurb: "Marketing, sales and finance on one memory, with governance.", cta: "Contact us", variant: "outline", feats: ["Everything in Growth", "Sales & finance modules", "SSO, audit log & data isolation", "Dedicated success partner"] },
  ];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <Container style={{ padding: "84px 40px" }}>
        <div style={{ textAlign: "center" }}>
          <Eyebrow>Pricing</Eyebrow>
          <H2 style={{ marginBottom: 8 }}>Priced for the decisions it makes</H2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", margin: "0 0 40px" }}>Start free. Upgrade when Alfred is running the room.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {tiers.map((t) => (
            <div key={t.name} style={{
              position: "relative", borderRadius: "var(--radius-2xl)", padding: 28,
              background: t.featured ? "var(--surface-card)" : "var(--surface-sunken)",
              border: t.featured ? "1px solid transparent" : "1px solid var(--border-subtle)",
              backgroundImage: t.featured ? "linear-gradient(var(--surface-card), var(--surface-card)), var(--gradient-brand)" : undefined,
              backgroundOrigin: t.featured ? "border-box" : undefined,
              backgroundClip: t.featured ? "padding-box, border-box" : undefined,
              boxShadow: t.featured ? "var(--shadow-lg)" : "none",
              transform: t.featured ? "translateY(-8px)" : "none",
            }}>
              {t.featured && <div style={{ position: "absolute", top: 20, right: 20 }}><Badge tone="brand" dot>Most popular</Badge></div>}
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{t.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "14px 0 4px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: 44, letterSpacing: "-0.03em", color: "#fff" }}>{t.price}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{t.note}</span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", minHeight: 42 }}>{t.blurb}</p>
              <Button variant={t.variant} fullWidth style={t.variant === "outline" ? { color: "#fff", borderColor: "var(--border-default)" } : undefined}>{t.cta}</Button>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
                {t.feats.map((f) => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ marginTop: 1 }}><Check size={16} /></span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ——— 6 · Testimonial ——— */
function Testimonial() {
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <Container style={{ padding: "84px 40px", maxWidth: 880, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: 64, lineHeight: 1, background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>“</div>
        <blockquote style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-medium)", fontSize: 32, lineHeight: 1.24, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 28px" }}>
          Alfred caught a budget drift four days before it would have cost us. It didn't just flag it — it told me exactly what to shift, and why. That's a chief of staff, not a dashboard.
        </blockquote>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <Avatar name="Priya Menon" size={48} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>Priya Menon</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>CMO · Northwind Co.</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ——— 7 · Integrations grid ——— */
function IntegrationsGrid() {
  const items = [
    ["Google Ads", "var(--orange-500)"], ["Meta", "var(--periwinkle-500)"], ["HubSpot", "var(--orange-400)"], ["Salesforce", "var(--periwinkle-600)"],
    ["LinkedIn", "var(--periwinkle-400)"], ["GA4", "var(--orange-300)"], ["Looker", "var(--orange-500)"], ["Slack", "var(--periwinkle-500)"],
  ];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <Container style={{ padding: "84px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center" }}>
          <div>
            <Eyebrow>Connected intelligence</Eyebrow>
            <H2 style={{ fontSize: 36 }}>It plugs into the stack you already run.</H2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: "16px 0 24px", maxWidth: 440 }}>
              Alfred Core reads from your campaigns, CRM, analytics and warehouse — and reconciles them into one source of truth. No new dashboards to maintain.
            </p>
            <Button variant="primary">Browse all integrations</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {items.map(([name, c]) => (
              <div key={name} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="web-stack-connected" root={SIR2} size={20} color="#fff" />
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", textAlign: "center" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ——— 8 · Waitlist / CTA band ——— */
function WaitlistCTA() {
  const [email, setEmail] = React.useState("");
  return (
    <section style={{ background: "var(--bg-page)", paddingBottom: 84 }}>
      <Container>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-3xl)", border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", padding: "56px 48px", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "var(--glow-periwinkle), var(--glow-orange)" }} />
          <div style={{ position: "relative" }}>
            <Eyebrow>Decisions, on demand</Eyebrow>
            <H2 style={{ fontSize: 40, marginBottom: 10 }}>Be first in line.</H2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", margin: "0 auto 26px", maxWidth: 460 }}>
              Join the leaders putting Alfred to work. We'll reach out with early access.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10, justifyContent: "center", maxWidth: 460, margin: "0 auto" }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com"
                style={{ flex: 1, height: 48, padding: "0 18px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)",
                  background: "var(--surface-input-plain)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", outline: "none" }} />
              <Button variant="primary" size="lg" type="submit">Seek Alfred</Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

window.SecPricingTiers = PricingTiers;
window.SecTestimonial = Testimonial;
window.SecIntegrationsGrid = IntegrationsGrid;
window.SecWaitlistCTA = WaitlistCTA;
