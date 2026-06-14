/* @ds-bundle: {"format":3,"namespace":"LukeLeighSBlogDesignSystem_87513a","components":[{"name":"PageMeta","sourcePath":"components/blog/PageMeta.jsx"},{"name":"Pagination","sourcePath":"components/blog/Pagination.jsx"},{"name":"TeaserCard","sourcePath":"components/blog/TeaserCard.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Notice","sourcePath":"components/feedback/Notice.jsx"},{"name":"AuthorCard","sourcePath":"components/identity/AuthorCard.jsx"},{"name":"Masthead","sourcePath":"components/identity/Masthead.jsx"},{"name":"Badge","sourcePath":"components/labels/Badge.jsx"},{"name":"Tag","sourcePath":"components/labels/Tag.jsx"}],"sourceHashes":{"components/blog/PageMeta.jsx":"befa9722f122","components/blog/Pagination.jsx":"065c2e5ddc44","components/blog/TeaserCard.jsx":"36183f790865","components/buttons/Button.jsx":"992e1317873e","components/feedback/Notice.jsx":"5c15c46a361f","components/identity/AuthorCard.jsx":"eb0d1ac11c97","components/identity/Masthead.jsx":"ccabddf30590","components/labels/Badge.jsx":"303d5ccac241","components/labels/Tag.jsx":"e6d2e1f1d97a","jekyll-theme/assets/js/toc-active.js":"26cab4a7c353"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LukeLeighSBlogDesignSystem_87513a = window.LukeLeighSBlogDesignSystem_87513a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/blog/PageMeta.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PageMeta — the muted byline row under a post title: date, read time,
 * categories. Mirrors `.page__meta` (sans-serif, type-6, muted colour).
 */
function PageMeta({
  date,
  readTime,
  category,
  items,
  style,
  ...rest
}) {
  const meta = items || [date && {
    icon: "far fa-calendar",
    text: date
  }, readTime && {
    icon: "far fa-clock",
    text: readTime
  }, category && {
    icon: "fas fa-folder",
    text: category
  }].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "14px",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-6)",
      ...style
    }
  }, rest), meta.map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45em"
    }
  }, m.icon ? /*#__PURE__*/React.createElement("i", {
    className: m.icon,
    "aria-hidden": "true"
  }) : null, m.text)));
}
Object.assign(__ds_scope, { PageMeta });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/PageMeta.jsx", error: String((e && e.message) || e) }); }

// components/blog/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pagination — the previous/next pager from `.pagination`. Bordered pills with
 * a disabled state for the ends of the archive.
 */
