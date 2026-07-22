/* Type-contract check — the 5th verifier. Guarantees every component ships a
   TypeScript declaration and that the declaration actually types the component:
     1. PRESENCE   — every component .jsx (except internal modules under
                     components/hooks/) has a sibling .d.ts.
     2. CONSISTENCY — for every component in _ds_manifest.json, its sibling .d.ts
                     declares that exported name (so a .d.ts can't be empty or drift
                     from the component it types).
   Dependency-free (no tsc / @types needed) so it runs anywhere CI runs. Full
   `tsc --noEmit` type-resolution (needs @types/react in CI) is a follow-up.
   Run: node scripts/verify-types.mjs */
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const COMP = path.join(ROOT, "components");
const INTERNAL_DIRS = new Set(["hooks"]);   // internal modules — bundled, not components, no .d.ts required

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".jsx")) out.push(p);
  }
  return out;
}

const jsxFiles = walk(COMP).filter((f) => !INTERNAL_DIRS.has(path.relative(COMP, f).split(path.sep)[0]));

/* 1. presence */
const missing = [];
for (const f of jsxFiles) {
  if (!fs.existsSync(f.replace(/\.jsx$/, ".d.ts"))) missing.push(path.relative(ROOT, f));
}

/* 2. consistency — every manifest component name is declared in its sibling .d.ts */
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "_ds_manifest.json"), "utf8"));
const bySource = {};
for (const c of manifest.components) (bySource[c.sourcePath] ||= []).push(c.name);

const inconsistent = [];
for (const [src, names] of Object.entries(bySource)) {
  const dts = path.join(ROOT, src.replace(/\.jsx$/, ".d.ts"));
  if (!fs.existsSync(dts)) continue;   // already reported by the presence pass
  const txt = fs.readFileSync(dts, "utf8");
  for (const name of names) {
    const declared =
      new RegExp(`export\\s+(?:declare\\s+)?(?:function|const|class|let|var)\\s+${name}\\b`).test(txt) ||
      new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`).test(txt);
    if (!declared) inconsistent.push(`${src.replace(/\.jsx$/, ".d.ts")} — missing an export declaring \`${name}\``);
  }
}

if (!missing.length && !inconsistent.length) {
  console.log(`OK   presence     — all ${jsxFiles.length} components have a sibling .d.ts`);
  console.log(`OK   consistency  — every component export is declared in its .d.ts`);
  console.log(`\nALL TYPE CONTRACTS HOLD (${jsxFiles.length} components)`);
  process.exit(0);
}
if (missing.length) {
  console.log(`\nFAIL presence — ${missing.length} component(s) missing a .d.ts:`);
  missing.forEach((m) => console.log("     " + m));
}
if (inconsistent.length) {
  console.log(`\nFAIL consistency — ${inconsistent.length} .d.ts do not declare their component:`);
  inconsistent.forEach((m) => console.log("     " + m));
}
console.log(`\n${missing.length + inconsistent.length} TYPE CONTRACT ISSUE(S)`);
process.exit(1);
