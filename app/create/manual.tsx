import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ChevronLeft, Activity, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ManualLogScreen() {
  const router = useRouter();
  const [sport, setSport] = useState('Corrida');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('Hoje');

  const sports = ['Corrida', 'Ciclismo', 'Natação', 'Crossfit', 'Caminhada'];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#E5E5E5' }}
    >
      {/* Header Modal */}
      <View className="flex-row items-center justify-between px-4 pt-[52px] pb-4 bg-athledia-bg border-b border-athledia-slate/10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-athledia-card rounded-xl border border-athledia-slate/10"
        >
          <ChevronLeft size={22} color="#1F2328" />
        </TouchableOpacity>
        <Text className="text-athledia-dark text-base font-black uppercase tracking-widest text-center flex-1 mr-8">
          Registro Manual
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Helper Text */}
        <Text className="text-athledia-slate text-sm font-semibold mb-6">
          Preencha os dados do treino que o GPS não registrou.
        </Text>

        {/* Sport Selector */}
        <Text className="text-athledia-dark text-xs font-black uppercase mb-3 ml-1 tracking-widest">Esporte</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 h-12" contentContainerStyle={{ paddingRight: 20 }}>
          {sports.map((s) => {
            const isSelected = sport === s;
            return (
              <TouchableOpacity
                key={s}
                onPress={() => setSport(s)}
                className={`flex-row items-center px-5 rounded-xl mr-3 border ${
                  isSelected ? 'bg-athledia-dark border-athledia-dark' : 'bg-athledia-card border-athledia-slate/20'
                }`}
              >
                <Activity size={16} color={isSelected ? '#FFFFFF' : '#495057'} />
                <Text className={`ml-2 font-bold ${isSelected ? 'text-white' : 'text-athledia-slate'}`}>
                  {s}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Distance Input */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3 ml-1">
            <Text className="text-athledia-dark text-xs font-black uppercase tracking-widest">Distância / Métricas</Text>
            <Text className="text-athledia-slate text-xs font-bold">Opcional</Text>
          </View>
          <View className="flex-row items-center bg-athledia-card rounded-2xl border border-athledia-slate/10 px-4 h-16">
            <MapPin size={22} color="#868E96" />
            <TextInput
              className="flex-1 ml-3 text-athledia-dark text-lg font-bold"
              placeholder="Ex: 5"
              placeholderTextColor="#B0B7BF"
              keyboardType="decimal-pad"
              value={distance}
              onChangeText={setDistance}
            />
            <Text className="text-athledia-slate font-bold text-base">km</Text>
          </View>
        </View>

        {/* Duration Input */}
        <View className="mb-6">
          <Text className="text-athledia-dark text-xs font-black uppercase mb-3 ml-1 tracking-widest">Duração do Treino</Text>
          <View className="flex-row items-center bg-athledia-card rounded-2xl border border-athledia-slate/10 px-4 h-16">
            <Clock size={22} color="#868E96" />
            <TextInput
              className="flex-1 ml-3 text-athledia-dark text-lg font-bold"
              placeholder="Ex: 45:00"
              placeholderTextColor="#B0B7BF"
              keyboardType="numbers-and-punctuation"
              value={duration}
              onChangeText={setDuration}
            />
            <Text className="text-athledia-slate font-bold text-base">min</Text>
          </View>
        </View>

        {/* Date Selector (Simulated) */}
        <View className="mb-8">
          <Text className="text-athledia-dark text-xs font-black uppercase mb-3 ml-1 tracking-widest">Data</Text>
          <View className="flex-row gap-3">
            {['Hoje', 'Ontem', 'Outro dia'].map((d) => {
              const isSelected = date === d;
              return (
                <TouchableOpacity
                  key={d}
                  onPress={() => setDate(d)}
                  className={`flex-1 flex-row items-center justify-center p-4 rounded-xl border ${
                    isSelected ? 'bg-[#D4A640] border-[#D4A640] shadow-md' : 'bg-athledia-card border-athledia-slate/10'
                  }`}
                >
                  <Calendar size={18} color={isSelected ? '#1F2328' : '#868E96'} />
                  <Text className={`ml-2 text-sm font-black uppercase tracking-tight ${isSelected ? 'text-athledia-dark' : 'text-athledia-slate'}`}>
                    {d}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-athledia-dark rounded-2xl p-5 flex-row items-center justify-center shadow-lg shadow-black/20"
          onPress={() => {
            // Mock Saving behavior
            router.back();
          }}
        >
          <CheckCircle size={22} color="#FFFFFF" />
          <Text className="text-white text-base font-black uppercase tracking-widest ml-3">
            Salvar Treino
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
