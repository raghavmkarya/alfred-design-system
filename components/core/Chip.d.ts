import React from "react";
export interface ChipProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  tone?: "neutral" | "brand" | "info" | "success" | "warning" | "danger";
  /** Solid orange selected state. @default false */
  selected?: boolean;
  /** Show a trailing × that calls this. */
  onRemove?: () => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}
/** Compact filter / tag pill — tonal, selectable, optionally removable. */
export function Chip(props: ChipProps): JSX.Element;
