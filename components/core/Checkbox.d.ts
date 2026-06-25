import React from "react";
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
/** Square checkbox; fills with brand orange and a white tick when selected. */
export function Checkbox(props: CheckboxProps): JSX.Element;
