import os
import re

def fix_html(file_path):
    print(f"Fixing {file_path}")
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Update stats in index.html
    if 'index.html' in file_path:
        content = content.replace('data-count-to="98"', 'data-count-to="91"')

    # 2. Add Joint Secretary in index.html
    if 'index.html' in file_path and 'tab-joint-secretary' not in content:
        print("Adding Joint Secretary panel...")
        content = content.replace('<button class="tab-btn" data-target="tab-correspondent" data-i18n="home.correspondent">Correspondent</button>', 
                                 '<button class="tab-btn" data-target="tab-correspondent" data-i18n="home.correspondent">Correspondent</button><button class="tab-btn" data-target="tab-joint-secretary">Joint Secretary</button>')
        
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
        if '<!-- 3. Headmistress -->' in content:
            content = content.replace('<!-- 3. Headmistress -->', js_panel + '<!-- 3. Headmistress -->')
        elif 'id="tab-correspondent"' in content:
            # Fallback insertion
            print("Fallback insertion for JS panel")
            content = re.sub(r'(?s)(<div class="tab-content" id="tab-correspondent">.*?</div>\s*</div>)', r'\1' + js_panel, content)

    # 3. Remove Google Reviews in index.html
    if 'index.html' in file_path:
        print("Removing Google Reviews...")
        content = re.sub(r'(?s)<section class="section" id="testimonials">.*?</section>', '', content)

    # 4. Clean corrupted characters
    print("Cleaning corrupted characters...")
    replacements = {
        'Ã°Å¸Â â€ ': '🏛️',
        'Ã¢â‚¬â€': '—',
        'Ã¢â€ â€¹': '↓',
        'Ã¢â€ â€œ': '↓',
        'dYZ"': '🏛️',
        'dY",': '🎥',
        'dY ?': '🎓',
        'ðŸŽ”': '🏛️',
        'ðŸ”': '🎥',
        'ðŸ¤': '🎓',
        'ðŸ"': '',
        'ðŸ\'': '',
        'A.?o': '🏛️',
        'A.?oA,': '🎥',
        'A.?\\?': '🎓'
    }
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # Global un-zoom fix
    content = content.replace('class="leadership-card__img"', 'class="leadership-card__img" style="object-fit: contain;"')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_css(file_path):
    print(f"Fixing {file_path}")
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    content = content.replace('height: 60vh;', 'height: 50vh; aspect-ratio: 16 / 9;').replace('object-fit: cover;', 'object-fit: contain;')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    fix_html('c:/anti db/index.html')
    fix_html('c:/anti db/about.html')
    fix_css('c:/anti db/css/layout.css')
    print("All fixes applied successfully!")
