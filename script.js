// File: script.js
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 1.2s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 300);
  });
});
