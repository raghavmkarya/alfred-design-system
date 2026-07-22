import React from "react";

/** A node in the Sankey diagram; `col` is its 0-based column index (left→right). */
export interface SankeyNode {
  /** Unique id referenced by each link's `source` / `target`. */
  id: string;
  label: React.ReactNode;
  /** 0-based column index (left→right). @default 0 */
  col?: number;
}
/** A weighted flow between two nodes, referencing their `id`s. */
export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}
export interface SankeyChartProps {
  /** @default [] */
  nodes?: SankeyNode[];
  /** @default [] */
  links?: SankeyLink[];
  /** @default 300 */
  height?: number;
  /** Node rectangle width in px. @default 14 */
  nodeWidth?: number;
  /** Formats the throughput printed next to each node. @default v => Math.round(v) */
  valueFormat?: (value: number) => React.ReactNode;
  style?: React.CSSProperties;
}
/** Simplified left→right Sankey for attribution / cross-module signal routing. */
export function SankeyChart(props: SankeyChartProps): JSX.Element;
