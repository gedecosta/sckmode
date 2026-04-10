import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Circle, Path, G, Polygon, Text as SvgText } from 'react-native-svg';
import { Achievement, AchievementTier, AchievementCategory } from '../../stores/achievementStore';

interface MetallicBadgeProps {
  achievement: Achievement;
  size: number;
  isUnlocked: boolean;
}

const getTierColors = (tier: AchievementTier) => {
  switch (tier) {
    case 'diamond':
      return { light: '#E0F2FE', mid: '#7DD3FC', dark: '#0284C7', stroke: '#BAE6FD' };
    case 'platinum':
      return { light: '#F8FAFC', mid: '#CBD5E1', dark: '#64748B', stroke: '#E2E8F0' };
    case 'gold':
      return { light: '#FEF08A', mid: '#EAB308', dark: '#854D0E', stroke: '#FDE047' };
    case 'silver':
      return { light: '#E2E8F0', mid: '#94A3B8', dark: '#475569', stroke: '#CBD5E1' };
    case 'bronze':
      return { light: '#FDBA74', mid: '#F97316', dark: '#9A3412', stroke: '#FED7AA' };
    default:
      return { light: '#E2E8F0', mid: '#94A3B8', dark: '#475569', stroke: '#CBD5E1' };
  }
};

const getCategoryGraphic = (category: AchievementCategory, colorTheme: any) => {
  switch (category) {
    case 'endurance':
      // Mountain and road
      return (
        <G transform="translate(18, 20) scale(0.65)">
          <Path d="M20 5 L5 35 L35 35 Z" fill={`url(#bgGrad_${colorTheme.mid})`} stroke={colorTheme.light} strokeWidth="2" strokeLinejoin="round"/>
          <Path d="M25 15 L20 25 L35 35" fill="none" stroke={colorTheme.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M15 25 L10 35H30 L22 25 Z" fill={`url(#bgGrad_${colorTheme.mid})`} stroke={colorTheme.light} strokeWidth="1"/>
          <Path d="M18 35 Q20 30 18 25" fill="none" stroke={colorTheme.light} strokeWidth="2" strokeLinecap="round"/>
        </G>
      );
    case 'multisport':
      // Interlocking triangles
      return (
        <G transform="translate(15, 15) scale(0.7)">
          <Polygon points="20,5 5,30 35,30" fill="none" stroke={colorTheme.dark} strokeWidth="4" strokeLinejoin="round" />
          <Polygon points="20,13 11,27 29,27" fill="none" stroke={colorTheme.light} strokeWidth="3" strokeLinejoin="round" />
        </G>
      );
    case 'cycling':
      // Wheel and speed lines
      return (
        <G transform="translate(15, 15) scale(0.7)">
          <Circle cx="20" cy="20" r="12" fill="none" stroke={colorTheme.dark} strokeWidth="4" />
          <Circle cx="20" cy="20" r="10" fill="none" stroke={colorTheme.light} strokeWidth="1" strokeDasharray="3 3"/>
          <Path d="M32 20 L40 20 M30 12 L38 12 M30 28 L38 28" stroke={colorTheme.dark} strokeWidth="3" strokeLinecap="round"/>
          <Circle cx="20" cy="20" r="3" fill={colorTheme.dark} />
        </G>
      );
    case 'swimming':
      // Waves
      return (
        <G transform="translate(15, 20) scale(0.7)">
          <Path d="M5 10 Q10 5 15 10 T25 10 T35 10" fill="none" stroke={colorTheme.dark} strokeWidth="4" strokeLinecap="round"/>
          <Path d="M5 20 Q10 15 15 20 T25 20 T35 20" fill="none" stroke={colorTheme.light} strokeWidth="4" strokeLinecap="round"/>
          <Path d="M10 30 Q15 25 20 30 T30 30" fill="none" stroke={colorTheme.dark} strokeWidth="3" strokeLinecap="round"/>
        </G>
      );
    case 'strength':
      // Dumbbell
      return (
        <G transform="translate(15, 15) scale(0.7)">
          <Path d="M8 12 H12 V28 H8 Z" fill={colorTheme.dark} />
          <Path d="M4 14 H8 V26 H4 Z" fill={colorTheme.dark} />
          <Path d="M28 12 H32 V28 H28 Z" fill={colorTheme.dark} />
          <Path d="M32 14 H36 V26 H32 Z" fill={colorTheme.dark} />
          <Path d="M12 18 H28 V22 H12 Z" fill={colorTheme.light} />
        </G>
      );
    case 'cardio':
    case 'consistency':
      // Flame / Laurel wreath (Using a stylish star/flame combo)
      return (
        <G transform="translate(15, 15) scale(0.7)">
          <Path d="M20 5 Q30 15 25 30 Q20 35 15 30 Q10 15 20 5 Z" fill={`url(#bgGrad_${colorTheme.mid})`} stroke={colorTheme.dark} strokeWidth="2" />
          <Path d="M20 12 Q25 20 22 28 Q20 30 18 28 Q15 20 20 12 Z" fill={colorTheme.light} />
        </G>
      );
    default:
      // Generic star badge
      return (
        <G transform="translate(15, 15) scale(0.7)">
          <Path d="M20 5 L24 14 L34 14 L26 20 L29 29 L20 24 L11 29 L14 20 L6 14 L16 14 Z" fill={`url(#bgGrad_${colorTheme.mid})`} stroke={colorTheme.dark} strokeWidth="2" strokeLinejoin="round" />
        </G>
      );
  }
};

export function MetallicBadge({ achievement, size, isUnlocked }: MetallicBadgeProps) {
  const colors = getTierColors(achievement.tier);
  const opacity = isUnlocked ? 1 : 0.4;
  const filter = isUnlocked ? "" : "grayscale(100%)";

  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity }}>
      <Defs>
        {/* Main Base Metallic Gradient */}
        <LinearGradient id={`baseGrad_${achievement.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={colors.light} />
          <Stop offset="50%" stopColor={colors.mid} />
          <Stop offset="100%" stopColor={colors.dark} />
        </LinearGradient>

        {/* Inner shadow/highlight Metallic Gradient */}
        <LinearGradient id={`innerGrad_${achievement.id}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={colors.dark} />
          <Stop offset="50%" stopColor={colors.mid} />
          <Stop offset="100%" stopColor={colors.light} />
        </LinearGradient>
        
        {/* Standalone gradient for graphic */}
        <LinearGradient id={`bgGrad_${colors.mid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={colors.light} />
          <Stop offset="100%" stopColor={colors.mid} />
        </LinearGradient>
      </Defs>

      {/* Outer Glow / Bevel Base */}
      <Circle cx="30" cy="30" r="28" fill={`url(#baseGrad_${achievement.id})`} />
      
      {/* Inner Rim (creates the lip of the coin/medal) */}
      <Circle cx="30" cy="30" r="25" fill={`url(#innerGrad_${achievement.id})`} stroke={colors.stroke} strokeWidth="1" />
      
      {/* Deep Inner Base */}
      <Circle cx="30" cy="30" r="22" fill="#1A202C" stroke={colors.dark} strokeWidth="2" />

      {/* Render the specific category graphic */}
      {getCategoryGraphic(achievement.category, colors)}

      {/* Shine/Reflection Overlay (Half circle on top to look like glass/metal reflection) */}
      <Path 
        d="M 8 30 A 22 22 0 0 1 52 30 A 30 20 0 0 0 8 30" 
        fill="#FFFFFF" 
        opacity="0.15" 
      />
      
      {/* Display text like 42.2K if needed, but doing generic for now so the graphic speaks */}
    </Svg>
  );
}
