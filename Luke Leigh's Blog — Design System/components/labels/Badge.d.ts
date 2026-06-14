import * as React from "react";

/** Small solid status label built on the semantic palette. */
export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "primary" */
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
