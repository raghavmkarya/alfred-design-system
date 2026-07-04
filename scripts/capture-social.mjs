#!/usr/bin/env node
/**
 * capture-social.mjs — batch-export every social frame to PNG.
 *
 * Each file in social/ is a standalone page at an exact pixel size
 * (the page IS the asset). This script reads that size out of each
 * file and screenshots it with headless Chrome at 1× (or 2× with
 * --scale 2 — recommended for LinkedIn/Instagram, platforms
 * downsample cleanly).
 *
 *   node scripts/capture-social.mjs                 # all frames → social/_exports/
 *   node scripts/capture-social.mjs --scale 2       # @2x export
 *   node scripts/capture-social.mjs youtube- og-    # only files matching a prefix
 *   node scripts/capture-social.mjs --out /tmp/x    # custom output dir
 *
 * Chrome is found at the standard macOS path, `$CHROME`, or on PATH.
 * Skips index.html (gallery, not an asset) and profile-avatar.html
 * (two frames on one bench page — screenshot each .frame by hand,
 * see social/README.md).
 */
import { execFileSync, execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOCIAL = join(ROOT, "social");
const SKIP = new Set(["index.html", "profile-avatar.html"]);

// ---------- CLI ----------
const args = process.argv.slice(2);
let scale = 1;
let outDir = join(SOCIAL, "_exports");
const filters = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--scale") scale = Number(args[++i]) || 1;
  else if (args[i] === "--out") outDir = resolve(args[++i]);
  else filters.push(args[i]);
}

// ---------- find Chrome ----------
function findChrome() {
  if (process.env.CHROME && existsSync(process.env.CHROME)) return process.env.CHROME;
  const mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (existsSync(mac)) return mac;
  for (const bin of ["google-chrome", "chromium", "chromium-browser"]) {
    try {
      return execSync(`command -v ${bin}`, { encoding: "utf8" }).trim();
    } catch { /* keep looking */ }
  }
  console.error("Chrome not found. Set $CHROME to the binary path.");
  process.exit(1);
}
const chrome = findChrome();

// ---------- read the frame size out of a file ----------
function frameSize(html) {
  // convention A: :root { --frame-w: 1200px; --frame-h: 630px; }
  const w = html.match(/--frame-w:\s*(\d+)px/);
  const h = html.match(/--frame-h:\s*(\d+)px/);
  if (w && h) return { w: +w[1], h: +h[1] };
  // convention B: .frame { ... width: 1080px; ... height: 1350px; ... }
  const rule = html.match(/\.frame\s*\{[^}]*\}/s);
  if (rule) {
    const rw = rule[0].match(/[^-]width:\s*(\d+)px/);
    const rh = rule[0].match(/[^-]height:\s*(\d+)px/);
    if (rw && rh) return { w: +rw[1], h: +rh[1] };
  }
  return null;
}

// ---------- collect the work list ----------
const files = readdirSync(SOCIAL)
  .filter((f) => f.endsWith(".html") && !SKIP.has(f))
  .filter((f) => filters.length === 0 || filters.some((p) => f.includes(p)))
  .sort();

if (files.length === 0) {
  console.error("No frames matched.");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

// ---------- capture ----------
let failed = 0;
for (const file of files) {
  const html = readFileSync(join(SOCIAL, file), "utf8");
  const size = frameSize(html);
  if (!size) {
    console.warn(`⚠ ${file} — no frame size found, skipped`);
    failed++;
    continue;
  }
  const out = join(outDir, file.replace(/\.html$/, scale === 1 ? ".png" : `@${scale}x.png`));
  try {
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--hide-scrollbars",
        "--disable-gpu",
        `--window-size=${size.w},${size.h}`,
        `--force-device-scale-factor=${scale}`,
        "--virtual-time-budget=5000",
        `--screenshot=${out}`,
        `file://${join(SOCIAL, file)}`,
      ],
      { stdio: "pipe" },
    );
    console.log(`✓ ${file} → ${size.w}×${size.h}${scale > 1 ? ` @${scale}x` : ""}`);
  } catch (err) {
    console.error(`✗ ${file} — ${err.message.split("\n")[0]}`);
    failed++;
  }
}

console.log(`\n${files.length - failed}/${files.length} exported to ${outDir}`);
console.log("(profile-avatar.html has two frames on one page — screenshot each .frame by hand.)");
process.exit(failed ? 1 : 0);
