/* Generate a <Name>.prompt.md next to each component — the design agent's usage
   reference. Description comes from the component's JSDoc, the props table is
   parsed from its .d.ts, and a curated example shows idiomatic composition.
   Existing .prompt.md files are left untouched (hand-authored ones win).
   Run: node scripts/gen-prompts.mjs */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const COMPONENTS_DIR = path.join(ROOT, "components");
const NS = "window.AlfredAIDesignSystem_1ce241";

// Curated, idiomatic examples (JSX). Keyed by component name.
const EXAMPLES = {
  SeekComposer: `<SeekComposer placeholder="Ask Alfred anything…" onSubmit={q => seek(q)}\n  suggestions={["Where should I move budget this week?", "Why did CAC rise?"]} />`,
  AlfredMessage: `<AlfredMessage role="alfred" time="8:02 AM"\n  sources={[{ name: "Google Ads", detail: "spend", status: "live" }, { name: "GA4", status: "live" }]}>\n  I'd shift $18K from Search to Performance Max [1]. Cost-per-lead is holding [2].\n</AlfredMessage>`,
  ThinkingTrace: `<ThinkingTrace elapsed="4s" steps={[\n  { label: "Pulling spend & pacing", status: "done" },\n  { label: "Isolating the cause", status: "active" },\n  { label: "Drafting the move", status: "pending" }]} />`,
  PromptSuggestions: `<PromptSuggestions onSelect={seek} suggestions={[\n  "Where should I move budget this week?", { label: "Forecast Q3 pipeline", hint: "forecast" }]} />`,
  ScenarioSimulator: `<ScenarioSimulator onApply={vals => commit(vals)} />`,
  GoalPacing: `<GoalPacing label="Q3 pipeline" value={1.84} target={3.2} elapsed={0.62} period="Q3 · 62% elapsed" />`,
  ApprovalGate: `<ApprovalGate\n  title="Reallocate $18K from Search to Performance Max"\n  steps={["Move $18K of daily budget", "Cap Search at $12K/day"]}\n  approver="Priya Menon" onApprove={apply} onDecline={skip} />`,
  AnomalyFlag: `<AnomalyFlag tone="anomaly" label="Lead quality down 14%" detail="New paid-social audience" value="−14%" />`,
  Textarea: `<Textarea label="Notes for Alfred" value={notes} onChange={e => setNotes(e.target.value)} maxLength={280} showCount />`,
  SearchInput: `<SearchInput value={q} onChange={e => setQ(e.target.value)} onSelect={go}\n  results={[{ label: "Why did CAC rise last week?", hint: "diagnose" }]} />`,
  FileDropzone: `<FileDropzone onFiles={fs => upload(fs)}\n  files={[{ name: "q3-spend.csv", size: "2.4 MB", status: "done" }]} />`,
  ActivityTimeline: `<ActivityTimeline items={[\n  { time: "Today, 8:02 AM", title: "Reallocated $18K to Performance Max", kind: "action", actor: "Priya approved" },\n  { time: "Yesterday", title: "Flagged a lead-quality drop", kind: "alert" }]} />`,
  NotificationItem: `<NotificationItem tone="warning" unread title="I've flagged a budget risk"\n  body="Google Ads is pacing 6% over plan." time="2m ago"\n  actions={[{ label: "Review" }, { label: "Dismiss" }]} />`,
  Button: `<Button variant="primary" size="lg">Reallocate budget</Button>`,
  IconButton: `<IconButton name="refresh" variant="ghost" title="Refresh" iconRoot="../../assets/icons" />`,
  Input: `<Input label="Work email" value={email} onChange={e => setEmail(e.target.value)} fill="plain" />`,
  Select: `<Select label="Module" value={mod} onChange={e => setMod(e.target.value)}\n  options={[{ value: "mkt", label: "Marketing" }, { value: "sales", label: "Sales" }]} />`,
  Checkbox: `<Checkbox checked={on} onChange={setOn} label="Email me the daily briefing" />`,
  Switch: `<Switch checked={alerts} onChange={setAlerts} label="Real-time alerts" />`,
  RadioGroup: `<RadioGroup label="Plan" value={plan} onChange={setPlan}\n  options={[{ value: "starter", label: "Starter" }, { value: "growth", label: "Growth" }]} />`,
  SegmentedControl: `<SegmentedControl value={range} onChange={setRange}\n  options={[{ value: "d", label: "Day" }, { value: "w", label: "Week" }, { value: "m", label: "Month" }]} />`,
  Slider: `<Slider label="Budget cap" value={cap} onChange={setCap} min={0} max={500} />`,
  Tabs: `<Tabs value={tab} onChange={setTab} tabs={[{ id: "mkt", label: "Marketing" }, { id: "sales", label: "Sales" }]} />`,
  Chip: `<Chip tone="brand" onRemove={() => removeFilter("paid-social")}>Paid social</Chip>`,
  Badge: `<Badge tone="danger" dot>3 need action</Badge>`,
  Avatar: `<Avatar name="Priya Menon" size={40} />`,
  Card: `<Card tone="surface" padding={24} shadow="md">Floating content</Card>`,
  Logo: `<Logo height={28} tone="color" root="../../assets/logos" />`,
  Icon: `<Icon name="trend-up" size={20} color="var(--orange-500)" root="../../assets/icons" />`,
  KpiCard: `<KpiCard label="Blended ROAS" value="4.8x" delta="+12.4%" direction="up" caption="vs last 30d" icon="trend-up" iconRoot="../../assets/icons" />`,
  DecisionAlert: `<DecisionAlert priority="high" time="12m ago" title="Google Ads over budget"\n  insight="Brand campaign exhausts its cap in 4 days. Shift $18K to Performance Max."\n  action="Reallocate budget" iconRoot="../../assets/icons" />`,
  ProgressBar: `<ProgressBar value={62} tone="gradient" height={9} />`,
  Table: `<Table columns={[{ key: "name", header: "Campaign" }, { key: "roas", header: "ROAS", align: "right" }]}\n  rows={[{ name: "Performance Max", roas: "5.1x" }]} />`,
  EmptyState: `<EmptyState title="No alerts" body="You're all caught up — I'll flag anything that needs a decision." action={<Button>Refresh</Button>} />`,
  Skeleton: `<Skeleton lines={3} />`,
  Breadcrumb: `<Breadcrumb items={[{ label: "Home" }, { label: "Marketing" }, { label: "Spend & ROI" }]} />`,
  Pagination: `<Pagination page={page} pageCount={12} onChange={setPage} />`,
  Stepper: `<Stepper current={1} steps={[{ label: "Connect" }, { label: "Configure" }, { label: "Launch" }]} />`,
  Banner: `<Banner tone="warning" title="Spend pacing hot" onDismiss={dismiss}>Spend is 6% over plan this cycle.</Banner>`,
  Modal: `<Modal open={open} onClose={close} title="Reallocate budget"\n  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button onClick={confirm}>Reallocate</Button></>}>\n  Shift $18K from Brand to Performance Max?\n</Modal>`,
  Drawer: `<Drawer open={open} onClose={close} title="Filters">…filter controls…</Drawer>`,
  Toast: `<Toast tone="success" title="Reallocation queued" onClose={dismiss}>+$48K projected this quarter.</Toast>`,
  Tooltip: `<Tooltip label="Return on ad spend"><span>ROAS</span></Tooltip>`,
  Popover: `<Popover open={open} onOpenChange={setOpen} trigger={<IconButton name="sort" iconRoot="../../assets/icons" />}>\n  <Menu items={[{ label: "Newest" }, { label: "Top spend" }]} />\n</Popover>`,
  Menu: `<Menu items={[{ label: "Edit" }, { label: "Duplicate" }, { divider: true }, { label: "Delete", danger: true }]} />`,
  Sparkline: `<Sparkline points={[3.1, 3.8, 3.4, 4.2, 4.0, 4.8]} />`,
  LineChart: `<LineChart points={[120, 168, 180, 230, 268]} labels={["W1", "W2", "W3", "W4", "W5"]} />`,
  BarChart: `<BarChart data={[{ label: "Search", value: 26 }, { label: "Social", value: 38, display: "$84K" }]} />`,
  DonutChart: `<DonutChart segments={[{ label: "Paid", value: 38 }, { label: "Search", value: 26 }]} centerLabel="$312K" centerSub="spend" />`,
  FunnelChart: `<FunnelChart steps={[{ label: "Visitors", value: 100 }, { label: "MQL", value: 64 }, { label: "Won", value: 8 }]} />`,
  SignalCard: `<SignalCard tone="signal" label="SIGNAL DETECTED" statement="Lead quality down 14% this week" trace="Traced to a new paid social campaign" />`,
  StatBand: `<StatBand stats={[{ value: "90x", label: "Productivity boost" }, { value: "$90M+", label: "Cost savings" }]} />`,
  StepFlow: `<StepFlow steps={[{ title: "Learn", body: "…" }, { title: "Acts", body: "…" }]} />`,
  FaqItem: `<FaqItem question="What is decision intelligence?">Turning data into decision-ready answers.</FaqItem>`,
  AgentStatus: `<AgentStatus query="What's the biggest risk right now?" steps={["Analysing campaign spends", "Synthesising root cause"]} />`,
  Accordion: `<Accordion defaultOpen={["why"]} items={[\n  { id: "why", title: "Why did CAC rise last week?", content: "I traced it to a new paid-social audience — lead quality fell 14%." },\n  { id: "fix", title: "What should we do about it?", content: "I'd shift $18K from Search to Performance Max." }]} />`,
  Combobox: `<Combobox label="Campaign" value={campaign} onChange={setCampaign} placeholder="Search campaigns…"\n  options={[{ value: "pmax", label: "Performance Max", hint: "google" }, { value: "abm", label: "LinkedIn ABM", hint: "paid social" }]} />`,
  Kbd: `<span>Press <Kbd>⌘K</Kbd> to ask Alfred</span>`,
  Divider: `<Divider label="Earlier today" />`,
  Spinner: `<Spinner size="md" label="Pulling spend data…" />`,
  TagInput: `<TagInput label="Audiences" value={audiences} onChange={setAudiences}\n  suggestions={["CMOs", "Growth leads", "RevOps leaders"]} maxTags={6} />`,
  NumberInput: `<NumberInput label="Monthly budget cap" value={cap} onChange={setCap} min={0} max={100} step={5} prefix="$" unit="K" />`,
  Callout: `<Callout title="I'd watch Search pacing" action={{ label: "Review pacing", onClick: openPacing }}>\n  Google Ads is pacing 6% over plan — I'd cap daily spend at $12K until Thursday.\n</Callout>`,
  ProgressRing: `<ProgressRing value={72} label="Attained" sublabel="of Q3 target" />`,
  EyebrowBadge: `<EyebrowBadge tone="brand">Decision intelligence</EyebrowBadge>
<EyebrowBadge tone="periwinkle" mono>One source of truth</EyebrowBadge>`,
  DotMatrix: `<DotMatrix height={220} density={0.14} tone="brand" />`,
  OfferSwitch: `<OfferSwitch checked={offerApplied} onChange={setOfferApplied} detail="for your first 2 months" />`,
  PriceCard: `<PriceCard name="Growth" price="249" anchorPrice="499" badge="MOST POPULAR" highlighted
  features={["8 team seats", "500 AI chat queries a month", "Priority support, 1-day SLA"]}
  cta={{ label: "Start with Growth", onClick: () => {} }} footnote="Launch offer — 50% off your first two months." />`,
  IntegrationCard: `<IntegrationCard name="Google Ads" body="I pull spend, conversions and quality scores every hour to catch budget drift early." status="live" href="/integrations/google-ads" />`,
  CategoryCountBadge: `<CategoryCountBadge count={5} label="Ad platforms" />`,
  Countdown: `<Countdown target="2026-09-15T09:00:00Z" size="lg" />`,
  AvatarStack: `<AvatarStack names={["Priya Menon", "Daniel Okafor", "Mei Lin", "Sofia Alvarez", "James Carter"]} max={4} label="2,300+ people already joined" />`,
  CapabilityTicker: `<CapabilityTicker
  items={["Budget reallocation", "CAC diagnosis", "Pipeline forecasting", "Creative fatigue alerts"]}
  speed={36}
/>`,
  AnimatedCounter: `<AnimatedCounter value={4.8} suffix="x" label="Average ROAS" sublabel="Across $128M of managed spend" />`,
  JobListingRow: `<JobListingRow title="Senior product designer" team="Design" location="London or remote" type="Full-time" href="/careers/senior-product-designer" />`,
  ModuleStatusCard: `<ModuleStatusCard module="Alfred for Sales" slogan="Know which deals will actually close" status="in-development"
  agents={["Pipeline risk agent", "Forecast agent"]} cta="Join the waitlist" href="/products/sales" />`,
  ProvenancePanel: `<ProvenancePanel sources={[{ name: "GA4", detail: "sessions", status: "live" }, { name: "HubSpot", detail: "pipeline", status: "live" }]}
  confidence={82} method="I compared 90 days of spend pacing against lead quality and isolated the paid-social audience change." updated="6m ago" defaultOpen />`,
  InsightFeedback: `<InsightFeedback onFeedback={(verdict, reason) => save(verdict, reason)} />`,
  ReasoningState: `<ReasoningState lines={["Reading your spend data…", "Isolating what changed…", "Drafting the move…"]} elapsed="8s" />`,
  ConnectionHealthCard: `<ConnectionHealthCard name="Google Ads" status="error" lastSync="42m ago" scopes={["Ads read", "Reporting"]}
  detail="I can't refresh spend — the OAuth token expired, so today's pacing may be off." onReconnect={() => {}} />`,
  SyncStatusBadge: `<SyncStatusBadge status="fresh" />
<SyncStatusBadge status="syncing" />
<SyncStatusBadge status="error" label="Reconnect Google Ads" />`,
  UsageMeter: `<UsageMeter label="Decision runs" used={8400} limit={10000} unit="runs" footnote="Resets 1 Aug — I'll flag you before you hit the cap." />`,
  UpgradeModal: `<UpgradeModal open={open} onClose={() => setOpen(false)}
  cta={{ label: "Upgrade to Growth", onClick: startCheckout }} />`,
  AuditLogRow: `<AuditLogRow actor="Alfred" isAlfred action="reallocated budget to" target="Performance Max — Q3" time="Today, 09:42"
  detail="I moved $18K from brand search into Performance Max after CAC rose 22% week over week." />`,
  MemoryCard: `<MemoryCard fact="Paid social CAC runs 18% higher in weeks when promo emails and prospecting flights overlap." source="Learned from HubSpot · Mar 12" category="Root cause" onConfirm={() => {}} onEdit={() => {}} onRemove={() => {}} />`,
  ModuleSwitcher: `<ModuleSwitcher active="marketing" onChange={(id) => setModule(id)}
  modules={[{ id: "marketing", label: "Marketing", status: "live" }, { id: "sales", label: "Sales", status: "in-development" }]} />`,
  TeamMemberRow: `<TeamMemberRow name="Priya Menon" email="priya@acmecorp.com" role="Admin" status="active"
  onRoleChange={(role) => updateRole("priya@acmecorp.com", role)} onRemove={() => removeMember("priya@acmecorp.com")} />`,
  BillingPlanCard: `<BillingPlanCard plan="Growth" price="$299" period="per month" renewal="Renews Aug 2 · Visa ·· 4242"
  usage={[{ label: "Decision runs", used: 1840, limit: 2500 }, { label: "Seats", used: 8, limit: 10 }]}
  onManage={() => openPortal()} onUpgrade={() => openUpgrade()} />`,
  NotificationPref: `<NotificationPref agent="Budget pacing agent" description="I flag campaigns pacing more than 8% over or under plan."
  channels={{ email: true, slack: true, inApp: false }} onChange={(channel, value) => savePref(channel, value)} />`,
  DashboardMock: `<DashboardMock />  {/* canonical demo data built in; override url/kpis/score/actions per page */}`,
  StateBlock: `<StateBlock kind="empty" title="All clear" body="I haven't found any alerts today — you're all caught up."
  action={{ label: "Review yesterday's decisions", onClick: () => {} }} />`,
};

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : p.endsWith(".jsx") ? [p] : [];
});

