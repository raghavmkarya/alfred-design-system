/* Playground contract — the docs playground is generated from the .d.ts files,
   so it can go stale in ways nothing else catches: a component added without
   regenerating, a prop renamed, or a `@default` that is prose rather than a
   value being fed to a component as a literal (that last one broke 7 components
   before this check existed).

   Checks:
     1. playground/props.json is a deterministic rebuild of the .d.ts files
     2. every component in the bundle manifest appears in it
     3. no default is emitted for a prop the playground can't control, and every
        emitted default actually matches its prop's type
     4. the static page files it needs are present and reference each other

   Run: node scripts/verify-playground.mjs */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const fails = [];

/* 1 — the committed artifact matches a fresh generate */
const before = rd("playground/props.json");
execFileSync("node", ["scripts/gen-playground.mjs"], { cwd: ROOT, stdio: "pipe" });
const after = rd("playground/props.json");
if (before !== after) {
  fs.writeFileSync(path.join(ROOT, "playground/props.json"), before);   // leave the tree as found
  fails.push("playground/props.json is stale — run `node scripts/gen-playground.mjs` and commit the result");
} else {
  console.log("OK   freshness   — props.json matches a clean regenerate");
}

const data = JSON.parse(after);
const manifest = JSON.parse(rd("_ds_manifest.json"));

/* 2 — coverage */
const have = new Set(data.components.map((c) => c.name));
const missing = manifest.components.map((c) => c.name).filter((n) => !have.has(n));
if (missing.length) fails.push(`not in the playground: ${missing.join(", ")}`);
else console.log(`OK   coverage    — all ${manifest.components.length} components present`);

/* 3 — defaults are values, not prose */
const badDefaults = [];
for (const c of data.components) {
  for (const p of c.props) {
    if (p.default === undefined) continue;
    if (!p.control) { badDefaults.push(`${c.name}.${p.name} (no control)`); continue; }
    const k = p.control.kind;
    const ok =
      k === "boolean" ? typeof p.default === "boolean" :
      k === "number" ? typeof p.default === "number" :
      k === "select" ? p.control.options.includes(p.default) :
      typeof p.default === "string";
    if (!ok) badDefaults.push(`${c.name}.${p.name} = ${JSON.stringify(p.default)} (${k})`);
  }
}
if (badDefaults.length) fails.push(`defaults that don't match their prop type: ${badDefaults.join(", ")}`);
else console.log(`OK   defaults    — every emitted default matches its control's type`);

/* 4 — the page itself */
const need = [
  ["playground/index.html", [/playground\.js/, /playground\.css/, /_ds_bundle\.js/, /styles\.css/]],
  ["playground/playground.js", [/props\.json/, /AlfredAIDesignSystem_/]],
  ["playground/playground.css", [/\.pg-canvas/]],
];
for (const [file, pats] of need) {
  let src = "";
  try { src = rd(file); } catch { fails.push(`${file} is missing`); continue; }
  for (const re of pats) if (!re.test(src)) fails.push(`${file} no longer references ${re}`);
}
// the canvas must contain fixed-position overlays or a previewed Modal covers the page
if (!/contain:\s*layout paint/.test(rd("playground/playground.css"))) {
  fails.push("playground.css: .pg-canvas must keep `contain: layout paint` so position:fixed overlays (Modal/Drawer/Toast) stay inside the preview");
}
if (!fails.some((f) => f.startsWith("playground/"))) console.log("OK   page        — index/js/css present and wired");

/* 5 — the vendored React

   This page is published, so it cannot load React from node_modules the way
   tests/harness.html does, and it no longer loads it from a CDN either. The
   committed copies must therefore stay byte-identical to the installed version,
   or the docs page silently runs a different React from everything else here —
   the exact drift a CDN pin was there to prevent. */
const reactVersion = JSON.parse(rd("node_modules/react/package.json")).version;
const vendored = [
  [`playground/vendor/react-${reactVersion}.production.min.js`, "node_modules/react/umd/react.production.min.js"],
  [`playground/vendor/react-dom-${reactVersion}.production.min.js`, "node_modules/react-dom/umd/react-dom.production.min.js"],
];
let vendorOk = true;
const page = (() => { try { return rd("playground/index.html"); } catch { return ""; } })();
if (/unpkg\.com|cdn\.jsdelivr|cdnjs\./.test(page)) {
  fails.push("playground/index.html loads a script from a CDN — it is a published page and must be self-contained");
  vendorOk = false;
}
for (const [committed, installed] of vendored) {
  let a, b;
  try { a = fs.readFileSync(committed); } catch {
    fails.push(`${committed} is missing — copy it from ${installed} (the filename carries the version, so a React bump renames it)`);
    vendorOk = false; continue;
  }
  b = fs.readFileSync(installed);
  if (!a.equals(b)) {
    fails.push(`${committed} differs from the installed ${installed} — re-copy it`);
    vendorOk = false;
  }
  if (!page.includes(path.basename(committed))) {
    fails.push(`playground/index.html does not load ${path.basename(committed)}`);
    vendorOk = false;
  }
}
if (vendorOk) console.log(`OK   vendor      — React ${reactVersion} committed and byte-identical to the installed copy`);

if (fails.length) {
  console.log("");
  for (const f of fails) console.log("FAIL " + f);
  console.log(`\n${fails.length} PLAYGROUND CONTRACT FAILURE(S)`);
  process.exit(1);
}
console.log(`\nPLAYGROUND CONTRACT HOLDS (${data.components.length} components, ${data.$meta.editableProps} editable props)`);
