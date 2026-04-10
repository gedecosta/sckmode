import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTrackingStore } from '../../stores/trackingStore';

// Light theme map style matching the clean #E5E5E5 UI (Silver/Minimalist)
const minimalistLightStyle = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#616161"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#f5f5f5"}]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#bdbdbd"}]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#eeeeee"}]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#757575"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#e5e5e5"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#757575"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{"color": "#dadada"}]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#9e9e9e"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#c9c9c9"}]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#9e9e9e"}]
  }
];

export function LiveMap() {
  const mapRef = useRef<MapView>(null);
  const { locations } = useTrackingStore();
  const [initialRegion, setInitialRegion] = useState<any>(null);
  const [locationError, setLocationError] = useState(false);

  const coordinates = locations.map(loc => ({
    latitude: loc.latitude,
    longitude: loc.longitude,
  }));

  const currentPos = coordinates.length > 0 ? coordinates[coordinates.length - 1] : null;

  // On mount, locate user and set initial map region if no tracking history exists
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError(true);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        // We only set the initial region. If tracking is active, the regular effect below takes over.
        if (coordinates.length === 0) {
          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      } catch (e) {
        console.log('Error getting initial location', e);
        // Fallback to a default if location is completely disabled but permission granted
        setInitialRegion({
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    })();
  }, []);

  // Follow user while tracking
  useEffect(() => {
    if (currentPos && mapRef.current) {
      mapRef.current.animateCamera({
        center: currentPos,
        zoom: 18,
        pitch: 45,
      });
    }
  }, [currentPos]);

  if (locationError) {
    return (
      <View style={{ flex: 1, backgroundColor: '#E5E5E5', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Text style={{ textAlign: 'center', color: '#1F2328', fontSize: 16, fontWeight: '700' }}>
          Permissão de localização negada. O mapa precisa de acesso ao GPS para funcionar.
        </Text>
      </View>
    );
  }

  if (!initialRegion && coordinates.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#E5E5E5', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#1F2328" />
        <Text style={{ color: '#868E96', marginTop: 12, fontWeight: '600' }}>Localizando satélites...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={minimalistLightStyle}
        showsUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={false}
        initialRegion={coordinates.length > 0 ? undefined : initialRegion}
      >
        {coordinates.length > 0 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#1F2328"
            strokeWidth={6}
            lineCap="round"
            lineJoin="round"
          />
        )}
      </MapView>
      
      {/* Overlay gradient bottom to make buttons readable */}
      <View 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          backgroundColor: 'rgba(229, 229, 229, 0.4)',
          pointerEvents: 'none',
        }} 
      />
    </View>
  );
}
