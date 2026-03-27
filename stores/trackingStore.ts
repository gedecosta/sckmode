import { create } from 'zustand';
import * as Location from 'expo-location';

export type ActivityStatus = 'idle' | 'running' | 'paused' | 'finished';

interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface TrackingState {
  status: ActivityStatus;
  locations: LocationPoint[];
  distanceKm: number;
  elapsedSeconds: number;
  currentPace: string;
  heartRate: number; // Mock reading from imagined bluetooth device
  
  startTracking: () => void;
  pauseTracking: () => void;
  resumeTracking: () => void;
  finishTracking: () => void;
  addLocationPoint: (loc: LocationPoint) => void;
  tickTimer: () => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  status: 'idle',
  locations: [],
  distanceKm: 0,
  elapsedSeconds: 0,
  currentPace: '0:00/km',
  heartRate: 75,
  
  startTracking: () => set({ status: 'running', locations: [], distanceKm: 0, elapsedSeconds: 0 }),
  pauseTracking: () => set({ status: 'paused' }),
  resumeTracking: () => set({ status: 'running' }),
  finishTracking: () => set({ status: 'finished' }),
  
  addLocationPoint: (loc) => 
    set((state) => {
      // Mock simple distance sum for demo. Haversine should be used here.
      const newLocations = [...state.locations, loc];
      const addedDist = state.locations.length > 0 ? 0.005 : 0; // Fake distance of 50m per ping
      
      return { 
        locations: newLocations,
        distanceKm: state.distanceKm + addedDist,
        heartRate: Math.floor(Math.random() * (165 - 120 + 1) + 120) // Mock HR change
      };
    }),
    
  tickTimer: () => 
    set((state) => ({ 
      elapsedSeconds: state.elapsedSeconds + 1 
    })),
}));
