/* ============================================================
   Alfred workspace — admin & settings screens (part 4).
   Profile & preferences · Team & permissions · Billing & plans ·
   Alfred Core memory · Audit log.
   Light theme. Composed from the design-system primitives, matching
   Screens.jsx (soft cards, PageHeader scaffolding, first-person voice).
   All numbers and names come from data/demo-data.json (Northwind Labs).
   Each component is self-contained so scripts/verify-render.mjs can
   server-render it prop-less.
   ============================================================ */
const { Card, Badge, Button, Icon, Avatar, Switch, Input, Select, Callout, Chip,
  PageHeader, TeamMemberRow, UsageMeter, BillingPlanCard, PriceCard, UpgradeModal,
  MemoryCard, FilterBar, AuditLogRow } = window.AlfredAIDesignSystem_1ce241;
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

const Footnote = ({ children }) => (
  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", borderTop: "1px solid var(--border-subtle)", paddingTop: 14 }}>
    {children}
  </div>
);

/* ======================= PROFILE & PREFERENCES ======================= */
function SettingsProfile() {
  const [name, setName] = React.useState("Priya Menon");
  const [email, setEmail] = React.useState("priya@northwindlabs.com");
  const [tz, setTz] = React.useState("et");
  const [ccy, setCcy] = React.useState("usd");
  const [brief, setBrief] = React.useState(true);
  const [alerts, setAlerts] = React.useState(true);
  const [digest, setDigest] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Profile & preferences"
        subtitle="How you appear across Northwind Labs — and how I show up for you"
        breadcrumb={[{ label: "Settings" }, { label: "Profile" }]}
        actions={<><Button variant="ghost" size="sm">Cancel</Button><Button variant="primary" size="sm">Save changes</Button></>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 22, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={28} shadow="sm">
            <SectionHead title="Profile" sub="Your name and email travel with every approval you make" />
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
              <Avatar name={name} size={64} />
              <Button variant="outline" size="sm">Change photo</Button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} fill="plain" />
              <Input label="Work email" value={email} onChange={(e) => setEmail(e.target.value)} fill="plain" />
              <Input label="Role" value="VP Marketing" fill="plain" readOnly />
              <Input label="Workspace" value="Northwind Labs" fill="plain" readOnly />
            </div>
          </Card>

          <Card padding={28} shadow="sm">
            <SectionHead title="Workspace defaults" sub="These shape every brief and report I send" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Select label="Timezone" value={tz} onChange={(e) => setTz(e.target.value)} options={[
                { value: "et", label: "Eastern Time (ET)" },
                { value: "pt", label: "Pacific Time (PT)" },
                { value: "gmt", label: "London (GMT)" },
                { value: "ist", label: "India (IST)" },
              ]} />
              <Select label="Reporting currency" value={ccy} onChange={(e) => setCcy(e.target.value)} options={[
                { value: "usd", label: "US dollar ($)" },
                { value: "inr", label: "Indian rupee (₹)" },
                { value: "eur", label: "Euro (€)" },
                { value: "gbp", label: "Pound sterling (£)" },
              ]} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Callout tone="insight" compact>
                Your daily brief lands at 8:00 AM in this timezone — change it and I'll move with you.
              </Callout>
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={28} shadow="sm">
            <SectionHead title="Notifications" sub="Quick preferences — the full matrix lives per agent" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[["Daily brief", "Your 8:00 AM summary, every weekday", brief, setBrief],
                ["Real-time decision alerts", "The moment something needs a call", alerts, setAlerts],
                ["Weekly digest", "A Monday recap of the week's outcomes", digest, setDigest]].map(([t, d, val, set]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "var(--fw-bold)", color: "var(--ink-900)", fontSize: "var(--text-base)" }}>{t}</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{d}</div>
                  </div>
                  <Switch checked={val} onChange={set} />
                </div>
              ))}
            </div>
          </Card>

          <Card padding={28} shadow="sm">
            <SectionHead title="Danger zone" sub="Actions I can't undo for you" />
            <Callout tone="danger" title="Delete this account">
              Deleting your account removes you from Northwind Labs and erases your approvals history.
              The workspace — and everything I've learned for it — stays with your Admins.
            </Callout>
            <div style={{ marginTop: 16 }}>
              <Button variant="outline" size="sm" style={{ color: "var(--danger-500)", borderColor: "var(--danger-500)" }}>
                Delete account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ======================= TEAM & PERMISSIONS ======================= */
