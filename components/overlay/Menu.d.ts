import React from "react";
export interface MenuItem {
  label?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  /** Skipped by keyboard navigation and not clickable. */
  disabled?: boolean;
  divider?: boolean;
}
export interface MenuProps {
  items: MenuItem[];
  style?: React.CSSProperties;
}
/**
 * Vertical action list, typically rendered inside a Popover.
 * Keyboard operable: ArrowUp/ArrowDown move (roving tabindex), Home/End jump,
 * typing a label prefix focuses the next match, Enter/Space activate.
 */
export function Menu(props: MenuProps): JSX.Element;
