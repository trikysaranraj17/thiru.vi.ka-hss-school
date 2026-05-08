/**
 * TEACHERS.JS — Dynamic Faculty Loading (V2 - Single Page)
 * Fetches faculty by category and renders them in separate sections.
 */

const Teachers = {
  async init() {
    this.ahmGrid = document.querySelector('#grid-ahm');
    this.teacherGrid = document.querySelector('#grid-teachers');
    this.petGrid = document.querySelector('#grid-pet');
    this.officeGrid = document.querySelector('#grid-office');
    
    // Safety check - we might be on a different page
    if (!this.ahmGrid && !this.teacherGrid) return;

    this.setupFilters();
    this.renderLoading();

    try {
      // Fetch categories
      const [ahmList, teacherList, petList, officeList] = await Promise.all([
        Media.fetchAll({ category: 'ahm' }),
        Media.fetchAll({ category: 'teacher' }),
        Media.fetchAll({ category: 'pet' }),
        Media.fetchAll({ category: 'office' })
      ]);

      // Always show defaults first, then append DB items
      this.renderFaculty(ahmList, teacherList, petList, officeList);
      
    } catch (err) {
      console.error('Faculty load error:', err);
      this.renderDefaults();
    }
  },

  setupFilters() {
    const btns = document.querySelectorAll('.faculty-filter__btn');
    const sections = document.querySelectorAll('.section-group');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        
        // Update buttons
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update sections
        sections.forEach(s => {
          s.classList.remove('active');
          if (s.id === targetId) s.classList.add('active');
        });
      });
    });
  },

  renderLoading() {
    const skeleton = `
      <div class="glass-card" style="padding: 0; overflow: hidden; height: 450px;">
        <div class="skeleton skeleton--image" style="height: 350px; background: rgba(255,255,255,0.05);"></div>
        <div style="padding: var(--space-6);">
          <div class="skeleton skeleton--title" style="width: 70%; margin-bottom: 10px; height: 20px; background: rgba(255,255,255,0.05);"></div>
          <div class="skeleton skeleton--text" style="width: 40%; height: 15px; background: rgba(255,255,255,0.05);"></div>
        </div>
      </div>
    `;
    if (this.ahmGrid) this.ahmGrid.innerHTML = skeleton.repeat(2);
    if (this.teacherGrid) this.teacherGrid.innerHTML = skeleton.repeat(3);
    if (this.petGrid) this.petGrid.innerHTML = skeleton.repeat(1);
    if (this.officeGrid) this.officeGrid.innerHTML = skeleton.repeat(1);
  },

  renderFaculty(ahmList, teacherList, petList, officeList) {
    const sections = [
      { grid: this.ahmGrid, list: ahmList, type: 'ahm' },
      { grid: this.teacherGrid, list: teacherList, type: 'teacher' },
      { grid: this.petGrid, list: petList, type: 'pet' },
      { grid: this.officeGrid, list: officeList, type: 'office' }
    ];

    sections.forEach(section => {
      if (section.grid) {
        section.grid.innerHTML = '';
        if (section.list.length === 0) {
          this.renderGroupDefaults(section.grid, section.type);
        } else {
          section.list.forEach((member, i) => {
            section.grid.appendChild(this.createCard(member, i));
          });
        }
      }
    });

    // Re-initialize animations
    if (window.ScrollAnimations) ScrollAnimations.observe();
  },

  createCard(member, index) {
    const div = document.createElement('div');
    div.className = 'teacher-card';
    
    // Extract parts from description if formatted as: Subject | Classes
    const parts = (member.description || '').split('|').map(s => s.trim());
    const subjectRaw = parts[0] || 'Faculty';
    const classesRaw = parts[1] || 'Primary/Secondary';

    // Simple translation helper for common subjects/roles
    const translate = (text) => {
      if (!text) return text;
      const key = 'faculty.' + text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      if (typeof I18n !== 'undefined' && I18n.translations[key]) {
        return I18n.translations[key][I18n.currentLang] || text;
      }
      return text;
    };

    const subject = translate(subjectRaw);
    const classes = translate(classesRaw);
    const name = translate(member.title);

    div.innerHTML = `
      <div class="teacher-card__img-wrapper">
        <img src="${member.media_url}" alt="${member.title}" class="teacher-card__img" loading="lazy" onerror="this.src='assets/logo.jpg'">
      </div>
      <div class="teacher-card__content">
        <h3 class="teacher-card__name">${name}</h3>
        <div class="teacher-card__subject">${subject}</div>
        <div class="teacher-card__info">
          <span>📚</span>
          <span>${classes}</span>
        </div>
      </div>
    `;
    return div;
  },

  renderGroupDefaults(container, type) {
    const defaults = [
      { name: 'Mr. Paul Rajendaran', sub: 'English', cls: '6-10th Incharge (AHM)', img: 'assets/faculty/paul_rajendaran.jpg', type: 'ahm' },
      { name: 'Mr. Arul', sub: 'English', cls: 'Higher Secondary Incharge (AHM)', img: 'assets/faculty/arul.jpg', type: 'ahm' },
      { name: 'Mr. Ajith Kumar', sub: 'Business Maths & Maths', cls: '6-12th Standard', img: 'assets/faculty/ajith_kumar.jpg', type: 'teacher' },
      { name: 'Mrs. Jayasudha', sub: 'Tamil', cls: 'Higher Secondary', img: 'assets/faculty/jayasudha.jpg', type: 'teacher' },
      { name: 'Mrs. Sulochana', sub: 'Social Science & Economics', cls: '6-12th Standard', img: 'assets/faculty/sulochana.jpg', type: 'teacher' }
    ];

    defaults.filter(m => m.type === type).forEach((m, i) => {
      const card = this.createCard({ 
        title: m.name, 
        media_url: m.img, 
        description: `${m.sub} | ${m.cls}` 
      }, i);
      container.appendChild(card);
    });
  },

  renderDefaults() {
    if (this.ahmGrid) this.renderGroupDefaults(this.ahmGrid, 'ahm');
    if (this.teacherGrid) this.renderGroupDefaults(this.teacherGrid, 'teacher');
    if (this.petGrid) this.renderGroupDefaults(this.petGrid, 'pet');
    if (this.officeGrid) this.renderGroupDefaults(this.officeGrid, 'office');
  }
};
