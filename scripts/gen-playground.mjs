/* Derive the playground's prop schema from the .d.ts files (the source of truth
   for every component's API, already gated by verify-types).

   This is the same shape as gen-tokens.mjs: parse the authored source, emit a
   committed artifact, and let a verifier fail if the artifact goes stale. The
   playground itself stays a static page with no build step and no dependencies,
   which is what lets it publish to GitHub Pages and sync to claude.ai/design
   like every other surface here.

   Emits: playground/props.json
   Run:   node scripts/gen-playground.mjs */
import fs from "node:fs";
import path from "node:path";
import { sampleProps } from "./sample-props.mjs";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "_ds_manifest.json"), "utf8"));

/* The same sample props verify-components renders against, so a component opens
   in the playground with real data in it rather than as an empty shell. Handlers
   and nested elements can't cross into JSON: they become markers the page
   rehydrates (a no-op handler, or the element's text). */
const FN = "__fn__";
const stubH = (_type, _props, ...kids) => ({ __el__: kids.flat().filter((k) => typeof k === "string").join(" ") || "…" });
const SAMPLES = sampleProps(stubH, FN);
const encode = (v) => {
  if (typeof v === "function") return FN;
  if (Array.isArray(v)) return v.map(encode);
  if (v && typeof v === "object") {
    if (v.__el__) return v.__el__;
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, encode(x)]));
  }
  return v;
};

/* Which prop types the playground can offer a live control for. Anything else
   (functions, arrays of objects, CSSProperties) is still listed in the API table
   but is not editable — pretending otherwise would be worse than saying so. */
function control(tsType, enums) {
  const t = tsType.trim();
  if (t === "boolean") return { kind: "boolean" };
  if (t === "number") return { kind: "number" };
  if (t === "string") return { kind: "text" };
  if (enums[t]) return { kind: "select", options: enums[t] };
  // inline string-literal union, e.g. `"button" | "submit"`
  const lits = t.match(/^"(?:[^"]*)"(?:\s*\|\s*"(?:[^"]*)")*$/);
  if (lits) return { kind: "select", options: t.split("|").map((s) => s.trim().replace(/^"|"$/g, "")) };
  if (t === "React.ReactNode" || t === "string | number") return { kind: "text" };
  return null;                                     // documented, not editable
}

const files = [];
(function walk(dir) {
  for (const n of fs.readdirSync(dir)) {
    const f = path.join(dir, n);
    if (fs.statSync(f).isDirectory()) walk(f);
    else if (n.endsWith(".d.ts")) files.push(f);
  }
})(path.join(ROOT, "components"));

const byName = new Map(manifest.components.map((c) => [c.name, c]));
const out = [];

for (const file of files.sort()) {
  const rel = path.relative(ROOT, file);
  const src = fs.readFileSync(file, "utf8");
  const name = path.basename(file, ".d.ts");
  if (!byName.has(name)) continue;                 // not an exported component

  // local type aliases: `export type ButtonVariant = "a" | "b";`
  const enums = {};
  for (const m of src.matchAll(/export type (\w+)\s*=\s*([^;]+);/g)) {
    const body = m[2].trim();
    if (/^"(?:[^"]*)"(?:\s*\|\s*"(?:[^"]*)")*$/.test(body)) {
      enums[m[1]] = body.split("|").map((s) => s.trim().replace(/^"|"$/g, ""));
    }
  }

  // the component's own props interface
  const iface = src.match(new RegExp(`export interface ${name}Props\\s*\\{([\\s\\S]*?)\\n\\}`));
  const props = [];
  if (iface) {
    // split on lines so a preceding /** … */ block attaches to the next prop
    let doc = "";
    for (const line of iface[1].split("\n")) {
      const jsdoc = line.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
      if (jsdoc) { doc = jsdoc[1]; continue; }
      if (/^\s*\/\*\*/.test(line)) { doc = line.replace(/^\s*\/\*\*\s?/, ""); continue; }
      if (/^\s*\*\//.test(line)) continue;
      if (/^\s*\*/.test(line)) { doc += " " + line.replace(/^\s*\*\s?/, ""); continue; }
      const p = line.match(/^\s*(\w+)(\??):\s*(.+?);\s*$/);
      if (!p) { continue; }
      const [, pname, opt, ptype] = p;
      const defMatch = doc.match(/@default\s+(.+?)(?:\s*$)/);
      let def = defMatch ? defMatch[1].trim() : undefined;
      if (def !== undefined) {
        if (/^".*"$/.test(def)) def = def.slice(1, -1);
        else if (def === "true") def = true;
        else if (def === "false") def = false;
        else if (/^-?\d+(\.\d+)?$/.test(def)) def = Number(def);
      }
      const ctl = control(ptype, enums);
      /* A `@default` in a doc comment is prose, not a value: it says things like
         `niceRound`, `[]` or `${n}M`, which are a function name, an empty array
         and a template — none of them usable as a literal. Only keep a default
         we can actually validate against the prop's own type, or the playground
         would feed a component a string where it expects a function and blow up
         (this bit 7 components before the check was added). */
      const usable =
        def === undefined || !ctl ? undefined
        : def === "null" || def === "undefined" ? undefined
        : ctl.kind === "boolean" ? (typeof def === "boolean" ? def : undefined)
        : ctl.kind === "number" ? (typeof def === "number" ? def : undefined)
        : ctl.kind === "select" ? (ctl.options.includes(def) ? def : undefined)
        : typeof def === "string" ? def
        : undefined;
      props.push({
        name: pname,
        type: ptype.trim(),
        required: opt !== "?",
        doc: doc.replace(/@default\s+.*$/, "").replace(/\s+/g, " ").trim() || undefined,
        default: usable,
        documentedDefault: def !== undefined && usable === undefined ? String(def) : undefined,
        control: ctl,
      });
      doc = "";
    }
  }

  // the interface's doc block carries the @startingPoint hints (section/subtitle)
  const head = src.match(/\/\*\*([\s\S]*?)\*\/\s*export interface/);
  const sp = head && head[1].match(/@startingPoint([^\n*]*)/);
  const attr = (k) => { const m = sp && sp[1].match(new RegExp(`${k}="([^"]*)"`)); return m ? m[1] : undefined; };
  const summary = head
    ? head[1].replace(/@startingPoint[^\n]*/g, "").split("\n").map((l) => l.replace(/^\s*\*\s?/, "").trim())
        .filter(Boolean).join(" ").trim()
    : undefined;

  out.push({
    name,
    group: rel.split("/")[1],                       // components/<group>/Name.d.ts
    sourcePath: byName.get(name).sourcePath,
    section: attr("section"),
    subtitle: attr("subtitle") || summary,
    sample: encode(SAMPLES[name] || {}),
    props,
  });
}

const payload = {
  $meta: {
    source: "components/**/*.d.ts",
    note: "Generated by scripts/gen-playground.mjs — edit the .d.ts, not this file.",
    components: out.length,
    editableProps: out.reduce((n, c) => n + c.props.filter((p) => p.control).length, 0),
  },
  components: out,
};
fs.mkdirSync(path.join(ROOT, "playground"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "playground/props.json"), JSON.stringify(payload, null, 2) + "\n");

const noProps = out.filter((c) => c.props.length === 0).map((c) => c.name);
console.log(`playground/props.json — ${out.length} components, ${payload.$meta.editableProps} editable props`);
if (noProps.length) console.log(`  (no parsed props: ${noProps.join(", ")})`);
