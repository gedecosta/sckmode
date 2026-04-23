import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export type LeaderboardType = 'global' | 'run' | 'cycling' | 'swim' | 'crossfit';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  totalKm: number;
  totalActivities: number;
  score: number;
  badge?: string; // emoji badge for podium
}

const PAGE_SIZE = 20;

// ── Mock data generator ───────────────────────────────────────────────────────
const NAMES = [
  'Rafael Torres', 'Ana Costa', 'Julia Farias', 'Marcos Silva',
  'Pedro Alves', 'Carla Nunes', 'Bruno Lima', 'Fernanda Cruz',
  'Lucas Mendes', 'Isabela Rocha', 'Diego Santos', 'Camila Oliveira',
  'Thiago Martins', 'Larissa Freitas', 'Gustavo Pereira', 'Natalia Souza',
  'Rodrigo Carvalho', 'Amanda Gomes', 'Felipe Araujo', 'Priscila Neves',
];

function generateEntries(page: number, type: LeaderboardType): LeaderboardEntry[] {
  const offset = page * PAGE_SIZE;
  return NAMES.slice(0, PAGE_SIZE).map((name, i) => {
    const rank = offset + i + 1;
    const baseScore = Math.max(0, 9800 - rank * 180 + Math.floor(Math.random() * 120));
    return {
      rank,
      userId: `u-${rank}`,
      name,
      avatar: `https://i.pravatar.cc/150?u=${rank + 40}`,
      totalKm: Math.round(baseScore / 10),
      totalActivities: Math.floor(baseScore / 50),
      score: baseScore,
      badge: rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : undefined,
    };
  });
}

async function fetchLeaderboard(
  page: number,
  type: LeaderboardType
): Promise<{ data: LeaderboardEntry[]; nextPage: number | undefined }> {
  await new Promise<void>((r) => setTimeout(r, 500));

  // TODO: substituir por query real:
  // const { data, error } = await supabase.rpc('get_leaderboard', {
  //   sport_type: type === 'global' ? null : type,
  //   page_offset: page * PAGE_SIZE,
  //   page_limit: PAGE_SIZE,
  // });

  const entries = generateEntries(page, type);
  return {
    data: entries,
    nextPage: page < 2 ? page + 1 : undefined, // Mock: apenas 3 páginas
  };
}

/**
 * Hook para leaderboard com paginação infinita.
 *
 * @example
 * const { data, fetchNextPage, hasNextPage } = useLeaderboard('global');
 */
export function useLeaderboard(type: LeaderboardType = 'global') {
  return useInfiniteQuery({
    queryKey: ['leaderboard', type],
    queryFn: ({ pageParam }) => fetchLeaderboard(pageParam as number, type),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60_000, // 5 min — leaderboard não muda tão frequentemente
  });
}
