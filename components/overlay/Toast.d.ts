import React from "react";
export interface ToastProps {
  /** @default "info" */
  tone?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}
/**
 * Single transient notification card with a tonal status dot. Announced as a
 * polite live region (`role="status"`); the danger tone announces assertively
 * (`role="alert"`).
 */
export function Toast(props: ToastProps): JSX.Element;
