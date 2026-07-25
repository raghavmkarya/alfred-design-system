import React from "react";

/**
 * Alfred AI — Illustration
 *
 * The scene art for Alfred's state moments: nothing here yet, nothing found,
 * something broke, done, connecting, first run.
 *
 * Why the art is inline rather than files in assets/illustrations/:
 * an SVG loaded through `<img src>` is an isolated document and cannot see the
 * page's custom properties, so it can never follow the theme. Icon gets away
 * with a CSS mask because its glyphs are single-colour; these are not. Inlining
 * is what lets one composition read correctly on light, app-dark and
 * marketing-dark instead of needing three exports each.
 *
 * House style (assets/illustrations/README.md): flat and geometric, bold shapes,
 * soft brand radii, restrained. Structure is drawn in semantic tokens so it
 * re-themes; colour is an accent, never wallpaper; **one gradient element per
 * composition**, reserved for the moment the scene is actually about.
 *
 * The character art (Alfred, the Leader) stays in assets/illustrations/ — it is
 * fixed brand art with its own grounds, not theme-adaptive UI furniture.
 */

// Shared construction: one grid, one stroke weight, one corner radius, so six
// scenes drawn on different days still look like one set.
const VB = "0 0 240 160";
const LINE = { stroke: "var(--border-default)", strokeWidth: 3, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
const SOFT = "var(--surface-sunken)";
const MUTED = "var(--border-subtle)";

function Grad({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
        {/* The brand gradient's stops are fixed by definition: identical in every
            theme, which is the whole point of the signature gradient. */}
        <stop offset="0%" stopColor="var(--periwinkle-400)" />{/* raw-ramp-ok: fixed gradient stop */}
        <stop offset="100%" stopColor="var(--orange-500)" />{/* raw-ramp-ok: fixed gradient stop */}
      </linearGradient>
    </defs>
  );
}

/* Each scene is a function of the unique gradient id, so two illustrations on
   one page never collide.

   Gradient sizing rule, learned by rendering these rather than by reasoning:
   the periwinkle→orange ramp needs AREA to read. Below roughly 40px it stops
   looking like the brand gradient and starts looking like a dull brown dot, so
   small accents are solid `--accent` and the gradient goes on the one large
   shape the scene is actually about. */
const SCENES = {
  /* nothing here yet — an open tray, and the card that has not arrived */
  empty: (g) => (
    <>
      <Grad id={g} />
      {/* the card that would be here, ghosted */}
      <rect x="82" y="26" width="76" height="34" rx="10" fill="none"
        stroke="var(--border-default)" strokeWidth="3" strokeDasharray="7 8" />
      <circle cx="120" cy="43" r="5" fill="var(--accent)" />
      {/* the tray */}
      <path d="M52 78 h136 a6 6 0 0 1 6 6 v40 a10 10 0 0 1 -10 10 H56 a10 10 0 0 1 -10 -10 v-40 a6 6 0 0 1 6 -6 Z"
        fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      {/* the tray's mouth, so it reads as open rather than as a closed box */}
      <path d="M46 100 h44 l9 14 h42 l9 -14 h44" fill="none"
        stroke="var(--border-default)" strokeWidth="3" strokeLinejoin="round" />
    </>
  ),

  /* nothing found — the lens is over the grid, and it is empty inside */
  "no-results": (g) => (
    <>
      <Grad id={g} />
      {[0, 1, 2].map((r) => [0, 1, 2, 3, 4].map((c) => (
        <circle key={`${r}-${c}`} cx={48 + c * 32} cy={46 + r * 30} r="5" fill={MUTED} />
      )))}
      {/* the lens sits on the canvas, not translucently over the dots */}
      <circle cx="108" cy="74" r="38" fill="var(--bg-canvas)" />
      <circle cx="108" cy="74" r="38" fill="none" stroke="var(--accent)" strokeWidth="4" />
      <path d="M135 101 l20 20" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* and it found nothing */}
      <path d="M96 62 l24 24 M120 62 l-24 24" stroke="var(--border-default)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),

  /* something broke — the stack holds until the row that slipped out of line */
  error: (g) => (
    <>
      <Grad id={g} />
      <rect x="46" y="34" width="148" height="26" rx="9" fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      <rect x="46" y="68" width="148" height="26" rx="9" fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      {/* genuinely displaced, and short, so "out of line" is the first thing you see */}
      <rect x="86" y="106" width="108" height="30" rx="10" fill="var(--danger-100)" stroke="var(--danger-500)" strokeWidth="3" />
      <path d="M110 114 v9 M110 129 v2" stroke="var(--danger-500)" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* the gap it left behind */}
      <path d="M46 121 h28" stroke="var(--border-default)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" fill="none" />
    </>
  ),

  /* done — the gradient is the moment, so it goes on the mark itself */
  success: (g) => (
    <>
      <Grad id={g} />
      <circle cx="120" cy="82" r="48" fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      <path d="M98 82 l16 17 l30 -36" stroke={`url(#${g})`} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="192" cy="40" r="5" fill="var(--accent)" />
      <circle cx="52" cy="124" r="4" fill="var(--accent)" />
    </>
  ),

  /* connecting — two systems, and the link still being drawn between them */
  connecting: (g) => (
    <>
      <Grad id={g} />
      <rect x="28" y="56" width="56" height="56" rx="18" fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      <rect x="156" y="56" width="56" height="56" rx="18" fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      {/* the arc reads as a route rather than a rule */}
      <path d="M84 84 q36 -34 72 0" fill="none" stroke="var(--border-default)" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 10" />
      <circle cx="120" cy="67" r="7" fill="var(--accent)" />
      <circle cx="56" cy="84" r="6" fill="var(--accent)" />
      <circle cx="184" cy="84" r="6" fill={MUTED} />
    </>
  ),

  /* first run — the climb, with the gradient on where it is going */
  "first-run": (g) => (
    <>
      <Grad id={g} />
      <path d="M40 134 h160" {...LINE} />
      <rect x="62" y="98" width="30" height="36" rx="8" fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      <rect x="106" y="74" width="30" height="60" rx="8" fill={SOFT} stroke="var(--border-default)" strokeWidth="3" />
      <rect x="150" y="40" width="32" height="94" rx="9" fill={`url(#${g})`} />
      <path d="M198 30 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 Z" fill="var(--accent)" />
    </>
  ),
};

// The name union lives in the .d.ts; the bundle would treat an exported array
// as a component, so nothing but the component itself is exported here.

export function Illustration({ name = "empty", size = 200, title, style = {}, ...rest }) {
  const uid = React.useId().replace(/:/g, "");
  const scene = SCENES[name];
  if (!scene) return null;
  const label = title || name.replace(/-/g, " ");
  return (
    <svg
      viewBox={VB}
      width={size}
      height={(size * 160) / 240}
      role="img"
      aria-label={label}
      style={{ display: "block", flex: "none", maxWidth: "100%", ...style }}
      {...rest}
    >
      <title>{label}</title>
      {scene(`ill-${uid}`)}
    </svg>
  );
}
