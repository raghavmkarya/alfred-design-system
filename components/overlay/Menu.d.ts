import React from "react";
export interface MenuItem {
  label?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  divider?: boolean;
}
export interface MenuProps {
  items: MenuItem[];
  style?: React.CSSProperties;
}
/** Vertical action list, typically rendered inside a Popover. */
export function Menu(props: MenuProps): JSX.Element;
