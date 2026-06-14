import React from "react";

/**
 * Badge — a small solid status label built on the semantic palette. Not a
 * stock Minimal Mistakes element; it formalises the inline status pills used
 * around the blog (e.g. "Personal", read-time markers).
 */
export function Badge({ children, variant = "primary", style, ...rest }) {
  const palette = {
    primary: "var(--primary)",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    info: "var(--info)",
    neutral: "var(--gray)",
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35em",
    padding: "2px 8px",
    fontSize: "var(--type-7)",
    fontWeight: 700,
    lineHeight: 1.5,
    color: "#fff",
    background: palette[variant] || palette.primary,
    borderRadius: "var(--radius)",
    ...style,
  };
  return (
    <span style={base} {...rest}>
      {children}
    </span>
  );
}
