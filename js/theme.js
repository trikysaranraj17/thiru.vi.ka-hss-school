// =============================================================
// THEME.JS — Dark / Light Mode Toggle
// =============================================================

const Theme = {
  STORAGE_KEY: 'tvk-theme',
  
  init() {
    // Load saved theme or default to dark
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'dark'); // Default dark
    
    this.apply(theme);
    this.setupToggle();
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    // Update toggle icons
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      toggle.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
      toggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
  },

  setupToggle() {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => this.toggle());
    });
  },

  getCurrent() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
};
