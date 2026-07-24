/* Smoke-render every component in the bundle namespace with representative
   props, against the real _ds_bundle.js. Fails on any render error or React
   warning. Run: node scripts/verify-components.mjs */
import fs from "node:fs";
import vm from "node:vm";
import { TextEncoder, TextDecoder } from "node:util";

const ROOT = new URL("..", import.meta.url).pathname;
const get = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(u + " " + r.status); return r.text(); };

const [reactSrc, serverSrc] = await Promise.all([
  get("https://unpkg.com/react@18.3.1/umd/react.development.js"),
  get("https://unpkg.com/react-dom@18.3.1/umd/react-dom-server.browser.development.js"),
]);

const warnings = [];
const mkdoc = () => new Proxy(function () {}, { get: () => mkdoc(), apply: () => mkdoc() });
const ctx = {
  console: { ...console, error: (...a) => warnings.push(String(a[0])), warn: (...a) => warnings.push(String(a[0])) },
  setTimeout, clearTimeout, queueMicrotask, TextEncoder, TextDecoder, ReadableStream,
  MessageChannel: class { constructor() { this.port1 = { postMessage() {}, close() {} }; this.port2 = { postMessage() {}, close() {} }; } },
};
ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx; ctx.document = mkdoc(); ctx.navigator = { userAgent: "node" };
vm.createContext(ctx);
vm.runInContext(reactSrc, ctx); vm.runInContext(serverSrc, ctx);
const { React, ReactDOMServer: Server } = ctx;
vm.runInContext(fs.readFileSync(ROOT + "_ds_bundle.js", "utf8"), ctx);
const ns = ctx.AlfredAIDesignSystem_1ce241;
if (ns.__errors?.length) { console.log("BUNDLE component errors:", JSON.stringify(ns.__errors)); process.exit(2); }

