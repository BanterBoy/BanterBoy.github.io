import * as React from "react";

/**
 * Callout panel (`.notice--*`). Light tinted card with dark text on the dark skin.
 *
 * @startingPoint section="Feedback" subtitle="Tinted callout / notice block" viewport="700x200"
 */
export interface NoticeProps {
  children?: React.ReactNode;
  /** @default "default" */
  variant?: "default" | "primary" | "info" | "warning" | "success" | "danger";
  /** Optional bold heading. */
  title?: React.ReactNode;
  /** Font Awesome class shown before the title. */
  icon?: string;
  style?: React.CSSProperties;
}

export function Notice(props: NoticeProps): JSX.Element;
