import React from "react";
export interface BannerProps {
  /** @default "info" */
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  /** Show a trailing × that calls this. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
/** Inline tonal message bar with a leading icon and colored rail. */
export function Banner(props: BannerProps): JSX.Element;
