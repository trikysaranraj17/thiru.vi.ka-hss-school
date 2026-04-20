// =============================================================
// REALTIME.JS — Supabase Realtime Subscriptions
// Live updates for media content across all pages
// =============================================================

const Realtime = {
  channel: null,
  listeners: [],

  // Initialize realtime subscription
  init() {
    const sb = getSupabase();
    if (!sb) {
      console.warn('⚠️ Supabase not initialized, realtime disabled');
      return;
    }

    this.subscribe();
  },

  // Subscribe to media table changes
  subscribe() {
    const sb = getSupabase();
    if (!sb) return;

    // Remove existing subscription
    if (this.channel) {
      sb.removeChannel(this.channel);
    }

    this.channel = sb
      .channel('media-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'media'
        },
        (payload) => {
          console.log('📡 Realtime event:', payload.eventType, payload);
          this.handleChange(payload);
        }
      )
      .subscribe((status) => {
        console.log('📡 Realtime status:', status);
        if (status === 'SUBSCRIBED') {
          this.updateConnectionStatus(true);
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          this.updateConnectionStatus(false);
          // Auto-reconnect after 3 seconds
          setTimeout(() => this.subscribe(), 3000);
        }
      });
  },

  // Handle incoming changes
  handleChange(payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    // Dispatch custom DOM events for page-specific handlers
    const event = new CustomEvent('mediaChange', {
      detail: {
        type: eventType,      // INSERT, UPDATE, DELETE
        newRecord: newRecord,  // New data (for INSERT/UPDATE)
        oldRecord: oldRecord   // Old data (for UPDATE/DELETE)
      }
    });
    window.dispatchEvent(event);

    // Also dispatch type-specific events
    window.dispatchEvent(new CustomEvent(`media${eventType}`, {
      detail: { newRecord, oldRecord }
    }));

    // Show toast notification for changes
    switch (eventType) {
      case 'INSERT':
        showToast(`New ${newRecord.type} added: "${newRecord.title}"`, 'info');
        break;
      case 'UPDATE':
        showToast(`Updated: "${newRecord.title}"`, 'info');
        break;
      case 'DELETE':
        showToast('Media item removed', 'info');
        break;
    }

    // Notify all registered listeners
    this.listeners.forEach(callback => {
      try {
        callback(payload);
      } catch (err) {
        console.error('Realtime listener error:', err);
      }
    });
  },

  // Register a listener for realtime changes
  onchange(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  },

  // Update connection status indicator in UI
  updateConnectionStatus(connected) {
    const indicators = document.querySelectorAll('[data-realtime-status]');
    indicators.forEach(el => {
      el.classList.toggle('connected', connected);
      el.classList.toggle('disconnected', !connected);
      el.title = connected ? 'Live connected' : 'Reconnecting...';
    });

    const dots = document.querySelectorAll('.live-dot');
    dots.forEach(dot => {
      dot.style.background = connected 
        ? 'var(--color-success)' 
        : 'var(--color-warning)';
    });
  },

  // Cleanup
  destroy() {
    const sb = getSupabase();
    if (sb && this.channel) {
      sb.removeChannel(this.channel);
      this.channel = null;
    }
    this.listeners = [];
  }
};
