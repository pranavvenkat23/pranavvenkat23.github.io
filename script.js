document.addEventListener("DOMContentLoaded", function () {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // only trigger when 20% in view
  });

  fadeEls.forEach(el => observer.observe(el));
});
