import React from "react";
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Action row, usually Buttons. */
  footer?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}
/** Centered dialog over a dimmed, blurred backdrop. Controlled via `open`. */
export function Modal(props: ModalProps): JSX.Element | null;
