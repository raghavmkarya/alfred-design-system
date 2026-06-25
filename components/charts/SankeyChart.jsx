import React from "react";

/**
 * Alfred AI — SankeyChart
 * A simplified left→right Sankey for attribution / cross-module signal routing.
 * `nodes`: [{ id, label, col }] where `col` is the 0-based column index. `links`:
 * [{ source, target, value }] referencing node ids. Nodes are laid out in evenly
 * spaced columns; each node's height is proportional to the larger of its in/out
 * flow, and links render as filled bezier ribbons whose thickness equals `value`,
 * tinted from the source node's palette color. Built for a handful of links across
 * 2–3 columns (e.g. "Paid social → MQL → Won"). Pass `valueFormat` to format the
 * throughput printed next to each node.
 */
const PALETTE = ["#FF8431", "#A7A7FC", "#2FB67C", "#7B7BF5", "#F26A1B", "#E5484D"];

export function SankeyChart({ nodes = [], links = [], height = 300, nodeWidth = 14, valueFormat = (v) => Math.round(v), style = {} }) {
  const uid = React.useId().replace(/:/g, "");
  const [hover, setHover] = React.useState(null);

  const W = 720, padL = 82, padR = 82, padT = 22, padB = 22;
  const plotW = W - padL - padR;
  const plotH = Math.max(height - padT - padB, 12);
  const nodeGap = 18;
  const fmt = valueFormat;

  // —— flow totals per node ——
  const inflow = {}, outflow = {};
  links.forEach((l) => {
    outflow[l.source] = (outflow[l.source] || 0) + (l.value || 0);
    inflow[l.target] = (inflow[l.target] || 0) + (l.value || 0);
  });
  const nodeValue = (id) => Math.max(inflow[id] || 0, outflow[id] || 0);

  const maxCol = nodes.reduce((m, n) => Math.max(m, n.col || 0), 0);
  const colX = (col) => padL + (maxCol ? col / maxCol : 0) * (plotW - nodeWidth);

  // —— group nodes by column (order preserved) ——
  const columns = {};
  nodes.forEach((n) => {
    const c = n.col || 0;
    if (!columns[c]) columns[c] = [];
    columns[c].push(n);
  });

  // —— one shared value→px scale so ribbon thickness always equals value ——
  let scale = Infinity;
  Object.keys(columns).forEach((c) => {
    const colNodes = columns[c];
    const total = colNodes.reduce((s, n) => s + nodeValue(n.id), 0);
    if (total > 0) {
      const avail = plotH - (colNodes.length - 1) * nodeGap;
      scale = Math.min(scale, Math.max(avail, 1) / total);
    }
  });
  if (!isFinite(scale) || scale <= 0) scale = 1;

  // —— assign a palette color + index to each node ——
  const colorOf = {}, idxOf = {};
  nodes.forEach((n, i) => { colorOf[n.id] = PALETTE[i % PALETTE.length]; idxOf[n.id] = i; });

  // —— node geometry (vertically centered within each column) ——
  const pos = {};
  Object.keys(columns).map(Number).sort((a, b) => a - b).forEach((c) => {
    const colNodes = columns[c];
    const total = colNodes.reduce((s, n) => s + nodeValue(n.id), 0);
    const contentH = total * scale + (colNodes.length - 1) * nodeGap;
    let y = padT + (plotH - contentH) / 2;
    colNodes.forEach((n) => {
      const h = Math.max(nodeValue(n.id) * scale, 2);
      pos[n.id] = { x: colX(c), y, h, col: c, label: n.label, color: colorOf[n.id] };
      y += h + nodeGap;
    });
  });

  const cy = (id) => (pos[id] ? pos[id].y + pos[id].h / 2 : 0);

  // —— ribbon endpoints, stacked + centered on each node edge ——
  const outAcc = {}, inAcc = {};
  nodes.forEach((n) => {
    const p = pos[n.id]; if (!p) return;
    outAcc[n.id] = p.y + (p.h - (outflow[n.id] || 0) * scale) / 2;
    inAcc[n.id] = p.y + (p.h - (inflow[n.id] || 0) * scale) / 2;
  });

  const bySource = {}, byTarget = {};
  links.forEach((l, i) => {
    if (!bySource[l.source]) bySource[l.source] = [];
    bySource[l.source].push(i);
    if (!byTarget[l.target]) byTarget[l.target] = [];
    byTarget[l.target].push(i);
  });

  // source-side offsets sorted by target position (and vice-versa) to limit crossings
  const sTopY = {}, tTopY = {};
  Object.keys(bySource).forEach((sid) => {
    if (pos[sid] == null) return;
    bySource[sid].slice().sort((a, b) => cy(links[a].target) - cy(links[b].target)).forEach((li) => {
      sTopY[li] = outAcc[sid];
      outAcc[sid] += (links[li].value || 0) * scale;
    });
  });
  Object.keys(byTarget).forEach((tid) => {
    if (pos[tid] == null) return;
    byTarget[tid].slice().sort((a, b) => cy(links[a].source) - cy(links[b].source)).forEach((li) => {
      tTopY[li] = inAcc[tid];
      inAcc[tid] += (links[li].value || 0) * scale;
    });
  });

  return (
    <div style={{ width: "100%", ...style }}>
      <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{ display: "block" }}>
        <defs>
          {nodes.map((n, i) => (
            <linearGradient key={n.id} id={`${uid}g${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={colorOf[n.id]} stopOpacity="0.46" />
              <stop offset="100%" stopColor={colorOf[n.id]} stopOpacity="0.16" />
            </linearGradient>
          ))}
        </defs>

        {/* ribbons */}
        {links.map((l, i) => {
          const s = pos[l.source], t = pos[l.target];
          if (!s || !t) return null;
          const th = Math.max((l.value || 0) * scale, 1);
          const sx = s.x + nodeWidth, tx = t.x;
          const sTop = sTopY[i], tTop = tTopY[i];
          if (sTop == null || tTop == null) return null;
          const mx = (sx + tx) / 2;
          const d = `M ${sx.toFixed(1)} ${sTop.toFixed(1)}`
            + ` C ${mx.toFixed(1)} ${sTop.toFixed(1)} ${mx.toFixed(1)} ${tTop.toFixed(1)} ${tx.toFixed(1)} ${tTop.toFixed(1)}`
            + ` L ${tx.toFixed(1)} ${(tTop + th).toFixed(1)}`
            + ` C ${mx.toFixed(1)} ${(tTop + th).toFixed(1)} ${mx.toFixed(1)} ${(sTop + th).toFixed(1)} ${sx.toFixed(1)} ${(sTop + th).toFixed(1)} Z`;
          const active = hover === i;
          return (
            <path
              key={i}
              d={d}
              fill={`url(#${uid}g${idxOf[l.source]})`}
              fillOpacity={active ? 1 : 0.9}
              stroke={s.color}
              strokeOpacity={active ? 0.6 : 0}
              strokeWidth="1.25"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ transition: "fill-opacity 160ms var(--ease-standard), stroke-opacity 160ms var(--ease-standard)" }}
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const p = pos[n.id]; if (!p) return null;
          return <rect key={n.id} x={p.x} y={p.y} width={nodeWidth} height={p.h} rx="3" fill={p.color} />;
        })}

        {/* labels */}
        {nodes.map((n) => {
          const p = pos[n.id]; if (!p) return null;
          const center = p.y + p.h / 2;
          const isLeft = p.col === 0;
          const isRight = p.col === maxCol && maxCol !== 0;
          let x, anchor, ly;
          if (isRight) { x = p.x + nodeWidth + 9; anchor = "start"; ly = center + 4; }
          else if (isLeft) { x = p.x - 9; anchor = "end"; ly = center + 4; }
          else { x = p.x + nodeWidth / 2; anchor = "middle"; ly = p.y - 8; }
          return (
            <text key={n.id} x={x} y={ly} textAnchor={anchor} fontFamily="var(--font-sans)" fontSize="12.5" fontWeight="var(--fw-semibold)" fill="var(--text-primary)">
              {n.label}
              <tspan dx="6" fontWeight="var(--fw-medium)" fill="var(--text-muted)" style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(nodeValue(n.id))}</tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}
