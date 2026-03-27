import React from 'react';
import { View, Text } from 'react-native';
import { Map as MapIcon } from 'lucide-react-native';

export function LiveMap() {
  return (
    <View className="flex-1 bg-athledia-card items-center justify-center p-8">
      <View className="bg-athledia-bg p-8 rounded-full mb-6 shadow-sm border border-athledia-slate/10">
        <MapIcon size={48} color="#495057" strokeWidth={1.5} />
      </View>
      <Text className="text-athledia-dark text-xl font-black font-serif uppercase tracking-tight text-center">
        Mapa Indisponível na Web
      </Text>
      <Text className="text-athledia-slate text-center mt-3 font-medium leading-6 max-w-xs">
        O rastreamento GPS e o mapa interativo estão otimizados para a experiência no seu celular Athledia.
      </Text>
    </View>
  );
}