function TeamPermissions() {
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState("member");
  const [roles, setRoles] = React.useState({
    "Priya Menon": "Admin",
    "Daniel Okafor": "Member",
    "Mei Lin": "Member",
    "Sofia Alvarez": "Member",
    "James Carter": "Viewer",
  });
  const members = [
    { name: "Priya Menon", email: "priya@northwindlabs.com · VP Marketing" },
    { name: "Daniel Okafor", email: "daniel@northwindlabs.com · Growth lead" },
    { name: "Mei Lin", email: "mei@northwindlabs.com · Performance marketer" },
    { name: "Sofia Alvarez", email: "sofia@northwindlabs.com · Lifecycle marketer" },
    { name: "James Carter", email: "james@northwindlabs.com · RevOps" },
  ];
  const setRole = (n) => (r) => setRoles((prev) => ({ ...prev, [n]: r }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Team & permissions"
        subtitle="Who works with me at Northwind Labs, and what each seat can approve"
        breadcrumb={[{ label: "Settings" }, { label: "Team" }]}
        actions={<Badge tone="neutral">6 of 8 seats</Badge>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={24} shadow="sm">
            <SectionHead title="Invite someone" sub="They'll get their first brief from me the morning after they join" />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Input placeholder="name@northwindlabs.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} fill="plain" style={{ flex: 1 }} />
              <Select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} options={[
                { value: "admin", label: "Admin" },
                { value: "member", label: "Member" },
                { value: "viewer", label: "Viewer" },
              ]} style={{ width: 150, flex: "none" }} />
              <Button variant="primary" size="md" style={{ flex: "none" }}>Send invite</Button>
            </div>
          </Card>

          <Card padding={0} shadow="sm" style={{ overflow: "hidden" }}>
            <div style={{ padding: "20px 24px 6px" }}>
              <SectionHead title="Members" sub="Role changes apply the moment you make them" />
            </div>
            {members.map((m) => (
              <TeamMemberRow key={m.name} name={m.name} email={m.email} role={roles[m.name]} onRoleChange={setRole(m.name)} onRemove={() => {}} />
            ))}
            <TeamMemberRow
              name="finance@northwindlabs.com"
              email="Invited yesterday · seat reserved"
              role="Viewer"
              status="invited"
              onRoleChange={() => {}}
              onRemove={() => {}}
              style={{ borderBottom: "none" }}
            />
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={24} shadow="sm">
            <SectionHead title="Seats" sub="Growth plan allowance" />
            <UsageMeter label="Seats" used={6} limit={8} unit="seats" footnote="5 active members · 1 pending invite" />
            <div style={{ marginTop: 16 }}>
              <Button variant="outline" size="sm">Manage plan</Button>
            </div>
          </Card>

          <Card padding={24} shadow="sm">
            <SectionHead title="What each role can do" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Admin", "Approves spend moves, manages billing and the team"],
                ["Member", "Works with me daily — asks, drafts, and requests approvals"],
                ["Viewer", "Reads every brief and dashboard, can't approve or edit"]].map(([r, d]) => (
                <div key={r} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ width: 68, flex: "none", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--ink-900)" }}>{r}</span>
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Callout tone="insight" compact>
                Approvals always stay with people — I draft the move, an Admin makes the call.
              </Callout>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ======================= BILLING & PLANS ======================= */
function BillingPlans() {
  const [upgradeOpen, setUpgradeOpen] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Billing & plans"
        subtitle="Growth plan · Northwind Labs"
        breadcrumb={[{ label: "Settings" }, { label: "Billing" }]}
        actions={<Badge tone="brand" dot>50% off your first 2 months</Badge>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 22, alignItems: "start" }}>
        <BillingPlanCard
          plan="Growth"
          price="₹49,900"
          period="/month"
          renewal="Renews Aug 2 · Visa ·· 4242"
          onManage={() => {}}
          onUpgrade={() => setUpgradeOpen(true)}
        />

        <Card padding={24} shadow="sm">
          <SectionHead title="Usage this cycle" sub="Where you stand against the Growth allowance" />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <UsageMeter label="Seats" used={6} limit={8} unit="seats" footnote="5 active members · 1 pending invite" />
            <UsageMeter label="Seek Alfred queries" used={342} limit={500} unit="queries" footnote="Resets Aug 2" />
            <UsageMeter label="Integrations" used={10} limit={12} unit="sources" footnote="Salesforce, Shopify and Klaviyo are ready when you are" />
          </div>
        </Card>
      </div>

      <div>
        <SectionHead title="Compare plans" sub="Every tier includes Alfred Core — memory that compounds from day one" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, paddingTop: 13 }}>
          <PriceCard
            name="Starter"
            currency="₹"
            price="19,900"
            period="/month"
            features={["Daily Brief and KPI Cockpit", "Anomaly Detection", "Email and Slack delivery"]}
            cta={{ label: "Talk to us" }}
            style={{ padding: "26px 24px 22px" }}
          />
          <PriceCard
            name="Growth"
            currency="₹"
            price="49,900"
            period="/month"
            badge="Current plan"
            highlighted
            features={["All six marketing agents", "8 seats · 500 queries a month", "12 integrations", "Approvals and audit trail"]}
            cta={{ label: "Manage plan" }}
            style={{ padding: "26px 24px 22px" }}
          />
          <PriceCard
            name="Max"
            currency="₹"
            price="99,900"
            period="/month"
            features={["Everything in Growth", "Advanced RBAC and scheduled reports", "Priority support"]}
            cta={{ label: "Upgrade to Max", onClick: () => setUpgradeOpen(true) }}
            footnote="50% off your first 2 months"
            style={{ padding: "26px 24px 22px" }}
          />
        </div>
        <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 14 }}>
          Prices in INR with a USD toggle at checkout · the launch offer applies to your first 2 months on any tier.
        </div>
      </div>

      <UpgradeModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        title="Room to grow past Growth"
        body="You're at 6 of 8 seats and you've used 342 of your 500 Seek Alfred queries this cycle. On Max I can brief the whole team and answer every question without anyone watching the meter."
        plans={[
          { name: "Growth", price: "₹49,900/mo", features: ["8 seats", "500 queries a month", "12 integrations"] },
          { name: "Max", price: "₹99,900/mo", highlight: true, features: ["Expanded seats and queries", "Advanced RBAC and scheduled reports", "Priority support"] },
        ]}
        cta={{ label: "Upgrade to Max", onClick: () => setUpgradeOpen(false) }}
        secondaryCta={{ label: "Not now" }}
      />
    </div>
  );
}

