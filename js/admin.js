/**
 * ADMIN.JS - Core Administrative Logic (V2.1 - Clean Build)
 */

const Admin = {
  selectedFile: null,

  // Initialization
  async init() {
    console.log("Admin Panel Initializing...");
    
    try {
      const client = getSupabase();
      if (!client) {
        console.error("Supabase client not found. Check config.js");
        return;
      }

      const user = await Auth.getUser();
      if (!user) {
        this.showLogin();
        return;
      }

      this.showPanel(user);
      
      this.setupUploadArea();
      this.setupUploadForm();
      this.setupSidebar();
      
      this.loadDashboard();
      this.loadMediaTable();

      window.addEventListener('mediaChange', () => {
        this.loadDashboard();
        this.loadMediaTable();
      });

    } catch (err) {
      console.error("Critical Admin Init Error:", err);
    }
  },

  showLogin() {
    const loginScreen = document.getElementById('login-screen');
    const adminPanel = document.getElementById('admin-panel');
    if (loginScreen) loginScreen.style.display = 'flex';
    if (adminPanel) adminPanel.style.display = 'none';
  },

  showPanel(user) {
    const loginScreen = document.getElementById('login-screen');
    const adminPanel = document.getElementById('admin-panel');
    
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminPanel) adminPanel.style.display = 'block';
    
    document.querySelectorAll('[data-auth="user-name"]').forEach(el => el.textContent = user.user_metadata?.full_name || user.email);
    document.querySelectorAll('[data-auth="user-email"]').forEach(el => el.textContent = user.email);
    document.querySelectorAll('[data-auth="user-avatar"]').forEach(el => {
       el.src = user.user_metadata?.avatar_url || 'assets/logo.jpg';
       el.style.display = 'block';
    });
  },

  setupSidebar() {
    const links = document.querySelectorAll('.admin-sidebar__link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const section = link.dataset.section;
        if (section) {
          e.preventDefault();
          this.switchSection(section);
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });
  },

  switchSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
      section.style.display = section.id === `section-${sectionId}` ? 'block' : 'none';
    });
  },

  async loadDashboard() {
    try {
      const { data, error } = await getSupabase().from('media').select('type');
      const stats = {
        total: (data || []).length,
        images: (data || []).filter(m => m.type === 'image').length,
        videos: (data || []).filter(m => m.type === 'video').length
      };

      const t = document.getElementById('stat-total');
      const i = document.getElementById('stat-images');
      const v = document.getElementById('stat-videos');
      
      if (t) this.animateCounter(t, 0, stats.total);
      if (i) this.animateCounter(i, 0, stats.images);
      if (v) this.animateCounter(v, 0, stats.videos);
    } catch (err) {
      console.error("Dashboard stats error:", err);
    }
  },

  async loadMediaTable() {
    const container = document.getElementById('media-grid-body');
    if (!container) return;

    container.innerHTML = '<div class="spinner"></div>';

    try {
      const data = await Media.fetchAll();
      if (!data || data.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No media found.</p>';
        return;
      }

      container.innerHTML = data.map(item => `
        <div class="glass-card media-manage-card">
          <div class="media-manage-card__preview">
            ${item.type === 'image' 
              ? `<img src="${item.media_url}" alt="${item.title}" onerror="this.src='assets/logo.jpg'">` 
              : `<video src="${item.media_url}" muted></video>`}
          </div>
          <div class="media-manage-card__info">
            <h4 style="font-size: 14px; margin-bottom: 4px;">${item.title || 'Untitled'}</h4>
            <span class="badge badge--gold" style="font-size: 10px;">${item.category}</span>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="btn btn--sm btn--primary" onclick="Admin.editMedia('${item.id}')">Edit</button>
              <button class="btn btn--sm btn--danger" onclick="Admin.deleteMedia('${item.id}')">Delete</button>
            </div>
          </div>
        </div>
      `).join('');
    } catch (err) {
      container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
    }
  },

  setupUploadArea() {
    const area = document.getElementById('upload-area');
    const input = document.getElementById('upload-file');
    if (!area || !input) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => {
      area.addEventListener(name, (e) => { e.preventDefault(); e.stopPropagation(); });
    });

    area.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length) { input.files = files; this.handleFileSelect(files[0]); }
    });

    input.addEventListener('change', (e) => {
      if (input.files.length) this.handleFileSelect(input.files[0]);
    });
  },

  handleFileSelect(file) {
    this.selectedFile = file;
    const preview = document.getElementById("upload-preview");
    const titleInput = document.getElementById("upload-title");
    
    if (titleInput && !titleInput.value) titleInput.value = file.name.split(".")[0];
    if (!preview) return;

    preview.innerHTML = "";
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.maxHeight = "200px";
      img.style.borderRadius = "8px";
      preview.appendChild(img);
    } else {
      preview.innerHTML = `<div style="padding: 20px;">Video: ${file.name}</div>`;
    }
    preview.style.display = "block";
  },

  setupUploadForm() {
    const form = document.getElementById('upload-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Uploading...';

      try {
        const file = this.selectedFile || document.getElementById('upload-file').files[0];
        if (!file) throw new Error("Please select a file first");

        const publicUrl = await Media.uploadFile(file);
        if (!publicUrl) throw new Error("Upload failed");

        await Media.create({
          title: document.getElementById('upload-title').value,
          category: document.getElementById('upload-category').value,
          description: document.getElementById('upload-description').value,
          type: document.getElementById('upload-type').value,
          featured: document.getElementById('upload-featured').checked,
          media_url: publicUrl
        });

        alert("✅ Upload successful!");
        form.reset();
        this.selectedFile = null;
        document.getElementById('upload-preview').innerHTML = '';
        this.switchSection('manage');
        this.loadMediaTable();
        this.loadDashboard();
      } catch (err) {
        alert('❌ Upload failed: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = '📤 Upload';
      }
    });
  },

  async editMedia(id) {
    try {
      const data = await Media.fetchOne(id);
      document.getElementById('edit-id').value = data.id;
      document.getElementById('edit-title').value = data.title;
      document.getElementById('edit-description').value = data.description || '';
      document.getElementById('edit-category').value = data.category;
      document.getElementById('edit-featured').checked = data.featured;
      document.getElementById('edit-modal').classList.add('active');
    } catch (err) {
      alert("Error: " + err.message);
    }
  },

  async saveEdit() {
    try {
      const id = document.getElementById('edit-id').value;
      const updates = {
        title: document.getElementById('edit-title').value,
        description: document.getElementById('edit-description').value,
        category: document.getElementById('edit-category').value,
        featured: document.getElementById('edit-featured').checked
      };
      await Media.update(id, updates);
      document.getElementById('edit-modal').classList.remove('active');
      this.loadMediaTable();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  },

  async deleteMedia(id) {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      await Media.delete(id);
      this.loadMediaTable();
      this.loadDashboard();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  },

  animateCounter(el, start, end) {
    let current = start;
    const duration = 1000;
    const range = end - start;
    if (range === 0) { el.textContent = end; return; }
    const stepTime = Math.abs(Math.floor(duration / (range || 1)));
    const timer = setInterval(() => {
      current += (end > start ? 1 : -1);
      el.textContent = current;
      if (current == end) clearInterval(timer);
    }, Math.max(stepTime, 20));
  }
};

// Start the engine
document.addEventListener('DOMContentLoaded', () => {
  Admin.init();
});
