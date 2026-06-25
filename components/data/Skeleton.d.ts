import React from "react";
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  /** Number of bars; the last is shortened when > 1. @default 1 */
  lines?: number;
  style?: React.CSSProperties;
}
/** Theme-aware shimmer placeholder for loading states. */
export function Skeleton(props: SkeletonProps): JSX.Element;
