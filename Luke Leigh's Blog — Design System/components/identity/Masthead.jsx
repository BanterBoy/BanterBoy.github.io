import React from "react";

/**
 * Masthead — the site header. PowerShell mark + title/subtitle lockup on the
 * left, greedy nav on the right. Bottom hairline border. Mirrors `.masthead`.
 */
export function Masthead({
  logo,
  title = "Luke Leigh's Blog",
  subtitle = "Yet another IT Admin Blog",
  items = [],
  current,
  style,
  ...rest
}) {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1em",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "0.9em 1em",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "0.6em", textDecoration: "none", color: "var(--text)" }}
        >
          {logo ? <img src={logo} alt="" style={{ height: "2rem", width: "2rem" }} /> : null}
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontWeight: 700, fontSize: "var(--type-4)" }}>{title}</span>
            <span style={{ fontSize: "var(--type-8)", opacity: 0.85 }}>{subtitle}</span>
          </span>
        </a>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "1.5em",
              margin: 0,
              padding: 0,
              listStyle: "none",
              fontWeight: 700,
              fontSize: "var(--type-6)",
              flexWrap: "wrap",
            }}
          >
            {items.map((it) => {
              const label = typeof it === "string" ? it : it.label;
              const href = typeof it === "string" ? "#" : it.href || "#";
              const active = current === label;
              return (
                <li key={label}>
                  <a
                    href={href}
                    style={{
                      color: active ? "var(--primary)" : "var(--masthead-link)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "var(--transition)",
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
