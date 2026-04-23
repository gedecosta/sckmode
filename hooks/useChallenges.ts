import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { logger } from '../lib/logger';

export type ChallengeFilter = 'trending' | 'popular' | 'new' | 'all';
export type ExerciseType = 'run' | 'cycling' | 'swim' | 'pushups' | 'pullups' | 'crossfit' | 'yoga' | 'other';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  type: ExerciseType;
  participantCount: number;
  completionCount: number;
  createdAt: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  isPublic: boolean;
  color: string; // hex accent color
}

// ── Mock data (substitua por query real quando o Supabase estiver configurado) ──
const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Murph Challenge',
    description: '1 milha correndo, 100 pull-ups, 200 flexões, 300 agachamentos, 1 milha correndo.',
    difficulty: 'hard',
    type: 'crossfit',
    participantCount: 1240,
    completionCount: 412,
    createdAt: '2026-04-01',
    creatorId: 'u1',
    creatorName: 'Carlos Murph',
    creatorAvatar: 'https://i.pravatar.cc/150?u=10',
    isPublic: true,
    color: '#E03131',
  },
  {
    id: '2',
    title: 'Desafio 5K Sub-20',
    description: 'Corra 5km em menos de 20 minutos. Registre pelo GPS.',
    difficulty: 'medium',
    type: 'run',
    participantCount: 856,
    completionCount: 234,
    createdAt: '2026-04-05',
    creatorId: 'u2',
    creatorName: 'Ana Corredora',
    creatorAvatar: 'https://i.pravatar.cc/150?u=11',
    isPublic: true,
    color: '#D4A640',
  },
  {
    id: '3',
    title: '100 Flexões em 30 Dias',
    description: 'Construa o hábito. 100 flexões todo dia, durante 30 dias consecutivos.',
    difficulty: 'medium',
    type: 'pushups',
    participantCount: 4320,
    completionCount: 1800,
    createdAt: '2026-03-20',
    creatorId: 'u3',
    creatorName: 'David Goggins Fan',
    creatorAvatar: 'https://i.pravatar.cc/150?u=12',
    isPublic: true,
    color: '#48BB78',
  },
  {
    id: '4',
    title: 'Iron Man Virtual',
    description: 'Triathlon na distância Iron em uma semana: 3.8km natação + 180km bike + 42km corrida.',
    difficulty: 'extreme',
    type: 'swim',
    participantCount: 321,
    completionCount: 28,
    createdAt: '2026-04-10',
    creatorId: 'u4',
    creatorName: 'Triathlon BR',
    creatorAvatar: 'https://i.pravatar.cc/150?u=13',
    isPublic: true,
    color: '#4A90D9',
  },
];

async function fetchChallenges(filter: ChallengeFilter): Promise<Challenge[]> {
  // Simula delay de rede
  await new Promise<void>((r) => setTimeout(r, 600));

  // TODO: quando o Supabase estiver configurado, substitua por:
  // const { data, error } = await supabase
  //   .from('challenges')
  //   .select(`*, profiles(full_name, avatar_url)`)
  //   .eq('is_public', true)
  //   .order(filter === 'new' ? 'created_at' : 'participant_count', { ascending: false })
  //   .limit(20);
  // if (error) throw error;

  let challenges = [...MOCK_CHALLENGES];

  switch (filter) {
    case 'trending':
      challenges = challenges.sort((a, b) => b.participantCount - a.participantCount);
      break;
    case 'popular':
      challenges = challenges.sort((a, b) => b.completionCount - a.completionCount);
      break;
    case 'new':
      challenges = challenges.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  return challenges;
}

/**
 * Hook para listar desafios com filtros.
 *
 * @example
 * const { data, isLoading, refetch } = useChallenges('trending');
 */
export function useChallenges(filter: ChallengeFilter = 'trending') {
  return useQuery({
    queryKey: ['challenges', filter],
    queryFn: () => fetchChallenges(filter),
    staleTime: 2 * 60 * 1000, // 2 min
  });
}
