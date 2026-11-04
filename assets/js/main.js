// Highlights the nav link for the section currently in view.
(function () {
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.masthead__nav a[href*="#"]')
  );
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (link) {
    var id = link.getAttribute('href').split('#')[1];
    if (id) byId[id] = link;
  });

  var sections = Object.keys(byId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!sections.length) return;

  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visible[entry.target.id] = entry.isIntersecting;
    });
    var current = sections.filter(function (s) { return visible[s.id]; })[0];
    links.forEach(function (link) { link.classList.remove('is-active'); });
    if (current) byId[current.id].classList.add('is-active');
  }, { rootMargin: '-60px 0px -70% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();
