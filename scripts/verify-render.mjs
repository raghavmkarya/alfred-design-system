/* Render-verify the design-system JSX kits against the real _ds_bundle.js.
   Loads React + the browser server build + Babel standalone from unpkg,
   evaluates the bundle, then server-renders each named component, failing on
   any render error or React warning. Run: `node scripts/verify-render.mjs` */
import fs from "node:fs";
import vm from "node:vm";
import { TextEncoder, TextDecoder } from "node:util";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (f) => fs.readFileSync(ROOT + f, "utf8");
const get = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(u + " " + r.status); return r.text(); };

// Each entry: [jsxFile, [exported window globals to render]]
const KITS = [
  ["ui_kits/app/Screens.jsx", ["KpiCockpit", "SpendRoi", "AlertsInbox", "Integrations", "SettingsScreen"]],
  ["ui_kits/app/Screens2.jsx", ["DailyBrief", "SeekAlfred", "CreativeLifecycle", "AiVisibility"]],
  ["ui_kits/onboarding/Onboarding.jsx", ["OnboardingFlow"]],
  ["ui_kits/website/SiteTop.jsx", ["SiteNav", "Hero", "AlfredCore", "Products"]],
  ["ui_kits/website/SiteBottom.jsx", ["HowItWorks", "Outcomes", "Security", "Faq", "CTA", "SiteFooter"]],
  ["templates/sections/SectionsA.jsx", ["SecLogoCloud", "SecBentoGrid", "SecFeatureSplit", "SecComparison"]],
  ["templates/sections/SectionsB.jsx", ["SecPricingTiers", "SecTestimonial", "SecIntegrationsGrid", "SecWaitlistCTA"]],
  ["templates/sections/SectionsC.jsx", ["SecPricingComparison", "SecBlogGrid", "SecChangelog"]],
  ["templates/sections/SectionsD.jsx", ["SecHero", "SecStatement", "SecClosingCTA", "SecFaq"]],
  ["templates/sections/SectionsE.jsx", ["SecSecurityGrid", "SecTeamGrid", "SecValuesGrid", "SecCareers", "SecStoryEditorial"]],
  ["templates/sections/SectionsF.jsx", ["SecContactSplit", "SecIndustryCards", "SecAgentShowcase", "SecEnterpriseBand", "SecStackDiagram", "SecTimeline", "SecSourcedStats"]],
  ["ui_kits/app/Screens3.jsx", ["ConnectionFlow", "ConnectionHealth", "FirstRunWaiting", "NotificationsCenter", "AlertDetail"]],
  ["ui_kits/app/Screens4.jsx", ["SettingsProfile", "TeamPermissions", "BillingPlans", "MemoryCore", "AuditLog"]],
];

const [reactSrc, serverSrc, babelSrc] = await Promise.all([
  get("https://unpkg.com/react@18.3.1/umd/react.development.js"),
  get("https://unpkg.com/react-dom@18.3.1/umd/react-dom-server.browser.development.js"),
  get("https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"),
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
const exec = (code, name) => vm.runInContext(code, ctx, { filename: name });

exec(reactSrc, "react.js"); exec(serverSrc, "server.js"); exec(babelSrc, "babel.js");
const { React, ReactDOMServer: Server, Babel } = ctx;
exec(read("_ds_bundle.js"), "_ds_bundle.js");
const ns = ctx.AlfredAIDesignSystem_1ce241;
if (ns.__errors?.length) { console.log("BUNDLE component errors:", ns.__errors.length); process.exit(2); }

// Emulate babel-standalone per-<script> isolation by wrapping each file in a function scope.
const load = (f) => exec("(function(){\n" + Babel.transform(read(f), { presets: ["react"], filename: f }).code + "\n})()", f);
for (const [f] of KITS) load(f);

let fail = 0;
for (const [f, names] of KITS) {
  for (const name of names) {
    warnings.length = 0;
    const Comp = ctx[name];
    try {
      if (typeof Comp !== "function") throw new Error("not exported on window");
      const errs = [];
      const stream = await Server.renderToReadableStream(React.createElement(Comp), { onError: (e) => errs.push(e.message) });
      const html = await new Response(stream).text();
      const warn = warnings.filter((w) => /Warning:/.test(w));
      if (errs.length || warn.length) { fail++; console.log("FAIL", name, "-", (errs[0] || warn[0]).split("\n")[0]); }
      else console.log("OK  ", name, `(${html.length}b)`);
    } catch (e) { fail++; console.log("FAIL", name, "-", String(e.message).split("\n")[0]); }
  }
}
console.log(fail ? `\n${fail} FAILED` : `\nALL ${KITS.reduce((n, [, x]) => n + x.length, 0)} COMPONENTS RENDERED CLEAN`);
process.exit(fail ? 1 : 0);
