// =============================================================
// APP.JS - Main Application Initialization
// =============================================================

// Toast notification system
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || icons.info}</span>
    <span class="toast__message">${message}</span>
    <span class="toast__close" onclick="this.parentElement.remove()">✕</span>
  `;

  container.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Navbar scroll effect
function setupNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    menu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Set active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Load featured media on homepage
async function loadFeaturedMedia() {
  const container = document.getElementById('featured-media');
  if (!container) return;

  const featured = await Media.fetchAll({ featured: true, limit: 8 });
  
  if (featured.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="min-width: 100%;">
        <div class="empty-state__icon">✨</div>
        <h3 class="empty-state__title">Featured content coming soon</h3>
        <p class="empty-state__desc">Admin will add featured media here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = featured.map((item, i) => 
    Gallery.createMediaCardHTML(item, i)
  ).join('');

  if (Gallery && Gallery.setupLazyLoading) Gallery.setupLazyLoading.call({ container });
  
  // Force visibility for items already in viewport
  if (window.ScrollAnimations) {
    setTimeout(() => {
      ScrollAnimations.observe();
      container.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 100);
  }
}

// Load category-specific media for pages
async function loadCategoryMedia(category, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Show skeleton
  container.innerHTML = Array(6).fill(0).map(() => `
    <div class="glass-card">
      <div class="skeleton skeleton--image"></div>
      <div style="padding: var(--space-4);">
        <div class="skeleton skeleton--title"></div>
        <div class="skeleton skeleton--text"></div>
      </div>
    </div>
  `).join('');

  const items = await Media.fetchAll({ category });
  
  // Special handling for Home Welcome Video (Large Cinematic View)
  if (category === 'home') {
    container.innerHTML = items.map(item => {
      const isVideo = item.type === 'video';
      return `
        <div class="home-hero-video" style="animation: heroFadeIn 1s ease both;">
          ${isVideo ? `
            <video src="${item.media_url}" autoplay loop muted playsinline style="width: 100%; height: auto; display: block;"></video>
          ` : `
            <img src="${item.media_url}" style="width: 100%; height: auto; display: block;">
          `}
          <div class="home-hero-video__overlay">
            <h2 class="home-hero-video__title" style="font-size: var(--text-3xl); font-weight: 800; text-shadow: 0 4px 15px rgba(0,0,0,0.8);">${item.title}</h2>
          </div>
        </div>
      `;
    }).join('');
    return;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 4rem 2rem;">
        <div class="empty-state__icon">📁</div>
        <h3 class="empty-state__title">No ${category.replace(/_/g, ' ')} yet</h3>
        <p class="empty-state__desc">If you are the admin, upload files to the "<b>${category}</b>" category in the dashboard.</p>
        <div class="debug-info" style="font-size: 10px; opacity: 0.3; margin-top: 1rem;">Target: ${containerSelector}</div>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((item, i) => {
    if (typeof Gallery !== 'undefined' && Gallery.createMediaCardHTML) {
      return Gallery.createMediaCardHTML(item, i);
    }
    // Fallback card if Gallery.js isn't loaded on this specific page
    const isVideo = item.type === 'video';
    return `
      <div class="media-card ${isVideo ? 'video-card-large' : ''}" style="animation: heroFadeIn 0.5s ease both; animation-delay: ${i * 0.1}s">
        ${isVideo ? `<video src="${item.media_url}" class="media-card__image video-large" autoplay loop muted playsinline></video>` : `<img src="${item.media_url}" class="media-card__image" loading="lazy">`}
        <div class="media-card__overlay">
          <h4 class="media-card__title">${item.title}</h4>
        </div>
      </div>
    `;
  }).join('');

  // Setup lazy loading
  const images = container.querySelectorAll('[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.tagName === 'IMG') el.src = el.dataset.src;
        else if (el.tagName === 'VIDEO') el.src = el.dataset.src;
        el.removeAttribute('data-src');
        observer.unobserve(el);
      }
    });
  }, { rootMargin: '100px' });
  images.forEach(img => observer.observe(img));

  // FORCE VISIBILITY: Trigger animations and reveal cards instantly
  if (window.ScrollAnimations) {
    setTimeout(() => {
      ScrollAnimations.observe();
      container.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 500);
  }
}

// Contact form handler
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    // Standard HTML form submission to FormSubmit.co
    console.log('Form sending via FormSubmit...');
  });
}

// ─── Main Initialization ───
document.addEventListener('DOMContentLoaded', async () => {
  // 0. Mark JS as enabled for CSS fail-safes
  document.body.classList.add('js-enabled');

  // 1. Initialize theme and language first (prevents flash)
  console.log('�- Initializing Theme...');
  Theme.init();
  
  if (typeof I18n !== 'undefined') {
    console.log('🌐 Initializing I18n...');
    I18n.init();
  } else {
    console.error('❌ I18n not found!');
  }

  // 2. Initialize Supabase
  if (typeof getSupabase === 'function') getSupabase();

  // 3. Initialize Auth
  if (typeof Auth !== 'undefined') {
    await Auth.init();
  }

  // 4. Setup navbar
  setupNavbar();

  // 5. Initialize scroll animations
  if (window.ScrollAnimations) ScrollAnimations.init();

  // 6. Initialize Realtime
  Realtime.init();

  // 6.5 Log current protocol for debugging
  if (window.location.protocol === 'file:') {
    console.warn('⚠️ Running via file:// protocol. Some features like Supabase Auth and Storage might be restricted by browser security.');
    // Only show the annoying toast on the admin page where it's critical
    if (document.body.dataset.page === 'admin') {
      showToast('Running locally without server. Admin features (Uploads/Autho) may be blocked.', 'warning');
    }
  }

  // 7. Page-specific initializations
  const page = document.body.dataset.page;

  switch (page) {
    case 'home':
      loadFeaturedMedia();
      loadCategoryMedia('home', '#home-video-container');
      if (typeof Achievers !== 'undefined') Achievers.init();
      // Listen for realtime changes on home and featured media
      window.addEventListener('mediaChange', () => {
        loadFeaturedMedia();
        loadCategoryMedia('home', '#home-video-container');
      });
      // Show section if media exists (checked after a small delay for load)
      setTimeout(() => {
        const container = document.getElementById('home-video-container');
        if (container && (container.querySelector('video') || container.querySelector('img'))) {
           const section = document.getElementById('home-video');
           if (section) section.style.display = 'block';
        }
      }, 3000);
      break;

    case 'teachers':
      if (typeof Teachers !== 'undefined') Teachers.init();
      window.addEventListener('mediaChange', (e) => {
        const cat = e.detail.newRecord?.category || e.detail.oldRecord?.category;
        if (cat === 'ahm' || cat === 'teacher' || cat === 'pet' || cat === 'office') {
          Teachers.init();
        }
      });
      break;

    case 'about':
      if (typeof Achievers !== 'undefined') Achievers.init();
      loadCategoryMedia('about', '#about-media');
      window.addEventListener('mediaChange', (e) => {
        if (e.detail.newRecord?.category === 'achiever' || e.detail.oldRecord?.category === 'achiever') {
           if (typeof Achievers !== 'undefined') Achievers.init();
        }
        if (e.detail.newRecord?.category === 'about' || e.detail.oldRecord?.category === 'about') {
          loadCategoryMedia('about', '#about-media');
        }
      });
      break;

    case 'alumni':
      loadCategoryMedia('memories', '#alumni-media');
      window.addEventListener('mediaChange', (e) => {
        const cat = e.detail.newRecord?.category || e.detail.oldRecord?.category;
        if (cat === 'memories') {
          loadCategoryMedia('memories', '#alumni-media');
        }
      });
      break;

    case 'gallery':
      Gallery.init('#gallery-grid');
      break;

    case 'contact':
      setupContactForm();
      break;

    case 'admin': if (document.body.dataset.page !== 'admin') break;
      // Auth change listener for admin
      window.addEventListener('authChange', () => {
        Admin.init();
      });
      Admin.init();
      break;
  }

  // 8. Aggressive emergency visibility fail-safe
  const forceShow = () => {
    document.querySelectorAll('.reveal:not(.visible), .reveal--left:not(.visible), .reveal--right:not(.visible), .reveal--scale:not(.visible)')
      .forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none'; // Force instant showing
      });
    // Also remove skeletons if parent containers have cards
    document.querySelectorAll('.skeleton').forEach(sk => {
      if (sk.parentElement && sk.parentElement.children.length > 1) {
        sk.style.display = 'none';
      }
    });
  };

  // Run at 1s, 2s, 3s, 5s to ensure dynamic content is captured
  [1000, 2000, 3000, 5000].forEach(delay => setTimeout(forceShow, delay));

  console.log('🎓 Thiru.Vi.Ka. School Website initialized!');
});
