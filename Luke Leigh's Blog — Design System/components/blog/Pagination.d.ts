import * as React from "react";

/** Previous/next pager with numbered pills. Mirrors `.pagination`. */
export interface PaginationProps {
  current?: number;
  total?: number;
  onPage?: (page: number) => void;
  style?: React.CSSProperties;
}

export function Pagination(props: PaginationProps): JSX.Element;
