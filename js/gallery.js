// =============================================================
// GALLERY.JS — Gallery Filtering, Display & Lightbox
// =============================================================

const Gallery = {
  currentFilter: 'all',
  mediaItems: [],
  container: null,

  // Initialize gallery
  init(containerSelector = '#gallery-grid', allowedCategories = null) { this.allowedCategories = allowedCategories;
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.setupFilters();
    this.loadMedia();
    this.setupLightbox();

    // Listen for realtime changes
    window.addEventListener('mediaChange', (e) => {
      this.handleRealtimeChange(e.detail);
    });
  },

  // Setup filter buttons
  setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter || 'all';
        this.renderMedia();
      });
    });
  },

  // Load media from database
  async loadMedia() {
    try {
      // Fetch all items
      this.mediaItems = await Media.fetchAll();
      this.renderMedia();
    } catch (err) {
      console.error('Gallery load error:', err);
    }
  },

  // Render media items based on current filter
  renderMedia() {
    if (!this.container) return;

    let filtered = [...this.mediaItems];
    const galleryKeys = ['achievement_student', 'achievement_academic', 'achievement_sports', 'achievement_arts', 'gallery_event', 'gallery_sports', 'gallery_academic', 'gallery_alumni', 'memories'];

    // Phase 4 Bug Fix: Ensure we are ONLY showing gallery media, 
    // to prevent 'home' or 'ahm' media from showing up when filtering by type.
    if (this.allowedCategories) { filtered = filtered.filter(m => this.allowedCategories.includes(m.category)); } else { filtered = filtered.filter(m => galleryKeys.includes(m.category) || m.category === 'gallery'); }

    // Apply filter
    if (this.currentFilter !== 'all') {
      if (this.currentFilter === 'photos') {
        filtered = filtered.filter(m => m.type === 'image');
      } else if (this.currentFilter === 'videos') {
        filtered = filtered.filter(m => m.type === 'video');
      } else {
        // Direct category match (e.g. gallery_event)
        filtered = filtered.filter(m => m.category === this.currentFilter);
      }
    }

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: var(--space-20); text-align: center;">
          <div class="empty-state__icon" style="font-size: 4rem; opacity: 0.3;">📸</div>
          <h3 class="empty-state__title">No media found</h3>
          <p class="empty-state__desc">Upload media in the admin panel under this category.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    filtered.forEach((item, index) => {
      const temp = document.createElement('div');
      temp.innerHTML = this.createMediaCardHTML(item, index);
      const card = temp.firstElementChild;
      fragment.appendChild(card);
    });

    this.container.appendChild(fragment);

    // Re-trigger scroll animations
    if (window.ScrollAnimations) {
      ScrollAnimations.observe();
    }
  },

  // Create a media card HTML
  createMediaCardHTML(item, index = 0) {
    const isVideo = item.type === 'video';

    const url = item.media_url || 'assets/logo.jpg';
    const title = this.escapeHTML(item.title || 'Untitled');
    const desc = item.description ? this.escapeHTML(item.description) : '';

    return `
      <div class="media-card ${isVideo ? 'video-card-large' : ''}" data-media-id="${item.id}" style="animation: heroFadeIn 0.5s ease both; animation-delay: ${index * 0.05}s">
        ${isVideo ? `
          <video class="media-card__image video-large" autoplay loop muted playsinline preload="metadata">
            <source src="${url}" type="video/mp4">
          </video>
          <div class="media-card__play">▶</div>
        ` : `
          <img class="media-card__image" 
               src="${url}" 
               alt="${title}"
               loading="lazy"
               onerror="this.src='assets/logo.jpg'">
        `}
        <div class="media-card__overlay">
          <h4 class="media-card__title">${title}</h4>
          ${desc ? `<p class="media-card__desc">${desc}</p>` : ''}
        </div>
        ${item.featured ? '<span class="media-card__badge badge badge--gold">⭐ Featured</span>' : ''}
      </div>
    `;
  },

  // Setup lightbox
  setupLightbox() {
    if (!document.getElementById('lightbox')) {
      const lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.className = 'lightbox';
      lb.innerHTML = `
        <button class="lightbox__close" id="lightbox-close" aria-label="Close lightbox">✕</button>
        <img class="lightbox__content" id="lightbox-img" alt="" style="display:none;">
        <video class="lightbox__content" id="lightbox-video" controls style="display:none;"></video>
        <div class="lightbox__info">
          <h4 class="lightbox__title" id="lightbox-title"></h4>
          <p class="lightbox__desc" id="lightbox-desc"></p>
        </div>
      `;
      document.body.appendChild(lb);

      lb.addEventListener('click', (e) => {
        if (e.target === lb || e.target.id === 'lightbox-close') {
          this.closeLightbox();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeLightbox();
      });
    }

    if (this.container) {
      this.container.addEventListener('click', (e) => {
        const card = e.target.closest('.media-card');
        if (card) {
          const id = card.dataset.mediaId;
          const item = this.mediaItems.find(m => m.id === id);
          if (item) this.openLightbox(item);
        }
      });
    }
  },

  openLightbox(item) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const video = document.getElementById('lightbox-video');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');

    if (item.type === 'video') {
      img.style.display = 'none';
      video.style.display = 'block';
      video.src = item.media_url;
      video.play();
    } else {
      video.style.display = 'none';
      video.pause();
      img.style.display = 'block';
      img.src = item.media_url;
      img.alt = item.title;
    }

    title.textContent = item.title;
    desc.textContent = item.description || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeLightbox() {
    const lb = document.getElementById('lightbox');
    const video = document.getElementById('lightbox-video');
    
    lb.classList.remove('active');
    document.body.style.overflow = '';
    video.pause();
    video.src = '';
  },

  handleRealtimeChange(detail) {
    const { type, newRecord, oldRecord } = detail;
    
    switch (type) {
      case 'INSERT':
        this.mediaItems.unshift(newRecord);
        break;
      case 'UPDATE':
        const updateIdx = this.mediaItems.findIndex(m => m.id === newRecord.id);
        if (updateIdx >= 0) {
          this.mediaItems[updateIdx] = newRecord;
        }
        break;
      case 'DELETE':
        this.mediaItems = this.mediaItems.filter(m => m.id !== oldRecord.id);
        break;
    }
    this.renderMedia();
  },

  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};


Gallery.setupLazyLoading = function() { console.log('Lazy loading initialized'); };
