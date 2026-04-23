import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  userName: string;
  userAvatar: string;
}

// ── Mock fetcher ──────────────────────────────────────────────────────────────
async function fetchComments(activityId: string): Promise<Comment[]> {
  await new Promise<void>((r) => setTimeout(r, 400));

  // TODO: substituir por query real:
  // const { data, error } = await supabase
  //   .from('comments')
  //   .select(`*, profiles(full_name, avatar_url)`)
  //   .eq('activity_id', activityId)
  //   .order('created_at', { ascending: true });
  // if (error) throw error;
  // return data.map(mapComment);

  return [
    {
      id: `c-${activityId}-1`,
      content: 'Que corrida incrível! 🔥',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      userId: 'u1',
      userName: 'Marcos Silva',
      userAvatar: 'https://i.pravatar.cc/150?u=20',
    },
    {
      id: `c-${activityId}-2`,
      content: 'Inspiração pura! Vou tentar superar esse pace semana que vem.',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      userId: 'u2',
      userName: 'Ana Triatleta',
      userAvatar: 'https://i.pravatar.cc/150?u=21',
    },
    {
      id: `c-${activityId}-3`,
      content: 'Mandou bem! 💪',
      createdAt: new Date(Date.now() - 600000).toISOString(),
      userId: 'u3',
      userName: 'Pedro Corredor',
      userAvatar: 'https://i.pravatar.cc/150?u=22',
    },
  ];
}

/**
 * Busca comentários de uma atividade.
 *
 * @example
 * const { data: comments, isLoading } = useComments(activityId);
 */
export function useComments(activityId: string) {
  return useQuery({
    queryKey: ['comments', activityId],
    queryFn: () => fetchComments(activityId),
    enabled: !!activityId,
    staleTime: 30_000,
  });
}
