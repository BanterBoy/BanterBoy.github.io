import React from "react";

/**
 * AuthorCard — the sidebar author profile. Circular bordered avatar, name,
 * bio, location and a row of social links. Mirrors `.author__*`.
 */
export function AuthorCard({
  avatar,
  name = "Luke Leigh",
  bio = "PowerShell Developer / Infrastructure Engineer",
  location = "Essex, UK",
  links = [],
  style,
  ...rest
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "240px",
        fontFamily: "var(--font-sans)",
        color: "var(--text)",
        ...style,
      }}
      {...rest}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          style={{
            maxWidth: "110px",
            width: "110px",
            height: "110px",
            objectFit: "cover",
            borderRadius: "50%",
            padding: "5px",
            border: "1px solid var(--border)",
          }}
        />
      ) : null}
      <h3 style={{ margin: "10px 0", fontSize: "var(--type-5)", fontWeight: 700 }}>{name}</h3>
      <p style={{ margin: "0 0 6px", fontSize: "var(--type-6)", lineHeight: 1.4 }}>{bio}</p>
      {location ? (
        <p style={{ margin: "0 0 14px", fontSize: "var(--type-6)", color: "var(--text-muted)" }}>
          <i className="fas fa-map-marker-alt" aria-hidden="true" style={{ marginRight: "0.5em" }}></i>
          {location}
        </p>
      ) : null}
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "14px", margin: 0, padding: 0, listStyle: "none", fontSize: "18px" }}>
        {links.map((l) => (
          <li key={l.label} title={l.label}>
            <a href={l.url || "#"} style={{ color: "var(--text)" }} aria-label={l.label}>
              <i className={l.icon} aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
