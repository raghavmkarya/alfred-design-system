const { Logo, Button, Badge, Tabs, SignalCard, AgentStatus, Card } = window.AlfredAIDesignSystem_1ce241;
const LOGOROOT = "../../assets/logos";

const Container = ({ children, style }) => (
  <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px", ...style }}>{children}</div>
);
const Eyebrow = ({ children, style }) => (
  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
    letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--orange-400)", ...style }}>{children}</span>
);

/* ——— Top nav ——— */
const NavCaret = () => (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const NAV_ITEMS = [
  { label: "Products", dropdown: true },
  { label: "Resources", dropdown: true },
  { label: "Alfred Core" },
  { label: "Pricing" },
  { label: "Integrations" },
  { label: "Company", dropdown: true },
];
function SiteNav() {
  const link = { fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-secondary)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 };
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--border-subtle)" }}>
      <Container style={{ height: 72, display: "flex", alignItems: "center", gap: 28 }}>
        <Logo height={26} tone="white" root={LOGOROOT} />
        <div style={{ display: "flex", gap: 24, marginLeft: 18 }}>
          {NAV_ITEMS.map((it) => (
            <span key={it.label} style={link}>{it.label}{it.dropdown ? <NavCaret /> : null}</span>
          ))}
        </div>
        <div style={{ marginLeft: "auto" }}><Button variant="primary" size="sm">get started</Button></div>
      </Container>
    </div>
  );
}

/* ——— Hero ——— */
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--glow-orange), var(--bg-page)" }}>
      <Container style={{ padding: "92px 40px 88px", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center" }}>
        <div>
          <Eyebrow>Decision intelligence platform</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 60, lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--text-primary)", margin: "18px 0 0" }}>
            The AI memory powering <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>every decision</span> across your organisation
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: "22px 0 0", maxWidth: 520 }}>
            Operate your business as a unified intelligence where signals, decisions and actions are continuously connected.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            <Button variant="primary" size="lg">Talk to sales</Button>
            <Button variant="outline" size="lg" style={{ color: "var(--text-primary)", borderColor: "var(--border-default)" }}>How it works</Button>
          </div>
        </div>
        <AgentStatus query="What is the biggest risk in the business right now?"
          steps={["Analysing campaign spends", "Synthesising root cause", "Isolating performance shifts", "Correlating fatigue patterns"]} />
      </Container>
    </section>
  );
}

/* ——— Alfred Core ——— */
function AlfredCore() {
  const pills = ["Cross-Function Intelligence", "Root Cause Intelligence", "Institutional Knowledge", "Compounding Intelligence"];
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <Container style={{ padding: "84px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <Eyebrow>Alfred Core</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 40, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 16px" }}>
            Alfred Core, the memory behind it all
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", maxWidth: 480 }}>
            Alfred Core captures every signal, decision and outcome across your connected systems — and the context behind them. It learns how your organisation actually works, and serves that memory to every Alfred module, so no briefing ever starts from zero.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
            {pills.map((p) => <Badge key={p} tone="info">{p}</Badge>)}
          </div>
        </div>
        <Card tone="surface" padding={26} shadow="lg" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <SignalCard tone="truth" label="One source of truth" statement="Pipeline is down 12% this quarter." trace="Seen by Marketing, Sales & Finance" />
          <SignalCard tone="signal" label="Signal detected" statement="Lead quality down 14% this week" trace="Traced to a new paid social campaign" />
          <SignalCard tone="action" label="Aligned action" statement="Pause the new audience. Shift spend to search." trace="Owners notified — no meeting needed" />
        </Card>
      </Container>
    </section>
  );
}

/* ——— Products ——— */
function Products() {
  const [tab, setTab] = React.useState("mkt");
  const data = {
    mkt: { name: "Alfred for Marketing", blurb: "Six intelligence agents work across your marketing stack, turning signals from campaigns, channels and performance systems into a clear view of business impact.", agents: ["Daily Brief", "Spend Mix", "AI Visibility", "Unified KPI Cockpit", "Creative Fatigue", "Anomaly Detection"], cta: "Read less, know more" },
    sales: { name: "Alfred for Sales", blurb: "Converts fragmented deal signals into a clear view of performance and next steps with six sales-intelligence agents.", agents: ["Sales Play", "Deal Deviation", "Revenue Signal", "Coaching Intelligence", "Forecast Intelligence", "Daily Brief"], cta: "Catch it at risk, not at loss" },
    next: { name: "Upcoming products", blurb: "The memory compounds as each module activates. Finance, Operations and Founders are next in line.", agents: ["Alfred for Finance", "Alfred for Operations", "Alfred for Founders"], cta: "Be first in line" },
  };
  const d = data[tab];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <Container style={{ padding: "84px 40px" }}>
        <Eyebrow>Products</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 40, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 32px" }}>
          Purpose-built intelligence for every leader
        </h2>
        <Tabs value={tab} onChange={setTab} tabs={[{ id: "mkt", label: "Marketing" }, { id: "sales", label: "Sales" }, { id: "next", label: "Upcoming" }]} style={{ borderColor: "var(--border-subtle)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginTop: 36 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 28, color: "var(--text-primary)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>{d.name}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", maxWidth: 460 }}>{d.blurb}</p>
            <div style={{ marginTop: 24 }}><Button variant="primary">{d.cta}</Button></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {d.agents.map((a) => (
              <div key={a} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "16px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gradient-brand)", flex: "none" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

window.SiteNav = SiteNav;
window.Hero = Hero;
window.AlfredCore = AlfredCore;
window.Products = Products;
window.SiteContainer = Container;
window.SiteEyebrow = Eyebrow;
