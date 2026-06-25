import React from "react";
export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange?: (page: number) => void;
  style?: React.CSSProperties;
}
/** Page navigator — prev/next chevrons + windowed page list. Controlled. */
export function Pagination(props: PaginationProps): JSX.Element;
