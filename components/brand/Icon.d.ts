import React from "react";

export interface IconProps {
  /** Glyph file stem in /assets/icons (e.g. "trend-up", "refresh", "close"). */
  name: string;
  /** Pixel box. @default 20 */
  size?: number;
  /** Any CSS color; the glyph is a tintable mask. @default "currentColor" */
  color?: string;
  /** Path to the icons folder relative to the host page. @default "assets/icons" */
  root?: string;
  title?: string;
  style?: React.CSSProperties;
}

/**
 * Brand icon glyph rendered as a tintable CSS mask. Available names include
 * trend-up/down/flat, refresh, sort, export, delete, close, bookmark, pin,
 * fullscreen, budget, mql, channel-mix, security-lock, gdpr, read-only,
 * audit-log, alert-warning, locked-feature, step-locked, integration-success,
 * web-clarity, web-stack-connected, cta-arrow, pricing-cross, demo-play.
 */
export function Icon(props: IconProps): JSX.Element;
