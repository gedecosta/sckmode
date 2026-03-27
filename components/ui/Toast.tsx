import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Info, CheckCircle, AlertOctagon } from 'lucide-react-native';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onHide: () => void;
}

export function Toast({ message, type = 'info', onHide }: ToastProps) {
  const translateY = useSharedValue(-100);

  useEffect(() => {
    translateY.value = withSpring(50, { damping: 15 });
    
    const timer = setTimeout(() => {
      translateY.value = withTiming(-100, { duration: 300 }, () => {
        // use runOnJS ? we can just call onHide after 300ms
      });
      setTimeout(onHide, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const bgColors = {
    success: 'bg-athledia-dark border border-athledia-slate/20',
    error: 'bg-red-900 border border-red-500/50',
    info: 'bg-athledia-card border border-athledia-slate/20',
  };

  const Icons = {
    success: <CheckCircle color="#FFFFFF" size={20} />,
    error: <AlertOctagon color="#FFFFFF" size={20} />,
    info: <Info color="#1F2328" size={20} />,
  };

  return (
    <Animated.View
      style={animatedStyle}
      className={`absolute top-0 left-6 right-6 z-50 flex-row items-center p-4 rounded-2xl shadow-xl ${bgColors[type]}`}
    >
      <View className="mr-3">{Icons[type]}</View>
      <Text className={`${type === 'info' ? 'text-athledia-dark' : 'text-white'} font-bold text-base flex-1 font-serif`}>
        {message}
      </Text>
    </Animated.View>
  );
}
