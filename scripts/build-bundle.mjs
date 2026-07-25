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
import { compileComponents, GROUP_ORDER } from "./compile-components.mjs";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const NS = "AlfredAIDesignSystem_1ce241";

// —— compile every component (shared with scripts/build-npm.mjs) ——
const { parsed, ordered, produced } = await compileComponents(ROOT);

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
