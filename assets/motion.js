// Skeleton loaders only: shimmer briefly, then the full page content appears at once.
// Respects prefers-reduced-motion.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
