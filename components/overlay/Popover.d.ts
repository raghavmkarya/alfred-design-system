import React from "react";
export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The clickable anchor element. */
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  /** @default "bottom" */
  placement?: "bottom" | "bottom-end" | "top";
  style?: React.CSSProperties;
}
/** Floating panel anchored to a trigger (host a Menu, form or detail). */
export function Popover(props: PopoverProps): JSX.Element;
