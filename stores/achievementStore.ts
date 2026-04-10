import { create } from 'zustand';

// ─── Achievement Tiers ───────────────────────────────────────
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

// ─── Achievement Categories ──────────────────────────────────
export type AchievementCategory =
  | 'endurance'      // Corrida longa distância, ultramaratona
  | 'multisport'     // Triathlon, Iron Man, Duathlon
  | 'cycling'        // Ciclismo (estrada, mountain bike)
  | 'swimming'       // Natação (mar aberto, piscina)
  | 'strength'       // Musculação e força funcional
  | 'cardio'         // Treinos cardiorespiratórios (HIIT, crossfit)
  | 'flexibility'    // Yoga, mobilidade
  | 'combat'         // Artes marciais, boxe
  | 'outdoor'        // Trilha, escalada, montanhismo
  | 'team'           // Esportes coletivos (futebol, vôlei, basquete)
  | 'racket'         // Tênis, padel, badminton
  | 'consistency';   // Constância e evolução geral

// ─── Achievement Definition ─────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;          // emoji or lucide icon key
  accentColor: string;   // hex border/glow color
  bgColor: string;       // hex background color
  requirement: string;   // human-readable requirement
  scoreValue: number;    // points awarded
}

// ─── User Achievement Progress ──────────────────────────────
export interface UserAchievement {
  achievementId: string;
  progress: number;      // 0-100
  unlockedAt?: string;   // ISO date
}

