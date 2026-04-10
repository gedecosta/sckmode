import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import {
  AchievementCategory,
  CATEGORY_META,
  useAchievementStore,
} from '../../stores/achievementStore';

const ALL_CATEGORIES: (AchievementCategory | 'all')[] = [
  'all',
  'endurance',
  'multisport',
  'cycling',
  'swimming',
  'strength',
  'cardio',
  'flexibility',
  'combat',
  'outdoor',
  'team',
  'racket',
  'consistency',
];

export function CategoryFilter() {
  const { selectedCategory, setCategory } = useAchievementStore();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 8 }}
    >
      {ALL_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat;
        const meta = cat === 'all' ? null : CATEGORY_META[cat];
        const label = cat === 'all' ? 'Todos' : meta!.label;
        const icon = cat === 'all' ? '🏅' : meta!.icon;

        return (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: isActive ? '#1F2328' : 'rgba(73, 80, 87, 0.05)',
              borderWidth: 1,
              borderColor: isActive ? '#1F2328' : 'rgba(73, 80, 87, 0.1)',
            }}
          >
            <Text style={{ fontSize: 14, marginRight: 6 }}>{icon}</Text>
            <Text
              style={{
                color: isActive ? '#F4F4F4' : '#868E96',
                fontSize: 12,
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
