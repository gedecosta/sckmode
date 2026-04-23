import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { logger } from '../lib/logger';

interface SocialState {
  /** Set de IDs de usuários que o usuário autenticado segue */
  following: Set<string>;
  /** Set de IDs dos próprios seguidores */
  followers: Set<string>;
  /** IDs com operação em andamento (para UI optimista) */
  pendingIds: Set<string>;

  // Actions
  initFollowing: (userId: string) => Promise<void>;
  followUser: (targetId: string, myId: string) => Promise<void>;
  unfollowUser: (targetId: string, myId: string) => Promise<void>;
  isFollowing: (targetId: string) => boolean;
  reset: () => void;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  following: new Set(),
  followers: new Set(),
  pendingIds: new Set(),

  initFollowing: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId);

      if (error) throw error;

      const ids = new Set((data ?? []).map((r: { following_id: string }) => r.following_id));
      set({ following: ids });
    } catch (err) {
      logger.error('Failed to init following list', err, 'socialStore');
    }
  },

  followUser: async (targetId: string, myId: string) => {
    const { following, pendingIds } = get();

    // Optimistic update
    const newFollowing = new Set(following);
    newFollowing.add(targetId);
    const newPending = new Set(pendingIds);
    newPending.add(targetId);
    set({ following: newFollowing, pendingIds: newPending });

    try {
      const { error } = await supabase
        .from('follows')
        .insert({ follower_id: myId, following_id: targetId });

      if (error) throw error;
    } catch (err) {
      // Rollback optimistic update
      logger.error('Failed to follow user', err, 'socialStore');
      const rolledBack = new Set(get().following);
      rolledBack.delete(targetId);
      set({ following: rolledBack });
    } finally {
      const cleaned = new Set(get().pendingIds);
      cleaned.delete(targetId);
      set({ pendingIds: cleaned });
    }
  },

  unfollowUser: async (targetId: string, myId: string) => {
    const { following, pendingIds } = get();

    // Optimistic update
    const newFollowing = new Set(following);
    newFollowing.delete(targetId);
    const newPending = new Set(pendingIds);
    newPending.add(targetId);
    set({ following: newFollowing, pendingIds: newPending });

    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', myId)
        .eq('following_id', targetId);

      if (error) throw error;
    } catch (err) {
      // Rollback optimistic update
      logger.error('Failed to unfollow user', err, 'socialStore');
      const rolledBack = new Set(get().following);
      rolledBack.add(targetId);
      set({ following: rolledBack });
    } finally {
      const cleaned = new Set(get().pendingIds);
      cleaned.delete(targetId);
      set({ pendingIds: cleaned });
    }
  },

  isFollowing: (targetId: string) => get().following.has(targetId),

  reset: () => set({ following: new Set(), followers: new Set(), pendingIds: new Set() }),
}));
