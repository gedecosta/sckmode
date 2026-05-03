import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Users, Award, ChevronRight, Activity } from 'lucide-react-native';
import { useAchievementStore, ALL_ACHIEVEMENTS } from '../../../stores/achievementStore';
import { NoiseBackground } from '../../../components/ui/NoiseBackground';
import { Button } from '../../../components/ui/Button';
import { useThemeColors } from '../../../lib/tokens';

const MOCK_CHALLENGES = [
  { id: '1', title: 'Murph Challenge',       type: 'Crossfit',    difficulty: 'Hard',   participants: 1240 },
  { id: '2', title: 'Sub-20 5K',             type: 'Corrida',     difficulty: 'Medium', participants: 856  },
  { id: '3', title: '100 Flexões · 30 Dias', type: 'Bodyweight',  difficulty: 'Easy',   participants: 4320 },
];

export default function ChallengesScreen() {
  const c = useThemeColors();
  const router = useRouter();
  const { userAchievements, totalScore } = useAchievementStore();
  const unlocked = userAchievements.filter((a) => a.unlockedAt).length;

  return (
    <View className="flex-1">
      <NoiseBackground />

      <View className="flex-row items-end justify-between px-6 pt-[52px] pb-5">
        <View>
          <Text
            className="text-[10px] uppercase mb-1"
            style={{ color: c.textMuted, letterSpacing: 2, fontFamily: 'Menlo' }}
          >
            · SERIES · ACTIVE
          </Text>
          <Text
            style={{ color: c.text, fontSize: 40, fontFamily: 'RobotoSlab-Black', letterSpacing: -1.5, lineHeight: 40 }}
          >
            Series
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/(tabs)/create')}
          className="p-3 rounded-xl"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
        >
          <Plus size={20} color={c.text} strokeWidth={2.5} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Achievements entry */}
        <Pressable
          onPress={() => router.push('/(tabs)/challenges/achievements')}
          className="mx-5 mb-5 rounded-2xl p-4 flex-row items-center"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
        >
          <View
            className="w-[52px] h-[52px] rounded-xl items-center justify-center mr-4"
            style={{ backgroundColor: 'rgba(59,163,255,0.12)', borderWidth: 1, borderColor: 'rgba(59,163,255,0.4)' }}
          >
            <Award size={24} color={c.accentText} strokeWidth={2} />
          </View>
          <View className="flex-1">
            <Text
              className="text-base mb-0.5"
              style={{ color: c.text, fontFamily: 'RobotoSlab-Black', letterSpacing: -0.3 }}
            >
              Achievements
            </Text>
            <Text
              className="text-[11px]"
              style={{ color: c.textMuted, fontFamily: 'Menlo' }}
            >
              {unlocked}/{ALL_ACHIEVEMENTS.length} · {totalScore.toLocaleString('pt-BR')} pts
            </Text>
          </View>
          <ChevronRight size={18} color={c.textDim} />
        </Pressable>

        {/* Featured hero */}
        <View
          className="mx-5 mb-6 rounded-3xl p-7 overflow-hidden"
          style={{ backgroundColor: c.ribbonBg }}
        >
          <View
            className="absolute -top-10 -right-10 w-44 h-44 rounded-full"
            style={{ backgroundColor: c.accent, opacity: 0.12 }}
          />
          <Text
            className="text-[10px] uppercase mb-2"
            style={{ color: c.accentText, letterSpacing: 1.6, fontFamily: 'Menlo' }}
          >
            · FEATURED THIS WEEK
          </Text>
          <Text
            style={{
              color: c.ribbonText, fontSize: 40, fontFamily: 'RobotoSlab-Black',
              letterSpacing: -1.5, lineHeight: 40, marginBottom: 10,
            }}
          >
            Iron Man{'\n'}Virtual
          </Text>
          <Text
            className="text-sm mb-6"
            style={{ color: 'rgba(244,246,248,0.7)', lineHeight: 20 }}
          >
            Complete um Triathlon na distância Iron em uma semana. Corra, pedale, nade — desbloqueie a medalha de Ouro.
          </Text>
          <Button
            label="Aceitar Desafio"
            variant="accent"
            leftIcon={<Activity size={16} color={c.accentInk} />}
          />
        </View>

        {/* Trending */}
        <View className="flex-row items-baseline justify-between px-6 pb-4">
          <Text
            style={{ color: c.text, fontSize: 20, fontFamily: 'RobotoSlab-Black', letterSpacing: -0.5 }}
          >
            Em Alta
          </Text>
          <Text
            className="text-[10px] uppercase"
            style={{ color: c.textMuted, letterSpacing: 1.6, fontFamily: 'Menlo' }}
          >
            Ver todos →
          </Text>
        </View>

        <View className="px-5 gap-2.5">
          {MOCK_CHALLENGES.map((it) => (
            <Pressable
              key={it.id}
              className="rounded-2xl p-4"
              style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text
                  className="flex-1 pr-3"
                  style={{ color: c.text, fontSize: 17, fontFamily: 'RobotoSlab-Black', letterSpacing: -0.4 }}
                >
                  {it.title}
                </Text>
                <View
                  className="px-2 py-0.5 rounded"
                  style={{ borderWidth: 1, borderColor: c.border }}
                >
                  <Text
                    className="text-[9px] font-bold uppercase"
                    style={{ color: c.textMuted, letterSpacing: 1.5, fontFamily: 'Menlo' }}
                  >
                    {it.difficulty}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-xs" style={{ color: c.textDim }}>
                  {it.type}
                </Text>
                <View className="flex-row items-center gap-1.5">
                  <Users size={13} color={c.textMuted} strokeWidth={1.75} />
                  <Text className="text-xs" style={{ color: c.textMuted, fontFamily: 'Menlo' }}>
                    {it.participants}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
