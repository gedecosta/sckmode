import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import {
  AchievementCategory,
  CATEGORY_META,
  useAchievementStore,
} from '../../stores/achievementStore';
import { ActivityIcon, ActivityKind } from '../ui/ActivityIcon';
import { useThemeColors } from '../../lib/tokens';

const ALL_CATEGORIES: (AchievementCategory | 'all')[] = [
  'all', 'endurance', 'multisport', 'cycling', 'swimming',
  'strength', 'cardio', 'flexibility', 'combat', 'outdoor',
  'team', 'racket', 'consistency',
];

const CATEGORY_GLYPH: Record<AchievementCategory, ActivityKind> = {
  endurance: 'run',       multisport: 'triathlon',  cycling: 'cycle',
  swimming: 'swim',        strength: 'strength',     cardio: 'hiit',
  flexibility: 'yoga',     combat: 'combat',          outdoor: 'mountain',
  team: 'team',            racket: 'racket',          consistency: 'chart',
};

export function CategoryFilter() {
  const { selectedCategory, setCategory } = useAchievementStore();
  const t = useThemeColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 14, gap: 8 }}
    >
      {ALL_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat;
        const label = cat === 'all' ? 'Todos' : CATEGORY_META[cat].label;
        const glyph: ActivityKind = cat === 'all' ? 'medal' : CATEGORY_GLYPH[cat];
        const fg = isActive ? t.bg : t.text;

        return (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 9,
              borderRadius: 12,
              backgroundColor: isActive ? t.text : t.surface,
              borderWidth: 1,
              borderColor: isActive ? t.text : t.border,
            }}
          >
            <ActivityIcon kind={glyph} size={14} color={fg} accent={isActive ? t.bg : t.accentText} strokeWidth={1.6} />
            <Text style={{
              color: fg, marginLeft: 8,
              fontFamily: 'System', fontSize: 11, fontWeight: '700',
              letterSpacing: 1.2, textTransform: 'uppercase',
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
