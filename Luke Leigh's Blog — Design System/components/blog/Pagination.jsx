import React from "react";

/**
 * Pagination — the previous/next pager from `.pagination`. Bordered pills with
 * a disabled state for the ends of the archive.
 */
export function Pagination({ current = 1, total = 1, onPage, style, ...rest }) {
  const pill = (active, disabled) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4em",
    padding: "6px 12px",
    fontSize: "var(--type-6)",
    fontWeight: 700,
    fontFamily: "var(--font-sans)",
    color: active ? "#fff" : "var(--text)",
    background: active ? "var(--primary)" : "transparent",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "var(--transition)",
  });

  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const go = (p) => !(p < 1 || p > total) && onPage && onPage(p);

  return (
    <nav
      style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", ...style }}
      {...rest}
    >
      <a style={pill(false, current <= 1)} onClick={() => go(current - 1)}>
        <i className="fas fa-arrow-left" aria-hidden="true"></i> Prev
      </a>
      {pages.map((p) => (
        <a key={p} style={pill(p === current, false)} onClick={() => go(p)}>
          {p}
        </a>
      ))}
      <a style={pill(false, current >= total)} onClick={() => go(current + 1)}>
        Next <i className="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
    </nav>
  );
}
