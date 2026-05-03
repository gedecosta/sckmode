import { forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Eye, EyeOff } from 'lucide-react-native';
import { cn } from './Button';
import { useThemeColors } from '../../lib/tokens';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  mono?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, leftIcon, className, secureTextEntry, mono, ...props }, ref) => {
    const c = useThemeColors();
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const isPassword = secureTextEntry !== undefined;

    return (
      <View className="w-full flex-col gap-1">
        {label && (
          <Text
            className="text-[11px] font-bold uppercase ml-1 mb-1.5"
            style={{ color: c.textMuted, letterSpacing: 1.6, fontFamily: 'Menlo' }}
          >
            {label}
          </Text>
        )}
        <View
          className={cn(
            'flex-row items-center w-full h-14 rounded-xl px-4 border',
            className
          )}
          style={{
            backgroundColor: c.surface,
            borderColor: error ? c.danger : focused ? c.accentText : c.border,
            borderWidth: focused || error ? 1.5 : 1,
          }}
        >
          {leftIcon && <View className="mr-3">{leftIcon}</View>}
          <TextInput
            ref={ref}
            className="flex-1 text-base h-full font-medium"
            style={{
              color: c.text,
              fontFamily: mono ? 'Menlo' : undefined,
            }}
            placeholderTextColor={c.textDim}
            secureTextEntry={isPassword && !visible}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity onPress={() => setVisible(!visible)} className="p-1 -mr-2">
              {visible ? <EyeOff size={20} color={c.textDim} /> : <Eye size={20} color={c.textDim} />}
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text className="text-xs mt-1 ml-1" style={{ color: c.danger }}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
