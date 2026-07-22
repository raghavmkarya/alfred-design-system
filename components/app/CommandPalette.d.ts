import React from "react";

export interface CommandPaletteItem {
  label: string;
  /** Small trailing pill, e.g. "diagnose" — shown on suggestion/recent rows, never the Ask row. */
  hint?: string;
  /** Leading glyph; falls back to the gradient sparkle mark. */
  icon?: React.ReactNode;
}

/**
 * The flagship "Seek Alfred" surface: an elevated rounded panel with a
 * controlled ask/search field, a primary Ask affordance, and selectable
 * suggestion rows grouped under a quiet eyebrow, plus an optional recent
 * section and footer hint. Keyboard-aware (Enter asks, ↑/↓ moves selection).
 */
export interface CommandPaletteProps {
  /** @default "Ask Alfred or search anything…" */
  placeholder?: string;
  /** Suggestion rows; falls back to a built-in default set when empty. @default [] */
  suggestions?: CommandPaletteItem[];
  /** Controlled input value; when omitted the field manages its own state. */
  value?: string;
  /** Mirrors the input value on each keystroke, like a search box. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Fires on Enter, the Ask button, or a row click, with the trimmed query. */
  onSubmit?: (query: string) => void;
  /** Footer node; pass a custom node to replace the default hint, or null to hide it. */
  footer?: React.ReactNode;
  /** Recent-query rows; bare strings are treated as { label }. */
  recent?: Array<string | CommandPaletteItem>;
  style?: React.CSSProperties;
}

/**
 * The flagship "Seek Alfred" command palette with ask/search, suggestions and recents.
 */
export function CommandPalette(props: CommandPaletteProps): JSX.Element;
