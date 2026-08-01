/* Craft check — static "skill checks" distilled from guidelines/motion-and-animation.md,
   anti-slop.md and craft-checklist.md. Scans the design system's own source (.html / .css
   / .jsx) for the MECHANICALLY-checkable craft violations and fails on any hit, so a future
   edit can't silently reintroduce one. The fourth verifier alongside verify-render (bundle
   render), verify-components (state completeness) and verify-a11y (ARIA contracts).

   Scope: unambiguous, regex-detectable rules only. The subjective rules — eyebrow-per-section,
   layout sameness, copy quality, the "does it look AI-made" test — are deliberately NOT here;
   the guidelines assign those to the human / five-critic / impeccable-critique pass.

   Intentionally NOT flagged: `background-clip: text` with `--gradient-brand`. Gradient-fill on
   short display/emphasis text is a committed Alfred brand device (~30 deliberate uses), not a
   slop tell — see anti-slop.md / craft-checklist.md.

   Run: node scripts/verify-craft.mjs */
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
// "dist" is the generated npm package — linting a copy of the authored tokens
// would re-report the very file that legitimately DEFINES the motion tokens.
// Same reasoning for the Playwright output directories.
const SKIP_DIRS = new Set(["scripts", "uploads", "node_modules", ".git", ".design-sync", ".design_sync", "mocks", "dist", "test-results", "playwright-report"]);
const EXTS = new Set([".html", ".css", ".jsx"]);

/* Files where raw ramp tokens are a legitimate, reviewed brand device — gradient <stop>s that
   render the brand gradient in SVG, the sequential heat scale, and the fake dark DashboardMock
   device frame (must NOT re-theme with the host page). Everywhere else in components/ the
   raw-ramp-token rule requires a theme-aware semantic token; individual legit lines outside these
   files carry an inline `raw-ramp-ok` marker (see components/core/Avatar.jsx, Button.jsx). */
const RAW_RAMP_ALLOW_FILES = new Set([
  "components/charts/GaugeChart.jsx",
  "components/charts/Heatmap.jsx",
  "components/charts/LineChart.jsx",
  "components/charts/Sparkline.jsx",
  "components/data/ProgressRing.jsx",
  "components/marketing/DashboardMock.jsx",
]);

/* gather source files */
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".") && name !== ".") continue;          // skip dotfiles/dirs
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    const top = rel.split(path.sep)[0];
    if (fs.statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(name) || SKIP_DIRS.has(top)) continue;
      walk(full, out);
    } else if (EXTS.has(path.extname(name))) {
      out.push(rel);
    }
  }
  return out;
}

/* Each rule: id, why (short fix), a per-line `re`, and optional guards:
   skipFile(rel) — don't run the rule in these files;
   suppressIf(text) — skip the rule for a whole file when it matches (e.g. a custom focus style). */
/* Comment lines are not code. The motion rules in particular fire on prose that
   merely NAMES the thing they forbid — a doc comment reading "never `scale(0)`"
   tripped scale-zero-entry, which is the rule catching its own documentation.
   The token rules already skipped comments; these now do too. Emoji is
   deliberately NOT in this set: "no emoji in Alfred surfaces" means none
   anywhere, comments included. */
