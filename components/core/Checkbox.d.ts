import React from "react";
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
/**
 * Square checkbox; fills with brand orange and a white tick when selected.
 * A hidden native checkbox sits over the box, so Space toggles it and the box
 * shows the warm focus ring on keyboard focus. The label stays clickable.
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
