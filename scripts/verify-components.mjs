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
};

const names = Object.keys(ns).filter((k) => !k.startsWith("__") && typeof ns[k] === "function");
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
