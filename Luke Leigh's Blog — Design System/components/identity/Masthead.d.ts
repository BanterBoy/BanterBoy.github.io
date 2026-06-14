import * as React from "react";

type NavItem = string | { label: string; href?: string };

/**
 * Site header: logo + title/subtitle lockup and primary nav.
 *
 * @startingPoint section="Identity" subtitle="Site masthead with nav" viewport="1000x90"
 */
export interface MastheadProps {
  /** Logo image URL (the PowerShell mark). */
  logo?: string;
  title?: string;
  subtitle?: string;
  items?: NavItem[];
  /** Label of the active nav item (rendered in teal). */
  current?: string;
  style?: React.CSSProperties;
}

export function Masthead(props: MastheadProps): JSX.Element;
