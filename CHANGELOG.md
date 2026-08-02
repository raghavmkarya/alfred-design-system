# Changelog

Notable changes to the Alfred AI design system. Date-stamped (the system ships as a
synced folder, not an npm package, so there's no semver tag).

## 2026-08-02: a control can be small to look at and large to hit

Third answer to the same question the day has been asking — *what input has this suite never been
given?* It had never been asked about **pointer target size** (WCAG 2.5.8, AA in WCAG 2.2: 24×24 CSS
px). Fourteen of 117 components had a target under it.

**Four were real**, all icon-only: `Chip`'s remove at **14×14**, `TagInput`'s the same (it composes
`Chip`), `Toast`'s dismiss at 15×15, `Banner`'s at 16×16, `Drawer`'s close at 32×**22**.

The obvious repair — pad the button out to 24×24 — is not free. It changes the button's box, which
changes the row's layout, which changes every visual baseline, for a control nobody wanted to look
bigger. The 14px glyph is a deliberate choice: a 24px close cross in a toast competes with the
message.

**`HitArea`** is the answer instead: a transparent absolutely-positioned child that overhangs the
button. Out of flow, so it costs no layout and moves no pixel; inside the button, so the button is
what receives the click. Two things it needs and one thing to watch, all written down in the new
`guidelines/target-size.md` — the second being that an overhang can reach across a gap and swallow a
*neighbouring* target's clicks.

The gate measures the **union** of the button and its descendants, because measuring the button's own
box would report every one of these as still broken. It also asserts a `Chip` is exactly the same
height with and without a remove button, which is the entire justification for the approach.
Removing one `<HitArea />` fails it at 14px.

**The other ten are exempt and are documented as such**, so nobody "fixes" them later. 2.5.8 exempts
targets in a sentence or block of text: `IntegrationCard`, `ModuleStatusCard`, `Callout` and
`DataTable`'s column sort buttons all measure 14–18px because that is a line of text, and padding
them would put visible gaps in prose. Range inputs report a 6px box but the UA hit-tests the thumb.
And **`Tabs` at 11px wide is a fixture artifact** — the playground generates single-character labels,
so the sweep was measuring its own fixtures. That is the third time in two days.

## 2026-08-02: the reflow tail was one bug, not seven

The 320px work below left seven small spills recorded as known-and-unfixed. Re-measured at a **real
320px viewport** instead of a pinned canvas, **six of the seven were not bugs at all**, which is the
frame lesson landing for the third time in two days. `Drawer` and `Popover` are absolutely
positioned, so a canvas-pinned ruler was measuring them against the wrong box entirely;
`TeamMemberRow`, `PromptSuggestions` and `SeekComposer` were flex-container artifacts of the same
kind. All five scroll a real 320px page by exactly zero pixels.

**`DateRangePicker` was the one real case**, and its repair has a lesson of its own. Five presets are
336px. The control is a segmented **pill** — rounded ends, dividers between neighbours — so wrapping
it produces a broken shape rather than a smaller one; it scrolls on its own axis instead, which is
what 1.4.10 asks of content that needs a horizontal layout to keep its meaning, and the same answer
`DataTable` already uses.

Adding `maxWidth: "100%"` to the pill did **nothing**, twice measured. The root is `inline-flex`,
which is shrink-to-fit, so the percentage resolved against a width that was itself content-sized —
circular. Capping the root as well gave the percentage something real to measure against. **If a
`max-width: 100%` seems inert, check whether its containing block has a definite width at all.**

The `reflow` project now covers all six, the five non-bugs included: they are there so the judgement
that they are fine is recorded as a test rather than as a note. Reverting the root cap fails it at
336px.

## 2026-08-02: long strings, and the fix that fixed nothing

Every fixture in this system is short English. German UI copy runs about **35% longer**, and a single
unbreakable token — a compound noun, a URL, an account ID — has no break opportunity at all. Nothing
here had ever been rendered with one.

**The obvious fix fixed nothing, and that is the useful part.** A global
`overflow-wrap: break-word` went into `tokens/base.css` first. Re-running the sweep: **27 of 117
before, 27 of 117 after.** Not one component changed.

Because the failure mode is not overflow, it is **oversizing**. A flex item's automatic minimum size
is its **min-content** size, so a component holding an unbreakable word does not spill its box — the
box *grows*, and takes the row with it. `overflow-wrap` never engages, because nothing is
overflowing. It is the same `min-width: auto` floor as the `1fr` grid bug below, seen from the other
side. The rule stays, because it becomes load-bearing the moment a container is allowed to shrink,
but it is documented as what it is.

**The real mistake is `white-space: nowrap` on a caller's string.** A component cannot know how long
a prop is, so `nowrap` there makes the caller's string the component's minimum width. Five had it
without a cap: `UsageMeter` (its `flex: "none"` value span held the count *and* the caller's `unit`
rigid), `FilterBar`, `SyncStatusBadge`, `BillingPlanCard` and `AuditLogRow`. All now pair it with
`maxWidth` + `overflow: hidden` + `textOverflow: ellipsis`. `nowrap` on text a component *authors* —
a separator, a tabular number — is untouched and fine.

**27 became 5 once the frame was right.** The first sweep drove the playground, whose canvas is a
**flex** container — and a flex item's `min-width: auto` floor beats its own `max-width: 100%`, so it
manufactures failures no ordinary page would see. Re-run in a plain 360px **block** container,
`PageHeader`, `DateRangePicker`, `AlfredMessage` and `ReasoningState` were all perfectly fine.
Checking the frame before fixing 27 components was worth more than the fixes.

`tests/strings.spec.js` renders eleven components with a 55-character unbreakable word in that block
container and asserts nothing leaves the box. Reverting `UsageMeter` alone fails it at 178px.

## 2026-08-02: an element that paints nothing was adding 69px of horizontal scroll

Nothing in this repo had ever rendered below **1240px**. The `visual`, `interaction`, `forced-colors`
and `playground` projects all pin that one width, so WCAG 1.4.10 reflow — content usable at a 320px
CSS viewport, which is 1280px at 400% zoom — was a criterion the whole suite was structurally unable
to see. Same shape as RTL a day earlier: the gate existed, and it only ever got one input.

**Thirteen of 117 components spilled a 320px viewport. The worst one was invisible.**

Every `role="img"` chart renders a visually-hidden `<table>` of its data (the text alternative from
PR #40), styled with the canonical sr-only recipe:

```js
{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }
```

That is correct on a block container and **wrong on a `<table>`**. A table box ignores a width below
its min-content width, and `overflow` does not clip it, so the table laid out at its natural ~390px.
`clip` suppresses *painting*, not *layout*, and an absolutely positioned box still contributes to its
containing block's scrollable overflow.

**One chart alone on a 320px page made the document 389px wide.** Sixty-nine pixels of horizontal
scroll produced by an element that paints nothing at all, on all ten charts that use the primitive.
The fix is one wrapping `<div>`.

No static rule could ever have found it: the declaration is the canonical idiom, correctly spelled.
Only the box it lands on makes it wrong.

**The other class was `1fr`.** A `1fr` track's automatic minimum is **min-content**, not zero, so a
grid column will not shrink past its widest unbreakable child. `StatBand` prints its numbers at 64px,
which gave three columns a floor near 400px. Five components carried a bare `1fr`; all now use
`minmax(0, 1fr)`, and **`grid-1fr-min-content`, the twentieth craft rule**, blocks the bare form. It
needed a balanced-paren stripper, because the one spelling already correct —
`minmax(min(260px, 100%), 1fr)` — nests, and a lazy `[^)]*` stops at `min()`'s bracket and fails it.

Also fixed: `Stepper` (three fixed 120px steps are 360px; now `flex: "0 1 120px"`, so the basis still
wins whenever there is room), `Countdown` (four 74px segments plus gaps overshoot by six pixels; now
wraps) and `Pagination` (a windowed pager is eight controls; now wraps).

**An eleventh Playwright project, `reflow`**, renders at 320×720 and asserts each chart alone on an
otherwise empty page adds no second scroll axis. Alone is deliberate: on a shared page one wide
sibling masks or manufactures the result.

**Being exact about what it proves**: reverting the chart fix fails only **two** of the ten per-chart
tests, because a hidden table is only wide enough to spill when its fixture data makes it so. The
structural assertion — the hidden style must sit on a `div`, not the table — is what actually guards
the class, and the spec says so in place rather than implying ten tests cover it.

**Two things the fix itself taught, both by failing first.** `table-layout: fixed` on the table looks
like the tidier repair and is **not sufficient**: it binds the declared width for the table *grid*,
but a `<caption>` sits outside that grid and its nowrap text still pushes the box wide. And a
clipping wrapper is a **real element** — rendering `<ChartTable>` before a chart's visual content
shifted every `> div` index under that root by one, moving `BulletChart`'s first row from `nth(0)` to
`nth(1)` and breaking two cursor tests. It renders after the graphic now, which is the better reading
order regardless: the table restates what the chart already showed.

Two findings are recorded as **not** bugs: `Drawer` already carries `maxWidth: "90vw"`, and
`DataTable` and `CapabilityTicker` scroll inside their own containers, which is exactly what
1.4.10's two-dimensional-content exemption asks for.

## 2026-08-01: the other half of the RTL sweep, and why it is not becoming a gate

`--flip` below came out of rendering all 117 components in both directions. **32 differed.** This is
the rest of that triage.

**One more real bug, and it is the sibling of the last one.** `AuditLogRow` indented its expanded
detail with `padding: "0 16px 14px 54px"` — a four-value shorthand, which is top-**right**-bottom-
**left**. The 54px lines the detail up under the row's actor mark, so under RTL the mark moved to
the other edge and the indent stayed where it was.

`physical-inline-prop` could not see it for the same structural reason `physical-translate` had to
exist: that rule finds a wrong property **name**, and a shorthand never spells one. `padding` is a
perfectly neutral name. **`handed-shorthand`, the nineteenth rule**, reads the value instead: two
values (`block inline`) and three (`top inline bottom`) are symmetric and pass, four is handed
whenever right and left differ. `borderRadius` counts corners rather than edges, so it is checked on
its own terms (`Tabs`'s `3px 3px 0 0` is symmetric and passes).

Splitting one is where this bites twice: the shorthand reads **right then left** and `padding-inline`
reads **start then end**, so transcribing left-to-right gets it backwards — and LTR looks perfect
either way.

**The other 26 were noise, and that is the finding.** A sweep like this is an audit tool, not a CI
gate; a version tolerant enough to be green would mostly be asserting a 25-entry allowlist. Two
thirds of its output is structural:

- **Inside `<svg>`** — the box mirrors, the glyph does not and should not. A magnifier is not a
  mirrored magnifier.
- **Inline content in text** — bidi reordering moves a citation pill or a price fragment for reasons
  unrelated to handedness. `AlfredMessage`, `ApprovalGate` and `PriceCard` all flagged and all use
  logical properties correctly.
- **Charts** — deliberately physical, recorded years-deep in `guidelines/rtl.md`.

So the sweep is written down as a **recipe** in that guideline, alongside the icon contact sheet it
resembles: throwaway, scratchpad-only, run when a new layout primitive lands. What it found became
two static rules that run on every PR in milliseconds.

Six of 32 were real, and they were **two bugs wearing six faces**.

## 2026-08-01: `--flip`, because `transform` never got a logical form

Every RTL rule in this system says the same thing: use the logical property. That advice covers
margin, padding, border and inset, and it silently does not cover **`transform`**, which has no
logical twin at all. `translateX(18px)` is eighteen physical pixels to the right in every writing
direction.

So five components mirrored their layout correctly and then moved something the wrong way inside it:

| component | what moved backwards |
|---|---|
| `Switch` | the knob, by 18px |
| `OfferSwitch` | the knob, by 16px |
| `ModuleStatusCard` · `IntegrationCard` | the "learn more" arrow's 3px hover nudge |
| `JobListingRow` | the arrow's 2px active nudge |

**The switch is the sharp one.** Its track mirrors, so under `dir="rtl"` the checked knob starts from
the right edge and then travels a further 18px right — **15px outside its own track**, at the one end
that reads as *off*. A control whose entire job is to show a binary state showed the wrong one.

`--flip` is the fix and it is one line of CSS: `1` at `:root`, `-1` under `[dir="rtl"]`, and `1` again
under `[dir="ltr"]` so an LTR island inside an RTL page stays upright. Distances multiply by it.
The three arrows use `scaleX(var(--flip)) translateX(3px)`, which mirrors the arrowhead *and* puts
the nudge in the flipped space, so one expression fixes both the direction the glyph points and the
direction it moves. LTR renders byte-identically — all three visual baselines passed untouched.

**An eighteenth craft rule, `physical-translate`**, blocks any other horizontal translate distance in
component JSX. Zero and ±50% pass, being direction-neutral; three deliberate cases carry an `rtl-ok`
marker (`Drawer`'s `side` is a physical placement API, `ConfidenceMeter`'s thumb and the chart
cursor's readout are chart coordinate space). It needed a balanced-paren scan rather than a lazy
character class, because the spelling it is asking for — `translateX(calc(16px * var(--flip)))` —
nests two levels deep.

**Why nothing caught this for four phases.** `physical-inline-prop` works by spotting a wrong
property *name*. Here the property name is correct and only the *value* has a handedness, so there
was nothing for a static rule to see, and an LTR screenshot cannot see it either. The bug was found
by rendering all 117 components in both directions and comparing each element's distance from the
**leading** edge — 32 differed, and this was what survived triage. `tests/interaction.spec.js` now
measures both knobs that way; reverting either fails at -15px.

## 2026-07-30: `eye` and `eye-off`, because a password toggle was borrowing two unrelated glyphs

`components/core/core.card.html` wired the password field's show/hide button to
`read-only` and `fullscreen`: a crossed-out pencil and a set of corner brackets, standing in for an
eye that did not exist. The icon conversion surfaced it — while redrawing `read-only` it became
obvious that nothing about "no editing" says "hide this password".

Two new glyphs on the same grid, and the button now also carries a real accessible name
(`Show password` / `Hide password`), which an icon-only control needs and this one never had.

**39 glyphs, still one family.** This is the first *addition* to the set since it became uniform, and
it went in the way the guideline now describes: drawn on the 24 grid, rendered at 88px beside
`check.svg` to compare weight, added to the gallery card.

## 2026-07-30: the consumer check tests the whole peer range, not one point in it

`verify-consumer` landed testing whatever `react` resolved to — `latest`, in practice. That is one
point on a range the package declares as **`>=18`**, and picking the newest point has the same shape
of blind spot as picking the oldest: the nine source verifiers run on 18 and missed a React 19 bug,
so a check that only runs on 19 would miss the mirror image.

It now runs the matrix **18 · 19 · latest**, reporting per version, and `latest` says so when it
resolves to a major already covered rather than repeating itself. Re-injecting the `inert` bug shows
the point exactly: 18 passes, 19 fails, which is precisely how the bug behaved in the wild.

**`latest` floats on purpose**, which means CI can turn red without a commit the day React 20 ships.
That is the correct signal rather than a flaw: `>=18` already promises that version works, so the
day it stops working is the day to either support it or narrow the range. A promise you decline to
test is not a smaller promise, only a quieter one.

Cost: the whole check runs in about 7 seconds, since the two installs share one scratch project.

## 2026-07-30: a tenth verifier, which installs the package the way a user does

The `inert` bug below existed because **every check here runs on `react@18.3.1`** — the *lower bound*
of the peer range — while consumers install React 19. Nine verifiers and 52 browser tests passed on a
package that was missing an accessibility attribute in the wild.

`verify-consumer` closes that. It packs `dist/`, installs the tarball **plus the latest React** into a
scratch project, server-renders all 117 exports there, and fails on any React warning — the signal
that exposed the bug in the first place — plus explicit assertions for attributes that differ across
majors. Confirmed by re-injecting the original `inert=""` and watching it fail with two errors, then
pass again on the fix.

**It is the only check that needs the network**, and that is deliberate: an offline stand-in would be
testing something other than what a consumer runs. Everything else stayed offline-clean.

The generalisation worth keeping: a peer-dependency range is a **promise about versions you do not
test**. Testing the source is not testing the package, and testing the package on your own dev
dependency is not testing it on the version people install.

## 2026-07-30: 1.1.1 — a closed FAQ panel was not inert on React 19

Smoke-testing the freshly published 1.1.0 in a scratch project found a bug no gate here could have
caught: **`FaqItem`'s collapsed panel shipped without its `inert` attribute for anyone on React 19.**

The component wrote `inert={!isOpen ? "" : undefined}`. The two React majors disagree about every
spelling of that attribute:

| value | React 18.3.1 | React 19.2.8 |
|---|---|---|
| `true` | **dropped**, warns | `inert=""` |
| `""` (what shipped) | `inert=""` | **dropped**, warns |
| `"inert"` | `inert="inert"` | `inert=""` |

So the attribute that keeps a collapsed panel out of the tab order and away from a screen reader was
**silently absent on the version consumers install today**, and present in every test we run, because
the repo develops against the peer range's lower bound. `"inert"` is the one spelling that is correct
and warning-free on both, and it is a valid HTML boolean attribute either way — presence is what
counts, the value is ignored.

**The gate asserted the bug.** `verify-a11y` required `/inert=""/`, which is exactly the React 18
rendering of the broken input, so the check confirmed the very thing that failed elsewhere. It now
asserts `/inert="inert"/`, and the matrix above lives in the component next to the prop.

Worth stating plainly: this was found by **installing the published tarball and rendering it**, not by
any of the nine verifiers, 52 browser tests, or the npm contract check. Testing a package as its
consumers get it is a different act from testing the source it was built from.

## 2026-07-30 (correction): the `@dsCard` previews still use the CDN, on purpose

The entry below is titled "gone from the repo". That is **overstated**: the **20 `@dsCard` preview
pages** (`components/**/*.card.html`, `guidelines/*.card.html`) still load React and
`@babel/standalone` from unpkg, and they are linked from the published gallery.

They are staying, and the reason is that they are not only ours. A card is consumed by
**claude.ai/design**, whose runtime decides how the file is fetched and executed; a card that depends
on a sibling `.js` is a bet on behaviour this repo does not control and cannot test. The kits could be
precompiled precisely because they are only ever served as static files from a path we own.

So the accurate statement is: **unpkg is out of the build, out of every verifier, out of the
playground and out of the four UI kits.** It remains in the 20 preview cards by decision. If that
changes, the check in `verify-playground` is where the new paths go.

## 2026-07-30: unpkg.com out of the build, the verifiers and the published app surfaces

The playground stopped loading React from a CDN this morning. Following the same thread through the
rest of the system turned up something worse than a slow docs page: **the build itself fetched Babel
over the network**, and so did three verifiers.

**`compile-components.mjs` was fetching `@babel/standalone` from unpkg on every run.** That is the
shared pipeline behind `_ds_bundle.js`, the npm package and three gates, so a CDN outage did not
degrade the design system, it made it **unbuildable**. `verify-render`, `verify-components` and
`verify-a11y` each fetched React the same way. All four now read from `node_modules` — every one of
those packages was already a devDependency pinned by `package-lock`, so this costs nothing and pins
what the CDN was serving loosely. The `verify` gate is now offline-clean; the rebuilt bundle is
byte-identical, which is the evidence that the CDN and the local copies were the same files.

### The four UI kits are precompiled, not vendored

The kits loaded React, ReactDOM **and `@babel/standalone`** and transformed their JSX in the browser.
Vendoring Babel the way the playground vendored React was the obvious move and the wrong one: it is
**3.1MB**, twenty times the React commit, to ship a compiler to every visitor of a static demo page.

So `scripts/build-kits.mjs` compiles each kit `.jsx` to a committed `.js` twin, and the pages load
those. No Babel anywhere, no CDN, and the pages get faster. Freshness is gated exactly like the
bundle: a deterministic rebuild must produce no diff.

**One thing this had to get right, and got wrong first.** `<script type="text/babel">` ran each block
through an indirect eval, where a top-level `function` declaration lands on the global object but a
top-level `const` does **not**. That is why every kit file could privately write
`const { Badge } = window.AlfredAIDesignSystem_1ce241` while still seeing the others' components.
Plain `<script>` tags share one lexical scope, so the first compile threw
`Identifier 'Badge' has already been declared` and rendered nothing at all. Each file is wrapped in an
IIFE now, with its top-level function declarations re-exported to `window` — the old semantics,
stated explicitly instead of inherited from a compiler's eval strategy.

A new `kits-boot` test loads all four pages in a browser and asserts three things: `#root` is not
empty, the console is clean, and **no request leaves localhost**. The last one is the only assertion
that can catch a CDN creeping back in.

`vendor/` moved to the repo root, since the playground and the kits now share it.

## 2026-07-30: the icon set is one family — `LEGACY_FILLED` is empty

`integration-success`, `locked-feature`, `web-clarity` and `web-stack-connected` are redrawn, and
with them **all 27** design-tool exports are gone. **37 glyphs, one construction**: 24×24, stroked,
`stroke-width="2"`, round caps and joins. `guidelines/icon-grid.md` no longer opens with "two
families, honestly".

Three decisions in this last batch, none of them a trace of the original:

- **`locked-feature` was a padlock welded to a gear with an up-arrow inside it.** Three ideas in
  16px. It is a padlock and `GLYPH.sparkle` now: locked, and premium, which is what the call sites
  mean. A stroked gear at this size is a dark ring with bumps.
- **The globe in `web-stack-connected` had to lose its meridian.** At r=4.6 with a 2px stroke, a
  circle plus equator plus meridian leaves about a unit and a half of white and renders as a dot.
  Circle, equator, one vertical line. The bigger globe in `web-clarity` keeps its curved meridian
  because it has the radius to spend.
- **`integration-success` keeps its three nodes on a ring**, which was the one original composition
  that translated directly: three arcs, three node circles, a check in the middle.

**What the conversion was actually worth.** Thirteen of the twenty-seven were wrong in a way nobody
had noticed, and every one of them was found by the act of redrawing rather than by a check:
`trend-down` was a byte-for-byte copy of `trend-up`, `security-lock` was a shield, `cta-arrow` pointed
backwards on a "Continue" button, `mql` was three letters of type shipping at 17px. A name and a
filled blob agree with each other far too easily. `LEGACY_FILLED` stays empty; the comment above it
now records why.

## 2026-07-30: four illustrations redrawn, and one of them stopped pretending to be text

Fourth batch: **`mql`, `gdpr`, `budget`, `channel-mix`**. **4 legacy, 33 modern.**

**`mql` was a document with the letters "MQL" drawn as paths.** Lettering does not survive an icon
grid: it ships at 17px inside a `KpiCard`, where three glyphs of type are a grey smudge that reads as
texture, not as a word. Redrawn as **a person with a check** — a qualified lead, which is what the
label beside it already says. Converting it was the only way to notice; the filled original had been
"a document with something written on it" to every eye that passed it.

**`gdpr` is a document with a padlock, not a shield.** The obvious redraw was a shield with a
keyhole, and it was drawn and rejected: the set already has `security-lock` (a shield) and
`step-locked` (a padlock), so a third shield silhouette would have been the fourth checkmark problem
in a new costume. A padlock **on a document** is the thing GDPR actually names.

Each was rendered at 88px beside the glyphs it sits near before being kept — `mql`'s first cut had
the check tangled in the shoulder line, and `budget`'s pie read as a blob until the wedge became two
radius strokes on a full circle.

## 2026-07-30: six more icons — the legacy family is down to its eight illustrations

Third batch: **`sort`, `delete`, `export`, `read-only`, `step-locked`, `audit-log`**. **8 legacy, 29
modern**, from 27 and 10 at the start of the day.

What is left is qualitatively different from what has gone: `mql`, `gdpr`, `budget`, `channel-mix`,
`integration-success`, `locked-feature`, `web-clarity` and `web-stack-connected` are small
**illustrations** (a stacked-server globe, a document with a lock and a shield), not glyphs. Their
path data runs 2,265 to 6,479 characters. Budget four or five per pass, not seven.

**`read-only` is a crossed-out pencil**, which is what the filled original always drew and what the
name means everywhere it is used — except in `core.card.html`, where it is wired to a password field's
show/hide toggle opposite `fullscreen`. That call site wants an eye and an eye-off; it is borrowing
two unrelated glyphs and now borrows them at a lighter weight. Left alone deliberately: adding an eye
pair is a set decision, not part of a conversion pass.

## 2026-07-30: `@alfredai/design-system` 1.0.0 → 1.1.0

npm was the one distribution channel left behind `main`. 1.0.0 predates everything shipped today, so
anyone installing from npm got charts without cursors and the filled icon family.

**Minor, not patch.** Two components gained behaviour: `BulletChart` is now a focusable group whose
cursor walks its rows, and `GaugeChart` becomes one when given `segments`. Both are additive, no prop
was removed or renamed, and a gauge with no bands renders exactly as it did — so it is a feature
release rather than a breaking one. Thirteen icons also changed shape, which is visible but not an
API change.

The publish itself has to run from a real terminal: `npm run publish:npm` needs npm 11 and an
overlapping TTY for the passkey browser handoff. See the *Releasing to npm* notes.

## 2026-07-30: two components had no prompt file, and nothing was looking

`.prompt.md` is what an agent reads for a component it has not met, so a component without one is
invisible to the surface this whole system exists to serve. **`BrandMoment` and `Illustration` had
been missing theirs since they were added.**

The reason is a one-directional generator: `gen-prompts.mjs` writes only files that **do not exist**,
which is right (the prose is hand-edited afterwards and must not be clobbered), but nothing ever
checked the other direction. `verify-playground` does now — every component in the manifest must have
a `.prompt.md` — and it was checked against a hidden file before being trusted.

The same run also wanted to generate prompt files for **`components/hooks/`**, which is internal and
deliberately off the public namespace: `useChartCursor`, `ChartTable`, `usePress` and `GLYPH` have no
prop table and no call site anyone would write. The generator skips that directory now rather than
relying on someone noticing and deleting four files.

## 2026-07-30: six more icons, and a file glyph finally shares a definition with an inline one

Second batch: **`alert-warning`, `security-lock`, `bookmark`, `pin`, `fullscreen`, `refresh`**.
**14 legacy, 23 modern**, from 20 and 17 this morning and 27 and 10 yesterday.

**`alert-warning.svg` is now `GLYPH.warningTriangle`, character for character.** That is the first
time a file icon and an inline glyph have shared one definition rather than two drawings of the same
idea, and it is the whole point of having both delivery mechanisms single-sourced. It also gains the
exclamation the file version never had: the inline triangle has always shipped triangle-plus-bang as
one glyph, and a bare triangle beside it read as a different mark.

Two of the six were **not what their name says**, which only becomes visible at 88px:

- **`security-lock` is a shield**, not a lock. Redrawn as a shield, because that is what every call
  site has been rendering and what the trust surfaces expect.
- **`refresh` needed three attempts.** A chevron head tangent to the arc reads as a stem on a
  balloon; the shape only became a refresh once the head was a corner bracket sitting *inside* the
  circle's silhouette. Rendered and looked at each time — a path that is geometrically correct can
  still draw the wrong picture.

## 2026-07-30: seven icons onto the stroked grid, and trend-down was drawing an up arrow

First batch off the legacy filled family: **`trend-up`, `trend-down`, `trend-flat`, `close`,
`cta-arrow`, `demo-play` and `pricing-cross`** are redrawn on the 24×24 stroked grid, and out of
`LEGACY_FILLED`. **20 legacy, 17 modern**, from 27 and 10.

**`trend-down.svg` was a byte-for-byte copy of `trend-up.svg`.** Every `KpiCard` with
`direction="down"` has been drawing a *rising* arrow, in the one component whose job is to say which
way a number moved. It is now an actual descent. Nothing could see it: `verify-icons` read
**components** for duplicated inline paths and never read the icon set against itself.

**So that gate exists now.** Two icon files that render the same set of shapes fail the check, and it
was confirmed against an injected copy before being trusted. This is the thirteenth time a new gate
has found a real bug on its first run.

Three things worth writing down about the redraws:

- **An outline-traced fill cannot be transformed into a stroke.** Each of these was a single filled
  path on a fractional viewBox (`0 0 13.100 7.370`), so every one is a hand redraw on the 24 grid and
  then a look at the two side by side. Seven is about the right batch; 20 remain.
- **`cta-arrow` now points up-right.** It pointed up-**left** — visible only once it was rendered at
  88px, and it ships as the trailing icon on a "Continue" button. A back-arrow on a forward action.
- **`demo-play` and `pricing-cross` change weight, deliberately.** A solid triangle becomes an
  outlined one and a filled ring becomes a stroked one; that lighter read is the entire point of the
  family they are joining, and it is why this cannot be done invisibly in bulk.

## 2026-07-30: the playground carries its own React

The docs page loaded React and ReactDOM from unpkg.com with SRI hashes. It is a **published** page,
so it could not take the fix the test harness took (pointing at `node_modules`), and it was left as
the one real third-party runtime dependency in the system.

**142KB of production React is now committed under `playground/vendor/`** and the CDN tags are gone.
Two things this buys beyond surviving a CDN outage: an SRI hash only proves the CDN served the right
bytes, it does nothing when the CDN is unreachable; and the page now ships the **production** build,
which is what a docs page should have been serving rather than the development one with its warning
machinery.

**`verify-playground` gained a tenth check** so the copies cannot drift: each vendored file must be
**byte-identical** to the installed `react@18.3.1`, the filename carries the version (so a React bump
renames it and cannot pass silently), `index.html` must load both, and the page must reference **no**
CDN host at all. Checked against an injected violation before being trusted.

The five `ui_kits/*/index.html` pages and the `@dsCard` previews still load React **and Babel** from
unpkg. They compile JSX in the browser, so making them self-contained means committing
`@babel/standalone` too, which is a bigger call than this one.

## 2026-07-30: Gauge and Bullet cursors — the last two charts, and what the old decision got wrong

`chart-contract.md` recorded Gauge and Bullet as a **decision not to**: "a gauge is a single value
already printed large in its own centre; a bullet row prints its label, value and target as real
text." Revisiting it for uniformity, the first half held and the second half turned out to be wrong
about the component.

**A bullet row does not print its target.** It draws it as an **unlabelled tick**, and the ratio
between value and target — the only number anyone reads a bullet chart for — appears nowhere on
screen. The old argument had been made from the prop names, where `target` looks like something the
row prints. Reading the render is what settled it. So the cursor walks rows and announces
`Search: 80, target 100, 80% of target`, with the visible readout anchored to **the tick** rather than
to the bar, because the bar's value is already printed at the end of the row.

**The gauge's cursor walks BANDS, not the value** — the first half of the old decision, kept. A band
is a tinted arc carrying no name and no bounds anywhere in the graphic; the value is 26% of the
gauge's diameter in the middle of it. And a gauge given **no** `segments` has nothing to walk, so it
has no cursor and no tab stop at all, staying the static `role="img"` shape. That is the `Legend`
precedent: a legend becomes interactive only when given `onToggle`, and a chart earns a tab stop by
having something to say, not by being a chart.

Three smaller things that came out of building it:

- **A gauge is not a closed ring.** Its sweep is 270° with a 90° gap at the bottom, so a pointer below
  it is inside the radius and on nothing. That case has to return null; clamping to the nearest end
  would make the rail appear to wrap around through the gap.
- **The gauge's hidden data table printed empty bands.** It read `s.to ?? s.value` for each segment's
  value, and a segment has neither — it has `upTo`. Every band row had been rendering blank since the
  table was added. The rows now read the same `zones` the arcs are drawn from, so the two cannot
  disagree, and `verify-a11y` asserts the printed range (`Behind` → `0 to 60`).
- **Both active states thicken as well as recolour.** In forced-colors mode the tint and the accent
  border are both overridden, so geometry is the only signal that survives: the active gauge band
  gains 4px of stroke, the active bullet bar goes 14px → 18px.

Nine of the fourteen now carry a cursor. Of the rest, `Legend` is interactive on its own terms (given
`onToggle`), `Bar`, `Funnel` and `Heatmap` render every value as readable text, and `Sparkline` stays
out deliberately: it is glanceable, and often several to a KPI row.

## 2026-07-30: the product glossary is tracked, and the component list is honest again

**`CONTEXT.md` is now `docs/context.md`, committed.** It had sat untracked in the repo root for four
sessions, deliberately excluded from every PR, which made it the one file here that could rot without
anything noticing. It defines the platform / product / release-status language the copy in this system
is written against, so it is design surface: it ships with the folder and syncs to claude.ai/design
like everything else. `guidelines/voice-and-naming.md` now points at it, with the split stated —
voice is how the copy sounds, the glossary is which nouns are true. Calling a launch-ready product
"live" is a factual error, not a tone one.

**The readme claimed 113 components and listed 113 while the system has 117.** `BrandMoment`,
`Illustration`, `EvidenceLedger` and `DecisionFork` were missing from the inline list, and the count
in front of it had been carried forward unchanged. Both fixed against `_ds_manifest.json` rather than
by recount. This is the third time a hardcoded count in prose has drifted; the standing preference is
to derive counts, as the playground test now does.

## 2026-07-29: the last glyph drift, and the CDN out of the test gates

Three small things, each closing a known loose end.

**`Callout`'s insight tone drew a second Alfred spark.** The same four-point star as `GLYPH.sparkle`,
but rounder-armed and more inset, and **drawn exactly once** — so no duplication check could ever have
flagged it; it was found by eye. Rendered side by side at 140px the two are plainly the same glyph at
two slightly different weights, and at the 16px they ship at they are nearly indistinguishable. Callout
now uses `GLYPH.sparkle`, stroked. The constant's comment no longer claims it is filled-only: it is one
shape with two treatments, filled in the conversation and trust components, stroked here where it sits
in a row of stroked tone glyphs and would read as a blob otherwise.

**`tests/harness.html` no longer loads React and Babel from unpkg.com.** It is test-only and never
published, so it can point at the packages `npm ci` has already installed — `../node_modules/react/umd/…`
and friends, served by `serve-tests.mjs` from the repo root. That takes a CDN outage out of the
`visual` and `interaction` gates at a cost of **zero committed bytes**; `@babel/standalone` joins the
devDependencies to make it complete. `playground/index.html` is a **published** page and cannot do
this, so it stays on the CDN with its SRI hashes — that one is a real remaining dependency, not a
solved one.

**A pre-existing playground flake, correctly attributed.** "every component renders without throwing"
started timing out. It is 117 clicks in a single test, each a full React re-render, and it had crept up
against the 30s default until a loaded machine pushed it over. Confirmed pre-existing by stashing the
day's changes and watching it fail identically on a clean tree, rather than assuming. Marked
`test.slow()` rather than trimmed: the value of that test is that it clicks **every** component, and
capping coverage to save wall-clock would quietly stop testing the tail.

## 2026-07-29: SankeyChart cursor — every chart is now covered, and the style bug is a gate

The last chart without a cursor has one, and the bug the previous batch found by accident is now
mechanically prevented.

**The cursor walks LINKS, not nodes.** Every Sankey node already prints its label and throughput as
real text beside it; a *link's* value appears nowhere but the hidden data table. Indexing nodes would
have added a tab stop that announces what is already on screen — the same test that keeps `Gauge` and
`Bullet` out of this entirely.

**It does not use `hitTest`.** The other two non-x-indexed charts needed geometry (angle, 2D distance);
Sankey's ribbons are cubic beziers drawn one `<path>` per link, and **an SVG path already hit-tests its
own filled shape exactly and for free**. Re-deriving bezier containment would have been a second,
worse implementation of something the browser is already doing. So `useChartCursor` gained
`cursor.point(i)`: each shape sets the cursor on `onPointerEnter`, and **the plot as a whole** clears
on `onPointerLeave`. Clearing per-shape would let two touching ribbons clear *after* the next one had
already set.

**Its pointer-only `hover` state is gone**, folded into the shared cursor. It had been a second state
sitting beside the model, which meant arrowing through the chart announced flows while the graphic
showed nothing at all. One highlight now, driven by one index, so the keyboard lights a ribbon exactly
as the pointer does — with a test that asserts the ribbon's `stroke-opacity`, not just the live region.

### `spread-clobbers-prop` — the 17th craft rule

Last time, all four x-indexed charts shipped with their wrapper's entire `style` destroyed, because a
spread and an explicit prop of the same name were on one element and the later simply replaced the
earlier. It was found by accident. It is now a gate.

Two things were needed to make it worth having:

- **It resolves object shapes**, including properties assembled from other spreads. Without that it had
  a hole exactly where the bug lived: `bind` is built as `return { …, bind: { ...groupBind,
  ...plotBind } }`, so it is not a `const`, and `{...cursor.bind}` — the precise form all four charts
  shipped — sailed straight through. The first version of this rule caught the `groupBind` variants
  and **missed every real one**.
- **It stays silent when it cannot see a shape.** `{...rest}` after a destructured `style` is the
  correct, common pattern and must never be flagged, because `style` was pulled *out* of `rest`.

Verified by re-injecting the original bug: the rule fires on all seven call sites, including
`LineChart`'s exact original spelling, and it ignores the doc comment in `chartCursor.jsx` that
*demonstrates* the bad pattern (which it flagged on the first run — a rule catching its own
documentation, same failure the motion rules hit once).

**4 new browser tests** (38 → 42). 9/9 verifiers, 17 craft rules, all three visual baselines untouched.

## 2026-07-27: chart cursors for Donut and Scatter — and the bug they uncovered

`useChartCursor` now takes an optional `hitTest`, so a chart can replace *only* the step that finds
what is under the pointer. Everything else — keyboard walking, Home/End, Escape, the polite live
region, the single tab stop — is unchanged and shared.

- **Donut hit-tests by ANGLE**, and only on the ring. The hole returns `null`, so the centre is not a
  dead zone that keeps the last segment lit while you read the total.
- **Scatter hit-tests by nearest point WITHIN A RADIUS**, not simply nearest. Without the radius a
  pointer anywhere in empty plot space keeps some far-off point selected.

Both move to the interactive contract (`role="group"` + `tabindex` on the wrapper, `<svg>`
`aria-hidden`), and `verify-a11y` was updated to assert that, including the negative pattern that
`role="img"` must *not* come back.

**Two things had to be fixed to make any of it land correctly.**

**1. Every cursor chart's wrapper was losing its entire `style`.** Each was written as
`<div style={{ position: "relative", ...style }} {...cursor.bind}>`, and `cursor.bind` carried a
`style` of its own — so the spread overwrote the prop, and all four x-indexed charts shipped with a
wrapper whose only style was `outline-offset: 2px`. Consequences: no `position: relative`, so the
absolutely-positioned readout was anchoring to some ancestor rather than to the chart; and the
documented `style` passthrough silently did nothing on `LineChart`, `AreaChart`, `StackedBarChart` and
`WaterfallChart`. **Every existing cursor test passed throughout**, because they all assert the
readout's text and none its position. Fixed at the root: binds carry behaviour, never style
(`CHART_FOCUS_STYLE`), plus two tests that pin it.

**2. An `<svg>` with the default `preserveAspectRatio` letterboxes.** A 660×260 viewBox in a 566px box
draws at **0.858** with ~19px of empty gutter — so hit-testing or positioning from container fractions
lands off the data. `useSvgBox` reports the live scale and centring offsets (`boxFrac` / `boxPoint`
convert), and `cursor.plotBind` / `cursor.groupBind` split the pointer half onto the plot and the focus
half onto the labelled group.

**The donut's readout goes in the hole**, not in a pill on the ring. Anchored to the arc, *inward*
covers the segment being described and *outward* runs off — the donut's box is exactly the donut, so a
left-hand segment lands at a negative offset and disappears off the page. Both were built and looked
at before the hole won: it is empty by construction, already the slot the component reserves for a
label, and the same distance from every segment. The scatter has room and keeps a pill, centred on the
point via the tooltip's new optional `y`.

`DonutChart`'s −90° turn also moved from a CSS transform on the `<svg>` to a `<g>` around the ring.
Identical geometry, but it keeps the rotation out of the element's screen matrix, where it had been
rotating overlays and any coordinate read back out of it.

**7 new browser tests** (31 → 38), including the two regression tests for the style bug. Nothing
visual changed at rest: all three baselines pass untouched.

**Not done, deliberately.** `SankeyChart` still has no cursor: ribbons and nodes are a third hit-test
shape, and it already carries a pointer-only `hover` state that wants folding into the shared model.
`Gauge` and `Bullet` are recorded in `chart-contract.md` as a **decision rather than an omission** — a
gauge is one value already printed large in its own centre, and a bullet row prints label, value and
target as real text, so a cursor there would add a tab stop that announces what is already on screen.

## 2026-07-26: icon backlog cleared — the alert family, and one warning triangle (6 → 0)

`KNOWN_INLINE_DUPES` started at 20 and is now **empty**. Every glyph a component draws for itself comes
from `GLYPH`.

**There were three warning triangles**, and the check could only see one of them as a duplicate:

- Two were the *same* rounded triangle at different decimal precision (`M10.3 3.9 1.9 18…` vs
  `M10.29 3.86 1.82 18…`). Byte-different strings, identical drawing. A path-data comparison cannot
  catch that, which is the honest limit of this gate and is now written into it.
- The third was a separate sharp-cornered triangle in `Banner` and `Callout`.

**The rounded one wins and the sharp one is retired.** Every other glyph in the set is drawn with round
caps and joins; a hard apex was the odd one out, and against a brand whose whole form language is soft
corners it read as borrowed. `Banner` and `Callout` change visibly. `ConnectionHealthCard` and
`StateBlock` keep the look they already had.

**The exclamation bang had four spellings for two glyphs.** A bang inside a circle and a bang inside a
triangle genuinely differ (a triangle's visual centroid sits lower, so the same bang reads bottom-heavy
in one of them) — but `Banner`'s info bang and its danger bang differed from each other by half a unit
of stem and dot position, which is drift, not intent. Now `GLYPH.bang` for the circle, folded into
`GLYPH.warningTriangle` for the triangle. `GLYPH.infoBang` (the inverted "i") and `GLYPH.checkInCircle`
join them: neither was duplicated yet, but they are the rest of that family and would have been next.

`checkInCircle` exists rather than reusing `check` because `check` is full-bleed: its `(20,6)` corner is
10 units from centre and pokes through an `r=9` ring.

**The ratchet's meaning changes with this.** An empty set turns it from a shrinking budget into a plain
no-duplication rule, and the comment now says to keep it empty rather than append to it.

Not changed, but found: `Callout`'s `insight` tone draws a **second Alfred spark** — same four-point
star as `GLYPH.sparkle`, but stroked and inset rather than filled and full-bleed. It is drawn once, so
no duplication check will ever flag it. Unifying it changes optical weight in a stroked context and is a
design call, not a cleanup.

## 2026-07-26: icon backlog — the plug, and the checkmark's three scales (12 → 6)

Second batch. Six more entries off the `verify-icons` ratchet.

- **`GLYPH.plug` is new.** `ConnectionHealthCard` and `IntegrationCard` both drew the integration plug
  as **four** `<path>` elements (two pins, a body, a lead), so it occupied four ratchet entries for one
  glyph. Four subpaths in one `d` now. No pixel changes.
- **The checkmark existed at three scales and three spellings.** `GLYPH.check` is on the 24 grid;
  `Checkbox` and `AgentStatus` drew their own on a **12×12** viewBox, `PriceCard` and `UpgradeModal`
  theirs on **16×16**. Normalised to the unit square all three are the same tick at slightly different
  insets, which is why nobody noticed. All four now use `GLYPH.check` on a 24 viewBox.

**Stroke weight was deliberately preserved, not "corrected".** Doubling a viewBox halves the rendered
stroke, so `strokeWidth` was rescaled with it: 1.8 → 3.6 on the 12-grid pair, 1.7 → 2.55 on the 16-grid
pair. Those numbers look wrong next to the icon grid's `stroke-width: 2` and carry a comment saying why.
A checkbox tick is deliberately heavier than a body icon: it renders at 12px and still has to read.
Harmonising icon weights is a design decision and does not belong in a deduplication change, where it
would have been impossible to tell a geometry regression from an intended restyle.

Rendering an overlay of old and new at 180px confirmed the two: stroke weights coincide exactly, and the
geometry moves by well under a pixel at the sizes these actually ship at. None of the four is in the
harness gallery, so the visual baselines could not have caught a mistake here — they were rendered and
looked at through the playground instead.

**6 remain**, all in the alert family: three different warning triangles (two of which differ only in
decimal precision, so the ratchet cannot even see them as duplicates) and four spellings of the
exclamation bang across `Banner`, `Callout`, `StateBlock` and `ConnectionHealthCard`.

## 2026-07-26: icon backlog — 8 of the 20 duplicated inline glyphs single-sourced

`verify-icons` shipped with a ratchet listing 20 glyphs that were already drawn inline in two or more
components. Eight of them are gone, across 25 files. **Nothing here changes a single pixel** — every one
of the eight was geometrically identical to a glyph `GLYPH` already defines, or identical to itself
across every site. The 31 browser tests and all three visual baselines pass untouched.

- **Six were spelling drift, not shape drift.** `M6 9l6 6 6-6` and `GLYPH.chevronDown`'s `M6 9 l6 6 l6 -6`
  are the same three points written two ways, which is exactly why the duplication was invisible to
  review. Same for both close crosses (`M6 6 L18 18 M18 6 L6 18` and `M6 6l12 12M18 6L6 18`), the
  chevron-right, the plus and the minus.
- **`GLYPH.arrowRight` is new, and it fixes a misreading.** `IntegrationCard`, `JobListingRow` and
  `ModuleStatusCard` each drew their "Learn more →" as **two** `<path>` elements, a shaft and a head.
  Counted as path data that read as a stray minus plus a stray chevron, so the shaft collided with
  `NumberInput`'s genuine minus. They are one glyph and are now one path.
- **`GLYPH.sparkle` is new** — the Alfred mark, previously repeated verbatim in six conversation and
  trust components. It is the only filled entry in the file, so it is commented as such; the rest are
  stroked and would render as a blob if filled.
- **The ratchet cleaned itself, as designed.** After the swap it failed with eight "still lists a glyph
  that is no longer duplicated" errors and named each one. The backlog count could not silently drift.

**12 remain**, and they are the ones that need actual drawing rather than a rename: the warning/info bang
and its triangle (`Banner`/`Callout`), the four-path plug (`ConnectionHealthCard`/`IntegrationCard`), and
two checkmarks on 12×12 and 16×16 viewBoxes that need rescaling onto the 24 grid. Each of those is a real
visual change and wants looking at.

## 2026-07-26: published — `@alfredai/design-system@1.0.0` is live

```bash
npm i @alfredai/design-system react react-dom
```

117 exports, 200 files, 1.51 MB unpacked, React as a peer, **zero runtime dependencies**. The published
shasum matches the local build byte-for-byte, and a clean install from the registry renders components,
ships `styles.css`, the token CSS, all 19 font files and the type entry.

Two things about publishing this account that cost several attempts and are now in the readme and a
`npm run publish:npm` script, so the next release does not rediscover them:

- **npm 11+ is required, because the account's 2FA is a passkey.** npm 10's `publish` only accepts a
  typed `--otp` code, which a passkey cannot produce; npm 11 replaces that with a browser handoff Touch
  ID can satisfy. Hence `npx --yes npm@11 publish` rather than the global npm.
- **It needs a real terminal.** The browser approval and the waiting CLI must overlap — approving after
  the command has exited does nothing, and with no TTY npm prints the URL and gives up immediately.

Also worth knowing: after a successful `PUT 200`, the **public read endpoint 404s for a minute or two**
while npm replicates. `npm access list packages @alfredai` reports the truth immediately. A 404 there
means "not yet replicated", not "not published" — read the wrong way, it looks like a failed publish.

## 2026-07-26: Phase 4.4 complete — legend toggling

The last open piece of the chart contract. Clicking a series in the legend hides it and rescales the
chart; clicking again brings it back.

- **`Legend` becomes interactive only when given `onToggle`.** A static key stays plain text — making
  every legend a row of buttons would add tab stops to charts where nothing can be toggled.
- **Hiding a series rescales the chart.** The failure mode this avoids is a y-axis that keeps its old
  ceiling, leaving the remaining bars mysteriously short. Everything downstream — bars, the data table,
  the summary — works off the visible set, not the full key list.
- **A hidden series is not signalled by colour alone**: the swatch becomes an outline and the label is
  struck through, so the state survives for a colour-blind user.
- **A series keeps its colour when others are hidden.** The palette is keyed to the original index, not
  the position among visible keys, or the chart appears to recolour itself as you toggle.
- **3 new browser tests.** The rescaling one asserts the **axis ticks** (100 → 20) rather than bar
  geometry: bars can look plausible at either scale, the axis cannot. My first version asserted only
  that the tallest bar was still non-zero, which proved essentially nothing — replaced.

`verify-a11y` 107 → 108. Phase 4.4 is complete: text alternatives, data tables, the cursor, and now
legend interaction. What remains is a cursor for the non-x-indexed charts, which each need their own
hit-testing.

## 2026-07-26: icon backlog — the drift was the path data, not the delivery

First bite of the 22-glyph backlog, and it changed the plan. The intended fix was "migrate every inline
glyph to `<Icon>`". Looking at the actual call sites says otherwise:

- `Icon` renders a CSS **mask over a file** in `assets/icons`, so it needs a correct `root` path for
  whatever page loads it — migrating means threading an `iconRoot` prop through every component that
  happens to draw a tick. An inline `<svg>` has no such dependency and works at any depth.
- And the two 24×24 checkmarks, `M20 6 L9 17 L4 12` and `M20 6 9 17l-5-5`, turn out to be **the same
  geometry written two ways**. The drift was in the *path data*, not the delivery mechanism.

So: **`<Icon>` when the caller chooses the glyph; `GLYPH` constants when the component draws its own.**

- **`components/hooks/glyphs.jsx`** (internal) — canonical path data on the 24×24 grid. Six sites
  across ApprovalGate, RecommendationCard, ThinkingTrace, InsightFeedback and MemoryCard now draw from
  one definition. Zero visual change: identical geometry, and all three tri-theme baselines pass.
- Backlog **22 → 20**.
- **The ratchet is now self-cleaning**: once a glyph stops being duplicated, its baseline entry must be
  deleted or `verify-icons` fails. A backlog that keeps entries for glyphs nobody draws any more is
  fiction, and stops being read.

## 2026-07-26: Phase 4.3 — the icon grid, and the drift it exposed

An icon set exists so a glyph is drawn **once**. Alfred's was not holding that. Counting the inline
`<path>` shapes across components turned up **four different checkmarks, two different close crosses
and two different chevron-rights** — all hand-drawn, all slightly different, none of them in the set.
27 icons existed; components were quietly maintaining a second, inconsistent set of ~22 more.

- **10 new UI glyphs** on a documented **24×24 stroked grid** (weight 2, round caps and joins):
  `chevron-down/up/left/right`, `check`, `close-x`, `plus`, `minus`, `search`, `spark` — chosen by
  counting what components actually hand-roll, not by guessing.
- **`guidelines/icon-grid.md`** — the construction spec, and an honest account of the **two families**:
  the new stroked UI glyphs, and the 27 legacy *filled* icons on arbitrary viewBoxes exported from a
  design tool. They read differently at the same size. That inconsistency is recorded as backlog
  rather than papered over; the legacy list is grandfathered **by name** so it can only shrink.
- **`scripts/verify-icons.mjs`** — the **9th verifier**. Construction is enforced for anything new, and
  duplication is a **ratchet**: a path repeated across two or more components fails the build, with the
  22 existing ones recorded as a baseline. A gate that fails on day one gets deleted, so this one
  starts where the code is and only tightens. Both halves proven to bite.
- `close.svg` turns out to be a *circled* X while components draw a bare one — so `close-x` is a
  genuinely different glyph, not a duplicate.

**The remaining task is the backlog of 22**: each is a small migration — add the glyph, swap the inline
`<svg>` for `<Icon>`, drop its entry from `KNOWN_INLINE_DUPES`. Not swept in one pass because each
swap is a visual change to a shipped component and deserves to be looked at.

## 2026-07-25: Phase 4.2 — the signature brand moment (`BrandMoment`, component 117)

The brand had a mark, a wordmark and a motion system, but no **arrival** — every splash, first run or
film open would have been choreographed from scratch.

- **`BrandMoment`**: the mark settles, a glow blooms and recedes behind it, the wordmark resolves, an
  optional line rises last. Built entirely from the motion tokens, because the point of a signature
  moment is that it is the *same beat* everywhere.
- `--ease-emphasized` is reserved by `guidelines/motion-and-animation.md` for "a rare moment that
  wants a touch of life". This is that moment, and nothing else in the product is.
- **Restraint is the brief.** Nothing spins, bounces or flies in. The mark starts at `scale(0.94)` and
  settles — never from nothing, which the craft rules forbid.
- No `prefers-reduced-motion` handling of its own: the global block collapses every duration, so the
  sequence resolves instantly to its final state. That is the correct degradation for a reveal.

**A token built for one scale does not transfer to another.** The first version reused
`--glow-periwinkle` / `--glow-orange` for the bloom. Those are *page-hero* glows anchored at 22%/18%
and 88%/92% of their box, so at this size they landed as a lopsided smudge off one corner rather than a
bloom behind the mark. Rebuilt as centred radials; the lesson is now in the motion guideline.

**The craft rules caught their own documentation.** A doc comment reading "never `scale(0)`" tripped
`scale-zero-entry`, because the motion rules had no comment-skipping while the token rules did. Fixed
at the checker rather than by rewording the comment — and all three motion rules were re-proven to
still bite on real code. `emoji-in-source` is deliberately excluded from the exemption: "no emoji in
Alfred surfaces" means none anywhere, comments included.

## 2026-07-25: Phase 4.1 — scene illustrations (`Illustration`, component 116)

The illustration system had a documented house style and two characters, but nothing for the moments
the design system actually has components for. `EmptyState` and `StateBlock` fell back to a small
glyph.

- **`Illustration`** — six scenes: `empty` · `no-results` · `error` · `success` · `connecting` ·
  `first-run`. Flat, geometric, one shared stroke weight and corner radius so they read as one set.
- **Drawn inline in the component, not as files.** An SVG loaded through `<img src>` is an isolated
  document and cannot see the page's custom properties, so it can never follow the theme. `Icon` gets
  away with a CSS mask because its glyphs are single-colour; these are not. Inlining is what lets one
  composition read correctly on light, app-dark **and** marketing-dark instead of three exports each.
- **No new props needed anywhere.** `EmptyState` and `StateBlock` already take an `icon` node, so
  `icon={<Illustration name="empty" />}` composes today. Adding API for something composition already
  handles would have been surface for nothing.
- **New craft rule `illustration-theme-safe`** (verify-craft → 16 rules): no literal colour in the
  scene art, and the structure must be drawn in semantic tokens. A hex there silently throws away the
  only reason the art is inline, and would look right on light and wrong on both darks with no static
  check noticing. Proven to bite.
- `verify-a11y` 105 → 107 (role, label, `<title>`, custom title).

**Two things came out of rendering the art rather than reasoning about it**, and both are now house
rules in `assets/illustrations/README.md`:

- **The gradient needs area.** Below roughly 40px the periwinkle→orange ramp stops reading as the
  brand gradient and starts looking like a dull brown dot. Small accents are solid `--accent`; the
  gradient goes on the one large shape the scene is about. My first pass had gradient dots at r=9.
- **Four of the six scenes did not read** on first render — a tray that looked like a notched box, a
  translucent lens that muddied what was behind it, an "offset" row that was not offset enough to look
  broken. Redrawn after looking at them.

Also: the playground test now **derives** the component count from `props.json` instead of hardcoding
it. That number has gone stale three times.

## 2026-07-25: Phase 4.4 (part 2) — the chart cursor

Charts had **no hover or keyboard interaction at all** beyond SankeyChart's hover state and Heatmap's
native `title` attributes. You could see a trend but never read a value off it.

- **`useChartCursor` + `ChartLive` + `ChartTooltip`** (internal): hover with a pointer, or focus the
  chart **once** and walk it with `←` `→` `↑` `↓`, `Home` / `End`, `Esc`. Both drive the same active
  index, so there is one code path and one visual result.
- **One tab stop per chart, not one per point.** A 40-point chart would otherwise put 40 stops between
  the user and the rest of the page — and focusable children inside a `role="img"` element are
  contradictory markup that assistive tech may ignore.
- **Interactive charts move their name to the focusable group and hide the graphic.** Carrying both
  `role="group"` on the wrapper and `role="img"` on the `<svg>` would announce the chart twice. Static
  charts keep the old shape; `verify-a11y` asserts each shape *and* the absence of the other.
- The active point is announced through a **polite live region** rather than by moving focus, which is
  what stops it double-announcing against the hidden data table from part 1.
- **Applied to the four x-indexed SVG charts**: Line, Area, StackedBar, Waterfall. **Sparkline is
  deliberately excluded** — a glanceable micro-chart, often several to a row in KPI cards, where a tab
  stop each would be hostile.
- **5 new browser tests** (`tests/chart-cursor.spec.js`): one tab stop, arrows walk and announce,
  `Esc` dismisses, hover tracks across the chart, and the readout stays `aria-hidden`.

Two things the gates caught in this change, both real:

- The tooltip's `left: %` tripped `physical-inline-prop`. Correct: it tracks the chart's own
  coordinate space, which `guidelines/rtl.md` keeps physical — mirroring the readout while the plot
  stays put would point it at the wrong data. Marked `rtl-ok` with that reason.
- The forced-colors test asserted the text alternative on the `<svg>`, which had just moved to the
  group. Generalised to assert the alternative **exists** rather than where it happens to live.

## 2026-07-25: Phase 4.4 (part 1) — the data behind every chart

The chart a11y contract gave every chart a one-line summary. A summary says *"Line chart, 4 points,
from 12 to 24"* — it does not let anyone **read the values**. For the ten charts whose data lives only
inside the graphic, the numbers were simply unreachable.

- **`ChartTable`** (internal, `components/hooks/chartTable.jsx`) — a visually-hidden `<table>` with a
  `<caption>`, `<th scope="col">` headers and `<th scope="row">` row labels. Clip-rect rather than
  `display: none`, which would remove it from the accessibility tree.
- **Applied to all 10 `role="img"` charts**: Line, Sparkline, Area, Donut, Scatter, StackedBar, Sankey,
  Gauge, Waterfall, Bullet — each with a small adapter for its own data shape (points / series /
  segments / links / items).
- **Deliberately NOT applied to the 3 `role="group"` charts.** Bar, Funnel and Heatmap already render
  their labels and values as readable text; a table there would make a screen reader announce every
  number twice. That is the same distinction the role split already encodes.
- **`verify-a11y` 92 → 105 contracts**, and now supports **negative patterns** — a case can assert what
  the output must *not* contain. Some contracts are about absence, and asserting only presence would
  let the double-announce regress silently. Proven by adding a table to BarChart and watching it fail.
- Visually hidden, so all three tri-theme baselines pass unchanged.

The *pointer* half of 4.4 — hover/focus model, shared tooltip, legend toggling — is deliberately left
open rather than half-built: hit-testing an SVG path is a different problem in each chart. Charts today
still have no hover or keyboard interaction beyond SankeyChart's hover state and Heatmap's native
`title` attributes. `guidelines/chart-contract.md` says so explicitly.

## 2026-07-25: Phase 3.2 — npm package (`@alfredai/design-system` v1.0.0)

The design system was consumable three ways, all of which meant "get the files": a synced folder, a
GitHub Pages URL, or an Agent Skill. None of them is `npm i`. The global `_ds_bundle.js` cannot be
imported — it is an IIFE that assigns to `window` and expects React as a global.

- **`scripts/build-npm.mjs`** emits `dist/`: real ESM (`import { Button } from "@alfredai/design-system"`),
  the authored `.d.ts` shipped alongside, plus `styles.css`, the token CSS and the `@font-face` assets
  (without them the type system silently falls back to system fonts). **732 kB packed, 188 files.**
- **`scripts/compile-components.mjs`** (extracted) — the bundle and the package are now built from
  **one** parse and dependency order, so the published package cannot drift from the bundle every
  verifier tests. The refactor was proven safe: `_ds_bundle.js` came out **byte-identical**.
- Each component is wrapped in its own IIFE returning its exports, because component files declare
  top-level helpers and two of them both declare `PALETTE` — concatenating at module scope would be a
  redeclaration error.
- **React is a `peerDependency`**, never bundled: two copies of React in one app breaks hooks. The
  package ships with **zero runtime dependencies**.
- **`scripts/verify-npm.mjs`** — the **8th verifier**. Rather than inspecting text it *becomes a
  consumer*: builds the package, `import`s it as ESM, and server-renders **all 115** through it, then
  checks the exports match the manifest exactly, the manifest is publishable (exports map, peer React,
  no runtime deps, semver, not private), and the shipped types type-check against the shipped entry.
  Proven to bite on a dropped export and on React demoted to a real dependency.
- `dist/` is generated, not committed (gitignored). Releasing is a human step: bump `dsVersion`, run
  `npm run verify:npm`, then `npm publish dist`.

**Not published.** Publishing to a public registry is outward-facing and effectively irreversible, so
the package is built, verified and documented, and the actual `npm publish` is left to a human.

## 2026-07-25: generalise the alias-freeze check across every token

The two frozen-alias bugs were fixed individually; this sweeps the rest and turns the check into a
rule that covers the whole token surface rather than the two places it happened to bite.

- **Swept all 27 `:root` aliases** against both themes: **no remaining frozen aliases.** That result
  is only worth stating because the detector was validated first — reverting the two fixes makes it
  report all 11 instances, and the clean tree reports 0.
- **New craft rule `theme-alias-freeze`** (`verify-craft` → 15 rules), replacing the elevation-specific
  re-declaration check it subsumes: for every `:root` token whose value contains `var()`, any theme
  overriding a token it references must also declare the alias. Proven against both shipped bugs.

## 2026-07-25: fix — theme aliases were frozen at their light values

Building the playground surfaced a bug that **six static verifiers, a contrast checker and a
tri-theme screenshot suite all missed**, because none of them computes CSS.

CSS substitutes a custom property's `var()` at computed-value time **on the element where the
declaration sits**, and the substituted result is what inherits. An alias written only in `:root`
therefore resolves against `:root`'s values, and a `[data-theme]` scope overriding the thing it
points at changes nothing. Two tokens were built on the opposite assumption:

- **`--elevation-*` never re-resolved per theme.** Both dark themes kept the *light* shadow
  (`rgba(2,2,30,0.05)`), invisible on a dark canvas. Worse, because the Phase 2.2 migration moved all
  49 components off `--shadow-*` onto `--elevation-*`, it made dark elevation **worse than before the
  elevation system existed** — the real dark shadows were being computed and then never reaching
  anything.
- **`--text-display` computed to ink `#02021E` on marketing-dark**, a black page: **1.02:1**. It
  aliased `--text-primary`, which marketing-dark does override to white — but on `:root`, so the
  alias had already resolved to ink. KpiCard and PriceCard display values were effectively invisible.
  This was previously recorded as investigated-and-fine; that conclusion was wrong.

Fixes, and the gates so neither can recur:

- `tokens/elevation.css` re-declares all six steps inside `[data-theme="dark"]` and
  `[data-theme="app-dark"]`; `tokens/colors.css` re-declares `--text-display` on marketing-dark.
- **`verify-contrast`'s resolver was modelling this incorrectly** — it merged root+theme into one map
  and substituted late, which is not how CSS computes. Corrected to resolve each reference in the
  scope that declared it, which immediately failed on `--text-display` at 1.02:1. The false pass was
  the reason the bug survived.
- `verify-craft`'s `elevation-contract` now requires the per-theme re-declaration.
- **`tests/theme-tokens.spec.js`** (new) asserts the **computed** values differ per theme and track
  their own ramp. Only a browser resolves custom properties, so only a browser can gate this.
- `guidelines/elevation.md` corrected: it had claimed the overrides "flow through for free".

## 2026-07-25: Phase 3.1 — live component playground

Static preview cards show one frozen arrangement of a component. The playground shows **any** of them:
all 115 rendered live from the real `_ds_bundle.js`, with prop controls generated from each
component's own `.d.ts`, across all three themes, the three densities and both writing directions.

**Storybook was considered and rejected.** It needs a bundler, `node_modules` and a build step, and
that would break the property this repo is built on: committed artifacts served straight from `main`
with no build, which is exactly what lets the same files publish to GitHub Pages *and* sync to
claude.ai/design unchanged. The playground is instead plain `React.createElement` over the existing
bundle — no compiler at runtime either, so it drops the Babel dependency the preview cards carry.

- **`scripts/gen-playground.mjs`** parses all 115 `.d.ts` files into `playground/props.json`:
  **447 editable props**, with string-literal unions becoming selects, per-prop JSDoc becoming help
  text, and everything else (handlers, element slots, `CSSProperties`) listed as documented-but-not-
  editable rather than faked. Same generate-and-commit shape as `gen-tokens.mjs`.
- **`scripts/sample-props.mjs`** (new, extracted) — the representative props for all 115 components
  now live in one module shared by `verify-components.mjs` and the playground, so a component added
  to one is added to both. Each component opens with real data in it, not an empty shell.
- **`scripts/verify-playground.mjs`** — the **7th verifier**: `props.json` is a deterministic rebuild,
  every manifest component is present, every emitted default matches its prop's type, and the page
  files stay wired. Proven to bite on a stale artifact and on a removed CSS containment rule.
- **5 Playwright tests** in a new `playground` project, including one that **clicks through all 115
  components** and fails if any throws.

Two real bugs the tests caught, both in the new code:

- **Documented defaults are prose, not values.** `@default` says things like `niceRound`, `[]` and
  `${n}M` — a function name, an empty array and a template. Injecting them as literals fed components
  a string where they expected a function and **broke 7 of them** (PageHeader, TeamMemberRow, Area/
  Bullet/Gauge/Sankey charts, GoalPacing). The generator now only emits a default it can validate
  against the prop's own type, and shows the rest as read-only `documentedDefault` text.
- **Overlays escaped the preview.** Modal, Drawer and Toast are `position: fixed`, so previewing one
  covered the entire playground and made the component list unclickable. The canvas now establishes a
  containing block (`contain: layout paint`), and the verifier keeps it there.

## 2026-07-25: Phase 3.4 — scheduled sync-drift check

The design system ships through three channels and two of them can silently fall behind `main`: the
claude.ai/design project (pushed by hand) and GitHub Pages (automatic, but a build can fail). The
first one **drifted through six merges before anyone noticed**, because a stale project looks exactly
like a current one from the repo side. There is nothing to see unless you go looking, so this makes
something look, weekly.

- **`scripts/check-sync-drift.mjs`** (dependency-free ESM, like the six verifiers). Checks both
  channels and exits non-zero on drift. `--json` for machine output, `--no-remote` to skip the Pages
  API call when offline.
- **The key move: detecting drift does not require reading the remote project.**
  `.design-sync/config.json` records `lastSyncCommit`, so the delta is a filtered `git diff` — which
  means the check runs in CI with **no design authentication at all**.
- **The exclude list does real work.** Between the last sync point and now, 266 files changed but only
  **160** are design surface; the other 106 are dev/CI infra and generated output. Without the filter
  the check would cry drift over `EXPANSION_*.md` and `.github/` edits forever.
- **`.github/workflows/sync-drift.yml`** — Mondays 08:17 UTC plus `workflow_dispatch`. Files a single
  tracking issue on drift, comments on it if it is already open, and **closes it automatically** once
  every channel is current, so it cannot become background noise.
- Four detection cases verified against injected state: design-surface drift (160 files across 7
  commits) · a `lastSyncCommit` that is not an ancestor of HEAD (stale pin or rewritten branch) · a
  missing `lastSyncCommit` (sync state unknown) · a failed or behind Pages build. A probe failure
  (no token, API error) reports `unchecked` rather than a false positive.
- Current state reads correctly as **no drift**: 1 commit behind, but both changed files are excluded.
- **Follow-up, found by running it:** Pages republishes on every merge and takes ~30s, so a run firing
  just after one legitimately sees `building`, or `built` at the previous commit. The first version
  called that drift and filed an issue. Both are now `pending` inside a 15-minute build grace measured
  from the HEAD commit's own timestamp. A check that cries wolf gets muted, which is the one failure
  mode this cannot afford.

## 2026-07-25: Phase 2.4 — deep forced-colors (+ Phase 2 complete)

The last Phase-2 item, and the one with a demonstrable bug behind it. Windows High Contrast flattens
every author background to `Canvas` and drops every `box-shadow`, so anything Alfred communicated
with a **fill** or a **shadow** did not degrade under HCM: it disappeared. Measured under Chromium's
forced-colors emulation, **a selected segment and an unselected one computed to identical colors**
(`rgb(255,255,255)` on `rgb(0,0,0)` for both). The selection state was simply gone.

- **Selection restored** via the system `Highlight` / `HighlightText` pair, keyed on the ARIA hooks
  components already emit (`[role=radio][aria-checked]`, `[role=tab][aria-selected]`,
  `[role=option][aria-selected]`, `[role=switch]`, `[aria-current=page|step]`). Descendants are
  pulled onto the highlight too, or the label keeps `CanvasText` and vanishes into the fill.
  `forced-color-adjust: none` is required for any of it to survive the forcing pass.
- **Chart colour opted out of forcing.** Forcing collapses six series into one `CanvasText`
  silhouette. Chart graphics keep the categorical palette — **defensible only because every chart
  also carries a text alternative** from the chart a11y contract, so nothing is colour-only.
- **Still zero per-component high-contrast overrides.** Everything keys off semantic hooks, which is
  the whole reason the chart roles added in #40 could be reused here as a styling hook.
- **New `forced-colors` Playwright project + 5 tests**, wired into CI as a fourth job. Chromium
  substitutes the real system palette, so these assert **computed colors**, not just that the media
  query fires. The suite first asserts the emulation is actually on — without that guard, every
  other assertion would pass vacuously against light-theme colors and the gate would look green
  while checking nothing. Removing the selection layer fails two of them.
- **`forced-colors-contract` deepened** to require the 2.4 layer (selection rules, the Highlight
  pair, `forced-color-adjust`, the chart opt-out), proven to bite on two separate injected removals.
- **`--text-display` closed out.** A long-standing open note worried it could strand ink-on-black in
  marketing-dark. It cannot: it is an *alias* (`var(--text-primary)`), which every theme overrides,
  so it resolves to 21:1 white-on-black there. Now pinned by 6 new `verify-contrast` pairs
  (**66 → 72**) at the 3:1 large-text floor, so a future literal value there would fail the gate.
- Docs: `guidelines/forced-colors.md`.

**Phase 2 (systematize the tokens) is COMPLETE**: 2.1 density · 2.2 elevation · 2.3 RTL · 2.4
forced-colors.

## 2026-07-25: Phase 2.3 — RTL / logical properties

The third Phase-2 cross-cutting system. Components now describe space by **reading direction**
(start / end) rather than by screen (left / right), so a surface mirrors under `dir="rtl"` with no
per-component override.

- **~110 physical declarations migrated** across 40+ components: `margin`/`padding`/`border`
  `Left`/`Right` → `InlineStart`/`InlineEnd` (29) · `textAlign: "left"/"right"` → `"start"/"end"` (15) ·
  **13 asymmetric 4-value shorthands** → `paddingBlock` + `paddingInline` · directional insets →
  `insetInline*`: 4 leading accent rails, 2 trailing affordances (Select chevron, TeamMemberRow),
  5 full-width dropdown stretches, and the Popover placement map.
- **Three categories deliberately stay physical**, each carrying an inline `rtl-ok` marker with its
  reason: 50% centring (direction-neutral, and breaks if only half the pair is converted) · chart
  coordinate space (Bullet/Gauge/ConfidenceMeter/GoalPacing — a data-viz decision owned by 4.4) ·
  physical placement APIs (`Tooltip placement="left"` means left).
- **A subtlety worth recording: three sites were *over*-converted and then repaired.** A logical
  margin paired with a physical `left: 50%` offset (ActivityTimeline, ThinkingTrace) or with
  Tooltip's physical placement mirrors only half the pair, which is worse than not migrating. If one
  half of a positioning pair is physical, both must be.
- **New craft rule `physical-inline-prop`** (`verify-craft` → 14 rules), proven to bite on both the
  margin and the `textAlign` forms, with an `rtl-ok` escape for the documented exceptions.
- **New RTL interaction test.** Logical properties are **invisible in LTR** — they resolve to exactly
  the physical values they replaced, so every static check and every LTR screenshot passes whether or
  not the migration is correct. The test renders `DecisionAlert` in an LTR and an RTL container and
  asserts its leading rail sits the same distance from the *leading* edge in both. Reverting that one
  property to `left: 0` fails it (315px vs 1px), so the check is real rather than decorative.
- Small consistency fix found on the way: `DecisionAlert`'s decorative rail was missing
  `aria-hidden="true"`, unlike the identical rails in ApprovalGate / RecommendationCard / CausalChain.
- Docs: `guidelines/rtl.md`.

All three tri-theme visual baselines pass unchanged — which proves the migration was *safe*, and
(per the note above) proves nothing about whether it *worked*. That is what the RTL test is for.

## 2026-07-25: Phase 2.2 — elevation system (+ marketing-dark shipped flat)

The second Phase-2 cross-cutting token system. Components now name the elevation **role** rather than
the shadow **size**, in the same relationship `--surface-card` has to `--gray-50`.

- **`tokens/elevation.css`** (new, imported by `styles.css`) — a six-step semantic scale ordered to
  mirror the z-index contract: `flat` · `surface` · `raised` · `floating` · `overlay` · `modal`.
- **The steps alias the ramp (`var(--shadow-…)`) rather than restating its values.** `var()` resolves
  late, in the element's own theme context, so the per-theme `--shadow-*` overrides flow through for
  free. A restated literal would freeze the light-theme shadow into every theme.
- **Real bug found and fixed: marketing-dark never overrode `--shadow-*`.** `[data-theme="dark"]`
  inherited the light ink-tinted ramp (`rgba(2,2,30,0.05–0.12)`) on a pure-black page, so **every
  elevated surface on the marketing theme rendered flat**. `app-dark` got real shadows long ago;
  marketing-dark was missed. It now has the same treatment at slightly higher alpha.
- **49 components migrated**, 66 raw `--shadow-{xs,sm,md,lg,xl}` uses swapped to `--elevation-*`.
  Value-identical by construction (the aliases resolve to the same ramp), so this is visually neutral:
  all three tri-theme baselines pass unchanged, no re-bless.
- **Three new craft guards** (`verify-craft` → 13 rules), each proven to bite on an injected violation:
  `raw-shadow-token` blocks raw ramp sizes in component JSX (`raw-shadow-ok` escape hatch) ·
  `elevation-contract` requires all six steps, requires each to alias rather than restate, and
  requires **both** dark themes to override the whole ramp so the marketing-dark bug cannot recur.
- `--shadow-brand` and `--shadow-focus` are deliberately **not** in the scale: they are state, not
  depth, and components keep naming them directly.
- `gen-tokens.mjs` exports an `elevation` group in `tokens.json` and adds the steps to the Tailwind
  preset's `boxShadow`.
- Docs: `guidelines/elevation.md`, including the honest caveat that no drop shadow registers against
  marketing-dark's pure `#000` page background — depth there comes from surface lift + hairline border.

## 2026-07-25: chart accessibility contract (10 charts had no text alternative)

An audit for gaps the six verifiers miss found a real one: **10 of the 14 charts exposed nothing at
all to a screen reader** — no `role`, no `aria-label`, no `<title>`/`<desc>`. A bare `<svg>` announces
silence, so every chart-only number was invisible to assistive tech (WCAG 1.1.1). Four charts
(Bullet, Gauge, Heatmap, Waterfall) already did it correctly, so the pattern existed; it was just
applied inconsistently. The gates missed it because `verify-a11y` had **no chart cases at all**.

- **All 14 charts now carry a text alternative**, in one of three shapes by where the information
  lives: `role="img"` + `aria-label` where the graphic carries the data (Line, Sparkline, Area,
  Donut, Scatter, StackedBar, Sankey, Gauge, Waterfall, Bullet) · `role="group"` + `aria-label`
  where values are already readable text (Bar, Funnel, Heatmap) · `role="list"` / `role="listitem"`
  for Legend, which is a key rather than a graphic.
- **Every chart takes an `ariaLabel` prop**, with a derived default that states the chart type and
  data shape and degrades to a `no data` form on empty input (e.g. `"Line chart, 4 points, from 12
  to 24"`). Declared in all 13 affected `.d.ts` files.
- **Heatmap `role="figure"` → `role="group"`**: a figure without a caption gives AT nothing extra.
- **`verify-a11y` 76 → 92 contracts**, including the empty-data and `ariaLabel`-override paths. A
  chart with no case is a chart that can silently lose its label again.
- Docs: `guidelines/chart-contract.md` — the contract plus what roadmap 4.4 still owns (shared
  interaction/tooltip/legend conventions).

ARIA-only: all three tri-theme visual baselines pass unchanged.

## 2026-07-25: Phase 2.1 — density scale (compact / comfortable / spacious)

The first of the Phase-2 cross-cutting token systems. One attribute now resizes controls, fields,
table rows and app chrome across a whole subtree, so a dense operator table and a roomy onboarding
form share the same components with **no per-component overrides and no size props threaded through
the tree**.

- **`tokens/density.css`** (new, imported by `styles.css`) — 20 `--density-*` tokens in four scopes:
  `:root`, `[data-density="comfortable"]`, `[data-density="compact"]`, `[data-density="spacious"]`.
  Groups: control heights/padding (sm/md/lg), form fields, table + list rows, app chrome (bars, nav
  rail, nav items), plus generic `--density-gap` / `--density-surface-pad` and a `--density-scale`
  multiplier (0.85 / 1 / 1.15) for consumer spacing math.
- **`comfortable` is byte-identical to the pre-scale values**, so the migration is visually neutral:
  the tri-theme visual baselines passed unchanged, with no re-bless.
- **11 components migrated** onto the tokens: Button, Input, Select, Textarea, SearchInput, Combobox,
  DataTable (cells + footer), Sidebar (rail + items), FilterBar. Two 2px consistency corrections fell
  out of it — Textarea and SearchInput horizontal padding were 14px against every other field's 16px,
  and now track `--density-field-pad-x`.
- **New craft rule `density-contract`** (`verify-craft` → 11 rules): every scope must declare the
  *same* token names. A scope that omits one silently inherits its parent's value, so a comfortable
  island inside a compact page would render half-compact. Proven to bite on both forms (a dropped
  token and a missing `@import`).
- **3 new interaction tests**: compact < comfortable < spacious; `comfortable` measures the literal
  pre-scale defaults (Button 46px, Input 52px); and a `comfortable` island nested inside a `compact`
  region resets fully to 46px — the behaviour the contract rule protects.
- `gen-tokens.mjs` exports the comfortable defaults as a `density` group in `tokens.json`.
- Docs: `guidelines/density.md` (when to use each, authoring rules); stale component counts in
  `readme.md` (113 → 115) and `SKILL.md` (86 → 115) corrected.

## 2026-07-24: visual launch factory expansion

Added a reusable launch production system anchored in Alfred's decision-intelligence positioning:

- Campaign content and template-manifest schemas separate approved messaging from layout, with citation
  validation, Northwind demo labels, lifecycle states, deterministic filenames, and embargo guards.
- The generated campaign gallery includes 3,528 public-safe variants across 14 families, plus a
  separately acknowledged restricted catalog with 3,780 variants across 15 families.
- New website, investor, motion, press, email, operations, product-shot, and illustration systems provide
  complete flagship launch surfaces with exact-size previews and static fallbacks.
- Expansion audits, render checks, responsive checks, release manifests, and approval contact sheets make
  the production system reproducible and reviewable.

The public launch remains blocked until real company content, release timing, funding state, approval
owners, and five-critic signoff are supplied. The generated release warnings preserve those blockers.

## 2026-07-24: evidence and decision comparison primitives

Added two product-specific components that extend Alfred's visual language for trustworthy decisions:

- **`EvidenceLedger`** audits a claim in place. Supporting, contradicting, and contextual evidence remain
  visible together, with source freshness and a compact evidence-confidence summary.
- **`DecisionFork`** compares strategic paths through outcomes, confidence, reversibility, and explicit
  tradeoffs. Alfred can recommend a path without making the alternatives feel fake.

Both components ship with TypeScript declarations, prompt documentation, responsive defaults, theme-aware
tokens, interactive preview coverage, and full keyboard semantics.

## 2026-07-23 — Harden verify-craft: JSX outline/z-index forms (Phase 1.5)

Tightened two craft rules that only caught the CSS syntax, missing the JSX inline-style form:
- **`outline-none-no-focus`** now catches `outline: "none"` / `outlineStyle: "none"` (quoted), not just
  bare `outline: none`, and its `suppressIf` also recognises the DS's custom-focus patterns
  (`--shadow-focus` / `--border-focus` rings, `usePress` / `isFocusVisible`) so the 14 components that
  legitimately replace the outline aren't flagged.
- **`arbitrary-z-index`** now also catches the camelCase `zIndex: 9999` form.

The tightened outline rule immediately bit **4 real focus-visibility gaps** — raw `<input>`s in the app
UI-kit screens (Dashboard, Screens2) and two marketing section templates (SectionsB, SectionsD) that set
`outline: "none"` with no replacement. Fixed by removing the inline `outline: none` so the DS's global
`:focus-visible` outline (base.css) applies. All six verifiers green.

## 2026-07-23 — forced-colors (Windows High Contrast) baseline (Phase 1.3, part 3 — completes 1.3)

Adds `tokens/forced-colors.css` (imported by `styles.css`) — a global
`@media (forced-colors: active)` baseline for Windows High Contrast, where the OS
flattens author backgrounds to Canvas and drops box-shadows. It restores the two
things that otherwise vanish, using the semantic hooks components already emit (no
per-component edits):
- **Focus stays visible** — `:focus-visible { outline: 2px solid Highlight !important }`.
  The `!important` beats the inline `outline: none` on the ~12 inner form controls
  that show focus via a box-shadow ring (HCM strips shadows), so the keyboard ring
  survives.
- **Floating surfaces stay delineated** — `[role="dialog"]/[role="menu"]/[role="listbox"]/
  [role="tooltip"]` get a system-coloured border (they separated by shadow before).

A new `verify-craft` **`forced-colors-contract`** check (mirroring `reduced-motion-contract`)
gates that the file ships, is imported, and keeps the focus + surface rules — so a
refactor can't silently drop it. Deep per-component high-contrast tuning (selected-state
visuals, an HCM render test) is deferred to Phase 2.4. **This completes Phase 1 (harden
the core): all 113 components are typed, tested, a11y-gated, contrast-gated, and
high-contrast-safe.**

## 2026-07-23 — verify-a11y expansion + 5 a11y fixes it surfaced (Phase 1.3, part 2)

Grew the accessibility-contract verifier from **53 → 74 cases** (`scripts/verify-a11y.mjs`), covering
core interactive primitives (Button, IconButton, Input/Textarea/Select incl. error states, Slider,
TagInput, FileDropzone), nav (Breadcrumb, Sidebar), progress (ProgressBar, Stepper, ConfidenceMeter),
and conversation (SeekComposer, PromptSuggestions) — each authored from real SSR output.

Authoring the cases surfaced **5 real a11y gaps, all fixed**:
- **ProgressBar** had no semantics at all → now `role="progressbar"` + `aria-valuenow/min/max` +
  optional `label` (its siblings ProgressRing/UsageMeter already did this).
- **Stepper** → list semantics + `aria-current="step"` + a per-step accessible name.
- **IconButton** couldn't carry its own accessible name (title-less usage announced the raw icon slug)
  → new `label` prop sets `aria-label`.
- **Input / Textarea / Select** never associated their error text → the error `<span>` now has an `id`
  + `role="alert"`, and the control gets `aria-describedby` + `aria-invalid` when `error` is set.
- **FaqItem** toggle had no `type` → `type="button"` (was submitting inside a `<form>`).

All ARIA-only (no visual change; the visual gate is unaffected). `Tooltip` was intentionally left to the
Playwright interaction suite — its `role="tooltip"`/`aria-describedby` only exist after hover, so there's
nothing to assert at SSR. Remaining Phase 1.3: `forced-colors` (Windows high-contrast).

## 2026-07-23 — Programmatic WCAG contrast checker + on-tint AA fixes (Phase 1.3, part 1)

Adds the **6th verifier**, `scripts/verify-contrast.mjs` — a dependency-free WCAG-AA contrast gate.
It parses `tokens/colors.css` into per-theme token maps (root → theme override, `var()` resolved),
composites rgba tints to opaque over their real backdrop, and asserts the 66 foreground/background
pairs components actually render — body text on surfaces, Banner/Callout copy, and Badge/Chip on-tint
labels — across light / marketing-dark / app-dark at 4.5:1 (text) / 3:1 (large). Wired into
`verify.yml` and CONTRIBUTING; run `node scripts/verify-contrast.mjs` (or `--audit` for the full table).

It immediately caught 13 real sub-AA pairs, all now fixed:
- **On-tint label ramp:** darkened `--text-on-tint-brand`/`--text-on-tint-info` in light to clear AA on
  their tints (same hue, minimal), and gave marketing-dark its own lifted `--text-on-tint-*` shades
  (mirroring app-dark) so deep light-theme shades no longer sit on the low-alpha dark fills.
- **Chip:** success/danger labels now use `--text-on-tint-success`/`--text-on-tint-danger` (were raw
  `-500`, 2.3–3.3:1); the selected pill is ink-on-orange (was white-on-orange, 2.44:1 → 8.35:1).

Note pixel visual-regression can't catch small-text color shifts (they fall under the 2% tolerance) —
this is exactly the gap the token-level checker closes. Remaining Phase 1.3: expand `verify-a11y` past
its 53 cases and add `forced-colors` handling.

## 2026-07-23 — Visual regression gated in CI (Phase 1.4a)

Completes the #30 follow-up: the tri-theme visual suite is now a standing CI gate, not local-only.
- **`visual` job** in `.github/workflows/verify.yml` runs `tests/visual.spec.js` in the version-pinned
  Playwright container (`mcr.microsoft.com/playwright:v1.61.1-jammy`, matched to the lockfile so the
  preinstalled browsers + font stack are deterministic) against committed `*-linux.png` baselines. The
  diff report is uploaded as an artifact on failure. A re-introduced marketing-dark Banner regression is
  now a red check, not a manual browser pass.
- **`.github/workflows/update-visual-baselines.yml`** (`workflow_dispatch`) regenerates the Linux
  baselines in the *same* container and commits them back to the branch — the "accept a new look" button
  for when a visual change is intentional.
- Seeded `gallery-{light,app-dark,dark}-visual-linux.png` (in that container; no Docker locally, so a
  temporary branch-scoped push trigger bootstrapped them, since `workflow_dispatch` requires the file on
  the default branch first). `*-darwin.png` retained for local `npm run test:visual`.

## 2026-07-23 — Playwright harness — interaction tests (CI) + tri-theme visual regression

Phase 1.4. Stands up `tests/` on Playwright, with a permanent tri-theme harness (`tests/harness.html`) —
the gallery that caught the marketing-dark Banner bug, made permanent — and two suites:
- **interaction** (`tests/interaction.spec.js`) — OS-independent behaviour: SegmentedControl roving-radiogroup
  arrow nav, Switch (native input) + OfferSwitch toggles, and Button hover-state (which guards the
  `usePress` refactor). A new CI job runs these on every PR (`npm ci` → install Chromium → run).
- **visual** (`tests/visual.spec.js`) — light / app-dark / marketing-dark screenshot regression, with
  committed baselines (platform-suffixed). Run locally with `npm run test:visual`.

Adds `@playwright/test`, `playwright.config.js`, and a tiny static server (`scripts/serve-tests.mjs`).
**Follow-up (Phase 1.4a):** ✅ shipped in #31 — the visual snapshots now gate CI (Linux baselines seeded
in the CI Playwright container). See the Phase 1.4a entry above.

## 2026-07-22 — Type-check completeness — `tsc --noEmit` now gates the `.d.ts`

Finishes Phase 1.2. Adds a minimal `package.json` + `tsconfig.json` (typescript + `@types/react@18`,
with `node_modules` git-ignored) and folds a real `tsc --noEmit` over all 113 `.d.ts` into
`scripts/verify-types.mjs` — it runs the type-check when the toolchain is installed and skips (not
fails) otherwise, so a bare `node scripts/verify-types.mjs` still gives the presence/consistency
guarantee without an install. CI now runs `npm ci` (npm-cached) before the verifiers, so every PR
type-checks the declarations. All 113 `.d.ts` type-check clean; `@types/react@18` keeps the global
`JSX.Element` the declarations use.

## 2026-07-22 — Type completeness — 113/113 components typed + a `verify-types` gate

Phase 1.2 of `ROADMAP.md`. Authored the **21 missing `.d.ts`** (app / charts / trust — the complex
components: DataTable, CommandPalette, FilterBar, the 9 charts, DecisionLog, RecommendationCard, …), so
**all 113 components now ship a TypeScript declaration**. Types match the real props — precise unions,
callback signatures, named sub-shape interfaces, index signatures for dynamic-key data — cross-checked
against each component's `.jsx` and its `verify-components` sample props. Adds a **5th verifier**,
`scripts/verify-types.mjs`: fails if any component lacks a sibling `.d.ts`, or if a `.d.ts` doesn't
declare the component it types. Dependency-free and wired into CI. (Full `tsc --noEmit` type-resolution
needs `@types/react` in CI — noted as a follow-up.) Authored via a fan-out workflow (one agent per group).

## 2026-07-22 — Shared interaction primitive — `usePress` / `isFocusVisible`

Phase 1.1 of the expansion plan (`ROADMAP.md`). Extracted the hand-rolled press/hover/focus state
that ~7 components duplicated — and the `:focus-visible` detection block that was copy-pasted verbatim
in four — into one internal hook, `components/hooks/usePress.jsx`. Each interaction is opt-in
(`{ hover, press, focus }`), so every component keeps exactly the listeners it had before
(behaviour-preserving). Adopted by Button, IconButton, Sidebar, OfferSwitch, JobListingRow and
PriceCard (full `usePress`); SegmentedControl shares just `isFocusVisible` (its focus is per-segment).

Also introduces the design system's first **internal-module** pattern: `build-bundle.mjs` now bundles
`components/hooks/*` into the shared scope for sibling imports but excludes them from the component
list, the namespace, the manifest and the gallery (recorded under `unexposedExports`). The bundle is
"114 source files, 113 components". All four verifiers green.

## 2026-07-22 — Marketing-dark theme — re-map the soft / status tint ramps

Follow-up to the semantic-token migration, caught in a three-theme visual QA. The marketing `dark`
theme re-mapped the semantic tokens but not the raw soft / status tint ramps (`--info-100`,
`--warning-100`, `--success-100`, `--danger-100`, `--orange-50/100`, `--periwinkle-*`, `--gray-*`),
so a component that fills its whole surface with one — e.g. `Banner` — rendered a *light* pastel fill
on the pure-black page, and its white primary text failed contrast. Added the same tint re-map block
`app-dark` already ships to the `[data-theme="dark"]` block, so status/soft fills read as dark
low-alpha bars (matching the Callouts, which use `rgba()` literals). Fixes `Banner` (all four tones)
and makes status chips / badges / alerts consistent on marketing-dark. Token-only change; no
component code touched; all four verifiers green; visually confirmed.

## 2026-07-22 — Semantic-token migration — the component library off the raw ramps

Every component now styles itself with **theme-aware semantic tokens** instead of raw ramp steps
(`--gray-*`, `--orange-*`, `--periwinkle-*`, `--ink-*`), so surfaces re-theme correctly across
`light` / marketing `dark` / `app-dark`. Raw ramps only re-map under `app-dark` (and not at all under
marketing `dark`), so a raw `--gray-100` fill or `--orange-50` tint rendered wrong on a dark page; the
semantic aliases carry the correct per-theme value.

- **159 token swaps across 67 component `.jsx` files** (the whole library minus the already-clean ones).
  Mapped by role: solid accent → `--accent`, hover → `--accent-hover`, focus/active border →
  `--border-focus`, link → `--text-link`, soft fill → `--accent-soft`, grays → `--surface-*` / `--border-*`,
  periwinkle info → `--info-500`, and foreground-on-tint → `--text-on-tint-brand` / `--text-on-tint-info`
  (the last two also lift under `app-dark`, fixing chip/badge/pill text legibility on ink).
- **Priority families made symmetric** — DecisionAlert / RecommendationCard / DecisionLog now use the
  status tokens (`--danger` / `--warning` / `--info` / `--success`) end-to-end instead of a raw orange rail.
- **Legit raw uses preserved** (reviewed): brand-gradient SVG `<stop>`s (Gauge / ProgressRing), the Heatmap
  sequential scale, the DashboardMock fake-dark device frame, DotMatrix's var-name lookup, Button's
  ink-on-periwinkle secondary, the Avatar identity palette, and UsageMeter's `--orange-500` re-scope — each
  carries an inline `raw-ramp-ok` marker or sits in an allow-listed file.
- **New guard** — `verify-craft` gains a `raw-ramp-token` rule that fails if any component `.jsx`
  reintroduces a raw ramp step outside the reviewed allow-list, so this can't silently regress.

All four verifiers green. The migration + an independent adversarial review ran as a fan-out workflow
(one agent per component group, one reviewer per group).

## 2026-07-22 — CI — the four verifiers now gate every PR

Added `.github/workflows/verify.yml` (the repo's first CI). On every pull request and push to
`main` it rebuilds the bundle, fails if the committed `_ds_bundle.js`/`_ds_manifest.json` are stale
(`build-bundle.mjs` is deterministic), then runs `verify-render`, `verify-components`, `verify-a11y`,
and `verify-craft`. A red check blocks the merge — so the render health, ARIA/keyboard contracts, and
craft rules the verifiers guarantee can no longer regress un-noticed. `CONTRIBUTING.md` updated to note it.

## 2026-07-22 — Overlay motion pass — the 4 held interactive items

The behavior-restructuring items held from the component review, done as a careful individual pass.
All four verifiers green (render + the Menu/Drawer/Popover/Tooltip ARIA contracts preserved). Verified
at the render + a11y-contract + code level; a live browser QA of animation feel is still recommended.

- **Drawer** now slides in/out (enter `var(--dur-base)`, exit `var(--dur-fast)`) via a mounted/`exiting`
  lifecycle; the focus trap, Escape, scrim, and `role="dialog"`/`aria-modal`/`aria-labelledby` are unchanged.
- **Popover** grows from its trigger (opacity + `scale(0.98)→1`, placement-aware `transform-origin`) via a
  mount-then-rAF entrance; close stays instant to protect focus handling.
- **Tooltip** gains a ~300ms open-delay plus a shared delay group — once one tooltip is open, siblings open
  instantly (a sweep across an icon row feels connected); `aria-describedby` unchanged.
- **Menu** row highlight now has a single source of truth (`activeIndex`), so keyboard arrow nav paints the
  highlight and a stale mouse tint no longer lingers; roving tabindex + keyboard handlers unchanged.

## 2026-07-22 — Component craft polish + rail reconciliation

The contained half of the emil + impeccable component review, plus the side-stripe rail decision.
13 component fixes, all backward-compatible; bundle rebuilt; all four verifiers green.

### Component fixes
- **StatTile** gains an optional `valence` prop (good/bad/neutral) like KpiCard — decouples the
  delta-pill colour from the arrow direction, so a rising *bad* KPI can read red. Falls back to the
  direction colour when omitted. Adds `StatTile.d.ts`.
- **ConnectionHealthCard** syncing-dot pulse moved off a `setInterval`/`setState` timer (which
  re-rendered the whole card) to a `useId`-scoped CSS `@keyframes` gated on `prefers-reduced-motion`
  (mirrors `SyncStatusBadge`; now also honours a live reduced-motion change).
- **Card** hover-lift is gated to hover-capable pointers — no sticky hover on touch.
- **SeekComposer** focus ring cross-fades a persistent `--gradient-brand` layer's opacity (no
  solid→gradient snap); the send button gains the house `scale(0.98)` press.
- **PromptSuggestions · TagInput · InsightFeedback** gain hover/active/press feedback on their
  hand-rolled pressables, via semantic tokens.
- **DecisionAlert** icon-chip background now tone-matches the priority (glyph + chip read as one family).
- **Callout** action underline cross-fades `text-decoration-color` (the old `color` transition was a no-op).
- **AgentStatus · SankeyChart** motion now uses the `--ease-standard` / `--dur-*` tokens instead of
  the default easing / a raw `160ms`.
- **LineChart** keeps a uniform 3px stroke under non-uniform scaling (`vector-effect: non-scaling-stroke`).
- **Logo** `tone="auto"` adds `loading="lazy"` so the browser can skip fetching the hidden lockup
  (partial, browser-dependent mitigation).

### Rail reconciliation
- `craft-checklist.md`'s side-stripe ban is softened: the tone-matched priority/kind **rail** on
  decision surfaces (`DecisionAlert`, `RecommendationCard`, `ApprovalGate`, `CausalChain`, `Callout`,
  `Banner`) is an accepted Alfred device — the ban is only for a stripe with no systematic meaning.

### Held for a careful pass
- 4 motion-restructure items — `Tooltip` delay-group, `Drawer` slide-in, `Popover` entrance,
  `Menu` highlight source-of-truth — need individual review with browser verification.
- `Logo` colour wordmark — no colour wordmark asset exists yet.

## 2026-07-22 — verify-craft — mechanical craft checks + gradient-text reconciliation

A fourth verifier that turns the checkable half of the new craft guidelines into an enforced gate.

- **`scripts/verify-craft.mjs`** — scans the design system's own source (`.html`/`.css`/`.jsx`)
  for the mechanically-detectable craft violations and fails on any hit: `transition: all`,
  `ease-in` on UI, `scale(0)` entries, hardcoded `cubic-bezier` outside `tokens/`, arbitrary
  `z-index` (999/9999), `outline: none` with no focus replacement, and emoji in source — plus a
  positive check that `tokens/base.css` still ships the global `prefers-reduced-motion` block.
  Green today (359 files, 8 rules), so it acts as a forward regression guard. The subjective
  rules (eyebrow-per-section, layout sameness, copy) stay with the human/five-critic pass.
- **Gradient-text reconciliation.** `background-clip: text` with `--gradient-brand` on short
  display/emphasis text is a committed Alfred brand device (~30 deliberate uses across social,
  decks, heroes), not a slop tell — the checker allows it. `craft-checklist.md` and `anti-slop.md`
  updated from a flat "gradient-text ban" to the nuanced rule (gradient on body copy / as the only
  emphasis everywhere is the tell; gradient on a short display word is on-brand).
- Wired into `CONTRIBUTING.md` (Verify step + pre-sync checklist), `readme.md`, and `SKILL.md` as
  the fourth verifier. Documentation/tooling only — no token, component, or bundle changes.

## 2026-07-22 — Craft & taste — three craft guidelines distilled from external skills

A **craft & taste layer** so on-brand work also clears a real craft bar. The durable principles
of three external design skills — distilled, reconciled to Alfred's committed tokens and voice,
and made self-contained so they survive the claude.ai/design sync (where the source plugins
aren't installed). Documentation only — no token, component, or bundle changes.

### New guidelines (`guidelines/`)
- **`motion-and-animation.md`** — how motion should feel, mapped onto Alfred's real tokens: the
  two `--ease-*` curves (standard ease-out / rare emphasized overshoot) and three `--dur-*`
  durations bound to press/dropdown/modal, the "should this animate at all?" frequency test,
  component patterns (scale-on-press, origin-aware popovers, tooltip skip-delay, transitions over
  keyframes), transform/opacity + WAAPI performance, and the note that `base.css` already owns
  `prefers-reduced-motion`. Distilled from Emil Kowalski (animations.dev).
- **`anti-slop.md`** — how to stay off the AI-generated tell list while staying 100% on brand:
  the VARIANCE/MOTION/DENSITY dials with Alfred presets, layout-diversity rules, eyebrow
  rationing, machined depth (nested enclosures + concentric radii + ink-tinted shadows), real
  assets over div-fakes (Alfred's own icon set, never emoji), quantified content, and a
  pre-flight check. Periwinkle + the brand gradient are carved out of the source's "no purple
  glow" rule; the em-dash ban is routed to `voice-and-naming.md` as a voice decision, not
  imported wholesale. Distilled from the taste-skill plugin (13 skills).
- **`craft-checklist.md`** — the pre-ship quality gate: contrast thresholds (reusing
  `--text-on-orange`, `:focus-visible`, KpiCard valence), typographic measure, "cards are the
  lazy answer," all eight interactive states, the absolute bans, hardening against real data, the
  three `verify-*.mjs` scripts as the automated floor, and the impeccable "modes of work" lenses.
  Distilled from the impeccable skill.

### Wiring
- **`SKILL.md`** gains a **Craft & taste** section (pointing to the three docs) and a **Companion
  skills (if installed)** section listing emil-design-eng, impeccable, and all 13 taste skills
  with one-liners + Alfred-fit notes, grouped into useful lenses / alternate-aesthetic
  reference-only / image-gen-only. Framed so claude.ai/design needs nothing extra — the
  principles already live in `guidelines/`.
- **`readme.md`** references the craft guidelines in the Claude Code flow and the file tree.

## 2026-07-13 — The critique pass — five-critic review, everything fixed

A five-lens design review (visual craft · color/a11y · UX/IA · interaction states ·
dark craft) of the workspace, then the full fix list. Both themes.

### Accessibility & color
- **Ink on orange.** New theme-constant token `--text-on-orange` (`ink #02021E`, 8.35:1) —
  every solid-orange fill (Button primary, SegmentedControl, pills, glyphs across 15
  components) drops white-on-orange (2.44:1, AA fail). White stays for gradient + danger
  (`--text-on-brand`); recorded in `LIVE-DRIFT.md` as a deliberate divergence.
- **Valence ≠ direction.** `KpiCard` gains `valence` ("good"/"bad"/"neutral") so falling
  cost metrics (CAC −8%, CPL −14%, wasted spend −31%) finally read green; the arrow alone
  shows direction. Delta chips now use the `--text-on-tint-*` ramp (6.7–8.2:1).
- **Focus you can see.** Global `:focus-visible` is a 2px offset `--border-focus` outline —
  no more radius mutation, no shadow displacement, visible on dark (the old alpha ring
  composited to 1.4:1).
- New `--text-display` tier: display/KPI type at 92% white on app-dark (halation fix), ink
  in light. Real dark shadow ramp (true black, ~5x alpha) so overlays actually float.

### Orange budget & hierarchy
- One solid-orange primary per view; every other CTA is the quiet `subtle` recipe
  (incl. `DecisionAlert`/`NotificationItem` internal actions). Switch tracks on dark:
  visible off state (20% white), ember on state.
- The hero ink panel gets `--surface-ink` + a periwinkle→orange hairline on app-dark —
  the view's one gradient — so the briefing wins the squint test again. Sidebar upsell is
  now a quiet usage card ("412 of 500 Ask Alfred queries" + See plans → Billing); no more
  permanent gradient card, no more nonexistent "Pro" plan.
- `Avatar` default `tone="auto"` hashes names onto a muted tint palette — people lists
  stop being rows of identical orange discs.

### IA, UX & content
- Sidebar grouped: Today / Intelligence / Data / Workspace with eyebrows; distinct inbox +
  memory glyphs; "Alfred Core" → **Memory**, "Seek Alfred" → **Ask Alfred** everywhere.
- Header chrome is real: the search pill is a button with a ⌘K chip that opens
  CommandPalette (wired to nav + ask); the bell opens Decision alerts.
- **Review-before-approve**: alert CTAs open a Modal with the from→to diff, projected
  impact and rollback promise; approving shows Executing + Undo ("I'll confirm in Slack
  when it's live"). "Approve all drafts" is gone.
- Double page headers removed (Notifications, Billing, Team, Memory); unread rows are
  dot + bold, not tinted bands; the delivery matrix has one EMAIL/SLACK/IN-APP header row;
  Settings locked fields are labeled rows ("Managed by your admin") with real dirty-state
  Save/Cancel; content columns center at wide viewports; sentence case + first-person
  voice throughout; one demo fixture (Northwind Labs, priya@northwindlabs.com).

## 2026-07-13 — App dark, quiet pass — color whispers at night

- Retuned `[data-theme="app-dark"]` after first review ("too much"): tint washes
  dropped to ~10% alpha (from 18%), tint text went dusty instead of vivid
  (`--text-on-tint-*`: `#EDA26A / #A9B2E9 / #82CBA4 / #E09193`), the ambient
  glows became embers (~0.10–0.12 alpha, half strength), the warm input cast and
  `--accent-soft` softened, and the primary-button hover glow dimmed
  (`--shadow-brand` override). Solid orange actions keep full strength.
- New semantic token `--surface-ink` for the dramatic ink hero panels (briefing
  bands, first-run): still the deep navy `ink-900` in light, but a quiet raised
  `#1D1D1B` panel on app-dark — the navy splash was the loudest element on the
  dark canvas. `Card tone="ink"` now uses it.

## 2026-07-13 — App dark theme — the product workspace at night

### New theme: `[data-theme="app-dark"]`
- A third theme scope in `tokens/colors.css`, distinct from the marketing `dark` theme:
  the app keeps **Clash Display** headlines/KPIs (no Satoshi swap) and real card elevation
  on the **warm ink ramp** — page/canvas `#0C0C0A`, sunken `#111110`, card `#171715`,
  raised `#1D1D1B` — with white-alpha hairlines and white text tiers.
- Unlike the marketing theme, `app-dark` also re-maps the soft tint ramps
  (`--orange-50/100`, `--periwinkle-50/100`, `--success/warning/danger/info/urgent-100`,
  `--gray-50…200`) to low-alpha ink equivalents so badge, chip, callout and alert fills
  read correctly on dark. Brand primaries, the gradient and `--chart-1…8` never change.
- New semantic tokens in every theme: `--surface-hover` (nav/ghost hover fill),
  `--surface-veil` (translucent blur veil for sticky chrome), `--text-body`
  (`ink-700`-tier long-form copy). Dark-theme `::selection` is now readable (white on
  warm orange alpha).

### New kit: `ui_kits/app-dark/`
- The full 22-screen CMO workspace under `app-dark`, reusing the light kit's screen files —
  the dark twin is a theme attribute, not a fork. White logo lockup via the new optional
  `logoTone` prop on the kit `AppShell`.

### Component & kit hygiene (light rendering unchanged)
- Swept raw ink/white refs to the semantic layer (`--text-primary/-body/-secondary/-muted/
  -placeholder`, `--surface-card`, `--surface-veil`, `--accent-soft`, `--surface-hover`)
  across core, data, overlay, feedback, decision, conversation and marketing components and
  all eight app-kit files, so every component renders on light, marketing-dark and app-dark
  from one source. Intentional ink surfaces (Card `ink` variant, Avatar `ink` tone,
  DashboardMock) and white-on-brand pairs are untouched.

### Docs & registration
- `guidelines/color-dark-app.card.html` specimen; app-dark kit + guideline cards and the
  `App dark` theme registered in `_ds_manifest.json`; readme, SKILL.md and CONTRIBUTING.md
  updated with the two-dark-themes rule (never put marketing `dark` on a product surface).

## 2026-07-04 — Daily-content system — 18 archetype frames for the everyday calendar (34 → 52 frames)

### New frames (all in `social/`)
- **Education set**: `linkedin-tip` (field-notes series), `linkedin-checklist`,
  `linkedin-myth-fact` (struck-through myth vs white fact), `linkedin-comparison`
  (old-way/with-Alfred split), `definition` (1080×1080 "decision dictionary", cross-platform).
- **Engagement set**: `linkedin-question` (ghost-"?" discussion prompt), `linkedin-hot-take`,
  `instagram-story-poll` (designed landing pad for the IG poll sticker), `x-post`
  (1200×675 16:9 statement card for the X feed).
- **Product & promo set**: `linkedin-feature-spotlight` (principle-level memory chips),
  `integration-spotlight` (typographic "Alfred × Partner" lockups — no third-party logos),
  `blog-promo` (pillar-colored, 1080×1350), `linkedin-weekly-recap` (Friday themes).
- **Moments set**: `milestone` (number ships `[BRACKETED]` — real figures only),
  `instagram-story-countdown` (bracketed day count, true on the day it posts).
- **Carousel expansion**: `carousel-slide-checklist`, `carousel-slide-stat` (visible
  citation), `carousel-end` (follow pill + save chip, last dot active) — all pairing with
  the existing cover/slide skeleton.

### Docs
- `social/README.md` — new inventory sections (LinkedIn carousel, cross-platform daily)
  plus a **daily cadence map**: a Mon–Fri archetype rotation with an event-driven row.
- Gallery groups for the carousel system and cross-platform daily set.

## 2026-07-04 — Social platform expansion — Facebook, Instagram, YouTube + LinkedIn depth (15 → 34 frames)

### New frames (19, all in `social/`)
- **LinkedIn +3**: `linkedin-webinar` (live-session invite: date/time/length chips, speaker
  rows, CTA), `linkedin-hiring` (role rows from the careers canon), `linkedin-product-update`
  ("New in Alfred" changelog card; the gradient hairline is its one gradient element).
- **Facebook +5**: `facebook-link` (1200×630 feed/ad link card), `facebook-square` (1080×1080
  brief-teaser with ranked `dailyBrief` items + demo framing), `facebook-story` (1080×1920,
  280px chrome-safe padding), `facebook-cover` (820×312, mobile-safe 640px column),
  `facebook-event-cover` (1920×1005).
- **Instagram +6**: `instagram-announcement`, `instagram-stat`, `instagram-quote` (1080×1080),
  `instagram-insight` (1080×1350 — the P2 SCALE twin of linkedin-insight), `instagram-story`
  + `instagram-story-stat` (1080×1920, safe-zone padded; story survives the reel grid crop).
- **YouTube +5**: `youtube-thumb-episode` / `-demo` / `-stat` / `-webinar` (1280×720, built to
  the ≤ 5-words-at-≥ 120px thumbnail rule) and `youtube-banner` (2560×1440, content inside the
  1546×423 device-safe area).

### Tooling & docs
- `social/index.html` — live gallery of every frame, scaled tiles grouped by platform.
- `scripts/capture-social.mjs` — batch PNG export: reads each frame's exact size out of the
  file, screenshots via headless Chrome (`--scale 2` for @2x); output to gitignored
  `social/_exports/`.
- `social/README.md` — platform-grouped inventory, safe-zone table (stories, reel crop,
  FB cover, YouTube banner), the YouTube thumbnail legibility rule, and the citation rule
  extended with the three vetted stat/source pairs (63% PwC 2025 · 54% + 37% NIQ 2026).
- Guardrails carried into every new frame: one gradient element per view, visible citations
  or Northwind demo framing on all numbers, third-person marketing voice, bracketed
  `[PLACEHOLDER]`s for real people/roles/locations, white logo lockups only.

## 2026-07-02 — Live-site reconciliation + 20x expansion — 86 → 113 components, full GTM surface coverage

### Reconciled to the live site (full crawl of seekalfred.ai)
- **Dark theme now truthfully models live**: pure-black pages, 3%-white cards, white-alpha
  borders, Satoshi as headline AND body on dark (Inter fallback only). New `--urgent-500`
  (#FF3D00). Website kit nav/footer/FAQ/security matched to live (E902 AI Labs entity,
  Integrations link, 7 FAQ items, live column structure).
- `ui_kits/website/LIVE-DRIFT.md` — the adopted-vs-defect register (two-orange drift, mint
  fallbacks, Framer-blue links, forced Title Case, unicode checkmarks: documented, NOT adopted).
- `guidelines/voice-and-naming.md` — verified canon: Alfred Core, module names + slogans, the
  6+6 agents, tier pricing (₹19,900/₹49,900/₹99,900 · $239/$599/$1,199), verbatim boilerplate,
  marketing-third-person vs product-first-person voice rule.

### Expansion — 27 new components
- **Marketing conversion set**: EyebrowBadge, DotMatrix, OfferSwitch, PriceCard,
  IntegrationCard, CategoryCountBadge, Countdown, AvatarStack, CapabilityTicker,
  AnimatedCounter (SSRs at final value — fixes the live 0% counter defect), JobListingRow,
  ModuleStatusCard, DashboardMock.
- **Glass-box & admin set**: ProvenancePanel, InsightFeedback, ReasoningState,
  ConnectionHealthCard, SyncStatusBadge, UsageMeter, UpgradeModal, AuditLogRow, MemoryCard,
  ModuleSwitcher, TeamMemberRow, BillingPlanCard, NotificationPref, StateBlock.

### Expansion — surfaces
- **Sections 11 → 27** (`SectionsD–F.jsx`): SecHero (default/waitlist/product), SecStatement,
  SecClosingCTA, SecFaq, SecSecurityGrid, SecTeamGrid, SecValuesGrid, SecCareers,
  SecStoryEditorial, SecContactSplit, SecIndustryCards, SecAgentShowcase, SecEnterpriseBand,
  SecStackDiagram, SecTimeline, SecSourcedStats (citations built in).
- **Pages (new)** — 13 full-page templates in `templates/pages/`.
- **App kit 12 → 22 screens** (`Screens3–4.jsx`, routed): ConnectionFlow, ConnectionHealth,
  FirstRunWaiting, NotificationsCenter, AlertDetail (provenance + approval), SettingsProfile,
  TeamPermissions, BillingPlans, MemoryCore, AuditLog.
- **Email system (new)** — `templates/email/`: shell + block library + 19 templates
  (product alerts/digest/reconnect/approval, onboarding 0–3, waitlist/nurture/launch/
  newsletter, verify/magic-link/invite/reset/dunning/NPS).
- **Collateral (new)** — `templates/collateral/`: A4 print theme + one-pagers, 4 battle
  cards, security pack, pilot plan, case-study template, interactive ROI calculator.
- **Social (new)** — OG system, LinkedIn card set, profile kits, brief-of-the-day frame,
  carousel + blog-hero systems.
- **Canonical demo data (new)** — `data/demo-data.json` (Northwind Labs): the single
  fake-data source; the no-fabricated-proof rule enforced across every surface.

### Verification
- All 113 components render clean; 53 a11y contracts hold; all 57 kit/section/screen
  surfaces render clean (verify-render now covers the website kit + new files);
  adversarial 5-lens review pass (pages/emails/collateral/product/functional).

## 2026-07-02 — Accessibility hardening, token scales & 9 new primitives — 77 → 86

### Added
- **9 primitives.** `Accordion`, `Combobox` (full ARIA 1.2 combobox, forwarded input ref),
  `TagInput`, `NumberInput` (spinbutton), `Kbd`, `Divider`, `Spinner` in `core`; `Callout`
  (Alfred's inline insight aside, distinct from Banner) in `feedback`; `ProgressRing` (gradient
  arc, Clash center value) in `data`. All token-driven, both themes, keyboard-complete.
- **Token scales.** Z-index ladder `--z-base…--z-tooltip` (the stacking contract — no more magic
  numbers), categorical data-viz palette `--chart-1…8` (+ a Colors specimen card), theme-aware
  `--overlay-scrim`, `--surface-tooltip`/`--text-on-tooltip`, and `--opacity-disabled`. Exported
  to tokens.json (new `zIndex`/`opacity` groups), the Tailwind preset (`z-*`, `chart-*`) and
  Framer styles.
- **Accessibility verifier.** `scripts/verify-a11y.mjs` server-renders the interactive set and
  asserts 26 ARIA/semantics contracts (focus-trap wiring, live regions, combobox pattern,
  aria-sort, roving roles) so refactors can't silently drop them.
- 2 preview cards (core primitives, feedback status) + the data-viz palette specimen.

### Changed
- **Focus management.** `Modal`/`Drawer` now trap focus, close on Escape, restore focus on close,
  and wire `aria-labelledby`; backdrops use `--overlay-scrim`.
- **Keyboard navigation.** `Menu` (arrows, Home/End, 500ms typeahead, additive `disabled` item
  prop), `Tabs` (real tablist + roving tabindex), `RadioGroup`/`SegmentedControl` (radiogroup
  semantics + arrow movement), `SearchInput`/`CommandPalette` (ARIA combobox with
  `aria-activedescendant`, Home/End), `DataTable` (correct `aria-sort`, labelled row selection),
  `Pagination` (nav landmark, `aria-current`).
- **State semantics.** `Switch`/`Checkbox` ride hidden native inputs (Space toggles, state
  announced); `Toast`/`Banner` are real live regions (danger → `role="alert"`); `Tooltip` wires
  `aria-describedby` and uses the tooltip surface tokens.
- **API.** `Input`, `Textarea`, `Select`, `SearchInput` (+ new `Combobox`, `NumberInput`,
  `TagInput`) forward refs to their inner elements. Disabled opacity unified on
  `--opacity-disabled`. All changes additive — no breaking API changes.
- **Charts.** All categorical palettes consume `--chart-*`; fixed the `Legend` order bug so
  auto-colored legends match their charts (both cycle the same 6 tokens).
- **Tooling.** `gen-tokens.mjs` now parses `tokens/*.css` as the source of truth and syncs the
  manifest token list (183 tokens); `verify-components.mjs` no longer skips forwardRef
  components — all 86 render clean, plus the kits via `verify-render.mjs`.

## 2026-06-26 — Conversation, decision-intelligence & input components — 64 → 77

### Added
- **AI conversation kit (4, new `conversation` group).** The flagship "Seek Alfred" surface as real
  components: `SeekComposer` (the prompt box — gradient focus ring, send glow, starter chips),
  `AlfredMessage` (a turn with inline `[n]` citations + an attached `SourceTrace`), `ThinkingTrace`
  (agentic reasoning steps, made visible), and `PromptSuggestions` (the empty-state nudge).
- **Decision-intelligence primitives (4, new `decision` group).** `ScenarioSimulator` (drag a lever,
  re-project the outcome live with confidence), `GoalPacing` (attainment + on-pace marker + projected
  landing), `ApprovalGate` (the human-in-the-loop pause: approve / modify / decline), and
  `AnomalyFlag` (a pulsing "Alfred flagged this" marker for any metric).
- **Input & feed primitives (5).** `Textarea`, `SearchInput` (with a results dropdown) and
  `FileDropzone` in `core`; `ActivityTimeline` and `NotificationItem` in `data`.
- 4 preview cards, 13 new `*.prompt.md` docs, and `.d.ts` contracts for all 13.

### Notes
- All 77 components render clean via `scripts/verify-components.mjs` (sample props added); the UI kits
  still pass `scripts/verify-render.mjs`. New components reuse existing ones (Slider, ConfidenceMeter,
  Button, Badge, Avatar, SourceTrace) and stay fully token-driven, so they theme on the light app and
  the dark site unchanged.

## 2026-06-25 — Tier 1 component expansion (charts, trust, app) — 42 → 64

### Added
- **Data-viz depth (9 charts).** A real plot foundation — `AreaChart` (multi-series, y-axis
  ticks, gridlines, legend) + `Legend`, plus `StackedBarChart`, `Heatmap`, `GaugeChart`,
  `WaterfallChart`, `BulletChart`, `SankeyChart`, `ScatterChart`. Charts now ship a categorical
  palette and axes/gridlines/legends — the decision-intelligence kit the product needs.
- **Trust primitives (6).** The "no black box" set: `ConfidenceMeter` (causal confidence),
  `SourceTrace` (where an insight came from), `RecommendationCard` (the draft → approve → act
  loop), `DecisionLog` (audit trail), `DataFreshness` (stale-data guardrail), and `CausalChain`
  (the cause → effect → impact signature of the Causal Reasoning Engine).
- **App connective tissue (7).** `Sidebar`, `PageHeader`, `DataTable` (sortable), `FilterBar`,
  `DateRangePicker`, `StatTile` (KPI + inline sparkline), and `CommandPalette` — the flagship
  "Seek Alfred" surface as a real component.
- Preview cards for each group; 22 new `*.prompt.md` docs; new `trust`/`app` source groups.

### Notes
- All 64 components render clean via `scripts/verify-components.mjs` (sample props added) and were
  render-checked at the pixel level. Built with a hand-authored chart foundation + exemplar, then a
  multi-agent workflow for the fleet, then an SSR render/fix pass.

## 2026-06-25 — Presentation deck library (16 decks)

### Added
- **`deck.css`** — a shared on-brand 16:9 slide-layout library (`templates/deck/deck.css`):
  cover, section divider, statement, agenda, content+stat, metric grid, process steps,
  comparison, table, quote, timeline, big-stat band, CTA, integration wall, tinted icons.
  Pairs with the existing `deck-stage.js` runtime + `ds-base.js`.
- **16 ready-to-present decks** (`templates/decks/`), grounded in the product-marketing source
  and verified on-brand (sentence case, no emoji, sourced stats):
  - **Marketing (5):** platform vision · product overview · webinar (the end of the dashboard
    era) · category POV (decision vs business intelligence) · brand & messaging guide.
  - **Sales (6):** pitch · business case & ROI · competitive (why Alfred) · product demo ·
    security & trust · pricing & packaging.
  - **Operations (5):** onboarding & implementation · QBR template · internal all-hands ·
    integrations runbook · customer success playbook.
- **`templates/decks/index.html`** — a gallery linking all 16 decks by function.

### Changed
- Gallery `index.html` regenerated (50 preview cards); new **Decks** group in `gen-index.mjs`;
  17 deck cards registered in `_ds_manifest.json`. Docs updated (SKILL/readme/map).

## 2026-06-25 — App kit completes the product + onboarding kit

### Added
- **Four flagship app screens** (`ui_kits/app/Screens2.jsx`), so the workspace now covers all six
  product capabilities: **Daily Briefing** (the full "Read less, know more" morning narrative),
  **Seek Alfred** (on-demand answers grounded in sources, with the reasoning trace), **Creative
  Lifecycle** (asset-level fatigue scoring) and **AI Visibility Score** (the unique-to-Alfred AI
  citation tracker). Wired into the sidebar nav + routing in `ui_kits/app/index.html`.
- **Onboarding kit** (`ui_kits/onboarding/`) — a standalone first-run flow on the four-stage
  operating model: connect your stack → calibrate → first brief. Its own `@dsCard`.
- New app nav glyphs (briefing, ask, creative, visibility) in `AppShell.jsx`.

### Changed
- `scripts/verify-render.mjs` now also renders the new screens + onboarding flow (10 kit
  components, all clean).
- Regenerated `index.html` (33 preview cards) and refreshed the `Alfred App` card subtitles.

## 2026-06-25 — Component library expansion + tooling

### Added
- **Build pipeline** — `scripts/build-bundle.mjs` compiles `components/**` → `_ds_bundle.js`
  and syncs the manifest, with topological ordering for sibling imports. Components are now
  drop-in source files; the bundle is no longer hand-maintained.
- **Verification** — `scripts/verify-components.mjs` server-renders every component with
  representative props (alongside `scripts/verify-render.mjs` for the kits). Both fail on any
  React error or warning.
- **18 new primitives** — Select, SegmentedControl, RadioGroup, Chip, Slider (`core`);
  Table, EmptyState, Skeleton, Breadcrumb, Pagination, Stepper (`data`); Modal, Drawer, Toast,
  Tooltip, Popover, Menu (`overlay`); Banner (`feedback`).
- **Chart kit** — Sparkline, LineChart, BarChart, DonutChart, FunnelChart (`charts`).
- **Docs** — a `prompt.md` for every component (39 generated via `scripts/gen-prompts.mjs` with
  parsed props tables + curated examples; 3 hand-authored ones preserved).
- **Token exports** — `tokens/tokens.json` (structured), `tokens/tailwind.preset.cjs` (utilities
  that track the live CSS vars), `tokens/framer-styles.json` (for the Framer sync), via
  `scripts/gen-tokens.mjs`.
- **Accessibility & responsive** — global `prefers-reduced-motion` guard, breakpoint tokens
  (`--bp-sm/md/lg/xl`), ARIA roles on the new components.
- **Preview cards** — Controls, Charts, and Data & feedback.

**Component count: 19 → 42.**

## 2026-06-24 — Live-site alignment + app expansion + first sync

### Changed
- Website/marketing materials retuned to match the live seekalfred.ai site: **Satoshi headlines
  + Inter body** on **warm near-black inks**, scoped to `[data-theme="dark"]`. The light app,
  slides and deck are unchanged (Clash Display + Satoshi).

### Added
- Expanded the app UI kit into a multi-screen workspace (KPI Cockpit, Spend & ROI, Decision
  Alerts, Integrations, Settings).
- Section-templates library (`templates/sections/`).
- First sync to **claude.ai/design**.
