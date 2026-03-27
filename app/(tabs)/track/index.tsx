import React from 'react';
import { View, Text } from 'react-native';
import { Play, Square, Pause, Map } from 'lucide-react-native';
import { LiveMap } from '../../../components/tracking/LiveMap';
import { MetricBar } from '../../../components/tracking/MetricBar';
import { useTracking } from '../../../hooks/useTracking';
import { Button } from '../../../components/ui/Button';

export default function TrackScreen() {
  const { status, startTracking, pauseTracking, resumeTracking, finishTracking } = useTracking();

  return (
    <View className="flex-1 bg-athledia-bg">
      <LiveMap />
      
      {/* Floating Header */}
      <View className="absolute top-0 left-0 right-0 px-6 pt-12 pb-4 bg-athledia-bg/80 border-b border-athledia-slate/10">
        <View className="flex-row items-center">
          <Map size={28} color="#1F2328" />
          <Text className="text-athledia-dark text-4xl font-black font-serif uppercase tracking-tighter ml-3">Treinar</Text>
        </View>
      </View>
      
      {status !== 'idle' && status !== 'finished' && (
        <MetricBar />
      )}

      {/* Main Controls - Bottom */}
      <View className="absolute bottom-8 left-6 right-6 items-center">
        {status === 'idle' && (
          <Button 
            label="INICIAR TREINO" 
            onPress={startTracking} 
            size="lg"
            className="w-full bg-athledia-dark rounded-full h-16 shadow-sm shadow-athledia-slate/30"
          />
        )}

        {status === 'running' && (
          <Button 
            label="PAUSAR" 
            onPress={pauseTracking} 
            variant="secondary"
            size="lg"
            className="w-full bg-athledia-lightSlate rounded-full h-16"
          />
        )}

        {status === 'paused' && (
          <View className="flex-row gap-4 w-full">
            <Button 
              label="RETOMAR" 
              onPress={resumeTracking} 
              className="flex-[2] bg-athledia-dark rounded-full h-16"
            />
            <Button 
              label="" 
              onPress={finishTracking} 
              variant="danger"
              className="flex-[1] rounded-full h-16 bg-athledia-slate"
            >
              <Square size={24} color="#F4F4F4" fill="#F4F4F4" />
            </Button>
          </View>
        )}

        {status === 'finished' && (
          <View className="w-full bg-athledia-card border border-athledia-slate/20 rounded-3xl p-6 shadow-xl pt-4">
             <Button 
              label="Salvar Atividade" 
              onPress={() => {}} 
              className="w-full h-14 bg-athledia-dark mt-4 rounded-xl"
            />
            <Button 
              label="Descartar" 
              variant="ghost" 
              onPress={() => {}} 
              className="w-full mt-2"
            />
          </View>
        )}
      </View>
    </View>
  );
}
