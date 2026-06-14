import React from "react";
import { PageMeta } from "./PageMeta.jsx";

/**
 * TeaserCard — the archive list item. Rounded teaser image, linked title,
 * meta row and a short excerpt. Built from `.archive__item` + `.page__meta`.
 */
export function TeaserCard({
  title,
  href = "#",
  image,
  excerpt,
  date,
  readTime,
  category,
  style,
  ...rest
}) {
  return (
    <article
      style={{ position: "relative", maxWidth: "640px", ...style }}
      {...rest}
    >
      {image ? (
        <a
          href={href}
          style={{
            display: "block",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            marginBottom: "0.75em",
          }}
        >
          <img
            src={image}
            alt=""
            style={{ width: "100%", display: "block", transition: "var(--transition)" }}
          />
        </a>
      ) : null}
      <h2
        style={{
          margin: "0 0 0.25em",
          fontSize: "var(--type-4)",
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        <a href={href} style={{ color: "var(--text)", textDecoration: "none" }}>
          {title}
        </a>
      </h2>
      <PageMeta date={date} readTime={readTime} category={category} style={{ marginBottom: "0.5em" }} />
      {excerpt ? (
        <p style={{ margin: 0, fontSize: "var(--type-6)", color: "var(--text)", lineHeight: 1.5 }}>
          {excerpt}
        </p>
      ) : null}
    </article>
  );
}
