import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing,
} from 'react-native-reanimated';
import { useThemeColors } from '../../lib/tokens';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  tint?: 'accent' | 'mono' | 'inverse';
}

const DIMS = {
  sm: { wrap: 24, orb: 6, orbit: 8 },
  md: { wrap: 40, orb: 9, orbit: 13 },
  lg: { wrap: 64, orb: 14, orbit: 20 },
};

export function OrganicLoader({ size = 'md', tint = 'accent' }: Props) {
  const t = useThemeColors();
  const dim = DIMS[size];

  const color =
    tint === 'accent' ? t.accent :
    tint === 'inverse' ? t.bg :
    t.text;

  const breathe = useSharedValue(0);
  const drift = useSharedValue(0);

  useEffect(() => {
    breathe.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
    drift.value = withRepeat(
      withTiming(1, { duration: 4800, easing: Easing.inOut(Easing.cubic) }),
      -1, false
    );
  }, []);

  const makeOrb = (phase: 0 | 1 | 2) => {
    return useAnimatedStyle(() => {
      const phaseShift = (breathe.value + phase * 0.33) % 1;
      const eased = Math.sin(phaseShift * Math.PI);
      const scale = 0.55 + eased * 0.55;
      const opacity = 0.35 + eased * 0.65;

      const angle = drift.value * Math.PI * 2 + phase * ((Math.PI * 2) / 3);
      const tx = Math.cos(angle) * dim.orbit * 0.12;
      const ty = Math.sin(angle) * dim.orbit * 0.12;

      return {
        transform: [{ translateX: tx }, { translateY: ty }, { scale }],
        opacity,
      };
    });
  };

  const s1 = makeOrb(0);
  const s2 = makeOrb(1);
  const s3 = makeOrb(2);

  const orbBase = {
    position: 'absolute' as const,
    width: dim.orb,
    height: dim.orb,
    borderRadius: dim.orb / 2,
    backgroundColor: color,
  };

  const cx = dim.wrap / 2;
  const triPositions = [
    { left: cx - dim.orb / 2,                        top: cx - dim.orbit + dim.orb / 2 - dim.orb / 2 },
    { left: cx - dim.orb / 2 + dim.orbit * 0.86,     top: cx + dim.orbit * 0.5 - dim.orb / 2 },
    { left: cx - dim.orb / 2 - dim.orbit * 0.86,     top: cx + dim.orbit * 0.5 - dim.orb / 2 },
  ];

  return (
    <View style={{
      width: dim.wrap, height: dim.wrap,
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Animated.View style={[orbBase, triPositions[0], s1]} />
      <Animated.View style={[orbBase, triPositions[1], s2]} />
      <Animated.View style={[orbBase, triPositions[2], s3]} />
    </View>
  );
}
