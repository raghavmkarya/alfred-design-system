/* ============================================================
   Alfred — reusable marketing SECTION templates (part F).
   Product & commercial sections: contact split · industry cards ·
   agent showcase · enterprise band · stack diagram · timeline ·
   sourced stats. Dark theme, composed from the design-system
   primitives. Reuses the helpers exposed on window by SectionsA
   when present. Demo numbers come from data/demo-data.json
   (Northwind Labs); market stats carry a visible citation.
   ============================================================ */
const { Input, Select, Textarea, Button, Accordion, DashboardMock, AnimatedCounter, EyebrowBadge } =
  window.AlfredAIDesignSystem_1ce241;

const ContainerF = window.SecContainer || (({ children, style }) => (
  <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px", ...style }}>{children}</div>
));
const EyebrowF = window.SecEyebrow || (({ children, style }) => (
  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
    letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--orange-400)", ...style }}>{children}</span>
));
/* Dark-surface H2 — var(--font-display) inherits Satoshi under [data-theme="dark"] (live spec), weight 500. */
const H2F = ({ children, style }) => (
  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-medium)", fontSize: 40,
    letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 0", ...style }}>{children}</h2>
);
const CheckF = window.SecCheck || (({ color = "var(--orange-400)", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5" /></svg>
));

const bodySmF = { fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0 };
const capsLabelF = { fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)" };

/* ——— F1 · Contact split (value-prop rail + form card) ——— */
function ContactSplit({
  title = "Bring Alfred to your team",
  points = [
    "Connects read-only to the stack you already run — write-back is opt-in and approval-gated",
    "Alfred for Marketing is live today; Sales is in development on the same memory",
    "50% launch offer for your first 2 months",
  ],
  steps = [
    "We reply within one working day.",
    "A 30-minute walkthrough of Alfred on a stack like yours.",
    "Connect your stack, and the first daily brief lands that week.",
  ],
  onSubmit = () => {},
}) {
  const [form, setForm] = React.useState({ name: "", email: "", company: "", teamSize: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") onSubmit(form);
  };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <ContainerF style={{ padding: "84px 40px", display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 56, alignItems: "start" }}>
        {/* Value-prop rail */}
        <div>
          <EyebrowF>Contact</EyebrowF>
          <H2F style={{ fontSize: 36 }}>{title}</H2F>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
            {points.map((p) => (
              <div key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ marginTop: 1 }}><CheckF /></span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36 }}>
            <div style={capsLabelF}>What happens next</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{
                    width: 22, height: 22, flex: "none", borderRadius: "var(--radius-circle)",
                    border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: "var(--fw-bold)", color: "var(--text-secondary)",
                  }}>{i + 1}</span>
                  <span style={{ ...bodySmF, paddingTop: 2 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Form card */}
        <form onSubmit={handleSubmit} style={{
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-2xl)", padding: 28, display: "flex", flexDirection: "column", gap: 18,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Input label="Full name" fill="plain" value={form.name} onChange={set("name")} placeholder="Priya Menon" required />
            <Input label="Work email" type="email" fill="plain" value={form.email} onChange={set("email")} placeholder="you@company.com" required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Input label="Company" fill="plain" value={form.company} onChange={set("company")} placeholder="Northwind Labs" />
            <Select
              label="Team size" fill="plain" value={form.teamSize} onChange={set("teamSize")}
              placeholder="Select team size"
              options={[
                { value: "1-10", label: "1–10" },
                { value: "11-50", label: "11–50" },
                { value: "51-200", label: "51–200" },
                { value: "201-1000", label: "201–1,000" },
                { value: "1000+", label: "1,000+" },
              ]}
            />
          </div>
          <Textarea
            label="What should Alfred look at first?" fill="plain" rows={4}
            value={form.message} onChange={set("message")}
            placeholder="Your stack, the decisions you're slow on, anything."
          />
          <Button variant="primary" size="lg" fullWidth type="submit">Send message</Button>
          <p style={{ ...bodySmF, fontSize: "var(--text-xs)", color: "var(--text-muted)", textAlign: "center" }}>
            Prefer email?{" "}
            <a href="mailto:hello@seekalfred.ai" style={{ color: "var(--text-link)", fontWeight: "var(--fw-bold)", textDecoration: "none" }}>hello@seekalfred.ai</a>
            {" "}works too.
          </p>
        </form>
      </ContainerF>
    </section>
  );
}

/* ——— F2 · Industry cards (expandable use-case disclosures) ——— */
const IndGlyphF = ({ children, color = "var(--orange-400)" }) => (
  <div style={{ width: 40, height: 40, flex: "none", borderRadius: "var(--radius-md)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", color }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
  </div>
);
const IND_ICONS_F = {
  saas: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  fintech: <><path d="M3 20h18" /><path d="M5 16l4.5-5.5 3.5 3 5.5-7" /><path d="M14.5 6.5H18.5V10.5" /></>,
  ecommerce: <><path d="M6 8h12l-1.1 12H7.1L6 8z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  agencies: <><circle cx="9" cy="8" r="3" /><path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" /><path d="M16 5.4a3 3 0 0 1 0 5.7" /><path d="M20 19c0-2.3-1.4-4.2-3.4-4.9" /></>,
};

function IndustryCards({
  title = "One layer, wherever the decisions live",
  industries = [
    {
      id: "saas", name: "B2B SaaS", icon: "saas",
      tagline: "Pipeline pacing, CAC and the channels feeding them — reconciled daily.",
      scenarioTitle: "Close the pipeline gap early",
      scenario: "At Northwind Labs, the demo workspace: Q3 pipeline sits at $1.84M against a $3.2M target with 62% of the quarter elapsed. Alfred flags the pacing gap, traces it to an 8.1% weekly MQL slide, and recommends shifting $18K to Performance Max at 82% confidence.",
    },
    {
      id: "fintech", name: "FinTech", icon: "fintech",
      tagline: "Acquisition-cost discipline for teams that answer to a margin.",
      scenarioTitle: "Stop CAC drift before it compounds",
      scenario: "Blended CAC climbs $18 week over week while one Meta audience burns $4.8K with zero conversions. Alfred recommends the kill and a $4K/day cap on the audience — recovering the waste the same day, with the trace attached.",
    },
    {
      id: "ecommerce", name: "eCommerce", icon: "ecommerce",
      tagline: "Creative and spend, watched daily across every channel.",
      scenarioTitle: "Protect $26K/mo from creative fatigue",
      scenario: "The hero creative shows CTR down 12% in a week — fatigue, not audience. Alfred recommends rotating the variant before Friday, protecting roughly $26K a month of spend from decay.",
    },
    {
      id: "agencies", name: "Agencies", icon: "agencies",
      tagline: "Every client account triaged before the morning stand-up.",
      scenarioTitle: "Scale a 6.1x winner by 20%",
      scenario: "Brand search runs at 6.1x ROAS with headroom to scale +20%. Alfred drafts the recommendation, routes it to the account owner for approval, and logs the outcome to memory — so the next brief starts sharper.",
    },
  ],
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <ContainerF style={{ padding: "84px 40px" }}>
        <EyebrowF>Industries</EyebrowF>
        <H2F style={{ marginBottom: 36 }}>{title}</H2F>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          {industries.map((it, i) => (
            <div key={it.id} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 24 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <IndGlyphF color={it.color}>{IND_ICONS_F[it.icon] || IND_ICONS_F.saas}</IndGlyphF>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 22, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{it.name}</div>
              </div>
              <p style={{ ...bodySmF, margin: "12px 0 4px" }}>{it.tagline}</p>
              <Accordion
                bordered={false}
                items={[{ id: it.id, title: it.scenarioTitle, content: it.scenario }]}
                defaultOpen={i === 0 ? [it.id] : []}
              />
            </div>
          ))}
        </div>
        <p style={{ ...bodySmF, fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 18, maxWidth: 620 }}>
          Every scenario is drawn from Northwind Labs — the fictional demo company all Alfred surfaces portray — not from customer results.
        </p>
      </ContainerF>
    </section>
  );
}

/* ——— F3 · Agent showcase (selector rail + embedded product mock) ——— */
function AgentShowcase({
  title = "Six agents. One memory.",
  active = "Daily Brief",
  agents = [
    {
      name: "Daily Brief",
      line: "What changed overnight, why it matters, and the one thing to act on first.",
      mock: { url: "app.seekalfred.ai/brief" },
    },
    {
      name: "Spend Mix",
      line: "Where every dollar is working — and the reallocation that fixes the drift.",
      mock: {
        url: "app.seekalfred.ai/spend-mix",
        kpis: [
          { label: "Spend today", value: "$48.2K", delta: "+6.4% vs plan", tone: "neutral" },
          { label: "Blended ROAS", value: "4.8x", delta: "+12.4% vs 30d", tone: "good" },
          { label: "Recoverable waste", value: "$55.1K", delta: "per month", tone: "bad" },
        ],
        actions: [
          { severity: "P1", insight: "Shift $18K from non-brand search to Performance Max", detail: "Google Ads — 82% confidence", action: "Approve" },
          { severity: "P2", insight: "Kill Meta US-broad and cap the audience at $4K/day", detail: "Recovers $4.8K/day of waste", action: "KILL" },
          { severity: "P3", insight: "Scale LinkedIn ABM +30% at flat CPL", detail: "LinkedIn — 78% confidence", action: "SCALE" },
        ],
      },
    },
    {
      name: "AI Visibility",
      line: "How often AI assistants surface you when buyers ask — scored out of 100.",
      mock: {
        url: "app.seekalfred.ai/ai-visibility",
        score: 72,
        kpis: [
          { label: "AI Visibility Score", value: "72", delta: "+4 pts", tone: "good" },
          { label: "MQLs this week", value: "312", delta: "-8.1%", tone: "bad" },
          { label: "Blended ROAS", value: "4.8x", delta: "+12.4% vs 30d", tone: "good" },
        ],
        actions: [
          { severity: "P2", insight: "AI Visibility Score at 72 — up 4 points", detail: "Out of 100 — up from 68 last week", action: "Continue" },
          { severity: "P3", insight: "MQLs down 8.1% this week", detail: "HubSpot — traced to the paused audience", action: "Continue" },
        ],
      },
    },
    {
      name: "Unified KPI Cockpit",
      line: "ROAS, CAC, pipeline and funnel — one reconciled source of truth.",
      mock: {
        url: "app.seekalfred.ai/cockpit",
        kpis: [
          { label: "Pipeline (Q3)", value: "$1.84M", delta: "on 62% elapsed", tone: "neutral" },
          { label: "CAC (blended)", value: "$142", delta: "+$18 WoW", tone: "bad" },
          { label: "MQLs this week", value: "312", delta: "-8.1%", tone: "bad" },
        ],
        actions: [
          { severity: "P1", insight: "Approve the $18K reallocation to Performance Max", detail: "Converting at 5.1x vs 3.4x on non-brand", action: "Approve" },
          { severity: "P2", insight: "Pipeline at $1.84M of $3.2M with 62% elapsed", detail: "HubSpot — pacing watch", action: "Continue" },
        ],
      },
    },
    {
      name: "Creative Fatigue",
      line: "Catches rising frequency and sliding CTR before performance drops.",
      mock: {
        url: "app.seekalfred.ai/creative",
        kpis: [
          { label: "Spend at risk", value: "$26.3K", delta: "TikTok / mo", tone: "bad" },
          { label: "CTR this week", value: "-12%", delta: "fatigue, not audience", tone: "bad" },
          { label: "Blended ROAS", value: "4.8x", delta: "+12.4% vs 30d", tone: "good" },
        ],
        actions: [
          { severity: "P2", insight: "Hero creative fatiguing — CTR down 12% this week", detail: "TikTok — spark ads", action: "Rotate" },
          { severity: "P3", insight: "Rotate the variant before Friday", detail: "Protects ~$26K/mo of spend from decay", action: "Approve" },
        ],
      },
    },
    {
      name: "Anomaly Detection",
      line: "P1 alerts the moment a metric breaks pattern — traced to a cause.",
      mock: { url: "app.seekalfred.ai/anomalies" },
    },
  ],
}) {
  const [current, setCurrent] = React.useState(active);
  const agent = agents.find((a) => a.name === current) || agents[0];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <ContainerF style={{ padding: "84px 40px", display: "grid", gridTemplateColumns: "0.95fr 1.25fr", gap: 48, alignItems: "start" }}>
        <div>
          <EyebrowBadge tone="brand">Agents</EyebrowBadge>
          <H2F style={{ fontSize: 34, margin: "20px 0 0" }}>{title}</H2F>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 26 }}>
            {agents.map((a) => {
              const isActive = a.name === (agent && agent.name);
              return (
                <button
                  key={a.name}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setCurrent(a.name)}
                  style={{
                    display: "flex", flexDirection: "column", gap: 3, width: "100%", textAlign: "left",
                    padding: "12px 16px", borderRadius: "var(--radius-xl)", cursor: "pointer",
                    background: isActive ? "var(--surface-card)" : "transparent",
                    border: `1px solid ${isActive ? "var(--border-default)" : "transparent"}`,
                    transition: "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span aria-hidden="true" style={{
                      width: 6, height: 6, flex: "none", borderRadius: "var(--radius-circle)",
                      background: isActive ? "var(--orange-500)" : "var(--border-strong)",
                    }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}>{a.name}</span>
                  </span>
                  <span style={{ ...bodySmF, color: isActive ? "var(--text-secondary)" : "var(--text-muted)", paddingLeft: 14 }}>{a.line}</span>
                </button>
              );
            })}
          </div>
          <p style={{ ...bodySmF, fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 18 }}>
            All six run on the same Alfred Core memory — shown here on Northwind Labs, the demo workspace.
          </p>
        </div>
        <DashboardMock {...((agent && agent.mock) || {})} />
      </ContainerF>
    </section>
  );
}

