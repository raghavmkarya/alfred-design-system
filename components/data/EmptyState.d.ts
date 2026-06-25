import React from "react";
export interface EmptyStateProps {
  title: string;
  body?: string;
  /** Optional action node, e.g. a <Button>. */
  action?: React.ReactNode;
  /** Custom glyph node; defaults to a search mark. */
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Centered placeholder for empty lists, zero results and unconnected surfaces. */
export function EmptyState(props: EmptyStateProps): JSX.Element;
