import React from 'react';
import { View, Image, Text } from 'react-native';

interface AvatarBadgeProps {
  uri: string;
  size?: number;
  level?: number;
  isPro?: boolean;
}

export function AvatarBadge({ uri, size = 100, level, isPro }: AvatarBadgeProps) {
  return (
    <View className="relative" style={{ width: size, height: size }}>
      <Image 
        source={{ uri }} 
        style={{ width: size, height: size, borderRadius: size / 2 }}
        className={`bg-zinc-800 ${isPro ? 'border-2 border-yellow-500' : ''}`}
      />
      
      {level !== undefined && (
        <View className="absolute -bottom-2 right-1 bg-indigo-600 px-2 py-0.5 rounded-full border-2 border-black">
          <Text className="text-white text-[10px] font-black tracking-tighter">LV {level}</Text>
        </View>
      )}

      {isPro && (
        <View className="absolute top-0 right-0 bg-yellow-500 px-1.5 py-0.5 rounded-full border border-black">
          <Text className="text-black text-[8px] font-black tracking-widest uppercase">PRO</Text>
        </View>
      )}
    </View>
  );
}
