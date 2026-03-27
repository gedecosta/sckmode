import React from 'react';
import { View, Text } from 'react-native';

interface StatsRowProps {
  followers: number;
  following: number;
  activities: number;
  prs: number;
}

export function StatsRow({ followers, following, activities, prs }: StatsRowProps) {
  return (
    <View className="flex-row items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl p-4 my-6">
      
      <View className="items-center flex-1">
        <Text className="text-white text-xl font-black tabular-nums">{followers}</Text>
        <Text className="text-zinc-500 text-xs font-semibold mt-1">Seguidores</Text>
      </View>
      
      <View className="w-[1px] h-8 bg-zinc-800" />
      
      <View className="items-center flex-1">
        <Text className="text-white text-xl font-black tabular-nums">{following}</Text>
        <Text className="text-zinc-500 text-xs font-semibold mt-1">Seguindo</Text>
      </View>
      
      <View className="w-[1px] h-8 bg-zinc-800" />
      
      <View className="items-center flex-1">
        <Text className="text-white text-xl font-black tabular-nums">{activities}</Text>
        <Text className="text-zinc-500 text-xs font-semibold mt-1">Atividades</Text>
      </View>

      <View className="w-[1px] h-8 bg-zinc-800" />
      
      <View className="items-center flex-1">
        <Text className="text-indigo-400 text-xl font-black tabular-nums">{prs}</Text>
        <Text className="text-zinc-500 text-xs font-semibold mt-1 uppercase tracking-wider">PRs</Text>
      </View>

    </View>
  );
}