function Pagination({
  current = 1,
  total = 1,
  onPage,
  style,
  ...rest
}) {
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
    transition: "var(--transition)"
  });
  const pages = Array.from({
    length: total
  }, (_, i) => i + 1);
  const go = p => !(p < 1 || p > total) && onPage && onPage(p);
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      gap: "6px",
      alignItems: "center",
      flexWrap: "wrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("a", {
    style: pill(false, current <= 1),
    onClick: () => go(current - 1)
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-arrow-left",
    "aria-hidden": "true"
  }), " Prev"), pages.map(p => /*#__PURE__*/React.createElement("a", {
    key: p,
    style: pill(p === current, false),
    onClick: () => go(p)
  }, p)), /*#__PURE__*/React.createElement("a", {
    style: pill(false, current >= total),
    onClick: () => go(current + 1)
  }, "Next ", /*#__PURE__*/React.createElement("i", {
    className: "fas fa-arrow-right",
    "aria-hidden": "true"
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/blog/TeaserCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TeaserCard — the archive list item. Rounded teaser image, linked title,
 * meta row and a short excerpt. Built from `.archive__item` + `.page__meta`.
 */
function TeaserCard({
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
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      position: "relative",
      maxWidth: "640px",
      ...style
    }
  }, rest), image ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: "block",
      borderRadius: "var(--radius)",
      overflow: "hidden",
      marginBottom: "0.75em"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: "100%",
      display: "block",
      transition: "var(--transition)"
    }
  })) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 0.25em",
      fontSize: "var(--type-4)",
      fontWeight: 700,
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      color: "var(--text)",
      textDecoration: "none"
    }
  }, title)), /*#__PURE__*/React.createElement(__ds_scope.PageMeta, {
    date: date,
    readTime: readTime,
    category: category,
    style: {
      marginBottom: "0.5em"
    }
  }), excerpt ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-6)",
      color: "var(--text)",
      lineHeight: 1.5
    }
  }, excerpt) : null);
}
Object.assign(__ds_scope, { TeaserCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/TeaserCard.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the theme's `.btn`. Bold, 12px, 4px radius, flat fill with a
 * darken-on-hover. Variants map to the brand palette; sizes follow the type scale.
 */
function Button({
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
    primary: {
      bg: "var(--primary)",
      fg: "#fff"
    },
    inverse: {
      bg: "transparent",
      fg: "var(--text)",
      border: "1px solid var(--border)"
    },
    "light-outline": {
      bg: "transparent",
      fg: "#fff",
      border: "1px solid #fff"
    },
    success: {
      bg: "var(--success)",
      fg: "#fff"
    },
    warning: {
      bg: "var(--warning)",
      fg: "#fff"
    },
    danger: {
      bg: "var(--danger)",
      fg: "#fff"
    },
    info: {
      bg: "var(--info)",
      fg: "#fff"
    },
    github: {
      bg: "var(--github)",
      fg: "#fff"
    },
    linkedin: {
      bg: "var(--linkedin)",
      fg: "#fff"
    }
  }[variant] || {
    bg: "var(--primary)",
    fg: "#fff"
  };
  const sizes = {
    small: "var(--type-7)",
    medium: "var(--type-6)",
    large: "var(--type-5)",
    "x-large": "var(--type-4)"
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
    ...style
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon ? /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true"
  }) : null, children);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: base,
      onClick: onClick
    }, rest), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    style: base,
    disabled: disabled,
    onClick: onClick
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Notice.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Notice — the theme's callout block. On the dark skin these render as light
 * tinted panels with dark text and a soft coloured shadow, exactly as
 * Minimal Mistakes' `.notice--*` mixins produce.
 */
