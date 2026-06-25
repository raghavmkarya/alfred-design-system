import React from "react";
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: React.CSSProperties;
}
/** Pill toggle switch; track fills orange when on, knob slides with a slight overshoot. */
export function Switch(props: SwitchProps): JSX.Element;
