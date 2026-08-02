import React from "react";

/**
 * Alfred AI — ChartTable (internal)
 *
 * The data behind a chart, as a real table.
 *
 * The chart a11y contract gave every chart a one-line summary
 * (`role="img"` + `aria-label`). A summary says "Line chart, 12 points, from
 * 2.1 to 3.8" — it does not let anyone read the values. For the charts whose
 * data lives ONLY in the graphic, this is the only way to get at it.
 *
 * Visually hidden rather than toggleable: it changes nothing on screen, so it
 * needs no per-chart layout decision and cannot regress a visual baseline. The
 * clip-rect technique keeps it in the accessibility tree, unlike
 * `display: none` or `visibility: hidden`, which remove it.
 *
 * Only used by the `role="img"` charts. The `role="group"` ones (Bar, Funnel,
 * Heatmap) already render their labels and values as readable text, and adding
 * a table there would make a screen reader announce everything twice.
 *
 * Internal: lives under components/hooks/ so the bundle keeps it off the public
 * namespace, the same way usePress is internal.
 */
/* This style goes on a wrapping DIV, never on the <table> — see the render
   below. Under the default `auto` algorithm a table box IGNORES any width below
   its min-content width, and `overflow` does not clip a table, so `width: 1px`
   left it laid out at its natural ~390px. `clip` suppresses PAINTING, not
   layout, and an absolutely positioned box still contributes to its containing
   block's scrollable overflow: one chart alone on a 320px page made the
   document 389px wide, sixty-nine pixels of horizontal scroll from an element
   that paints nothing.

   `tableLayout: "fixed"` is NOT enough on its own — it binds the declared width
   for the table grid, but a <caption> sits outside that grid and its nowrap
   text still pushes the wrapper box wide. A block container is the only place
   `width: 1px` + `overflow: hidden` clips the whole thing.
   See guidelines/reflow.md. */
const HIDDEN = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

export function ChartTable({ caption, columns = [], rows = [] }) {
  if (!rows.length || !columns.length) return null;
  /* The wrapper is a REAL element in every chart's DOM, so a chart that renders
     <ChartTable> before its visual content shifts every positional selector
     under its root by one. BulletChart did, and its first row moved from
     `> div` nth(0) to nth(1). Render it AFTER the graphic: the reading order is
     better that way round anyway, since the table restates what the chart
     already showed. */
  return (
    <div style={HIDDEN}>
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>{columns.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => (
              j === 0
                ? <th key={j} scope="row">{cell}</th>
                : <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
