export function calcPace(distanceKm: number, seconds: number): string {
  if (distanceKm === 0 || seconds === 0) return "0:00/km";
  
  const minutes = seconds / 60;
  const paceTotalMinutes = minutes / distanceKm;
  
  const paceMin = Math.floor(paceTotalMinutes);
  const paceSec = Math.floor((paceTotalMinutes - paceMin) * 60);
  
  return `${paceMin}:${paceSec.toString().padStart(2, '0')}/km`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
