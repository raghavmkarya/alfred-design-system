import React from "react";
export interface RadioOption { value: string; label: React.ReactNode; }
export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  style?: React.CSSProperties;
}
/** Vertical single-choice group; selected dot fills brand orange. Controlled. */
export function RadioGroup(props: RadioGroupProps): JSX.Element;
