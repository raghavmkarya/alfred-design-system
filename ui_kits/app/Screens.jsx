/* ============================================================
   Alfred workspace — secondary screens for the expansive app kit.
   KPI Cockpit · Spend & ROI · Decision Alerts · Integrations · Settings.
   Light theme. Composed from the design-system primitives, matching
   the Dashboard's language (soft cards, gradient accents, first-person voice).
   ============================================================ */
const { Card, KpiCard, DecisionAlert, ProgressBar, Badge, Button, IconButton, Icon, Avatar, Tabs, Switch, Checkbox, Input } =
  window.AlfredAIDesignSystem_1ce241;
const ICN = "../../assets/icons";

/* ——— shared bits ——— */
const SectionHead = ({ title, right, sub }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
    <div>
      <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-tight)" }}>{title}</h3>
      {sub && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
    {right && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>{right}</div>}
  </div>
);

/* A tiny on-brand area sparkline (periwinkle→orange fill). */
function Sparkline({ points, w = 640, h = 180, id = "spark" }) {
  const max = Math.max(...points), min = Math.min(...points);
  const nx = (i) => (i / (points.length - 1)) * w;
  const ny = (v) => h - ((v - min) / (max - min || 1)) * (h - 24) - 12;
  const line = points.map((v, i) => `${i === 0 ? "M" : "L"} ${nx(i).toFixed(1)} ${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A7A7FC" /><stop offset="100%" stopColor="#FF8431" />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,132,49,0.20)" /><stop offset="100%" stopColor="rgba(255,132,49,0)" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id}-f)`} />
      <path d={line} fill="none" stroke={`url(#${id}-l)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ======================= KPI COCKPIT ======================= */
function KpiCockpit() {
  const [metric, setMetric] = React.useState("roas");
  const series = {
    roas: [3.1, 3.4, 3.2, 3.8, 4.0, 3.7, 4.2, 4.5, 4.3, 4.8],
    cac:  [240, 232, 236, 220, 210, 214, 200, 192, 196, 184],
    pipe: [120, 140, 132, 168, 180, 176, 205, 230, 224, 268],
  };
  const funnel = [["Visitors", 100, "var(--periwinkle-400)"], ["MQL", 64, "var(--periwinkle-500)"], ["SQL", 34, "var(--orange-300)"], ["Opportunity", 19, "var(--orange-400)"], ["Won", 8, "var(--orange-500)"]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KpiCard label="Blended ROAS" value="4.8x" delta="+12.4%" direction="up" caption="vs last 30d" icon="trend-up" iconRoot={ICN} />
        <KpiCard label="Marketing Spend" value="$312K" delta="+6.1%" direction="up" caption="pacing hot" icon="budget" iconRoot={ICN} />
        <KpiCard label="Blended CAC" value="$184" delta="-8.0%" direction="down" caption="improving" icon="channel-mix" iconRoot={ICN} />
        <KpiCard label="MQL → SQL" value="34%" delta="0.0%" direction="flat" caption="flat WoW" icon="mql" iconRoot={ICN} />
        <KpiCard label="Pipeline created" value="$2.68M" delta="+19.5%" direction="up" caption="this quarter" icon="trend-up" iconRoot={ICN} />
        <KpiCard label="LTV : CAC" value="4.1:1" delta="+0.3" direction="up" caption="healthy" icon="trend-up" iconRoot={ICN} />
        <KpiCard label="Avg. CPL" value="$58" delta="-14.0%" direction="down" caption="LinkedIn ABM" icon="trend-down" iconRoot={ICN} />
        <KpiCard label="Win rate" value="22%" delta="+1.8%" direction="up" caption="vs last Q" icon="trend-up" iconRoot={ICN} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 22, alignItems: "start" }}>
        <Card padding={24} shadow="sm">
          <SectionHead title="Performance trend" sub="Last 10 weeks"
            right={<Tabs value={metric} onChange={setMetric} tabs={[{ id: "roas", label: "ROAS" }, { id: "cac", label: "CAC" }, { id: "pipe", label: "Pipeline" }]} />} />
          <Sparkline points={series[metric]} id={metric} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"].map((w) => <span key={w}>{w}</span>)}
          </div>
        </Card>

        <Card padding={24} shadow="sm">
          <SectionHead title="Funnel conversion" sub="This quarter" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {funnel.map(([n, p, c]) => (
              <div key={n}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "var(--text-sm)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{n}</span>
                  <span style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{p}%</span>
                </div>
                <div style={{ height: 10, background: "var(--gray-100)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
                  <div style={{ width: `${p}%`, height: "100%", background: c, borderRadius: "var(--radius-pill)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ======================= SPEND & ROI ======================= */
function SpendRoi() {
  const channels = [["Paid social", 38, "var(--orange-500)"], ["Search", 26, "var(--periwinkle-400)"], ["Email", 18, "var(--orange-300)"], ["Organic", 12, "var(--periwinkle-600)"], ["Events", 6, "var(--slate-300)"]];
  const rows = [
    ["Performance Max — Q2", "$84.2K", "5.1x", "$142", "high"],
    ["Meta — Retargeting", "$61.0K", "4.6x", "$168", "high"],
    ["LinkedIn — ABM tier 1", "$48.5K", "3.9x", "$210", "med"],
    ["Brand search", "$39.1K", "6.8x", "$96", "high"],
    ["YouTube — Awareness", "$27.4K", "2.1x", "$320", "low"],
  ];
  const statusTone = { high: "success", med: "warning", low: "danger" };
  const statusText = { high: "Scaling", med: "Holding", low: "At risk" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <KpiCard label="Spend this month" value="$312K" delta="+6.1%" direction="up" caption="of $295K plan" icon="budget" iconRoot={ICN} />
        <KpiCard label="Blended ROAS" value="4.8x" delta="+12.4%" direction="up" caption="above 4.0x target" icon="trend-up" iconRoot={ICN} />
        <KpiCard label="Wasted spend" value="$11.4K" delta="-31%" direction="down" caption="Alfred reclaimed" icon="trend-down" iconRoot={ICN} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" }}>
        <Card padding={24} shadow="sm">
          <SectionHead title="Budget pacing" sub="17 days into the cycle" right={<Badge tone="warning" dot>6% hot</Badge>} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[["Total budget", 62, "gradient"], ["Search", 71, "plain"], ["Paid social", 58, "plain"]].map(([n, v, tone]) => (
              <div key={n}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontSize: "var(--text-sm)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{n}</span>
                  <span style={{ fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums" }}>{v}%</span>
                </div>
                <ProgressBar value={v} tone={tone} height={9} />
              </div>
            ))}
          </div>
        </Card>

        <Card padding={24} shadow="sm">
          <SectionHead title="Channel mix" sub="Share of spend" right={<IconButton name="export" iconRoot={ICN} variant="ghost" title="Export" />} />
          {channels.map(([n, p, c]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 13 }}>
              <span style={{ width: 84, fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{n}</span>
              <div style={{ flex: 1, height: 8, background: "var(--gray-100)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
                <div style={{ width: `${p}%`, height: "100%", background: c, borderRadius: "var(--radius-pill)" }} />
              </div>
              <span style={{ width: 34, textAlign: "right", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums" }}>{p}%</span>
            </div>
          ))}
        </Card>
      </div>

      <Card padding={0} shadow="sm" style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 0" }}><SectionHead title="Campaigns" sub="Ranked by spend" right={<Button variant="subtle" size="sm" iconLeft={<Icon name="sort" root={ICN} size={15} />}>Sort</Button>} /></div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "var(--text-muted)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--ls-caps)" }}>
              {["Campaign", "Spend", "ROAS", "CAC", "Status"].map((h, i) => (
                <th key={h} style={{ padding: "12px 24px", fontWeight: "var(--fw-bold)", textAlign: i > 0 && i < 4 ? "right" : "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, spend, roas, cac, st], i) => (
              <tr key={name} style={{ borderTop: "1px solid var(--border-subtle)", fontSize: "var(--text-sm)" }}>
                <td style={{ padding: "15px 24px", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{name}</td>
                <td style={{ padding: "15px 24px", textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text-body)" }}>{spend}</td>
                <td style={{ padding: "15px 24px", textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{roas}</td>
                <td style={{ padding: "15px 24px", textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text-body)" }}>{cac}</td>
                <td style={{ padding: "15px 24px" }}><Badge tone={statusTone[st]} dot>{statusText[st]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ======================= DECISION ALERTS ======================= */
function AlertsInbox() {
  const [filter, setFilter] = React.useState("all");
  const all = [
    { priority: "high", time: "12m ago", title: "Google Ads over budget", insight: "Brand campaign will exhaust its monthly cap in 4 days at current pacing. Shift $18K to Performance Max to protect non-brand coverage.", action: "Reallocate budget", tag: "high" },
    { priority: "opportunity", time: "1h ago", title: "LinkedIn CPL down 22%", insight: "Cost-per-lead dropped sharply on the new ABM audience. I recommend scaling spend +30% while efficiency holds.", action: "Scale campaign", tag: "opportunity" },
    { priority: "medium", time: "3h ago", title: "Creative fatigue detected", insight: "Three Meta creatives crossed the frequency-3.0 threshold; CTR is down 14% over 7 days. Queue refreshes from the creative library.", action: "Queue refreshes", tag: "high" },
    { priority: "opportunity", time: "5h ago", title: "Search impression share rising", insight: "Non-brand impression share climbed to 71%. There is room to capture an estimated +$22K pipeline by lifting the Search cap 15%.", action: "Raise cap", tag: "opportunity" },
    { priority: "low", time: "Yesterday", title: "Email engagement steady", insight: "Open rate held at 41% after the subject-line test. No action needed — I'll keep watching the next send.", tag: "resolved" },
  ];
  const shown = filter === "all" ? all : all.filter((a) => a.tag === filter);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start", maxWidth: 1180 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Tabs value={filter} onChange={setFilter} tabs={[{ id: "all", label: "All" }, { id: "high", label: "Needs action" }, { id: "opportunity", label: "Opportunities" }, { id: "resolved", label: "Resolved" }]} />
        {shown.map((a) => (
          <DecisionAlert key={a.title} priority={a.priority} time={a.time} title={a.title} insight={a.insight} action={a.action} iconRoot={ICN} />
        ))}
      </div>

      <Card tone="ink" padding={24} radius="var(--radius-2xl)" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--glow-orange)", opacity: 0.5 }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <img src="../../assets/logos/alfred-icon-white.svg" alt="" style={{ height: 24 }} />
            <span style={{ color: "#fff", fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)" }}>Alfred's read on today</span>
          </div>
          <p style={{ color: "var(--periwinkle-200)", fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)", margin: "0 0 18px" }}>
            Two items need a decision and both are upside. Reallocating Google Ads spend protects non-brand coverage; scaling LinkedIn while CPL is low is worth an estimated <strong style={{ color: "#fff" }}>+$48K in pipeline</strong>. I've drafted both — approve and I'll execute.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Needs action", "2"], ["Opportunities", "2"], ["Resolved this week", "9"]].map(([l, n]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                <span style={{ color: "rgba(255,255,255,0.74)", fontSize: "var(--text-sm)" }}>{l}</span>
                <span style={{ color: "#fff", fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums" }}>{n}</span>
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" fullWidth style={{ marginTop: 18 }}>Approve all drafts</Button>
        </div>
      </Card>
    </div>
  );
}

/* ======================= INTEGRATIONS ======================= */
function Integrations() {
  const connected = [
    ["Google Ads", "Campaigns · spend · ROAS", "var(--orange-500)"],
    ["Meta Ads", "Paid social · creative", "var(--periwinkle-500)"],
    ["HubSpot", "CRM · pipeline · MQLs", "var(--orange-400)"],
    ["LinkedIn Ads", "ABM · lead gen", "var(--periwinkle-400)"],
    ["GA4", "Web analytics · attribution", "var(--orange-300)"],
    ["Salesforce", "Opportunities · revenue", "var(--periwinkle-600)"],
  ];
  const available = [["Looker", "BI dashboards"], ["Slack", "Alerts & briefings"], ["Snowflake", "Warehouse sync"], ["Stripe", "Revenue & billing"]];
  const Tile = ({ children, style }) => (
    <Card padding={20} shadow="sm" interactive style={{ display: "flex", alignItems: "center", gap: 14, ...style }}>{children}</Card>
  );
  const Glyph = ({ color }) => (
    <div style={{ width: 42, height: 42, borderRadius: "var(--radius-md)", flex: "none", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name="web-stack-connected" root={ICN} size={22} color="#fff" />
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 1180 }}>
      <Card tone="gradient" padding={24} style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Icon name="integration-success" root={ICN} size={30} color="#fff" />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: "var(--fw-bold)", fontSize: "var(--text-h4)" }}>6 sources connected</div>
          <div style={{ color: "rgba(255,255,255,0.92)", fontSize: "var(--text-sm)" }}>Alfred Core is reading from your full marketing stack. The more you connect, the sharper the memory.</div>
        </div>
        <Button variant="secondary" size="sm" style={{ background: "#fff", color: "var(--ink-900)" }}>Add a source</Button>
      </Card>

      <div>
        <SectionHead title="Connected" sub="Syncing now" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {connected.map(([name, desc, c]) => (
            <Tile key={name}>
              <Glyph color={c} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontSize: "var(--text-base)" }}>{name}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{desc}</div>
              </div>
              <Badge tone="success" dot>Live</Badge>
            </Tile>
          ))}
        </div>
      </div>

      <div>
        <SectionHead title="Available" sub="One click to connect" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {available.map(([name, desc]) => (
            <Tile key={name}>
              <div style={{ width: 42, height: 42, borderRadius: "var(--radius-md)", flex: "none", background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="web-clarity" root={ICN} size={22} color="var(--text-muted)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontSize: "var(--text-base)" }}>{name}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{desc}</div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </Tile>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ======================= SETTINGS ======================= */
function Settings() {
  const [pane, setPane] = React.useState("profile");
  const [name, setName] = React.useState("Priya Menon");
  const [email, setEmail] = React.useState("priya@northwind.co");
  const [brief, setBrief] = React.useState(true);
  const [alerts, setAlerts] = React.useState(true);
  const [digest, setDigest] = React.useState(false);
  const panes = [["profile", "Profile"], ["workspace", "Workspace"], ["notifications", "Notifications"], ["security", "Security"]];
  const NavRow = ([id, label]) => (
    <button key={id} onClick={() => setPane(id)} style={{
      textAlign: "left", border: "none", cursor: "pointer", padding: "10px 14px", borderRadius: "var(--radius-md)",
      background: pane === id ? "var(--orange-50)" : "transparent", color: pane === id ? "var(--orange-600)" : "var(--text-secondary)",
      fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: pane === id ? "var(--fw-bold)" : "var(--fw-medium)",
    }}>{label}</button>
  );
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 28, maxWidth: 1000, alignItems: "start" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: 0 }}>{panes.map(NavRow)}</nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {pane === "profile" && (
          <Card padding={28} shadow="sm">
            <SectionHead title="Profile" sub="How you appear across the workspace" />
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
              <Avatar name={name} size={64} />
              <Button variant="outline" size="sm">Change photo</Button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} fill="plain" />
              <Input label="Work email" value={email} onChange={(e) => setEmail(e.target.value)} fill="plain" />
              <Input label="Role" value="CMO" fill="plain" readOnly />
              <Input label="Team" value="Northwind Co." fill="plain" readOnly />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <Button variant="primary" size="sm">Save changes</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </div>
          </Card>
        )}

        {pane === "workspace" && (
          <Card padding={28} shadow="sm">
            <SectionHead title="Workspace" sub="Northwind Co. · 14 members" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Input label="Workspace name" value="Northwind Co." fill="plain" readOnly />
              <Input label="Industry" value="B2B SaaS" fill="plain" readOnly />
            </div>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Reporting currency", "USD ($)"], ["Fiscal year start", "January"], ["Default attribution", "Data-driven"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{l}</span>
                  <Badge tone="neutral">{v}</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {pane === "notifications" && (
          <Card padding={28} shadow="sm">
            <SectionHead title="Notifications" sub="What Alfred tells you, and when" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[["Daily briefing", "Your 8:00 AM summary, every weekday", brief, setBrief], ["Real-time decision alerts", "The moment something needs a call", alerts, setAlerts], ["Weekly digest", "A Monday recap of the week's outcomes", digest, setDigest]].map(([t, d, val, set]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontSize: "var(--text-base)" }}>{t}</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{d}</div>
                  </div>
                  <Switch checked={val} onChange={set} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {pane === "security" && (
          <Card padding={28} shadow="sm">
            <SectionHead title="Security" sub="Your data is yours, full stop" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Two-factor authentication", "Active via authenticator app", "success", "Manage"], ["Data isolation", "Logically isolated Alfred environment", "info", "View"], ["No cross-customer training", "Your data never trains shared models", "info", "Learn more"]].map(([t, d, tone, cta]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                    <Icon name="security-lock" root={ICN} size={18} color="var(--orange-500)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontSize: "var(--text-base)" }}>{t}</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{d}</div>
                  </div>
                  <Button variant="subtle" size="sm">{cta}</Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

window.KpiCockpit = KpiCockpit;
window.SpendRoi = SpendRoi;
window.AlertsInbox = AlertsInbox;
window.Integrations = Integrations;
window.SettingsScreen = Settings;
