import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Info, CheckCircle, AlertOctagon } from 'lucide-react-native';
import { useThemeColors } from '../../lib/tokens';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onHide: () => void;
}

export function Toast({ message, type = 'info', onHide }: ToastProps) {
  const translateY = useSharedValue(-100);
  const t = useThemeColors();

  useEffect(() => {
    translateY.value = withSpring(50, { damping: 15 });
    const timer = setTimeout(() => {
      translateY.value = withTiming(-100, { duration: 300 });
      setTimeout(onHide, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  const styleMap = {
    success: { bg: t.ribbonBg, fg: t.ribbonText, border: t.borderStrong, icon: <CheckCircle color={t.success} size={20} /> },
    error:   { bg: t.ribbonBg, fg: t.ribbonText, border: 'rgba(216,76,76,0.4)', icon: <AlertOctagon color={t.danger} size={20} /> },
    info:    { bg: t.surface,  fg: t.text,        border: t.border,              icon: <Info color={t.accentText} size={20} /> },
  }[type];

  return (
    <Animated.View
      style={[animatedStyle, {
        position: 'absolute', top: 0, left: 24, right: 24, zIndex: 50,
        flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16,
        backgroundColor: styleMap.bg, borderWidth: 1, borderColor: styleMap.border,
        shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 8,
      }]}
    >
      <View style={{ marginRight: 12 }}>{styleMap.icon}</View>
      <Text style={{
        fontFamily: 'RobotoSlab-Bold', fontSize: 14, flex: 1,
        color: styleMap.fg, letterSpacing: -0.2,
      }}>{message}</Text>
    </Animated.View>
  );
}
