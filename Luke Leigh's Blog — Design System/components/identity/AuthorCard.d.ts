import * as React from "react";

interface SocialLink {
  label: string;
  /** Font Awesome class, e.g. "fab fa-github". */
  icon: string;
  url?: string;
}

/**
 * Sidebar author profile: avatar, name, bio, location, social links.
 *
 * @startingPoint section="Identity" subtitle="Author profile sidebar" viewport="280x320"
 */
export interface AuthorCardProps {
  avatar?: string;
  name?: string;
  bio?: string;
  location?: string;
  links?: SocialLink[];
  style?: React.CSSProperties;
}

export function AuthorCard(props: AuthorCardProps): JSX.Element;
