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
    <View className="flex-row items-center justify-between bg-athledia-dark rounded-[24px] p-5 shadow-xl mx-6 absolute top-[120px] left-0 right-0 z-10 border border-white/10">
      
      <View className="flex-1 items-center border-r border-white/10">
        <Text className="text-athledia-slate text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Pace</Text>
        <Text className="text-white text-xl font-black font-serif">{paceStr.split('/')[0]}</Text>
        <Text className="text-athledia-slate text-[8px] font-black uppercase opacity-60">/km</Text>
      </View>

      <View className="flex-[1.2] items-center border-r border-white/10">
        <Text className="text-athledia-slate text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Dist</Text>
        <Text className="text-white text-3xl font-black font-serif tracking-tighter">{distanceKm.toFixed(2)}</Text>
        <Text className="text-athledia-slate text-[8px] font-black uppercase opacity-60">km</Text>
      </View>

      <View className="flex-1 items-center border-r border-white/10">
        <Text className="text-athledia-slate text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Time</Text>
        <Text className="text-white text-lg font-black font-mono tracking-tighter tabular-nums leading-6">{timeStr}</Text>
      </View>

      <View className="flex-1 items-center">
        <Text className="text-athledia-slate text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">BPM</Text>
        <View className="flex-row items-baseline gap-1">
          <Text className="text-white text-lg font-black font-mono tabular-nums leading-6">{heartRate}</Text>
          <View className="w-1.5 h-1.5 rounded-full mb-1" style={{ backgroundColor: hrColor }} />
        </View>
        <Text className="text-[7px] font-black mt-1 uppercase" style={{ color: hrColor }}>Z{zone.replace('Z', '')}</Text>
      </View>
      
    </View>
  );
}
