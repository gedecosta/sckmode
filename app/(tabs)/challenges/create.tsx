import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Save } from 'lucide-react-native';
import { useChallengeStore } from '../../../stores/challengeStore';
import { ChallengeBox } from '../../../components/challenges/ChallengeBox';
import { Button } from '../../../components/ui/Button';

export default function CreateChallengeScreen() {
  const router = useRouter();
  const { draftSteps, addStep, removeStep, startCreating, clearDraft } = useChallengeStore();
  const [title, setTitle] = useState('');

  // Start draft on mount if not already
  React.useEffect(() => {
    startCreating();
    return () => clearDraft();
  }, []);

  const handleAddBox = (type: any, unit: string) => {
    addStep({
      type,
      targetValue: 10, // Default value to edit later
      targetUnit: unit,
    });
  };

  const saveChallenge = () => {
    // Mock save
    router.back();
  };

  return (
    <View className="flex-1 bg-athledia-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4 bg-athledia-bg border-b border-athledia-slate/20">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={28} color="#1F2328" />
        </TouchableOpacity>
        <Text className="text-athledia-dark text-lg font-black font-serif uppercase tracking-tight">Criar Desafio</Text>
        <TouchableOpacity onPress={saveChallenge} className="p-2">
          <Save size={24} color="#1F2328" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
          <Text className="text-athledia-slate text-xs font-black uppercase tracking-widest ml-1 mb-2">Nome do Desafio</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Murph, Iron Man..."
            placeholderTextColor="#868E96"
            className="w-full h-14 bg-athledia-card border border-athledia-slate/20 rounded-xl px-4 text-athledia-dark text-lg font-black font-serif mb-8 focus:border-athledia-dark"
          />

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-athledia-dark font-black text-xl font-serif uppercase">Etapas</Text>
            <Text className="text-athledia-slate text-xs font-bold uppercase tracking-tighter">{draftSteps.length} BLOCOS</Text>
          </View>

          {draftSteps.length === 0 ? (
            <View className="bg-athledia-card/50 border border-athledia-slate/30 border-dashed rounded-2xl p-8 items-center justify-center mb-8">
              <Text className="text-athledia-slate text-center font-bold text-sm uppercase tracking-wide">
                Seu desafio está vazio. Adicione blocos de exercícios abaixo.
              </Text>
            </View>
          ) : (
            <View className="mb-6">
              {draftSteps.map((step, index) => (
                <ChallengeBox 
                  key={step.id} 
                  step={step} 
                  index={index} 
                  onRemove={() => removeStep(step.id)}
                />
              ))}
            </View>
          )}

          <Text className="text-athledia-slate text-xs font-black uppercase tracking-widest mb-4 px-1">
            Adicionar Blocos
          </Text>
          
          <View className="flex-row flex-wrap gap-3">
            <Button 
              label="+ Corrida" 
              variant="secondary" 
              size="sm"
              onPress={() => handleAddBox('run', 'km')} 
            />
            <Button 
              label="+ Ciclismo" 
              variant="secondary" 
              size="sm"
              onPress={() => handleAddBox('cycling', 'km')} 
            />
            <Button 
              label="+ Flexão" 
              variant="secondary" 
              size="sm"
              onPress={() => handleAddBox('pushups', 'reps')} 
            />
            <Button 
              label="+ Barra" 
              variant="secondary" 
              size="sm"
              onPress={() => handleAddBox('pullups', 'reps')} 
            />
            <Button 
              label="+ Natação" 
              variant="secondary" 
              size="sm"
              onPress={() => handleAddBox('swim', 'm')} 
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
