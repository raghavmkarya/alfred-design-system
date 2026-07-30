/* Consumer contract — install the package the way a user does, on the React
   version a user actually gets, and render it.

   WHY THIS EXISTS. `verify-npm` proves the package builds, exports 117
   components and renders through its ESM entry. It does all of that against
   the repo's own `react@18.3.1`, the LOWER BOUND of the peer range. On
   2026-07-30 that gap shipped a real bug: `FaqItem`'s collapsed panel wrote
   `inert=""`, which React 18 renders as `inert=""` and React 19 DROPS. So the
   attribute that keeps a closed panel out of the tab order was missing for
   every consumer on React 19, while nine verifiers and 52 browser tests
   passed. The gate even asserted the broken form, because it too ran on 18.

   Testing a package as its consumers receive it is a different act from
   testing the source it was built from. That difference is the peer range.

   WHAT IT DOES. Packs `dist/`, installs the tarball plus the LATEST React into
   a scratch project, server-renders every export, and fails on any React
   warning — which is how the inert bug announced itself — plus a few explicit
   assertions about attributes that differ across React majors.

   This one needs the network (it installs from the registry). It is the only
   check here that does, deliberately: an offline stand-in would be testing
   something other than what a consumer runs.

   Run: node scripts/verify-consumer.mjs */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: "pipe", encoding: "utf8" });
const fails = [];

execFileSync("node", ["scripts/build-npm.mjs"], { cwd: ROOT, stdio: "pipe" });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ds-consumer-"));
try {
  const packed = run("npm", ["pack", "--pack-destination", tmp], path.join(ROOT, "dist")).trim().split("\n").pop();
  console.log(`OK   pack        — ${packed}`);

  fs.writeFileSync(path.join(tmp, "package.json"), JSON.stringify({ name: "ds-consumer", private: true, type: "module" }));
  run("npm", ["i", "--no-audit", "--no-fund", path.join(tmp, packed), "react", "react-dom"], tmp);
  const reactVersion = JSON.parse(fs.readFileSync(path.join(tmp, "node_modules/react/package.json"), "utf8")).version;
  console.log(`OK   install     — resolved react@${reactVersion} from the peer range`);

  /* The probe runs INSIDE the scratch project, so `react` resolves to what a
     consumer just installed rather than to the repo's devDependency. */
  fs.writeFileSync(path.join(tmp, "probe.mjs"), `
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as DS from "@alfredai/design-system";

const warnings = [];
const orig = console.error;
console.error = (...a) => warnings.push(String(a[0]).replace(/%s/g, "?").slice(0, 120));

const threw = [];
for (const [name, C] of Object.entries(DS)) {
  if (typeof C !== "function") continue;
  try { renderToStaticMarkup(React.createElement(C, {})); } catch (e) { threw.push(name + ": " + e.message.slice(0, 80)); }
}
const html = {
  faqClosed: renderToStaticMarkup(React.createElement(DS.FaqItem, { question: "Q", children: "A" })),
  gauge: renderToStaticMarkup(React.createElement(DS.GaugeChart, { value: 72, max: 100, segments: [{ upTo: 60, color: "#c00", label: "Behind" }] })),
};
console.error = orig;
process.stdout.write(JSON.stringify({ react: React.version, exports: Object.keys(DS).length, warnings, threw, html }));
`);
  const out = JSON.parse(run("node", ["probe.mjs"], tmp));

  if (out.threw.length) fails.push(`components threw on the installed React: ${out.threw.slice(0, 3).join("; ")}`);
  else console.log(`OK   render      — all ${out.exports} exports render on react@${out.react}`);

  /* A React warning here is the signal that caught the inert bug. Treat it the
     same way the source verifiers treat one: as a failure. */
  if (out.warnings.length) fails.push(`React ${out.react} warnings from the published package: ${[...new Set(out.warnings)].slice(0, 3).join(" | ")}`);
  else console.log(`OK   quiet       — no React warnings on react@${out.react}`);

  /* Explicit, because a dropped attribute is silent: no warning, no throw, and
     the markup simply lacks it. `inert` renders as `inert=""` on React 19 and
     `inert="inert"` on React 18 — both are the attribute being present. */
  if (!/\binert=/.test(out.html.faqClosed)) fails.push(`a closed FaqItem has no inert attribute on react@${out.react} — see the matrix in components/marketing/FaqItem.jsx`);
  else console.log("OK   inert       — a closed FaqItem panel is inert");

  if (!/role="group"/.test(out.html.gauge)) fails.push("a banded GaugeChart is not an interactive group in the published build");
  else console.log("OK   contracts   — the chart a11y shapes survive the build");
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

if (fails.length) {
  console.log("");
  for (const f of fails) console.log("FAIL " + f);
  console.log(`\n${fails.length} CONSUMER CONTRACT FAILURE(S)`);
  process.exit(1);
}
console.log("\nCONSUMER CONTRACT HOLDS");