const jsdocOf = (jsx) => {
  const m = jsx.match(/\/\*\*([\s\S]*?)\*\//);
  if (!m) return "";
  return m[1].split("\n").map((l) => l.replace(/^\s*\*\s?/, "").trim()).filter(Boolean)
    .filter((l) => !/^Alfred AI —/.test(l)).join(" ").trim();
};

const propsOf = (dtsPath) => {
  if (!fs.existsSync(dtsPath)) return [];
  const dts = fs.readFileSync(dtsPath, "utf8");
  const body = dts.match(/export interface \w*Props\s*\{([\s\S]*?)\n\}/);
  if (!body) return [];
  const rows = [];
  let doc = "";
  for (const raw of body[1].split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const dm = line.match(/^\/\*\*\s*(.*?)\s*\*\/$/);
    if (dm) { doc = dm[1]; continue; }
    const fm = line.match(/^([A-Za-z0-9_]+)(\?)?:\s*(.+);$/);
    if (fm) {
      const def = (doc.match(/@default\s+(.+?)\s*$/) || [])[1];
      const cleanDoc = doc.replace(/@default\s+.+$/, "").trim();
      rows.push({ name: fm[1], optional: !!fm[2], type: fm[3].trim(), doc: cleanDoc, def });
      doc = "";
    }
  }
  return rows;
};

let count = 0, skipped = 0;
for (const jsxPath of walk(COMPONENTS_DIR)) {
  const dir = path.dirname(jsxPath);
  const name = path.basename(jsxPath, ".jsx");
  const promptPath = path.join(dir, `${name}.prompt.md`);
  if (fs.existsSync(promptPath)) { skipped++; continue; }
  const jsx = fs.readFileSync(jsxPath, "utf8");
  const desc = jsdocOf(jsx);
  const props = propsOf(path.join(dir, `${name}.d.ts`));
  const example = EXAMPLES[name];

  const propTable = props.length
    ? ["| Prop | Type | Default | Notes |", "| --- | --- | --- | --- |",
       ...props.map((p) => `| \`${p.name}${p.optional ? "?" : ""}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.def ? `\`${p.def}\`` : "—"} | ${p.doc || ""} |`)].join("\n")
    : "_Props are documented in the `.d.ts`._";

  const md = `# ${name}

${desc}

## Props

${propTable}

## Usage

\`\`\`jsx
const { ${name} } = ${NS};

${example || `<${name} />`}
\`\`\`

## Notes
- Styled entirely from design-system tokens (\`var(--…)\`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
`;
  fs.writeFileSync(promptPath, md);
  count++;
}
console.log(`Generated ${count} prompt.md files (${skipped} left as-is).`);
