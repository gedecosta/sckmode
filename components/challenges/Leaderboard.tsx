import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';

export interface LeaderboardEntry {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  position: number;
}

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

export function Leaderboard({ data }: LeaderboardProps) {
  return (
    <View className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
      <View className="bg-zinc-950 p-4 border-b border-zinc-800">
        <Text className="text-white font-bold text-lg">Classificação</Text>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          const isTop3 = item.position <= 3;
          let positionColor = 'text-zinc-500';
          if (item.position === 1) positionColor = 'text-yellow-400';
          if (item.position === 2) positionColor = 'text-slate-300';
          if (item.position === 3) positionColor = 'text-amber-600';

          return (
            <View className={`flex-row items-center p-4 border-b border-zinc-900 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}`}>
              <Text className={`w-8 font-black text-lg ${positionColor}`}>
                {item.position}
              </Text>
              
              <Image 
                source={{ uri: item.user.avatar }} 
                className={`w-10 h-10 rounded-full bg-zinc-800 ${isTop3 ? 'border-2 border-indigo-500/50' : ''}`}
              />
              
              <Text className="text-white font-medium ml-4 flex-1" numberOfLines={1}>
                {item.user.name}
              </Text>
              
              <Text className="text-zinc-400 font-mono font-medium tracking-tight">
                {item.time}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
