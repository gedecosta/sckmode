import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Map as MapIcon } from 'lucide-react-native';
import { useTrackingStore } from '../../stores/trackingStore';

const customMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#18181b"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#71717a"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#18181b"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#09090b"}]
  }
];

export function LiveMap() {
  const mapRef = useRef<MapView>(null);
  const { locations } = useTrackingStore();

  const coordinates = locations.map(loc => ({
    latitude: loc.latitude,
    longitude: loc.longitude,
  }));

  const currentPos = coordinates.length > 0 ? coordinates[coordinates.length - 1] : null;

  useEffect(() => {
    if (currentPos && mapRef.current) {
      mapRef.current.animateCamera({
        center: currentPos,
        zoom: 18,
        pitch: 45,
      });
    }
  }, [currentPos]);

  return (
    <View className="flex-1 bg-athledia-bg">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={customMapStyle}
        showsUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: -23.5505, // São Paulo SP mock
          longitude: -46.6333,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
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
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none bg-athledia-bg/20" 
      />
    </View>
  );
}
