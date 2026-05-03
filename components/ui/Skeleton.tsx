import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { cn } from './Button';
import { useThemeColors } from '../../lib/tokens';

interface SkeletonProps { className?: string; }

export function Skeleton({ className }: SkeletonProps) {
  const opacity = useSharedValue(0.3);
  const t = useThemeColors();

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ), -1, true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[animatedStyle, { backgroundColor: t.surfaceAlt }]}
      className={cn('rounded-xl', className)}
    />
  );
}
