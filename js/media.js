// =============================================================
// MEDIA.JS — Media CRUD Operations
// Upload, fetch, update, delete media via Supabase
// =============================================================

const Media = {
  // Fetch all media with optional filters
  async fetchAll(filters = {}) {
    const sb = getSupabase();
    if (!sb) return [];

    let query = sb
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Fetch media error:', error);
      showToast('Failed to load media', 'error');
      return [];
    }

    return data || [];
  },

  // Fetch a single media item
  async fetchOne(id) {
    const sb = getSupabase();
    if (!sb) return null;

    const { data, error } = await sb
      .from('media')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Fetch media error:', error);
      return null;
    }

    return data;
  },

  // Upload file to Supabase Storage
  async uploadFile(file) {
    const sb = getSupabase();
    if (!sb) {
      const err = new Error('Supabase client is not initialized. Please refresh the page.');
      showToast(err.message, 'error');
      throw err;
    }

    if (!file) {
      const err = new Error('No file selected for upload.');
      showToast(err.message, 'error');
      throw err;
    }

    // Check file size (50MB Supabase standard limit)
    const MAX_SIZE_MB = 50;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      const err = new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Supabase allows maximum ${MAX_SIZE_MB}MB.`);
      showToast(err.message, 'error');
      throw err;
    }

    // Ensure session is present or refreshed
    try {
      const { data: sessionData } = await sb.auth.getSession();
      if (!sessionData?.session) {
        console.warn('No active session found during upload. Checking user...');
        const user = await Auth.getUser();
        if (!user) {
          throw new Error('Your session has expired. Please sign out and sign in with Google again.');
        }
      }
    } catch (authErr) {
      if (authErr.message?.includes('expired') || authErr.message?.includes('sign in')) {
        throw authErr;
      }
      console.warn('Session check warning:', authErr);
    }

    // Generate clean, safe filename
    const cleanExt = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${cleanExt}`;
    const filePath = `uploads/${uniqueName}`;

    // Determine accurate MIME type
    let mimeType = file.type;
    if (!mimeType) {
      if (cleanExt === 'mp4') mimeType = 'video/mp4';
      else if (cleanExt === 'png') mimeType = 'image/png';
      else if (cleanExt === 'webp') mimeType = 'image/webp';
      else mimeType = 'image/jpeg';
    }

    const { data, error } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        contentType: mimeType,
        upsert: false
      });

    if (error) {
      console.error('Supabase Storage upload error:', error);
      let userFriendlyMsg = error.message || 'Storage upload failed';
      
      if (error.message?.includes('row-level security') || error.statusCode === '403' || error.error === 'Unauthorized') {
        userFriendlyMsg = 'Permission denied by Storage RLS. Please ensure you are signed in with an authorized admin account or check Supabase storage policies.';
      } else if (error.message?.includes('Bucket not found')) {
        userFriendlyMsg = `Storage bucket "${STORAGE_BUCKET}" does not exist in your Supabase project.`;
      } else if (error.message?.includes('Entity too large') || error.message?.includes('Payload too large') || error.statusCode === '413') {
        userFriendlyMsg = 'File size is too large (maximum 50MB per file).';
      }

      showToast('Upload failed: ' + userFriendlyMsg, 'error');
      throw new Error(userFriendlyMsg);
    }

    // Get public URL
    const { data: urlData } = sb.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      const err = new Error('Could not retrieve public URL for uploaded file.');
      showToast(err.message, 'error');
      throw err;
    }

    return urlData.publicUrl;
  },

  // Save media metadata to database
  async create(metadata) {
    const sb = getSupabase();
    if (!sb) {
      throw new Error('Supabase client is not initialized.');
    }

    let userEmail = Auth.user?.email;
    if (!userEmail) {
      const user = await Auth.getUser();
      userEmail = user?.email || '';
    }

    const { data, error } = await sb
      .from('media')
      .insert([{
        title: metadata.title,
        description: metadata.description || '',
        media_url: metadata.media_url,
        type: metadata.type,
        category: metadata.category,
        featured: metadata.featured || false,
        updated_by: userEmail
      }])
      .select()
      .single();

    if (error) {
      console.error('Create media database error:', error);
      let userFriendlyMsg = error.message || 'Database insert failed';
      if (error.message?.includes('row-level security') || error.code === '42501') {
        userFriendlyMsg = 'Database permission denied (RLS). Please re-login with your admin account.';
      } else if (error.message?.includes('check constraint') || error.code === '23514') {
        userFriendlyMsg = `Category "${metadata.category}" is not allowed by database check constraints.`;
      }
      showToast('Database error: ' + userFriendlyMsg, 'error');
      throw new Error(userFriendlyMsg);
    }

    return data;
  },

  // Update media metadata
  async update(id, updates) {
    const sb = getSupabase();
    if (!sb) return null;

    const { data, error } = await sb
      .from('media')
      .update({
        ...updates,
        updated_by: Auth.user?.email || ''
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update media error:', error);
      showToast('Failed to update: ' + error.message, 'error');
      return null;
    }

    showToast('Media updated successfully!', 'success');
    return data;
  },

  // Delete media (record + storage file)
  async delete(id) {
    const sb = getSupabase();
    if (!sb) return false;

    // First get the media to find the file path
    const media = await this.fetchOne(id);
    if (!media) return false;

    // Delete from database
    const { error: dbError } = await sb
      .from('media')
      .delete()
      .eq('id', id);

    if (dbError) {
      console.error('Delete media error:', dbError);
      showToast('Failed to delete: ' + dbError.message, 'error');
      return false;
    }

    // Try to delete from storage (extract path from URL)
    try {
      const url = new URL(media.media_url);
      const pathParts = url.pathname.split('/storage/v1/object/public/' + STORAGE_BUCKET + '/');
      if (pathParts[1]) {
        await sb.storage
          .from(STORAGE_BUCKET)
          .remove([decodeURIComponent(pathParts[1])]);
      }
    } catch (e) {
      console.warn('Could not delete storage file:', e);
    }

    showToast('Media deleted successfully', 'success');
    return true;
  },

  // Toggle featured status
  async toggleFeatured(id, currentStatus) {
    return this.update(id, { featured: !currentStatus });
  },

  // Get media counts by category
  async getCounts() {
    const all = await this.fetchAll();
    const counts = {
      total: all.length,
      images: all.filter(m => m.type === 'image').length,
      videos: all.filter(m => m.type === 'video').length,
      featured: all.filter(m => m.featured).length,
    };
    CATEGORIES.forEach(cat => {
      counts[cat] = all.filter(m => m.category === cat).length;
    });
    return counts;
  },

  // Detect file type from file object
  getFileType(file) {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return null;
  }
};
