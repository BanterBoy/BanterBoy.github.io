import * as React from "react";

/** Muted byline row: date, read time, category. Mirrors `.page__meta`. */
export interface PageMetaProps {
  date?: string;
  readTime?: string;
  category?: string;
  /** Custom items instead of the date/readTime/category shortcuts. */
  items?: { icon?: string; text: React.ReactNode }[];
  style?: React.CSSProperties;
}

export function PageMeta(props: PageMetaProps): JSX.Element;
