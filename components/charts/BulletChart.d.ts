import React from "react";
export interface BulletChartItem {
  label?: React.ReactNode;
  value: number;
  /** Draws a vertical target tick. */
  target?: number;
  /** Scales the row; defaults to the value/target headroom. */
  max?: number;
  /** [poorUpTo, okUpTo] — graded qualitative bands behind the measure bar. */
  ranges?: number[];
}
export interface BulletChartProps {
  items: BulletChartItem[];
  /** Formats the printed value and target. @default niceNum */
  valueFormat?: (value: number) => React.ReactNode;
  style?: React.CSSProperties;
}
/** Horizontal actual-vs-target bullet bars for KPI-vs-goal reads. */
export function BulletChart(props: BulletChartProps): JSX.Element;
