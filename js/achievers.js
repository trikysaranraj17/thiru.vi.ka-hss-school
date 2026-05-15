/**
 * ACHIEVERS.JS â€” Dynamic Results & Achievements
 * Fetches result posters from Supabase and renders them on the homepage
 */

const Achievers = {
  async init() {
    this.container = document.getElementById('achievers-grid');
    if (!this.container) return;

    try {
      const results = await Media.fetchAll({ category: 'achiever' });
      this.renderAchievers(results);
    } catch (err) {
      console.error('Achievers load error:', err);
      this.renderAchievers([]); // This will trigger default posters
    }
  },

  renderAchievers(results) {
    if (!this.container) return;

    if (!results || results.length === 0) {
      // Show high-quality result posters (10th & 12th)
      this.container.innerHTML = `<div class=\"achiever-card\" style=\"grid-column: 1 / -1; max-width: 800px; margin: 0 auto; min-height: 400px; border: 2px solid var(--color-gold-vivid);\"><img src=\"assets/result_12.jpg\" alt=\"12th Public Exam Results\" class=\"achiever-card__img\" style=\"object-fit: contain; width: 100%; height: 100%; background: #fff;\"></div>`;
      if (window.ScrollAnimations) ScrollAnimations.observe();
      return;
    }

    this.container.innerHTML = results.map((item, index) => `
      <div class="achiever-card">
        <img src="${item.media_url}" alt="${item.title}" class="achiever-card__img" onerror="this.src='assets/logo.jpg'">
        ${item.title ? `<div class="achiever-card__overlay"><h3>${item.title}</h3></div>` : ''}
      </div>
    `).join('');

    if (window.ScrollAnimations) ScrollAnimations.observe();
  }
};


