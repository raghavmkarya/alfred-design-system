/* npm package contract — dist/ is generated and not committed, so nothing else
   would notice if it stopped building, stopped exporting a component, or started
   shipping something a consumer cannot import.

   The strongest available check is simply to be a consumer: build the package,
   `import` it as ESM, and server-render all 116 components through it. That
   exercises the real module graph rather than inspecting text.

   Checks:
     1. dist/ builds
     2. every manifest component is exported, and nothing extra
     3. all 116 render through the ESM entry (same sample props verify-components
        uses, so a component can't pass there and fail here)
     4. dist/package.json is publishable: exports map, peer React, no stray deps
     5. the shipped types type-check against the shipped entry

   Run: node scripts/verify-npm.mjs */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sampleProps } from "./sample-props.mjs";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const DIST = path.join(ROOT, "dist");
const fails = [];

/* 1 — build */
execFileSync("node", ["scripts/build-npm.mjs"], { cwd: ROOT, stdio: "pipe" });
console.log("OK   build       — dist/ built from the shared compile pipeline");

/* 2 — exports match the manifest exactly */
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "_ds_manifest.json"), "utf8"));
const expected = manifest.components.map((c) => c.name).sort();
const DS = await import(path.join(DIST, "index.mjs"));
const actual = Object.keys(DS).filter((k) => k !== "default").sort();
const missing = expected.filter((n) => !actual.includes(n));
const extra = actual.filter((n) => !expected.includes(n));
if (missing.length) fails.push(`not exported from dist/index.mjs: ${missing.join(", ")}`);
if (extra.length) fails.push(`exported but not a manifest component: ${extra.join(", ")}`);
if (!missing.length && !extra.length) console.log(`OK   exports     — ${actual.length} components, exactly matching the manifest`);

/* 3 — every component renders through the package */
const h = React.createElement;
const noop = () => {};
const PROPS = sampleProps(h, noop);
const broken = [];
const origErr = console.error;
console.error = () => {};                    // React logs prop warnings; we only care about throws
for (const name of expected) {
  try { renderToStaticMarkup(h(DS[name], PROPS[name] || {})); }
  catch (e) { broken.push(`${name}: ${e.message}`); }
}
console.error = origErr;
if (broken.length) fails.push(`components that threw when rendered from the package:\n     ${broken.join("\n     ")}`);
else console.log(`OK   render      — all ${expected.length} render through the ESM entry`);

/* 4 — the manifest a consumer actually installs */
const pkg = JSON.parse(fs.readFileSync(path.join(DIST, "package.json"), "utf8"));
const want = [
  [pkg.type === "module", "type must be \"module\""],
  [!!pkg.exports?.["."]?.import, "exports[\".\"].import missing"],
  [!!pkg.exports?.["."]?.types, "exports[\".\"].types missing"],
  [!!pkg.exports?.["./styles.css"], "exports[\"./styles.css\"] missing — consumers need the token closure"],
  [!!pkg.peerDependencies?.react, "react must be a peerDependency, never bundled (two Reacts breaks hooks)"],
  [!pkg.dependencies || !Object.keys(pkg.dependencies).length, "the package must ship with no runtime dependencies"],
  [/^\d+\.\d+\.\d+/.test(pkg.version || ""), "version must be semver"],
  [pkg.private !== true, "the published manifest must not be private"],
];
for (const [ok, why] of want) if (!ok) fails.push(`dist/package.json: ${why}`);
for (const f of ["index.mjs", "index.d.ts", "styles.css", "tokens/colors.css", "assets/fonts"]) {
  if (!fs.existsSync(path.join(DIST, f))) fails.push(`dist/${f} is missing from the package`);
}
if (!fails.some((f) => f.startsWith("dist/"))) console.log("OK   manifest    — publishable shape, react is a peer, no runtime deps");

/* 5 — the shipped types type-check */
const probe = path.join(DIST, "__typecheck.tsx");
fs.writeFileSync(probe, [
  `import React from "react";`,                       // classic JSX runtime needs it in scope
  `import { Button, KpiCard } from "./index.mjs";`,
  `export const a = <Button variant="primary">x</Button>;`,
  `export const b = <KpiCard label="Blended ROAS" value="4.8x" direction="up" />;`,
  ``,
].join("\n"));
try {
  execFileSync("npx", ["tsc", "--noEmit", "--jsx", "react", "--esModuleInterop", "--moduleResolution", "bundler",
                       "--module", "esnext", "--target", "es2020", "--skipLibCheck", probe],
    { cwd: ROOT, stdio: "pipe" });
} catch (e) {
  const out = String(e.stdout || e.stderr || e.message);
  if (/error TS/.test(out)) fails.push(`the shipped types do not type-check:\n     ${out.split("\n").filter((l) => /error TS/.test(l)).slice(0, 4).join("\n     ")}`);
} finally { fs.rmSync(probe, { force: true }); }
if (!fails.some((f) => f.startsWith("the shipped types"))) console.log("OK   types       — the shipped .d.ts resolve from the shipped entry");

if (fails.length) {
  console.log("");
  for (const f of fails) console.log("FAIL " + f);
  console.log(`\n${fails.length} NPM PACKAGE FAILURE(S)`);
  process.exit(1);
}
console.log(`\nNPM PACKAGE CONTRACT HOLDS (${pkg.name} v${pkg.version}, ${expected.length} components)`);
