/* Accessibility contract check — server-renders the interactive components
   against the real _ds_bundle.js and asserts the ARIA/semantics each one is
   required to emit (roles, aria-* wiring, live regions, native inputs).
   Complements verify-components.mjs (render health) — this guards the
   contracts themselves so a refactor can't silently drop them.
   Run: node scripts/verify-a11y.mjs */
import fs from "node:fs";
import vm from "node:vm";
import { TextEncoder, TextDecoder } from "node:util";

const ROOT = new URL("..", import.meta.url).pathname;
const get = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(u + " " + r.status); return r.text(); };

const [reactSrc, serverSrc] = await Promise.all([
  get("https://unpkg.com/react@18.3.1/umd/react.development.js"),
  get("https://unpkg.com/react-dom@18.3.1/umd/react-dom-server.browser.development.js"),
]);

const mkdoc = () => new Proxy(function () {}, { get: () => mkdoc(), apply: () => mkdoc() });
const ctx = {
  console: { ...console, error: () => {}, warn: () => {} },
  setTimeout, clearTimeout, queueMicrotask, TextEncoder, TextDecoder, ReadableStream,
  MessageChannel: class { constructor() { this.port1 = { postMessage() {}, close() {} }; this.port2 = { postMessage() {}, close() {} }; } },
};
ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx; ctx.document = mkdoc(); ctx.navigator = { userAgent: "node" };
vm.createContext(ctx);
vm.runInContext(reactSrc, ctx); vm.runInContext(serverSrc, ctx);
const { React, ReactDOMServer: Server } = ctx;
vm.runInContext(fs.readFileSync(ROOT + "_ds_bundle.js", "utf8"), ctx);
const ns = ctx.AlfredAIDesignSystem_1ce241;

const h = React.createElement;
const noop = () => {};

/* Each case: component name, props, and the patterns its rendered HTML MUST
   contain. Keyed by a label so one component can be checked in several states. */
