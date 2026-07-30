/* Shared component-compilation pipeline.

   Both outputs are built from exactly the same parse and dependency order:
     - scripts/build-bundle.mjs → _ds_bundle.js  (global IIFE for the preview
       pages, the claude.ai/design runtime and the playground)
     - scripts/build-npm.mjs    → dist/          (real ESM for `npm i`)

   Keeping one pipeline means the published package cannot drift from the
   bundle every verifier tests against. Injected `ROOT` so callers own paths.
*/
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";

export const GROUP_ORDER = ["hooks", "brand", "core", "data", "charts", "overlay", "feedback", "marketing", "trust", "app", "conversation", "decision"];

export async function compileComponents(ROOT) {
  const COMPONENTS_DIR = path.join(ROOT, "components");
  /* —— load Babel standalone from node_modules, not the CDN ——
     This is the shared build pipeline: `_ds_bundle.js`, the npm package and
     three verifiers all come through here, so a `fetch` at this line made a
     CDN reachable a hard requirement of building the design system at all.
     `@babel/standalone` is a devDependency; `npm ci` has already put it on
     disk. Same file the CDN was serving, pinned by package-lock instead. */
  const babelSrc = fs.readFileSync(path.join(ROOT, "node_modules/@babel/standalone/babel.min.js"), "utf8");
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


  return { parsed, ordered, produced };
}
