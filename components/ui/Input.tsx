import { forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { cn } from './Button';
import { Eye, EyeOff } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, leftIcon, className, secureTextEntry, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = secureTextEntry !== undefined;

    return (
      <View className="w-full flex-col gap-1">
        {label && (
          <Text className="text-athledia-slate text-sm font-bold ml-1 uppercase tracking-wider mb-1">
            {label}
          </Text>
        )}
        <View
          className={cn(
            'flex-row items-center w-full h-14 bg-athledia-card border rounded-xl px-4 transition-colors',
            isFocused ? 'border-athledia-dark shadow-sm' : 'border-athledia-slate/20',
            error && 'border-red-500',
            className
          )}
        >
          {leftIcon && <View className="mr-3">{leftIcon}</View>}
          <TextInput
            ref={ref}
            className="flex-1 text-athledia-dark text-base h-full font-medium"
            placeholderTextColor="#868E96" // athledia-lightSlate
            secureTextEntry={isPassword && !isPasswordVisible}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="p-1 -mr-2"
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color="#71717a" />
              ) : (
                <Eye size={20} color="#71717a" />
              )}
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
