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
    <View className="bg-athledia-bg p-4 mb-4">
      
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

      {/* Metrics Bar */}
      <View className="flex-row items-center border border-athledia-slate/20 rounded-xl p-3 mb-4 space-x-4 bg-athledia-card">
        <View className="flex-1">
          <Text className="text-athledia-slate text-xs mb-1 font-bold uppercase tracking-wider">Distância</Text>
          <Text className="text-athledia-dark font-black font-serif text-lg">{post.distance}</Text>
        </View>
        <View className="w-[1px] h-full bg-athledia-slate/20" />
        <View className="flex-[1.5]">
          <Text className="text-athledia-slate text-xs mb-1 font-bold uppercase tracking-wider">Ritmo</Text>
          <Text className="text-athledia-dark font-black font-serif text-lg">{post.pace}</Text>
        </View>
        <View className="w-[1px] h-full bg-athledia-slate/20" />
        <View className="flex-1">
          <Text className="text-athledia-slate text-xs mb-1 font-bold uppercase tracking-wider">Tempo</Text>
          <Text className="text-athledia-dark font-black font-serif text-lg">{post.duration}</Text>
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row items-center justify-between mt-1">
        <View className="flex-row space-x-6">
          <Pressable onPress={handleLike} className="flex-row items-center">
            <AnimatedView style={animatedLikeStyle}>
              <Heart 
                size={24} 
                color={liked ? "#1F2328" : "#495057"} 
                fill={liked ? "#1F2328" : "transparent"} 
              />
            </AnimatedView>
            <Text className="text-athledia-slate ml-2 font-bold">{liked ? post.likes + 1 : post.likes}</Text>
          </Pressable>
          <TouchableOpacity className="flex-row items-center ml-6">
            <MessageCircle size={24} color="#495057" />
            <Text className="text-athledia-slate ml-2 font-bold">{post.comments}</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row space-x-4">
          <Pressable onPress={handleBookmark} className="mr-6">
            <AnimatedView style={animatedBookmarkStyle}>
              <Bookmark 
                size={24} 
                color={bookmarked ? "#1F2328" : "#495057"} 
                fill={bookmarked ? "#1F2328" : "transparent"} 
              />
            </AnimatedView>
          </Pressable>
          <Pressable onPress={handleShare}>
            <AnimatedView style={animatedShareStyle}>
              <Share2 size={24} color="#495057" />
            </AnimatedView>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
