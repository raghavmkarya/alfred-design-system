/* verify-contrast — the 6th verifier: programmatic WCAG contrast over the
   semantic color tokens. Parses tokens/colors.css into per-theme token maps
   (root → theme override, var() resolved), then asserts the foreground/
   background PAIRS that components actually render — body text on surfaces and
   on-tint label/copy across light / marketing-dark / app-dark — at WCAG AA
   (4.5:1 body text, 3:1 large text + graphical accents). rgba tokens are
   composited to opaque over their real backdrop before the ratio is taken
   (the marketing-dark tints are low-alpha over near-black — the exact case the
   #26 Banner fix addressed).

   Dependency-free ESM, node builtins only (house style). Run:
     node scripts/verify-contrast.mjs           # enforce (exit 1 on violation)
     node scripts/verify-contrast.mjs --audit    # print every ratio, exit 0
*/
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const AUDIT = process.argv.includes("--audit");

/* ── parse tokens/colors.css → { light, dark, "app-dark" } token maps ─────── */
const css = fs.readFileSync(path.join(ROOT, "tokens", "colors.css"), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, ""); // strip comments

// Pull out each top-level `selector { … }` block (brace-depth aware).
function blocks(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const open = src.indexOf("{", i);
    if (open === -1) break;
    const selector = src.slice(i, open).trim().split("}").pop().trim();
    let depth = 1, j = open + 1;
    for (; j < src.length && depth; j++) {
      if (src[j] === "{") depth++;
      else if (src[j] === "}") depth--;
    }
    out.push({ selector, body: src.slice(open + 1, j - 1) });
    i = j;
  }
  return out;
}
function decls(body) {
  const m = {};
  for (const line of body.split(";")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const name = line.slice(0, idx).trim();
    if (!name.startsWith("--")) continue;
    m[name] = line.slice(idx + 1).trim();
  }
  return m;
}

const root = {}, dark = {}, appDark = {};
for (const { selector, body } of blocks(css)) {
  const d = decls(body);
  const s = selector.replace(/\s+/g, " ");
  if (/\[data-theme="app-dark"\]/.test(s)) Object.assign(appDark, d);
  else if (/\[data-theme="dark"\]/.test(s)) Object.assign(dark, d);
  else if (/(^|,)\s*:root(\s|,|$)/.test(s) || s === ":root") Object.assign(root, d);
}
const THEMES = {
  light: root,
  dark: { ...root, ...dark },        // dark inherits root, overrides on top
  "app-dark": { ...root, ...appDark },
};

/* ── color: resolve var() → parse #hex / rgb(a) → composite → luminance ───── */
function resolve(name, map) {
  let v = name.startsWith("--") ? map[name] : name;
  let guard = 0;
  while (v && /var\(/.test(v) && guard++ < 20) {
    v = v.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/, (_, ref, fb) =>
      map[ref] != null ? map[ref] : (fb || "").trim());
  }
  return v && v.trim();
}
function parse(str) {
  if (!str) return null;
  str = str.trim();
  let m = str.match(/^#([0-9a-f]{3})$/i);
  if (m) { const [r, g, b] = m[1].split("").map((c) => parseInt(c + c, 16)); return { r, g, b, a: 1 }; }
  m = str.match(/^#([0-9a-f]{6})$/i);
  if (m) return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: 1 };
  m = str.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)$/i);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] == null ? 1 : +m[4] };
  return null;
}
// composite src (may be translucent) over an already-opaque backdrop
function over(src, bg) {
  const a = src.a;
  return { r: src.r * a + bg.r * (1 - a), g: src.g * a + bg.g * (1 - a), b: src.b * a + bg.b * (1 - a), a: 1 };
}
function lum({ r, g, b }) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(fg, bg) {
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}
const BASE = { light: { r: 255, g: 255, b: 255, a: 1 }, dark: { r: 0, g: 0, b: 0, a: 1 }, "app-dark": { r: 12, g: 12, b: 10, a: 1 } };

// flatten a bg token to opaque, compositing over `underToken` (itself flattened over the theme base)
function opaqueBg(token, theme, underToken) {
  const map = THEMES[theme];
  const base = BASE[theme];
  const under = underToken ? over(parse(resolve(underToken, map)) || base, base) : base;
  const c = parse(resolve(token, map));
  if (!c) return null;
  return over(c, under);
}

/* ── the pairs components actually render (fg on bg, per theme) ─────────────
   kind: "text" → 4.5:1, "large"/"graphic" → 3:1. under = backdrop the bg sits
   on (surface-card for card-nested tints; default canvas). */
