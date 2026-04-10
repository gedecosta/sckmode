import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Award, ChevronLeft } from 'lucide-react-native';
import { AchievementCard } from '../../../components/achievements/AchievementCard';
import { CategoryFilter } from '../../../components/achievements/CategoryFilter';
import { ScoreSummary } from '../../../components/achievements/ScoreSummary';
import {
  useAchievementStore,
  ALL_ACHIEVEMENTS,
  CATEGORY_META,
} from '../../../stores/achievementStore';

export default function AchievementsScreen() {
  const router = useRouter();
  const { userAchievements, selectedCategory } = useAchievementStore();

  // Filter achievements by selected category
  const filteredAchievements = useMemo(() => {
    const achievements = selectedCategory === 'all'
      ? ALL_ACHIEVEMENTS
      : ALL_ACHIEVEMENTS.filter(a => a.category === selectedCategory);

    // Sort: unlocked first, then by progress desc, then by tier importance
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

  // Group by category when showing all
  const groupedAchievements = useMemo(() => {
    if (selectedCategory !== 'all') return null;

    const groups: { category: string; label: string; icon: string; items: typeof filteredAchievements }[] = [];
    const categoryOrder = Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>;

    categoryOrder.forEach(cat => {
      const items = filteredAchievements.filter(a => a.category === cat);
      if (items.length > 0) {
        groups.push({
          category: cat,
          label: CATEGORY_META[cat].label,
          icon: CATEGORY_META[cat].icon,
          items,
        });
      }
    });

    return groups;
  }, [filteredAchievements, selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 52,
          paddingBottom: 16,
          backgroundColor: '#E5E5E5',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(73, 80, 87, 0.1)',
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 4 }}>
          <ChevronLeft size={28} color="#1F2328" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Award size={24} color="#1F2328" />
          <Text
            style={{
              color: '#1F2328',
              fontSize: 20,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: -0.5,
              marginLeft: 8,
            }}
          >
            Conquistas
          </Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Summary */}
        <ScoreSummary />

        {/* Category Filter */}
        <CategoryFilter />

        {/* Achievement Grid */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          {selectedCategory !== 'all' ? (
            // Flat grid for single category
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {filteredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  userProgress={userAchievements.find(ua => ua.achievementId === achievement.id)}
                />
              ))}
            </View>
          ) : (
            // Grouped by category
            groupedAchievements?.map((group) => (
              <View key={group.category} style={{ marginBottom: 24 }}>
                {/* Category header */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                    paddingVertical: 6,
                  }}
                >
                  <Text style={{ fontSize: 18, marginRight: 8 }}>{group.icon}</Text>
                  <Text
                    style={{
                      color: '#1F2328',
                      fontSize: 16,
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {group.label}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: 'rgba(73, 80, 87, 0.15)',
                      marginLeft: 12,
                    }}
                  />
                  <Text
                    style={{
                      color: '#868E96',
                      fontSize: 11,
                      fontWeight: '700',
                      marginLeft: 8,
                    }}
                  >
                    {group.items.length}
                  </Text>
                </View>

                {/* Cards */}
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
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
