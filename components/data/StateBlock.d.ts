import React from "react";

export type StateBlockKind = "empty" | "error" | "loading";

export interface StateBlockAction {
  label: string;
  onClick?: () => void;
}

/**
 * Unified empty / error / loading block for any surface — panels, tables, cards
 * or full views. `loading` composes the Spinner inside a polite status region,
 * `error` renders an assertive alert with danger accents and a retry action,
 * `empty` stays neutral with a next-step action. Copy defaults speak in
 * Alfred's first person.
 *
 * @startingPoint section="Data" subtitle="Unified empty / error / loading block" viewport="720x300"
 */
export interface StateBlockProps {
  /** Which state to render. @default "empty" */
  kind?: StateBlockKind;
  /** Heading; falls back to a first-person default per kind. */
  title?: string;
  /** One supporting line; falls back to a first-person default per kind. Pass "" to omit. */
  body?: string;
  /** Optional next-step (empty) or retry (error) action, rendered as the primary orange button. */
  action?: StateBlockAction;
  /** Custom glyph node; defaults to a line-style tray (empty) or alert triangle (error). */
  icon?: React.ReactNode;
  /** Tighter paddings and smaller type for cards and table bodies. @default false */
  compact?: boolean;
  style?: React.CSSProperties;
}

/**
 * Unified empty / error / loading block for any surface.
 */
export function StateBlock(props: StateBlockProps): JSX.Element;
