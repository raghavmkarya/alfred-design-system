import React from "react";

export type ConfidenceMeterSize = "sm" | "md" | "lg";

/**
 * A graded confidence bar for Alfred's Causal Confidence Score / calibration.
 * A pill track carries the full danger → warning → success spectrum, dimmed
 * past the value, with a slim thumb at the mark. Reads "<n>% confident" plus a
 * tone word (low / moderate / high) derived from thresholds.
 */
export interface ConfidenceMeterProps {
  /** Confidence percentage; clamped and rounded to 0–100. @default 0 */
  value?: number;
  /** Label shown to the left of the value; hidden when empty. @default "Confidence" */
  label?: string;
  /** Show the trailing "<n>% confident" readout. @default true */
  showValue?: boolean;
  /** Track and typography scale. @default "md" */
  size?: ConfidenceMeterSize;
  style?: React.CSSProperties;
}

/**
 * Graded danger → success confidence bar with a tone word derived from the value.
 */
export function ConfidenceMeter(props: ConfidenceMeterProps): JSX.Element;