const h = React.createElement;
const noop = () => {};
// Representative props for every component.
const PROPS = {
  Icon: { name: "trend-up" }, Logo: {}, Avatar: { name: "Priya Menon" },
  Badge: { children: "New", tone: "brand" }, Button: { children: "Reallocate" },
  Card: { children: "x" }, Checkbox: { checked: true, label: "Remember me" },
  IconButton: { name: "refresh" }, Input: { label: "Email", value: "", onChange: noop },
  Switch: { checked: true, label: "Alerts" },
  Tabs: { tabs: [{ id: "a", label: "A" }, { id: "b", label: "B" }], value: "a", onChange: noop },
  DecisionAlert: { title: "Google Ads over budget", insight: "Shift $18K.", action: "Reallocate", priority: "high" },
  KpiCard: { label: "Blended ROAS", value: "4.8x", delta: "+12.4%", direction: "up", caption: "vs 30d" },
  ProgressBar: { value: 62 },
  AgentStatus: { query: "What's the biggest risk?", steps: ["Analysing spend", "Synthesising cause"] },
  FaqItem: { question: "What is decision intelligence?", children: "Turning data into decisions." },
  SignalCard: { label: "SIGNAL DETECTED", statement: "Lead quality down 14%", trace: "New paid social", tone: "signal" },
  StatBand: { stats: [{ value: "90x", label: "Productivity" }, { value: "$90M+", label: "Saved" }] },
  StepFlow: { steps: [{ title: "Learn", body: "b" }, { title: "Acts", body: "b" }] },
  // —— Phase 1 additions ——
  Select: { label: "Module", options: [{ value: "mkt", label: "Marketing" }], value: "mkt", onChange: noop },
  SegmentedControl: { options: [{ value: "d", label: "Day" }, { value: "w", label: "Week" }], value: "d", onChange: noop },
  RadioGroup: { label: "Plan", options: [{ value: "s", label: "Starter" }, { value: "g", label: "Growth" }], value: "g", onChange: noop },
  Chip: { children: "Paid social", onRemove: noop, tone: "brand" },
  Table: { columns: [{ key: "n", header: "Campaign" }, { key: "v", header: "ROAS", align: "right" }], rows: [{ n: "PMax", v: "5.1x" }] },
  EmptyState: { title: "No alerts", body: "You're all caught up." },
  Skeleton: { lines: 3 },
  Banner: { tone: "warning", title: "Spend pacing hot", children: "6% over plan.", onDismiss: noop },
  // —— Phase 2 charts ——
  Sparkline: { points: [3.1, 3.8, 3.4, 4.2, 4.0, 4.8] },
  LineChart: { points: [120, 168, 180, 230, 268], labels: ["W1", "W2", "W3", "W4", "W5"] },
  BarChart: { data: [{ label: "Search", value: 26 }, { label: "Social", value: 38, display: "$84K" }] },
  DonutChart: { segments: [{ label: "Paid", value: 38 }, { label: "Search", value: 26 }], centerLabel: "$312K", centerSub: "spend" },
  FunnelChart: { steps: [{ label: "Visitors", value: 100 }, { label: "MQL", value: 64 }, { label: "Won", value: 8 }] },
  // —— Phase 1 batch B: overlays + interaction ——
  Modal: { open: true, title: "Reallocate budget", children: "Shift $18K to Performance Max?", onClose: noop },
  Drawer: { open: true, title: "Filters", children: "x", onClose: noop },
  Toast: { tone: "success", title: "Saved", children: "Reallocation queued.", onClose: noop },
  Tooltip: { label: "Return on ad spend", children: h("span", null, "ROAS") },
  Popover: { open: true, trigger: h("button", null, "Open"), children: "x", onOpenChange: noop },
  Menu: { items: [{ label: "Edit" }, { divider: true }, { label: "Delete", danger: true }] },
  Slider: { value: 60, onChange: noop, label: "Budget cap" },
  Breadcrumb: { items: [{ label: "Home" }, { label: "Marketing" }, { label: "Spend" }] },
  Pagination: { page: 3, pageCount: 12, onChange: noop },
  Stepper: { steps: [{ label: "Connect" }, { label: "Configure" }, { label: "Launch" }], current: 1 },
  // —— Tier 1: charts ——
  Legend: { items: [{ label: "Paid social", color: "#FF8431" }, { label: "Search", color: "#A7A7FC" }] },
  AreaChart: { series: [{ name: "ROAS", points: [3.1, 3.4, 3.8, 4.2, 4.8] }, { name: "Target", points: [3, 3, 3.5, 4, 4] }], labels: ["W1", "W2", "W3", "W4", "W5"] },
  StackedBarChart: { data: [{ label: "Q1", social: 38, search: 26, email: 18 }, { label: "Q2", social: 42, search: 24, email: 20 }], keys: ["social", "search", "email"] },
  Heatmap: { rows: ["Mon", "Tue", "Wed"], cols: ["25-34", "35-44", "45+"], values: [[3.2, 2.1, 1.0], [3.6, 2.4, 1.2], [2.8, 2.0, 0.9]] },
  GaugeChart: { value: 72, max: 100, label: "AI Visibility", sub: "out of 100" },
  WaterfallChart: { items: [{ label: "Plan", value: 295, type: "start" }, { label: "Search +", value: 40 }, { label: "Waste cut", value: -12 }, { label: "Projected", value: 323, type: "end" }], valueFormat: (v) => "$" + v + "K" },
  BulletChart: { items: [{ label: "Blended ROAS", value: 4.8, target: 4.0, max: 6 }, { label: "CAC ($)", value: 184, target: 200, max: 300 }] },
  SankeyChart: { nodes: [{ id: "social", label: "Paid social", col: 0 }, { id: "mql", label: "MQL", col: 1 }, { id: "won", label: "Won", col: 2 }], links: [{ source: "social", target: "mql", value: 60 }, { source: "mql", target: "won", value: 30 }] },
  ScatterChart: { points: [{ x: 84, y: 5.1, label: "PMax" }, { x: 61, y: 4.6, label: "Meta" }, { x: 48, y: 3.9, label: "LinkedIn" }], xLabel: "Spend ($K)", yLabel: "ROAS" },
  // —— Tier 1: trust ——
  ConfidenceMeter: { value: 82, label: "Causal confidence" },
  SourceTrace: { sources: [{ name: "GA4", detail: "sessions", status: "live" }, { name: "HubSpot", detail: "pipeline", status: "live" }] },
  RecommendationCard: { title: "Scale LinkedIn ABM +30%", reasoning: "CPL fell 22% and is holding.", impact: "+$30K pipeline", confidence: 78 },
  DecisionLog: { entries: [{ time: "Today, 8:02 AM", title: "Reallocated $18K to Performance Max", outcome: "+6% coverage", status: "acted" }, { time: "Yesterday", title: "Scaled LinkedIn +30%", status: "acted" }] },
  DataFreshness: { updatedAgo: "6m ago", count: 6, status: "fresh" },
  CausalChain: { steps: [{ label: "Ops resourcing cut", kind: "cause" }, { label: "2 deals stalled", kind: "effect" }, { label: "$380K downgrade", kind: "impact" }], confidence: 74 },
  EvidenceLedger: { claim: "LinkedIn ABM is the most efficient place to add budget.", evidence: [{ source: "LinkedIn Ads", stance: "supports", finding: "Pipeline per dollar improved 24%." }, { source: "Finance plan", stance: "contradicts", finding: "Search would fall below its floor." }], confidence: 82, onSourceOpen: noop },
  // —— Tier 1: app ——
  Sidebar: { items: [{ id: "home", label: "Home" }, { id: "spend", label: "Spend & ROI", badge: "3" }], active: "home" },
  PageHeader: { title: "Spend & ROI", subtitle: "Where every dollar is working", breadcrumb: [{ label: "Home" }, { label: "Marketing" }] },
  DataTable: { columns: [{ key: "name", header: "Campaign" }, { key: "spend", header: "Spend", align: "right" }, { key: "roas", header: "ROAS", align: "right" }], rows: [{ name: "PMax", spend: "$84.2K", roas: "5.1x" }, { name: "Meta", spend: "$61.0K", roas: "4.6x" }] },
  FilterBar: { filters: [{ type: "segmented", id: "range", options: [{ value: "7d", label: "7d" }, { value: "30d", label: "30d" }], value: "30d" }, { type: "select", id: "ch", label: "Channel", options: [{ value: "all", label: "All" }], value: "all" }] },
  DateRangePicker: { value: "30d" },
  CommandPalette: { suggestions: [{ label: "Why did CAC rise last week?", hint: "diagnose" }, { label: "Forecast Q3 pipeline", hint: "forecast" }] },
  StatTile: { label: "Blended ROAS", value: "4.8x", delta: "+12.4%", direction: "up", caption: "vs 30d", points: [3.1, 3.4, 3.8, 4.2, 4.8] },
  // —— Conversation kit ——
  SeekComposer: { placeholder: "Ask Alfred anything…", suggestions: ["Where should I move budget this week?", "Why did CAC rise?"], onSubmit: noop },
  AlfredMessage: { role: "alfred", time: "8:02 AM", sources: [{ name: "Google Ads", detail: "spend", status: "live" }, { name: "GA4", status: "live" }], children: "I'd shift $18K from Search to Performance Max [1]. Cost-per-lead is holding [2]." },
  ThinkingTrace: { elapsed: "4s", steps: [{ label: "Pulling spend & pacing", status: "done" }, { label: "Isolating the cause", status: "active" }, { label: "Drafting the move", status: "pending" }] },
  PromptSuggestions: { onSelect: noop, suggestions: ["Where should I move budget this week?", { label: "Forecast Q3 pipeline", hint: "forecast" }] },
  // —— Decision intelligence ——
  ScenarioSimulator: { onApply: noop },
  DecisionFork: { onSelect: noop },
  GoalPacing: { label: "Q3 pipeline", value: 1.84, target: 3.2, elapsed: 0.62, period: "Q3 · 62% elapsed" },
  ApprovalGate: { steps: ["Move $18K of daily budget", "Cap Search at $12K/day"], approver: "Priya Menon", onApprove: noop, onModify: noop, onDecline: noop },
  AnomalyFlag: { tone: "anomaly", label: "Lead quality down 14%", detail: "New paid-social audience", value: "−14%" },
  // —— Practical gaps ——
  Textarea: { label: "Notes for Alfred", value: "", onChange: noop, maxLength: 280, showCount: true },
  SearchInput: { value: "", onChange: noop, onSelect: noop, open: true, results: [{ label: "Why did CAC rise last week?", hint: "diagnose" }, { label: "Forecast Q3 pipeline", hint: "forecast" }] },
  FileDropzone: { onFiles: noop, files: [{ name: "q3-spend.csv", size: "2.4 MB", status: "done" }] },
  ActivityTimeline: { items: [{ time: "Today, 8:02 AM", title: "Reallocated $18K to Performance Max", detail: "+6% non-brand coverage", kind: "action", actor: "Priya approved" }, { time: "Yesterday", title: "Flagged a lead-quality drop", kind: "alert" }] },
  NotificationItem: { tone: "warning", unread: true, title: "I've flagged a budget risk", body: "Google Ads is pacing 6% over plan.", time: "2m ago", actions: [{ label: "Review", onClick: noop }, { label: "Dismiss", onClick: noop }] },
  // —— 2026-07 primitives ——
  Accordion: { defaultOpen: ["why"], items: [{ id: "why", title: "Why did CAC rise last week?", content: "I traced it to a new paid-social audience — lead quality fell 14% while spend held." }, { id: "fix", title: "What should we do about it?", content: "I'd shift $18K from Search to Performance Max and cap the new audience at $4K/day." }] },
  Combobox: { label: "Campaign", options: [{ value: "pmax", label: "Performance Max", hint: "google" }, { value: "meta", label: "Meta prospecting", hint: "paid social" }, { value: "abm", label: "LinkedIn ABM", hint: "paid social" }], value: "pmax", onChange: noop },
  Kbd: { children: "⌘K" },
  Divider: { label: "Earlier today" },
  Spinner: { label: "Pulling spend data…", size: "md" },
  TagInput: { label: "Audiences", value: ["CMOs", "VP Marketing"], onChange: noop, suggestions: ["CMOs", "Growth leads", "RevOps leaders"], maxTags: 6 },
  NumberInput: { label: "Monthly budget cap", value: 45, onChange: noop, min: 0, max: 100, step: 5, prefix: "$", unit: "K" },
  Callout: { title: "I'd watch Search pacing", children: "Google Ads is pacing 6% over plan — I'd cap daily spend at $12K until Thursday.", action: { label: "Review pacing", onClick: noop } },
  ProgressRing: { value: 72, label: "Attained", sublabel: "of Q3 target" },
  // —— 2026-07 wave 1: marketing conversion + product trust/admin ——
  EyebrowBadge: { children: "Decision intelligence", tone: "brand" },
  DotMatrix: { height: 220, density: 0.14, speed: 90, tone: "brand" },
  OfferSwitch: { checked: true, onChange: noop, label: "50% launch offer applied", detail: "for your first 2 months" },
  PriceCard: { name: "Growth", price: "249", anchorPrice: "499", period: "/month", badge: "MOST POPULAR", features: ["8 team seats", "500 AI chat queries a month", "Full chat access with write-back", "Spend mix analysis with full simulation", "Priority support, 1-day SLA"], cta: { label: "Start with Growth", onClick: noop }, highlighted: true, footnote: "Launch offer — 50% off your first two months." },
  IntegrationCard: { name: "Google Ads", body: "I pull spend, conversions and quality scores every hour to catch budget drift early.", status: "live", href: "#", onClick: noop },
  CategoryCountBadge: { count: 5, label: "Ad platforms" },
  Countdown: { target: "2026-09-15T09:00:00Z" },
  AvatarStack: { names: ["Priya Menon", "Daniel Okafor", "Mei Lin", "Sofia Alvarez", "James Carter", "Ana Ribeiro", "Tom Hale"], label: "2,300+ people already joined" },
  CapabilityTicker: { items: ["Budget reallocation", "CAC diagnosis", "Pipeline forecasting", "Creative fatigue alerts", "Spend pacing guardrails", "Channel mix planning"], speed: 36 },
  AnimatedCounter: { value: 128, prefix: "$", suffix: "M", label: "Budget under management", sublabel: "Optimized across 40 accounts" },
  JobListingRow: { title: "Senior product designer", team: "Design", location: "London or remote", type: "Full-time", href: "/careers/senior-product-designer", onClick: noop },
  ModuleStatusCard: { module: "Alfred for Marketing", slogan: "Read less, know more", status: "live", agents: ["Spend anomaly agent", "Budget pacing agent", "Creative fatigue agent"], cta: "Explore the module", href: "#", onClick: noop },
  ProvenancePanel: { sources: [{ name: "GA4", detail: "sessions", status: "live" }, { name: "Google Ads", detail: "spend", status: "live" }, { name: "HubSpot", detail: "pipeline", status: "syncing" }], confidence: 82, method: "I compared 90 days of spend pacing against lead quality and isolated the paid-social audience change.", updated: "6m ago", defaultOpen: true },
  InsightFeedback: { onFeedback: noop },
  ReasoningState: { lines: ["Reading your spend data…", "Isolating what changed…", "Drafting the move…"], elapsed: "8s" },
  ConnectionHealthCard: { name: "Google Ads", status: "error", lastSync: "42m ago", scopes: ["Ads read", "Reporting"], detail: "I can't refresh spend — the OAuth token expired, so today's pacing may be off.", onReconnect: noop },
  SyncStatusBadge: { status: "syncing" },
  UsageMeter: { label: "Decision runs", used: 8400, limit: 10000, unit: "runs", footnote: "Resets 1 Aug — I'll flag you before you hit the cap." },
  UpgradeModal: { open: true, onClose: noop, cta: { label: "Upgrade to Growth", onClick: noop }, secondaryCta: { label: "Not now", onClick: noop } },
  AuditLogRow: { actor: "Alfred", isAlfred: true, action: "reallocated budget to", target: "Performance Max — Q3", time: "Today, 09:42", detail: "I moved $18K from brand search into Performance Max after CAC rose 22% week over week. This stayed under the $25K auto-approval threshold, so no sign-off was needed." },
  MemoryCard: { fact: "Paid social CAC runs 18% higher in weeks when promo emails and prospecting flights overlap.", source: "Learned from HubSpot · Mar 12", category: "Root cause", onConfirm: noop, onEdit: noop, onRemove: noop },
  ModuleSwitcher: { modules: [{ id: "marketing", label: "Marketing", status: "live" }, { id: "sales", label: "Sales", status: "in-development" }], active: "marketing", onChange: noop, defaultOpen: true },
  TeamMemberRow: { name: "Priya Menon", email: "priya@acmecorp.com", role: "Admin", status: "active", onRoleChange: noop, onRemove: noop },
  BillingPlanCard: { plan: "Growth", price: "$299", period: "per month", renewal: "Renews Aug 2 · Visa ·· 4242", usage: [{ label: "Decision runs", used: 1840, limit: 2500 }, { label: "Data sources", used: 6, limit: 10 }, { label: "Seats", used: 8, limit: 10 }], onManage: noop, onUpgrade: noop },
  NotificationPref: { agent: "Budget pacing agent", description: "I flag campaigns pacing more than 8% over or under plan.", channels: { email: true, slack: true, inApp: false }, onChange: noop },
  DashboardMock: {},
  StateBlock: { kind: "error", title: "I couldn't refresh your spend data", body: "The Google Ads sync timed out — retry and I'll pull the numbers again.", action: { label: "Retry sync", onClick: noop } },
};

