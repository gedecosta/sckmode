import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Play, Square, Pause, Map } from 'lucide-react-native';
import { LiveMap } from '@/components/tracking/LiveMap';
import { MetricBar } from '@/components/tracking/MetricBar';
import { useTracking } from '@/hooks/useTracking';
import { Button } from '@/components/ui/Button';

export default function TrackScreen() {
  const { status, startTracking, pauseTracking, resumeTracking, finishTracking } = useTracking();

  return (
    <View className="flex-1 bg-athledia-bg">
      <LiveMap />
      
      {/* Floating Header */}
      <View className="absolute top-0 left-0 right-0 px-6 pt-[52px] pb-5 bg-athledia-bg/90 shadow-sm">
        <View className="flex-row items-center">
          <Map size={32} color="#1F2328" strokeWidth={2.5} />
          <Text className="text-athledia-dark text-4xl font-black font-serif uppercase tracking-tighter ml-2">Treinar</Text>
        </View>
      </View>
      
      {status !== 'idle' && status !== 'finished' && (
        <MetricBar />
      )}

      {/* Main Controls - Bottom */}
      <View className="absolute bottom-10 left-6 right-6 items-center">
        {status === 'idle' && (
          <Button 
            label="INICIAR TREINO" 
            onPress={startTracking} 
            size="lg"
            className="w-full bg-athledia-dark rounded-[24px] h-[72px] shadow-2xl shadow-black/40"
          />
        )}

        {status === 'running' && (
          <Button 
            label="PAUSAR" 
            onPress={pauseTracking} 
            variant="secondary"
            size="lg"
            className="w-full bg-athledia-card border-4 border-athledia-dark rounded-[24px] h-[72px] shadow-2xl shadow-black/30"
          />
        )}

        {status === 'paused' && (
          <View className="flex-row gap-4 w-full">
            <Button 
              label="RETOMAR" 
              onPress={resumeTracking} 
              className="flex-[2] bg-athledia-dark rounded-[24px] h-[72px] shadow-2xl shadow-black/40"
            />
            <Button 
              label="" 
              onPress={finishTracking} 
              variant="danger"
              className="flex-[1] rounded-[24px] h-[72px] bg-[#E03131]"
            >
              <Square size={28} color="#FFFFFF" fill="#FFFFFF" />
            </Button>
          </View>
        )}

        {status === 'finished' && (
          <View className="w-full bg-athledia-card border-2 border-athledia-dark rounded-[32px] p-8 shadow-2xl">
            <View className="items-center mb-6">
              <Text className="text-athledia-dark font-black font-serif text-3xl uppercase tracking-tighter">Resumo</Text>
              <View className="w-10 h-1 bg-[#D4A640] mt-2 rounded-full" />
            </View>

             <Button 
              label="Salvar no Feed" 
              onPress={() => {}} 
              className="w-full h-[64px] bg-athledia-dark rounded-[20px] mb-3"
            />
            <TouchableOpacity 
              onPress={() => {}} 
              className="w-full py-4 items-center"
            >
              <Text className="text-athledia-slate font-black uppercase text-xs tracking-widest">Descartar Treino</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
