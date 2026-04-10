import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Achievement, UserAchievement, TIER_META } from '../../stores/achievementStore';
import { MetallicBadge } from './MetallicBadge';

interface AchievementCardProps {
  achievement: Achievement;
  userProgress?: UserAchievement;
}

export function AchievementCard({ achievement, userProgress }: AchievementCardProps) {
  const isUnlocked = !!userProgress?.unlockedAt;
  const progress = userProgress?.progress ?? 0;
  const tier = TIER_META[achievement.tier];

  // Subtle shimmer animation for unlocked cards
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isUnlocked) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isUnlocked]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.18],
  });

  return (
    <View
      style={{
        width: '47%',
        aspectRatio: 0.72,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: isUnlocked ? achievement.accentColor : 'rgba(73, 80, 87, 0.1)',
        backgroundColor: isUnlocked ? '#F4F4F4' : '#E5E5E5',
        opacity: isUnlocked ? 1 : 0.6,
      }}
    >
      {/* Shimmer overlay for unlocked */}
      {isUnlocked && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: achievement.accentColor,
            opacity: shimmerOpacity,
          }}
        />
      )}

      {/* Tier indicator top bar */}
      <View
        style={{
          height: 3,
          backgroundColor: isUnlocked ? tier.color : 'rgba(113, 128, 150, 0.2)',
        }}
      />

      {/* Content */}
      <View style={{ flex: 1, padding: 14, justifyContent: 'space-between' }}>
        {/* Custom 3D Metallic Badge */}
        <View style={{ alignItems: 'center', marginTop: 4 }}>
          <MetallicBadge achievement={achievement} size={64} isUnlocked={isUnlocked} />
        </View>

        {/* Title */}
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text
            style={{
              color: isUnlocked ? '#1F2328' : '#868E96',
              fontSize: 13,
              fontWeight: '900',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              lineHeight: 17,
            }}
            numberOfLines={2}
          >
            {achievement.title}
          </Text>
        </View>

        {/* Subtitle / requirement */}
        <View style={{ alignItems: 'center', marginTop: 4 }}>
          <Text
            style={{
              color: isUnlocked ? achievement.accentColor : '#868E96',
              fontSize: 10,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              textAlign: 'center',
            }}
            numberOfLines={2}
          >
            {achievement.requirement}
          </Text>
        </View>

        {/* Bottom: Progress bar or Unlocked indicator */}
        <View style={{ marginTop: 'auto', paddingTop: 8 }}>
          {isUnlocked ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#48BB78',
                  marginRight: 6,
                }}
              />
              <Text
                style={{
                  color: '#48BB78',
                  fontSize: 10,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                Conquistado
              </Text>
            </View>
          ) : progress > 0 ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <Text style={{ color: '#868E96', fontSize: 9, fontWeight: '700' }}>
                  PROGRESSO
                </Text>
                <Text style={{ color: '#495057', fontSize: 9, fontWeight: '800' }}>
                  {progress}%
                </Text>
              </View>
              <View
                style={{
                  height: 4,
                  backgroundColor: 'rgba(73, 80, 87, 0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: achievement.accentColor,
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#868E96', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>
                🔒 Bloqueado
              </Text>
            </View>
          )}
        </View>

        {/* Score badge */}
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: isUnlocked ? `${tier.color}33` : 'rgba(73, 80, 87, 0.05)',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: isUnlocked ? `${tier.color}55` : 'rgba(73, 80, 87, 0.1)',
          }}
        >
          <Text
            style={{
              color: isUnlocked ? tier.color : '#868E96',
              fontSize: 8,
              fontWeight: '900',
              letterSpacing: 0.5,
            }}
          >
            {achievement.scoreValue} PTS
          </Text>
        </View>

        {/* Tier label */}
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: isUnlocked ? `${tier.color}22` : 'rgba(73, 80, 87, 0.05)',
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              color: isUnlocked ? tier.color : '#868E96',
              fontSize: 7,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {tier.label}
          </Text>
        </View>
      </View>
    </View>
  );
}
