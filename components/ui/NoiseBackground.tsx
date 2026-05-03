import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Filter, FeTurbulence, Rect, RadialGradient, Stop } from 'react-native-svg';
import { useThemeColors } from '../../lib/tokens';

export function NoiseBackground({ halo = true }: { halo?: boolean }) {
  const c = useThemeColors();
  const { width, height } = Dimensions.get('window');

  return (
    <View
      style={[StyleSheet.absoluteFillObject, { backgroundColor: c.bg, pointerEvents: 'none' }]}
    >
      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        <Defs>
          <Filter id="noise">
            <FeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
          </Filter>
          {halo && (
            <RadialGradient id="halo" cx="85%" cy="8%" r="55%">
              <Stop offset="0%" stopColor={c.accent} stopOpacity={0.1} />
              <Stop offset="100%" stopColor={c.accent} stopOpacity={0} />
            </RadialGradient>
          )}
        </Defs>

        {halo && <Rect width="100%" height="100%" fill="url(#halo)" />}
        <Rect width="100%" height="100%" filter="url(#noise)" opacity={0.03} />
      </Svg>
    </View>
  );
}
