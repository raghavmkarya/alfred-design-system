import React from "react";

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** "tint" = peach fill (auth screens), "plain" = white with border (app). @default "tint" */
  fill?: "tint" | "plain";
  /** Element rendered at the right edge (e.g. a reveal toggle). */
  trailing?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Labelled text field. Peach-tinted fill is the signature auth treatment;
 * use the plain (white, bordered) fill inside the app shell. Focus draws the
 * warm orange ring. Forwards its ref to the inner `<input>` element.
 */
export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
