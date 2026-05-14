import re

def update_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Warning: Could not find text in {filepath}")
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# INDEX.HTML UPDATES
index_replacements = [
    (
        '''<a href="contact.html#reviews" class="btn btn--outline btn--lg" data-i18n="home.rate_us">Rate Us</a>''',
        '''<a href="contact.html#reviews" class="btn btn--outline btn--lg" data-i18n="home.rate_us">Rate Us</a>
        <a href="https://www.youtube.com/@thiruvika-1955" target="_blank" class="btn btn--outline btn--lg" style="color: #ff0000; border-color: #ff0000; display: inline-flex; align-items: center; gap: 8px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Our Channel
        </a>
        <a href="https://www.instagram.com/thiru.vi.ka_1955?utm_source=qr&igsh=MnRxYXhjenNsZW5i" target="_blank" class="btn btn--outline btn--lg" style="color: #e1306c; border-color: #e1306c; display: inline-flex; align-items: center; gap: 8px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          Our Page
        </a>'''
    ),
    (
        '''<button class="tab-btn" data-target="tab-past-headmaster" data-i18n="about.former_hm">Former Head Master</button>''',
        ''''''
    ),
    (
        '''<!-- 4. Former Headmaster -->
          <div class="tab-content" id="tab-past-headmaster">
            <div class="leadership-card">
              <div class="leadership-card__img-wrapper">
                <img src="assets/leadership/previous_hm.jpg" alt="Former Headmaster Mr. John"
                  class="leadership-card__img" loading="lazy" onerror="this.src='assets/logo.jpg'">
              </div>
              <div class="leadership-card__body">
                <div class="leadership-card__role" data-i18n="about.former_hm_span">Former Headmaster</div>
                <h3 class="leadership-card__name">Mr. John</h3>
                <p class="leadership-card__desc">A cornerstone of our institution's 70-year legacy. Mr. John served with
                  unprecedented dedication, fostering an environment where discipline met academic brilliance. His
                  leadership remains the standard by which we measure our progress today.</p>
              </div>
            </div>
          </div>''',
        ''''''
    ),
    (
        '''<h3 class="leadership-card__name" data-i18n="home.president_name">Vedhagiri Shanmugam Sundaranar</h3>
                <p class="leadership-card__desc" data-i18n="home.president_desc">A visionary leader whose guiding principles laid the ultimate
                  foundation for Thiru.Vi.Ka. Higher Secondary School. His lifelong dedication to accessible education
                  has shaped the institution into a beacon of knowledge, moral excellence, and community growth. With a
                  resolute commitment to student empowerment, his legacy endures in every classroom and corridor.</p>''',
        '''<h3 class="leadership-card__name">Dr. G Viswanathan</h3>
                <div class="leadership-card__desc" style="text-align: left; font-size: 0.9rem;">
                  <details style="cursor: pointer; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; border: 1px solid var(--border-glass);">
                    <summary style="font-weight: bold; color: var(--color-gold-vivid);">Chancellor, VIT University & More (View Credentials)</summary>
                    <ul style="margin-top: 10px; padding-left: 20px; color: var(--text-secondary); list-style-type: disc; display: flex; flex-direction: column; gap: 5px;">
                      <li>Chancellor, VIT University, Vellore</li>
                      <li>Chancellor, VIT University, Chennai</li>
                      <li>Chancellor, VIT-AP University, Amaravati</li>
                      <li>Chancellor, VIT Bhopal University, Bhopal</li>
                      <li>Chairman & Managing Trustee, North Arcot Educational and Charitable Trust, Vellore</li>
                      <li>President, Friends of United States</li>
                      <li>Executive President, The Centenarian Trust, Chennai</li>
                      <li>Vice President, Thiru Vi Ka – Dr. Mu. Va. Educational Trust, Chennai</li>
                      <li>President, Universal Higher Education Trust, Vellore (NGO)</li>
                      <li>President, Indian Economic Association (IEA)</li>
                      <li>President, Education Promotion Society of India (EPSI)</li>
                      <li>President, North Arcot District Tuluva Vellala Association</li>
                    </ul>
                  </details>
                </div>'''
    ),
    (
        '''<div class="achiever-card">
          <img src="assets/bg_statue_v2.jpg" alt="Thiruvalluvam Statue" class="achiever-card__img"
            style="object-fit: cover;">
          <div class="achiever-card__overlay">
            <h3>Cultural Heritage</h3>
          </div>
        </div>
        <div class="achiever-card">
          <img src="assets/bg_students_v2.jpg" alt="NCC Cadets" class="achiever-card__img" style="object-fit: cover;">
          <div class="achiever-card__overlay">
            <h3>NCC & Discipline</h3>
          </div>
        </div>''',
        '''<div class="achiever-card" style="grid-column: 1 / -1; max-width: 800px; margin: 0 auto;">
          <img src="assets/result_12.jpg" alt="12th Standard Achievers" class="achiever-card__img" style="object-fit: contain;">
        </div>'''
    )
]

# ABOUT.HTML UPDATES
about_replacements = [
    (
        '''<!-- Former Head Master -->
          <div class="glass-card text-center reveal" style="padding: var(--space-8);">
            <div class="hm-glow-container" style="--glow-color: rgba(255, 255, 255, 0.2);">
              <img src="assets/leadership/previous_hm.jpg" alt="Former Head Master" class="hm-photo"
                style="width: 200px; height: 200px; border-radius: 50%; border-color: var(--text-muted); box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);"
                onerror="this.src='assets/logo.jpg'">
            </div>
            <h3 class="section-header__title" data-i18n-html="about.former_hm"
              style="font-size: var(--text-2xl); margin-top: var(--space-4); color: var(--text-secondary); white-space: nowrap;">Former <span>Headmaster</span>
            </h3>
            <p class="leader-card__role"
              style="font-size: var(--text-base); color: var(--text-muted); font-weight: 800; margin-bottom: var(--space-4);">
              A Legacy of Inspiration</p>
            <p class="section-header__desc" data-i18n="about.former_hm_desc" style="font-size: var(--text-sm); line-height: 1.8;">
              Through unwavering dedication, our Former Head Master laid the strong foundations upon which
              this institution stands today. His exceptional contributions have shaped the lives of countless
              alumni and established our tradition of excellence.
            </p>
          </div>''',
        ''''''
    ),
    (
        '''<div class="grid--2 stagger-children" style="margin-top: var(--space-12);">''',
        '''<div class="grid stagger-children" style="margin-top: var(--space-12); display: flex; justify-content: center;">'''
    )
]

update_file('c:/anti db/index.html', index_replacements)
update_file('c:/anti db/about.html', about_replacements)
print("Done!")
