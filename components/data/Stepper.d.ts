import React from "react";
export interface Step { label: React.ReactNode; }
export interface StepperProps {
  steps: Step[];
  /** Active index, 0-based. Earlier steps render as done. @default 0 */
  current?: number;
  style?: React.CSSProperties;
}
/** Horizontal numbered progress for multi-step flows. */
export function Stepper(props: StepperProps): JSX.Element;
