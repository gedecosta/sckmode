import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, MoreHorizontal, UserPlus } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AvatarBadge } from '../../../components/profile/AvatarBadge';
import { StatsRow } from '../../../components/profile/StatsRow';

export default function PublicProfileScreen() {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  
  // Mock Data
  const profileName = username ? String(username) : 'Atleta Desconhecido';
  const avatarUrl = 'https://i.pravatar.cc/300?u=2';

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4 bg-zinc-950 border-b border-zinc-900">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">{profileName}</Text>
        <TouchableOpacity className="p-2">
          <MoreHorizontal size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="items-center mt-8">
          <AvatarBadge uri={avatarUrl} size={110} level={42} />
          <Text className="text-white font-black text-3xl mt-5">{profileName}</Text>
          <Text className="text-zinc-400 text-sm mt-1 mb-6 text-center px-4">
            Corredor de montanha explorando trilhas aos finais de semana.
          </Text>
        </View>

        <View className="flex-row gap-4">
          <TouchableOpacity className="flex-1 bg-indigo-600 rounded-xl h-12 flex-row items-center justify-center">
            <UserPlus size={18} color="#fff" />
            <Text className="text-white font-bold ml-2">Seguir</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-zinc-800 rounded-xl h-12 items-center justify-center">
            <Text className="text-white font-bold">Assinar Plano (R$ 29)</Text>
          </TouchableOpacity>
        </View>

        <StatsRow followers={45.2} following={12} activities={802} prs={42} />
      </ScrollView>
    </View>
  );
}
