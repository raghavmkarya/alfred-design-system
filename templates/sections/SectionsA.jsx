/* ============================================================
   Alfred — reusable marketing SECTION templates (part A).
   Dark theme, composed from the design-system primitives. Each
   function is a self-contained <section> you can lift into any page.
   Logo cloud · Bento grid · Feature split · Comparison.
   ============================================================ */
const { Badge, Button, Icon, SignalCard, Card } = window.AlfredAIDesignSystem_1ce241;
const SIR = "../../assets/icons";

const SecContainer = ({ children, style }) => (
  <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px", ...style }}>{children}</div>
);
const SecEyebrow = ({ children, style }) => (
  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
    letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--orange-400)", ...style }}>{children}</span>
);
const SecH2 = ({ children, style }) => (
  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 40,
    letterSpacing: "-0.02em", color: "#fff", margin: "14px 0 0", ...style }}>{children}</h2>
);
const Check = ({ color = "var(--orange-400)", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5" /></svg>
);

/* ——— 1 · Logo cloud ——— */
function LogoCloud() {
  const names = ["Northwind", "Vantage", "Helio", "Brightside", "Cobalt", "Meridian", "Lumen", "Forge"];
  return (
    <section style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <SecContainer style={{ padding: "56px 40px", textAlign: "center" }}>
        <SecEyebrow>Trusted by the leaders who decide things</SecEyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "28px 56px", marginTop: 28 }}>
          {names.map((n) => (
            <span key={n} style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 26,
              letterSpacing: "-0.02em", color: "rgba(255,255,255,0.46)" }}>{n}</span>
          ))}
        </div>
      </SecContainer>
    </section>
  );
}

/* ——— 2 · Bento capability grid ——— */
function BentoGrid() {
  const cellBase = { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 26, background: "var(--surface-card)", position: "relative", overflow: "hidden" };
  const title = (t) => <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 22, color: "#fff", margin: "14px 0 8px", letterSpacing: "-0.01em" }}>{t}</div>;
  const body = (t) => <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0 }}>{t}</p>;
  const glyph = (name, color = "var(--orange-400)") => (
    <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={name} root={SIR} size={20} color={color} />
    </div>
  );
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <SecContainer style={{ padding: "84px 40px" }}>
        <SecEyebrow>One intelligence layer</SecEyebrow>
        <SecH2 style={{ marginBottom: 36 }}>Everything a chief of staff would do, running continuously</SecH2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(180px, auto)", gap: 16 }}>
          <div style={{ ...cellBase, gridColumn: "span 2", background: "var(--gradient-brand-reverse)", border: "none" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 110% at 100% 0%, rgba(255,255,255,0.20), rgba(255,255,255,0))" }} />
            <div style={{ position: "relative" }}>
              <Badge tone="neutral" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>Daily briefing</Badge>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 28, color: "#fff", margin: "16px 0 8px", letterSpacing: "-0.02em", maxWidth: 440 }}>
                Read less, know more — every morning at 8:00.
              </div>
              {body("One synthesised view of what changed overnight, why it matters, and the one thing to act on first.")}
            </div>
          </div>
          <div style={cellBase}>{glyph("alert-warning")}{title("Decision alerts")}{body("Caught early, traced to a root cause, routed to the right owner.")}</div>
          <div style={cellBase}>{glyph("channel-mix", "var(--periwinkle-400)")}{title("Spend intelligence")}{body("Where every dollar is working — and where it's drifting.")}</div>
          <div style={{ ...cellBase, gridColumn: "span 2" }}>
            {glyph("mql")}{title("Unified KPI cockpit")}
            {body("ROAS, CAC, pipeline and funnel — one source of truth across marketing, sales and finance, reconciled automatically.")}
          </div>
        </div>
      </SecContainer>
    </section>
  );
}

