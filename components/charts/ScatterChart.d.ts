import React from "react";

/** A single plotted point. */
export interface ScatterPoint {
  x: number;
  y: number;
  label?: React.ReactNode;
  /** Overrides the palette color for this point. */
  color?: string;
  /** Circle radius in px. @default 6 */
  r?: number;
}
export interface ScatterChartProps {
  /** @default [] */
  points?: ScatterPoint[];
  /** x-axis title along the bottom. */
  xLabel?: React.ReactNode;
  /** y-axis title, rotated up the left. */
  yLabel?: React.ReactNode;
  /** @default 260 */
  height?: number;
  /** Force the x-axis maximum; defaults to a nice rounded max. */
  xMax?: number;
  /** Force the y-axis maximum; defaults to a nice rounded max. */
  yMax?: number;
  /** Formats x-axis tick labels. */
  valueFormatX?: (value: number) => React.ReactNode;
  /** Formats y-axis tick labels. */
  valueFormatY?: (value: number) => React.ReactNode;
  style?: React.CSSProperties;
}
/** An x/y scatter for two-variable comparison (e.g. spend vs ROAS by campaign). */
export function ScatterChart(props: ScatterChartProps): JSX.Element;