const CASES = [
  ["Modal (open)", "Modal", { open: true, title: "Reallocate budget", children: "x", onClose: noop },
    [/role="dialog"/, /aria-modal="true"/, /aria-labelledby="/]],
  ["Drawer (open)", "Drawer", { open: true, title: "Filters", children: "x", onClose: noop },
    [/role="dialog"/, /aria-labelledby="/]],
  ["Menu", "Menu", { items: [{ label: "Edit" }, { divider: true }, { label: "Delete", danger: true }] },
    [/role="menu"/, /role="menuitem"/, /role="separator"/]],
  ["Popover (open)", "Popover", { open: true, trigger: h("button", null, "Open"), children: "x", onOpenChange: noop },
    [/role="dialog"/, /aria-expanded="true"/, /aria-controls="/]],
  ["Toast (success)", "Toast", { tone: "success", title: "Saved", children: "x", onClose: noop },
    [/role="status"/, /aria-live="polite"/, /aria-atomic="true"/]],
  ["Toast (danger)", "Toast", { tone: "danger", title: "Failed", children: "x", onClose: noop },
    [/role="alert"/]],
  ["Banner (warning)", "Banner", { tone: "warning", title: "Pacing hot", children: "x", onDismiss: noop },
    [/role="status"/, /aria-live="polite"/]],
  ["Banner (danger)", "Banner", { tone: "danger", title: "Sync failed", children: "x" },
    [/role="alert"/]],
  ["Tabs", "Tabs", { tabs: [{ id: "a", label: "A" }, { id: "b", label: "B" }], value: "a", onChange: noop },
    [/role="tablist"/, /role="tab"/, /aria-selected="true"/, /tabindex="-1"/i]],
  ["SearchInput (open)", "SearchInput", { value: "", onChange: noop, onSelect: noop, open: true, results: [{ label: "Why did CAC rise?", hint: "diagnose" }] },
    [/role="combobox"/, /aria-expanded="true"/, /aria-autocomplete="list"/, /role="listbox"/, /role="option"/]],
  ["CommandPalette", "CommandPalette", { suggestions: [{ label: "Forecast Q3 pipeline", hint: "forecast" }] },
    [/role="combobox"/, /role="listbox"/, /role="option"/]],
  ["Switch", "Switch", { checked: true, label: "Alerts", onChange: noop },
    [/role="switch"/]],
  ["Checkbox", "Checkbox", { checked: true, label: "Remember me", onChange: noop },
    [/type="checkbox"/]],
  ["RadioGroup", "RadioGroup", { label: "Plan", options: [{ value: "s", label: "Starter" }, { value: "g", label: "Growth" }], value: "g", onChange: noop },
    [/role="radiogroup"/, /role="radio"/, /aria-checked="true"/]],
  ["SegmentedControl", "SegmentedControl", { options: [{ value: "d", label: "Day" }, { value: "w", label: "Week" }], value: "d", onChange: noop },
    [/role="radiogroup"/, /role="radio"/]],
  ["Pagination", "Pagination", { page: 3, pageCount: 12, onChange: noop },
    [/aria-label="Pagination"/, /aria-current="page"/, /aria-label="Previous page"/]],
  ["DataTable (selectable)", "DataTable", { selectable: true, columns: [{ key: "n", header: "Campaign" }, { key: "v", header: "ROAS", align: "right" }], rows: [{ n: "PMax", v: "5.1x" }] },
    [/aria-label="Select all rows"/, /aria-label="Select row/]],
  ["Table", "Table", { columns: [{ key: "n", header: "Campaign" }], rows: [{ n: "PMax" }] },
    [/scope="col"/]],
  ["Accordion", "Accordion", { defaultOpen: ["a"], items: [{ id: "a", title: "Why?", content: "Because." }, { id: "b", title: "How?", content: "Like this." }] },
    [/aria-expanded="true"/, /aria-controls="/, /role="region"/]],
  ["Combobox", "Combobox", { label: "Campaign", options: [{ value: "p", label: "PMax" }], value: "p", onChange: noop },
    [/role="combobox"/, /aria-autocomplete="list"/]],
  ["Spinner", "Spinner", { label: "Loading" },
    [/role="status"/]],
  ["ProgressRing", "ProgressRing", { value: 72, label: "Attained" },
    [/role="progressbar"/, /aria-valuenow="72"/]],
  ["NumberInput", "NumberInput", { label: "Cap", value: 45, onChange: noop, min: 0, max: 100 },
    [/role="spinbutton"/, /aria-label="Decrease"/, /aria-label="Increase"/]],
  ["Callout", "Callout", { title: "I'd watch pacing", children: "x" },
    [/role="note"/]],
  ["Divider (label)", "Divider", { label: "Earlier today" },
    [/role="separator"/]],
  ["Kbd", "Kbd", { children: "K" },
    [/<kbd/]],

  // —— 2026-07 wave 1 ——
  ["DashboardMock", "DashboardMock", {},
    [/role="img"/, /aria-label="Product preview"/, /Campaign burning \$4\.8K/]],
  ["EyebrowBadge", "EyebrowBadge", { children: "Decision intelligence", tone: "brand" },
    [/aria-hidden="true"/, /text-transform:uppercase/, /letter-spacing:var\(--ls-caps\)/, /Decision intelligence/]],
  ["DotMatrix", "DotMatrix", { height: 220, density: 0.14, speed: 90, tone: "brand" },
    [/aria-hidden="true"/, /<svg/, /var\(--orange-500\)/, /url\(#/]],
  ["OfferSwitch", "OfferSwitch", { checked: true, onChange: noop, label: "50% launch offer applied", detail: "for your first 2 months" },
    [/role="switch"/, /aria-checked="true"/, /aria-labelledby=/, /aria-describedby=/]],
  ["PriceCard", "PriceCard", { name: "Growth", price: "249", anchorPrice: "499", period: "/month", badge: "MOST POPULAR", features: ["8 team seats", "500 AI chat queries a month", "Full chat access with write-back", "Spend mix analysis with full simulation", "Priority support, 1-day SLA"], cta: { label: "Start with Growth", onClick: noop }, highlighted: true, footnote: "Launch offer — 50% off your first two months." },
    [/aria-label="Growth plan"/, /type="button"/, /aria-hidden="true"/, /<ul/]],
  ["IntegrationCard", "IntegrationCard", { name: "Google Ads", body: "I pull spend, conversions and quality scores every hour to catch budget drift early.", status: "live", href: "#", onClick: noop },
    [/<a[^>]*href="#"/, /aria-label="Learn more about Google Ads"/, /aria-hidden="true"/, />Live</]],
  ["CategoryCountBadge", "CategoryCountBadge", { count: 5, label: "Ad platforms" },
    [/>05</, /var\(--font-mono\)/, /aria-hidden="true"[^>]*>·</, /Ad platforms/]],
  ["Countdown", "Countdown", { target: "2026-09-15T09:00:00Z" },
    [/role="timer"/, /aria-label="Launch countdown/, /aria-hidden="true"/, />Days</]],
  ["AvatarStack", "AvatarStack", { names: ["Priya Menon", "Daniel Okafor", "Mei Lin", "Sofia Alvarez", "James Carter", "Ana Ribeiro", "Tom Hale"], label: "2,300+ people already joined" },
    [/role="group"/, /aria-label="2,300\+ people already joined"/, /aria-hidden="true"/, /\+(<!-- -->)?3/]],
  ["CapabilityTicker", "CapabilityTicker", { items: ["Budget reallocation", "CAC diagnosis", "Pipeline forecasting", "Creative fatigue alerts", "Spend pacing guardrails", "Channel mix planning"], speed: 36 },
    [/role="list"/, /aria-label="Alfred capabilities"/, /overflow:hidden/, /Pipeline forecasting/]],
  ["AnimatedCounter", "AnimatedCounter", { value: 128, prefix: "$", suffix: "M", label: "Budget under management", sublabel: "Optimized across 40 accounts" },
    [/role="figure"/, /aria-hidden="true"/, /\$128M/, /aria-label="\$128M — Budget under management/]],
  ["JobListingRow", "JobListingRow", { title: "Senior product designer", team: "Design", location: "London or remote", type: "Full-time", href: "/careers/senior-product-designer", onClick: noop },
    [/<a[^>]*href="\/careers\/senior-product-designer"/, /Senior product designer/, /aria-hidden="true"/, /stroke-width="1.7"/]],
  ["ModuleStatusCard", "ModuleStatusCard", { module: "Alfred for Marketing", slogan: "Read less, know more", status: "live", agents: ["Spend anomaly agent", "Budget pacing agent", "Creative fatigue agent"], cta: "Explore the module", href: "#", onClick: noop },
    [/<h3/, /role="list"/, /<a [^>]*href="#"/, /aria-hidden="true"/]],
  ["ProvenancePanel", "ProvenancePanel", { sources: [{ name: "GA4", detail: "sessions", status: "live" }, { name: "Google Ads", detail: "spend", status: "live" }, { name: "HubSpot", detail: "pipeline", status: "syncing" }], confidence: 82, method: "I compared 90 days of spend pacing against lead quality and isolated the paid-social audience change.", updated: "6m ago", defaultOpen: true },
    [/aria-expanded="true"/, /aria-controls="prov-[^"]*-panel"/, /role="region"/, /role="meter"/]],
  ["InsightFeedback", "InsightFeedback", { onFeedback: noop },
    [/role="group"/, /aria-live="polite"/, /aria-label="Not useful"/, /stroke="currentColor"/]],
  ["ReasoningState", "ReasoningState", { lines: ["Reading your spend data…", "Isolating what changed…", "Drafting the move…"], elapsed: "8s" },
    [/role="status"/, /aria-live="polite"/, /Reading your spend data/]],
  ["ConnectionHealthCard", "ConnectionHealthCard", { name: "Google Ads", status: "error", lastSync: "42m ago", scopes: ["Ads read", "Reporting"], detail: "I can't refresh spend — the OAuth token expired, so today's pacing may be off.", onReconnect: noop },
    [/role="group"/, /aria-label="Google Ads connection"/, /role="list"/, /Reconnect/]],
  ["SyncStatusBadge", "SyncStatusBadge", { status: "syncing" },
    [/role="status"/, />Syncing</, /aria-hidden="true"/, /prefers-reduced-motion/]],
  ["UsageMeter", "UsageMeter", { label: "Decision runs", used: 8400, limit: 10000, unit: "runs", footnote: "Resets 1 Aug — I'll flag you before you hit the cap." },
    [/role="progressbar"/, /aria-valuenow="8400"/, /aria-valuemax="10000"/, /aria-valuetext="8,400 of 10,000 runs used"/]],
  ["UpgradeModal", "UpgradeModal", { open: true, onClose: noop, cta: { label: "Upgrade to Growth", onClick: noop }, secondaryCta: { label: "Not now", onClick: noop } },
    [/role="dialog"/, /aria-modal="true"/, /aria-label="Close"/, /role="list"/]],
  ["AuditLogRow", "AuditLogRow", { actor: "Alfred", isAlfred: true, action: "reallocated budget to", target: "Performance Max — Q3", time: "Today, 09:42", detail: "I moved $18K from brand search into Performance Max after CAC rose 22% week over week. This stayed under the $25K auto-approval threshold, so no sign-off was needed." },
    [/aria-expanded="false"/, /aria-controls="alr-[^"]*-panel"/, /role="region"/, /aria-label="Show detail"/]],
  ["MemoryCard", "MemoryCard", { fact: "Paid social CAC runs 18% higher in weeks when promo emails and prospecting flights overlap.", source: "Learned from HubSpot · Mar 12", category: "Root cause", onConfirm: noop, onEdit: noop, onRemove: noop },
    [/aria-label="Alfred memory"/, /aria-live="polite"/, /Confirm<\/button>/, /Remove<\/button>/]],
  ["ModuleSwitcher", "ModuleSwitcher", { modules: [{ id: "marketing", label: "Marketing", status: "live" }, { id: "sales", label: "Sales", status: "in-development" }], active: "marketing", onChange: noop, defaultOpen: true },
    [/aria-haspopup="menu"/, /role="menu"/, /role="menuitemradio"/, /aria-checked="true"/]],
  ["TeamMemberRow", "TeamMemberRow", { name: "Priya Menon", email: "priya@acmecorp.com", role: "Admin", status: "active", onRoleChange: noop, onRemove: noop },
    [/aria-label="Role for Priya Menon"/, /aria-label="Remove Priya Menon"/, /<select/, />Admin<\/option>/]],
  ["BillingPlanCard", "BillingPlanCard", { plan: "Growth", price: "$299", period: "per month", renewal: "Renews Aug 2 · Visa ·· 4242", usage: [{ label: "Decision runs", used: 1840, limit: 2500 }, { label: "Data sources", used: 6, limit: 10 }, { label: "Seats", used: 8, limit: 10 }], onManage: noop, onUpgrade: noop },
    [/role="group"/, /aria-label="Growth plan"/, /<dl/, /<button[^>]*type="button"/]],
  ["NotificationPref", "NotificationPref", { agent: "Budget pacing agent", description: "I flag campaigns pacing more than 8% over or under plan.", channels: { email: true, slack: true, inApp: false }, onChange: noop },
    [/role="group"/, /aria-label="Budget pacing agent notification channels"/, /role="switch"/, /Budget pacing agent via email/]],
  ["StateBlock", "StateBlock", { kind: "error", title: "I couldn't refresh your spend data", body: "The Google Ads sync timed out — retry and I'll pull the numbers again.", action: { label: "Retry sync", onClick: noop } },
    [/role="alert"/, /aria-hidden="true"/, /<button[^>]*type="button"/]],

  // —— 2026-07 wave 2: core interactive + form errors + nav + conversation ——
  ["Button", "Button", { children: "Reallocate budget", onClick: noop },
    [/<button type="button"/, />Reallocate budget<\/button>/]],
  ["IconButton (icon-only)", "IconButton", { name: "sliders", label: "Filter results", onClick: noop },
    [/<button[^>]*aria-label="Filter results"/, /role="img"/]],
  ["Input (labelled)", "Input", { label: "Monthly budget cap", type: "text", value: "45000", onChange: noop },
    [/<label for="in-monthly-budget-cap"/, /<input id="in-monthly-budget-cap"/, /type="text"/]],
  ["Input (error)", "Input", { label: "Work email", type: "email", value: "x", error: "That doesn't look right", onChange: noop },
    [/aria-invalid="true"/, /aria-describedby="in-work-email-error"/, /<span id="in-work-email-error" role="alert"/]],
  ["Textarea (labelled)", "Textarea", { label: "Note to Alfred", value: "Watch pacing", onChange: noop, maxLength: 280, showCount: true },
    [/<label for="ta-note-to-alfred"/, /<textarea id="ta-note-to-alfred"/, /maxLength="280"/]],
  ["Textarea (error)", "Textarea", { label: "Note to Alfred", value: "x", error: "Add a bit more detail", onChange: noop },
    [/aria-invalid="true"/, /aria-describedby="ta-note-to-alfred-error"/, /<span id="ta-note-to-alfred-error" role="alert"/]],
  ["Select (labelled)", "Select", { label: "Attribution window", value: "28d", onChange: noop, options: [{ value: "7d", label: "7 days" }, { value: "28d", label: "28 days" }] },
    [/<label for="sel-attribution-window"/, /<select id="sel-attribution-window"/, /aria-hidden="true"/]],
  ["Select (error)", "Select", { label: "Attribution window", value: "", error: "Choose a window", onChange: noop, options: [{ value: "7d", label: "7 days" }] },
    [/aria-invalid="true"/, /aria-describedby="sel-attribution-window-error"/, /<span id="sel-attribution-window-error" role="alert"/]],
  ["Slider", "Slider", { label: "Daily cap", value: 4500, min: 0, max: 20000, step: 100, onChange: noop },
    [/type="range"/, /min="0"/, /max="20000"/, /aria-label="Daily cap"/]],
  ["TagInput (labelled)", "TagInput", { label: "Audiences", value: ["Prospecting", "Retargeting"], onChange: noop },
    [/role="group"/, /aria-labelledby="tag-lb-[^"]+"/, /<label id="tag-lb-[^"]+" for="tag-in-[^"]+"/, /aria-live="polite"/]],
  ["FileDropzone", "FileDropzone", { title: "Drop your spend export to connect it", accept: ".csv,.xlsx", multiple: true, files: [{ name: "google-ads-q3.csv", size: "1.2 MB", status: "done" }] },
    [/<label for="([^"]+)"[\s\S]*?<input id="\1" type="file"/, /accept=".csv,.xlsx"/, /multiple=""/, /aria-hidden="true"/]],
  ["ProgressBar", "ProgressBar", { value: 68, label: "Onboarding progress" },
    [/role="progressbar"/, /aria-valuenow="68"/, /aria-valuemin="0"/, /aria-valuemax="100"/, /aria-label="Onboarding progress"/]],
  ["Stepper", "Stepper", { current: 1, steps: [{ label: "Connect data" }, { label: "Set goals" }, { label: "Review" }] },
    [/role="list"/, /role="listitem"/, /aria-current="step"/, /aria-label="Step 2: Set goals, current step"/]],
  ["Breadcrumb", "Breadcrumb", { items: [{ label: "Home", href: "/" }, { label: "Campaigns", href: "/campaigns" }, { label: "Performance Max" }] },
    [/<nav aria-label="Breadcrumb"/, /<a href="\/campaigns"/, /aria-current="page"/]],
  ["NotificationItem (interactive)", "NotificationItem", { title: "I've flagged a budget risk", body: "Performance Max is pacing 14% hot.", tone: "warning", unread: true, onClick: noop, actions: [{ label: "Review", onClick: noop }, { label: "Dismiss", onClick: noop }] },
    [/role="button"/, /tabindex="0"/, /aria-label="Unread"/, /<button type="button"[^>]*>Review<\/button>/]],
  ["FaqItem (open)", "FaqItem", { question: "How does Alfred decide what to reallocate?", defaultOpen: true, children: "I compare pacing against outcomes." },
    [/type="button"/, /aria-expanded="true"/, /aria-controls="([^"]+)"[\s\S]*?id="\1" aria-hidden="false"/]],
  ["FaqItem (closed)", "FaqItem", { question: "Can I override a move?", children: "Yes — every decision is reversible." },
    [/type="button"/, /aria-expanded="false"/, /aria-controls="([^"]+)"[\s\S]*?id="\1" aria-hidden="true"/, /inert=""/]],
  ["ConfidenceMeter", "ConfidenceMeter", { value: 82, label: "Causal confidence" },
    [/role="meter"/, /aria-valuenow="82"/, /aria-valuemin="0"/, /aria-valuemax="100"/, /aria-label="Causal confidence: 82% confident, high confidence"/]],
  ["Sidebar", "Sidebar", { active: "spend", onSelect: noop, items: [{ id: "home", label: "Home" }, { id: "spend", label: "Spend", badge: 3 }, { id: "team", label: "Team" }] },
    [/<nav aria-label="Primary"/, /<button type="button"/, /aria-current="page"/]],
  ["SeekComposer", "SeekComposer", { placeholder: "Ask Alfred anything about your marketing…", suggestions: ["Why did CAC rise last week?"], onSubmit: noop },
    [/<textarea[^>]*aria-label="Ask Alfred"/, /title="Add context" aria-label="Add context"/, /disabled="" aria-label="Send to Alfred"/]],
  ["PromptSuggestions", "PromptSuggestions", { title: "Try asking", onSelect: noop, suggestions: ["Where should I move budget?", "Which creatives are fatiguing?"] },
    [/<button type="button"/, /aria-hidden="true"/, />Where should I move budget\?<\/span>/]],
];

let fail = 0;
for (const [label, name, props, patterns] of CASES) {
  const C = ns[name];
  if (!C) { fail++; console.log("FAIL", label, "- component missing from bundle"); continue; }
  try {
    const stream = await Server.renderToReadableStream(h(C, props));
    const html = await new Response(stream).text();
    const missed = patterns.filter((re) => !re.test(html));
    if (missed.length) { fail++; console.log("FAIL", label, "- missing", missed.map(String).join(" ")); }
    else console.log("OK  ", label);
  } catch (e) { fail++; console.log("FAIL", label, "-", String(e.message).split("\n")[0]); }
}
console.log(fail ? `\n${fail} CONTRACT(S) BROKEN` : `\nALL ${CASES.length} ACCESSIBILITY CONTRACTS HOLD`);
process.exit(fail ? 1 : 0);