// ─── All Achievements ────────────────────────────────────────
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // ── ENDURANCE ──────────────────────────────────────────────
  {
    id: 'ultra_100k',
    title: 'Reconhecimento de Ultramaratona',
    subtitle: '100+ KM',
    description: 'Complete uma ultramaratona de 100 km ou mais em uma única prova.',
    category: 'endurance',
    tier: 'diamond',
    icon: '⛰️',
    accentColor: '#A0AEC0',
    bgColor: '#1A202C',
    requirement: 'Distância Extrema',
    scoreValue: 500,
  },
  {
    id: 'marathon_elite',
    title: 'Maratonista de Elite',
    subtitle: '42.2K',
    description: 'Complete uma maratona completa (42.195 km).',
    category: 'endurance',
    tier: 'platinum',
    icon: '🏅',
    accentColor: '#4299E1',
    bgColor: '#1A365D',
    requirement: '42.2 km percorridos',
    scoreValue: 350,
  },
  {
    id: 'half_marathon',
    title: 'Meia-Maratonista',
    subtitle: '21.1K',
    description: 'Complete uma meia maratona (21.1 km).',
    category: 'endurance',
    tier: 'gold',
    icon: '🌿',
    accentColor: '#48BB78',
    bgColor: '#1C4532',
    requirement: '21.1 km percorridos',
    scoreValue: 200,
  },
  {
    id: 'first_10k',
    title: 'Corredor 10K',
    subtitle: 'Primeiro 10K',
    description: 'Complete sua primeira corrida de 10 km.',
    category: 'endurance',
    tier: 'silver',
    icon: '🏃',
    accentColor: '#A0AEC0',
    bgColor: '#2D3748',
    requirement: '10 km percorridos',
    scoreValue: 100,
  },
  {
    id: 'first_5k',
    title: 'Iniciante Veloz',
    subtitle: 'Primeiro 5K',
    description: 'Complete sua primeira corrida de 5 km.',
    category: 'endurance',
    tier: 'bronze',
    icon: '👟',
    accentColor: '#C67A3C',
    bgColor: '#3D2914',
    requirement: '5 km percorridos',
    scoreValue: 50,
  },

  // ── MULTISPORT ─────────────────────────────────────────────
  {
    id: 'ironman',
    title: 'Conquista do Ironman',
    subtitle: 'Triatleta Completo',
    description: 'Complete as três modalidades do Iron Man: 3.8 km de natação, 180 km de ciclismo e 42.2 km de corrida.',
    category: 'multisport',
    tier: 'diamond',
    icon: '🔺',
    accentColor: '#E53E3E',
    bgColor: '#3B1A1A',
    requirement: 'Desafio de Resistência',
    scoreValue: 500,
  },
  {
    id: 'triathlon_champion',
    title: 'Triatlo: Campeão Geral',
    subtitle: 'Excelência Esportiva',
    description: 'Complete um triathlon olímpico ou superior.',
    category: 'multisport',
    tier: 'platinum',
    icon: '🏆',
    accentColor: '#D4A640',
    bgColor: '#3D3419',
    requirement: 'Excelência Esportiva',
    scoreValue: 400,
  },
  {
    id: 'duathlon',
    title: 'Duatleta',
    subtitle: 'Corrida + Ciclismo',
    description: 'Complete um duathlon oficial.',
    category: 'multisport',
    tier: 'gold',
    icon: '🚴',
    accentColor: '#ED8936',
    bgColor: '#3D2E14',
    requirement: 'Corrida + Ciclismo',
    scoreValue: 250,
  },

  // ── CYCLING ────────────────────────────────────────────────
  {
    id: 'cycling_century',
    title: 'Especialista em Ciclismo',
    subtitle: '100 km em uma pedalada',
    description: 'Complete 100 km em uma única atividade de ciclismo.',
    category: 'cycling',
    tier: 'platinum',
    icon: '⚙️',
    accentColor: '#9F7AEA',
    bgColor: '#2D1F5E',
    requirement: 'Potência e Velocidade',
    scoreValue: 350,
  },
  {
    id: 'cycling_500',
    title: 'Rodas de Aço',
    subtitle: '500 km acumulados',
    description: 'Acumule 500 km em ciclismo.',
    category: 'cycling',
    tier: 'gold',
    icon: '🚲',
    accentColor: '#B794F4',
    bgColor: '#322659',
    requirement: '500 km totais',
    scoreValue: 200,
  },
  {
    id: 'mtb_trail',
    title: 'Desbravador de Trilhas',
    subtitle: 'Mountain Bike',
    description: 'Complete 10 atividades de mountain bike.',
    category: 'cycling',
    tier: 'silver',
    icon: '🏔️',
    accentColor: '#68D391',
    bgColor: '#1C3D2A',
    requirement: '10 atividades MTB',
    scoreValue: 150,
  },

  // ── SWIMMING ───────────────────────────────────────────────
  {
    id: 'open_water',
    title: 'Águas Abertas',
    subtitle: 'Mar Aberto',
    description: 'Complete uma travessia de águas abertas de pelo menos 2 km.',
    category: 'swimming',
    tier: 'platinum',
    icon: '🌊',
    accentColor: '#63B3ED',
    bgColor: '#1A365D',
    requirement: '2 km em águas abertas',
    scoreValue: 300,
  },
  {
    id: 'swim_1km',
    title: 'Aquático',
    subtitle: '1 km de natação',
    description: 'Complete 1 km de natação em uma sessão.',
    category: 'swimming',
    tier: 'gold',
    icon: '🏊',
    accentColor: '#4FD1C5',
    bgColor: '#1A3A3A',
    requirement: '1 km nadado',
    scoreValue: 200,
  },

  // ── STRENGTH ───────────────────────────────────────────────
  {
    id: 'iron_body',
    title: 'Corpo de Ferro',
    subtitle: 'Força Máxima',
    description: 'Complete 100 sessões de musculação.',
    category: 'strength',
    tier: 'platinum',
    icon: '💪',
    accentColor: '#FC8181',
    bgColor: '#3B1A1A',
    requirement: '100 sessões de força',
    scoreValue: 350,
  },
  {
    id: 'calisthenics',
    title: 'Mestre Calistênico',
    subtitle: 'Peso Corporal',
    description: 'Complete 50 treinos de calistenia.',
    category: 'strength',
    tier: 'gold',
    icon: '🤸',
    accentColor: '#F6AD55',
    bgColor: '#3D2E14',
    requirement: '50 treinos bodyweight',
    scoreValue: 200,
  },
  {
    id: 'pushup_master',
    title: 'Rei das Flexões',
    subtitle: '1000 Flexões',
    description: 'Acumule 1000 flexões no total.',
    category: 'strength',
    tier: 'silver',
    icon: '🏋️',
    accentColor: '#A0AEC0',
    bgColor: '#2D3748',
    requirement: '1000 flexões totais',
    scoreValue: 150,
  },

  // ── CARDIO ─────────────────────────────────────────────────
  {
    id: 'hiit_warrior',
    title: 'Guerreiro HIIT',
    subtitle: 'Alta Intensidade',
    description: 'Complete 50 sessões de treino HIIT.',
    category: 'cardio',
    tier: 'gold',
    icon: '🔥',
    accentColor: '#F56565',
    bgColor: '#3B1818',
    requirement: '50 sessões HIIT',
    scoreValue: 250,
  },
  {
    id: 'crossfit_beast',
    title: 'Besta do CrossFit',
    subtitle: 'WODs Completados',
    description: 'Complete 30 WODs de CrossFit.',
    category: 'cardio',
    tier: 'gold',
    icon: '⚡',
    accentColor: '#ECC94B',
    bgColor: '#3D3419',
    requirement: '30 WODs',
    scoreValue: 250,
  },
  {
    id: 'jump_rope',
    title: 'Saltador',
    subtitle: 'Corda Naval',
    description: 'Acumule 100.000 saltos de corda.',
    category: 'cardio',
    tier: 'silver',
    icon: '🪢',
    accentColor: '#F687B3',
    bgColor: '#3D1A2E',
    requirement: '100K saltos',
    scoreValue: 150,
  },

  // ── FLEXIBILITY ────────────────────────────────────────────
  {
    id: 'yoga_zen',
    title: 'Mestre Zen',
    subtitle: 'Yoga Avançado',
    description: 'Complete 100 sessões de yoga.',
    category: 'flexibility',
    tier: 'gold',
    icon: '🧘',
    accentColor: '#9AE6B4',
    bgColor: '#1C3D2A',
    requirement: '100 sessões yoga',
    scoreValue: 200,
  },

  // ── COMBAT ─────────────────────────────────────────────────
  {
    id: 'fighter',
    title: 'Lutador',
    subtitle: 'Artes Marciais',
    description: 'Complete 50 sessões de treino de luta.',
    category: 'combat',
    tier: 'gold',
    icon: '🥊',
    accentColor: '#E53E3E',
    bgColor: '#3B1A1A',
    requirement: '50 sessões de luta',
    scoreValue: 250,
  },

  // ── OUTDOOR ────────────────────────────────────────────────
  {
    id: 'mountaineer',
    title: 'Montanhista',
    subtitle: 'Altitudes Extremas',
    description: 'Complete 20 trilhas de montanha com ganho de elevação acima de 500m.',
    category: 'outdoor',
    tier: 'platinum',
    icon: '🗻',
    accentColor: '#A0AEC0',
    bgColor: '#1A202C',
    requirement: '20 trilhas +500m',
    scoreValue: 350,
  },
  {
    id: 'trail_runner',
    title: 'Corredor de Trilha',
    subtitle: 'Off-Road',
    description: 'Complete 30 corridas em trilha.',
    category: 'outdoor',
    tier: 'gold',
    icon: '🌲',
    accentColor: '#68D391',
    bgColor: '#1C3D2A',
    requirement: '30 trilhas',
    scoreValue: 200,
  },

  // ── TEAM ───────────────────────────────────────────────────
  {
    id: 'team_player',
    title: 'Jogador de Equipe',
    subtitle: 'Espírito Coletivo',
    description: 'Participe de 25 atividades em grupo.',
    category: 'team',
    tier: 'gold',
    icon: '⚽',
    accentColor: '#4FD1C5',
    bgColor: '#1A3A3A',
    requirement: '25 atividades em grupo',
    scoreValue: 200,
  },

  // ── RACKET ─────────────────────────────────────────────────
  {
    id: 'racket_master',
    title: 'Mestre da Raquete',
    subtitle: 'Tênis & Padel',
    description: 'Complete 30 partidas de esportes de raquete.',
    category: 'racket',
    tier: 'gold',
    icon: '🎾',
    accentColor: '#9AE6B4',
    bgColor: '#1C3D2A',
    requirement: '30 partidas',
    scoreValue: 200,
  },

  // ── CONSISTENCY ────────────────────────────────────────────
  {
    id: 'persistent',
    title: 'Persistência Comprovada',
    subtitle: '365 Dias',
    description: 'Treine pelo menos 1x por semana durante 1 ano inteiro.',
    category: 'consistency',
    tier: 'platinum',
    icon: '📅',
    accentColor: '#4299E1',
    bgColor: '#1A365D',
    requirement: '52 semanas seguidas',
    scoreValue: 400,
  },
  {
    id: 'evolution',
    title: 'Fundamentos e Evolução',
    subtitle: 'Progresso Contínuo',
    description: 'Complete 50 atividades variadas ao longo de 3 meses.',
    category: 'consistency',
    tier: 'gold',
    icon: '📈',
    accentColor: '#48BB78',
    bgColor: '#1C4532',
    requirement: '50 atividades em 3 meses',
    scoreValue: 250,
  },
  {
    id: 'early_bird',
    title: 'Madrugador',
    subtitle: 'Antes das 6h',
    description: 'Complete 20 treinos antes das 6h da manhã.',
    category: 'consistency',
    tier: 'silver',
    icon: '🌅',
    accentColor: '#F6AD55',
    bgColor: '#3D2E14',
    requirement: '20 treinos pré-6h',
    scoreValue: 150,
  },
  {
    id: 'night_owl',
    title: 'Coruja Noturna',
    subtitle: 'Após as 22h',
    description: 'Complete 20 treinos após as 22h.',
    category: 'consistency',
    tier: 'silver',
    icon: '🌙',
    accentColor: '#A78BFA',
    bgColor: '#2D1F5E',
    requirement: '20 treinos pós-22h',
    scoreValue: 150,
  },
];

