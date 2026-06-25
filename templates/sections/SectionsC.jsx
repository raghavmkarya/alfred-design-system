/* ============================================================
   Alfred — reusable marketing SECTION templates (part C).
   Pricing comparison · Blog grid · Changelog. Dark theme.
   Reuses the helpers exposed on window by SectionsA.
   ============================================================ */
const { Badge, Chip, Icon } = window.AlfredAIDesignSystem_1ce241;
const Container = window.SecContainer;
const Eyebrow = window.SecEyebrow;
const H2 = window.SecH2;
const Check = window.SecCheck;
const SIR3 = "../../assets/icons";

/* ——— 9 · Pricing comparison ——— */
function PricingComparison() {
  const tiers = ["Starter", "Growth", "Enterprise"];
  const rows = [
    ["Daily briefing", true, true, true],
    ["Integrations", "2", "Unlimited", "Unlimited"],
    ["Unified KPI cockpit", false, true, true],
    ["Real-time decision alerts", false, true, true],
    ["Compounding Alfred Core memory", false, true, true],
    ["Sales & finance modules", false, false, true],
    ["SSO, audit log & data isolation", false, false, true],
    ["Dedicated success partner", false, false, true],
  ];
  const cell = (v) => typeof v === "string"
    ? <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{v}</span>
    : v ? <Check /> : <Icon name="pricing-cross" root={SIR3} size={18} color="var(--text-muted)" />;
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <Container style={{ padding: "84px 40px" }}>
        <div style={{ textAlign: "center" }}>
          <Eyebrow>Compare plans</Eyebrow>
          <H2 style={{ marginBottom: 36 }}>Everything in one intelligence layer</H2>
        </div>
        <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", background: "var(--surface-sunken)", borderBottom: "1px solid var(--border-subtle)" }}>
            <div style={{ padding: "20px 22px" }} />
            {tiers.map((t, i) => (
              <div key={t} style={{ padding: "20px 22px", textAlign: "center", fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-h4)", color: "#fff", borderLeft: "1px solid var(--border-subtle)", position: "relative" }}>
                {t}{i === 1 && <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)" }}><Badge tone="brand">Popular</Badge></div>}
              </div>
            ))}
          </div>
          {rows.map((r, ri) => (
            <div key={ri} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderTop: ri > 0 ? "1px solid var(--border-subtle)" : "none", background: ri % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
              <div style={{ padding: "14px 22px", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{r[0]}</div>
              {[1, 2, 3].map((ci) => <div key={ci} style={{ padding: "14px 22px", display: "flex", justifyContent: "center", alignItems: "center", borderLeft: "1px solid var(--border-subtle)" }}>{cell(r[ci])}</div>)}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ——— 10 · Blog grid ——— */
function BlogGrid() {
  const posts = [
    ["Decision intelligence", "Why dashboards stalled — and what replaced them", "6 min", "var(--gradient-brand-reverse)"],
    ["Product", "Inside Alfred Core: the memory that compounds", "4 min", "linear-gradient(135deg, #A7A7FC 0%, #16162E 100%)"],
    ["Playbook", "Catching budget drift four days early", "5 min", "linear-gradient(135deg, #FF8431 0%, #02021E 100%)"],
  ];
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <Container style={{ padding: "84px 40px" }}>
        <Eyebrow>From the blog</Eyebrow>
        <H2 style={{ marginBottom: 36 }}>Notes on deciding well</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {posts.map(([cat, title, read, grad], i) => (
            <div key={i} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", overflow: "hidden" }}>
              <div style={{ height: 160, background: grad }} />
              <div style={{ padding: 22 }}>
                <Chip tone="info">{cat}</Chip>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 22, color: "#fff", letterSpacing: "-0.01em", margin: "14px 0 10px", lineHeight: 1.2 }}>{title}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{read} read</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ——— 11 · Changelog ——— */
function Changelog() {
  const releases = [
    ["v2.4", "Jun 2026", ["Creative-fatigue agent flags rising frequency before CTR drops", "Spend Mix now supports blended-ROAS targets"]],
    ["v2.3", "May 2026", ["Unified KPI Cockpit adds funnel conversion", "Slack delivery for the daily briefing"]],
    ["v2.2", "Apr 2026", ["Alfred for Sales early access", "Faster root-cause tracing across channels"]],
  ];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <Container style={{ padding: "84px 40px", maxWidth: 820 }}>
        <Eyebrow>Changelog</Eyebrow>
        <H2 style={{ marginBottom: 28 }}>What's new in Alfred</H2>
        {releases.map(([ver, date, items], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24, padding: "24px 0", borderTop: "1px solid var(--border-subtle)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-h4)", color: "#fff" }}>{ver}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 4 }}>{date}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((it, j) => (
                <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ marginTop: 1 }}><Check size={16} /></span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

window.SecPricingComparison = PricingComparison;
window.SecBlogGrid = BlogGrid;
window.SecChangelog = Changelog;
