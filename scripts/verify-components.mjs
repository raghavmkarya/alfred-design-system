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
import { sampleProps } from "./sample-props.mjs";
// Representative props for every component (shared with gen-playground.mjs).
const PROPS = sampleProps(h, noop);

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