// ─── Category Metadata ───────────────────────────────────────
export const CATEGORY_META: Record<AchievementCategory, { label: string; icon: string; color: string }> = {
  endurance:   { label: 'Resistência',        icon: '🏃', color: '#4299E1' },
  multisport:  { label: 'Multiesporte',       icon: '🔺', color: '#E53E3E' },
  cycling:     { label: 'Ciclismo',           icon: '🚲', color: '#9F7AEA' },
  swimming:    { label: 'Natação',            icon: '🏊', color: '#63B3ED' },
  strength:    { label: 'Força',              icon: '💪', color: '#FC8181' },
  cardio:      { label: 'Cardio & HIIT',      icon: '🔥', color: '#F56565' },
  flexibility: { label: 'Flexibilidade',      icon: '🧘', color: '#9AE6B4' },
  combat:      { label: 'Luta & Combate',     icon: '🥊', color: '#E53E3E' },
  outdoor:     { label: 'Outdoor & Aventura', icon: '🗻', color: '#68D391' },
  team:        { label: 'Esportes Coletivos', icon: '⚽', color: '#4FD1C5' },
  racket:      { label: 'Raquete',            icon: '🎾', color: '#9AE6B4' },
  consistency: { label: 'Constância',         icon: '📈', color: '#48BB78' },
};

