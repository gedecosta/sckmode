import React from 'react';
import { View, Image, Text } from 'react-native';

interface AvatarBadgeProps {
  uri: string;
  size?: number;
  level?: number;
  isPro?: boolean;
}

export function AvatarBadge({ uri, size = 100, level, isPro }: AvatarBadgeProps) {
  const borderWidth = isPro ? 3 : 2.5;

  return (
    <View style={{ width: size + borderWidth * 2, height: size + borderWidth * 2 }}>
      {/* Outer ring */}
      <View
        style={{
          width: size + borderWidth * 2,
          height: size + borderWidth * 2,
          borderRadius: (size + borderWidth * 2) / 2,
          borderWidth: borderWidth,
          borderColor: isPro ? '#D4A640' : '#1F2328',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{ uri }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#D5D5D5',
          }}
        />
      </View>

      {/* Level badge */}
      {level !== undefined && (
        <View
          style={{
            position: 'absolute',
            bottom: -2,
            right: 0,
            backgroundColor: '#1F2328',
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#E5E5E5',
            minWidth: 36,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 9,
              fontWeight: '900',
              letterSpacing: -0.3,
            }}
          >
            LV {level}
          </Text>
        </View>
      )}

      {/* PRO badge */}
      {isPro && (
        <View
          style={{
            position: 'absolute',
            top: -2,
            right: -4,
            backgroundColor: '#D4A640',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#E5E5E5',
          }}
        >
          <Text
            style={{
              color: '#1F2328',
              fontSize: 7,
              fontWeight: '900',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            PRO
          </Text>
        </View>
      )}
    </View>
  );
}
