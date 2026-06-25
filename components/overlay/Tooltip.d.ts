import React from "react";
export interface TooltipProps {
  label: React.ReactNode;
  /** @default "top" */
  placement?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Wraps a trigger and reveals a small ink label on hover/focus. */
export function Tooltip(props: TooltipProps): JSX.Element;
