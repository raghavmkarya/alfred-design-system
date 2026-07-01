import React from "react";
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: React.CSSProperties;
}
/**
 * Pill toggle switch; track fills orange when on, knob slides with a slight overshoot.
 * Renders a hidden native checkbox (role="switch") over the track, so Space toggles it
 * and the track shows the warm focus ring on keyboard focus.
 */
export function Switch(props: SwitchProps): JSX.Element;
