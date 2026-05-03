import React from 'react';
import { Text, TextProps, Platform } from 'react-native';

type Weight = 'regular' | 'medium' | 'bold';

interface Props extends TextProps {
  children: React.ReactNode;
  weight?: Weight;
  tabular?: boolean;
}

const getFont = (weight: Weight) => {
  if (Platform.OS === 'web') return 'ui-monospace, Menlo, monospace';
  return Platform.OS === 'ios' ? (weight === 'bold' ? 'Menlo-Bold' : 'Menlo') : 'monospace';
};

export function Numeric({
  children, weight = 'bold', tabular = true, style, ...rest
}: Props) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: getFont(weight),
          fontVariant: tabular ? (['tabular-nums'] as any) : undefined,
          fontWeight: weight === 'bold' ? '700' : weight === 'medium' ? '500' : '400',
          letterSpacing: -0.2,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
