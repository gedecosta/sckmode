import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { PostCard } from '../../../components/feed/PostCard';
import { useFeed } from '../../../hooks/useFeed';
import { Layout } from 'lucide-react-native';

export default function FeedScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useFeed();

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View className="flex-1 bg-athledia-bg">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-12 pb-4 bg-athledia-bg border-b border-athledia-slate/10">
        <Layout size={28} color="#1F2328" />
        <Text className="text-athledia-dark text-4xl font-black font-serif uppercase tracking-tighter ml-3">Feed</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View className="h-4 bg-athledia-bg" />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#1F2328" className="my-6" />
          ) : null
        }
        ListEmptyComponent={
          status === 'pending' ? (
            <ActivityIndicator size="large" color="#1F2328" className="mt-10" />
          ) : null
        }
      />
    </View>
  );
}
