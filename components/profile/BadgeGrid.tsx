import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TierBadge } from '../achievements/TierBadge';
import type { AchievementTier, AchievementCategory } from '../../stores/achievementStore';
import { useThemeColors } from '../../lib/tokens';

export interface Badge {
  id: string;
  name: string;
  tier: AchievementTier;
  category: AchievementCategory;
  unlockedAt?: string;
}

interface Props {
  badges: Badge[];
  total?: number;
  unlocked?: number;
}

export function BadgeGrid({ badges, total, unlocked }: Props) {
  const t = useThemeColors();
  const router = useRouter();

  return (
    <View style={{ marginBottom: 8 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <View>
          <Text style={{
            fontFamily: 'Menlo', fontSize: 10, letterSpacing: 2,
            color: t.textMuted, textTransform: 'uppercase', marginBottom: 2,
          }}>
            Recognition
          </Text>
          <Text style={{
            fontFamily: 'RobotoSlab-Black', fontSize: 22, letterSpacing: -0.6,
            color: t.text,
          }}>Conquistas</Text>
        </View>
        {typeof total === 'number' && (
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/challenges/achievements')}
            style={{
              backgroundColor: t.surfaceAlt,
              paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10,
              borderWidth: 1, borderColor: t.border,
              flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'Menlo', fontSize: 11, fontWeight: '700', color: t.text }}>
              {unlocked ?? 0}
            </Text>
            <Text style={{
              fontFamily: 'Menlo', fontSize: 10, color: t.textDim,
              marginLeft: 2, marginRight: 8,
            }}>/{total}</Text>
            <Text style={{
              fontFamily: 'System', fontSize: 10, fontWeight: '700',
              color: t.text, letterSpacing: 1.2, textTransform: 'uppercase',
            }}>Todas</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {badges.map((b) => {
          const isUnlocked = !!b.unlockedAt;
          return (
            <View
              key={b.id}
              style={{
                width: '31.3%',
                aspectRatio: 1,
                borderRadius: 16,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: t.surface,
                borderWidth: 1,
                borderColor: t.border,
                opacity: isUnlocked ? 1 : 0.7,
              }}
            >
              <TierBadge
                tier={b.tier}
                category={b.category}
                size={52}
                unlocked={isUnlocked}
              />
              <Text
                style={{
                  fontFamily: 'System', fontSize: 9, fontWeight: '700',
                  letterSpacing: 0.8, textTransform: 'uppercase',
                  color: isUnlocked ? t.text : t.textDim,
                  textAlign: 'center', marginTop: 7, lineHeight: 11,
                }}
                numberOfLines={2}
              >
                {b.name}
              </Text>
              {isUnlocked && (
                <View style={{
                  position: 'absolute', top: 8, right: 8,
                  width: 5, height: 5, borderRadius: 3, backgroundColor: t.success,
                }} />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
