import React from "react";
/**
 * Multi-value tag field — type, press enter (or comma) and each entry becomes
 * a removable Chip. For audiences, channels and keyword lists; optional
 * suggestion dropdown filtered by the current text, max count and duplicate
 * guard. Backspace on an empty field removes the last tag.
 * @startingPoint section="Core" subtitle="Multi-value tag field with suggestions" viewport="700x260"
 */
export interface TagInputProps {
  label?: string;
  /** Committed tags (controlled). */
  value?: string[];
  /** Called with the next tag array on add / remove. */
  onChange?: (next: string[]) => void;
  /** @default "Add and press enter" */
  placeholder?: string;
  /** Optional pool shown as a dropdown under the field, filtered by the current text. */
  suggestions?: string[];
  /** Refuse new tags beyond this count. */
  maxTags?: number;
  /** @default false */
  disabled?: boolean;
  /** Allow the same tag twice (otherwise a case-insensitive guard applies). @default false */
  allowDuplicates?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
/**
 * Multi-value tag field — enter or comma commits a Chip; backspace on an empty
 * field removes the last tag. Ref forwards to the inner input.
 */
export const TagInput: React.ForwardRefExoticComponent<TagInputProps & React.RefAttributes<HTMLInputElement>>;
