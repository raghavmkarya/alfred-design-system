import React from "react";
/**
 * Search field with a leading magnifier, a clear button, an optional loading spinner and
 * a results dropdown that opens on focus.
 * @startingPoint section="Core" subtitle="Search field with results" viewport="700x320"
 */
export interface SearchResult {
  label: string;
  /** Trailing uppercase hint, e.g. "diagnose". */
  hint?: string;
}
export interface SearchInputProps {
  /** Controlled value. Pair with `onChange`; omit for uncontrolled use. */
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Fires with the query on Enter. */
  onSubmit?: (query: string) => void;
  /** Fires with a result's label when picked. */
  onSelect?: (label: string) => void;
  placeholder?: string;
  /** Plain strings or `{ label, hint }` items. */
  results?: Array<string | SearchResult>;
  /** Show a spinner instead of the clear button. @default false */
  loading?: boolean;
  /** Force the dropdown open; otherwise opens on focus. */
  open?: boolean;
  /** @default "plain" */
  fill?: "plain" | "tint";
  style?: React.CSSProperties;
}
/**
 * A search field with a clear affordance and a focus-triggered results dropdown.
 */
export function SearchInput(props: SearchInputProps): JSX.Element;
