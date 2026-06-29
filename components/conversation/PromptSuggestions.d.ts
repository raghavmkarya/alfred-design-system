import React from "react";
/**
 * Tappable starter prompts in Alfred's voice — the Seek Alfred empty-state nudge.
 * Spark-marked pills (wrapping) or full-width rows (list).
 * @startingPoint section="Conversation" subtitle="Starter prompt chips" viewport="700x220"
 */
export interface PromptSuggestionsProps {
  /** Plain strings or `{ label, hint }` items. */
  suggestions?: Array<string | { label: string; hint?: string }>;
  /** Called with the chosen prompt's label. */
  onSelect?: (prompt: string) => void;
  /** Uppercase eyebrow above the prompts. @default "Try asking" */
  title?: string;
  /** @default "wrap" */
  layout?: "wrap" | "list";
  style?: React.CSSProperties;
}
/**
 * Tappable starter prompts in Alfred's first-person voice.
 */
export function PromptSuggestions(props: PromptSuggestionsProps): JSX.Element;
