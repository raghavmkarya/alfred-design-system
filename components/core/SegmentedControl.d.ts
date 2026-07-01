import React from "react";
export interface SegmentOption { value: string; label: React.ReactNode; }
export interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}
/**
 * Pill-track segmented switch; active segment fills orange. Controlled.
 * Radiogroup semantics with a roving tabindex: ArrowRight/ArrowDown select the
 * next segment, ArrowLeft/ArrowUp the previous (wrapping).
 */
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
