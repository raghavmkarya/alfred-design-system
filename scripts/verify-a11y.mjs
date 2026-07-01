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
