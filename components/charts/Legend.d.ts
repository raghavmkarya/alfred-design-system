import React from "react";
export type LegendDirection = "row" | "column";
export interface LegendItem {
  label: React.ReactNode;
  color?: string;
  value?: React.ReactNode;
}
export interface LegendProps {
  items: LegendItem[];
  /** Layout direction. @default "row" */
  direction?: LegendDirection;
  /** Accessible name for the legend list. @default "Chart legend" */
  ariaLabel?: string;
  style?: React.CSSProperties;
}
/** Swatch + label key for any chart; row or column layout with optional right-aligned values. */
export function Legend(props: LegendProps): JSX.Element;
