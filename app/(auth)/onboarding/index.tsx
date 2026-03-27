import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/ui/Button';

export default function OnboardingIndex() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to tabs for now until other steps are implemented
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-athledia-bg p-8 justify-center">
      <View className="items-center mb-12">
        <View className="w-24 h-24 bg-athledia-dark rounded-3xl items-center justify-center mb-8 rotate-3 shadow-xl shadow-athledia-dark/20">
           <Text className="text-athledia-accent text-5xl font-black">A</Text>
        </View>
        <Text className="text-athledia-dark text-4xl font-black text-center font-serif uppercase leading-tight tracking-tighter">
          Bem-vindo ao Athledia!
        </Text>
        <View className="h-1 w-12 bg-athledia-dark mt-4" />
        <Text className="text-athledia-slate mt-8 text-center text-lg font-medium leading-7">
          Estamos preparando sua experiência premium. Em breve você poderá escolher seus esportes, 
          conectar seus dispositivos e encontrar sua tribo.
        </Text>
      </View>

      <Button label="COMEÇAR JORNADA" onPress={handleNext} className="h-16 shadow-xl" />
    </View>
  );
}
