import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';
import { AchievementTier, AchievementCategory } from '../../stores/achievementStore';
import { ActivityIcon, ActivityKind } from '../ui/ActivityIcon';
import { colors } from '../../lib/tokens';

interface Props {
  tier: AchievementTier;
  category: AchievementCategory;
  size: number;
  unlocked: boolean;
  onDark?: boolean;
}

const CATEGORY_GLYPH: Record<AchievementCategory, ActivityKind> = {
  endurance: 'run',
  multisport: 'triathlon',
  cycling: 'cycle',
  swimming: 'swim',
  strength: 'strength',
  cardio: 'hiit',
  flexibility: 'yoga',
  combat: 'combat',
  outdoor: 'mountain',
  team: 'team',
  racket: 'racket',
  consistency: 'chart',
};

const TIER_PALETTE = {
  bronze:   { base: '#8B5A2B', hi: '#C08450', lo: '#5C3A1C', label: 'BRONZE' },
  silver:   { base: '#7E8A96', hi: '#B3BDC7', lo: '#4D5662', label: 'PRATA' },
  gold:     { base: '#B08530', hi: '#E2B155', lo: '#6E5219', label: 'OURO' },
  platinum: { base: '#6B7684', hi: '#D3DAE2', lo: '#3B4350', label: 'PLATINA' },
  diamond:  { base: '#3BA3FF', hi: '#9ED4FF', lo: '#1E6FB8', label: 'DIAMANTE' },
} as const;

function getMountainPath(tier: AchievementTier): { path: string; snowLine?: string } {
  switch (tier) {
    case 'bronze':
      return { path: 'M 8 46 L 22 28 L 30 36 L 42 24 L 52 46 Z' };
    case 'silver':
      return { path: 'M 6 48 L 18 28 L 26 34 L 34 22 L 44 32 L 54 48 Z' };
    case 'gold':
      return { path: 'M 4 50 L 14 32 L 22 38 L 30 18 L 38 38 L 46 32 L 56 50 Z' };
    case 'platinum':
      return {
        path: 'M 4 50 L 12 34 L 20 40 L 30 16 L 40 40 L 48 34 L 56 50 Z',
        snowLine: 'M 10 36 L 20 40 L 30 22 L 40 40 L 50 36',
      };
    case 'diamond':
      return {
        path: 'M 4 52 L 10 38 L 16 42 L 22 30 L 30 14 L 38 30 L 44 42 L 50 38 L 56 52 Z',
        snowLine: 'M 8 40 L 16 42 L 22 34 L 30 18 L 38 34 L 44 42 L 52 40',
      };
  }
}

export function TierBadge({ tier, category, size, unlocked, onDark }: Props) {
  const p = TIER_PALETTE[tier];
  const geo = getMountainPath(tier);
  const glyph = CATEGORY_GLYPH[category];

  const lockedColor = onDark ? '#3A3F45' : '#B8BEC5';
  const base = unlocked ? p.base : lockedColor;
  const hi   = unlocked ? p.hi   : (onDark ? '#4A5058' : '#D5DADF');
  const lo   = unlocked ? p.lo   : (onDark ? '#2A2E33' : '#8A9099');

  const ringBg = onDark ? colors.dark.surface : colors.light.surface;
  const ringStroke = unlocked ? base : (onDark ? '#2F343A' : 'rgba(73,80,87,0.15)');

  const gradId = `tg_${tier}_${unlocked ? 1 : 0}_${onDark ? 'd' : 'l'}`;
  const clipId = `tc_${tier}_${unlocked ? 1 : 0}_${onDark ? 'd' : 'l'}`;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 60 60">
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={hi} />
            <Stop offset="0.55" stopColor={base} />
            <Stop offset="1" stopColor={lo} />
          </LinearGradient>
          <ClipPath id={clipId}>
            <Circle cx="30" cy="30" r="27" />
          </ClipPath>
        </Defs>

        <Circle cx="30" cy="30" r="29" fill={ringBg} stroke={ringStroke} strokeWidth={1.5} />

        <G clipPath={`url(#${clipId})`}>
          <Rect x="0" y="0" width="60" height="60" fill={onDark ? '#1F2328' : '#EEF1F5'} />

          {tier === 'diamond' && unlocked && (
            <Circle cx="30" cy="22" r="18" fill={p.hi} opacity={0.22} />
          )}

          <Path d="M 0 50 L 60 50" stroke={onDark ? '#2A2E33' : '#D8DEE3'} strokeWidth={1} />

          <Path
            d={geo.path}
            fill={`url(#${gradId})`}
            stroke={lo}
            strokeWidth={1}
            strokeLinejoin="round"
          />

          {geo.snowLine && unlocked && (
            <Path
              d={geo.snowLine}
              fill="none"
              stroke={tier === 'diamond' ? '#EAF7FF' : '#F0F2F5'}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
            />
          )}

          <Path d="M 0 43 L 60 43" stroke={onDark ? '#242830' : '#E3E7EB'} strokeWidth={0.6} opacity={0.7} />
        </G>
      </Svg>

      <View style={{
        position: 'absolute',
        top: size * 0.12,
        right: size * 0.12,
        width: size * 0.26,
        height: size * 0.26,
        borderRadius: (size * 0.26) / 2,
        backgroundColor: unlocked ? (onDark ? colors.dark.bg : '#FFFFFF') : (onDark ? '#242830' : '#E7EAEE'),
        borderWidth: 1,
        borderColor: unlocked ? base : (onDark ? '#2F343A' : 'rgba(73,80,87,0.12)'),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIcon
          kind={glyph}
          size={size * 0.16}
          color={unlocked ? base : lockedColor}
          accent={unlocked ? base : lockedColor}
          strokeWidth={1.5}
        />
      </View>
    </View>
  );
}
