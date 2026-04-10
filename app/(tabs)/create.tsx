import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Plus, Camera, Activity, Trophy, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface ActionCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  onPress?: () => void;
}

function ActionCard({ title, description, icon: Icon, color, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="bg-athledia-card rounded-[20px] p-6 mb-4 border border-athledia-slate/10 shadow-sm flex-row items-center justify-between"
    >
      <View className="flex-row items-center flex-1">
        <View className="w-14 h-14 rounded-2xl bg-athledia-bg items-center justify-center mr-4">
          <Icon size={26} color={color} />
        </View>
        
        <View className="flex-1 pr-4">
          <Text className="text-athledia-dark text-lg font-black font-serif tracking-tight mb-1">
            {title}
          </Text>
          <Text className="text-athledia-slate text-xs font-semibold leading-5">
            {description}
          </Text>
        </View>
      </View>

      <View className="w-8 h-8 rounded-xl bg-athledia-dark items-center justify-center">
        <ArrowRight size={16} color="#FFFFFF" strokeWidth={3} />
      </View>
    </TouchableOpacity>
  );
}

export default function CreateScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-athledia-bg">
      
      {/* Header */}
      <View className="flex-row items-center px-6 pt-[52px] pb-6">
        <Plus size={32} color="#1F2328" strokeWidth={2.5} />
        <Text className="text-athledia-dark text-4xl font-black font-serif uppercase tracking-tighter ml-2">
          Criar
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-athledia-slate text-sm font-semibold mb-5 ml-1">
          O que vamos registrar hoje?
        </Text>

        <ActionCard 
          title="Postar no Feed"
          description="Compartilhe fotos, textos ou atualizações no seu mural público."
          icon={Camera}
          color="#1F2328"
          onPress={() => {}}
        />

        <ActionCard 
          title="Registro Manual"
          description="Adicione treinos sem GPS como academias, natação ou crossfit."
          icon={Activity}
          color="#D4A640"
          onPress={() => router.push('/create/manual')}
        />

        <ActionCard 
          title="Novo Desafio"
          description="Crie competições internas e engaje seus seguidores."
          icon={Trophy}
          color="#48BB78"
          onPress={() => {}}
        />

      </ScrollView>
    </View>
  );
}
