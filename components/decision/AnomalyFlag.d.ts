import React from "react";
/**
 * A small "Alfred flagged this" marker for any metric, row or chart — a pulsing dot
 * graded by severity, as a compact inline pill or a block row with detail and value.
 * @startingPoint section="Decision" subtitle="Anomaly flag marker" viewport="700x140"
 */
export interface AnomalyFlagProps {
  label?: string;
  /** Severity. @default "anomaly" */
  tone?: "watch" | "anomaly" | "critical";
  detail?: string;
  /** Trailing value, e.g. "−14%" (block layout). */
  value?: React.ReactNode;
  /** Render as a compact pill instead of a block row. @default false */
  inline?: boolean;
  style?: React.CSSProperties;
}
/**
 * A small, pulsing "Alfred flagged this" marker to pin on any metric or chart.
 */
export function AnomalyFlag(props: AnomalyFlagProps): JSX.Element;
