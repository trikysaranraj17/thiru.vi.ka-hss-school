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
    'nav.achievements': { en: 'Achievements', ta: 'சாதனைகள்' },
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
    'home.since': { en: '70 Years of Excellence Since 1955', ta: '1955 முதல் 70 ஆண்டுகால சிறப்பு' },
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
    
    // --- LEADERSHIP ---
    'home.leadership_tag': { en: 'Leadership', ta: 'தலைமை' },
    'home.leadership_title': { en: 'Guided by <span>Vision</span>', ta: 'வழிநடத்தும் <span>நோக்கு</span>' },
    'home.visionaries_tag': { en: 'Guiding Light', ta: 'வழிகாட்டும் ஒளி' },
    'home.visionaries_title': { en: 'Our <span>Visionaries</span>', ta: 'எங்கள் <span>தொலைநோக்கு சிந்தனையாளர்கள்</span>' },
    'home.visionaries_desc': { en: 'The dedicated individuals who have shaped our institution\'s legacy.', ta: 'எங்கள் நிறுவனத்தின் பாரம்பரியத்தை வடிவமைத்த அர்ப்பணிப்புள்ள நபர்கள்.' },
    
    'home.president': { en: 'President', ta: 'பள்ளி தலைவர்' },
    'home.president_name': { en: 'Vedhagiri Shanmugam Sundaranar', ta: 'வேதகிரி சண்முகம் சுந்தரனார்' },
    'home.president_desc': { 
      en: 'A visionary leader whose guiding principles laid the ultimate foundation for Thiru.Vi.Ka. Higher Secondary School. His lifelong dedication to accessible education has shaped the institution into a beacon of knowledge, moral excellence, and community growth. With a resolute commitment to student empowerment, his legacy endures in every classroom and corridor.', 
      ta: 'திரு.வி.க. மேல்நிலைப்பள்ளிக்கு அடித்தளம் அமைத்த தொலைநோக்கு பார்வை கொண்ட தலைவர். கல்விக்கான இவரது அர்ப்பணிப்பு, நிறுவனத்தை அறிவு, ஒழுக்கச் சிறப்பு மற்றும் சமூக வளர்ச்சியின் கலங்கரை விளக்கமாக மாற்றியுள்ளது. மாணவர் அதிகாரமளிப்பதற்கான அவரது உறுதிப்பாடு இன்றும் ஒவ்வொரு வகுப்பறையிலும் எதிரொலிக்கிறது.' 
    },
    
    'home.correspondent': { en: 'Correspondent', ta: 'நிருபர்' },
    'home.correspondent_name': { en: 'Dr. B.S. Tiruvadanan', ta: 'டாக்டர். பி.எஸ். திருவதனன்' },
    'home.correspondent_desc': {
      en: 'A distinguished academic and dynamic administrator passionately modernizing the school\'s infrastructure and operations. He works tirelessly to ensure that the institution maintains the highest academic standards while fostering an innovative environment for the students. Under his guidance, the school continues to integrate modern teaching methodologies with traditional values.',
      ta: 'பள்ளியின் உள்கட்டமைப்பு மற்றும் செயல்பாடுகளை ஆர்வத்துடன் நவீனப்படுத்தும் சிறந்த கல்வியாளர் மற்றும் நிர்வாகி. நிறுவனம் உயர்தரக் கல்வித் தரத்தைப் பேணுவதையும் புதுமையான சூழலை வளர்ப்பதையும் உறுதி செய்ய அவர் அயராது உழைக்கிறார். இவரது வழிகாட்டுதலின் கீழ், பள்ளி நவீன கற்பித்தல் முறைகளை பாரம்பரிய விழுமியங்களுடன் தொடர்ந்து ஒருங்கிணைக்கிறது.'
    },

    'home.headmistress': { en: 'Headmistress', ta: 'தலைமை ஆசிரியை' },
    'home.headmistress_name': { en: 'Mrs. Ramaprabha', ta: 'திருமதி. ரமாபிரபா' },
    'home.headmistress_role': { en: 'Leading with Vision & Excellence', ta: 'நோக்கு மற்றும் சிறப்புடன் தலைமை' },
    'home.headmistress_desc': {
      en: 'An inspiring and dedicated educator who leads the school\'s daily operations with grace and discipline. Her holistic approach to nurturing both the academic and personal development of every student makes her a beloved figure among the staff and students. She continuously strives to create an inclusive and highly motivating environment for all learners.',
      ta: 'பள்ளியின் அன்றாடச் செயல்பாடுகளை ஒழுக்கத்துடனும் வழிநடத்தும் அர்ப்பணிப்புள்ள கல்வியாளர். ஒவ்வொரு மாணவரின் கல்வி மற்றும் தனிப்பட்ட வளர்ச்சியை வளர்ப்பதற்கான அவரது முழுமையான அணுகுமுறை அவரை ஊழியர்கள் மற்றும் மாணவர்கள் மத்தியில் அன்புக்குரியவராக மாற்றுகிறது. அனைத்து கற்பவர்களுக்கும் ஒரு உள்ளடக்கிய மற்றும் அதிக ஊக்கமளிக்கும் சூழலை உருவாக்க அவர் தொடர்ந்து பாடுபடுகிறார்.'
    },

    'about.former_hm': { en: 'Former Headmaster', ta: 'முன்னாள் தலைமை ஆசிரியர்' },
    'about.former_hm_name': { en: 'Mr. John', ta: 'திரு. ஜான்' },
    'about.former_hm_desc': {
      en: 'A cornerstone of our institution\'s 70-year legacy. Mr. John served with unprecedented dedication, fostering an environment where discipline met academic brilliance. His leadership remains the standard by which we measure our progress today.',
      ta: 'நமது நிறுவனத்தின் 70 ஆண்டுகால பாரம்பரியத்தின் ஒரு முக்கிய மைல்கல். திரு. ஜான் அவர்கள் அர்ப்பணிப்புடன் பணியாற்றினார், ஒழுக்கம் மற்றும் கல்விச் சிறப்பு இணைந்த ஒரு சூழலை உருவாக்கினார். அவரது தலைமை இன்றும் எங்களின் வளர்ச்சிக்கு ஒரு தரநிலையாக உள்ளது.'
    },

    'home.achievers_tag': { en: 'Achievements', ta: 'சாதனைகள்' },
    'home.achievers_title_full': { en: 'Our <span>Achievements</span>', ta: 'எங்கள் <span>சாதனைகள்</span>' },
    'home.achievers_desc': { en: 'Celebrating 70 years of outstanding academic and co-curricular success.', ta: '70 ஆண்டுகால சிறந்த கல்வி மற்றும் இணை பாடத்திட்ட வெற்றியை கொண்டாடுகிறோம்.' },
    'home.learn_more': { en: 'Learn More About Us', ta: 'எங்களைப் பற்றி மேலும் அறிக' },
    'home.get_directions': { en: 'Get Directions', ta: 'வழி தேடுங்கள்' },

    // --- ABOUT PAGE ---
    'about.pillars_title': { en: 'Our <span>Pillars of Strength</span>', ta: 'எங்கள் <span>வலிமையின் தூண்கள்</span>' },
    'about.title_full': { en: 'About <span>Us</span>', ta: 'எங்களைப் <span>பற்றி</span>' },
    'about.desc': { en: 'A legacy of nurturing young minds and fostering academic excellence since 1955.', ta: '1955 முதல் இளம் மனங்களை வளர்த்து கல்வி சிறப்பை ஊக்குவிக்கும் பாரம்பரியம்.' },
    'about.vision_title_full': { en: 'Our <span>Vision & Mission</span>', ta: 'எங்கள் <span>நோக்கம் & பணி</span>' },
    'about.vision': { en: 'Vision', ta: 'நோக்கம்' },
    'about.mission': { en: 'Mission', ta: 'பணி' },
    'about.mission_desc': { en: 'To provide holistic education that nurtures intellectual curiosity, builds character, and prepares students for the challenges of the 21st century.', ta: 'அறிவுசார் ஆர்வத்தை வளர்க்கும், குணத்தை வளர்க்கும் மற்றும் 21 ஆம் நூற்றாண்டின் சவால்களுக்கு மாணவர்களை தயார்படுத்தும் முழுமையான கல்வியை வழங்குதல்.' },
    'about.vision_desc': { en: 'To be a center of educational excellence that empowers every student to achieve their full potential, creating responsible citizens.', ta: 'ஒவ்வொரு மாணவரும் தங்களின் முழுத் திறனையும் அடைய அதிகாரம் அளிக்கும் கல்விச் சிறப்பின் மையமாக இருப்பது, பொறுப்புள்ள குடிமக்களை உருவாக்குவது.' },

    // --- HISTORY PAGE ---
    'history.title_full': { en: 'Our <span>History</span>', ta: 'எங்கள் <span>வரலாறு</span>' },
    'history.desc': { en: 'A journey of excellence spanning seven decades of educational leadership in Chennai.', ta: 'சென்னையில் ஏழு தசாப்தங்கள் கல்வித் தலைமையின் சிறப்புப் பயணம்.' },
    'history.journey_full': { en: 'Our <span>Journey</span>', ta: 'எங்கள் <span>பயணம்</span>' },
    'history.timeline_desc': { en: 'A timeline of milestones spanning over seven decades of dedication to education.', ta: 'கல்விக்கான ஏழு தசாப்தங்களுக்கும் மேலான அர்ப்பணிப்பின் மைல்கற்களின் காலவரிசை.' },
    
    'home.view_more_reviews': { en: 'View More on Google', ta: 'கூகிளில் மேலும் காண்க' },
    'home.reviews_tag': { en: 'What Our Community Says', ta: 'எங்கள் சமூகம் கூறுவது' },
    'home.reviews_title_full': { en: 'Google <span>Reviews</span>', ta: 'கூகிள் <span>விமர்சனங்கள்</span>' },
    'home.reviews_desc': { en: 'Trusted by parents, students, and alumni for over 70 years.', ta: '70 ஆண்டுகளுக்கும் மேலாக பெற்றோர், மாணவர்கள் மற்றும் பழைய மாணவர்களால் நம்பப்படுகிறது.' },
    'home.review1_text': { 
      en: '"A great school with excellent teachers and a very good environment for students. The discipline and education standards are top-notch."', 
      ta: '"சிறந்த ஆசிரியர்கள் மற்றும் மாணவர்களுக்கு மிகவும் நல்ல சூழலைக் கொண்ட ஒரு சிறந்த பள்ளி. ஒழுக்கம் மற்றும் கல்வித் தரங்கள் மிக உயர்ந்தவை."' 
    },
    'home.review2_text': { 
      en: '"Excellent coaching and discipline. Best school in Shenoy Nagar. The teachers are very supportive and encourage students in both academics and sports."', 
      ta: '"சிறந்த பயிற்சி மற்றும் ஒழுக்கம். ஷெனாய் நகரின் சிறந்த பள்ளி. ஆசிரியர்கள் மிகவும் ஆதரவாக இருக்கிறார்கள் மற்றும் மாணவர்கள் கல்வி மற்றும் விளையாட்டுகளில் ஈடுபடுவதை ஊக்குவிக்கிறார்கள்."' 
    },
    'home.review3_text': { 
      en: '"Proud to be an alumni of this great institution. Thiru.Vi.Ka. HSS shapes not just careers but characters. Highly recommended for quality education."', 
      ta: '"இந்த சிறந்த நிறுவனத்தின் பழைய மாணவனாக இருப்பதில் பெருமை கொள்கிறேன். திரு.வி.க. மேநிப வாழ்க்கையை மட்டுமல்ல, குணத்தையும் வடிவமைக்கிறது. தரமான கல்விக்கு மிகவும் பரிந்துரைக்கப்படுகிறது."' 
    },

    // --- ACHIEVEMENTS PAGE ---
    'achievements.title_full': { en: 'Student <span>Achievements</span>', ta: 'மாணவர் <span>சாதனைகள்</span>' },
    'achievements.desc': { en: 'Celebrating the outstanding success of our students in various fields.', ta: 'பல்வேறு துறைகளில் நமது மாணவர்களின் சிறந்த வெற்றியை கொண்டாடுகிறோம்.' },
    'gallery.arts': { en: 'Arts & Culture', ta: 'கலை மற்றும் கலாச்சாரம்' },

    // --- QUICK LINKS ---
    'history.1955_title': { en: 'Foundation Year', ta: 'அடிக்கல் நாட்டப்பட்ட ஆண்டு' },
    'history.1955_desc': { en: 'Thiru.Vi.Ka. Higher Secondary School was established in Shenoy Nagar, Chennai, with a vision to provide quality education to the community. Named after the great Tamil scholar and freedom fighter Thiru.Vi.Kalyanasundaram.', ta: 'திரு.வி.க. மேல்நிலைப்பள்ளி சென்னையில் தொடங்கப்பட்டது. சிறந்த தமிழ் அறிஞர் மற்றும் சுதந்திர போராட்ட வீரர் திரு.வி.கல்யாணசுந்தரனார் அவர்களின் பெயரால் இது அழைக்கப்படுகிறது.' },
    'history.1960s_title': { en: 'Growing Foundations', ta: 'வளரும் அடித்தளம்' },
    'history.1960s_desc': { en: 'The school expanded its infrastructure and curriculum, establishing itself as a premier educational institution in North Chennai.', ta: 'பள்ளி அதன் உள்கட்டமைப்பு மற்றும் பாடத்திட்டத்தை விரிவாக்கியது, வட சென்னையில் ஒரு முதன்மையான கல்வி நிறுவனமாக தன்னை நிலைநிறுத்திக் கொண்டது.' },
    'history.1970s_title': { en: 'Academic Excellence', ta: 'கல்விச் சிறப்பு' },
    'history.1970s_desc': { en: 'Students began achieving top ranks in state examinations, establishing a tradition of excellence that continues today.', ta: 'மாணவர்கள் மாநிலத் தேர்வுகளில் முதலிடத்தைப் பெறத் தொடங்கினர், இன்றும் தொடரும் சிறப்பான பாரம்பரியத்தை உருவாக்கினர்.' },
    'history.1980s_title': { en: 'Sports & Cultural Growth', ta: 'விளையாட்டு மற்றும் கலாச்சார வளர்ச்சி' },
    'history.1980s_desc': { en: 'Beyond academics, the school developed strong sports and cultural programs, winning numerous awards.', ta: 'கல்விக்கு அப்பால், பள்ளி வலுவான விளையாட்டு மற்றும் கலாச்சார திட்டங்களை உருவாக்கி, ஏராளமான விருதுகளை வென்றது.' },
    'history.1990s_title': { en: 'Modernization Era', ta: 'நவீனமயமாக்கல் காலம்' },
    'history.1990s_desc': { en: 'Computer education was introduced, keeping pace with India\'s IT revolution and embracing digital learning.', ta: 'இந்தியாவின் தகவல் தொழில்நுட்ப புரட்சிக்கு ஏற்ப கணினி கல்வி அறிமுகப்படுத்தப்பட்டது மற்றும் டிஜிட்டல் கற்றல் ஏற்றுக்கொள்ளப்பட்டது.' },
    'history.2000s_title': { en: 'Golden Jubilee', ta: 'பொன்விழா' },
    'history.2000s_desc': { en: 'Celebrated 50 years of educational excellence with upgraded infrastructure and laboratories.', ta: 'மேம்படுத்தப்பட்ட உள்கட்டமைப்பு மற்றும் ஆய்வகங்களுடன் 50 ஆண்டுகால கல்விச் சிறப்பைக் கொண்டாடியது.' },
    'history.2010s_title': { en: 'Digital Transformation', ta: 'டிஜிட்டல் மாற்றம்' },
    'history.2010s_desc': { en: 'Smart classrooms and digital learning tools were implemented, preparing students for the digital age.', ta: 'ஸ்மார்ட் வகுப்பறைகள் மற்றும் டிஜிட்டல் கற்றல் கருவிகள் செயல்படுத்தப்பட்டன, டிஜிட்டல் யுகத்திற்கு மாணவர்களை தயார்படுத்தியது.' },
    'history.present_title': { en: 'Diamond Jubilee & Beyond', ta: 'வைர விழா மற்றும் அதற்கு மேல்' },
    'history.present_desc': { en: 'Celebrating 70 years of excellence. Today, Thiru.Vi.Ka. HSS stands as a beacon of learning.', ta: '70 ஆண்டுகால சிறப்பைக் கொண்டாடுகிறது. இன்று, திரு.வி.க. மேநிப கற்றலின் கலங்கரை விளக்கமாகத் திகழ்கிறது.' },

    // --- TEACHERS PAGE ---
    'teachers.title_full': { en: 'Our <span>Faculty</span>', ta: 'எங்கள் <span>ஆசிரியர்கள்</span>' },
    'teachers.desc_full': { en: 'The heartbeat of Thiru.Vi.Ka. HSS — Meet the dedicated educators shaping our students\' futures.', ta: 'திரு.வி.க. மேநிப-யின் இதயத்துடிப்பு — மாணவர்களின் எதிர்காலத்தை வடிவமைக்கும் அர்ப்பணிப்புள்ள கல்வியாளர்களை சந்தியுங்கள்.' },
    'teachers.ahm': { en: 'Assistant <span>Head Masters</span>', ta: 'உதவி <span>தலைமை ஆசிரியர்கள்</span>' },
    'teachers.teachers': { en: 'Our <span>Teachers</span>', ta: 'எங்கள் <span>ஆசிரியர்கள்</span>' },
    'teachers.pet': { en: 'Physical <span>Education Department</span>', ta: 'உடற்கல்வித் <span>துறை</span>' },
    'teachers.office': { en: 'Office <span>Administration</span>', ta: 'அலுவலக <span>நிர்வாகம்</span>' },

    // --- FACULTY ROLES/SUBJECTS (Dynamic) ---
    'faculty.pg_assistant': { en: 'PG Assistant', ta: 'முதுகலை ஆசிரியர்' },
    'faculty.bt_assistant': { en: 'BT Assistant', ta: 'பட்டதாரி ஆசிரியர்' },
    'faculty.primarysecondary': { en: 'Primary/Secondary', ta: 'தொடக்க/உயர்நிலை' },
    'faculty.higher_secondary': { en: 'Higher Secondary', ta: 'மேல்நிலை' },
    'faculty.english': { en: 'English', ta: 'ஆங்கிலம்' },
    'faculty.tamil': { en: 'Tamil', ta: 'தமிழ்' },
    'faculty.maths': { en: 'Maths', ta: 'கணிதம்' },
    'faculty.science': { en: 'Science', ta: 'அறிவியல்' },
    'faculty.social_science': { en: 'Social Science', ta: 'சமூக அறிவியல்' },
    'faculty.physical_education': { en: 'Physical Education', ta: 'உடற்கல்வி' },

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
    'alumni.arul_name': { en: 'Mr. Arul', ta: 'திரு. அருள்' },
    'alumni.shiva_name': { en: 'Mr. Shivakumar', ta: 'திரு. சிவகுமார்' },

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
