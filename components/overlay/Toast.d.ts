import React from "react";
export interface ToastProps {
  /** @default "info" */
  tone?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}
/** Single transient notification card with a tonal status dot. */
export function Toast(props: ToastProps): JSX.Element;
