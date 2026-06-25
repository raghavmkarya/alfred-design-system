import React from "react";
export interface TableColumn {
  key: string;
  header: React.ReactNode;
  /** @default "left" — use "right" for numeric columns (enables tabular nums). */
  align?: "left" | "center" | "right";
  /** Custom cell renderer; receives (cellValue, row). */
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
}
export interface TableProps {
  columns: TableColumn[];
  rows: Record<string, any>[];
  /** Tighter row padding. @default false */
  dense?: boolean;
  style?: React.CSSProperties;
}
/** Lightweight data table — tracked header, hairline dividers, tabular numerals. */
export function Table(props: TableProps): JSX.Element;
