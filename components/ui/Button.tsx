import { forwardRef } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      label,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'flex flex-row items-center justify-center rounded-xl active:opacity-80';
    
    const variantStyles = {
      primary: 'bg-athledia-dark',
      secondary: 'bg-athledia-slate',
      ghost: 'bg-transparent',
      danger: 'bg-red-500',
    };

    const sizeStyles = {
      sm: 'py-2 px-4',
      md: 'py-3 px-6 cursor-pointer',
      lg: 'py-4 px-8',
    };

    const textStyles = {
      primary: 'text-athledia-accent font-bold tracking-wide uppercase',
      secondary: 'text-athledia-bg font-bold',
      ghost: 'text-athledia-dark font-bold underline',
      danger: 'text-white font-semibold',
    };

    const isInteractionDisabled = disabled || isLoading;

    return (
      <TouchableOpacity
        ref={ref as any}
        activeOpacity={0.8}
        disabled={isInteractionDisabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isInteractionDisabled && 'opacity-50',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color={variant === 'ghost' ? '#818cf8' : '#fff'} />
        ) : (
          <Text className={cn('text-base', textStyles[variant])}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
