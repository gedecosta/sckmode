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
      <View className="mb-14">
        <View className="w-20 h-20 bg-athledia-dark rounded-[24px] items-center justify-center mb-10 -rotate-6 shadow-2xl shadow-black/20">
           <Text className="text-white text-4xl font-black font-serif">A</Text>
        </View>
        
        <Text className="text-athledia-dark text-7xl font-black font-serif tracking-tighter leading-[70px]">
          WELCOME
        </Text>
        <Text className="text-athledia-slate text-6xl font-black font-serif tracking-tighter leading-[60px] opacity-20">
          ATHLEDIA
        </Text>
        <View className="w-12 h-2 bg-[#D4A640] mt-8 mb-4 rounded-full" />
        
        <Text className="text-athledia-dark mt-4 text-xl font-black uppercase tracking-widest leading-7">
          Sua nova jornada{'\n'}começa agora.
        </Text>
        
        <Text className="text-athledia-slate mt-6 text-base font-semibold leading-6 pr-10">
          Estamos preparando sua experiência de elite. Conecte-se com sua tribo e supere seus limites todos os dias.
        </Text>
      </View>

      <Button 
        label="COMEÇAR JORNADA" 
        onPress={handleNext} 
        className="h-[72px] rounded-[24px] shadow-2xl shadow-black/30" 
      />
    </View>
  );
}
