import React from "react";
/**
 * Multi-line text field — the Input's sibling, with peach/plain fill, the orange focus
 * ring, an optional character counter and error text.
 * @startingPoint section="Core" subtitle="Multi-line text field" viewport="700x220"
 */
export interface TextareaProps {
  label?: string;
  placeholder?: string;
  /** Controlled value. Pair with `onChange`; omit for uncontrolled use. */
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** @default 4 */
  rows?: number;
  /** @default "plain" */
  fill?: "plain" | "tint";
  maxLength?: number;
  /** Show a "count / maxLength" counter (requires maxLength). @default false */
  showCount?: boolean;
  error?: string;
  /** @default false */
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
/**
 * Multi-line text field for notes, prompts and longer answers.
 * Forwards its ref to the inner `<textarea>` element.
 */
export const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
