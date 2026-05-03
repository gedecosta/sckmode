import React from 'react';
import { View } from 'react-native';
import { useTrackingStore } from '../../stores/trackingStore';
import { calcPace, formatDuration } from '../../utils/pace';
import { getHeartRateZone, getZoneColor } from '../../utils/zones';
import { MetricRibbon } from '../ui/MetricRibbon';

export function MetricBar() {
  const { distanceKm, elapsedSeconds, heartRate } = useTrackingStore();

  const paceStr = calcPace(distanceKm, elapsedSeconds);
  const timeStr = formatDuration(elapsedSeconds);
  const zone = getHeartRateZone(heartRate, 190);
  const hrColor = getZoneColor(zone);

  return (
    <View className="absolute top-[120px] left-5 right-5 z-10">
      <MetricRibbon
        floating
        metrics={[
          { label: 'Pace',  value: paceStr.split('/')[0], unit: '/km' },
          { label: 'Dist',  value: distanceKm.toFixed(2), unit: 'km', emph: true },
          { label: 'Time',  value: timeStr },
          { label: `BPM · Z${zone.replace('Z', '')}`, value: String(heartRate), color: hrColor },
        ]}
      />
    </View>
  );
}
