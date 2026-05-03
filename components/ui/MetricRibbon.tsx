import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { useThemeColors } from '../../lib/tokens';

export interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  emph?: boolean;
  color?: string;
}

interface MetricRibbonProps {
  metrics: Metric[];
  floating?: boolean;
  style?: ViewStyle;
}

export function MetricRibbon({ metrics, floating = false, style }: MetricRibbonProps) {
  const c = useThemeColors();

  return (
    <View
      className="flex-row items-stretch rounded-2xl px-3 py-3.5"
      style={[
        { backgroundColor: c.ribbonBg },
        floating && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
          elevation: 8,
        },
        style,
      ]}
    >
      {metrics.map((m, i) => (
        <React.Fragment key={`${m.label}-${i}`}>
          <View
            className="items-center justify-center"
            style={{ flex: m.emph ? 1.3 : 1 }}
          >
            <Text
              className="mb-1 font-bold uppercase"
              style={{
                color: c.ribbonMuted,
                fontSize: 10,
                letterSpacing: 1.6,
                fontFamily: 'Menlo',
              }}
            >
              {m.label}
            </Text>
            <Text
              style={{
                color: m.color ?? (m.emph ? c.ribbonAccent : c.ribbonText),
                fontSize: m.emph ? 26 : 20,
                fontFamily: 'Menlo',
                fontWeight: '700',
                letterSpacing: -0.5,
              }}
            >
              {m.value}
            </Text>
            {m.unit && (
              <Text
                className="mt-0.5 uppercase"
                style={{
                  color: c.ribbonMuted,
                  fontSize: 9,
                  letterSpacing: 1.2,
                  fontFamily: 'Menlo',
                }}
              >
                {m.unit}
              </Text>
            )}
          </View>
          {i < metrics.length - 1 && (
            <View style={{ width: 1, backgroundColor: c.ribbonDivider, marginVertical: 4 }} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
