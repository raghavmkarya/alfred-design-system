import React from "react";
export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  /** "tint" = peach (auth) · "plain" = white/bordered (app). @default "plain" */
  fill?: "tint" | "plain";
  disabled?: boolean;
  error?: string;
  id?: string;
  style?: React.CSSProperties;
}
/**
 * Native dropdown styled to match Input — custom chevron, warm orange focus ring.
 * Forwards its ref to the inner `<select>` element.
 */
export const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