/* ======================= ALFRED CORE — MEMORY ======================= */
function MemoryCore() {
  const [cat, setCat] = React.useState("All");
  const memories = [
    {
      category: "Root cause",
      fact: "Broad Meta prospecting audiences don't convert for Northwind — the US-broad launch burned $4.8K in a week with zero conversions, and lead quality fell 14% the day the new audience went live. I now flag any broad-audience launch within 24 hours.",
      source: "Learned from Meta, GA4 and HubSpot · confirmed by Priya",
    },
    {
      category: "Compounding",
      fact: "Brand search is the most efficient dollar in the account — 6.1x ROAS at a $74 CAC, with headroom to scale spend about 20% before efficiency decays.",
      source: "Learned from Google Ads · updated daily",
    },
    {
      category: "Cross-function",
      fact: "LinkedIn ABM CPL fell 22% on the enterprise audience and is holding. Scaling spend +30% is worth roughly $30K of pipeline at flat CPL — sales sees the same accounts engaging.",
      source: "Learned from LinkedIn and HubSpot",
    },
    {
      category: "Institutional",
      fact: "Northwind's Q3 pipeline target is $3.2M. You're at $1.84M with 62% of the quarter elapsed — the two open reallocations are how we close the gap.",
      source: "Learned from HubSpot and your Q3 plan",
    },
  ];
  const cats = ["All", "Root cause", "Institutional", "Cross-function", "Compounding"];
  const shown = cat === "All" ? memories : memories.filter((m) => m.category === cat);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Alfred Core"
        subtitle="Everything I've learned about Northwind Labs — correct me where I'm wrong."
        breadcrumb={[{ label: "Workspace" }, { label: "Memory" }]}
        actions={<Badge tone="neutral">4 memories shown</Badge>}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {cats.map((c) => (
          <Chip key={c} selected={cat === c} onClick={() => setCat(c)}>{c}</Chip>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, alignItems: "start" }}>
        {shown.map((m) => (
          <MemoryCard key={m.category} fact={m.fact} source={m.source} category={m.category}
            onConfirm={() => {}} onEdit={() => {}} onRemove={() => {}} />
        ))}
      </div>

      <Footnote>
        Memory compounds — every fact you confirm here sharpens my next recommendation.
        These stay Northwind's alone; your data never trains shared models.
      </Footnote>
    </div>
  );
}

