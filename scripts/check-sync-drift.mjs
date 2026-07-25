/* Sync-drift check — the design system ships through three channels, and two of
   them can silently fall behind `main`:

     1. the claude.ai/design project  (pushed by hand via the DesignSync tool)
     2. GitHub Pages                  (auto-publishes, but a build can fail)

   Channel 1 drifted through six merges before anyone noticed, because a stale
   project looks exactly like a current one from the repo side. This turns that
   into a standing check.

   The key move is that detecting drift does NOT require reading the remote
   project: `.design-sync/config.json` records `lastSyncCommit`, so the delta is
   just a filtered `git diff`. That makes it runnable in CI with no design auth.

   Run: node scripts/check-sync-drift.mjs [--json] [--no-remote]
     --json       machine-readable output (for the workflow's issue body)
     --no-remote  skip the GitHub Pages API call (offline / no token)

   Exits 1 when a channel has drifted, 0 when everything is current. */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const args = new Set(process.argv.slice(2));
const AS_JSON = args.has("--json");
const NO_REMOTE = args.has("--no-remote");

const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8" }).trim();

// —— minimal glob → regex (the config's excludes; no deps by house rule) ——
// Supports trailing double-star, leading double-star, single-star within a
// segment, and exact paths. A double star crosses path separators; a single
// star does not.
function globToRe(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        // `**/` may match zero segments, so `a/**` also matches `a` itself
        if (glob[i + 2] === "/") { re += "(?:.*/)?"; i += 2; } else { re += ".*"; i += 1; }
      } else re += "[^/]*";
    } else if ("\\^$.|?+()[]{}".includes(c)) re += "\\" + c;
    else re += c;
  }
  return new RegExp(`^${re}$`);
}

const cfgPath = path.join(ROOT, ".design-sync/config.json");
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const excludes = (cfg.excludes || []).map((g) => ({ glob: g, re: globToRe(g), dir: globToRe(g.replace(/\/\*\*$/, "")) }));
const isExcluded = (f) => excludes.some((e) => e.re.test(f) || (e.glob.endsWith("/**") && e.dir.test(f.split("/")[0])) || f.startsWith(e.glob.replace(/\*\*$/, "")));

const head = git("rev-parse", "HEAD");
const headShort = head.slice(0, 7);
const findings = [];
const report = { head: headShort, channels: {} };

/* —— channel 1: the claude.ai/design project ————————————————————————— */
const last = cfg.lastSyncCommit;
if (!last) {
  findings.push({ channel: "claude.ai/design", why: ".design-sync/config.json has no `lastSyncCommit` — the sync state is unknown, so drift cannot be measured", fix: "sync, then record the commit in .design-sync/config.json" });
  report.channels.design = { status: "unknown" };
} else {
  let ancestor = true;
  try { git("merge-base", "--is-ancestor", last, "HEAD"); } catch { ancestor = false; }
  if (!ancestor) {
    findings.push({ channel: "claude.ai/design", why: `lastSyncCommit \`${last}\` is not an ancestor of HEAD — the pin is stale or the branch was rewritten`, fix: "re-sync and reset lastSyncCommit" });
    report.channels.design = { status: "invalid-pin", lastSyncCommit: last };
  } else {
    const raw = git("diff", "--name-only", `${last}..HEAD`).split("\n").filter(Boolean);
    const drifted = raw.filter((f) => !isExcluded(f));
    const commits = Number(git("rev-list", "--count", `${last}..HEAD`));
    report.channels.design = { status: drifted.length ? "drifted" : "current", lastSyncCommit: last, commitsBehind: commits, changedFiles: raw.length, driftedFiles: drifted };
    if (drifted.length) {
      findings.push({
        channel: "claude.ai/design",
        why: `${drifted.length} design-surface file(s) changed across ${commits} commit(s) since the last sync (\`${last}\`)`,
        fix: `sync project ${cfg.projectId} with the DesignSync tool, then set lastSyncCommit to ${headShort}`,
        files: drifted,
      });
    }
  }
}

/* —— channel 2: GitHub Pages ————————————————————————————————————————— */
if (NO_REMOTE) {
  report.channels.pages = { status: "skipped" };
} else {
  const repo = (git("config", "--get", "remote.origin.url").match(/github\.com[:/](.+?)(?:\.git)?$/) || [])[1];
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  try {
    if (!repo) throw new Error("could not derive owner/repo from the origin remote");
    const res = await fetch(`https://api.github.com/repos/${repo}/pages/builds/latest`, {
      headers: { accept: "application/vnd.github+json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) throw new Error(`GitHub Pages API ${res.status}`);
    const b = await res.json();
    const built = (b.commit || "").slice(0, 7);
    const current = b.commit === head;
    report.channels.pages = { status: b.status !== "built" ? "build-failed" : current ? "current" : "behind", builtCommit: built, buildStatus: b.status };
    if (b.status !== "built") {
      findings.push({ channel: "GitHub Pages", why: `the latest Pages build is \`${b.status}\`, not \`built\``, fix: "check the pages-build-deployment run" });
    } else if (!current) {
      findings.push({ channel: "GitHub Pages", why: `Pages is published from \`${built}\`, but HEAD is \`${headShort}\``, fix: "usually transient (a build in flight); if it persists, re-run the pages-build-deployment workflow" });
    }
  } catch (err) {
    // a probe failure is not drift — say so rather than reporting a false positive
    report.channels.pages = { status: "unchecked", reason: String(err.message || err) };
  }
}

/* —— report ————————————————————————————————————————————————————————— */
if (AS_JSON) {
  report.drifted = findings.length > 0;
  report.findings = findings;
  console.log(JSON.stringify(report, null, 2));
  process.exit(findings.length ? 1 : 0);
}

const d = report.channels.design || {};
const p = report.channels.pages || {};
console.log(`HEAD ${headShort}`);
if (d.status === "current") {
  // distinguish "nothing has happened" from "things happened but none of it ships",
  // because the second is the case a naive commit-count check gets wrong
  console.log(d.commitsBehind === 0
    ? `OK   claude.ai/design — current (synced at HEAD)`
    : `OK   claude.ai/design — current (${d.commitsBehind} commit(s) behind, but all ${d.changedFiles} changed file(s) are excluded)`);
}
if (p.status === "current") console.log(`OK   GitHub Pages     — published from ${p.builtCommit}`);
if (p.status === "unchecked") console.log(`--   GitHub Pages     — not checked (${p.reason})`);
if (p.status === "skipped") console.log(`--   GitHub Pages     — skipped (--no-remote)`);

if (!findings.length) {
  console.log("\nNO SYNC DRIFT — every channel is current with main.");
  process.exit(0);
}
for (const f of findings) {
  console.log(`\nDRIFT ${f.channel} — ${f.why}`);
  console.log(`      fix: ${f.fix}`);
  for (const file of (f.files || []).slice(0, 40)) console.log(`      · ${file}`);
  if ((f.files || []).length > 40) console.log(`      … and ${f.files.length - 40} more`);
}
console.log(`\n${findings.length} CHANNEL(S) DRIFTED`);
process.exit(1);
