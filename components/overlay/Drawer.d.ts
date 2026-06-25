import React from "react";
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  /** @default "right" */
  side?: "right" | "left";
  title?: React.ReactNode;
  children?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}
/** Side panel that slides in over a dimmed backdrop. Controlled via `open`. */
export function Drawer(props: DrawerProps): JSX.Element | null;
