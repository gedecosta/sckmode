import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useAchievementStore, ALL_ACHIEVEMENTS, TIER_META } from '../../stores/achievementStore';
import { Numeric } from '../ui/Numeric';
import { useThemeColors } from '../../lib/tokens';

export function ScoreSummary() {
  const { userAchievements, totalScore } = useAchievementStore();
  const t = useThemeColors();

  const unlocked = userAchievements.filter(a => a.unlockedAt).length;
  const inProgress = userAchievements.filter(a => !a.unlockedAt && a.progress > 0).length;
  const total = ALL_ACHIEVEMENTS.length;

  const displayScore = useRef(new Animated.Value(0)).current;
  const [shownScore, setShownScore] = React.useState(0);

  useEffect(() => {
    const listener = displayScore.addListener(({ value }) => {
      setShownScore(Math.floor(value));
    });
    Animated.timing(displayScore, {
      toValue: totalScore,
      duration: 1400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => displayScore.removeListener(listener);
  }, [totalScore]);

  const tierCounts = userAchievements.reduce((acc, ua) => {
    if (!ua.unlockedAt) return acc;
    const ach = ALL_ACHIEVEMENTS.find(a => a.id === ua.achievementId);
    if (ach) acc[ach.tier] = (acc[ach.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <View style={{ margin: 20, marginBottom: 4 }}>
      <View
        style={{
          backgroundColor: t.ribbonBg,
          borderRadius: 22,
          padding: 24,
          overflow: 'hidden',
        }}
      >
        <Text style={{
          fontFamily: 'Menlo', fontSize: 10, letterSpacing: 2.2,
          color: t.ribbonMuted, textTransform: 'uppercase', marginBottom: 12,
        }}>
          Programa de Reconhecimento
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 20 }}>
          <Numeric weight="bold" style={{
            fontSize: 52,
            letterSpacing: -2,
            lineHeight: 54,
            color: t.ribbonText,
          }}>
            {shownScore.toLocaleString('pt-BR')}
          </Numeric>
          <Text style={{
            fontFamily: 'Menlo', fontSize: 12, fontWeight: '700',
            marginLeft: 10, marginBottom: 10,
            letterSpacing: 2, color: t.ribbonMuted, textTransform: 'uppercase',
          }}>
            PTS
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          backgroundColor: 'rgba(255,255,255,0.04)',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {[
            { label: 'Conquistados', value: unlocked, accent: true },
            { label: 'Em Progresso', value: inProgress, accent: false },
            { label: 'Total',         value: total,       accent: false },
          ].map((stat, i) => (
            <View key={stat.label} style={{
              flex: 1,
              paddingVertical: 14,
              alignItems: 'center',
              borderRightWidth: i < 2 ? 1 : 0,
              borderRightColor: 'rgba(255,255,255,0.06)',
            }}>
              <Numeric weight="bold" style={{
                fontSize: 22,
                color: stat.accent ? t.ribbonAccent : t.ribbonText,
              }}>{stat.value}</Numeric>
              <Text style={{
                fontFamily: 'System', fontSize: 9, fontWeight: '700',
                letterSpacing: 1.4, color: t.ribbonMuted,
                textTransform: 'uppercase', marginTop: 4,
              }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', marginTop: 16, flexWrap: 'wrap', gap: 6 }}>
          {Object.entries(TIER_META).map(([key, meta]) => {
            const count = tierCounts[key] ?? 0;
            return (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: count > 0 ? `${meta.color}55` : 'rgba(255,255,255,0.08)',
                  backgroundColor: count > 0 ? `${meta.color}18` : 'transparent',
                }}
              >
                <View style={{
                  width: 6, height: 6, borderRadius: 3,
                  backgroundColor: count > 0 ? meta.color : 'rgba(255,255,255,0.2)',
                  marginRight: 6,
                }} />
                <Text style={{
                  fontFamily: 'Menlo', fontSize: 9, fontWeight: '700',
                  letterSpacing: 1.2, color: count > 0 ? meta.color : t.ribbonMuted,
                  textTransform: 'uppercase',
                }}>
                  {meta.label}{count > 0 ? ` · ${count}` : ''}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
