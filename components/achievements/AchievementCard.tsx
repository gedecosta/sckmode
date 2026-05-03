import React from 'react';
import { View, Text } from 'react-native';
import { Achievement, UserAchievement, TIER_META } from '../../stores/achievementStore';
import { TierBadge } from './TierBadge';
import { ActivityIcon } from '../ui/ActivityIcon';
import { Numeric } from '../ui/Numeric';
import { useThemeColors } from '../../lib/tokens';

interface Props {
  achievement: Achievement;
  userProgress?: UserAchievement;
}

export function AchievementCard({ achievement, userProgress }: Props) {
  const t = useThemeColors();
  const isUnlocked = !!userProgress?.unlockedAt;
  const progress = userProgress?.progress ?? 0;
  const tier = TIER_META[achievement.tier];

  return (
    <View
      style={{
        width: '47%',
        aspectRatio: 0.75,
        borderRadius: 18,
        backgroundColor: t.surface,
        borderWidth: 1,
        borderColor: t.border,
        padding: 16,
        marginBottom: 14,
        overflow: 'hidden',
        opacity: isUnlocked ? 1 : 0.85,
      }}
    >
      {/* Top rail — tier label */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{
          fontFamily: 'Menlo',
          fontSize: 9,
          letterSpacing: 1.8,
          color: isUnlocked ? tier.color : t.textDim,
          textTransform: 'uppercase',
          fontWeight: '700',
        }}>
          {tier.label}
        </Text>
        <Numeric weight="bold" style={{
          fontSize: 10,
          color: isUnlocked ? t.textMuted : t.textDim,
          letterSpacing: 0.5,
        }}>
          {achievement.scoreValue} PTS
        </Numeric>
      </View>

      {/* Badge centralizado */}
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 6, marginBottom: 8 }}>
        <TierBadge
          tier={achievement.tier}
          category={achievement.category}
          size={76}
          unlocked={isUnlocked}
        />
      </View>

      {/* Título */}
      <Text
        style={{
          fontFamily: 'RobotoSlab-Black',
          fontSize: 13,
          lineHeight: 15,
          color: t.text,
          letterSpacing: -0.3,
          textAlign: 'center',
          marginTop: 2,
        }}
        numberOfLines={2}
      >
        {achievement.title}
      </Text>

      {/* Requirement em mono */}
      <Text
        style={{
          fontFamily: 'Menlo',
          fontSize: 9,
          letterSpacing: 1.2,
          color: t.textMuted,
          textTransform: 'uppercase',
          textAlign: 'center',
          marginTop: 4,
        }}
        numberOfLines={1}
      >
        {achievement.requirement}
      </Text>

      {/* Divisória */}
      <View style={{ height: 1, backgroundColor: t.border, marginTop: 10, marginBottom: 10 }} />

      {/* Status */}
      <View style={{ marginTop: 'auto' }}>
        {isUnlocked ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              width: 5, height: 5, borderRadius: 3, backgroundColor: t.success, marginRight: 6,
            }} />
            <Text style={{
              fontFamily: 'System', fontSize: 10, fontWeight: '700',
              letterSpacing: 1.4, textTransform: 'uppercase', color: t.success,
            }}>
              Conquistado
            </Text>
          </View>
        ) : progress > 0 ? (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{
                fontFamily: 'System', fontSize: 9, fontWeight: '700',
                letterSpacing: 1.4, color: t.textMuted, textTransform: 'uppercase',
              }}>Progresso</Text>
              <Numeric weight="bold" style={{ fontSize: 10, color: t.text }}>
                {progress}%
              </Numeric>
            </View>
            <View style={{ height: 3, backgroundColor: t.surfaceAlt, borderRadius: 2, overflow: 'hidden' }}>
              <View style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: t.accent,
                borderRadius: 2,
              }} />
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIcon kind="lock" size={11} color={t.textDim} />
            <Text style={{
              fontFamily: 'System', fontSize: 10, fontWeight: '700',
              letterSpacing: 1.4, textTransform: 'uppercase', color: t.textDim, marginLeft: 6,
            }}>
              Bloqueado
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
