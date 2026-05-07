// =============================================================
// I18N.JS - Bilingual Translation System (English / Tamil)
// =============================================================
console.log('I18n System Loading...');

const I18n = {
  currentLang: 'en',
  
  translations: {
    // --- NAVBAR ---
    'nav.home': { en: 'Home', ta: 'முகப்பு' },
    'nav.about': { en: 'About', ta: 'பற்றி' },
    'nav.history': { en: 'History', ta: 'வரலாறு' },
    'nav.faculty': { en: 'Faculty', ta: 'ஆசிரியர்கள்' },
    'nav.gallery': { en: 'Gallery', ta: 'கேலரி' },
    'nav.alumni': { en: 'Alumni', ta: 'பழைய மாணவர்' },
    'nav.contact': { en: 'Contact', ta: 'தொடர்பு' },

    // --- FOOTER ---
    'footer.desc': { 
      en: 'Thiru.Vi.Ka. Higher Secondary School, Shenoy Nagar, Chennai. Nurturing young minds since 1955 with dedication and excellence.', 
      ta: 'திரு.வி.க. மேல்நிலைப்பள்ளி, ஷீனாய் நகர், சென்னை. 1955 முதல் அர்ப்பணிப்புடனும் சிறப்புடனும் இளம் மனங்களை வளர்க்கிறது.' 
    },
    'footer.quick_links': { en: 'Quick Links', ta: 'விரைவு இணைப்புகள்' },
    'footer.pages': { en: 'Pages', ta: 'பக்கங்கள்' },
    'footer.contact': { en: 'Contact', ta: 'தொடர்பு' },
    'footer.admin': { en: 'Admin Portal', ta: 'நிர்வாக பக்கம்' },
    'footer.copyright': { en: '2024 Thiru.Vi.Ka. Higher Secondary School. All rights reserved.', ta: '2024 திரு.வி.க. மேல்நிலைப்பள்ளி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' },
    'footer.built': { en: 'Built with love for education', ta: 'கல்விக்காக உருவாக்கப்பட்டது' },

    // --- HOME PAGE ---
    'home.since': { en: 'SINCE 1955 - CHENNAIS PRIDE', ta: '1955 முதல் - சென்னையின் பெருமை' },
    'home.title1': { en: 'Thiru.Vi.Ka.', ta: 'திரு.வி.க.' },
    'home.title2': { en: 'Higher Secondary School', ta: 'மேல்நிலைப்பள்ளி' },
    'home.hero_title': { 
      en: 'Thiru.Vi.Ka.<br><span class="highlight">Higher Secondary School</span>', 
      ta: 'திரு.வி.க.<br><span class="highlight">மேல்நிலைப்பள்ளி</span>' 
    },
    'home.established': { en: 'Established 1955 - Celebrating 70 Years', ta: '1955 இல் நிறுவப்பட்டது - 70 ஆண்டுகளைக் கொண்டாடுகிறது' },
    'home.desc': { 
      en: 'Nurturing young minds with excellence, discipline, and values for over 70 years in the heart of Chennai.', 
      ta: 'சென்னையின் மையத்தில் 70 ஆண்டுகளுக்கும் மேலாக சிறப்பு, ஒழுக்கம் மற்றும் பண்புகளுடன் இளம் மனங்களை வளர்க்கிறது.' 
    },
    'home.explore': { en: 'Explore Our Legacy', ta: 'எங்கள் பாரம்பரியத்தை ஆராயுங்கள்' },
    'home.contact': { en: 'Contact Us', ta: 'எங்களை தொடர்புகொள்ள' },
    'home.scroll': { en: 'Scroll to explore', ta: 'மேலும் அறிய உருட்டவும்' },
    'home.featured_tag': { en: 'Showcase', ta: 'கண்காட்சி' },
    'home.featured_title_full': { en: 'Featured <span>Highlights</span>', ta: 'சிறப்புத் <span>தருணங்கள்</span>' },
    'home.featured_desc': { en: 'Highlights from our school events and achievements, updated in real-time.', ta: 'எங்கள் பள்ளி நிகழ்வுகள் மற்றும் சாதனைகளின் முக்கிய அம்சங்கள்.' },
    'home.stats_tag': { en: 'Our Legacy', ta: 'எங்கள் பாரம்பரியம்' },
    'home.stats_title_full': { en: 'Numbers That <span>Speak</span>', ta: 'பேசும் <span>எண்கள்</span>' },
    'home.stats_desc': { en: 'Decades of commitment to academic excellence and holistic development.', ta: 'கல்விச் சிறப்பு மற்றும் முழுமையான வளர்ச்சிக்கான பல தசாப்த கால அர்ப்பணிப்பு.' },
    'home.stat_years': { en: 'Years of Excellence', ta: 'ஆண்டுகள் சிறப்பு' },
    'home.stat_students': { en: 'Students Educated', ta: 'மாணவர்கள் கல்வி பெற்றனர்' },
    'home.stat_teachers': { en: 'Expert Faculty', ta: 'திறமையான ஆசிரியர்கள்' },
    'home.stat_pass': { en: 'Pass Rate', ta: 'தேர்ச்சி விகிதம்' },
    'home.leadership_tag': { en: 'Leadership', ta: 'தலைமை' },
    'home.leadership_title': { en: 'Guided by Vision', ta: 'வழிநடத்தும் நோக்கு' },
    'home.headmistress': { en: 'Headmistress', ta: 'தலைமை ஆசிரியை' },
    'home.headmistress_role': { en: 'Leading with Vision & Excellence', ta: 'நோக்கு மற்றும் சிறப்புடன் தலைமை' },
    'home.correspondent': { en: 'Correspondent', ta: 'நிருபர்' },
    'home.president': { en: 'School President', ta: 'பள்ளி தலைவர்' },
    'home.achievers_tag': { en: 'Achievements', ta: 'சாதனைகள்' },
    'home.achievers_title_full': { en: 'Our <span>Achievements</span>', ta: 'எங்கள் <span>சாதனைகள்</span>' },
    'home.achievers_desc': { en: 'Celebrating 70 years of outstanding academic and co-curricular success.', ta: '70 ஆண்டுகால சிறந்த கல்வி மற்றும் இணை பாடத்திட்ட வெற்றியை கொண்டாடுகிறோம்.' },
    'home.learn_more': { en: 'Learn More About Us', ta: 'எங்களைப் பற்றி மேலும் அறிக' },
    'home.get_directions': { en: 'Get Directions', ta: 'வழி தேடுங்கள்' },

    // --- ABOUT PAGE ---
    'about.title_full': { en: 'About <span>Us</span>', ta: 'எங்களைப் <span>பற்றி</span>' },
    'about.desc': { en: 'A legacy of nurturing young minds and fostering academic excellence since 1955.', ta: '1955 முதல் இளம் மனங்களை வளர்த்து கல்வி சிறப்பை ஊக்குவிக்கும் பாரம்பரியம்.' },
    'about.vision_title_full': { en: 'Our <span>Vision & Mission</span>', ta: 'எங்கள் <span>நோக்கம் & பணி</span>' },
    'about.vision': { en: 'Vision', ta: 'நோக்கம்' },
    'about.mission': { en: 'Mission', ta: 'பணி' },

    // --- HISTORY PAGE ---
    'history.title_full': { en: 'Our <span>History</span>', ta: 'எங்கள் <span>வரலாறு</span>' },
    'history.desc': { en: 'A journey of excellence spanning seven decades of educational leadership in Chennai.', ta: 'சென்னையில் ஏழு தசாப்தங்கள் கல்வித் தலைமையின் சிறப்புப் பயணம்.' },
    'history.journey_full': { en: 'Our <span>Journey</span>', ta: 'எங்கள் <span>பயணம்</span>' },
    'history.timeline_desc': { en: 'A timeline of milestones spanning over seven decades of dedication to education.', ta: 'கல்விக்கான ஏழு தசாப்தங்களுக்கும் மேலான அர்ப்பணிப்பின் மைல்கற்களின் காலவரிசை.' },
    
    // --- TIMELINE ---
    'history.1955_title': { en: 'Foundation Year', ta: 'அடிக்கல் நாட்டப்பட்ட ஆண்டு' },
    'history.1955_desc': { 
      en: 'Thiru.Vi.Ka. Higher Secondary School was established in Shenoy Nagar, Chennai. Named after the great Tamil scholar Thiru.Vi.Kalyanasundaram.', 
      ta: 'திரு.வி.க. மேல்நிலைப்பள்ளி சென்னையில் தொடங்கப்பட்டது. சிறந்த தமிழ் அறிஞர் திரு.வி.கல்யாணசுந்தரனார் அவர்களின் பெயரால் இது அழைக்கப்படுகிறது.' 
    },
    'history.present_title': { en: 'Diamond Jubilee & Beyond', ta: 'வைர விழா மற்றும் அதற்கு மேல்' },
    'history.present_desc': { 
      en: 'Celebrating 70 years of excellence. Today, Thiru.Vi.Ka. HSS stands as a beacon of learning.', 
      ta: '70 ஆண்டுகால சிறப்பைக் கொண்டாடுகிறது. இன்று, திரு.வி.க. மேநிப கற்றலின் கலங்கரை விளக்கமாகத் திகழ்கிறது.' 
    },

    // --- TEACHERS PAGE ---
    'teachers.title_full': { en: 'Our <span>Faculty</span>', ta: 'எங்கள் <span>ஆசிரியர்கள்</span>' },
    'teachers.desc': { en: 'Meet the dedicated educators who inspire, guide, and shape the future of our students every day.', ta: 'ஒவ்வொரு நாளும் நம் மாணவர்களின் எதிர்காலத்தை ஊக்குவிக்கும் அர்ப்பணிப்புள்ள கல்வியாளர்களை சந்தியுங்கள்.' },
    'teachers.teachers': { en: 'Our <span>Teachers</span>', ta: 'எங்கள் <span>ஆசிரியர்கள்</span>' },
    'teachers.pet': { en: 'Physical <span>Education Department</span>', ta: 'உடற்கல்வித் <span>துறை</span>' },
    'teachers.office': { en: 'Office <span>Administration</span>', ta: 'அலுவலக <span>நிர்வாகம்</span>' },

    // --- GALLERY PAGE ---
    'gallery.title_full': { en: 'Our <span>Gallery</span>', ta: 'எங்கள் <span>கேலரி</span>' },
    'gallery.desc': { en: 'A visual journey through our campus and unforgettable moments.', ta: 'எங்கள் வளாகம் மற்றும் மறக்க முடியாத தருணங்களின் காட்சிப் பயணம்.' },
    'gallery.all': { en: 'All Media', ta: 'அனைத்து' },
    'gallery.photos': { en: 'Photos', ta: 'புகைப்படங்கள்' },
    'gallery.videos': { en: 'Videos', ta: 'வீடியோக்கள்' },
    'gallery.events': { en: 'Events', ta: 'நிகழ்வுகள்' },
    'gallery.sports': { en: 'Sports', ta: 'விளையாட்டு' },
    'gallery.academic': { en: 'Academic', ta: 'கல்வி' },
    'gallery.alumni': { en: 'Alumni', ta: 'பழைய மாணவர்' },
    'gallery.memories': { en: 'Memories', ta: 'நினைவுகள்' },

    // --- ALUMNI PAGE ---
    'alumni.community_tag': { en: 'Connected Community', ta: 'இணைந்த சமூகம்' },
    'alumni.title_full': { en: 'We are not just Friends, <span>We are Family</span>', ta: 'நாங்கள் வெறும் நண்பர்கள் அல்ல, <span>நாங்கள் ஒரு குடும்பம்</span>' },
    'alumni.desc': { en: 'Our Alumni members are spread across the globe.', ta: 'எங்கள் பழைய மாணவர்கள் உலகம் முழுவதும் பரவியுள்ளனர்.' },
    'alumni.contact_title': { en: 'Contact Us', ta: 'எங்களை தொடர்புகொள்ள' },
    'alumni.alumni_name': { en: 'THIRU-VI-KA HSS ALUMNI', ta: 'திரு-வி-க மேநிப பழைய மாணவர்' },
    'alumni.registered_title': { en: 'Registered Office', ta: 'பதிவு செய்யப்பட்ட அலுவலகம்' },
    'alumni.head_office': { en: 'Head Office', ta: 'தலைமை அலுவலகம்' },
    'alumni.president': { en: 'President', ta: 'தலைவர்' },
    'alumni.secretary': { en: 'Secretary', ta: 'செயலாளர்' },
    'alumni.memories_full': { en: 'Alumni <span>Memories</span>', ta: 'பழைய மாணவர் <span>நினைவுகள்</span>' },
    'alumni.memory1_title': { en: 'Event Gathering', ta: 'நிகழ்வு கூட்டம்' },
    'alumni.memory1_desc': { en: 'Our alumni reconnecting and engaging in discussions.', ta: 'எங்கள் பழைய மாணவர்கள் மீண்டும் இணைந்து விவாதங்களில் ஈடுபடுகின்றனர்.' },
    'alumni.memory2_title': { en: 'Honoring Leadership', ta: 'தலைமையை கௌரவித்தல்' },
    'alumni.memory2_desc': { en: 'Celebrating milestones and recognizing contributions.', ta: 'மைல்கற்களை கொண்டாடி பங்களிப்புகளை அங்கீகரித்தல்.' },
    'alumni.memory3_title': { en: 'Community Support', ta: 'சமூக ஆதரவு' },
    'alumni.memory3_desc': { en: 'Giving back to the institution with proud events.', ta: 'பெருமையான நிகழ்வுகள் மூலம் நிறுவனத்திற்கு திருப்பி அளித்தல்.' },

    // --- CONTACT PAGE ---
    'contact.tag': { en: 'Get In Touch', ta: 'தொடர்பு கொள்ள' },
    'contact.title_full': { en: 'Contact <span>Us</span>', ta: 'எங்களை <span>தொடர்பு கொள்ள</span>' },
    'contact.desc': { en: 'We would love to hear from you. Reach out to us.', ta: 'உங்களிடம் இருந்து கேட்க நாங்கள் விரும்புகிறோம்.' },
    'contact.address_label': { en: 'Address', ta: 'முகவரி' },
    'contact.phone_label': { en: 'Phone', ta: 'தொலைபேசி' },
    'contact.email_label': { en: 'Email', ta: 'மின்னஞ்சல்' },
    'contact.hours_label': { en: 'Office Hours', ta: 'அலுவலக நேரம்' },
    'contact.form_tag': { en: 'Message Us', ta: 'செய்தி அனுப்புங்கள்' },
    'contact.form_title_full': { en: 'Send a <span>Message</span>', ta: 'ஒரு <span>செய்தி</span> அனுப்பவும்' },
    'contact.form_desc': { en: 'Fill out the form below and we will get back to you.', ta: 'கீழே உள்ள படிவத்தை பூர்த்தி செய்யுங்கள்.' },
    'contact.name_label': { en: 'Your Name', ta: 'உங்கள் பெயர்' },
    'contact.subject_label': { en: 'Subject', ta: 'பொருள்' },
    'contact.message_label': { en: 'Your Message', ta: 'உங்கள் செய்தி' },
    'contact.send_btn': { en: 'Send Message', ta: 'செய்தி அனுப்பு' },

    // --- ADMIN PAGE ---
    'admin.mode': { en: 'ADMINISTRATION MODE', ta: 'நிர்வாக முறை' },
    'admin.login_desc': { en: 'Sign in with your admin credentials.', ta: 'உங்கள் நிர்வாக நற்சான்றிதழ்களுடன் உள்நுழையவும்.' },
  },

  init() {
    console.log('I18n initializing...');
    const saved = localStorage.getItem('tvk-lang');
    if (saved && (saved === 'en' || saved === 'ta')) {
      this.currentLang = saved;
    }
    this.createToggle();
    this.apply();
    document.documentElement.lang = this.currentLang === 'ta' ? 'ta' : 'en';
    console.log('I18n initialized. Language:', this.currentLang);
  },

  createToggle() {
    const actions = document.querySelector('.navbar__actions');
    if (!actions || document.getElementById('lang-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.className = 'lang-toggle';
    btn.innerHTML = this.currentLang === 'en' ? 'TAMIL' : 'ENG';
    
    btn.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'en' ? 'ta' : 'en';
      localStorage.setItem('tvk-lang', this.currentLang);
      location.reload();
    });

    const themeToggle = actions.querySelector('.theme-toggle');
    if (themeToggle) {
      actions.insertBefore(btn, themeToggle);
    } else {
      actions.appendChild(btn);
    }
  },

  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.translations[key];
      if (translation) {
        el.textContent = translation[this.currentLang] || translation.en;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const translation = this.translations[key];
      if (translation) {
        el.innerHTML = translation[this.currentLang] || translation.en;
      }
    });
  }
};
