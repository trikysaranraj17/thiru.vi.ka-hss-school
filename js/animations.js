// =============================================================
// ANIMATIONS.JS — Premium Scroll & Interactive Effects
// =============================================================

const ScrollAnimations = {
  observer: null,

  init() {
    this.setupObserver();
    this.observe();
    this.setupSmoothScroll();
    this.initMagneticButtons();
  },

  setupObserver() {
    // High-end 'Snap' reveal settings
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Counter animation
            if (entry.target.hasAttribute('data-count-to')) {
              this.animateCounter(entry.target);
            } else {
              const counters = entry.target.querySelectorAll('[data-count-to]');
              counters.forEach(c => this.animateCounter(c));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
  },

  observe() {
    const elements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');
    elements.forEach(el => {
      if (this.observer) this.observer.observe(el);
    });
  },

  // Magnetic Button Effect
  initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .navbar__brand, .theme-toggle');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Intensity of the pull
        const intensity = 0.35;
        el.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0, 0)`;
      });
    });
  },

  animateCounter(element) {
    if (element.classList.contains('counted')) return;
    element.classList.add('counted');

    const end = parseInt(element.getAttribute('data-count-to'), 10);
    const suffix = element.getAttribute('data-count-suffix') || '';
    const prefix = element.getAttribute('data-count-prefix') || '';
    const duration = 2500;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Out-Expo curve for premium feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      element.textContent = prefix + Math.round(end * eased) + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  },

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height')) || 80;
          
          window.scrollTo({
            top: target.offsetTop - navHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

// Auto-initialize with a slight delay for better performance
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => ScrollAnimations.init(), 100);
});
