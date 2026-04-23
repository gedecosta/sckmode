import { create } from 'zustand';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  bg: string;
  card: string;
  dark: string;
  slate: string;
  lightSlate: string;
  border: string;
  accent: string;
  success: string;
  danger: string;
  text: string;
  textSecondary: string;
}

export const LIGHT_COLORS: ThemeColors = {
  bg: '#E5E5E5',
  card: '#F4F4F4',
  dark: '#1F2328',
  slate: '#495057',
  lightSlate: '#868E96',
  border: 'rgba(73, 80, 87, 0.1)',
  accent: '#D4A640',
  success: '#48BB78',
  danger: '#E03131',
  text: '#1F2328',
  textSecondary: '#868E96',
};

export const DARK_COLORS: ThemeColors = {
  bg: '#0D0D0D',
  card: '#1A1A1A',
  dark: '#F4F4F4',
  slate: '#B0B7BF',
  lightSlate: '#868E96',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#D4A640',
  success: '#48BB78',
  danger: '#E03131',
  text: '#F4F4F4',
  textSecondary: '#868E96',
};

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** Retorna as cores resolvidas com base no mode e no sistema */
  resolveColors: (systemScheme: 'light' | 'dark' | null | undefined) => ThemeColors;
  isDark: (systemScheme: 'light' | 'dark' | null | undefined) => boolean;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'auto',

  setMode: (mode) => set({ mode }),

  resolveColors: (systemScheme) => {
    const { mode } = get();
    if (mode === 'dark') return DARK_COLORS;
    if (mode === 'light') return LIGHT_COLORS;
    // auto — follow system
    return systemScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  },

  isDark: (systemScheme) => {
    const { mode } = get();
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return systemScheme === 'dark';
  },
}));

/**
 * Hook de conveniência que retorna as cores resolvidas do tema atual.
 * Use dentro de componentes React.
 */
export function useTheme(): { colors: ThemeColors; isDark: boolean; mode: ThemeMode; setMode: (m: ThemeMode) => void } {
  const systemScheme = useColorScheme();
  const { mode, setMode, resolveColors, isDark } = useThemeStore();
  return {
    colors: resolveColors(systemScheme),
    isDark: isDark(systemScheme),
    mode,
    setMode,
  };
}
