// Scroll reveal + skeleton loaders. Respects prefers-reduced-motion.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Tag elements for reveal
  var targets = document.querySelectorAll('.hero, main h2, main h3, .pitch, .criteria > div, .factbox, article.memo p, table.ledger');
  targets.forEach(function (el, i) {
    el.classList.add('reveal');
    if (i % 4 === 1) el.classList.add('d1');
    if (i % 4 === 2) el.classList.add('d2');
    if (i % 4 === 3) el.classList.add('d3');
  });

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Skeleton loaders on pitch lists: shimmer briefly, then swap in content
  document.querySelectorAll('.pitch-list[data-skeleton]').forEach(function (list) {
    var count = list.querySelectorAll('.pitch').length || 3;
    for (var i = 0; i < count; i++) {
      var sk = document.createElement('div');
      sk.className = 'skeleton-item';
      sk.setAttribute('aria-hidden', 'true');
      sk.innerHTML = '<div class="sk-line w25"></div><div class="sk-line w60"></div><div class="sk-line w90"></div>';
      list.appendChild(sk);
    }
    var delay = reduced ? 0 : 550;
    window.setTimeout(function () {
      list.classList.add('loaded');
      list.removeAttribute('data-skeleton');
    }, delay);
  });
})();
