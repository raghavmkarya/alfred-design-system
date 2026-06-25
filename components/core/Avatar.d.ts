import React from "react";
export interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
  /** Fallback fill behind initials. @default "gradient" */
  tone?: "gradient" | "ink" | "periwinkle";
  style?: React.CSSProperties;
}
/** Round avatar — image when `src` is set, otherwise brand-gradient initials. */
export function Avatar(props: AvatarProps): JSX.Element;
