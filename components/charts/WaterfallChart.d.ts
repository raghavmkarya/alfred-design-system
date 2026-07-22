import React from "react";

export type WaterfallItemType = "start" | "end";
/** One step in the waterfall. */
export interface WaterfallItem {
  label?: React.ReactNode;
  value: number;
  /** "start"/"end" draw an absolute total from the baseline; omit for a floating delta. */
  type?: WaterfallItemType;
  /** Overrides the auto-assigned bar color (ink for totals, green up, red down). */
  color?: string;
}
export interface WaterfallChartProps {
  /** @default [] */
  items?: WaterfallItem[];
  /** @default 240 */
  height?: number;
  /** Formats y-axis ticks and value labels (e.g. v => "$" + v + "K"). */
  valueFormat?: (value: number) => React.ReactNode;
  style?: React.CSSProperties;
}
/** Shows how a total is built from running increments / decrements. */
export function WaterfallChart(props: WaterfallChartProps): JSX.Element;
