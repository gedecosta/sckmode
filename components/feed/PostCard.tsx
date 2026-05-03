import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming,
} from 'react-native-reanimated';
import { Post } from '../../hooks/useFeed';
import { MetricRibbon } from '../ui/MetricRibbon';
import { ActivityIcon, ActivityKind } from '../ui/ActivityIcon';
import { useThemeColors } from '../../lib/tokens';

function sportToKind(sport?: string): ActivityKind {
  const s = (sport || '').toLowerCase();
  if (s.includes('corr') || s.includes('run'))      return 'run';
  if (s.includes('cicl') || s.includes('bike'))     return 'cycle';
  if (s.includes('nat')  || s.includes('swim'))     return 'swim';
  if (s.includes('força')|| s.includes('strength')) return 'strength';
  if (s.includes('hiit') || s.includes('cardio'))   return 'hiit';
  if (s.includes('yoga'))                           return 'yoga';
  if (s.includes('trilha') || s.includes('trail'))  return 'trail';
  return 'run';
}

interface PostCardProps { post: Post; }

const AView = Animated.createAnimatedComponent(View);

export function PostCard({ post }: PostCardProps) {
  const c = useThemeColors();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const likeS = useSharedValue(1);
  const bookmarkS = useSharedValue(1);
  const shareS = useSharedValue(1);

  const likeStyle = useAnimatedStyle(() => ({ transform: [{ scale: likeS.value }] }));
  const bookmarkStyle = useAnimatedStyle(() => ({ transform: [{ scale: bookmarkS.value }] }));
  const shareStyle = useAnimatedStyle(() => ({ transform: [{ scale: shareS.value }] }));

  const bump = (sv: any, big = 1.5) => {
    sv.value = withSequence(
      withSpring(big, { damping: 10, stiffness: 120 }),
      withSpring(1, { damping: 10, stiffness: 120 })
    );
  };

  return (
    <View
      className="mx-5 mb-3 rounded-2xl overflow-hidden"
      style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
    >
      {/* Header */}
      <View className="flex-row items-center p-4">
        <Image
          source={{ uri: post.user.avatar }}
          className="w-10 h-10 rounded-full"
          style={{ backgroundColor: c.surfaceAlt }}
        />
        <View className="ml-3 flex-1">
          <Text className="text-sm font-bold" style={{ color: c.text, fontFamily: 'System' }}>
            {post.user.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <ActivityIcon
              kind={sportToKind(post.sport)}
              size={11}
              color={c.textDim}
              accent={c.accentText}
              strokeWidth={1.6}
            />
            <Text
              className="uppercase"
              style={{
                color: c.textDim, letterSpacing: 1.4, fontFamily: 'Menlo',
                fontSize: 10, marginLeft: 6,
              }}
            >
              {post.timeAgo} · {post.sport}
            </Text>
          </View>
        </View>
      </View>

      {post.image && (
        <Image
          source={{ uri: post.image }}
          className="w-full h-56"
          style={{ backgroundColor: c.surfaceAlt }}
        />
      )}

      <View className="p-4">
        <MetricRibbon
          metrics={[
            { label: 'Dist', value: post.distance, unit: 'km' },
            { label: 'Pace', value: post.pace, unit: '/km', emph: true },
            { label: 'Time', value: post.duration },
          ]}
        />
      </View>

      <View className="flex-row items-center justify-between px-4 pb-4">
        <View className="flex-row items-center gap-6">
          <Pressable
            onPress={() => { setLiked(!liked); bump(likeS); }}
            className="flex-row items-center gap-2"
          >
            <AView style={likeStyle}>
              <Heart
                size={20}
                color={liked ? c.accentText : c.textMuted}
                fill={liked ? c.accentText : 'transparent'}
                strokeWidth={1.75}
              />
            </AView>
            <Text className="text-xs font-medium" style={{ color: c.textMuted, fontFamily: 'Menlo' }}>
              {liked ? post.likes + 1 : post.likes}
            </Text>
          </Pressable>

          <Pressable className="flex-row items-center gap-2">
            <MessageCircle size={20} color={c.textMuted} strokeWidth={1.75} />
            <Text className="text-xs font-medium" style={{ color: c.textMuted, fontFamily: 'Menlo' }}>
              {post.comments}
            </Text>
          </Pressable>
        </View>

        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => { setBookmarked(!bookmarked); bump(bookmarkS, 1.3); }}>
            <AView style={bookmarkStyle}>
              <Bookmark
                size={20}
                color={bookmarked ? c.text : c.textMuted}
                fill={bookmarked ? c.text : 'transparent'}
                strokeWidth={1.75}
              />
            </AView>
          </Pressable>
          <Pressable onPress={() => { shareS.value = withSequence(withTiming(0.85, { duration: 100 }), withSpring(1)); }}>
            <AView style={shareStyle}>
              <Share2 size={20} color={c.textMuted} strokeWidth={1.75} />
            </AView>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
