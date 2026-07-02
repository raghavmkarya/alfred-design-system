/* ============================================================
   Alfred workspace — product screens (part 3).
   Connection Flow · Connection Health · First-Run Waiting ·
   Notifications Center · Alert Detail.
   Light theme. Composed from the design-system primitives, matching
   Screens.jsx / Screens2.jsx (soft cards, gradient accents, first-person
   voice). Every number is drawn from data/demo-data.json (Northwind Labs).
   Each component is self-contained so scripts/verify-render.mjs can
   server-render it prop-less.
   ============================================================ */
const { Card, Badge, Button, Icon, Banner, Table, ProgressBar, DecisionAlert,
  NotificationItem, NotificationPref, ConnectionHealthCard, DataFreshness,
  ReasoningState, ProvenancePanel, ApprovalGate, InsightFeedback, PageHeader } =
  window.AlfredAIDesignSystem_1ce241;
const ICN = "../../assets/icons";

/* ——— canonical integration catalog (data/demo-data.json → integrations) ——— */
const INTEGRATIONS = [
  { name: "Google Ads", category: "Ad platforms", status: "live" },
  { name: "Meta", category: "Ad platforms", status: "live" },
  { name: "LinkedIn", category: "Ad platforms", status: "live" },
  { name: "TikTok", category: "Ad platforms", status: "live" },
  { name: "GA4", category: "Analytics", status: "live" },
  { name: "Search Console", category: "Analytics", status: "live" },
  { name: "HubSpot", category: "CRM & pipeline", status: "live" },
  { name: "Salesforce", category: "CRM & pipeline", status: "planned" },
  { name: "Shopify", category: "Commerce & billing", status: "planned" },
  { name: "Stripe", category: "Commerce & billing", status: "live" },
  { name: "Klaviyo", category: "Lifecycle", status: "planned" },
  { name: "Mailchimp", category: "Lifecycle", status: "live" },
  { name: "Slack", category: "Delivery", status: "live" },
];
const LIVE_INTEGRATIONS = INTEGRATIONS.filter((i) => i.status === "live");

/* ——— shared bits ——— */
const Sect = ({ title, sub, right }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
    <div>
      <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-tight)" }}>{title}</h3>
      {sub && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
    {right && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>{right}</div>}
  </div>
);

const Eyebrow = ({ children, color = "var(--text-muted)" }) => (
  <div style={{
    fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase", color, marginBottom: 8,
  }}>{children}</div>
);

