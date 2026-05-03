import { create } from 'zustand';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export type AchievementCategory =
  | 'endurance' | 'multisport' | 'cycling' | 'swimming'
  | 'strength' | 'cardio' | 'flexibility' | 'combat'
  | 'outdoor' | 'team' | 'racket' | 'consistency';

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  tier: AchievementTier;
  requirement: string;
  scoreValue: number;
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt?: string;
  progress: number;
}

export const CATEGORY_META: Record<AchievementCategory, { label: string }> = {
  endurance:   { label: 'Resistência' },
  multisport:  { label: 'Multiesporte' },
  cycling:     { label: 'Ciclismo' },
  swimming:    { label: 'Natação' },
  strength:    { label: 'Força' },
  cardio:      { label: 'Cardio' },
  flexibility: { label: 'Flexibilidade' },
  combat:      { label: 'Combate' },
  outdoor:     { label: 'Outdoor' },
  team:        { label: 'Time' },
  racket:      { label: 'Raquete' },
  consistency: { label: 'Consistência' },
};

export const TIER_META: Record<AchievementTier, { label: string; color: string }> = {
  bronze:   { label: 'Bronze',   color: '#C08450' },
  silver:   { label: 'Prata',    color: '#B3BDC7' },
  gold:     { label: 'Ouro',     color: '#E2B155' },
  platinum: { label: 'Platina',  color: '#D3DAE2' },
  diamond:  { label: 'Diamante', color: '#67BBFF' },
};

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: '1',  title: 'Primeiro 5K',        category: 'endurance',   tier: 'bronze',   requirement: 'Corra 5km',                    scoreValue: 100  },
  { id: '2',  title: 'Meia-Maratona',       category: 'endurance',   tier: 'gold',     requirement: 'Complete 21km',                scoreValue: 400  },
  { id: '3',  title: 'Maratonista',         category: 'endurance',   tier: 'platinum', requirement: 'Complete uma maratona',         scoreValue: 800  },
  { id: '4',  title: 'Centurião',           category: 'endurance',   tier: 'diamond',  requirement: '100 corridas registradas',      scoreValue: 2000 },
  { id: '5',  title: 'Triatleta',           category: 'multisport',  tier: 'silver',   requirement: 'Complete um triathlon Sprint',  scoreValue: 300  },
  { id: '6',  title: 'Iron Man Virtual',    category: 'multisport',  tier: 'diamond',  requirement: 'Distância Iron em 7 dias',      scoreValue: 2000 },
  { id: '7',  title: 'Ciclista Urbano',     category: 'cycling',     tier: 'bronze',   requirement: 'Pedale 50km',                  scoreValue: 100  },
  { id: '8',  title: '500K Ciclismo',       category: 'cycling',     tier: 'gold',     requirement: 'Acumule 500km pedalados',       scoreValue: 500  },
  { id: '9',  title: 'Peixe Dourado',       category: 'swimming',    tier: 'silver',   requirement: 'Nade 10km no total',           scoreValue: 250  },
  { id: '10', title: 'Aguas Abertas',       category: 'swimming',    tier: 'gold',     requirement: 'Nade 5km em aguas abertas',    scoreValue: 400  },
  { id: '11', title: 'Iron Core',           category: 'strength',    tier: 'silver',   requirement: '20 sessões de força',          scoreValue: 200  },
  { id: '12', title: 'Crossfit Beast',      category: 'strength',    tier: 'gold',     requirement: '50 sessões de força',          scoreValue: 400  },
  { id: '13', title: 'Cardio King',         category: 'cardio',      tier: 'silver',   requirement: '20 sessões HIIT',              scoreValue: 200  },
  { id: '14', title: 'Zen Master',          category: 'flexibility', tier: 'bronze',   requirement: '10 sessões de yoga',           scoreValue: 100  },
  { id: '15', title: 'Guerreiro',           category: 'combat',      tier: 'silver',   requirement: '20 sessões de combate',        scoreValue: 200  },
  { id: '16', title: 'Trilheiro',           category: 'outdoor',     tier: 'silver',   requirement: '10 trilhas registradas',       scoreValue: 250  },
  { id: '17', title: 'Montanhista',         category: 'outdoor',     tier: 'platinum', requirement: '20 trilhas de montanha',       scoreValue: 800  },
  { id: '18', title: 'Jogador de Equipe',   category: 'team',        tier: 'bronze',   requirement: '5 atividades em grupo',        scoreValue: 100  },
  { id: '19', title: 'Ace',                 category: 'racket',      tier: 'silver',   requirement: '15 sessões de raquete',        scoreValue: 200  },
  { id: '20', title: 'Madrugador',          category: 'consistency', tier: 'silver',   requirement: '20 treinos antes das 7h',      scoreValue: 250  },
  { id: '21', title: 'Mês Perfeito',        category: 'consistency', tier: 'gold',     requirement: 'Treine todos os dias em 1 mês',scoreValue: 600  },
  { id: '22', title: 'Sequência de 100',    category: 'consistency', tier: 'diamond',  requirement: '100 dias consecutivos',        scoreValue: 2000 },
];

interface AchievementState {
  userAchievements: UserAchievement[];
  totalScore: number;
  selectedCategory: 'all' | AchievementCategory;
  setCategory: (cat: 'all' | AchievementCategory) => void;
}

export const useAchievementStore = create<AchievementState>((set) => ({
  userAchievements: [
    { achievementId: '1',  unlockedAt: '2023-10-01', progress: 100 },
    { achievementId: '7',  unlockedAt: '2024-07-10', progress: 100 },
    { achievementId: '20', unlockedAt: '2023-10-15', progress: 100 },
    { achievementId: '2',  unlockedAt: '2024-06-01', progress: 100 },
    { achievementId: '8',  unlockedAt: '2024-07-10', progress: 100 },
    { achievementId: '3',  progress: 45 },
    { achievementId: '6',  progress: 20 },
    { achievementId: '22', progress: 14 },
  ],
  totalScore: 1950,
  selectedCategory: 'all',
  setCategory: (cat) => set({ selectedCategory: cat }),
}));
