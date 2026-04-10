import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Rect, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// A simple reusable flat-bottomed cloud component
const CloudShape = ({ x, y, scale = 1, opacity = 0.1, color = "#1e293b" }: { x: number, y: number, scale?: number, opacity?: number, color?: string }) => (
  <G transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
    <Circle cx="40" cy="40" r="20" fill={color} />
    <Circle cx="65" cy="30" r="25" fill={color} />
    <Circle cx="95" cy="40" r="20" fill={color} />
    {/* Base rectangle to make the bottom flat */}
    <Rect x="40" y="30" width="55" height="30" fill={color} />
  </G>
);

export function CloudBackground() {
  return (
    <View style={[StyleSheet.absoluteFillObject, { pointerEvents: 'none' }]} className="overflow-hidden bg-athledia-bg">
      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        {/* Top left clouds */}
        <CloudShape x={-30} y={-20} scale={2} opacity={0.05} color="#475569" />
        <CloudShape x={20} y={50} scale={1.5} opacity={0.08} color="#1e293b" />
        
        {/* Top right clouds */}
        <CloudShape x={width - 150} y={10} scale={1.8} opacity={0.04} color="#64748b" />
        <CloudShape x={width - 80} y={80} scale={1.2} opacity={0.07} color="#0f172a" />
        
        {/* Middle clouds scattered */}
        <CloudShape x={-50} y={height * 0.3} scale={2.5} opacity={0.03} color="#475569" />
        <CloudShape x={width - 100} y={height * 0.4} scale={1.5} opacity={0.05} color="#334155" />
        <CloudShape x={width * 0.2} y={height * 0.6} scale={2.2} opacity={0.04} color="#0f172a" />
        
        {/* Bottom clouds */}
        <CloudShape x={-20} y={height - 200} scale={1.6} opacity={0.06} color="#64748b" />
        <CloudShape x={width - 200} y={height - 150} scale={2} opacity={0.05} color="#1e293b" />
      </Svg>
    </View>
  );
}
