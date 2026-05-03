import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Camera, Activity, Trophy, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { NoiseBackground } from '../../components/ui/NoiseBackground';
import { useThemeColors } from '../../lib/tokens';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onPress?: () => void;
}

function ActionCard({ title, description, icon: Icon, onPress }: ActionCardProps) {
  const c = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mb-3 rounded-2xl p-4 flex-row items-center"
      style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
    >
      <View
        className="w-[52px] h-[52px] rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: c.surfaceAlt }}
      >
        <Icon size={22} color={c.text} strokeWidth={1.75} />
      </View>

      <View className="flex-1 pr-3">
        <Text
          className="text-base mb-1"
          style={{ color: c.text, fontFamily: 'RobotoSlab-Black', letterSpacing: -0.3 }}
        >
          {title}
        </Text>
        <Text className="text-xs" style={{ color: c.textMuted, lineHeight: 17 }}>
          {description}
        </Text>
      </View>

      <View
        className="w-[34px] h-[34px] rounded-lg items-center justify-center"
        style={{ backgroundColor: c.accent }}
      >
        <ArrowRight size={16} color={c.accentInk} strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}

export default function CreateScreen() {
  const c = useThemeColors();
  const router = useRouter();

  return (
    <View className="flex-1">
      <NoiseBackground />

      <View className="px-6 pt-[52px] pb-5">
        <Text
          className="text-[10px] uppercase mb-1"
          style={{ color: c.textMuted, letterSpacing: 2, fontFamily: 'Menlo' }}
        >
          · LOG · NEW ENTRY
        </Text>
        <Text
          style={{ color: c.text, fontSize: 40, fontFamily: 'RobotoSlab-Black', letterSpacing: -1.5, lineHeight: 40 }}
        >
          Create
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="px-6 pb-4 text-sm" style={{ color: c.textMuted }}>
          O que vamos registrar hoje?
        </Text>

        <ActionCard
          title="Postar no Feed"
          description="Compartilhe fotos, textos ou atualizações com sua tribo."
          icon={Camera}
        />
        <ActionCard
          title="Registro Manual"
          description="Adicione sessões sem GPS — academia, natação, crossfit."
          icon={Activity}
          onPress={() => router.push('/create/manual' as any)}
        />
        <ActionCard
          title="Novo Desafio"
          description="Crie uma série. Convide sua tribo."
          icon={Trophy}
        />
      </ScrollView>
    </View>
  );
}
