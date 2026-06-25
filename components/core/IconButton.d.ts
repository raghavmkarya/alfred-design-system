import React from "react";
export interface IconButtonProps {
  /** Brand icon name (see Icon). */
  name: string;
  size?: number;
  iconSize?: number;
  /** @default "ghost" */
  variant?: "ghost" | "subtle" | "solid" | "outline";
  /** @default "rounded" */
  shape?: "rounded" | "circle";
  iconRoot?: string;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
/** Square or circular button wrapping one brand Icon — for toolbars, cards and headers. */
export function IconButton(props: IconButtonProps): JSX.Element;
