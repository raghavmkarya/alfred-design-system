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
  return (
    <table style={HIDDEN}>
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
  );
}
