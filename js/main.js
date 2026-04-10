// ===== DOM ready marker =====
document.documentElement.classList.add('js-ready');

// ===== Mobile navigation toggle =====
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });
}

// ===== Scroll-Spy via IntersectionObserver =====
const sections = document.querySelectorAll('main [id]');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
