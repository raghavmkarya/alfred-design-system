import React from "react";
/**
 * Stepper numeric field for budget caps, thresholds and targets. − / + buttons
 * step the value within [min, max]; the centred value accepts typing and
 * commits on blur or enter, with an optional prefix ("$") and unit ("%", "K").
 * @startingPoint section="Core" subtitle="Stepper numeric field with − / + controls" viewport="700x180"
 */
export interface NumberInputProps {
  label?: string;
  /** Controlled numeric value. @default 0 */
  value?: number;
  /** Called with the next clamped number on step, enter or blur. */
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  /** @default 1 */
  step?: number;
  /** Muted suffix rendered after the value (e.g. "%" or "K"). */
  unit?: string;
  /** Muted prefix rendered before the value (e.g. "$"). */
  prefix?: string;
  /** @default "md" */
  size?: "md" | "sm";
  /** @default false */
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
/**
 * Stepper numeric field — typed input plus − / + buttons, clamped to [min, max].
 * Ref forwards to the inner input.
 */
export const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLInputElement>>;
