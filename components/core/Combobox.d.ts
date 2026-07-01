import React from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  /** Right-aligned muted hint, e.g. "channel". */
  hint?: string;
}

/**
 * Type-ahead input with a filtered listbox (ARIA 1.2 combobox). Typing filters
 * options by label; arrows move the active option, Enter picks it, Escape
 * closes. Forwards its ref to the input.
 *
 * @startingPoint section="Core" subtitle="Type-ahead field with filtered options" viewport="700x360"
 */
export interface ComboboxProps {
  label?: string;
  /** @default "Search…" */
  placeholder?: string;
  options: ComboboxOption[];
  /** Selected option value. */
  value?: string;
  /** Fires with the picked option's value. */
  onChange?: (value: string) => void;
  /** Fires with the raw input text as the user types. */
  onInputChange?: (text: string) => void;
  disabled?: boolean;
  /** Shown when nothing matches the query. @default "No matches" */
  emptyText?: string;
  /** Rows visible before the list scrolls. @default 7 */
  maxVisible?: number;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Type-ahead input with a filtered listbox (ARIA 1.2 combobox). Forwards its
 * ref to the input.
 */
export const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLInputElement>>;
