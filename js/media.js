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
      showToast('Supabase not configured', 'error');
      return null;
    }

    // Generate unique filename
    const ext = file.name.split('.').pop();
    const uniqueName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
    const filePath = `uploads/${uniqueName}`;

    const { data, error } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      showToast('File upload failed: ' + error.message, 'error');
      return null;
    }

    // Get public URL
    const { data: urlData } = sb.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return urlData?.publicUrl || null;
  },

  // Save media metadata to database
  async create(metadata) {
    const sb = getSupabase();
    if (!sb) return null;

    const { data, error } = await sb
      .from('media')
      .insert([{
        title: metadata.title,
        description: metadata.description || '',
        media_url: metadata.media_url,
        type: metadata.type,
        category: metadata.category,
        featured: metadata.featured || false,
        updated_by: Auth.user?.email || ''
      }])
      .select()
      .single();

    if (error) {
      console.error('Create media error:', error);
      // Removed the generic toast here to prevent double-toasting or premature success messages
      throw error; 
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
