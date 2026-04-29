// =============================================================
// CONFIG.JS — Supabase Configuration
// Replace these values with your actual Supabase project keys
// =============================================================

// ⚠️ REPLACE THESE with your Supabase project credentials
const SUPABASE_URL = 'https://yqsydacjmxxigwpnejyt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxc3lkYWNqbXh4aWd3cG5lanl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDMwNzEsImV4cCI6MjA5MTU3OTA3MX0.xetPdEXDYX6H6duhY2qejYbaeEpa_e1pI3Ur1-CllLE';

// API Backend URL (Vercel deployment)
const API_BASE_URL = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
  ? 'http://localhost:8080/api'
  : '/api';

// Admin whitelist — only these emails can access admin panel
const ADMIN_EMAILS = [
  'thiruvika1955@gmail.com'
];

// Supabase Storage bucket name
const STORAGE_BUCKET = 'media';

// Media categories
const CATEGORIES = [
  'home', 'about', 'events', 'achiever',
  'ahm', 'teacher', 'pet', 'office', 'memories',
  'gallery_event', 'gallery_sports', 'gallery_academic', 'gallery_alumni'
];

// Initialize Supabase client
let supabaseClient;

function initSupabase() {
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized');
    return supabaseClient;
  } else {
    console.error('❌ Supabase JS library not loaded');
    return null;
  }
}

// Check if a given email is an admin
function isAdminEmail(email) {
  return ADMIN_EMAILS.includes(email?.toLowerCase());
}

// Get the Supabase client instance
function getSupabase() {
  if (!supabaseClient) {
    initSupabase();
  }
  return supabaseClient;
}
