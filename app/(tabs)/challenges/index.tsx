import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Trophy, Plus, Users, Zap, Award, ChevronRight, Activity } from 'lucide-react-native';
import { useAchievementStore, ALL_ACHIEVEMENTS } from '../../../stores/achievementStore';

const MOCK_CHALLENGES = [
  {
    id: '1',
    title: 'Murph Challenge',
    participants: 1240,
    type: 'Crossfit',
    difficulty: 'Hard',
    color: '#E03131',
  },
  {
    id: '2',
    title: 'Desafio 5K Sub-20',
    participants: 856,
    type: 'Corrida',
    difficulty: 'Medium',
    color: '#D4A640',
  },
  {
    id: '3',
    title: '100 Flexões em 30 Dias',
    participants: 4320,
    type: 'Bodyweight',
    difficulty: 'Easy',
    color: '#48BB78',
  },
];

export default function ChallengesScreen() {
  const router = useRouter();
  const { userAchievements, totalScore } = useAchievementStore();
  const unlockedCount = userAchievements.filter(a => a.unlockedAt).length;

  return (
    <View className="flex-1 bg-athledia-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-[52px] pb-4 bg-athledia-bg">
        <View className="flex-row items-center">
          <Zap size={32} color="#1F2328" strokeWidth={2.5} />
          <Text className="text-athledia-dark text-4xl font-black font-serif uppercase tracking-tighter ml-2">Desafios</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/create')}
          className="bg-athledia-card border border-athledia-slate/20 p-2.5 rounded-xl shadow-sm"
        >
          <Plus size={22} color="#1F2328" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

        {/* ── Achievements Entry Card ────────────────────────── */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/challenges/achievements')}
          activeOpacity={0.85}
          className="bg-athledia-card rounded-[24px] p-6 mb-8 mt-2 border border-athledia-slate/10 flex-row items-center shadow-sm"
        >
          {/* Icon Badge */}
          <View className="w-16 h-16 rounded-[20px] bg-[#D4A640]/10 border border-[#D4A640]/20 items-center justify-center mr-4">
            <Award size={32} color="#D4A640" strokeWidth={2} />
          </View>

          {/* Info */}
          <View className="flex-1">
            <Text className="text-athledia-dark text-lg font-black uppercase tracking-widest mb-1 font-serif">
              Conquistas
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="flex-row items-center mr-4">
                <View className="w-2 h-2 rounded-full bg-[#48BB78] mr-2" />
                <Text className="text-athledia-slate text-sm font-bold">
                  {unlockedCount} / {ALL_ACHIEVEMENTS.length}
                </Text>
              </View>
              <Text className="text-[#D4A640] text-sm font-black uppercase tracking-tight">
                {totalScore.toLocaleString('pt-BR')} pts
              </Text>
            </View>
          </View>

          {/* Arrow */}
          <ChevronRight size={20} color="#868E96" strokeWidth={3} />
        </TouchableOpacity>

        {/* Highlight Hero Challenge */}
        <View className="bg-athledia-card border-2 border-athledia-dark rounded-[32px] p-8 mb-8 overflow-hidden">
          <View className="absolute top-0 right-0 w-32 h-32 bg-athledia-dark/5 rounded-bl-[100px]" />
          
          <View className="flex-row items-center mb-5">
            <View className="bg-athledia-dark py-1.5 px-3 rounded-md flex-row items-center">
              <Trophy size={14} color="#FFF" />
              <Text className="text-white font-black text-xs uppercase tracking-widest ml-2">Desafio da Semana</Text>
            </View>
          </View>

          <Text className="text-athledia-dark text-5xl font-black font-serif uppercase tracking-tighter leading-none mb-4">
            Iron Man{'\n'}Virtual
          </Text>
          <Text className="text-athledia-slate font-semibold text-sm leading-6 mb-8 pr-4">
            Complete um Triathlon na distância Iron em uma semana. Registre corrida, ciclismo e natação para desbloquear a medalha de Ouro.
          </Text>

          <TouchableOpacity className="bg-athledia-dark py-5 rounded-2xl items-center flex-row justify-center shadow-lg shadow-black/20">
            <Activity size={20} color="#fff" />
            <Text className="text-white font-black ml-3 text-base uppercase tracking-widest">Aceitar Desafio</Text>
          </TouchableOpacity>
        </View>

        {/* List Header */}
        <View className="flex-row items-center justify-between mb-5 px-1">
          <Text className="text-athledia-dark font-black font-serif text-2xl uppercase tracking-tighter">Em Alta</Text>
          <TouchableOpacity>
            <Text className="text-athledia-slate font-bold uppercase text-xs tracking-wider">Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* Mock Challenge Items */}
        <View className="gap-4">
          {MOCK_CHALLENGES.map((item) => (
            <TouchableOpacity 
              key={item.id}
              activeOpacity={0.8}
              className="bg-athledia-card border border-athledia-slate/10 rounded-[20px] p-6 shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-4">
                <Text className="text-athledia-dark text-xl font-black font-serif uppercase tracking-tight flex-1 mr-4">
                  {item.title}
                </Text>
                {/* Difficulty Pill */}
                <View className="px-3 py-1 rounded-md border" style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}>
                  <Text style={{ color: item.color }} className="text-xs font-black uppercase tracking-widest">{item.difficulty}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center justify-between mt-2">
                {/* Type Pill */}
                <View className="bg-athledia-bg px-3 py-1.5 rounded-lg border border-athledia-slate/10">
                  <Text className="text-athledia-slate text-xs font-black uppercase tracking-wider">{item.type}</Text>
                </View>
                
                {/* Participants */}
                <View className="flex-row items-center">
                  <Users size={16} color="#868E96" />
                  <Text className="text-athledia-dark text-sm ml-2 font-black">{item.participants}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
