import React from "react";

export interface DateRangePreset {
  value: string;
  label: string;
}

/**
 * A preset date-range control: a connected segmented pill group (active preset
 * fills orange) with an optional resolved-range readout. Controlled via value.
 */
export interface DateRangePickerProps {
  /** Selected preset value; "custom" reveals the range readout. @default "30d" */
  value?: string;
  /** Preset pills; falls back to a built-in set (7d / 30d / Quarter / Custom). */
  presets?: DateRangePreset[];
  /** Fires with the chosen preset value. */
  onChange?: (value: string) => void;
  /** Resolved range text, e.g. "1 Apr – 30 Jun"; when set, the readout shows. @default "" */
  rangeLabel?: string;
  style?: React.CSSProperties;
}

/**
 * Preset date-range control with a segmented pill group and optional range readout.
 */
export function DateRangePicker(props: DateRangePickerProps): JSX.Element;
