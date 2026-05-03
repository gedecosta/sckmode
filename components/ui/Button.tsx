import { forwardRef } from 'react';
import { Text, Pressable, PressableProps, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useThemeColors } from '../../lib/tokens';
import { OrganicLoader } from './OrganicLoader';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      label, variant = 'primary', size = 'md',
      isLoading = false, disabled,
      leftIcon, rightIcon, className, ...props
    },
    ref
  ) => {
    const c = useThemeColors();
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

    const base = 'flex flex-row items-center justify-center rounded-xl gap-2';

    const variantStyles: Record<string, string> = {
      primary:   'bg-obsidian dark:bg-snow',
      accent:    'bg-glacier',
      secondary: 'bg-transparent border border-obsidian/15 dark:border-snow/15',
      ghost:     'bg-transparent',
      danger:    'bg-danger',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'py-2.5 px-4',
      md: 'py-4 px-6',
      lg: 'py-5 px-7',
    };

    const textColor: Record<string, string> = {
      primary:   'text-snow dark:text-obsidian',
      accent:    'text-[#041A2E]',
      secondary: 'text-obsidian dark:text-snow',
      ghost:     'text-obsidian dark:text-snow underline',
      danger:    'text-white',
    };

    const isDisabled = disabled || isLoading;
    const loaderTint: 'inverse' | 'accent' | 'mono' =
      variant === 'accent'  ? 'accent'  :
      variant === 'primary' ? 'inverse' : 'mono';

    return (
      <AnimatedPressable
        ref={ref as any}
        onPressIn={() => { scale.value = withSpring(0.97, { damping: 20, stiffness: 400 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 20, stiffness: 400 }); }}
        disabled={isDisabled}
        style={animatedStyle}
        className={cn(base, variantStyles[variant], sizeStyles[size], isDisabled && 'opacity-50', className)}
        {...props}
      >
        {isLoading ? (
          <OrganicLoader size={size === 'lg' ? 'md' : 'sm'} tint={loaderTint} />
        ) : (
          <>
            {leftIcon}
            <Text className={cn('text-sm font-bold tracking-wider uppercase', textColor[variant])}>
              {label}
            </Text>
            {rightIcon}
          </>
        )}
      </AnimatedPressable>
    );
  }
);

Button.displayName = 'Button';
