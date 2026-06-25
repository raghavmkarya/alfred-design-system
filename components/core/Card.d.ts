import React from "react";
/**
 * Floating content surface — the building block for dashboards, panels and modals.
 * @startingPoint section="Core" subtitle="Floating surface — surface / gradient / ink" viewport="700x260"
 */
export interface CardProps {
  children?: React.ReactNode;
  /** surface (white) · sunken (canvas) · gradient (brand) · ink (near-black). @default "surface" */
  tone?: "surface" | "sunken" | "gradient" | "ink";
  padding?: number | string;
  radius?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  /** Lift + deepen shadow on hover. @default false */
  interactive?: boolean;
  style?: React.CSSProperties;
}
/**
 * Floating content surface — the building block for dashboards, panels and modals.
 */
export function Card(props: CardProps): JSX.Element;