const CheckGlyph = ({ size = 15, color = "var(--success-500)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SOURCE_COLORS = ["var(--orange-500)", "var(--periwinkle-500)", "var(--orange-400)", "var(--periwinkle-400)", "var(--orange-300)", "var(--periwinkle-600)"];
const SourceGlyph = ({ seed = 0, muted = false, size = 40 }) => (
  <span aria-hidden="true" style={{
    width: size, height: size, borderRadius: "var(--radius-md)", flex: "none",
    background: muted ? "var(--gray-100)" : SOURCE_COLORS[seed % SOURCE_COLORS.length],
    display: "inline-flex", alignItems: "center", justifyContent: "center",
  }}>
    <Icon name={muted ? "web-clarity" : "web-stack-connected"} root={ICN} size={Math.round(size / 2)} color={muted ? "var(--ink-500)" : "#fff"} />
  </span>
);

/* ======================= CONNECTION FLOW ======================= */
function ConnectionFlow() {
  const [selected, setSelected] = React.useState("Google Ads");
  const categories = [];
  INTEGRATIONS.forEach((i) => { if (!categories.includes(i.category)) categories.push(i.category); });

  const scopes = [
    ["Campaigns & ad groups", "So I can see what's running and where"],
    ["Spend & budgets", "So I can catch pacing drift and waste"],
    ["Conversion metrics", "So ROAS and CAC reconcile with GA4"],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Connect your stack"
        subtitle="The more I can read, the sharper your briefs get. Everything is read-only until you approve otherwise."
        actions={<Badge tone="neutral">13 sources in the catalog</Badge>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 22, alignItems: "start" }}>
        {/* Catalog, grouped by category */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {categories.map((cat) => (
            <div key={cat}>
              <Eyebrow>{cat}</Eyebrow>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                {INTEGRATIONS.filter((i) => i.category === cat).map((it, idx) => {
                  const isSelected = it.name === selected;
                  const planned = it.status === "planned";
                  return (
                    <Card key={it.name} padding={16} shadow="sm" interactive={!planned}
                      onClick={() => { if (!planned) setSelected(it.name); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        border: isSelected ? "1.5px solid var(--orange-500)" : "1px solid var(--border-subtle)",
                        opacity: planned ? 0.72 : 1,
                      }}>
                      <SourceGlyph seed={INTEGRATIONS.indexOf(it)} muted={planned} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: "var(--fw-bold)", color: "var(--ink-900)", fontSize: "var(--text-base)" }}>{it.name}</div>
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{it.category}</div>
                      </div>
                      {planned ? <Badge tone="neutral">Coming soon</Badge>
                        : isSelected ? <Badge tone="brand" dot>Selected</Badge>
                        : <Badge tone="success" dot>Available</Badge>}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* OAuth panel + first-sync state */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={24} shadow="sm">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <SourceGlyph seed={0} />
              <div>
                <div style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-h4)", letterSpacing: "var(--ls-tight)" }}>Connect {selected}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>OAuth 2.0 · you can disconnect any time</div>
              </div>
            </div>

            <Eyebrow>What I'll be able to read</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>
              {scopes.map(([scope, why]) => (
                <div key={scope} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{ marginTop: 2 }}><CheckGlyph /></span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--ink-900)" }}>{scope}</div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{why}</div>
                  </div>
                  <Badge tone="neutral">Read</Badge>
                </div>
              ))}
            </div>

            <div style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px",
              background: "var(--accent-soft)", borderRadius: "var(--radius-md)", marginBottom: 18,
            }}>
              <Icon name="read-only" root={ICN} size={17} color="var(--orange-600)" style={{ marginTop: 1 }} />
              <div style={{ fontSize: "var(--text-sm)", color: "var(--ink-700)", lineHeight: "var(--lh-normal)" }}>
                <strong style={{ color: "var(--ink-900)" }}>Read-only by default.</strong> I never change anything in your
                account without an approval you've signed off in Alfred.
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="primary" size="md" fullWidth>Connect {selected}</Button>
              <Button variant="ghost" size="md">Not now</Button>
            </div>
          </Card>

          <Card padding={24} shadow="sm">
            <Sect title="First sync — Meta" sub="Connected a moment ago" right={<Badge tone="info" dot>Syncing</Badge>} />
            <ReasoningState
              lines={[
                "Reading your campaigns and ad sets…",
                "Backfilling spend and conversion history…",
                "Reconciling results with GA4…",
              ]}
              elapsed="2m 04s"
              style={{ width: "100%", marginBottom: 14 }}
            />
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0 }}>
              You can leave this page — I'll keep going and let you know the moment your data is live.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ======================= CONNECTION HEALTH ======================= */
function ConnectionHealth() {
  /* Northwind runs 8 campaigns across the live ad platforms:
     Google Ads 4 · Meta 2 · LinkedIn 1 · TikTok 1 (data/demo-data.json). */
  const cards = [
    { name: "Google Ads", status: "fresh", lastSync: "4m ago", scopes: ["Campaigns", "Spend", "Conversions"], detail: "Reading 4 campaigns — spend, budgets and conversions." },
    { name: "Meta", status: "fresh", lastSync: "6m ago", scopes: ["Campaigns", "Ad sets", "Creative"], detail: "2 campaigns live. One is flagged P1 — it's waiting in Decision alerts." },
    { name: "LinkedIn", status: "fresh", lastSync: "9m ago", detail: "CPL on the ABM campaign fell 22% and is holding — I'm tracking the scale headroom." },
    { name: "TikTok", status: "fresh", lastSync: "11m ago", detail: "Watching the spark ads campaign — hero creative CTR is down 12% this week." },
    { name: "GA4", status: "fresh", lastSync: "4m ago", detail: "Sessions and conversions — my cross-check for every ad platform." },
    { name: "Search Console", status: "error", lastSync: "26h ago", detail: "The OAuth token expired overnight. Your AI Visibility inputs are holding at yesterday's data until you reconnect." },
    { name: "HubSpot", status: "fresh", lastSync: "12m ago", scopes: ["Contacts", "Pipeline", "Lifecycle stages"], detail: "Lead quality and pipeline — this is how I catch conversion gaps early." },
    { name: "Stripe", status: "fresh", lastSync: "18m ago", detail: "Revenue ground truth, so ROAS reconciles with what you actually banked." },
    { name: "Mailchimp", status: "syncing", lastSync: "1h ago", detail: "Nightly sync running — lifecycle sends and engagement." },
    { name: "Slack", status: "fresh", lastSync: "just now", detail: "Delivering your Daily Brief to #marketing every weekday at 8:00 AM." },
  ];
  const statusBadge = { fresh: ["success", "Fresh"], syncing: ["info", "Syncing"], error: ["danger", "Error"], stale: ["warning", "Stale"] };
  const catOf = (n) => (INTEGRATIONS.find((i) => i.name === n) || {}).category || "";

  const columns = [
    { key: "name", header: "Source", render: (v) => <strong style={{ color: "var(--ink-900)" }}>{v}</strong> },
    { key: "category", header: "Category" },
    { key: "lastSync", header: "Last sync", align: "right" },
    { key: "status", header: "Status", align: "right", render: (v) => <Badge tone={statusBadge[v][0]} dot>{statusBadge[v][1]}</Badge> },
  ];
  const rows = cards.map((c) => ({ name: c.name, category: catOf(c.name), lastSync: c.lastSync === "just now" ? "just now" : c.lastSync, status: c.status }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Connection health"
        subtitle="Silent stale data is a trust failure — so I show you exactly what I'm reading, and when I last read it."
        actions={<DataFreshness updatedAgo="4m ago" count={9} />}
      />

      <Banner tone="warning" title="Search Console has been stale for 26 hours"
        action={<Button variant="primary" size="sm">Reconnect</Button>}>
        The OAuth token expired overnight. I'm holding your AI Visibility inputs at yesterday's data rather than
        guessing — reconnect and I'll backfill the gap automatically.
      </Banner>

      <div>
        <Sect title="Live connections" sub="10 of your 12 connection slots in use — one needs attention" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {cards.map((c) => (
            <ConnectionHealthCard key={c.name} name={c.name} status={c.status} lastSync={c.lastSync}
              scopes={c.scopes || []} detail={c.detail}
              onReconnect={c.status === "error" || c.status === "stale" ? () => {} : undefined}
              style={{ maxWidth: "none" }} />
          ))}
        </div>
      </div>

      <Card padding={0} shadow="sm" style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 8px" }}>
          <Sect title="Sync log" sub="Most recent successful read per source" right={<Badge tone="neutral">Auto-refreshes</Badge>} />
        </div>
        <Table columns={columns} rows={rows} style={{ border: "none", borderRadius: 0 }} />
      </Card>
    </div>
  );
}

/* ======================= FIRST-RUN WAITING ======================= */
function FirstRunWaiting() {
  const checklist = [
    { label: "Create your workspace", meta: "Northwind Labs · B2B SaaS", done: true },
    { label: "Connect your ad platforms", meta: "Google Ads · Meta · LinkedIn · TikTok", done: true },
    { label: "Connect analytics & CRM", meta: "GA4 · HubSpot", done: true },
    { label: "Invite your team", meta: "6 of 8 seats used on Growth", done: false },
    { label: "Choose where briefs land", meta: "Email · Slack · in-app", done: false },
  ];
  const expect = [
    { when: "In the next few minutes", what: "First sync completes and your KPI Cockpit goes live — every connected metric, one source of truth." },
    { when: "Tomorrow, 8:00 AM", what: "Your first Daily Brief: what changed, why, and what to do next. A 90-second read, not a dashboard." },
    { when: "Within the week", what: "Anomaly detection has a baseline and starts flagging what needs you — before it shows in the aggregates." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      {/* hero — the time-to-value moment */}
      <Card tone="ink" radius="var(--radius-2xl)" padding={30} style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--glow-orange)", opacity: 0.55 }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Badge tone="brand" dot>First run · setting up</Badge>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "var(--text-xs)" }}>3 of 5 setup steps done</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: "var(--text-h2)", fontWeight: "var(--fw-semibold)", margin: "14px 0 10px", letterSpacing: "var(--ls-tight)", maxWidth: 780, lineHeight: 1.15 }}>
            Your first brief is being prepared
          </h2>
          <p style={{ color: "var(--periwinkle-200)", fontSize: "var(--text-lg)", lineHeight: "var(--lh-relaxed)", maxWidth: 780, margin: "0 0 20px" }}>
            I'm reading Northwind Labs' history across 6 connected sources — 8 campaigns, roughly $310K of monthly
            spend — and building your baseline. From here, my briefs only get sharper.
          </p>
          <ReasoningState
            lines={[
              "Reading campaign history from Google Ads…",
              "Reconciling conversions across GA4 and HubSpot…",
              "Building your spend and ROAS baseline…",
            ]}
            elapsed="4m 12s"
          />
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 22, alignItems: "start" }}>
        {/* onboarding checklist */}
        <Card padding={24} shadow="sm">
          <Sect title="Finish setting up" sub="3 of 5 done — the last two take about a minute each" />
          <ProgressBar value={60} tone="gradient" height={8} style={{ marginBottom: 16 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {checklist.map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderTop: "1px solid var(--border-subtle)" }}>
                <span aria-hidden="true" style={{
                  width: 26, height: 26, flex: "none", borderRadius: "var(--radius-circle)",
                  background: s.done ? "var(--success-100)" : "transparent",
                  border: s.done ? "none" : "1.5px dashed var(--border-default)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  {s.done && <CheckGlyph size={14} />}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: s.done ? "var(--text-muted)" : "var(--ink-900)", textDecoration: s.done ? "line-through" : "none", textDecorationThickness: 1 }}>{s.label}</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{s.meta}</div>
                </div>
                {!s.done && <Button variant="subtle" size="sm">Do it now</Button>}
              </div>
            ))}
          </div>
        </Card>

        {/* what to expect — simple inline steps */}
        <Card padding={24} shadow="sm">
          <Sect title="What to expect" sub="How the first week unfolds" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {expect.map((e, i) => (
              <div key={e.when} style={{ display: "flex", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: "var(--radius-circle)", flex: "none", marginTop: 5,
                    background: i === 0 ? "var(--orange-500)" : "var(--periwinkle-400)",
                  }} />
                  {i < expect.length - 1 && <span style={{ width: 2, flex: 1, background: "var(--border-subtle)", margin: "6px 0" }} />}
                </div>
                <div style={{ paddingBottom: i < expect.length - 1 ? 20 : 0 }}>
                  <Eyebrow color={i === 0 ? "var(--orange-600)" : "var(--text-muted)"}>{e.when}</Eyebrow>
                  <p style={{ margin: "-2px 0 0", fontSize: "var(--text-sm)", color: "var(--ink-700)", lineHeight: "var(--lh-normal)" }}>{e.what}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ======================= NOTIFICATIONS CENTER ======================= */
function NotificationsCenter() {
  const AGENTS = [
    ["Daily Brief", "Your 8:00 AM read on what changed and what to do."],
    ["Anomaly Detection", "The moment something breaks from baseline."],
    ["Spend Mix", "Reallocation drafts when budget drifts from plan."],
    ["Creative Fatigue", "Early warning before CTR decay shows in spend."],
    ["Unified KPI Cockpit", "Weekly movement across every connected metric."],
    ["AI Visibility", "Shifts in how often AI engines recommend you."],
  ];
  const [prefs, setPrefs] = React.useState({
    "Daily Brief": { email: true, slack: true, inApp: true },
    "Anomaly Detection": { email: true, slack: true, inApp: true },
    "Spend Mix": { email: false, slack: true, inApp: true },
    "Creative Fatigue": { email: false, slack: false, inApp: true },
    "Unified KPI Cockpit": { email: true, slack: false, inApp: true },
    "AI Visibility": { email: false, slack: false, inApp: true },
  });
  const setPref = (agent) => (key, value) =>
    setPrefs((p) => ({ ...p, [agent]: { ...p[agent], [key]: value } }));

  const feed = [
    { title: "Your Daily Brief is ready", body: "Good morning, Priya. Three things need you today.", time: "8:00 AM", tone: "brand", unread: true, actions: [{ label: "Read the brief" }] },
    { title: "P1 — Campaign burning $4.8K with zero conversions", body: "Meta — prospecting, US broad. I've drafted the kill; it holds for your approval.", time: "7:42 AM", tone: "danger", unread: true, actions: [{ label: "Open alert" }, { label: "Dismiss" }] },
    { title: "Awaiting your approval — reallocate $18K from Search to Performance Max", body: "The moment you approve, I'll move $18K of daily budget and cap Search at $12K/day.", time: "Yesterday", tone: "info", actions: [{ label: "Review" }] },
    { title: "Brand search ROAS at 6.1x — headroom to scale +20%", body: "Google Ads — brand exact. I've sized the lift; the draft is ready when you are.", time: "Yesterday", tone: "success" },
    { title: "Hero creative fatiguing — CTR down 12% this week", body: "TikTok — spark ads. No action needed yet — I'm watching the decay curve.", time: "Monday", tone: "warning" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Notifications"
        subtitle="Everything I've flagged, in one place — briefs, anomalies and approvals waiting on you."
        actions={<>
          <Badge tone="brand" dot>2 unread</Badge>
          <Button variant="subtle" size="sm">Mark all read</Button>
        </>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start" }}>
        <Card padding={0} shadow="sm" style={{ overflow: "hidden" }}>
          <div style={{ padding: "18px 20px 12px" }}>
            <Sect title="Inbox" sub="Ranked by how much they need you" right={<Icon name="refresh" root={ICN} size={16} color="var(--ink-500)" />} />
          </div>
          {feed.map((n) => (
            <NotificationItem key={n.title} title={n.title} body={n.body} time={n.time}
              tone={n.tone} unread={!!n.unread} actions={n.actions || []} />
          ))}
        </Card>

        <Card padding={0} shadow="sm" style={{ overflow: "hidden" }}>
          <div style={{ padding: "18px 20px 12px" }}>
            <Sect title="Delivery per agent" sub="Choose where each agent reaches you" />
          </div>
          {AGENTS.map(([agent, description]) => (
            <NotificationPref key={agent} agent={agent} description={description}
              channels={prefs[agent]} onChange={setPref(agent)} />
          ))}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 20px", background: "var(--surface-sunken)" }}>
            <Icon name="alert-warning" root={ICN} size={15} color="var(--ink-500)" style={{ marginTop: 2 }} />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>
              P1 anomalies always reach you on every channel — that's the one setting I won't let you silence.
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ======================= ALERT DETAIL ======================= */
function AlertDetail() {
  /* The canonical P1 story (data/demo-data.json → anomalies[0], campaigns[2],
     recommendations[1], approvals[1], dailyBrief.items[0]). */
  const facts = [
    ["Campaign", "Meta prospecting — US broad"],
    ["Channel", "Meta"],
    ["Spend", "$4.8K/mo"],
    ["ROAS", "0.0x"],
    ["CAC", "—"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        breadcrumb={[{ label: "Decision alerts" }, { label: "P1 — Meta prospecting, US broad" }]}
        title="P1 anomaly"
        subtitle="Flagged 7:42 AM by the Anomaly Detection agent · escalated to every channel"
        actions={<>
          <Badge tone="danger" dot>P1 · urgent</Badge>
          <Button variant="subtle" size="sm" iconLeft={<Icon name="export" root={ICN} size={15} />}>Share</Button>
        </>}
      />

      <DecisionAlert priority="high" time="7:42 AM" iconRoot={ICN}
        title="Campaign burning $4.8K with zero conversions"
        insight="Meta — prospecting, US broad. I haven't touched anything yet — the kill is drafted below and holds for your approval."
        action="Review the draft" />

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start" }}>
        {/* narrative + provenance + feedback */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={26} shadow="sm">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <Eyebrow color="var(--orange-600)">What changed</Eyebrow>
                <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--ink-900)", lineHeight: "var(--lh-relaxed)" }}>
                  Your Meta US-broad prospecting campaign burned <strong>$4.8K this week with zero conversions</strong>.
                  Spend kept flowing at full pace while every downstream signal went flat.
                </p>
              </div>
              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 18 }}>
                <Eyebrow color="var(--orange-600)">Why it happened</Eyebrow>
                <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--ink-700)", lineHeight: "var(--lh-relaxed)" }}>
                  Lead quality fell <strong>14%</strong> the week the new broad audience launched. This isn't creative
                  fatigue or seasonality — GA4 sessions from these ad sets stopped converting the day the audience
                  switched, and HubSpot shows the leads it did produce going nowhere. The audience itself is wrong.
                </p>
              </div>
              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 18 }}>
                <Eyebrow color="var(--orange-600)">Do this</Eyebrow>
                <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--ink-900)", lineHeight: "var(--lh-relaxed)" }}>
                  <strong>Kill Meta US-broad prospecting and cap the audience at $4K/day.</strong> That recovers
                  $4.8K/day of waste — and it's the single largest line in the $55.1K/mo of recoverable waste
                  I'm tracking across your account.
                </p>
              </div>
            </div>
          </Card>

          <ProvenancePanel defaultOpen confidence={91} updated="7:42 AM"
            method="I compared spend and conversion events across Meta, GA4 and HubSpot from the day the new audience launched, and isolated these ad sets as the only spend with zero attributed conversions."
            sources={[
              { name: "Meta", detail: "spend · ad sets", status: "live" },
              { name: "GA4", detail: "sessions · conversions", status: "live" },
              { name: "HubSpot", detail: "lead quality", status: "live" },
            ]} />

          <InsightFeedback question="Was this alert useful?" />
        </div>

        {/* the gate + campaign facts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <ApprovalGate priority="high" approver="Priya Menon" requestedAt="Alfred · 7:42 AM"
            title="Pause Meta US-broad prospecting"
            summary="Recovers $4.8K/day of waste at 91% confidence. Retargeting is untouched — this only stops the broad audience that stopped converting."
            steps={["Pause 3 ad sets", "Archive the broad audience"]}
            style={{ maxWidth: "none" }} />

          <Card padding={22} shadow="sm">
            <Sect title="Campaign facts" sub="As of the last Meta sync, 6m ago" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {facts.map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--ink-600)" }}>{label}</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--ink-900)", fontVariantNumeric: "tabular-nums" }}>{value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--ink-600)" }}>My call</span>
                <Badge tone="danger" dot>Kill</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

window.ConnectionFlow = ConnectionFlow;
window.ConnectionHealth = ConnectionHealth;
window.FirstRunWaiting = FirstRunWaiting;
window.NotificationsCenter = NotificationsCenter;
window.AlertDetail = AlertDetail;
