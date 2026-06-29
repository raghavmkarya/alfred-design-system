import React from "react";
/**
 * The "Seek Alfred" prompt box — auto-growing input with a gradient focus ring,
 * a toolbar, a send button with the brand glow, and optional starter-prompt chips.
 * @startingPoint section="Conversation" subtitle="The Seek Alfred prompt box" viewport="700x260"
 */
export interface SeekComposerProps {
  /** Controlled text value. Pair with `onChange`; omit for uncontrolled use. */
  value?: string;
  /** Native textarea change handler (controlled mode). */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Fires with the trimmed text when the user sends (Enter or the send button). */
  onSubmit?: (text: string) => void;
  placeholder?: string;
  /** Starter-prompt strings shown as chips beneath the box. */
  suggestions?: string[];
  /** Quiet model pill label. @default "Alfred 4.8" */
  model?: string;
  /** @default false */
  disabled?: boolean;
  /** Shows a spinner in place of the send glyph. @default false */
  busy?: boolean;
  style?: React.CSSProperties;
}
/**
 * The "Seek Alfred" prompt box — the product's primary conversational surface.
 */
export function SeekComposer(props: SeekComposerProps): JSX.Element;