const AA_TEXT = 4.5, AA_LARGE = 3.0;
const themes = ["light", "dark", "app-dark"];
const P = [];
const add = (fg, bg, { kind = "text", under = "--bg-canvas", note = "", only } = {}) => {
  for (const t of (only || themes)) P.push({ fg, bg, theme: t, kind, under, note });
};

// (A) body text on surfaces — the readable-copy floor
for (const bg of ["--bg-canvas", "--surface-card"]) {
  const under = bg === "--surface-card" ? "--bg-canvas" : undefined;
  add("--text-primary", bg, { under });
  add("--text-body", bg, { under });
  add("--text-secondary", bg, { under });
  add("--text-muted", bg, { under, note: "muted/supplementary" });
}

// (B) Banner / Callout copy — text-primary + text-body on tone tints (the #26 case)
for (const tint of ["--info-100", "--success-100", "--warning-100", "--danger-100"]) {
  add("--text-primary", tint, { under: "--surface-card", note: "banner copy" });
  add("--text-body", tint, { under: "--surface-card", note: "banner copy" });
}

// (C) Badge / Chip on-tint labels — the deep-shade-on-dark-fill risk
add("--text-on-tint-brand", "--accent-soft", { under: "--surface-card", note: "badge/chip brand" });
add("--text-on-tint-info", "--info-100", { under: "--surface-card", note: "badge/chip info" });
add("--text-on-tint-success", "--success-100", { under: "--surface-card", note: "badge success" });
add("--text-on-tint-brand", "--warning-100", { under: "--surface-card", note: "badge/chip warning" });
add("--text-on-tint-danger", "--danger-100", { under: "--surface-card", note: "badge/chip danger" });
// (Chip success/danger use these same on-tint tokens — covered by the Badge pairs above.)

// (D) solid brand fill — ink-on-orange (Button primary + selected Chip; orange can't carry white text)
add("--text-on-orange", "--accent", { under: "--bg-canvas", note: "ink on orange (button/chip-selected)" });

/* ── accepted exceptions (documented, with reason) ─────────────────────────
   key = `${fg}|${bg}|${theme}`. Keep this list SHORT and justified. */
const ALLOW = {
  // (fill in after the first audit run — real bugs get fixed, not allow-listed)
};

/* ── run ──────────────────────────────────────────────────────────────────*/
const rows = [];
for (const p of P) {
  const map = THEMES[p.theme];
  const bgOpaque = opaqueBg(p.bg, p.theme, p.under);
  const fgParsed = parse(resolve(p.fg, map));
  if (!bgOpaque || !fgParsed) { rows.push({ ...p, ratio: null, req: null, ok: false, err: "unresolved token" }); continue; }
  const fgOpaque = over(fgParsed, bgOpaque);           // fg composited over the actual bg
  const r = ratio(fgOpaque, bgOpaque);
  const req = p.kind === "text" ? AA_TEXT : AA_LARGE;
  const allowed = `${p.fg}|${p.bg}|${p.theme}` in ALLOW;
  rows.push({ ...p, ratio: r, req, ok: r >= req || allowed, allowed, raw: r < req });
}

// audit table (always printed — sorted worst-first)
const fmt = (r) => (r == null ? "  ?? " : r.toFixed(2).padStart(5));
for (const row of [...rows].sort((a, b) => (a.ratio ?? 99) - (b.ratio ?? 99))) {
  const tag = row.err ? "ERR " : row.raw ? (row.allowed ? "allow" : "FAIL") : "ok  ";
  console.log(`${tag} ${fmt(row.ratio)}  need ${row.req ?? "?"}  [${row.theme.padEnd(8)}] ${row.fg} on ${row.bg}  ${row.note}`);
}

const violations = rows.filter((r) => !r.ok);
if (AUDIT) { console.log(`\n(audit) ${rows.length} pairs, ${rows.filter((r) => r.raw).length} below threshold`); process.exit(0); }
if (violations.length === 0) {
  console.log(`\nALL ${rows.length} CONTRAST PAIRS MEET WCAG AA (across ${themes.length} themes)`);
  process.exit(0);
}
console.log(`\n${violations.length} CONTRAST VIOLATION(S):`);
for (const v of violations) console.log(`  [${v.theme}] ${v.fg} on ${v.bg} — ${v.err || `${v.ratio.toFixed(2)}:1 < ${v.req}:1`} (${v.note})`);
process.exit(1);
