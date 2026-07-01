import React from "react";

export type DividerOrientation = "horizontal" | "vertical";

/**
 * Quiet 1px separator. Horizontal by default with an optional centred eyebrow
 * label; vertical stretches inside flex rows.
 *
 * @startingPoint section="Core" subtitle="Separator — plain and labelled" viewport="700x200"
 */
export interface DividerProps {
  /** @default "horizontal" */
  orientation?: DividerOrientation;
  /** Centred uppercase eyebrow label (horizontal only). */
  label?: React.ReactNode;
  /** Margin above/below (horizontal) or left/right (vertical), in px. @default 16 */
  spacing?: number;
  style?: React.CSSProperties;
}

/**
 * Quiet 1px separator with an optional centred eyebrow label.
 */
export function Divider(props: DividerProps): JSX.Element;
