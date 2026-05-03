import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ExternalLink, X } from 'lucide-react-native';
import { useThemeColors } from '../../lib/tokens';

export interface AdSlotProps {
  variant?: 'native-feed' | 'banner' | 'creator';
  advertiser: string;
  headline: string;
  blurb?: string;
  cta?: string;
  imageUri?: string;
  onPress?: () => void;
  onDismiss?: () => void;
}

export function AdSlot({
  variant = 'native-feed',
  advertiser, headline, blurb, cta = 'Explore',
  imageUri, onPress, onDismiss,
}: AdSlotProps) {
  const c = useThemeColors();

  if (variant === 'banner') {
    return (
      <Pressable
        onPress={onPress}
        className="mx-5 mb-4 rounded-xl overflow-hidden flex-row items-center p-4"
        style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
      >
        <View className="flex-1">
          <Text
            className="text-[9px] font-bold uppercase mb-1"
            style={{ color: c.textDim, letterSpacing: 1.5, fontFamily: 'Menlo' }}
          >
            Sponsored · {advertiser}
          </Text>
          <Text
            className="text-sm font-bold"
            style={{ color: c.text, fontFamily: 'RobotoSlab-Bold' }}
            numberOfLines={2}
          >
            {headline}
          </Text>
        </View>
        <ExternalLink size={16} color={c.textDim} />
      </Pressable>
    );
  }

  if (variant === 'creator') {
    return (
      <Pressable
        onPress={onPress}
        className="mx-5 mb-4 rounded-2xl p-5"
        style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
      >
        <Text
          className="text-[10px] font-bold uppercase mb-2"
          style={{ color: c.accentText, letterSpacing: 1.6, fontFamily: 'Menlo' }}
        >
          · Plano de {advertiser}
        </Text>
        <Text
          className="text-xl mb-2"
          style={{ color: c.text, fontFamily: 'RobotoSlab-Black', letterSpacing: -0.5 }}
        >
          {headline}
        </Text>
        {blurb && (
          <Text className="text-sm mb-3" style={{ color: c.textMuted, lineHeight: 20 }}>
            {blurb}
          </Text>
        )}
        <Text
          className="text-xs font-bold uppercase"
          style={{ color: c.accentText, letterSpacing: 1.6 }}
        >
          {cta} →
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      className="mx-5 mb-3 rounded-2xl overflow-hidden"
      style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
    >
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <View className="flex-row items-center gap-2">
          <View
            className="px-2 py-0.5 rounded"
            style={{ backgroundColor: c.sponsorBg }}
          >
            <Text
              className="text-[9px] font-bold uppercase"
              style={{ color: c.sponsorText, letterSpacing: 1.5, fontFamily: 'Menlo' }}
            >
              Sponsored
            </Text>
          </View>
          <Text className="text-[11px]" style={{ color: c.textMuted }}>
            {advertiser}
          </Text>
        </View>
        {onDismiss && (
          <Pressable onPress={onDismiss} hitSlop={12}>
            <X size={16} color={c.textDim} />
          </Pressable>
        )}
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-44"
          style={{ backgroundColor: c.surfaceAlt }}
        />
      )}

      <Pressable onPress={onPress} className="px-4 pt-3 pb-4">
        <Text
          className="text-base mb-1"
          style={{ color: c.text, fontFamily: 'RobotoSlab-Black', letterSpacing: -0.4, lineHeight: 22 }}
        >
          {headline}
        </Text>
        {blurb && (
          <Text className="text-sm mb-3" style={{ color: c.textMuted, lineHeight: 19 }}>
            {blurb}
          </Text>
        )}
        <View className="flex-row justify-between items-center mt-2">
          <Text
            className="text-xs font-bold uppercase"
            style={{ color: c.accentText, letterSpacing: 1.6 }}
          >
            {cta} →
          </Text>
          <Text
            className="text-[9px] font-bold uppercase"
            style={{ color: c.textDim, letterSpacing: 1.5, fontFamily: 'Menlo' }}
          >
            Ad
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
