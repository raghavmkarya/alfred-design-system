import React from "react";

export type DataTableAlign = "left" | "right" | "center";
export type DataTableSortDir = "asc" | "desc";

export interface DataTableRow {
  /** Stable row identity; falls back to the row index when absent. */
  id?: string | number;
  [key: string]: any;
}

export interface DataTableColumn {
  /** Row field this column reads. */
  key: string;
  header?: React.ReactNode;
  /** "right" columns render in tabular numerals. @default "left" */
  align?: DataTableAlign;
  /** Custom cell renderer: (value, row) => node. */
  render?: (value: any, row: DataTableRow) => React.ReactNode;
  /** Set false to lock this one column when the table is sortable. @default true */
  sortable?: boolean;
}

export interface DataTableSort {
  key: string;
  /** @default "asc" */
  dir?: DataTableSortDir;
}

/**
 * A product data table with sortable headers, optional selection checkboxes and
 * optional client-side pagination via the composed Pagination control.
 */
export interface DataTableProps {
  /** @default [] */
  columns?: DataTableColumn[];
  /** @default [] */
  rows?: DataTableRow[];
  /** Enable header click-to-sort. @default true */
  sortable?: boolean;
  /** Initial sort column and direction. */
  initialSort?: DataTableSort;
  /** Rows per page; enables pagination when > 0. */
  pageSize?: number;
  /** Show a leading checkbox column with select-all. @default false */
  selectable?: boolean;
  style?: React.CSSProperties;
}

/**
 * A product data table with sortable headers, selection and pagination.
 */
export function DataTable(props: DataTableProps): JSX.Element;
