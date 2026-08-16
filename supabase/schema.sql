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
  category TEXT NOT NULL CHECK (category IN (
    'home', 'about', 'events', 'achiever',
    'ahm', 'teacher', 'pet', 'office', 'memories',
    'gallery_event', 'gallery_sports', 'gallery_academic', 'gallery_alumni',
    'achievement_student', 'achievement_academic', 'achievement_sports', 'achievement_arts'
  )),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT DEFAULT ''
);

-- 2. Enable Row Level Security on media table
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for media table

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

-- 6. Storage Bucket & Policies for 'media' bucket
-- Note: Create bucket "media" under Storage if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies for 'media' bucket:
-- Allow anyone to view / download public media files
CREATE POLICY "Public can view media objects"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Allow authenticated admins to upload files
CREATE POLICY "Admins can upload media objects"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Allow authenticated admins to update files
CREATE POLICY "Admins can update media objects"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media')
  WITH CHECK (bucket_id = 'media');

-- Allow authenticated admins to delete files
CREATE POLICY "Admins can delete media objects"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
