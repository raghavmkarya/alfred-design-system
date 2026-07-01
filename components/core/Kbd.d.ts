import React from "react";

export type KbdSize = "sm" | "md";

/**
 * Keyboard key cap for shortcut hints — a sunken chip with a 2px bottom edge
 * for key depth. Pairs with CommandPalette footers and menu shortcuts.
 *
 * @startingPoint section="Core" subtitle="Keyboard key caps for shortcut hints" viewport="700x200"
 */
export interface KbdProps {
  children?: React.ReactNode;
  /** @default "sm" */
  size?: KbdSize;
  style?: React.CSSProperties;
}

/**
 * Keyboard key cap for shortcut hints — a sunken chip with a 2px bottom edge
 * for key depth.
 */
export function Kbd(props: KbdProps): JSX.Element;
