import React from "react";
export interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
  /** Fallback fill behind initials. "auto" hashes the name onto a muted tint palette so people lists stay diverse and quiet; the fixed tones carry the brand. @default "auto" */
  tone?: "auto" | "gradient" | "ink" | "periwinkle";
  style?: React.CSSProperties;
}
/** Round avatar — image when `src` is set, otherwise brand-gradient initials. */
export function Avatar(props: AvatarProps): JSX.Element;
