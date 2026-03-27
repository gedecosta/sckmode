import { useEffect } from 'react';
import * as Location from 'expo-location';
import { useTrackingStore, ActivityStatus } from '../stores/trackingStore';

export function useTracking() {
  const { status, addLocationPoint, tickTimer, startTracking, pauseTracking, resumeTracking, finishTracking } = useTrackingStore();

  useEffect(() => {
    let timerInter: ReturnType<typeof setInterval> | null = null;
    let locationSub: any = null;

    const startLocationTracking = async () => {
      let { status: permissionStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (permissionStatus !== 'granted') {
        return;
      }

      locationSub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => {
          if (useTrackingStore.getState().status === 'running') {
            addLocationPoint({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              timestamp: loc.timestamp,
            });
          }
        }
      );
    };

    if (status === 'running') {
      timerInter = setInterval(tickTimer, 1000);
      startLocationTracking();
    } else if (status === 'paused' || status === 'finished') {
      if (timerInter) clearInterval(timerInter);
      if (locationSub) locationSub.remove();
    }

    return () => {
      if (timerInter) clearInterval(timerInter);
      if (locationSub) locationSub.remove();
    };
  }, [status]);

  return {
    status,
    startTracking,
    pauseTracking,
    resumeTracking,
    finishTracking,
  };
}
