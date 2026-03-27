import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Trophy, Plus, Users, Zap } from 'lucide-react-native';

const MOCK_CHALLENGES = [
  {
    id: '1',
    title: 'Murph Challenge',
    participants: 1240,
    type: 'Crossfit',
    difficulty: 'Hard',
  },
  {
    id: '2',
    title: 'Desafio 5K Sub-20',
    participants: 856,
    type: 'Corrida',
    difficulty: 'Medium',
  },
  {
    id: '3',
    title: '100 Flexões em 30 Dias',
    participants: 4320,
    type: 'Bodyweight',
    difficulty: 'Easy',
  },
];

export default function ChallengesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-athledia-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-12 pb-4 bg-athledia-bg border-b border-athledia-slate/10">
        <View className="flex-row items-center">
          <Zap size={28} color="#1F2328" />
          <Text className="text-athledia-dark text-4xl font-black font-serif uppercase tracking-tighter ml-3">Desafios</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/challenges/create')}
          className="bg-athledia-dark p-2 rounded-full shadow-sm"
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Highlight */}
        <View className="bg-athledia-card border border-athledia-slate/10 rounded-3xl p-6 mb-8 mt-2 shadow-sm">
          <View className="flex-row items-center mb-4">
            <Trophy size={28} color="#1F2328" />
            <Text className="text-athledia-slate font-bold text-lg uppercase tracking-wider ml-3">Desafio da Semana</Text>
          </View>
          <Text className="text-athledia-dark text-4xl font-black font-serif uppercase tracking-tighter mb-2">
            Iron Man Virtual
          </Text>
          <Text className="text-athledia-slate font-medium mb-6 leading-5">
            Complete um Triathlon na distância Iron em uma semana. Registre corrida, ciclismo e natação para desbloquear a badge exclusiva.
          </Text>
          <TouchableOpacity className="bg-athledia-dark py-4 rounded-2xl items-center flex-row justify-center shadow-sm">
            <Zap size={20} color="#fff" />
            <Text className="text-athledia-accent font-bold ml-2 text-base uppercase tracking-wider">Aceitar Desafio</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-athledia-dark font-black font-serif text-2xl uppercase tracking-tight">Em Alta</Text>
          <Text className="text-athledia-dark font-bold underline">Ver todos</Text>
        </View>

        <View className="gap-4 pb-20">
          {MOCK_CHALLENGES.map((item) => (
            <TouchableOpacity 
              key={item.id}
              className="bg-athledia-card border border-athledia-slate/10 rounded-2xl p-5 shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-3">
                <Text className="text-athledia-dark text-xl font-black flex-1 mr-4 font-serif">
                  {item.title}
                </Text>
                <View className="bg-athledia-slate/10 px-3 py-1 rounded-full">
                  <Text className="text-athledia-slate text-xs font-bold uppercase">{item.difficulty}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center justify-between mt-auto">
                <View className="bg-athledia-bg px-3 py-1.5 rounded-lg border border-athledia-slate/20">
                  <Text className="text-athledia-slate text-xs font-bold uppercase">{item.type}</Text>
                </View>
                <View className="flex-row items-center">
                  <Users size={16} color="#868E96" />
                  <Text className="text-athledia-slate text-sm ml-1.5 font-bold">{item.participants}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
