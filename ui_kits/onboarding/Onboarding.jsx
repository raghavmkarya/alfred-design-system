/* ============================================================
   Alfred — Onboarding kit (standalone, light theme).
   The first-run flow: Connect your stack → Calibrate → First brief.
   Mirrors the product's four-stage operating model
   (Connect · Analyze · Recommend · Execute) and the "under a week to
   first insight" promise. Two-pane: brand rail + stepped content.
   Self-contained so scripts/verify-render.mjs renders it prop-less.
   ============================================================ */
const { Logo, Stepper, Card, Button, Badge, Banner, Select, Switch, Slider, Icon } =
  window.AlfredAIDesignSystem_1ce241;
const LOGO = "../../assets/logos";
const ICN = "../../assets/icons";

const STAGES = [
  ["Connect", "Read-only API links to your existing stack — zero engineering."],
  ["Analyze", "I correlate every signal across channels, 24/7."],
  ["Recommend", "Decision-ready intelligence, prioritised in plain language."],
  ["Execute", "Approve and I act inside your tools — every change logged."],
];

const SOURCES = [
  ["Google Ads", "Campaigns · spend · ROAS", "var(--orange-500)", true],
  ["Meta Ads", "Paid social · creative", "var(--periwinkle-500)", true],
  ["HubSpot", "CRM · pipeline · MQLs", "var(--orange-400)", true],
  ["GA4", "Web analytics · attribution", "var(--orange-300)", false],
  ["LinkedIn Ads", "ABM · lead gen", "var(--periwinkle-400)", false],
  ["Salesforce", "Opportunities · revenue", "var(--periwinkle-600)", false],
];

function BrandRail() {
  return (
    <aside style={{
      width: 400, flex: "none", position: "relative", overflow: "hidden",
      background: "var(--ink-900)", color: "#fff", padding: "44px 40px",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--glow-orange)", opacity: 0.55 }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
        <img src={`${LOGO}/alfred-logo-white.svg`} alt="Alfred" style={{ height: 30, alignSelf: "flex-start" }} />
        <h1 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", margin: "40px 0 12px", lineHeight: 1.15 }}>
          Let's set up your workspace, Priya.
        </h1>
        <p style={{ color: "var(--periwinkle-200)", fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)", margin: "0 0 36px" }}>
          A few minutes now, and I'll be reading from your whole stack. Here's how I'll work for you.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {STAGES.map(([t, d], i) => (
            <div key={t} style={{ display: "flex", gap: 14 }}>
              <span style={{
                width: 30, height: 30, flex: "none", borderRadius: "var(--radius-md)",
                background: "rgba(255,255,255,0.14)", color: "#fff", display: "inline-flex",
                alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)",
                fontWeight: "var(--fw-semibold)", fontSize: "var(--text-sm)",
              }}>{i + 1}</span>
              <div>
                <div style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)", marginBottom: 2 }}>{t}</div>
                <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", paddingTop: 28, color: "rgba(255,255,255,0.62)", fontSize: "var(--text-xs)", lineHeight: "var(--lh-normal)" }}>
          First insight in under a week. Full operational readiness in two.
        </div>
      </div>
    </aside>
  );
}

