import os

def fix_file(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    # Precise replacements for garbled characters seen in screenshots
    replacements = {
        'ðŸŽ”': '',
        'ðŸ”': '',
        'ðŸ¤': '',
        'ðŸ"': '',
        'ðŸ\'': '',
        'Ã°Å¸Â â€ ': '🏛️',
        'Ã¢â‚¬â€': '—',
        'Ã¢â€ â€¹': '↓',
        'Ã¢â€ â€œ': '↓',
        'A,?o': '🏛️',
        'A,?oA,': '🎥',
        'A?': '🎓',
        'dYZ_': '🚀',
        'dY"-': '👁️',
        'dY? +': '✨',
        'dY"?': '📍',
        'dY"z': '📞',
        'o%,?': '✉️'
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # Ensure leadership images are fully visible (un-zoom)
    content = content.replace('class="leadership-card__img"', 'class="leadership-card__img" style="object-fit: contain;"')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Fix both main pages
fix_file('c:/anti db/index.html')
fix_file('c:/anti db/about.html')

# Re-read index to add Joint Secretary correctly
with open('c:/anti db/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Restore missing leadership structure if it got deleted
if 'id="leadership"' not in content:
    leadership_block = """
  <!-- ─── LEADERSHIP TABS SECTION ─── -->
  <section class="section" id="leadership">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-header__tagline">Guiding Light</span>
        <h2 class="section-header__title">Our <span>Visionaries</span></h2>
        <p class="section-header__desc">The dedicated individuals who have shaped our institution's legacy.</p>
      </div>

      <div class="tabs-container reveal" style="transition-delay: 0.2s;">
        <!-- Tab Navigation -->
        <div class="tabs-nav" id="leadership-tabs">
          <button class="tab-btn active" data-target="tab-president" data-i18n="home.president">President</button>
          <button class="tab-btn" data-target="tab-correspondent" data-i18n="home.correspondent">Correspondent</button>
          <button class="tab-btn" data-target="tab-joint-secretary">Joint Secretary</button>
          <button class="tab-btn" data-target="tab-headmaster" data-i18n="home.headmistress">Headmistress</button>
        </div>

        <div class="tabs-content">
"""
    content = content.replace('</section>', '</section>' + leadership_block, 1)

# Add Joint Secretary Panel if missing
if 'id="tab-joint-secretary"' not in content:
    js_panel = """
          <!-- 2.5 Joint Secretary -->
          <div class="tab-content" id="tab-joint-secretary">
            <div class="leadership-card">
              <div class="leadership-card__img-wrapper">
                <img src="assets/leadership/joint_secretary.jpg" alt="Joint Secretary Mr. Seran"
                  class="leadership-card__img" style="object-fit: contain;" loading="lazy">
              </div>
              <div class="leadership-card__body">
                <div class="leadership-card__role">Joint Secretary</div>
                <h3 class="leadership-card__name">Mr. Seran</h3>
                <p class="leadership-card__desc">A dedicated administrator and visionary leader committed to the educational advancement of our institution. Mr. Seran works collaboratively with the board to ensure excellence in all school operations and student development initiatives.</p>
              </div>
            </div>
          </div>
"""
    # Insert before Headmistress
    content = content.replace('<!-- 3. Headmistress -->', js_panel + '<!-- 3. Headmistress -->')

with open('c:/anti db/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update layout.css for Hero sizing
with open('c:/anti db/css/layout.css', 'r', encoding='utf-8') as f:
    style = f.read()
style = style.replace('height: 60vh;', 'height: 50vh; aspect-ratio: 16 / 9;').replace('object-fit: cover;', 'object-fit: contain;')
with open('c:/anti db/css/layout.css', 'w', encoding='utf-8') as f:
    f.write(style)
