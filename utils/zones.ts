export type HeartRateZone = 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5' | 'Rest';

export function getHeartRateZone(bpm: number, maxHR: number): HeartRateZone {
  if (!bpm || bpm < 50) return 'Rest';
  
  const percent = bpm / maxHR;

  if (percent >= 0.9) return 'Z5';
  if (percent >= 0.8) return 'Z4';
  if (percent >= 0.7) return 'Z3';
  if (percent >= 0.6) return 'Z2';
  return 'Z1';
}

export function getZoneColor(zone: HeartRateZone): string {
  switch (zone) {
    case 'Z5': return '#ef4444'; // red-500
    case 'Z4': return '#f97316'; // orange-500
    case 'Z3': return '#eab308'; // yellow-500
    case 'Z2': return '#22c55e'; // green-500
    case 'Z1': return '#64748b'; // slate-500
    default: return '#71717a'; // zinc-500
  }
}
