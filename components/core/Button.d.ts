import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "subtle" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * The primary action control for Alfred AI. Solid orange for the main CTA;
 * periwinkle, outline, ghost and subtle for supporting actions.
 *
 * @startingPoint section="Core" subtitle="Brand button — primary / secondary / outline / ghost" viewport="700x200"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. `primary` = solid orange (default CTA). @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * The primary action control for Alfred AI. Solid orange for the main CTA;
 * periwinkle, outline, ghost and subtle for supporting actions.
 */
export function Button(props: ButtonProps): JSX.Element;
