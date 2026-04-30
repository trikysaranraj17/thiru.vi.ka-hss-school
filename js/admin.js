// =============================================================
// ADMIN.JS — Admin Panel Logic
// Upload, manage, edit, delete media
// =============================================================

const Admin = {
  currentSection: 'dashboard',
  allMedia: [],

  // Initialize admin panel
  async init() {
    // Check authentication
    if (!Auth.isLoggedIn() || !Auth.isAdmin()) {
      document.getElementById('admin-panel')?.style.setProperty('display', 'none');
      document.getElementById('login-screen')?.style.setProperty('display', '');
      return;
    }

    document.getElementById('admin-panel')?.style.setProperty('display', '');
    document.getElementById('login-screen')?.style.setProperty('display', 'none');

    this.setupUploadArea();
    this.setupUploadForm();
    this.setupSidebar();
    await this.loadDashboard();
    await this.loadMediaTable();

    // Listen for realtime changes
    window.addEventListener('mediaChange', () => {
      this.loadDashboard();
      this.loadMediaTable();
    });
  },

  // Setup sidebar navigation
  setupSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    if (!sidebar || sidebar.dataset.listenerAttached) return;
    sidebar.dataset.listenerAttached = 'true';

    const links = document.querySelectorAll('.admin-sidebar__link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section) {
          this.switchSection(section);
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });
  },

  // Switch admin section
  switchSection(section) {
    this.currentSection = section;
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(s => {
      s.style.display = s.id === `section-${section}` ? '' : 'none';
    });
  },

  // Load dashboard stats
  async loadDashboard() {
    const counts = await Media.getCounts();
    
    const updateStat = (id, value) => {
      const el = document.getElementById(id);
      if (el) {
        this.animateCounter(el, parseInt(el.textContent) || 0, value);
      }
    };

    updateStat('stat-total', counts.total);
    updateStat('stat-images', counts.images);
    updateStat('stat-videos', counts.videos);
    updateStat('stat-featured', counts.featured);
  },

  // Setup drag-and-drop upload area
  setupUploadArea() {
    const area = document.getElementById('upload-area');
    const fileInput = document.getElementById('upload-file');
    const preview = document.getElementById('upload-preview');
    
    if (!area || !fileInput || area.dataset.listenerAttached) return;
    area.dataset.listenerAttached = 'true';

    // Click to upload
    area.addEventListener('click', () => fileInput.click());

    // Drag and drop
    area.addEventListener('dragover', (e) => {
      e.preventDefault();
      area.classList.add('dragover');
    });

    area.addEventListener('dragleave', () => {
      area.classList.remove('dragover');
    });

    area.addEventListener('drop', (e) => {
      e.preventDefault();
      area.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        this.previewFile(files[0]);
      }
    });

    // File input change
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        this.previewFile(fileInput.files[0]);
      }
    });
  },

  // Preview selected file
  previewFile(file) {
    const preview = document.getElementById('upload-preview');
    if (!preview) return;

    preview.innerHTML = '';
    preview.classList.add('active');

    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = 'Preview';
      preview.appendChild(img);
    } else if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.controls = true;
      video.muted = true;
      preview.appendChild(video);
    }

    // Auto-detect type
    const typeSelect = document.getElementById('upload-type');
    if (typeSelect) {
      typeSelect.value = file.type.startsWith('video/') ? 'video' : 'image';
    }
  },

  // Setup upload form submission
  setupUploadForm() {
    const form = document.getElementById('upload-form');
    if (!form || form.dataset.listenerAttached) return;
    form.dataset.listenerAttached = 'true';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const fileInput = document.getElementById('upload-file');
      const file = fileInput.files[0];
      
      if (!file) {
        showToast('Please select a file to upload', 'warning');
        return;
      }

      const title = document.getElementById('upload-title').value.trim();
      if (!title) {
        showToast('Please enter a title', 'warning');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Uploading...';

      try {
        // Step 1: Upload file to Supabase Storage
        showToast('Uploading file to storage...', 'info');
        const mediaUrl = await Media.uploadFile(file);
        
        if (!mediaUrl) {
          throw new Error('File upload to storage failed. Bucket might be private or Supabase connection issue.');
        }

        // Warn if on file:// protocol
        if (window.location.protocol === 'file:') {
          console.warn('⚠️ File:// protocol detected. Public URLs from Supabase might be blocked by some browsers.');
        }

        showToast('File uploaded! Saving to database...', 'info');

        // Step 2: Save metadata to database
        const metadata = {
          title: title,
          description: document.getElementById('upload-description').value.trim(),
          media_url: mediaUrl,
          type: document.getElementById('upload-type').value,
          category: document.getElementById('upload-category').value,
          featured: document.getElementById('upload-featured').checked
        };

        const result = await Media.create(metadata);

        if (result) {
          showToast('✅ SUCCESS: "' + title + '" is now live!', 'success');
          // Only reset form on actual success
          form.reset();
          document.getElementById('upload-preview').classList.remove('active');
          document.getElementById('upload-preview').innerHTML = '';
          
          // Force immediate refresh of all components
          await this.loadMediaTable();
          await this.loadDashboard();
        } else {
          showToast('Database error: File uploaded but metadata failed to save.', 'error');
        }
      } catch (err) {
        console.error('Upload error:', err);
        showToast('❌ Upload failed: ' + err.message, 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  },

  // Load media grid for management
  async loadMediaTable() {
    const gridBody = document.getElementById('media-grid-body');
    if (!gridBody) return;

    this.allMedia = await Media.fetchAll();

    if (this.allMedia.length === 0) {
      gridBody.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: var(--space-20);">
          <div class="empty-state__icon">📁</div>
          <h3 class="empty-state__title">No media yet</h3>
          <p class="empty-state__desc">Upload your first image or video in the "Upload Media" tab!</p>
        </div>
      `;
      return;
    }

    gridBody.innerHTML = this.allMedia.map((item, index) => `
      <div class="media-card" data-id="${item.id}" style="animation: heroFadeIn 0.4s ease both; animation-delay: ${index * 0.05}s">
        <div class="media-card__preview">
          ${item.type === 'image' 
            ? `<img src="${item.media_url}" alt="${this.escapeHTML(item.title)}" loading="lazy">` 
            : `<video src="${item.media_url}" muted preload="metadata"></video>`
          }
        </div>
        <div class="media-card__actions">
          <button class="btn btn--sm" onclick="Admin.editMedia('${item.id}')" style="background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); border: 1px solid var(--admin-border);">✏️</button>
          <button class="btn btn--sm" onclick="Admin.deleteMedia('${item.id}')" style="background: rgba(220, 38, 38, 0.6); backdrop-filter: blur(5px); border: 1px solid rgba(220, 38, 38, 0.2);">🗑️</button>
        </div>
        <div class="media-card__content">
          <div class="media-card__title">${this.escapeHTML(item.title)}</div>
          <div class="media-card__meta">
            <span class="badge ${item.category === 'ahm' || item.category === 'teacher' ? 'badge--blue' : 'badge--green'}">${item.category}</span>
            <div style="display: flex; align-items: center; gap: 8px;">
               <span style="font-size: 10px;">FEATURED</span>
               <label class="toggle">
                <input type="checkbox" ${item.featured ? 'checked' : ''} onchange="Admin.toggleFeatured('${item.id}', ${item.featured})">
                <span class="toggle__slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.ScrollAnimations) ScrollAnimations.observe();
  },

  // Toggle featured status
  async toggleFeatured(id, currentStatus) {
    await Media.toggleFeatured(id, currentStatus);
  },

  // Edit media (show modal)
  async editMedia(id) {
    const item = this.allMedia.find(m => m.id === id);
    if (!item) return;

    const modal = document.getElementById('edit-modal');
    if (!modal) return;

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-title').value = item.title;
    document.getElementById('edit-description').value = item.description || '';
    document.getElementById('edit-category').value = item.category;
    document.getElementById('edit-featured').checked = item.featured;

    modal.classList.add('active');
  },

  // Save edit
  async saveEdit() {
    const id = document.getElementById('edit-id').value;
    const updates = {
      title: document.getElementById('edit-title').value.trim(),
      description: document.getElementById('edit-description').value.trim(),
      category: document.getElementById('edit-category').value,
      featured: document.getElementById('edit-featured').checked
    };

    if (!updates.title) {
      showToast('Title is required', 'warning');
      return;
    }

    await Media.update(id, updates);
    document.getElementById('edit-modal').classList.remove('active');
  },

  // Delete media
  async deleteMedia(id) {
    if (!confirm('Are you sure you want to delete this media? This cannot be undone.')) {
      return;
    }

    await Media.delete(id);
  },

  // Animate counter
  animateCounter(element, start, end) {
    const duration = 800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      element.textContent = Math.round(start + (end - start) * eased);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  },

  // Escape HTML
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
};
