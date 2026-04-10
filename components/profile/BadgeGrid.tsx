import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

interface BadgeGridProps {
  badges: Badge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            color: '#1F2328',
            fontSize: 16,
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: 0.3,
          }}
        >
          Conquistas
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: '#495057',
              fontSize: 13,
              fontWeight: '700',
              textDecorationLine: 'underline',
            }}
          >
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {badges.map((badge) => {
          const isUnlocked = !!badge.unlockedAt;
          return (
            <View
              key={badge.id}
              style={{
                width: '30%',
                aspectRatio: 1,
                borderRadius: 18,
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isUnlocked ? '#1F2328' : '#F4F4F4',
                borderWidth: 1,
                borderColor: isUnlocked
                  ? '#1F2328'
                  : 'rgba(73, 80, 87, 0.12)',
                opacity: isUnlocked ? 1 : 0.5,
              }}
            >
              <Text style={{ fontSize: 30, marginBottom: 6 }}>{badge.icon}</Text>
              <Text
                style={{
                  color: isUnlocked ? '#FFFFFF' : '#495057',
                  fontSize: 9,
                  fontWeight: '800',
                  textAlign: 'center',
                  lineHeight: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.3,
                }}
                numberOfLines={2}
              >
                {badge.name}
              </Text>
              {isUnlocked && (
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#48BB78',
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
