import React from "react";

/**
 * PageMeta — the muted byline row under a post title: date, read time,
 * categories. Mirrors `.page__meta` (sans-serif, type-6, muted colour).
 */
export function PageMeta({ date, readTime, category, items, style, ...rest }) {
  const meta = items || [
    date && { icon: "far fa-calendar", text: date },
    readTime && { icon: "far fa-clock", text: readTime },
    category && { icon: "fas fa-folder", text: category },
  ].filter(Boolean);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "14px",
        color: "var(--text-muted)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--type-6)",
        ...style,
      }}
      {...rest}
    >
      {meta.map((m, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.45em" }}>
          {m.icon ? <i className={m.icon} aria-hidden="true"></i> : null}
          {m.text}
        </span>
      ))}
    </div>
  );
}
