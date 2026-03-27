import React from 'react';
import { View, Text, Image } from 'react-native';

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
    <View className="mb-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-white font-bold text-xl">Conquistas</Text>
        <Text className="text-indigo-400 font-medium">Ver 24</Text>
      </View>

      <View className="flex-row flex-wrap gap-4">
        {badges.map((badge) => {
          const isUnlocked = !!badge.unlockedAt;
          return (
            <View 
              key={badge.id} 
              className={`w-[30%] aspect-square rounded-2xl p-2 items-center justify-center border ${
                isUnlocked 
                  ? 'bg-zinc-900 border-zinc-800' 
                  : 'bg-zinc-950 border-zinc-900 opacity-50'
              }`}
            >
              <Text className="text-4xl mb-2">{badge.icon}</Text>
              <Text 
                className="text-white text-[10px] font-bold text-center leading-[12px]"
                numberOfLines={2}
              >
                {badge.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
