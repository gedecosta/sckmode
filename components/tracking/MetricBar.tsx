import React from 'react';
import { View, Text } from 'react-native';
import { useTrackingStore } from '../../stores/trackingStore';
import { calcPace, formatDuration } from '../../utils/pace';
import { getHeartRateZone, getZoneColor } from '../../utils/zones';

export function MetricBar() {
  const { distanceKm, elapsedSeconds, heartRate } = useTrackingStore();

  const paceStr = calcPace(distanceKm, elapsedSeconds);
  const timeStr = formatDuration(elapsedSeconds);
  const zone = getHeartRateZone(heartRate, 190); // Hardcoded Max HR
  const hrColor = getZoneColor(zone);

  return (
    <View className="flex-row items-center justify-between bg-athledia-card border border-athledia-slate/20 rounded-3xl p-5 shadow-xl mx-6 absolute top-16 left-0 right-0 z-10">
      
      <View className="flex-1 items-center border-r border-athledia-slate/20">
        <Text className="text-athledia-slate text-xs font-bold uppercase tracking-widest mb-1">Ritmo</Text>
        <Text className="text-athledia-dark text-3xl font-black font-serif">{paceStr.split('/')[0]}</Text>
        <Text className="text-athledia-slate text-xs font-medium">/km</Text>
      </View>

      <View className="flex-[1.2] items-center border-r border-athledia-slate/20">
        <Text className="text-athledia-slate text-xs font-bold uppercase tracking-widest mb-1">Distância</Text>
        <Text className="text-athledia-dark text-4xl font-black font-serif">{distanceKm.toFixed(2)}</Text>
        <Text className="text-athledia-slate text-xs font-medium">km</Text>
      </View>

      <View className="flex-1 items-center pb-2 pt-1 border-r border-athledia-slate/20">
        <Text className="text-athledia-slate text-xs font-bold uppercase tracking-widest mb-1">Tempo</Text>
        <Text className="text-athledia-dark text-xl font-bold font-mono tracking-tighter tabular-nums">{timeStr}</Text>
      </View>

      <View className="flex-1 items-center pb-2 pt-1">
        <Text className="text-athledia-slate text-xs font-bold uppercase tracking-widest mb-1">BPM</Text>
        <View className="flex-row items-baseline gap-1">
          <Text className="text-athledia-dark text-xl font-bold font-mono tabular-nums">{heartRate}</Text>
          <View className="w-2 h-2 rounded-full" style={{ backgroundColor: hrColor }} />
        </View>
        <Text className="text-athledia-slate text-[10px] font-bold mt-1 uppercase" style={{ color: hrColor }}>Zone {zone.replace('Z', '')}</Text>
      </View>
      
    </View>
  );
}
