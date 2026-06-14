import React from "react";

/**
 * Notice — the theme's callout block. On the dark skin these render as light
 * tinted panels with dark text and a soft coloured shadow, exactly as
 * Minimal Mistakes' `.notice--*` mixins produce.
 */
export function Notice({ children, variant = "default", title, icon, style, ...rest }) {
  const tint = {
    default: { bg: "#f5f6f6", shadow: "rgba(122,130,136,0.25)", link: "var(--gray)" },
    primary: { bg: "#e6f3f4", shadow: "rgba(0,173,181,0.25)", link: "var(--primary)" },
    info: { bg: "#ebf5f8", shadow: "rgba(59,156,186,0.25)", link: "var(--info)" },
    warning: { bg: "#f7f2e6", shadow: "rgba(214,127,5,0.25)", link: "var(--warning)" },
    success: { bg: "#ecf6ec", shadow: "rgba(63,166,63,0.25)", link: "var(--success)" },
    danger: { bg: "#fdefef", shadow: "rgba(238,95,91,0.25)", link: "var(--danger)" },
  }[variant] || {};

  const base = {
    margin: "2em 0",
    padding: "1em",
    color: "var(--dark-gray)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--type-6)",
    lineHeight: 1.5,
    background: tint.bg,
    borderRadius: "var(--radius)",
    boxShadow: `0 1px 1px ${tint.shadow}`,
    ...style,
  };

  return (
    <div style={base} {...rest}>
      {title ? (
        <h4 style={{ margin: "0 0 0.5em", fontSize: "1em", fontWeight: 700, color: tint.link }}>
          {icon ? <i className={icon} aria-hidden="true" style={{ marginRight: "0.5em" }}></i> : null}
          {title}
        </h4>
      ) : null}
      <div style={{ marginBottom: 0 }}>{children}</div>
    </div>
  );
}
