import { useQuery } from '@tanstack/react-query';

export interface SplitData {
  km: number;
  pace: string; // ex: "5:12/km"
  heartRate: number;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface ActivityDetail {
  id: string;
  type: string;
  typeIcon: string;
  title: string;
  date: string;
  authorName: string;
  authorAvatar: string;
  authorId: string;
  // Primary metrics
  distanceKm: number;
  durationFormatted: string; // "45:12"
  pace: string; // "5:09/km"
  heartRateAvg: number;
  // Elevation
  elevationGainM: number;
  // Splits
  splits: SplitData[];
  // Route
  route: RoutePoint[];
  // Notes
  notes?: string;
  // Engagement
  likesCount: number;
  commentsCount: number;
}

// ── Mock fetcher ──────────────────────────────────────────────────────────────
async function fetchActivityDetails(id: string): Promise<ActivityDetail> {
  await new Promise<void>((r) => setTimeout(r, 600));

  // TODO: substituir por query real:
  // const { data, error } = await supabase
  //   .from('activities')
  //   .select(`*, profiles(full_name, avatar_url), activity_points(lat, lng)`)
  //   .eq('id', id)
  //   .single();
  // if (error) throw error;

  return {
    id,
    type: 'Corrida',
    typeIcon: '🏃',
    title: 'Corrida matinal no Ibirapuera',
    date: '2026-04-22T07:30:00.000Z',
    authorName: 'Julia Farias',
    authorAvatar: 'https://i.pravatar.cc/150?u=1',
    authorId: 'u1',
    distanceKm: 8.5,
    durationFormatted: '45:12',
    pace: '5:19/km',
    heartRateAvg: 148,
    elevationGainM: 82,
    splits: [
      { km: 1, pace: '5:45/km', heartRate: 135 },
      { km: 2, pace: '5:22/km', heartRate: 142 },
      { km: 3, pace: '5:18/km', heartRate: 147 },
      { km: 4, pace: '5:12/km', heartRate: 151 },
      { km: 5, pace: '5:09/km', heartRate: 154 },
      { km: 6, pace: '5:11/km', heartRate: 153 },
      { km: 7, pace: '5:14/km', heartRate: 150 },
      { km: 8, pace: '5:20/km', heartRate: 146 },
      { km: 9, pace: '5:28/km', heartRate: 143 },
    ],
    // Mock route — parque Ibirapuera aproximado
    route: [
      { latitude: -23.587, longitude: -46.657 },
      { latitude: -23.589, longitude: -46.659 },
      { latitude: -23.591, longitude: -46.661 },
      { latitude: -23.592, longitude: -46.664 },
      { latitude: -23.590, longitude: -46.666 },
      { latitude: -23.588, longitude: -46.663 },
      { latitude: -23.586, longitude: -46.660 },
      { latitude: -23.587, longitude: -46.657 },
    ],
    notes: 'Ótima manhã! Clima perfeito para correr. Último km forçado o ritmo.',
    likesCount: 24,
    commentsCount: 3,
  };
}

/**
 * Hook para detalhes completos de uma atividade (mapa, splits, métricas).
 *
 * @example
 * const { data: activity, isLoading } = useActivityDetails(id);
 */
export function useActivityDetails(id: string) {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => fetchActivityDetails(id),
    enabled: !!id,
    staleTime: 5 * 60_000,
  });
}
