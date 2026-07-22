import React from "react";
export interface HeatmapProps {
  /** Row labels (left). @default [] */
  rows?: React.ReactNode[];
  /** Column labels (top). @default [] */
  cols?: React.ReactNode[];
  /** rows×cols grid of numeric intensities; sparse cells may be null/undefined. @default [] */
  values?: number[][];
  /** Scale ceiling for full-orange cells; defaults to the data max. */
  maxValue?: number;
  /** Formats the printed cell value. */
  valueFormat?: (value: number) => React.ReactNode;
  /** Show the intensity legend strip. @default true */
  legend?: boolean;
  style?: React.CSSProperties;
}
/** A matrix heatmap tinting cells from faint peach (low) to full brand orange (high). */
export function Heatmap(props: HeatmapProps): JSX.Element;
