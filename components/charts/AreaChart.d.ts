import React from "react";
export interface AreaSeries {
  name?: string;
  color?: string;
  points: number[];
}
export interface AreaChartProps {
  series: AreaSeries[];
  /** Axis labels aligned to the point index; also sets the point count. */
  labels?: React.ReactNode[];
  /** @default 220 */
  height?: number;
  /** Number of y-axis gridline ticks. @default 4 */
  yTicks?: number;
  /** Formats the y-axis tick values. @default niceRound */
  valueFormat?: (value: number) => React.ReactNode;
  /** Fill the area under each line with a gradient. @default true */
  fill?: boolean;
  style?: React.CSSProperties;
}
/** Multi-series area/line trend with gridlines, axis labels, and an inline legend. */
export function AreaChart(props: AreaChartProps): JSX.Element;
