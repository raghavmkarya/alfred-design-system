import React from "react";
export interface ProgressBarProps {
  /** 0–100. */
  value?: number;
  height?: number;
  /** gradient (brand) or plain (solid orange). @default "gradient" */
  tone?: "gradient" | "plain";
  showTrack?: boolean;
  style?: React.CSSProperties;
}
/** Signature periwinkle→orange progress track for onboarding, pacing and load states. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
