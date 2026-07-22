/* ============================================================
   Alfred design system — bundle compiler.
   Compiles every component source under components/ into _ds_bundle.js
   (the runtime the claude.ai/design agent and preview cards load) and syncs the
   component list into _ds_manifest.json.

   Each component source is an ES module: `import React from "react"`,
   optional sibling imports (`import { Icon } from "../brand/Icon.jsx"`),
   and a single `export function <Name>`. The bundle is one IIFE that
   defines each component (React is a runtime global) into a shared
   `__ds_scope`, resolves sibling deps from that scope in dependency
   order, and exposes each on `window.AlfredAIDesignSystem_1ce241`.

   Run: node scripts/build-bundle.mjs
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const NS = "AlfredAIDesignSystem_1ce241";
const COMPONENTS_DIR = path.join(ROOT, "components");
const GROUP_ORDER = ["hooks", "brand", "core", "data", "charts", "overlay", "feedback", "marketing", "trust", "app", "conversation", "decision"];

// —— load Babel standalone (same build the previews use) ——
const babelSrc = await (await fetch("https://unpkg.com/@babel/standalone@7.29.0/babel.min.js")).text();
const bctx = {}; bctx.window = bctx; bctx.self = bctx; vm.createContext(bctx);
vm.runInContext(babelSrc, bctx);
const Babel = bctx.Babel;

// —— discover component sources ——
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : p.endsWith(".jsx") ? [p] : [];
});
const files = walk(COMPONENTS_DIR);

const IMPORT_SIBLING = /^import\s+\{([^}]+)\}\s+from\s+["'][^"']+["'];?\s*$/gm;
const IMPORT_REACT = /^import\s+React[^\n]*from\s+["']react["'];?\s*$/gm;

const parsed = files.map((file) => {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const group = path.relative(COMPONENTS_DIR, file).split(path.sep)[0];
  const raw = fs.readFileSync(file, "utf8");
  const deps = [];
  let src = raw.replace(IMPORT_SIBLING, (_m, names) => {
    names.split(",").map((s) => s.trim()).filter(Boolean).forEach((n) => deps.push(n));
    return "";
  }).replace(IMPORT_REACT, "");
  const names = [];
  src = src
    .replace(/^export\s+default\s+function\s+([A-Za-z0-9_$]+)/gm, (_m, n) => { names.push(n); return `function ${n}`; })
    .replace(/^export\s+function\s+([A-Za-z0-9_$]+)/gm, (_m, n) => { names.push(n); return `function ${n}`; })
    .replace(/^export\s+const\s+([A-Za-z0-9_$]+)/gm, (_m, n) => { names.push(n); return `const ${n}`; });
  if (!names.length) throw new Error(`No exported component found in ${rel}`);
  const code = Babel.transform(src, { presets: ["react"], filename: file }).code;
  const sha = crypto.createHash("sha256").update(raw).digest("hex").slice(0, 12);
  return { rel, group, names, deps: [...new Set(deps)], code, sha, internal: group === "hooks" };
});

// —— topological order (sibling deps first), tie-broken by group then path ——
const produced = new Map();
parsed.forEach((p) => p.names.forEach((n) => produced.set(n, p)));
const rank = (p) => GROUP_ORDER.indexOf(p.group) * 1000 + p.rel.length;
const ordered = [];
const done = new Set();
const remaining = [...parsed].sort((a, b) => rank(a) - rank(b));
let guard = 0;
while (remaining.length) {
  if (guard++ > parsed.length + 5) throw new Error("Cyclic component dependency detected");
  for (let i = 0; i < remaining.length; i++) {
    const p = remaining[i];
    const ready = p.deps.every((d) => !produced.has(d) || done.has(d)); // external deps ignored
    if (ready) { ordered.push(p); p.names.forEach((n) => done.add(n)); remaining.splice(i, 1); break; }
    if (i === remaining.length - 1) { // nothing ready this pass → emit lowest rank to break stall
      const p2 = remaining.shift(); ordered.push(p2); p2.names.forEach((n) => done.add(n));
    }
  }
}

// —— assemble bundle ——
const header = {
  format: 3, namespace: NS,
  components: ordered.filter((p) => !p.internal).flatMap((p) => p.names.map((name) => ({ name, sourcePath: p.rel }))),
  sourceHashes: Object.fromEntries(ordered.map((p) => [p.rel, p.sha])),
  inlinedExternals: [], unexposedExports: ordered.filter((p) => p.internal).flatMap((p) => p.names),
};
const blocks = ordered.map((p) => {
  const depLine = p.deps.filter((d) => produced.has(d)).length
    ? `\nconst { ${p.deps.filter((d) => produced.has(d)).join(", ")} } = __ds_scope;`
    : "";
  const assigns = p.names.map((n) => `\n__ds_scope.${n} = ${n};`).join("");
  return `// ${p.rel}\ntry { (() => {${depLine}\n${p.code}${assigns}\n})(); } catch (e) { (__ds_ns.__errors).push({ source: ${JSON.stringify(p.rel)}, error: String((e && e.message) || e) }); }`;
}).join("\n\n");
const footer = ordered.filter((p) => !p.internal).flatMap((p) => p.names.map((n) => `__ds_ns.${n} = __ds_scope.${n};`)).join("\n\n");

const out = `/* @ds-bundle: ${JSON.stringify(header)} */

(() => {

const __ds_ns = (window.${NS} = window.${NS} || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

${blocks}

${footer}

})();
`;

fs.writeFileSync(path.join(ROOT, "_ds_bundle.js"), out);

// —— sync manifest component list ——
const manifestPath = path.join(ROOT, "_ds_manifest.json");
const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
m.components = header.components.map(({ name, sourcePath }) => ({ name, sourcePath }));
fs.writeFileSync(manifestPath, JSON.stringify(m));

console.log(`Built _ds_bundle.js — ${ordered.length} source files, ${header.components.length} components:`);
console.log("  " + header.components.map((c) => c.name).join(", "));
