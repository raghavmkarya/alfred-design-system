/* Verify the Inspiration Library: schema integrity, artifact freshness, and a
   data-driven SSR pass over every section × variant. Sections are verified
   from library/sections.json, NOT from a hardcoded list, so a new category
   lands with full render coverage and no registration step.
   Run: node scripts/verify-library.mjs */
import fs from "node:fs";
import path from "node:path";
import { readMetas, buildArtifacts, ssrHarness } from "./gen-library.mjs";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const fails = [];
const ok = (label, msg) => console.log("OK  ", label, "—", msg);

/* —— 1 · meta schema integrity ————————————————————————————————— */
const metas = readMetas();
const ids = new Set();
const orders = new Set();
const PAGE_TYPES = new Set(["landing", "feature", "pricing", "blog", "resource", "gated", "comparison", "legal", "any"]);
for (const m of metas) {
  const where = m.__file;
  if (!m.category?.id || !m.category?.name || typeof m.category?.order !== "number") {
    fails.push(`${where}: category needs id, name and a numeric order`);
    continue;
  }
  if (orders.has(m.category.order)) fails.push(`${where}: duplicate category order ${m.category.order}`);
  orders.add(m.category.order);
  if (m.category.icon && !fs.existsSync(path.join(ROOT, "assets/icons", m.category.icon + ".svg"))) {
    fails.push(`${where}: category icon "${m.category.icon}" is not in assets/icons/`);
  }
  for (const s of m.sections || []) {
    const at = `${where} → ${s.id || "?"}`;
    if (!s.id || ids.has(s.id)) fails.push(`${at}: missing or duplicate section id`);
    ids.add(s.id);
    if (!/^lib[A-Z]/.test(s.global || "") && !/^Lib[A-Z]/.test(s.global || "")) fails.push(`${at}: global must be Lib-prefixed, got "${s.global}"`);
    if (![1, 2, 3].includes(s.tier)) fails.push(`${at}: tier must be 1, 2 or 3`);
    if (!s.description || s.description.length < 20) fails.push(`${at}: description missing or too thin to catalog`);
    if (!Array.isArray(s.pageTypes) || !s.pageTypes.length) fails.push(`${at}: pageTypes required`);
    for (const p of s.pageTypes || []) if (!PAGE_TYPES.has(p)) fails.push(`${at}: unknown pageType "${p}"`);
    if (!s.file?.startsWith("library/sections/") || !s.file.endsWith(".js")) fails.push(`${at}: file must be a library/sections/*.js twin`);
    else if (!fs.existsSync(path.join(ROOT, s.file))) fails.push(`${at}: ${s.file} does not exist — run node scripts/build-kits.mjs`);
    if (!Array.isArray(s.variants) || !s.variants.length) fails.push(`${at}: at least one variant (the default) is required`);
    for (const v of s.variants || []) if (!v.id) fails.push(`${at}: variant without an id`);
    for (const u of s.usedBy || []) {
      if (!u.site) fails.push(`${at}: usedBy entry without a site`);
      if (u.url && !/^https:\/\//.test(u.url)) fails.push(`${at}: usedBy url must be https, got "${u.url}"`);
    }
  }
}
if (!fails.length) ok("meta", `${metas.length} categories, ${ids.size} sections, schema clean`);

/* —— 2 · committed artifacts match a clean rebuild ————————————— */
let artifacts = null;
try {
  artifacts = await buildArtifacts();
  const stale = [];
  for (const [rel, next] of artifacts) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs) || fs.readFileSync(abs, "utf8") !== next) stale.push(rel);
  }
  const expected = new Set([...artifacts.keys()].filter((f) => f.startsWith("library/export/")).map((f) => path.basename(f)));
  const exportDir = path.join(ROOT, "library/export");
  for (const f of fs.existsSync(exportDir) ? fs.readdirSync(exportDir) : []) {
    if (f.endsWith(".html") && !expected.has(f)) stale.push(`library/export/${f} (orphan)`);
  }
  if (stale.length) fails.push(`stale library artifacts — run \`node scripts/gen-library.mjs\` and commit:\n  ${stale.join("\n  ")}`);
  else ok("artifacts", "sections.json and export/ match a clean rebuild");
} catch (e) {
  fails.push(`artifact rebuild threw: ${String(e.message).split("\n")[0]}`);
}

/* —— 3 · SSR every section × variant (markup is theme-independent) ——— */
if (artifacts) {
  const harness = ssrHarness();
  let rendered = 0;
  for (const m of metas) {
    for (const s of m.sections || []) {
      try { harness.loadJsx(s.file.replace(/\.js$/, ".jsx")); }
      catch (e) { fails.push(`${s.file}: source failed to load — ${String(e.message).split("\n")[0]}`); continue; }
      for (const v of s.variants || []) {
        try {
          const html = await harness.render(s.global, v.props || {});
          if (html.length < 200) fails.push(`${s.id}/${v.id}: rendered suspiciously little markup (${html.length}b)`);
          rendered++;
        } catch (e) {
          fails.push(`${s.id}/${v.id}: SSR failed — ${String(e.message).split("\n")[0]}`);
        }
      }
    }
  }
  if (!fails.some((f) => f.includes("SSR failed"))) ok("render", `${rendered} section variants server-rendered clean`);
}

/* —— 4 · the app's static surface is wired together ————————————— */
const page = (f) => fs.readFileSync(path.join(ROOT, "library", f), "utf8");
const wiring = [
  ["index.html", "app.js", "the app script"],
  ["index.html", "library.css", "the app stylesheet"],
  ["index.html", "../vendor/react-18.3.1.production.min.js", "vendored React"],
  ["app.js", "sections.json", "the schema"],
  ["app.js", "preview.html", "the preview frame"],
  ["preview.html", "sections.json", "the schema"],
  ["preview.html", "../vendor/react-18.3.1.production.min.js", "vendored React"],
  ["preview.html", "../_ds_bundle.js", "the component bundle"],
];
let wired = true;
for (const [f, needle, what] of wiring) {
  if (!page(f).includes(needle)) { fails.push(`library/${f} no longer references ${needle} (${what})`); wired = false; }
}
for (const f of ["index.html", "preview.html"]) {
  if (/unpkg|jsdelivr|cdnjs|https:\/\/cdn/.test(page(f))) { fails.push(`library/${f} points at a CDN — vendored files only`); wired = false; }
}
if (wired) ok("wiring", "index/app/preview reference each other and no CDN");

if (fails.length) {
  console.log("\nFAIL library —");
  for (const f of fails) console.log("  •", f);
  process.exit(1);
}
console.log("\nLIBRARY VERIFIED CLEAN");
