import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { Post } from '../../hooks/useFeed';

interface PostCardProps {
  post: Post;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  const likeScale = useSharedValue(1);
  const bookmarkScale = useSharedValue(1);
  const shareScale = useSharedValue(1);

  const animatedLikeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const animatedBookmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bookmarkScale.value }],
  }));

  const animatedShareStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shareScale.value }],
  }));

  const handleLike = () => {
    setLiked(!liked);
    likeScale.value = withSequence(
      withSpring(1.5, { damping: 10, stiffness: 100 }),
      withSpring(1, { damping: 10, stiffness: 100 })
    );
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    bookmarkScale.value = withSequence(
      withSpring(1.3, { damping: 10, stiffness: 100 }),
      withSpring(1, { damping: 10, stiffness: 100 })
    );
  };

  const handleShare = () => {
    shareScale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 100 })
    );
    // Logic for sharing would go here
  };

  return (
    <View className="bg-athledia-card p-5 mb-4 border-y border-athledia-slate/10 shadow-sm">
      
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Image 
          source={{ uri: post.user.avatar }} 
          className="w-10 h-10 rounded-full bg-athledia-slate/20"
        />
        <View className="ml-3 flex-1">
          <Text className="text-athledia-dark text-base font-black font-serif uppercase tracking-tight">{post.user.name}</Text>
          <Text className="text-athledia-slate text-xs font-medium">{post.timeAgo} • {post.sport}</Text>
        </View>
      </View>

      {/* Media (Optional) */}
      {post.image && (
        <Image 
          source={{ uri: post.image }} 
          className="w-full h-64 rounded-xl mb-3 bg-athledia-slate/20"
        />
      )}

      {/* Metrics Bar - Brutalist Ribbon */}
      <View className="flex-row items-center bg-athledia-dark rounded-2xl p-4 mb-4 shadow-md">
        <View className="flex-1 items-center">
          <Text className="text-athledia-slate text-[10px] mb-1 font-black uppercase tracking-widest opacity-80">Km</Text>
          <Text className="text-white font-black font-serif text-2xl tracking-tighter">{post.distance}</Text>
        </View>
        <View className="w-[1.5px] h-10 bg-[#D4A640]/30 mx-2" />
        <View className="flex-[1.5] items-center">
          <Text className="text-athledia-slate text-[10px] mb-1 font-black uppercase tracking-widest opacity-80">Pace</Text>
          <Text className="text-white font-black font-serif text-2xl tracking-tighter">{post.pace}</Text>
        </View>
        <View className="w-[1.5px] h-10 bg-[#D4A640]/30 mx-2" />
        <View className="flex-1 items-center">
          <Text className="text-athledia-slate text-[10px] mb-1 font-black uppercase tracking-widest opacity-80">Time</Text>
          <Text className="text-white font-black font-serif text-2xl tracking-tighter">{post.duration}</Text>
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row items-center justify-between mt-1">
        <View className="flex-row items-center space-x-6">
          <Pressable onPress={handleLike} className="flex-row items-center">
            <AnimatedView style={animatedLikeStyle}>
              <Heart 
                size={22} 
                color={liked ? "#1F2328" : "#868E96"} 
                fill={liked ? "#1F2328" : "transparent"} 
              />
            </AnimatedView>
            <Text className="text-athledia-slate ml-2 font-bold text-sm tracking-tight">{liked ? post.likes + 1 : post.likes}</Text>
          </Pressable>
          <TouchableOpacity className="flex-row items-center ml-2">
            <MessageCircle size={22} color="#868E96" />
            <Text className="text-athledia-slate ml-2 font-bold text-sm tracking-tight">{post.comments}</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4">
          <Pressable onPress={handleBookmark}>
            <AnimatedView style={animatedBookmarkStyle}>
              <Bookmark 
                size={22} 
                color={bookmarked ? "#1F2328" : "#868E96"} 
                fill={bookmarked ? "#1F2328" : "transparent"} 
              />
            </AnimatedView>
          </Pressable>
          <Pressable onPress={handleShare}>
            <AnimatedView style={animatedShareStyle}>
              <Share2 size={22} color="#868E96" />
            </AnimatedView>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
