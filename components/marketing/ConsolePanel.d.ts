import React from "react";
export interface ConsolePanelLine {
  /** The leading verb, rendered semibold ("checked", "traced", "flagged"). */
  verb: string;
  /** The rest of the line, plain mono. */
  text: string;
  /** Tone of the verb: neutral (default) · info (periwinkle) · brand (orange) · success. */
  tone?: "neutral" | "info" | "brand" | "success";
}
export interface ConsolePanelProps {
  /** Uppercase prefix of the sources header, e.g. "connected". */
  connectedLabel?: string;
  /** Connected source names for the header line; empty hides the header. */
  connected?: string[];
  /** The evidence transcript, one prompt-prefixed mono line each. */
  transcript?: ConsolePanelLine[];
  /** Closing status line, e.g. "brief ready :: 3 decisions, ranked by impact". */
  readyLine?: string;
  /** Blinking phosphor cursor after the ready line. Budget: the ONE phosphor element of the view. */
  cursor?: boolean;
  /** Accessible name for the panel. */
  label?: string;
  style?: React.CSSProperties;
}
/**
 * The console evidence pane from the terminal-dev absorption: Alfred showing
 * its work as prompt-prefixed mono lines in a soft-cornered card. No window
 * chrome, no scanlines — the instrument layer, not a costume.
 * @startingPoint section="Marketing" subtitle="Prompt-line evidence pane with phosphor cursor" viewport="640x300"
 */
export function ConsolePanel(props: ConsolePanelProps): JSX.Element;
