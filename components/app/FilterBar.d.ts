import React from "react";

export type FilterBarFilterType = "segmented" | "select" | "chip";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterBarFilter {
  /** Identifier passed back to onChange. */
  id: string;
  /** Which house control renders for this filter. */
  type: FilterBarFilterType;
  /** Eyebrow label before the control (hidden for single toggle chips). */
  label?: string;
  /**
   * Current value — a string for "segmented"/"select" and single-select chip
   * groups, a boolean for a toggle chip, or null when cleared.
   */
  value?: string | boolean | null;
  /** Options for "segmented", "select", or a single-select chip group. */
  options?: FilterOption[];
  /** Placeholder for the "select" control. @default "All" */
  placeholder?: string;
  /** Width of the "select" control. @default 180 */
  width?: number | string;
}

/**
 * A horizontal analytics filter bar that renders a house control per filter and
 * pins an optional node to the far right.
 */
export interface FilterBarProps {
  /** @default [] */
  filters?: FilterBarFilter[];
  /** Fires with (filter id, next value) on any change. */
  onChange?: (id: string, value: any) => void;
  /** Node pinned to the far right, e.g. an export button. */
  right?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Horizontal analytics filter bar composing segmented / select / chip controls.
 */
export function FilterBar(props: FilterBarProps): JSX.Element;
