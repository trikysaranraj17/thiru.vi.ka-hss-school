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

    this.renderLoading();

    try {
      // Fetch categories in parallel for speed
      const [ahmList, teacherList, petList, officeList] = await Promise.all([
        Media.fetchAll({ category: 'ahm' }),
        Media.fetchAll({ category: 'teacher' }),
        Media.fetchAll({ category: 'pet' }),
        Media.fetchAll({ category: 'office' })
      ]);

      // If all lists are empty, it might be a DB issue or initial setup
      if (ahmList.length === 0 && teacherList.length === 0 && petList.length === 0 && officeList.length === 0) {
        console.warn('No faculty found in database, using high-quality fallbacks');
        this.renderDefaults();
      } else {
        this.renderFaculty(ahmList, teacherList, petList, officeList);
      }
    } catch (err) {
      console.error('Faculty load error:', err);
      this.renderDefaults();
    }
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
    const subject = parts[0] || 'Faculty';
    const classes = parts[1] || 'Primary/Secondary';

    div.innerHTML = `
      <div class="teacher-card__img-container">
        <img src="${member.media_url}" alt="${member.title}" class="teacher-card__img" loading="lazy" onerror="this.src='assets/logo.jpg'">
      </div>
      <div class="teacher-card__info">
        <h3 class="teacher-card__name">${member.title}</h3>
        <div class="teacher-card__subject">${subject}</div>
        <div class="teacher-card__classes">${classes}</div>
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
