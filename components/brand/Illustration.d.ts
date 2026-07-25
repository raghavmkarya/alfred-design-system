import React from "react";

export type IllustrationName =
  | "empty"
  | "no-results"
  | "error"
  | "success"
  | "connecting"
  | "first-run";

/**
 * Scene art for Alfred's state moments. Drawn inline in semantic tokens so one
 * composition reads correctly on light, app-dark and marketing-dark.
 *
 * @startingPoint section="Brand" subtitle="Scene art — empty, no results, error, success, connecting, first run" viewport="720x260"
 */
export interface IllustrationProps {
  /** Which scene to draw. @default "empty" */
  name?: IllustrationName;
  /** Width in px; height follows the 3:2 frame. @default 200 */
  size?: number;
  /** Accessible name. Defaults to the scene name. */
  title?: string;
  style?: React.CSSProperties;
}
/** Flat, geometric, theme-aware scene illustration. */
export function Illustration(props: IllustrationProps): JSX.Element;
