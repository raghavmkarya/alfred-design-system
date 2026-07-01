import React from "react";
export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: React.ReactNode;
  showValue?: boolean;
  style?: React.CSSProperties;
}
/**
 * Single-value range control with orange fill + thumb (native input).
 * The track shows the warm focus ring on keyboard focus; `aria-label` falls back
 * to the label prop. Extra props are spread onto the native range input.
 */
export function Slider(props: SliderProps): JSX.Element;
