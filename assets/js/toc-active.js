/* Scroll-spy for the post TOC. Highlights the in-view heading's link.
   Drop at assets/js/toc-active.js. Loaded only on pages with `toc: true`. */
(function () {
  var toc = document.querySelector('.ll-toc');
  if (!toc) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;
  var targets = links
    .map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); })
    .filter(Boolean);

  function onScroll() {
    var top = window.scrollY + 120;
    var current = targets[0];
    targets.forEach(function (t) { if (t.offsetTop <= top) current = t; });
    links.forEach(function (a) {
      var match = current && a.getAttribute('href').slice(1) === current.id;
      a.classList.toggle('active', match);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