export const TIER_META: Record<AchievementTier, { label: string; color: string; glowOpacity: number }> = {
  bronze:   { label: 'Bronze',   color: '#C67A3C', glowOpacity: 0.15 },
  silver:   { label: 'Prata',    color: '#A0AEC0', glowOpacity: 0.2 },
  gold:     { label: 'Ouro',     color: '#D4A640', glowOpacity: 0.25 },
  platinum: { label: 'Platina',  color: '#7B8FA0', glowOpacity: 0.3 },
  diamond:  { label: 'Diamante', color: '#82C4F5', glowOpacity: 0.4 },
};

// ─── Store ───────────────────────────────────────────────────
interface AchievementState {
  userAchievements: UserAchievement[];
  totalScore: number;
  selectedCategory: AchievementCategory | 'all';
  setCategory: (cat: AchievementCategory | 'all') => void;
}

// Mock some unlocked achievements for demo
const MOCK_USER_ACHIEVEMENTS: UserAchievement[] = [
  { achievementId: 'first_5k',     progress: 100, unlockedAt: '2024-03-15' },
  { achievementId: 'first_10k',    progress: 100, unlockedAt: '2024-06-20' },
  { achievementId: 'half_marathon', progress: 72 },
  { achievementId: 'pushup_master', progress: 100, unlockedAt: '2024-08-01' },
  { achievementId: 'early_bird',   progress: 100, unlockedAt: '2024-05-10' },
  { achievementId: 'hiit_warrior', progress: 64 },
  { achievementId: 'cycling_500',  progress: 45 },
  { achievementId: 'evolution',    progress: 100, unlockedAt: '2024-09-01' },
  { achievementId: 'trail_runner', progress: 33 },
  { achievementId: 'swim_1km',     progress: 80 },
  { achievementId: 'fighter',      progress: 20 },
  { achievementId: 'yoga_zen',     progress: 15 },
  { achievementId: 'team_player',  progress: 56 },
];

export const useAchievementStore = create<AchievementState>((set) => ({
  userAchievements: MOCK_USER_ACHIEVEMENTS,
  totalScore: MOCK_USER_ACHIEVEMENTS.filter(a => a.unlockedAt).reduce((sum, ua) => {
    const ach = ALL_ACHIEVEMENTS.find(a => a.id === ua.achievementId);
    return sum + (ach?.scoreValue ?? 0);
  }, 0),
  selectedCategory: 'all',
  setCategory: (cat) => set({ selectedCategory: cat }),
}));
