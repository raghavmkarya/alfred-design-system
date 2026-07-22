import React from "react";

/** One category group; series values are keyed by the entries in `keys`. */
export interface StackedBarDatum {
  /** Category label shown under the group. */
  label?: React.ReactNode;
  /** Series values, keyed by the entries in `keys`. */
  [series: string]: number | React.ReactNode;
}
export interface StackedBarChartProps {
  /** @default [] */
  data?: StackedBarDatum[];
  /** Series keys to plot, in stack order (bottom → top). @default [] */
  keys?: string[];
  /** Per-index color overrides; falls back to the brand categorical palette. */
  colors?: string[];
  /** @default 220 */
  height?: number;
  /** Stack series within one bar; set false for grouped side-by-side bars. @default true */
  stacked?: boolean;
  /** Formats the y-axis ticks. */
  valueFormat?: (value: number) => React.ReactNode;
  style?: React.CSSProperties;
}
/** Vertical stacked or grouped bars for comparing several series across categories. */
export function StackedBarChart(props: StackedBarChartProps): JSX.Element;
