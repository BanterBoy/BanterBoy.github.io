import * as React from "react";

/**
 * The theme's `.btn`: bold flat fill, 4px radius, optional Font Awesome icon.
 *
 * @startingPoint section="Buttons" subtitle="Branded button with variants & sizes" viewport="700x160"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Colour intent. @default "primary" */
  variant?:
    | "primary"
    | "inverse"
    | "light-outline"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "github"
    | "linkedin";
  /** Maps to the type scale. @default "medium" */
  size?: "small" | "medium" | "large" | "x-large";
  /** Render as an anchor when set. */
  href?: string;
  /** Font Awesome class, e.g. "fas fa-github". */
  icon?: string;
  /** Full-width block button. @default false */
  block?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
