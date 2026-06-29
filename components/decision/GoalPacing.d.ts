import React from "react";
/**
 * Pacing toward a target — a gradient attainment bar with an on-pace marker, a verdict
 * (ahead / on track / behind) and Alfred's projected landing at the current run-rate.
 * @startingPoint section="Decision" subtitle="Goal pacing with projected landing" viewport="700x260"
 */
export interface GoalPacingProps {
  label?: string;
  /** Current attainment (same unit as target). */
  value?: number;
  target?: number;
  /** Fraction of the period elapsed, 0–1. @default 0.62 */
  elapsed?: number;
  /** Formats value/target/projection. @default "${n}M" */
  format?: (n: number) => React.ReactNode;
  /** Caption under the bar, e.g. "Q3 · 62% elapsed". */
  period?: string;
  /** Explicit projected landing; defaults to value / elapsed. */
  projected?: number;
  style?: React.CSSProperties;
}
/**
 * Are you on track to hit the number? — attainment, pacing verdict and projection.
 */
export function GoalPacing(props: GoalPacingProps): JSX.Element;
