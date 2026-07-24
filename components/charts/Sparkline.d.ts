import React from "react";
export interface SparklineProps {
  points: number[];
  width?: number;
  height?: number;
  stroke?: number;
  /** Render the soft area fill under the line. @default true */
  fill?: boolean;
  /** Overrides the auto-derived text alternative (WCAG 1.1.1). */
  ariaLabel?: string;
  style?: React.CSSProperties;
}
/** Compact gradient trend line; stretches to its container. */
export function Sparkline(props: SparklineProps): JSX.Element;
