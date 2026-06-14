import React from "react";

/**
 * Button — the theme's `.btn`. Bold, 12px, 4px radius, flat fill with a
 * darken-on-hover. Variants map to the brand palette; sizes follow the type scale.
 */
export function Button({
  children,
  variant = "primary",
  size = "medium",
  href,
  icon,
  block = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const palette = {
    primary: { bg: "var(--primary)", fg: "#fff" },
    inverse: { bg: "transparent", fg: "var(--text)", border: "1px solid var(--border)" },
    "light-outline": { bg: "transparent", fg: "#fff", border: "1px solid #fff" },
    success: { bg: "var(--success)", fg: "#fff" },
    warning: { bg: "var(--warning)", fg: "#fff" },
    danger: { bg: "var(--danger)", fg: "#fff" },
    info: { bg: "var(--info)", fg: "#fff" },
    github: { bg: "var(--github)", fg: "#fff" },
    linkedin: { bg: "var(--linkedin)", fg: "#fff" },
  }[variant] || { bg: "var(--primary)", fg: "#fff" };

  const sizes = {
    small: "var(--type-7)",
    medium: "var(--type-6)",
    large: "var(--type-5)",
    "x-large": "var(--type-4)",
  };

  const base = {
    display: block ? "block" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5em",
    boxSizing: "border-box",
    margin: "0 0 0.25em",
    padding: "0.5em 1em",
    fontFamily: "var(--font-sans)",
    fontSize: sizes[size] || sizes.medium,
    fontWeight: 700,
    lineHeight: 1.2,
    textAlign: "center",
    textDecoration: "none",
    borderWidth: 0,
    border: palette.border || "0",
    borderRadius: "var(--radius)",
    background: palette.bg,
    color: palette.fg,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.65 : 1,
    pointerEvents: disabled ? "none" : undefined,
    transition: "var(--transition)",
    ...style,
  };

  const inner = (
    <>
      {icon ? <i className={icon} aria-hidden="true"></i> : null}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} style={base} onClick={onClick} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" style={base} disabled={disabled} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
