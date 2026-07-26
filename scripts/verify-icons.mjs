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
  "alert-warning", "audit-log", "bookmark", "budget", "channel-mix", "close", "cta-arrow",
  "delete", "demo-play", "export", "fullscreen", "gdpr", "integration-success", "locked-feature",
  "mql", "pin", "pricing-cross", "read-only", "refresh", "security-lock", "sort", "step-locked",
  "trend-down", "trend-flat", "trend-up", "web-clarity", "web-stack-connected",
]);

/* Inline glyphs already duplicated across components when this check was added.
   Each is a candidate to migrate onto `Icon`; the list is the backlog, and
   nothing may be added to it. */
const KNOWN_INLINE_DUPES = new Set([
  "M12 10v4M12 17h.01",
  "M12 17h.01",
  "M12 17v4",
  "M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z",
  "M12 4l9 15H3l9-15z",
  "M12 5v14M5 12h14",
  "M12 8v5M12 16.5h.01",
  "M12 9v4",
  "M13 6l6 6-6 6",
  "M15 3v5",
  "M2.5 6.2L4.8 8.5L9.5 3.5",
  "M2.8 8.6l3.2 3.2 7.2-7.6",
  "M5 12h14",
  "M6 6 L18 18 M18 6 L6 18",
  "M6 6l12 12M18 6L6 18",
  "M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z",
  "M6 9l6 6 6-6",
  "M8.5 12.2l2.4 2.4 4.6-5",
  "M9 3v5",
  "M9 6l6 6-6 6",
]);

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
