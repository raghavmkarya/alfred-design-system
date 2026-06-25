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
/** Single-value range control with orange fill + thumb (native input). */
export function Slider(props: SliderProps): JSX.Element;
