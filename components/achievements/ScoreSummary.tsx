import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useAchievementStore, ALL_ACHIEVEMENTS, TIER_META } from '../../stores/achievementStore';

export function ScoreSummary() {
  const { userAchievements, totalScore } = useAchievementStore();

  const unlocked = userAchievements.filter(a => a.unlockedAt).length;
  const inProgress = userAchievements.filter(a => !a.unlockedAt && a.progress > 0).length;
  const total = ALL_ACHIEVEMENTS.length;

  // Animated score counter
  const scoreAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scoreAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, []);

  // Tier distribution
  const tierCounts = userAchievements.reduce((acc, ua) => {
    if (!ua.unlockedAt) return acc;
    const ach = ALL_ACHIEVEMENTS.find(a => a.id === ua.achievementId);
    if (ach) {
      acc[ach.tier] = (acc[ach.tier] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <View style={{ margin: 20, marginBottom: 4 }}>
      {/* Main Score Card */}
      <View
        style={{
          backgroundColor: '#F4F4F4',
          borderRadius: 24,
          padding: 24,
          borderWidth: 1,
          borderColor: 'rgba(73, 80, 87, 0.1)',
        }}
      >
        {/* Title row */}
        <Text
          style={{
            color: '#868E96',
            fontSize: 10,
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: 2.5,
            marginBottom: 12,
          }}
        >
          Programa de Reconhecimento
        </Text>

        {/* Score */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16 }}>
          <Text
            style={{
              color: '#1F2328',
              fontSize: 48,
              fontWeight: '900',
              letterSpacing: -2,
              lineHeight: 52,
            }}
          >
            {totalScore.toLocaleString('pt-BR')}
          </Text>
          <Text
            style={{
              color: '#868E96',
              fontSize: 14,
              fontWeight: '800',
              marginLeft: 8,
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            PTS
          </Text>
        </View>

        {/* Stats row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#E5E5E5',
            borderRadius: 14,
            padding: 14,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.05)',
          }}
        >
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#48BB78', fontSize: 22, fontWeight: '900' }}>
              {unlocked}
            </Text>
            <Text
              style={{ color: '#868E96', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}
            >
              Conquistados
            </Text>
          </View>
          <View style={{ width: 1, backgroundColor: 'rgba(73, 80, 87, 0.1)' }} />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#1F2328', fontSize: 22, fontWeight: '900' }}>
              {inProgress}
            </Text>
            <Text
              style={{ color: '#868E96', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}
            >
              Em Progresso
            </Text>
          </View>
          <View style={{ width: 1, backgroundColor: 'rgba(73, 80, 87, 0.1)' }} />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#495057', fontSize: 22, fontWeight: '900' }}>
              {total}
            </Text>
            <Text
              style={{ color: '#868E96', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}
            >
              Total
            </Text>
          </View>
        </View>

        {/* Tier badges row */}
        <View style={{ flexDirection: 'row', marginTop: 14, gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(TIER_META).map(([key, meta]) => {
            const count = tierCounts[key] ?? 0;
            return (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: count > 0 ? `${meta.color}18` : 'rgba(113, 128, 150, 0.05)',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: count > 0 ? `${meta.color}33` : 'rgba(113, 128, 150, 0.1)',
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: count > 0 ? meta.color : '#4A5568',
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{
                    color: count > 0 ? meta.color : '#4A5568',
                    fontSize: 9,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {meta.label} {count > 0 ? `×${count}` : ''}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
