import React from 'react';
import { View, Text } from 'react-native';
import { Map as MapIcon } from 'lucide-react-native';
import { useThemeColors } from '../../lib/tokens';

export function LiveMap() {
  const t = useThemeColors();
  return (
    <View style={{ flex: 1, backgroundColor: t.surface, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <View style={{
        padding: 28, borderRadius: 999, marginBottom: 22,
        backgroundColor: t.surfaceAlt, borderWidth: 1, borderColor: t.border,
      }}>
        <MapIcon size={44} color={t.textMuted} strokeWidth={1.5} />
      </View>
      <Text style={{
        fontFamily: 'RobotoSlab-Black', fontSize: 20, letterSpacing: -0.5,
        color: t.text, textAlign: 'center',
      }}>Mapa indisponível na web</Text>
      <Text style={{
        fontFamily: 'System', fontSize: 13, color: t.textMuted,
        marginTop: 12, lineHeight: 19, textAlign: 'center', maxWidth: 280,
      }}>
        O rastreamento GPS e o mapa interativo estão otimizados para a experiência no seu celular Athledia.
      </Text>
    </View>
  );
}
