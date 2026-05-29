// Scroll reveal utility using IntersectionObserver
// Adds .visible class to .reveal elements when they enter viewport.

export function initReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '-50px' },
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
