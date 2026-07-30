/* Icon contract — the set exists so a glyph is drawn ONCE. It was not holding:
   components hand-rolled their own paths, and the same glyph drifted into
   several shapes. There were three different checkmarks and two different
   close crosses in the codebase before this check existed.

   Two things are enforced:

     1. Construction. Every glyph added from now on is 24×24, stroked,
        stroke-width 2, round caps and joins — the grid components were already
        drawing on. The original 27 are filled paths on arbitrary viewBoxes,
        exported from a design tool; they are grandfathered by name, not by
        pretending they match.

     2. A ratchet on duplication. An inline `<path d>` repeated across two or
        more components is a glyph that wants to be in the set. The ones that
        already exist are recorded below as a baseline; the check fails on any
        NEW one. A gate that fails on day one gets deleted, so this one starts
        where the code actually is and only tightens.

   Run: node scripts/verify-icons.mjs */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const ICONS = path.join(ROOT, "assets/icons");
const fails = [];

/* The 27 originals: filled paths, arbitrary viewBoxes. Grandfathered explicitly
   so the list can only shrink, never quietly grow. */
const LEGACY_FILLED = new Set([
  "audit-log", "budget", "channel-mix", "delete", "export", "gdpr",
  "integration-success", "locked-feature", "mql", "read-only", "sort", "step-locked",
  "web-clarity", "web-stack-connected",
]);

/* Inline glyphs already duplicated across components when this check was added.
   It started at 20 and is now EMPTY: the backlog is cleared, and every glyph a
   component draws itself comes from `GLYPH` in components/hooks/glyphs.jsx.

   Leave it empty. An entry here is a licence to draw the same shape twice, and
   the ratchet below is now a plain "no duplication" rule rather than a budget.
   If a future change genuinely needs one, it must justify the entry in review
   rather than append quietly.

   Worth knowing about the limit of this check: it compares path-data STRINGS,
   so it never saw the two rounded warning triangles that differed only in
   decimal precision (`1.9 18` vs `1.82 18`). Byte-identical duplication is what
   it catches; same-shape-different-spelling still needs a human. */
const KNOWN_INLINE_DUPES = new Set([]);

/* —— 1. construction —————————————————————————————————————————————————— */
const files = fs.readdirSync(ICONS).filter((f) => f.endsWith(".svg"));
let modern = 0;
for (const f of files.sort()) {
  const name = f.replace(/\.svg$/, "");
  const src = fs.readFileSync(path.join(ICONS, f), "utf8");
  if (LEGACY_FILLED.has(name)) continue;
  modern++;
  const problems = [];
  if (!/viewBox="0 0 24 24"/.test(src)) problems.push('viewBox must be "0 0 24 24"');
  if (!/stroke-width="2"/.test(src)) problems.push('stroke-width must be 2');
  if (!/stroke-linecap="round"/.test(src)) problems.push("stroke-linecap must be round");
  if (!/stroke-linejoin="round"/.test(src)) problems.push("stroke-linejoin must be round");
  if (!/fill="none"/.test(src)) problems.push('fill must be "none" (stroked, not filled)');
  if (problems.length) fails.push(`assets/icons/${f} — ${problems.join("; ")}`);
}
if (!fails.length) console.log(`OK   construction — ${modern} glyph(s) on the 24×24 stroked grid, ${LEGACY_FILLED.size} legacy filled`);

/* a legacy name that no longer exists should leave the list */
for (const name of LEGACY_FILLED) {
  if (!files.includes(`${name}.svg`)) fails.push(`LEGACY_FILLED lists "${name}" but assets/icons/${name}.svg is gone — remove it from the list`);
}

/* —— 1b. two files, one drawing ————————————————————————————————————————
   The duplication ratchet below reads COMPONENTS. Nothing read the icon set
   against itself, and `trend-down.svg` was a byte-for-byte copy of
   `trend-up.svg` — so every KpiCard with `direction="down"` had been drawing a
   rising arrow, in a component whose whole job is to say which way a number
   moved. A name that means the opposite of what it draws is worse than a
   missing icon, and nothing here could see it. */
const byShape = new Map();
for (const f of files.sort()) {
  const src = fs.readFileSync(path.join(ICONS, f), "utf8");
  const shape = [...src.matchAll(/<(?:path|circle|rect|line|polyline|polygon)\b[^>]*>/g)]
    .map((m) => m[0].replace(/\s+/g, " "))
    .join("");
  if (!shape) continue;
  if (!byShape.has(shape)) byShape.set(shape, []);
  byShape.get(shape).push(f.replace(/\.svg$/, ""));
}
for (const names of byShape.values()) {
  if (names.length > 1) fails.push(`assets/icons — ${names.join(" and ")} are the same drawing; one of them is mislabelled or redundant`);
}

/* —— 2. the duplication ratchet ———————————————————————————————————————— */
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".jsx")) out.push(p);
  }
  return out;
};
const counts = new Map();
const seenIn = new Map();
for (const file of walk(path.join(ROOT, "components"))) {
  const rel = path.relative(ROOT, file);
  // charts draw data, not glyphs; the brand components ARE the art
  if (rel.includes("/charts/") || /brand\/(Icon|Logo|Illustration|BrandMoment)/.test(rel)) continue;
  const src = fs.readFileSync(file, "utf8");
  const here = new Set();
  for (const m of src.matchAll(/<path\s[^>]*\bd="([^"]{4,160})"/g)) {
    const d = m[1].split(/\s+/).join(" ");
    here.add(d);
  }
  for (const d of here) {
    counts.set(d, (counts.get(d) || 0) + 1);
    (seenIn.get(d) || seenIn.set(d, []).get(d)).push(path.basename(file));
  }
}
const newDupes = [...counts.entries()].filter(([d, n]) => n >= 2 && !KNOWN_INLINE_DUPES.has(d));
for (const [d, n] of newDupes) {
  fails.push(`a new glyph is duplicated across ${n} components — add it to assets/icons/ and use <Icon>: "${d.slice(0, 70)}" (${(seenIn.get(d) || []).slice(0, 4).join(", ")})`);
}
/* A baseline that keeps entries for glyphs nobody draws any more is fiction: the
   backlog number stops meaning anything and the list slowly stops being read.
   Fixing a duplicate must therefore REMOVE it from the list, and the check says
   so — the ratchet cleans itself. */
const stillDuped = new Set([...counts.entries()].filter(([, n]) => n >= 2).map(([d]) => d));
const stale = [...KNOWN_INLINE_DUPES].filter((d) => !stillDuped.has(d));
for (const d of stale) {
  fails.push(`KNOWN_INLINE_DUPES still lists a glyph that is no longer duplicated — delete the entry so the backlog stays honest: "${d.slice(0, 70)}"`);
}
if (!newDupes.length && !stale.length) {
  console.log(`OK   no new drift  — ${stillDuped.size} known duplicated inline glyph(s), none added, none stale`);
}

/* —— report ——————————————————————————————————————————————————————————— */
if (fails.length) {
  console.log("");
  for (const f of fails) console.log("FAIL " + f);
  console.log(`\n${fails.length} ICON CONTRACT FAILURE(S)`);
  process.exit(1);
}
console.log(`\nICON CONTRACT HOLDS (${files.length} glyphs)`);