const isComment = (line) => { const t = line.trim(); return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*"); };

/* Every horizontal translate distance written on a line, in source form.
   Balanced-paren scan rather than /\(([^)]*)\)/, because the direction-aware
   spelling this rule wants — `translateX(calc(16px * var(--flip)))` — nests two
   levels deep and a lazy character class stops at the first `)`. */
const translateXArgs = (line) => {
  const out = [];
  for (const m of line.matchAll(/\btranslate(X)?\(/g)) {
    let i = m.index + m[0].length, depth = 1;
    const start = i;
    for (; i < line.length && depth > 0; i++) {
      if (line[i] === "(") depth++;
      else if (line[i] === ")") depth--;
    }
    const inner = line.slice(start, i - 1);
    out.push((m[1] ? inner : inner.split(",")[0]).trim());
  }
  return out;
};
/* Zero moves nowhere; ±50% is the centring idiom, which is direction-neutral
   (50% from the start is 50% from the end). Anything else has a handedness. */
const directionNeutral = (arg) => /^-?0(?:px|%|r?em)?$/.test(arg) || /^-?50%$/.test(arg);

/* Split a CSS value on top-level whitespace, so `var(--a) 4px` is two values and
   `calc(1px + 2px)` stays one. */
const splitValues = (v) => {
  const out = []; let depth = 0, cur = "";
  for (const ch of v) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (/\s/.test(ch) && depth === 0) { if (cur) out.push(cur); cur = ""; }
    else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
};
/* The FOUR-value box shorthands are the only handed ones: two values are
   block/inline and three are top / inline / bottom, both symmetric across the
   reading direction. Four is top-right-bottom-left, so it is handed exactly when
   right and left differ. `borderRadius` counts corners (TL TR BR BL) instead, so
   it is handed when either edge's pair differs. */
const HANDED_SHORTHAND = /\b(?:padding|margin|inset|borderWidth|border-width|borderRadius|border-radius):\s*([`"'])([^`"']*)\1/;
const isHandedShorthand = (line) => {
  const m = HANDED_SHORTHAND.exec(line);
  if (!m) return false;
  const v = splitValues(m[2].trim());
  if (v.length !== 4) return false;
  return /[Rr]adius/.test(m[0]) ? (v[0] !== v[1] || v[3] !== v[2]) : v[1] !== v[3];
};

const RULES = [
  { id: "transition-all", why: "name the properties, e.g. `transition: transform var(--dur-base) var(--ease-standard)`",
    re: /transition(?:-property)?:\s*["']?\s*all\b/, skipLine: isComment },   // tolerates the JSX inline-style form: transition: "all …"
  { id: "ease-in-ui", why: "`ease-in` feels sluggish on UI — use `var(--ease-standard)` (ease-out)",
    re: /(?<![-\w])ease-in\b(?!-out)/, skipLine: isComment },
  { id: "scale-zero-entry", why: "nothing appears from nothing — start from `scale(0.95)` + `opacity: 0`",
    re: /\bscale(?:3d|X|Y)?\(\s*0\s*[,)]/, skipLine: isComment },
  { id: "hardcoded-easing", why: "use the motion tokens `var(--ease-standard)` / `var(--ease-emphasized)`, not raw curves",
    re: /cubic-bezier\(/, skipFile: (r) => r.startsWith("tokens/"), skipLine: isComment },
  { id: "arbitrary-z-index", why: "use a semantic z-index (`--z-*`), never 999 / 9999",
    re: /(?:z-index|zIndex):\s*["']?9{3,}\b/, skipLine: isComment },   // CSS z-index and the JSX camelCase zIndex form
  { id: "outline-none-no-focus", why: "removing the outline needs a visible focus replacement (:focus-visible, a --shadow-focus/--border-focus ring, or usePress/isFocusVisible)",
    // catches both CSS `outline: none` and the JSX quoted form `outline: "none"` / `outlineStyle: "none"`
    re: /(?:outline|outline-style|outlineStyle):\s*["']?(?:none|0)\b/,
    suppressIf: (t) => /:focus(?:-visible|-within)?\b|--shadow-focus|--border-focus|isFocusVisible|usePress|focusVisible/.test(t) },
  { id: "emoji-in-source", why: "no emoji in Alfred surfaces — use the custom single-color SVG icon set (assets/icons/)",
    re: /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u },
  { id: "physical-inline-prop", why: "use a logical property so the component mirrors under RTL — marginInlineStart/End, paddingInlineStart/End, borderInlineStart/End, textAlign start/end, insetInlineStart/End. A deliberately physical line (50% centring, chart coordinate space, a physical placement API) carries an `rtl-ok` marker",
    re: /\b(?:margin|padding|border)(?:Left|Right)[A-Za-z]*\s*:|textAlign\s*:\s*["'](?:left|right)["']|(?:^|[{,\s])(?:left|right)\s*:/,
    skipFile: (r) => !(r.startsWith("components/") && r.endsWith(".jsx")),
    skipLine: (line) => { const t = line.trim(); return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || /rtl-ok/.test(line); } },
  /* CSS gives margin, padding, border and inset a logical form. It gives
     `transform` none: `translateX(18px)` is eighteen physical pixels to the
     right in every writing direction, so a switch knob, a hover nudge or a
     trailing arrow all travel BACKWARDS under `dir="rtl"` — and no static
     property check can see it, because there is no wrong property name to find.
     Multiply by `var(--flip)`, or mark the line `rtl-ok` and say why. */
  { id: "physical-translate", why: "a horizontal translate is physical in every direction — scale it by `var(--flip)` (`translateX(calc(18px * var(--flip)))`, or `scaleX(var(--flip)) translateX(3px)` to flip a directional glyph and its nudge together). A deliberately physical line (chart coordinate space, a physical placement API) carries an `rtl-ok` marker",
    re: /\btranslate(?:X)?\(/,
    skipFile: (r) => !(r.startsWith("components/") && r.endsWith(".jsx")),
    skipLine: (line) => {
      const t = line.trim();
      if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || /rtl-ok/.test(line)) return true;
      if (/var\(\s*--flip\s*\)/.test(line)) return true;   // already direction-aware
      return translateXArgs(line).every(directionNeutral);
    } },
  /* The sibling blind spot to `physical-translate`. `physical-inline-prop` finds
     a wrong property NAME — `paddingLeft` — and a four-value shorthand never
     spells one: `padding: "0 16px 14px 54px"` is top-right-bottom-left, all
     inside a property whose name is perfectly neutral. AuditLogRow indented its
     expanded detail 54px to align under the row icon, and under RTL that indent
     stayed on the left while the icon moved to the right. */
  { id: "handed-shorthand", why: "a four-value box shorthand is top-right-bottom-left, which is physical — split it into `paddingBlock` / `paddingInline` (start THEN end, the opposite order to the shorthand's right-then-left). A deliberately physical line carries an `rtl-ok` marker",
    re: HANDED_SHORTHAND,
    skipFile: (r) => !(r.startsWith("components/") && r.endsWith(".jsx")),
    skipLine: (line) => {
      const t = line.trim();
      if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || /rtl-ok/.test(line)) return true;
      return !isHandedShorthand(line);
    } },
  { id: "raw-shadow-token", why: "name the elevation ROLE, not the shadow size — use --elevation-{surface,raised,floating,overlay,modal}. (--shadow-brand / --shadow-focus are state, not elevation, and stay direct.)",
    re: /var\(\s*--shadow-(?:xs|sm|md|lg|xl)\s*\)/,
    // component .jsx source only; individual legit lines carry a `raw-shadow-ok` marker
    skipFile: (r) => !(r.startsWith("components/") && r.endsWith(".jsx")),
    skipLine: (line) => { const t = line.trim(); return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || /raw-shadow-ok/.test(line); } },
  { id: "raw-ramp-token", why: "use a theme-aware semantic token (--accent / --accent-soft / --border-focus / --text-link / --info-500 / --surface-* / --text-on-tint-*) — raw ramps don't re-theme across light / dark / app-dark",
    re: /var\(\s*--(?:gray|orange|periwinkle|ink)-\d/,
    // component .jsx source only (not the .card.html preview pages); skip the reviewed gradient/mock
    // files; individual legit lines carry a `raw-ramp-ok` marker
    skipFile: (r) => !(r.startsWith("components/") && r.endsWith(".jsx")) || RAW_RAMP_ALLOW_FILES.has(r),
    skipLine: (line) => { const t = line.trim(); return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || /raw-ramp-ok/.test(line); } },
];

const files = walk(ROOT);
const findings = [];

for (const rel of files) {
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const lines = text.split("\n");
  for (const rule of RULES) {
    if (rule.skipFile && rule.skipFile(rel)) continue;
    if (rule.suppressIf && rule.suppressIf(text)) continue;
    lines.forEach((line, i) => {
      if (rule.skipLine && rule.skipLine(line)) return;
      if (rule.re.test(line)) findings.push({ rule: rule.id, why: rule.why, file: rel, line: i + 1, snippet: line.trim().slice(0, 100) });
    });
  }
}

/* one positive contract the motion guideline relies on */
const baseCss = fs.readFileSync(path.join(ROOT, "tokens/base.css"), "utf8");
if (!/prefers-reduced-motion/.test(baseCss)) {
  findings.push({ rule: "reduced-motion-contract", why: "tokens/base.css must ship a global `prefers-reduced-motion` block", file: "tokens/base.css", line: 0, snippet: "(missing)" });
}

/* the forced-colors (Windows High Contrast) baseline must ship — box-shadows/backgrounds are
   stripped in HCM, so focus rings and floating-surface boundaries need a restored fallback. */
const stylesCss = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
let fcCss = "";
try { fcCss = fs.readFileSync(path.join(ROOT, "tokens/forced-colors.css"), "utf8"); } catch { /* file missing → fail below */ }
const fcOk = /@import\s+["']tokens\/forced-colors\.css["']/.test(stylesCss)
  && /@media\s*\(\s*forced-colors:\s*active\s*\)/.test(fcCss)
  && /:focus-visible/.test(fcCss)
  && /\[role="dialog"\]/.test(fcCss);
if (!fcOk) {
  findings.push({ rule: "forced-colors-contract", why: "styles.css must @import tokens/forced-colors.css, which must ship a `@media (forced-colors: active)` block restoring :focus-visible + floating-surface (role) borders", file: "tokens/forced-colors.css", line: 0, snippet: "(missing or incomplete)" });
} else {
  /* Phase 2.4: HCM flattens author backgrounds, so selection conveyed by a FILL
     vanishes and a selected tab/segment/option becomes identical to its siblings.
     Require the selection layer and the chart opt-out to stay present. */
  const deep = [
    [/aria-selected="true"\]/, "a selected-state rule keyed on [aria-selected]"],
    [/aria-checked="true"\]/, "a checked-state rule keyed on [aria-checked]"],
    [/aria-current=/, "an current-state rule keyed on [aria-current]"],
    [/Highlight(?:Text)?\b/, "the system Highlight/HighlightText selection pair"],
    [/forced-color-adjust:\s*none/, "`forced-color-adjust: none` (Highlight and chart colour need it to survive)"],
    [/role="img"\]|role="group"\]/, "the chart colour opt-out keyed on the chart roles"],
  ];
  for (const [re, what] of deep) {
    if (!re.test(fcCss)) {
      findings.push({ rule: "forced-colors-contract", why: `tokens/forced-colors.css must keep the Phase-2.4 deep layer — missing ${what}. Without it a selected tab/segment/option renders identically to an unselected one under Windows High Contrast`, file: "tokens/forced-colors.css", line: 0, snippet: `(missing: ${what})` });
    }
  }
}

/* the density scale must ship, and every scope must define the SAME token names — a scope that
   omits one silently inherits its parent's value, so a compact table nested in a spacious page
   would render half-compact. Comparing the name sets is the only mechanical guard against that. */
let denCss = "";
try { denCss = fs.readFileSync(path.join(ROOT, "tokens/density.css"), "utf8"); } catch { /* missing → fail below */ }
const DENSITY_SCOPES = [":root", '[data-density="comfortable"]', '[data-density="compact"]', '[data-density="spacious"]'];
const scopeTokens = (sel) => {
  const esc = sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = denCss.match(new RegExp(`(?:^|\\n)\\s*${esc}\\s*\\{([\\s\\S]*?)\\n\\}`));
  return block ? new Set([...block[1].matchAll(/^\s*(--density-[\w-]+)\s*:/gm)].map((x) => x[1])) : null;
};
if (!/@import\s+["']tokens\/density\.css["']/.test(stylesCss)) {
  findings.push({ rule: "density-contract", why: "styles.css must @import tokens/density.css", file: "styles.css", line: 0, snippet: "(missing import)" });
} else {
  const sets = DENSITY_SCOPES.map((s) => [s, scopeTokens(s)]);
  const missingScope = sets.find(([, set]) => !set || set.size === 0);
  if (missingScope) {
    findings.push({ rule: "density-contract", why: `tokens/density.css must define a \`${missingScope[0]}\` block of --density-* tokens`, file: "tokens/density.css", line: 0, snippet: "(missing or empty scope)" });
  } else {
    const [, ref] = sets[0];
    for (const [sel, set] of sets.slice(1)) {
      const missing = [...ref].filter((t) => !set.has(t));
      const extra = [...set].filter((t) => !ref.has(t));
      for (const t of missing) findings.push({ rule: "density-contract", why: "every density scope must define the same --density-* token set (an omitted token inherits the parent scope's value)", file: "tokens/density.css", line: 0, snippet: `${sel} is missing ${t}` });
      for (const t of extra) findings.push({ rule: "density-contract", why: "every density scope must define the same --density-* token set (an omitted token inherits the parent scope's value)", file: "tokens/density.css", line: 0, snippet: `${sel} defines ${t}, absent from :root` });
    }
  }
}

/* the elevation scale must ship and must alias the ramp (not restate its values), so the
   per-theme --shadow-* overrides in colors.css flow through. Restated literals would freeze
   light-theme shadows into every theme — the exact bug marketing-dark had. */
let elCss = "";
try { elCss = fs.readFileSync(path.join(ROOT, "tokens/elevation.css"), "utf8"); } catch { /* missing → fail below */ }
const ELEVATION_STEPS = ["flat", "surface", "raised", "floating", "overlay", "modal"];
if (!/@import\s+["']tokens\/elevation\.css["']/.test(stylesCss)) {
  findings.push({ rule: "elevation-contract", why: "styles.css must @import tokens/elevation.css", file: "styles.css", line: 0, snippet: "(missing import)" });
} else {
  for (const step of ELEVATION_STEPS) {
    const m = elCss.match(new RegExp(`--elevation-${step}\\s*:\\s*([^;]+);`));
    if (!m) {
      findings.push({ rule: "elevation-contract", why: `tokens/elevation.css must define --elevation-${step}`, file: "tokens/elevation.css", line: 0, snippet: "(missing step)" });
    } else if (step !== "flat" && !/var\(\s*--shadow-/.test(m[1])) {
      findings.push({ rule: "elevation-contract", why: "each --elevation-* step must ALIAS the --shadow-* ramp (`var(--shadow-…)`), never restate literal values — a literal freezes the light-theme shadow into every theme", file: "tokens/elevation.css", line: 0, snippet: `--elevation-${step}: ${m[1].trim()}` });
    }
  }
  /* every theme that darkens the canvas must supply real shadows: the light ink-tinted ramp
     (rgba(2,2,30,…)) is invisible on a dark page, which is how marketing-dark shipped flat. */
  const colorsCss = fs.readFileSync(path.join(ROOT, "tokens/colors.css"), "utf8");
  for (const theme of ["dark", "app-dark"]) {
    const block = colorsCss.match(new RegExp(`\\[data-theme="${theme}"\\]\\s*\\{([\\s\\S]*?)\\n\\}`));
    const missing = block ? ["xs", "sm", "md", "lg", "xl"].filter((s) => !new RegExp(`--shadow-${s}\\s*:`).test(block[1])) : ["(block missing)"];
    if (missing.length) {
      findings.push({ rule: "elevation-contract", why: `[data-theme="${theme}"] must override the whole --shadow-* ramp — the light ink-tinted values do not register on a dark canvas`, file: "tokens/colors.css", line: 0, snippet: `missing: ${missing.join(", ")}` });
    }
  }
}

/* —— illustration-theme-safe ————————————————————————————————————————————
   Scene art is drawn INLINE precisely so it can follow the theme — an SVG behind
   `<img src>` is an isolated document and never sees the page's custom
   properties. A hardcoded hex in that art silently throws the benefit away: it
   would look right on light and wrong on both darks, and no static check would
   notice. The only allowed literals are the brand gradient's own stops, which
   are fixed in every theme by definition. */
{
  const rel = "components/brand/Illustration.jsx";
  let src = "";
  try { src = fs.readFileSync(path.join(ROOT, rel), "utf8"); } catch { src = ""; }
  if (!src) {
    findings.push({ rule: "illustration-theme-safe", why: `${rel} is missing`, file: rel, line: 0, snippet: "(missing)" });
  } else {
    src.split("\n").forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      const hex = line.match(/#[0-9a-fA-F]{3,8}\b/);
      if (hex) {
        findings.push({ rule: "illustration-theme-safe", why: "scene art must draw in tokens, never literal colour — inline SVG is the only reason it can follow the theme at all, and a hex throws that away on both dark themes", file: rel, line: i + 1, snippet: line.trim().slice(0, 100) });
      }
    });
    if (!/var\(--border-default\)/.test(src) || !/var\(--surface-sunken\)/.test(src)) {
      findings.push({ rule: "illustration-theme-safe", why: "scene art must draw its structure in semantic tokens (--border-default / --surface-sunken) so it re-themes", file: rel, line: 0, snippet: "(structure tokens missing)" });
    }
  }
}

/* —— theme-alias-freeze ————————————————————————————————————————————————
   The generalised form of the bug that shipped twice. CSS substitutes a custom
   property's var() at computed-value time on the element where the DECLARATION
   sits, and the substituted result inherits. So a `:root` alias never picks up a
   [data-theme] override of what it points at — the theme must RE-DECLARE it.

   This shipped as --elevation-* frozen at the light ramp across both dark themes
   (worse than useless: 49 components had just been migrated onto it) and as
   --text-display computing to ink on marketing-dark's black page at 1.02:1.
   Neither was visible to any static check, because none of them computes CSS.

   Rule: for every `:root` token whose value contains var(), if a theme overrides
   any token it references, that theme must also declare the alias. */
{
  const TOKEN_FILES = ["tokens/colors.css", "tokens/typography.css", "tokens/spacing.css", "tokens/density.css", "tokens/elevation.css"];
  const scopes = {};
  for (const rel of TOKEN_FILES) {
    let css = "";
    try { css = fs.readFileSync(path.join(ROOT, rel), "utf8"); } catch { continue; }
    for (const m of css.matchAll(/(?:^|\n)([^{}\n][^{}]*?)\{([\s\S]*?)\n\}/g)) {
      const sel = m[1].replace(/\/\*[\s\S]*?\*\//g, "").trim().replace(/\s+/g, " ");
      const decls = {};
      for (const line of m[2].split("\n")) {
        const d = line.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/);
        if (d) decls[d[1]] = d[2].trim();
      }
      if (!Object.keys(decls).length) continue;
      for (const s of sel.split(",").map((x) => x.trim())) Object.assign((scopes[s] ||= {}), decls);
    }
  }
  const rootDecls = scopes[":root"] || {};
  const themeSels = Object.keys(scopes).filter((s) => /^\[data-theme=/.test(s));
  for (const [tok, val] of Object.entries(rootDecls)) {
    const refs = [...val.matchAll(/var\(\s*(--[\w-]+)/g)].map((x) => x[1]);
    if (!refs.length) continue;
    for (const sel of themeSels) {
      const own = scopes[sel];
      if (own[tok] !== undefined) continue;              // re-declared → correct
      const hit = refs.filter((r) => own[r] !== undefined);
      if (hit.length) {
        findings.push({
          rule: "theme-alias-freeze",
          why: "a `:root` alias is substituted where it is DECLARED, so it keeps the root value even when a theme overrides what it points at — the theme must re-declare the alias (this shipped as dark elevation frozen on the light ramp, and display type at 1.02:1)",
          file: "tokens/*.css", line: 0,
          snippet: `${sel} overrides ${hit.join(", ")} but not ${tok}: ${val}`,
        });
      }
    }
  }
}

/* —— spread-clobbers-prop ————————————————————————————————————————————————
   A JSX element that has BOTH a spread and an explicit prop of the same name.
   Later wins and replaces the value outright — it does not merge — so one of
   the two contributions is silently destroyed, and which one depends purely on
   the order they happen to be written in.

   This shipped. All four x-indexed chart components were written as
   `<div style={{ position: "relative", ...style }} {...cursor.bind}>` where
   `cursor.bind` carried a `style` of its own, so every one of them rendered
   with a wrapper whose entire style was `outline-offset: 2px`: no containing
   block for the absolutely-positioned readout, and a `style` passthrough that
   did nothing. Nothing failed, because the tests asserted the readout's text
   and never its position.

   Detection is deliberately narrow, to stay in this verifier's "unambiguous and
   mechanically checkable" scope: it only fires when the spread's source object
   is one this file can see the shape of — a `const X = { ... }` in the same
   file, or a known bind-shaped local — AND that shape really does contain the
   clashing key. `{...rest}` after a destructured `style` is the correct, common
   pattern and must never be flagged: `style` was pulled out of `rest`. */
{
  for (const rel of files.filter((r) => r.endsWith(".jsx"))) {
    const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
    if (!/\{\s*\.\.\./.test(src)) continue;

    /* Object shapes declared in this file or imported from a sibling, so a
       spread of one can actually be checked rather than guessed at. */
    const shapes = {};
    const learn = (text) => {
      for (const m of text.matchAll(/(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g)) {
        shapes[m[1]] = [...m[2].matchAll(/(?:^|[{,\s])([A-Za-z_$][\w$]*)\s*:/g)].map((k) => k[1]);
      }
      /* Also object PROPERTIES that are object literals, resolving any spreads
         inside them against what is already known. Without this the check has a
         hole exactly where the bug lived: `bind` is assembled as
         `return { …, bind: { ...groupBind, ...plotBind } }`, so it is not a
         `const`, and `{...cursor.bind}` — the precise form all four charts
         shipped — would sail straight through. Verified by re-injecting it. */
      for (const m of text.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*\{([^{}]*)\}/g)) {
        const own = [...m[2].matchAll(/(?:^|[{,\s])([A-Za-z_$][\w$]*)\s*:/g)].map((k) => k[1]);
        const inherited = [...m[2].matchAll(/\.\.\.\s*([A-Za-z_$][\w$]*)/g)].flatMap((k) => shapes[k[1]] || []);
        const all = [...new Set([...(shapes[m[1]] || []), ...own, ...inherited])];
        if (all.length) shapes[m[1]] = all;
      }
    };
    learn(src);
    for (const im of src.matchAll(/from\s+"(\.[^"]+\.jsx)"/g)) {
      try { learn(fs.readFileSync(path.join(path.dirname(path.join(ROOT, rel)), im[1]), "utf8")); } catch { /* not resolvable → stay quiet */ }
    }

    for (const el of src.matchAll(/<[a-zA-Z][\w.]*\s[^>]*?\/?>/g)) {
      const tag = el[0];
      // a doc comment that SHOWS the bad pattern is not the bad pattern — this
      // rule's own write-up in chartCursor.jsx tripped it first time out
      const lineStart = src.lastIndexOf("\n", el.index) + 1;
      if (isComment(src.slice(lineStart, src.indexOf("\n", el.index)))) continue;
      const spreads = [...tag.matchAll(/\{\s*\.\.\.\s*([A-Za-z_$][\w$.]*)\s*\}/g)].map((m) => m[1]);
      if (!spreads.length) continue;
      const explicit = [...tag.matchAll(/(?:^|\s)([a-zA-Z][\w]*)\s*=\s*[{"]/g)].map((m) => m[1]);
      for (const from of spreads) {
        // `{...rest}` and friends have no visible shape — the correct pattern
        // pulls the clashing prop OUT of rest, so silence is right here.
        const keys = shapes[from] || shapes[from.split(".").pop()];
        if (!keys) continue;
        for (const k of explicit) {
          if (!keys.includes(k)) continue;
          findings.push({
            rule: "spread-clobbers-prop",
            why: `\`{...${from}}\` and an explicit \`${k}\` on one element: the later one REPLACES the other rather than merging, so one contribution is silently lost. Merge them explicitly, or keep the clashing key out of the spread object (see CHART_FOCUS_STYLE in components/hooks/chartCursor.jsx)`,
            file: rel,
            line: src.slice(0, el.index).split("\n").length,
            snippet: tag.replace(/\s+/g, " ").slice(0, 100),
          });
        }
      }
    }
  }
}

/* report */
if (findings.length === 0) {
  for (const r of RULES) console.log(`OK   ${r.id}`);
  console.log(`OK   reduced-motion-contract`);
  console.log(`OK   forced-colors-contract`);
  console.log(`OK   density-contract`);
  console.log(`OK   elevation-contract`);
  console.log(`OK   theme-alias-freeze`);
  console.log(`OK   illustration-theme-safe`);
  console.log(`OK   spread-clobbers-prop`);
  console.log(`\nALL CRAFT CHECKS PASS (${files.length} files, ${RULES.length + 7} rules)`);
  process.exit(0);
}

const byRule = {};
for (const f of findings) (byRule[f.rule] ||= []).push(f);
for (const [id, list] of Object.entries(byRule)) {
  console.log(`\nFAIL ${id} — ${list[0].why}`);
  for (const f of list) console.log(`     ${f.file}:${f.line}  ${f.snippet}`);
}
console.log(`\n${findings.length} CRAFT VIOLATION(S) across ${Object.keys(byRule).length} rule(s)`);
process.exit(1);
