import { useMutation } from '@tanstack/react-query';
import { useSocialStore } from '../stores/socialStore';
import { socialLimiter } from '../lib/rateLimiter';
import { logger } from '../lib/logger';

interface FollowParams {
  targetId: string;
  myId: string;
}

/**
 * Hook para follow/unfollow com feedback instantâneo via optimistic update
 * no socialStore. Rate limiting via socialLimiter (5 req/60s).
 *
 * @example
 * const { follow, unfollow, isFollowing, isPending } = useFollowUser();
 * follow({ targetId: 'user-123', myId: currentUser.id });
 */
export function useFollowUser() {
  const { followUser, unfollowUser, isFollowing, pendingIds } = useSocialStore();

  const followMutation = useMutation({
    mutationFn: async ({ targetId, myId }: FollowParams) => {
      // Rate limiting
      socialLimiter.checkOrThrow(`follow:${myId}`);
      await followUser(targetId, myId);
    },
    onError: (err) => {
      logger.error('Follow failed', err, 'useFollowUser');
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async ({ targetId, myId }: FollowParams) => {
      socialLimiter.checkOrThrow(`unfollow:${myId}`);
      await unfollowUser(targetId, myId);
    },
    onError: (err) => {
      logger.error('Unfollow failed', err, 'useFollowUser');
    },
  });

  return {
    follow: followMutation.mutate,
    unfollow: unfollowMutation.mutate,
    isFollowing,
    /** true se há operação pendente para um targetId */
    isPending: (targetId: string) => pendingIds.has(targetId),
    followError: followMutation.error,
    unfollowError: unfollowMutation.error,
  };
}
