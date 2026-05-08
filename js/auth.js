// =============================================================
// AUTH.JS — Google OAuth via Supabase Auth
// =============================================================

const Auth = {
  // Current user session
  session: null,
  user: null,

  async getUser() {
    if (this.user) return this.user;
    const sb = getSupabase();
    if (!sb) return null;
    const { data: { user } } = await sb.auth.getUser();
    this.user = user;
    return user;
  },

  // Initialize auth state
  async init() {
    const sb = getSupabase();
    if (!sb) return;

    // Get current session
    const { data: { session } } = await sb.auth.getSession();
    this.handleSession(session);

    // Listen for auth changes
    sb.auth.onAuthStateChange((event, session) => {
      console.log('🔐 Auth event:', event);
      this.handleSession(session);
      
      // Dispatch custom event for other modules
      window.dispatchEvent(new CustomEvent('authChange', { 
        detail: { event, session, user: session?.user } 
      }));
    });
  },

  // Handle session updates
  handleSession(session) {
    this.session = session;
    this.user = session?.user || null;
    this.updateUI();
  },

  // Login with Google
  async loginWithGoogle() {
    const sb = getSupabase();
    if (!sb) {
      showToast('Supabase not configured. Please check config.js', 'error');
      return;
    }

    // Attempt to log in with Google OAuth
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/admin.html'
      }
    });

    if (error) {
      console.error('Login error:', error);
      showToast('Login failed: ' + error.message, 'error');
    }
    // Note: No success toast here because OAuth will redirect away from the page
  },

  // Logout
  async logout() {
    const sb = getSupabase();
    if (!sb) return;

    const { error } = await sb.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      showToast('Logout failed: ' + error.message, 'error');
    } else {
      showToast('Logged out successfully', 'success');
      this.session = null;
      this.user = null;
      this.updateUI();
    }
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!this.session;
  },

  // Check if current user is admin
  isAdmin() {
    if (!this.user) return false;
    return isAdminEmail(this.user.email);
  },

  // Get the current user's access token
  getAccessToken() {
    return this.session?.access_token || null;
  },

  // Get user display info
  getUserInfo() {
    if (!this.user) return null;
    return {
      email: this.user.email,
      name: this.user.user_metadata?.full_name || this.user.email,
      avatar: this.user.user_metadata?.avatar_url || null
    };
  },

  // Update UI based on auth state
  updateUI() {
    const loginBtns = document.querySelectorAll('[data-auth="login"]');
    const logoutBtns = document.querySelectorAll('[data-auth="logout"]');
    const adminOnly = document.querySelectorAll('[data-auth="admin-only"]');
    const guestOnly = document.querySelectorAll('[data-auth="guest-only"]');
    const userInfo = document.querySelectorAll('[data-auth="user-info"]');
    const userAvatars = document.querySelectorAll('[data-auth="user-avatar"]');
    const userNames = document.querySelectorAll('[data-auth="user-name"]');
    const userEmails = document.querySelectorAll('[data-auth="user-email"]');

    const loggedIn = this.isLoggedIn();
    const isAdmin = this.isAdmin();
    const info = this.getUserInfo();

    // Show/hide login buttons
    loginBtns.forEach(el => el.style.display = loggedIn ? 'none' : '');
    logoutBtns.forEach(el => el.style.display = loggedIn ? '' : 'none');

    // Show/hide admin-only content
    adminOnly.forEach(el => el.style.display = isAdmin ? '' : 'none');
    guestOnly.forEach(el => el.style.display = loggedIn ? 'none' : '');

    // Update user info displays
    if (info) {
      userNames.forEach(el => el.textContent = info.name);
      userEmails.forEach(el => el.textContent = info.email);
      userAvatars.forEach(el => {
        if (info.avatar) {
          el.src = info.avatar;
          el.style.display = '';
        }
      });
    }

    // Update user info containers
    userInfo.forEach(el => el.style.display = loggedIn ? '' : 'none');
  }
};
