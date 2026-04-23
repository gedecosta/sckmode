import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { commentSchema, CommentInput } from '../lib/validators';
import { socialLimiter } from '../lib/rateLimiter';
import { getUserFriendlyMessage } from '../lib/errorSanitizer';
import { logger } from '../lib/logger';
import { Comment } from './useComments';

interface AddCommentParams {
  activityId: string;
  userId: string;
  input: CommentInput;
}

async function addComment(params: AddCommentParams): Promise<Comment> {
  const { activityId, userId, input } = params;

  // 1. Rate limiting
  socialLimiter.checkOrThrow(`comment:${userId}`);

  // 2. Validation
  const parsed = commentSchema.parse(input);

  // TODO: substituir por insert real:
  // const { data, error } = await supabase
  //   .from('comments')
  //   .insert({ activity_id: activityId, user_id: userId, content: parsed.content })
  //   .select(`*, profiles(full_name, avatar_url)`)
  //   .single();
  // if (error) throw error;
  // return mapComment(data);

  await new Promise<void>((r) => setTimeout(r, 300));

  return {
    id: `c-new-${Date.now()}`,
    content: parsed.content,
    createdAt: new Date().toISOString(),
    userId,
    userName: 'Você',
    userAvatar: 'https://i.pravatar.cc/150?u=me',
  };
}

/**
 * Mutation para adicionar comentário com validação Zod, rate limiting e
 * optimistic update automático no cache do React Query.
 *
 * @example
 * const { mutate, isPending, error } = useAddComment(activityId);
 * mutate({ content: 'Ótima corrida!' });
 */
export function useAddComment(activityId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CommentInput) => addComment({ activityId, userId, input }),

    // Optimistic update: insere o comentário imediatamente na UI
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ['comments', activityId] });

      const previous = queryClient.getQueryData<Comment[]>(['comments', activityId]);

      const optimisticComment: Comment = {
        id: `optimistic-${Date.now()}`,
        content: input.content,
        createdAt: new Date().toISOString(),
        userId,
        userName: 'Você',
        userAvatar: 'https://i.pravatar.cc/150?u=me',
      };

      queryClient.setQueryData<Comment[]>(
        ['comments', activityId],
        (old) => [...(old ?? []), optimisticComment]
      );

      return { previous };
    },

    // Rollback se der erro
    onError: (err, _variables, context) => {
      logger.error('Failed to add comment', err, 'useAddComment');
      if (context?.previous !== undefined) {
        queryClient.setQueryData(['comments', activityId], context.previous);
      }
    },

    // Sincroniza com o servidor após sucesso
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', activityId] });
    },
  });
}

// ── useDeleteComment ──────────────────────────────────────────────────────────
import { destructiveLimiter } from '../lib/rateLimiter';

export function useDeleteComment(activityId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      destructiveLimiter.checkOrThrow(`delete:${userId}`);

      // TODO: substituir por delete real:
      // const { error } = await supabase
      //   .from('comments')
      //   .delete()
      //   .eq('id', commentId)
      //   .eq('user_id', userId); // RLS garante, mas é boa prática
      // if (error) throw error;

      await new Promise<void>((r) => setTimeout(r, 200));
      return commentId;
    },

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['comments', activityId] });
      const previous = queryClient.getQueryData<Comment[]>(['comments', activityId]);
      queryClient.setQueryData<Comment[]>(
        ['comments', activityId],
        (old) => (old ?? []).filter((c) => c.id !== commentId)
      );
      return { previous };
    },

    onError: (err, _id, context) => {
      logger.error('Failed to delete comment', err, 'useDeleteComment');
      if (context?.previous) {
        queryClient.setQueryData(['comments', activityId], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', activityId] });
    },
  });
}