function Notice({
  children,
  variant = "default",
  title,
  icon,
  style,
  ...rest
}) {
  const tint = {
    default: {
      bg: "#f5f6f6",
      shadow: "rgba(122,130,136,0.25)",
      link: "var(--gray)"
    },
    primary: {
      bg: "#e6f3f4",
      shadow: "rgba(0,173,181,0.25)",
      link: "var(--primary)"
    },
    info: {
      bg: "#ebf5f8",
      shadow: "rgba(59,156,186,0.25)",
      link: "var(--info)"
    },
    warning: {
      bg: "#f7f2e6",
      shadow: "rgba(214,127,5,0.25)",
      link: "var(--warning)"
    },
    success: {
      bg: "#ecf6ec",
      shadow: "rgba(63,166,63,0.25)",
      link: "var(--success)"
    },
    danger: {
      bg: "#fdefef",
      shadow: "rgba(238,95,91,0.25)",
      link: "var(--danger)"
    }
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
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base
  }, rest), title ? /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: "0 0 0.5em",
      fontSize: "1em",
      fontWeight: 700,
      color: tint.link
    }
  }, icon ? /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true",
    style: {
      marginRight: "0.5em"
    }
  }) : null, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 0
    }
  }, children));
}
Object.assign(__ds_scope, { Notice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Notice.jsx", error: String((e && e.message) || e) }); }

// components/identity/AuthorCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * AuthorCard — the sidebar author profile. Circular bordered avatar, name,
 * bio, location and a row of social links. Mirrors `.author__*`.
 */
function AuthorCard({
  avatar,
  name = "Luke Leigh",
  bio = "PowerShell Developer / Infrastructure Engineer",
  location = "Essex, UK",
  links = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: "100%",
      maxWidth: "240px",
      fontFamily: "var(--font-sans)",
      color: "var(--text)",
      ...style
    }
  }, rest), avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: name,
    style: {
      maxWidth: "110px",
      width: "110px",
      height: "110px",
      objectFit: "cover",
      borderRadius: "50%",
      padding: "5px",
      border: "1px solid var(--border)"
    }
  }) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "10px 0",
      fontSize: "var(--type-5)",
      fontWeight: 700
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      fontSize: "var(--type-6)",
      lineHeight: 1.4
    }
  }, bio), location ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: "var(--type-6)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-map-marker-alt",
    "aria-hidden": "true",
    style: {
      marginRight: "0.5em"
    }
  }), location) : null, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "14px",
      margin: 0,
      padding: 0,
      listStyle: "none",
      fontSize: "18px"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label,
    title: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: l.url || "#",
    style: {
      color: "var(--text)"
    },
    "aria-label": l.label
  }, /*#__PURE__*/React.createElement("i", {
    className: l.icon,
    "aria-hidden": "true"
  }))))));
}
Object.assign(__ds_scope, { AuthorCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/AuthorCard.jsx", error: String((e && e.message) || e) }); }

// components/identity/Masthead.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Masthead — the site header. PowerShell mark + title/subtitle lockup on the
 * left, greedy nav on the right. Bottom hairline border. Mirrors `.masthead`.
 */
function Masthead({
  logo,
  title = "Luke Leigh's Blog",
  subtitle = "Yet another IT Admin Blog",
  items = [],
  current,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1em",
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "0.9em 1em",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.6em",
      textDecoration: "none",
      color: "var(--text)"
    }
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "",
    style: {
      height: "2rem",
      width: "2rem"
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: "var(--type-4)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-8)",
      opacity: 0.85
    }
  }, subtitle))), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      gap: "1.5em",
      margin: 0,
      padding: 0,
      listStyle: "none",
      fontWeight: 700,
      fontSize: "var(--type-6)",
      flexWrap: "wrap"
    }
  }, items.map(it => {
    const label = typeof it === "string" ? it : it.label;
    const href = typeof it === "string" ? "#" : it.href || "#";
    const active = current === label;
    return /*#__PURE__*/React.createElement("li", {
      key: label
    }, /*#__PURE__*/React.createElement("a", {
      href: href,
      style: {
        color: active ? "var(--primary)" : "var(--masthead-link)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "var(--transition)"
      }
    }, label));
  })))));
}
Object.assign(__ds_scope, { Masthead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/Masthead.jsx", error: String((e && e.message) || e) }); }

// components/labels/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — a small solid status label built on the semantic palette. Not a
 * stock Minimal Mistakes element; it formalises the inline status pills used
 * around the blog (e.g. "Personal", read-time markers).
 */
function Badge({
  children,
  variant = "primary",
  style,
  ...rest
}) {
  const palette = {
    primary: "var(--primary)",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    info: "var(--info)",
    neutral: "var(--gray)"
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
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/Badge.jsx", error: String((e && e.message) || e) }); }

// components/labels/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — the theme's `.page__taxonomy-item`: a bordered pill used for tags and
 * categories. Hover lightens the text toward the link-hover colour.
 */
function Tag({
  children,
  href,
  icon,
  style,
  ...rest
}) {
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
    ...style
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon ? /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true"
  }) : null, children);
  if (href) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: base
    }, rest), inner);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), inner);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/Tag.jsx", error: String((e && e.message) || e) }); }

// jekyll-theme/assets/js/toc-active.js
try { (() => {
/* Scroll-spy for the post TOC. Highlights the in-view heading's link.
   Drop at assets/js/toc-active.js. Loaded only on pages with `toc: true`. */
(function () {
  var toc = document.querySelector('.ll-toc');
  if (!toc) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;
  var targets = links.map(function (a) {
    return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
  }).filter(Boolean);
  function onScroll() {
    var top = window.scrollY + 120;
    var current = targets[0];
    targets.forEach(function (t) {
      if (t.offsetTop <= top) current = t;
    });
    links.forEach(function (a) {
      var match = current && a.getAttribute('href').slice(1) === current.id;
      a.classList.toggle('active', match);
    });
  }
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  onScroll();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "jekyll-theme/assets/js/toc-active.js", error: String((e && e.message) || e) }); }

__ds_ns.PageMeta = __ds_scope.PageMeta;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.TeaserCard = __ds_scope.TeaserCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Notice = __ds_scope.Notice;

__ds_ns.AuthorCard = __ds_scope.AuthorCard;

__ds_ns.Masthead = __ds_scope.Masthead;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

})();
