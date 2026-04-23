import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useDebouncedValue } from './useDebouncedValue';

export type SportFilter = 'all' | 'run' | 'cycling' | 'swim' | 'crossfit' | 'yoga';

export interface AthleteProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  sport: SportFilter;
  followerCount: number;
  activitiesCount: number;
  isPro: boolean;
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const MOCK_ATHLETES: AthleteProfile[] = [
  { id: 'u1', name: 'Julia Farias', avatar: 'https://i.pravatar.cc/150?u=30', bio: 'Corredora de maratona 🏃‍♀️', location: 'São Paulo', sport: 'run', followerCount: 1240, activitiesCount: 312, isPro: true },
  { id: 'u2', name: 'Marcos Silva', avatar: 'https://i.pravatar.cc/150?u=31', bio: 'Ciclista amador, amante de montanhas 🚴', location: 'Curitiba', sport: 'cycling', followerCount: 856, activitiesCount: 180, isPro: false },
  { id: 'u3', name: 'Ana Costa', avatar: 'https://i.pravatar.cc/150?u=32', bio: 'Triatleta | Iron Man finisher 🏊🚲🏃', location: 'Rio de Janeiro', sport: 'swim', followerCount: 2100, activitiesCount: 450, isPro: true },
  { id: 'u4', name: 'Pedro Alves', avatar: 'https://i.pravatar.cc/150?u=33', bio: 'CrossFit Level 2 | Coach', location: 'Belo Horizonte', sport: 'crossfit', followerCount: 640, activitiesCount: 280, isPro: false },
  { id: 'u5', name: 'Carla Nunes', avatar: 'https://i.pravatar.cc/150?u=34', bio: 'Yoga & meditação ☯️', location: 'Florianópolis', sport: 'yoga', followerCount: 980, activitiesCount: 200, isPro: false },
  { id: 'u6', name: 'Rafael Torres', avatar: 'https://i.pravatar.cc/150?u=35', bio: 'Ultra runner | 100km sem parar 💪', location: 'São Paulo', sport: 'run', followerCount: 3200, activitiesCount: 620, isPro: true },
];

async function fetchAthletes(query: string, sport: SportFilter): Promise<AthleteProfile[]> {
  await new Promise<void>((r) => setTimeout(r, 400));

  // TODO: substituir por query real:
  // const { data, error } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .ilike('full_name', `%${query}%`)
  //   .eq(sport !== 'all' ? 'primary_sport' : 'id', sport !== 'all' ? sport : supabase.rpc('uuid'))
  //   .order('follower_count', { ascending: false })
  //   .limit(20);

  let athletes = [...MOCK_ATHLETES];

  if (query.trim()) {
    const q = query.toLowerCase();
    athletes = athletes.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.bio.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q)
    );
  }

  if (sport !== 'all') {
    athletes = athletes.filter((a) => a.sport === sport);
  }

  return athletes;
}

/**
 * Hook para busca de atletas com debounce automático.
 * Query só dispara após 400ms sem digitação para evitar excesso de requests.
 *
 * @example
 * const { data: athletes, isLoading } = useDiscoverUsers(searchQuery, sportFilter);
 */
export function useDiscoverUsers(query: string, sport: SportFilter = 'all') {
  const debouncedQuery = useDebouncedValue(query, 400);

  return useQuery({
    queryKey: ['discover', debouncedQuery, sport],
    queryFn: () => fetchAthletes(debouncedQuery, sport),
    staleTime: 60_000,
  });
}