/* ——— 3 · Feature split (alternating) ——— */
function FeatureSplit() {
  const Mock = ({ children }) => (
    <Card tone="surface" padding={20} shadow="lg" style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</Card>
  );
  const Row = ({ flip, eyebrow, heading, copy, bullets, mock }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
      <div style={{ order: flip ? 2 : 1 }}>
        <SecEyebrow>{eyebrow}</SecEyebrow>
        <SecH2 style={{ fontSize: 34 }}>{heading}</SecH2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: "16px 0 0", maxWidth: 460 }}>{copy}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
          {bullets.map((b) => (
            <div key={b} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ marginTop: 1 }}><Check /></span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ order: flip ? 1 : 2 }}>{mock}</div>
    </div>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <SecContainer style={{ padding: "84px 40px", display: "flex", flexDirection: "column", gap: 72 }}>
        <Row
          eyebrow="Root cause intelligence"
          heading="Not just what changed — why."
          copy="Alfred traces every signal back to its source across your connected systems, so you act on the cause, not the symptom."
          bullets={["Correlates spend, creative and pipeline shifts", "Explains the move in plain language", "Names the owner who can fix it"]}
          mock={(
            <Mock>
              <SignalCard tone="signal" label="Signal detected" statement="Lead quality down 14% this week" trace="Traced to a new paid social campaign" />
              <SignalCard tone="action" label="Aligned action" statement="Pause the new audience. Shift spend to search." trace="Owners notified — no meeting needed" />
            </Mock>
          )}
        />
        <Row
          flip
          eyebrow="Compounding memory"
          heading="It gets sharper the longer it runs."
          copy="Alfred Core remembers every decision and its outcome, so each briefing starts from everything your team has already learned."
          bullets={["Institutional knowledge that never leaves", "No briefing starts from zero", "Private to you — never trains shared models"]}
          mock={(
            <Mock>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Decisions remembered</span>
                <Badge tone="info">Alfred Core</Badge>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: 56, lineHeight: 1, background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>1,284</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", margin: 0 }}>Signals, decisions and outcomes captured across 6 connected sources this quarter.</p>
            </Mock>
          )}
        />
      </SecContainer>
    </section>
  );
}

/* ——— 4 · Comparison ——— */
function Comparison() {
  const rows = [
    ["Tells you what changed", true, true],
    ["Explains why it changed", false, true],
    ["Recommends the next action", false, true],
    ["Notifies the right owner", false, true],
    ["Remembers the outcome", false, true],
    ["Acts on command", false, true],
  ];
  const Col = ({ head, accent, children }) => (
    <div style={{ background: accent ? "var(--surface-card)" : "var(--surface-sunken)", border: `1px solid ${accent ? "var(--border-default)" : "var(--border-subtle)"}`, borderRadius: "var(--radius-2xl)", padding: 28, ...(accent ? { boxShadow: "var(--shadow-lg)" } : {}) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 22, color: accent ? "#fff" : "var(--text-secondary)" }}>{head}</span>
        {accent && <Badge tone="brand">Alfred</Badge>}
      </div>
      {children}
    </div>
  );
  const Line = ({ label, on }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: "1px solid var(--border-subtle)" }}>
      {on ? <Check /> : <Icon name="pricing-cross" root={SIR} size={18} color="var(--text-muted)" />}
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: on ? "var(--text-primary)" : "var(--text-muted)" }}>{label}</span>
    </div>
  );
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <SecContainer style={{ padding: "84px 40px" }}>
        <div style={{ textAlign: "center" }}>
          <SecEyebrow>Why Alfred</SecEyebrow>
          <SecH2 style={{ marginBottom: 40 }}>Dashboards show. Alfred decides.</SecH2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 820, margin: "0 auto" }}>
          <Col head="A dashboard">{rows.map(([l, d]) => <Line key={l} label={l} on={d} />)}</Col>
          <Col head="Alfred" accent>{rows.map(([l, , a]) => <Line key={l} label={l} on={a} />)}</Col>
        </div>
      </SecContainer>
    </section>
  );
}

window.SecLogoCloud = LogoCloud;
window.SecBentoGrid = BentoGrid;
window.SecFeatureSplit = FeatureSplit;
window.SecComparison = Comparison;
window.SecContainer = SecContainer;
window.SecEyebrow = SecEyebrow;
window.SecH2 = SecH2;
window.SecCheck = Check;
