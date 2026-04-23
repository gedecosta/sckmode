import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { logger } from '../lib/logger';

export interface LocationPoint {
  latitude: number;
  longitude: number;
  altitude: number | null;
  speed: number | null; // m/s
  timestamp: number;
}

export interface LocationTrackingState {
  hasPermission: boolean | null; // null = not yet checked
  isTracking: boolean;
  currentLocation: LocationPoint | null;
  error: string | null;
}

export interface UseLocationTrackingReturn extends LocationTrackingState {
  requestPermission: () => Promise<boolean>;
  startTracking: (onLocation: (point: LocationPoint) => void) => Promise<void>;
  stopTracking: () => void;
}

/**
 * Wrapper sobre expo-location para rastreamento GPS contínuo.
 * Gerencia permissões, subscription lifecycle e cleanup automático.
 *
 * @example
 * const { hasPermission, requestPermission, startTracking, stopTracking } = useLocationTracking();
 */
export function useLocationTracking(): UseLocationTrackingReturn {
  const [state, setState] = useState<LocationTrackingState>({
    hasPermission: null,
    isTracking: false,
    currentLocation: null,
    error: null,
  });

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      subscriptionRef.current?.remove();
    };
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setState((prev) => ({ ...prev, hasPermission: granted }));
      return granted;
    } catch (err) {
      logger.error('Failed to request location permission', err, 'useLocationTracking');
      setState((prev) => ({ ...prev, hasPermission: false, error: 'Não foi possível acessar a localização.' }));
      return false;
    }
  };

  const startTracking = async (onLocation: (point: LocationPoint) => void) => {
    // Stop any existing subscription
    subscriptionRef.current?.remove();

    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        setState((prev) => ({ ...prev, error: 'Permissão de localização negada.' }));
        return;
      }
    }

    setState((prev) => ({ ...prev, isTracking: true, error: null }));

    try {
      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 5, // metros
        },
        (loc) => {
          const point: LocationPoint = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            altitude: loc.coords.altitude,
            speed: loc.coords.speed,
            timestamp: loc.timestamp,
          };
          setState((prev) => ({ ...prev, currentLocation: point }));
          onLocation(point);
        }
      );
    } catch (err) {
      logger.error('Failed to start location tracking', err, 'useLocationTracking');
      setState((prev) => ({
        ...prev,
        isTracking: false,
        error: 'Erro ao iniciar rastreamento GPS.',
      }));
    }
  };

  const stopTracking = () => {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    setState((prev) => ({ ...prev, isTracking: false }));
  };

  return {
    ...state,
    requestPermission,
    startTracking,
    stopTracking,
  };
}
