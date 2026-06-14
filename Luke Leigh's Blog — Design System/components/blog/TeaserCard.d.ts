import * as React from "react";

/**
 * Archive list item: rounded teaser image, linked title, meta row, excerpt.
 *
 * @startingPoint section="Blog" subtitle="Post teaser card for archive lists" viewport="700x420"
 */
export interface TeaserCardProps {
  title: React.ReactNode;
  href?: string;
  /** Teaser image URL. Omit for a text-only teaser. */
  image?: string;
  excerpt?: React.ReactNode;
  date?: string;
  readTime?: string;
  category?: string;
  style?: React.CSSProperties;
}

export function TeaserCard(props: TeaserCardProps): JSX.Element;
