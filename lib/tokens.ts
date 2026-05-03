/**
 * Athledia Design Tokens
 * ─────────────────────────────────────────────────────────
 * Estética "Mountain Peak / High Performance".
 * Paleta neutra (ardósia / neve / obsidiana) com Azul Glacial
 * como único accent. Todos os pares passam WCAG AA.
 */

// ── Paleta base (invariante) ────────────────────────────────
export const palette = {
  snow: '#F4F6F8',          // Branco gelo (bg claro)
  ice: '#E8EAED',           // Ardósia muito clara (surface-alt)
  fog: '#D3D7DC',
  stone: '#868E96',         // NÃO use para texto pequeno
  stoneDim: '#6B7176',      // stone escurecido → texto dim light (≥4.5:1)
  slate: '#495057',         // text-muted light
  granite: '#2A2E33',       // surface dark
  obsidian: '#141619',      // bg dark / text light

  // Accent — Azul Glacial
  glacier: '#3BA3FF',       // Só para numerais grandes / fills em fundo escuro
  glacierDim: '#1E6FB8',    // Texto accent em fundo claro (≥4.5:1)
  glacierBright: '#67BBFF', // Texto accent em fundo escuro (≥4.5:1)
  glacierInk: '#041A2E',    // Texto sobre fill glacier

  // Semânticos
  success: '#5FAE7A',
  warn: '#D4A640',
  danger: '#D84C4C',
};

// ── Theme tokens (light + dark) ─────────────────────────────
export const colors = {
  light: {
    bg: palette.snow,
    surface: '#FFFFFF',
    surfaceAlt: palette.ice,

    border: 'rgba(20,22,25,0.08)',
    borderStrong: 'rgba(20,22,25,0.16)',

    text: palette.obsidian,       // ~17.8:1 on snow
    textMuted: palette.slate,     // ~8.2:1
    textDim: palette.stoneDim,    // ~4.8:1

    accent: palette.glacier,      // fill only
    accentText: palette.glacierDim, // ~4.9:1 on white
    accentInk: palette.glacierInk,

    // Ribbon/HUD — mantém identidade técnica
    ribbonBg: palette.obsidian,
    ribbonText: palette.snow,
    ribbonMuted: '#B0B7BF',
    ribbonAccent: palette.glacierBright,
    ribbonDivider: 'rgba(255,255,255,0.1)',

    // Ads
    sponsorBg: palette.obsidian,
    sponsorText: palette.glacierBright,

    success: palette.success,
    warn: palette.warn,
    danger: palette.danger,
  },

  dark: {
    bg: palette.obsidian,
    surface: palette.granite,
    surfaceAlt: '#1C1F23',

    border: 'rgba(244,246,248,0.08)',
    borderStrong: 'rgba(244,246,248,0.18)',

    text: palette.snow,           // ~17.8:1
    textMuted: '#B0B7BF',         // ~6.8:1
    textDim: '#9098A0',           // ~4.9:1

    accent: palette.glacier,
    accentText: palette.glacierBright, // ~6.1:1 on obsidian
    accentInk: palette.glacierInk,

    ribbonBg: palette.obsidian,
    ribbonText: palette.snow,
    ribbonMuted: '#B0B7BF',
    ribbonAccent: palette.glacierBright,
    ribbonDivider: 'rgba(255,255,255,0.1)',

    sponsorBg: 'rgba(59,163,255,0.12)',
    sponsorText: palette.glacierBright,

    success: palette.success,
    warn: palette.warn,
    danger: palette.danger,
  },
};

// ── Radii ───────────────────────────────────────────────────
export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// ── Spacing (4px base) ─────────────────────────────────────
export const space = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24,
  7: 28, 8: 32, 10: 40, 12: 48, 16: 64, 20: 80,
};

// ── Typography ─────────────────────────────────────────────
export const fonts = {
  display: 'RobotoSlab-Black',
  displayBold: 'RobotoSlab-Bold',
  body: 'System',
  mono: 'Menlo',
};

export const fontSize = {
  eyebrow: 10,
  caption: 11,
  small: 12,
  body: 14,
  h3: 16,
  h2: 22,
  display: 32,
  displayLg: 40,
};

export const letterSpacing = {
  tight: -1.5,
  snug: -0.5,
  normal: 0,
  wide: 1.4,
  wider: 1.6,
  widest: 2,
};

// ── Shadows ─────────────────────────────────────────────────
export const shadows = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
};

export type ThemeColors = typeof colors.light;

import { useColorScheme } from 'react-native';
export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? colors.dark : colors.light;
}