/* ======================= AUDIT LOG ======================= */
function AuditLog() {
  const [actor, setActor] = React.useState("");
  const [type, setType] = React.useState("");
  const [range, setRange] = React.useState("7d");
  const rows = [
    {
      actor: "Alfred", isAlfred: true, kind: "budget", time: "Today · 9:41 AM",
      action: "applied the approved reallocation to", target: "Performance Max — US",
      detail: "Moved $18K of daily budget from non-brand search and capped Search at $12K/day — Performance Max converts at 5.1x while non-brand holds at 3.4x.",
      open: true,
    },
    {
      actor: "Priya Menon", kind: "budget", time: "Today · 9:38 AM",
      action: "approved", target: "Reallocate $18K from Search to Performance Max",
    },
    {
      actor: "Alfred", isAlfred: true, kind: "campaigns", time: "Today · 9:12 AM",
      action: "paused campaign", target: "Meta prospecting — US broad",
      detail: "Paused 3 ad sets and archived the broad audience after Priya's approval — the campaign burned $4.8K this week with zero conversions.",
    },
    {
      actor: "Alfred", isAlfred: true, kind: "campaigns", time: "Yesterday · 4:47 PM",
      action: "flagged creative fatigue on", target: "TikTok spark ads",
      detail: "Hero creative CTR is down 12% this week — fatigue, not audience. A fresh variant protects about $26K a month of spend.",
    },
    {
      actor: "Daniel Okafor", kind: "integrations", time: "Yesterday · 11:20 AM",
      action: "connected", target: "GA4",
    },
    {
      actor: "Priya Menon", kind: "team", time: "Mon · 3:05 PM",
      action: "changed James Carter's seat to", target: "Viewer",
    },
  ];
  const shown = rows.filter((r) =>
    (actor === "" || (actor === "alfred" ? r.isAlfred : !r.isAlfred)) &&
    (type === "" || r.kind === type)
  );
  const onFilter = (id, v) => {
    if (id === "actor") setActor(v);
    if (id === "type") setType(v);
    if (id === "range") setRange(v);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <PageHeader
        title="Audit log"
        subtitle="Every action — mine and the team's — with who approved it and when"
        breadcrumb={[{ label: "Settings" }, { label: "Audit log" }]}
        actions={<Badge tone="success" dot>Logging live</Badge>}
      />

      <FilterBar
        filters={[
          { id: "actor", type: "select", label: "Actor", value: actor, placeholder: "Everyone", width: 150, options: [
            { value: "alfred", label: "Alfred" },
            { value: "team", label: "Team" },
          ] },
          { id: "type", type: "select", label: "Type", value: type, placeholder: "All activity", width: 170, options: [
            { value: "budget", label: "Budget" },
            { value: "campaigns", label: "Campaigns" },
            { value: "integrations", label: "Integrations" },
            { value: "team", label: "Team" },
          ] },
          { id: "range", type: "select", label: "Date", value: range, placeholder: "Any time", width: 160, options: [
            { value: "7d", label: "Last 7 days" },
            { value: "30d", label: "Last 30 days" },
            { value: "q3", label: "This quarter" },
          ] },
        ]}
        onChange={onFilter}
        right={<Button variant="subtle" size="sm" iconLeft={<Icon name="export" root={ICN} size={15} />}>Export</Button>}
      />

      <Card padding={0} shadow="sm" style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 6px" }}>
          <SectionHead title="Activity" sub={`${shown.length} entries · newest first`} />
        </div>
        {shown.map((r, i) => (
          <AuditLogRow
            key={`${r.actor}-${r.time}`}
            actor={r.actor}
            isAlfred={!!r.isAlfred}
            action={r.action}
            target={r.target}
            time={r.time}
            detail={r.detail}
            defaultOpen={!!r.open}
            style={i === shown.length - 1 ? { borderBottom: "none" } : undefined}
          />
        ))}
      </Card>

      <Footnote>
        I only act inside the guardrails you've approved — every move is logged here with its approver,
        and Admins can export any range for review.
      </Footnote>
    </div>
  );
}

window.SettingsProfile = SettingsProfile;
window.TeamPermissions = TeamPermissions;
window.BillingPlans = BillingPlans;
window.MemoryCore = MemoryCore;
window.AuditLog = AuditLog;
