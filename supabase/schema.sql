-- =============================================================
-- Thiru.Vi.Ka. Higher Secondary School — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================

-- 1. Create the media table
CREATE TABLE IF NOT EXISTS public.media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  media_url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category TEXT NOT NULL CHECK (category IN ('home', 'gallery', 'alumni', 'about', 'events')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT DEFAULT ''
);

-- 2. Enable Row Level Security
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- Anyone can READ media (public website)
CREATE POLICY "Public can view media"
  ON public.media
  FOR SELECT
  USING (true);

-- Only authenticated users can INSERT
CREATE POLICY "Admins can insert media"
  ON public.media
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can UPDATE
CREATE POLICY "Admins can update media"
  ON public.media
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can DELETE
CREATE POLICY "Admins can delete media"
  ON public.media
  FOR DELETE
  TO authenticated
  USING (true);

-- 4. Enable Realtime on the media table
ALTER PUBLICATION supabase_realtime ADD TABLE public.media;

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_media_category ON public.media(category);
CREATE INDEX IF NOT EXISTS idx_media_featured ON public.media(featured);
CREATE INDEX IF NOT EXISTS idx_media_type ON public.media(type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON public.media(created_at DESC);

-- 6. Create storage bucket (run separately if needed)
-- Go to Supabase Dashboard → Storage → Create bucket named "media" → Set to Public

-- =============================================================
-- SETUP INSTRUCTIONS:
-- 1. Go to supabase.com → Your Project → SQL Editor
-- 2. Paste this entire file → Click "Run"
-- 3. Go to Storage → New Bucket → Name: "media" → Public: ON
-- 4. Go to Auth → Providers → Google → Enable → Add OAuth credentials
-- =============================================================
