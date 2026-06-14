import React from "react";

/**
 * Tag — the theme's `.page__taxonomy-item`: a bordered pill used for tags and
 * categories. Hover lightens the text toward the link-hover colour.
 */
export function Tag({ children, href, icon, style, ...rest }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4em",
    marginRight: "5px",
    marginBottom: "8px",
    padding: "5px 10px",
    fontSize: "var(--type-6)",
    color: "var(--text)",
    textDecoration: "none",
    border: "1px solid #3a3f47",
    borderRadius: "var(--radius)",
    transition: "var(--transition)",
    ...style,
  };
  const inner = (
    <>
      {icon ? <i className={icon} aria-hidden="true"></i> : null}
      {children}
    </>
  );
  if (href) {
    return (
      <a href={href} style={base} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <span style={base} {...rest}>
      {inner}
    </span>
  );
}
