import * as React from "react";

/**
 * Bordered taxonomy pill for tags and categories.
 *
 * @startingPoint section="Labels" subtitle="Tag & badge pills" viewport="700x120"
 */
export interface TagProps {
  children?: React.ReactNode;
  /** Renders as an anchor when set. */
  href?: string;
  /** Font Awesome class, e.g. "fas fa-tag". */
  icon?: string;
  style?: React.CSSProperties;
}

export function Tag(props: TagProps): JSX.Element;
