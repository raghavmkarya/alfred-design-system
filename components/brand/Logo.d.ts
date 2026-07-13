import React from "react";

export type LogoVariant = "full" | "mark" | "wordmark";
export type LogoTone = "auto" | "color" | "white";

/**
 * Alfred ai brand lockup. Use the full lockup by default; the mark alone for
 * avatars / favicons / tight spaces; the white tone only on the orange or ink
 * brand surfaces.
 *
 * @startingPoint section="Brand" subtitle="Alfred ai logo — full / mark / wordmark" viewport="700x160"
 */
export interface LogoProps {
  /** full lockup, the gradient mark only, or the wordmark only. @default "full" */
  variant?: LogoVariant;
  /** "auto" follows the active theme (white lockup under dark scopes); force "color" or "white" when the surface, not the theme, decides. @default "auto" */
  tone?: LogoTone;
  /** Rendered height in px. @default 32 */
  height?: number;
  /** Path to the logos folder relative to the host page. @default "assets/logos" */
  root?: string;
  style?: React.CSSProperties;
}

/**
 * Alfred ai brand lockup. Use the full lockup by default; the mark alone for
 * avatars / favicons / tight spaces; the white tone only on the orange or ink
 * brand surfaces.
 */
export function Logo(props: LogoProps): JSX.Element;
