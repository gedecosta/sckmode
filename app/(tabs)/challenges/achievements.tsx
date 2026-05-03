import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { AchievementCard } from '../../../components/achievements/AchievementCard';
import { CategoryFilter } from '../../../components/achievements/CategoryFilter';
import { ScoreSummary } from '../../../components/achievements/ScoreSummary';
import { ActivityIcon, ActivityKind } from '../../../components/ui/ActivityIcon';
import {
  useAchievementStore,
  ALL_ACHIEVEMENTS,
  CATEGORY_META,
  AchievementCategory,
} from '../../../stores/achievementStore';
import { useThemeColors } from '../../../lib/tokens';

const CATEGORY_GLYPH: Record<AchievementCategory, ActivityKind> = {
  endurance: 'run',       multisport: 'triathlon',  cycling: 'cycle',
  swimming: 'swim',        strength: 'strength',     cardio: 'hiit',
  flexibility: 'yoga',     combat: 'combat',          outdoor: 'mountain',
  team: 'team',            racket: 'racket',          consistency: 'chart',
};

export default function AchievementsScreen() {
  const router = useRouter();
  const { userAchievements, selectedCategory } = useAchievementStore();
  const t = useThemeColors();

  const filteredAchievements = useMemo(() => {
    const achievements = selectedCategory === 'all'
      ? ALL_ACHIEVEMENTS
      : ALL_ACHIEVEMENTS.filter(a => a.category === selectedCategory);

    const tierOrder = { diamond: 0, platinum: 1, gold: 2, silver: 3, bronze: 4 };
    return achievements.sort((a, b) => {
      const uaA = userAchievements.find(ua => ua.achievementId === a.id);
      const uaB = userAchievements.find(ua => ua.achievementId === b.id);
      const unlockedA = uaA?.unlockedAt ? 1 : 0;
      const unlockedB = uaB?.unlockedAt ? 1 : 0;
      if (unlockedA !== unlockedB) return unlockedB - unlockedA;
      const progressA = uaA?.progress ?? 0;
      const progressB = uaB?.progress ?? 0;
      if (progressA !== progressB) return progressB - progressA;
      return tierOrder[a.tier] - tierOrder[b.tier];
    });
  }, [selectedCategory, userAchievements]);

  const groupedAchievements = useMemo(() => {
    if (selectedCategory !== 'all') return null;
    const groups: { category: AchievementCategory; label: string; items: typeof filteredAchievements }[] = [];
    const categoryOrder = Object.keys(CATEGORY_META) as AchievementCategory[];
    categoryOrder.forEach(cat => {
      const items = filteredAchievements.filter(a => a.category === cat);
      if (items.length > 0) {
        groups.push({ category: cat, label: CATEGORY_META[cat].label, items });
      }
    });
    return groups;
  }, [filteredAchievements, selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 54,
        paddingBottom: 18,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 8, backgroundColor: t.surface, borderRadius: 10,
            borderWidth: 1, borderColor: t.border,
          }}
        >
          <ChevronLeft size={20} color={t.text} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontFamily: 'Menlo', fontSize: 9, letterSpacing: 2,
            color: t.textMuted, textTransform: 'uppercase',
          }}>
            Hall da Fama
          </Text>
          <Text style={{
            fontFamily: 'RobotoSlab-Black', fontSize: 20, letterSpacing: -0.6,
            color: t.text, marginTop: 1,
          }}>
            Conquistas
          </Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ScoreSummary />
        <CategoryFilter />

        <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          {selectedCategory !== 'all' ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {filteredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  userProgress={userAchievements.find(ua => ua.achievementId === achievement.id)}
                />
              ))}
            </View>
          ) : (
            groupedAchievements?.map((group) => (
              <View key={group.category} style={{ marginBottom: 28 }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 14,
                }}>
                  <View style={{
                    width: 32, height: 32, borderRadius: 10,
                    backgroundColor: t.surface, borderWidth: 1, borderColor: t.border,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ActivityIcon
                      kind={CATEGORY_GLYPH[group.category]}
                      size={16}
                      color={t.text}
                      accent={t.accentText}
                    />
                  </View>
                  <Text style={{
                    fontFamily: 'RobotoSlab-Black', fontSize: 15,
                    color: t.text, letterSpacing: -0.3, marginLeft: 10,
                  }}>
                    {group.label}
                  </Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: t.border, marginLeft: 12 }} />
                  <Text style={{
                    fontFamily: 'Menlo', fontSize: 11, fontWeight: '700',
                    color: t.textDim, marginLeft: 10,
                  }}>
                    {group.items.length}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {group.items.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      userProgress={userAchievements.find(ua => ua.achievementId === achievement.id)}
                    />
                  ))}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
