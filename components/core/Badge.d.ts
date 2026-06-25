import React from "react";
export type BadgeTone = "neutral" | "brand" | "info" | "success" | "warning" | "danger";
export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  tone?: BadgeTone;
  /** Show a leading status dot. @default false */
  dot?: boolean;
  style?: React.CSSProperties;
}
/** Compact status pill for labels, states and counts. */
export function Badge(props: BadgeProps): JSX.Element;
