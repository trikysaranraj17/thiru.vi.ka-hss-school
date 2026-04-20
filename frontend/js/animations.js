// =============================================================
// ANIMATIONS.JS — Scroll Animations & Counter Effects
// =============================================================

const ScrollAnimations = {
  observer: null,

  init() {
    this.setupObserver();
    this.observe();
    this.setupSmoothScroll();
  },

  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Counter animation
            if (entry.target.hasAttribute('data-count-to')) {
              this.animateCounter(entry.target);
            } else {
              // Search in children if parent is observed
              const counters = entry.target.querySelectorAll('[data-count-to]');
              counters.forEach(c => this.animateCounter(c));
            }

            // Don't unobserve — allow re-animation on scroll back is optional
            // this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  },

  observe() {
    const elements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');
    elements.forEach(el => {
      if (this.observer) {
        this.observer.observe(el);
      }
    });
  },

  // Animate a number counter
  animateCounter(element) {
    const end = parseInt(element.getAttribute('data-count-to'), 10);
    const suffix = element.getAttribute('data-count-suffix') || '';
    const prefix = element.getAttribute('data-count-prefix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      element.textContent = prefix + Math.round(end * eased) + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  },

  // Setup smooth scroll for anchor links
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height')) || 72;
          
          window.scrollTo({
            top: target.offsetTop - navHeight - 20,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};