/* ——— F4 · Enterprise band (inline contact-sales, sits under pricing) ——— */
function EnterpriseBand({
  title = "Alfred for Enterprise",
  bullets = [
    "Custom seat and query limits",
    "SSO and a dedicated security review",
    "Dedicated onboarding with a success partner",
  ],
  cta = "talk to sales",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <ContainerF style={{ padding: "0 40px 84px" }}>
        <div style={{
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-3xl)", padding: "32px 40px",
          display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center",
        }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 26, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>{title}</h2>
            <p style={{ ...bodySmF, margin: "6px 0 0" }}>Marketing, sales and finance on one memory — with governance.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", marginTop: 16 }}>
              {bullets.map((b) => (
                <span key={b} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <CheckF size={16} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>{b}</span>
                </span>
              ))}
            </div>
          </div>
          <Button variant="primary" size="lg">{cta}</Button>
        </div>
      </ContainerF>
    </section>
  );
}

/* ——— F5 · Stack diagram (use cases / Alfred Core / your data) ——— */
function StackDiagram({
  title = "One memory between your data and your decisions",
  layers = [
    { id: "use-cases", label: "Use cases", note: "The modules leaders run", items: ["Alfred for Marketing", "Alfred for Sales", "Finance", "Operations", "Founders"] },
    { id: "core", label: "Alfred Core", note: "The compounding memory layer", tone: "periwinkle", items: ["Cross-Function", "Root Cause", "Institutional Knowledge", "Compounding Intelligence"] },
    { id: "data", label: "Your data", note: "The stack you already run", items: ["Google Ads", "Meta", "LinkedIn", "GA4", "HubSpot", "Stripe", "Slack"] },
  ],
}) {
  const peri = (pct) => `color-mix(in srgb, var(--periwinkle-400) ${pct}%, transparent)`;
  const ArrowUp = ({ color }) => (
    <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", padding: "4px 0", color }}>
      <svg width="20" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="M6 11l6-6 6 6" />
      </svg>
    </div>
  );
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <ContainerF style={{ padding: "84px 40px", maxWidth: 880 }}>
        <EyebrowBadge tone="periwinkle">Architecture</EyebrowBadge>
        <H2F style={{ fontSize: 34, margin: "20px 0 36px" }}>{title}</H2F>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {layers.map((layer, i) => {
            const isPeri = layer.tone === "periwinkle";
            const nextPeri = i < layers.length - 1 && (isPeri || layers[i + 1].tone === "periwinkle");
            return (
              <React.Fragment key={layer.id || layer.label}>
                <div style={{
                  background: isPeri ? peri(7) : "var(--surface-card)",
                  border: `1px solid ${isPeri ? peri(35) : "var(--border-subtle)"}`,
                  borderRadius: "var(--radius-2xl)", padding: "20px 24px",
                  display: "flex", flexDirection: "column", gap: 14,
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ ...capsLabelF, color: isPeri ? "var(--periwinkle-400)" : "var(--text-secondary)" }}>{layer.label}</span>
                    {layer.note && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{layer.note}</span>}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(layer.items || []).map((item) => (
                      <span key={item} style={{
                        padding: "6px 14px", borderRadius: "var(--radius-pill)",
                        border: `1px solid ${isPeri ? peri(30) : "var(--border-subtle)"}`,
                        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", whiteSpace: "nowrap",
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
                {i < layers.length - 1 && <ArrowUp color={nextPeri ? "var(--periwinkle-400)" : "var(--text-muted)"} />}
              </React.Fragment>
            );
          })}
        </div>
        <p style={{ ...bodySmF, fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 18 }}>
          Signals flow up; every recommendation traces back down to its source.
        </p>
      </ContainerF>
    </section>
  );
}

/* ——— F6 · Timeline (Week 1 → Month 1 → Month 3) ——— */
function Timeline({
  title = "What the first 90 days look like",
  milestones = [
    { marker: "Week 1", title: "Connected", line: "Your stack plugs in read-only, and the first daily brief lands the same week." },
    { marker: "Month 1", title: "First compounding insights", line: "Alfred Core has enough memory to trace changes to their causes — briefings stop starting from zero." },
    { marker: "Month 3", title: "Alfred knows your org", line: "Owners, targets, seasonality and past calls — recommendations arrive shaped to how you actually run." },
  ],
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <ContainerF style={{ padding: "84px 40px" }}>
        <EyebrowF>Getting started</EyebrowF>
        <H2F style={{ marginBottom: 44 }}>{title}</H2F>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${milestones.length}, 1fr)` }}>
          {milestones.map((m, i) => (
            <div key={m.marker}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span aria-hidden="true" style={{
                  width: 12, height: 12, flex: "none", borderRadius: "var(--radius-circle)",
                  background: "var(--orange-500)", boxShadow: "0 0 0 5px var(--accent-soft)",
                }} />
                {i < milestones.length - 1 && (
                  <span aria-hidden="true" style={{ flex: 1, height: 2, background: "var(--border-default)", margin: "0 14px" }} />
                )}
              </div>
              <div style={{ paddingRight: i < milestones.length - 1 ? 36 : 0 }}>
                <div style={{ ...capsLabelF, marginTop: 20 }}>{m.marker}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 22, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: "8px 0 0" }}>{m.title}</div>
                <p style={{ ...bodySmF, marginTop: 8, maxWidth: 300 }}>{m.line}</p>
              </div>
            </div>
          ))}
        </div>
      </ContainerF>
    </section>
  );
}

/* ——— F7 · Sourced stats (renders ONLY stats that carry a citation) ——— */
function SourcedStats({
  stats = [
    { value: 73, suffix: "%", label: "of marketing data goes unused", source: "NIQ" },
    { value: 53, suffix: "%", label: "of marketing decisions are influenced by analytics", source: "Gartner" },
    { value: 23, suffix: "x", label: "more likely to acquire customers when data-driven", source: "McKinsey" },
  ],
}) {
  const sourced = (stats || []).filter((s) => s && s.source);
  if (!sourced.length) return null;
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <ContainerF style={{ padding: "64px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${sourced.length}, 1fr)` }}>
          {sourced.map((s, i) => (
            <div key={s.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              textAlign: "center", padding: "0 28px",
              borderLeft: i > 0 ? "1px solid var(--border-subtle)" : "none",
            }}>
              <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              <p style={{ ...bodySmF, maxWidth: 240 }}>{s.label}</p>
              <cite style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                Source: {s.source}
              </cite>
            </div>
          ))}
        </div>
      </ContainerF>
    </section>
  );
}

window.SecContactSplit = ContactSplit;
window.SecIndustryCards = IndustryCards;
window.SecAgentShowcase = AgentShowcase;
window.SecEnterpriseBand = EnterpriseBand;
window.SecStackDiagram = StackDiagram;
window.SecTimeline = Timeline;
window.SecSourcedStats = SourcedStats;
