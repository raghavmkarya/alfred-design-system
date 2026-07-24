import React from "react";
export interface LineChartProps {
  points: number[];
  /** X-axis labels, spread start→end. */
  labels?: React.ReactNode[];
  height?: number;
  /** Overrides the auto-derived text alternative (WCAG 1.1.1). */
  ariaLabel?: string;
  style?: React.CSSProperties;
}
/** Labelled trend line (sparkline + x-axis labels) for performance over time. */
export function LineChart(props: LineChartProps): JSX.Element;