// Renderable = plain function component OR a forwardRef/memo exotic component
// (forwardRef exports are objects, not functions — don't silently skip them).
const isRenderable = (v) => typeof v === "function" ||
  (v && typeof v === "object" && (v.$$typeof === Symbol.for("react.forward_ref") || v.$$typeof === Symbol.for("react.memo")));
const names = Object.keys(ns).filter((k) => !k.startsWith("__") && isRenderable(ns[k]));
let fail = 0, tested = 0;
for (const name of names) {
  warnings.length = 0;
  const props = PROPS[name];
  if (!props) { console.log("SKIP (no sample props)", name); continue; }
  tested++;
  try {
    const errs = [];
    const stream = await Server.renderToReadableStream(h(ns[name], props), { onError: (e) => errs.push(e.message) });
    const html = await new Response(stream).text();
    const warn = warnings.filter((w) => /Warning:/.test(w));
    if (errs.length || warn.length) { fail++; console.log("FAIL", name, "-", (errs[0] || warn[0]).split("\n")[0]); }
    else console.log("OK  ", name, `(${html.length}b)`);
  } catch (e) { fail++; console.log("FAIL", name, "-", String(e.message).split("\n")[0]); }
}
const missing = names.filter((n) => !PROPS[n]);
if (missing.length) console.log("\nNo sample props for:", missing.join(", "));
console.log(fail ? `\n${fail} FAILED` : `\nALL ${tested} COMPONENTS RENDERED CLEAN`);
process.exit(fail ? 1 : 0);
