import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Settings, Edit3, MapPin, Link as LinkIcon, User } from 'lucide-react-native';
import { useAuthStore } from '../../../stores/authStore';
import { AvatarBadge } from '../../../components/profile/AvatarBadge';
import { StatsRow } from '../../../components/profile/StatsRow';
import { BadgeGrid } from '../../../components/profile/BadgeGrid';
import { Button } from '../../../components/ui/Button';

const MOCK_BADGES = [
  { id: '1', name: 'Primeiro 5K', icon: '🏃', description: '', unlockedAt: '2023-10-01' },
  { id: '2', name: 'Madrugador', icon: '🌅', description: '', unlockedAt: '2023-10-15' },
  { id: '3', name: 'Iron Man', icon: '🏊', description: '' },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore();
  
  // Fake user data
  const profileName = user?.user_metadata?.full_name || 'Atleta Athledia';
  const profileLocation = 'São Paulo, Brasil';
  const avatarUrl = user?.user_metadata?.avatar_url || 'https://i.pravatar.cc/300?u=a042581f4e29026704d';

  return (
    <View className="flex-1 bg-athledia-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-12 pb-4 bg-athledia-bg border-b border-athledia-slate/10">
        <View className="flex-row items-center">
          <User size={28} color="#1F2328" />
          <Text className="text-athledia-dark text-2xl font-black font-serif uppercase tracking-tight ml-3">Perfil</Text>
        </View>
        <TouchableOpacity onPress={signOut}>
          <Settings size={24} color="#1F2328" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        
        {/* User Info Container */}
        <View className="mt-4">
          <View className="flex-row justify-between items-start">
            <AvatarBadge uri={avatarUrl} size={88} level={12} isPro />
            <TouchableOpacity className="bg-athledia-card border border-athledia-slate/20 px-4 py-2 rounded-full flex-row items-center mt-2 shadow-sm">
              <Edit3 size={16} color="#495057" />
              <Text className="text-athledia-dark font-bold ml-2 text-sm uppercase tracking-wider">Editar</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-athledia-dark font-black font-serif text-3xl mt-4">{profileName}</Text>
          <Text className="text-athledia-slate text-sm mt-1 mb-3 pr-8 leading-5 font-medium">
            Triatleta amador tentando sobreviver às planilhas. Focado no Iron Man 2024. 🏊🚲🏃
          </Text>

          <View className="flex-row items-center space-x-4 mb-2 gap-4">
            <View className="flex-row items-center">
              <MapPin size={14} color="#868E96" />
              <Text className="text-athledia-slate text-xs ml-1 font-medium">{profileLocation}</Text>
            </View>
            <View className="flex-row items-center">
              <LinkIcon size={14} color="#868E96" />
              <Text className="text-athledia-dark text-xs ml-1 font-bold underline">strava.com/athletes/123</Text>
            </View>
          </View>
        </View>

        <StatsRow followers={1204} following={342} activities={156} prs={12} />

        <BadgeGrid badges={MOCK_BADGES} />

        {/* Tab system visual mock */}
        <View className="flex-row border-b border-athledia-slate/20 mb-6 mt-2">
          <View className="flex-1 pb-3 border-b-2 border-athledia-dark items-center">
            <Text className="text-athledia-dark font-black tracking-wider uppercase text-sm">Atividades</Text>
          </View>
          <View className="flex-1 pb-3 items-center">
            <Text className="text-athledia-lightSlate font-bold tracking-wider uppercase text-sm">Desafios</Text>
          </View>
          <View className="flex-1 pb-3 items-center">
            <Text className="text-athledia-lightSlate font-bold tracking-wider uppercase text-sm">Planos</Text>
          </View>
        </View>

        {/* Mock empty state for activities */}
        <View className="items-center justify-center py-10 mb-20">
          <Text className="text-athledia-slate font-medium">Nenhuma atividade recente.</Text>
        </View>
      </ScrollView>
    </View>
  );
}
