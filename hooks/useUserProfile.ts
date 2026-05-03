import { useQuery } from '@tanstack/react-query';
import type { Badge } from '../components/profile/BadgeGrid';

export interface UserProfileData {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  sport: string;
  location: string;
  level: number;
  isPro: boolean;
  joinedAt: string;
  stats: {
    followers: number;
    following: number;
    activities: number;
    prs: number;
    totalDistance: string;
    totalDuration: string;
  };
  badges: Badge[];
  recentActivities: UserActivity[];
  activeChallenges: UserChallenge[];
}

export interface UserActivity {
  id: string;
  sport: string;
  duration: string;
  distance: string;
  pace: string;
  date: string;
  image?: string;
}

export interface UserChallenge {
  id: string;
  title: string;
  progress: number;
  target: number;
  unit: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  endsAt: string;
}

const MOCK_PROFILES: Record<string, UserProfileData> = {};

function generateProfile(username: string): UserProfileData {
  if (MOCK_PROFILES[username]) return MOCK_PROFILES[username];

  const profile: UserProfileData = {
    id: `user-${username}`,
    username,
    name: username,
    avatar: `https://i.pravatar.cc/300?u=${encodeURIComponent(username)}`,
    bio: 'Apaixonado por esportes e desafios. Sempre buscando o próximo PR.',
    sport: 'Corrida',
    location: 'São Paulo, Brasil',
    level: Math.floor(Math.random() * 50) + 5,
    isPro: Math.random() > 0.6,
    joinedAt: '2024-06-15',
    stats: {
      followers: Math.floor(Math.random() * 2000) + 50,
      following: Math.floor(Math.random() * 500) + 10,
      activities: Math.floor(Math.random() * 800) + 20,
      prs: Math.floor(Math.random() * 30) + 2,
      totalDistance: `${(Math.random() * 3000 + 100).toFixed(0)} km`,
      totalDuration: `${Math.floor(Math.random() * 500 + 50)}h`,
    },
    badges: [
      { id: 'b1', name: 'Primeiro 5K',  tier: 'silver',   category: 'endurance',   unlockedAt: '2024-07-01' },
      { id: 'b2', name: 'Madrugador',   tier: 'bronze',   category: 'consistency', unlockedAt: '2024-08-15' },
      { id: 'b3', name: 'Sequência 7',  tier: 'gold',     category: 'consistency', unlockedAt: '2024-09-10' },
      { id: 'b4', name: 'Iron Man',     tier: 'diamond',  category: 'multisport' },
      { id: 'b5', name: 'Ultra Runner', tier: 'gold',     category: 'endurance'  },
    ],
    recentActivities: [
      { id: 'a1', sport: 'Corrida', duration: '42:15', distance: '7.2 km', pace: '5:52/km', date: '2026-04-16', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400' },
      { id: 'a2', sport: 'Ciclismo', duration: '1:15:30', distance: '32.5 km', pace: '25.8 km/h', date: '2026-04-15' },
      { id: 'a3', sport: 'Corrida', duration: '28:44', distance: '5.0 km', pace: '5:45/km', date: '2026-04-14', image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400' },
      { id: 'a4', sport: 'Natação', duration: '35:00', distance: '1.5 km', pace: '2:20/100m', date: '2026-04-12' },
      { id: 'a5', sport: 'Corrida', duration: '55:20', distance: '10.0 km', pace: '5:32/km', date: '2026-04-10' },
    ],
    activeChallenges: [
      { id: 'c1', title: 'Corrida 100km Abril', progress: 68, target: 100, unit: 'km', difficulty: 'MEDIUM', endsAt: '2026-04-30' },
      { id: 'c2', title: 'Treino 20 Dias', progress: 14, target: 20, unit: 'dias', difficulty: 'HARD', endsAt: '2026-04-30' },
    ],
  };

  MOCK_PROFILES[username] = profile;
  return profile;
}

const fetchUserProfile = async (username: string): Promise<UserProfileData> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return generateProfile(username);
};

export function useUserProfile(username: string) {
  return useQuery({
    queryKey: ['user-profile', username],
    queryFn: () => fetchUserProfile(username),
    staleTime: 1000 * 60 * 5,
    enabled: !!username,
  });
}