function ConnectStep({ connected, onToggle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h2 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", marginBottom: 6 }}>Connect your marketing stack</h2>
        <p style={{ fontSize: "var(--text-base)", color: "var(--text-muted)", margin: 0 }}>The more you connect, the sharper my memory. Connect at least three to continue.</p>
      </div>
      <Banner tone="info" title="Secure and read-only">
        Every connection is an encrypted, read-only API link. I'll sync up to a year of history at onboarding — and I never write back without your explicit approval.
      </Banner>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {SOURCES.map(([name, desc, color, preset]) => {
          const isOn = connected.includes(name) || preset;
          return (
            <Card key={name} padding={18} shadow="sm" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 42, height: 42, flex: "none", borderRadius: "var(--radius-md)", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="web-stack-connected" root={ICN} size={22} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "var(--fw-bold)", color: "var(--ink-900)", fontSize: "var(--text-base)" }}>{name}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{desc}</div>
              </div>
              {isOn
                ? <Badge tone="success" dot>Connected</Badge>
                : <Button variant="outline" size="sm" onClick={() => onToggle(name)}>Connect</Button>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CalibrateStep({ values, set }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h2 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", marginBottom: 6 }}>Calibrate what matters to you</h2>
        <p style={{ fontSize: "var(--text-base)", color: "var(--text-muted)", margin: 0 }}>This tunes your briefing and the threshold at which I raise a decision alert.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Select label="Primary objective" value={values.objective} onChange={(e) => set("objective", e.target.value)}
          options={[{ value: "pipeline", label: "Pipeline growth" }, { value: "cac", label: "Efficient CAC" }, { value: "revenue", label: "Revenue contribution" }]} />
        <Select label="Reporting currency" value={values.currency} onChange={(e) => set("currency", e.target.value)}
          options={[{ value: "usd", label: "USD ($)" }, { value: "eur", label: "EUR (€)" }, { value: "gbp", label: "GBP (£)" }]} />
      </div>
      <Card padding={22} shadow="sm" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Slider label="Alert me when ROAS drops by at least" value={values.roasDrop} onChange={(v) => set("roasDrop", v)} min={5} max={30} step={1} />
        <Slider label="Budget pacing tolerance" value={values.pacing} onChange={(v) => set("pacing", v)} min={2} max={20} step={1} />
      </Card>
      <Card padding={6} shadow="sm">
        {[["briefing", "Daily briefing at 8:00 AM", "Your plain-language morning narrative, every weekday."],
          ["alerts", "Real-time decision alerts", "The moment something needs a call — not at the next board meeting."]].map(([k, t, d], i) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "var(--fw-bold)", color: "var(--ink-900)", fontSize: "var(--text-base)" }}>{t}</div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{d}</div>
            </div>
            <Switch checked={values[k]} onChange={(v) => set(k, v)} />
          </div>
        ))}
      </Card>
    </div>
  );
}

function ReadyStep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18, paddingTop: 12 }}>
      <div style={{ width: 84, height: 84, borderRadius: "var(--radius-2xl)", background: "var(--gradient-brand)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-brand)" }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5" /></svg>
      </div>
      <div>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", marginBottom: 8 }}>You're all set, Priya.</h2>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", margin: 0, maxWidth: 460 }}>
          I've reconciled 6 sources and 11 months of history. Your first briefing is ready.
        </p>
      </div>
      <Card tone="ink" radius="var(--radius-2xl)" padding={22} style={{ position: "relative", overflow: "hidden", width: "100%", maxWidth: 520, textAlign: "left" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--glow-orange)", opacity: 0.5 }} />
        <div style={{ position: "relative" }}>
          <Badge tone="brand" dot>Tomorrow · 8:00 AM</Badge>
          <p style={{ color: "var(--periwinkle-200)", fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)", margin: "12px 0 0" }}>
            "Good morning, Priya. Here's what changed overnight, why it changed, and the two decisions I need from you today."
          </p>
        </div>
      </Card>
    </div>
  );
}

function OnboardingFlow() {
  const [step, setStep] = React.useState(0);
  const [connected, setConnected] = React.useState([]);
  const [values, setValues] = React.useState({
    objective: "pipeline", currency: "usd", roasDrop: 10, pacing: 8, briefing: true, alerts: true,
  });
  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const toggle = (n) => setConnected((c) => (c.includes(n) ? c : [...c, n]));

  const steps = [{ label: "Connect" }, { label: "Calibrate" }, { label: "First brief" }];
  const last = step === steps.length - 1;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", background: "var(--bg-canvas)", fontFamily: "var(--font-sans)" }}>
      <BrandRail />
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflow: "auto", display: "flex", justifyContent: "center", padding: "44px 40px" }}>
          <div style={{ width: "100%", maxWidth: 720, display: "flex", flexDirection: "column", gap: 30 }}>
            <Stepper steps={steps} current={step} />
            {step === 0 && <ConnectStep connected={connected} onToggle={toggle} />}
            {step === 1 && <CalibrateStep values={values} set={set} />}
            {step === 2 && <ReadyStep />}
          </div>
        </div>
        <footer style={{ flex: "none", borderTop: "1px solid var(--border-subtle)", background: "#fff", padding: "18px 40px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Step {step + 1} of {steps.length}</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            {step > 0 && !last && <Button variant="ghost" size="md" onClick={() => setStep((s) => s - 1)}>Back</Button>}
            {!last
              ? <Button variant="primary" size="md" onClick={() => setStep((s) => s + 1)}>Continue</Button>
              : <Button variant="primary" size="md" onClick={() => { if (typeof window !== "undefined") window.location.href = "../app/index.html"; }}>Enter workspace</Button>}
          </div>
        </footer>
      </main>
    </div>
  );
}

window.OnboardingFlow = OnboardingFlow;
