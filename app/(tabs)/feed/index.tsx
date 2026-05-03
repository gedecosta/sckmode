import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PostCard } from '../../../components/feed/PostCard';
import { PostCardSkeleton } from '../../../components/feed/PostCardSkeleton';
import { PaginatedFooter } from '../../../components/ui/PaginatedFooter';
import { EmptyState } from '../../../components/ui/EmptyState';
import { FeedFilterTabs, type FeedMode } from '../../../components/feed/FeedFilterTabs';
import { AdSlot } from '../../../components/ui/AdSlot';
import { NoiseBackground } from '../../../components/ui/NoiseBackground';
import { useFeed, type Post } from '../../../hooks/useFeed';
import { useSocialStore } from '../../../stores/socialStore';
import { useScreenTracking } from '../../../hooks/useScreenTracking';
import { useThemeColors } from '../../../lib/tokens';
import { Search, UserPlus, Layout } from 'lucide-react-native';

const SPONSORED_ADS = [
  {
    advertiser: "Arc'teryx",
    headline: 'Built for altitude. Tested in silence.',
    blurb: 'O novo Beta AR chegou — 20% mais leve, mesma proteção contra tempestades.',
    cta: 'Explorar',
  },
  {
    advertiser: 'Garmin',
    headline: 'Cada batida. Cada metro. Sem margem.',
    blurb: 'Forerunner 965 — GPS multibanda + mapas em cores AMOLED.',
    cta: 'Ver detalhes',
  },
];

type FeedItem =
  | { kind: 'post'; post: Post; key: string }
  | { kind: 'ad'; ad: typeof SPONSORED_ADS[number]; key: string };

export default function FeedScreen() {
  useScreenTracking('Feed');
  const router = useRouter();
  const c = useThemeColors();
  const [feedMode, setFeedMode] = useState<FeedMode>('all');

  const following = useSocialStore((s) => s.following);
  const followingIds = useMemo(() => Array.from(following.keys()), [following]);
  const followingCount = followingIds.length;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch, isRefetching } =
    useFeed({ mode: feedMode, followingIds });

  const posts = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const items: FeedItem[] = useMemo(() => {
    const result: FeedItem[] = [];
    posts.forEach((p, i) => {
      result.push({ kind: 'post', post: p, key: p.id });
      if ((i + 1) % 5 === 0 && SPONSORED_ADS.length > 0) {
        const ad = SPONSORED_ADS[Math.floor(i / 5) % SPONSORED_ADS.length];
        result.push({ kind: 'ad', ad, key: `ad-${i}` });
      }
    });
    return result;
  }, [posts]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => { refetch(); }, [refetch]);

  const renderItem = useCallback(({ item }: { item: FeedItem }) =>
    item.kind === 'post'
      ? <PostCard post={item.post} />
      : <AdSlot variant="native-feed" {...item.ad} />,
  []);

  const emptyFollowing = feedMode === 'following' && followingCount === 0;

  return (
    <View className="flex-1">
      <NoiseBackground />

      {/* Editorial header */}
      <View className="flex-row items-center justify-between px-6 pt-[52px] pb-4">
        <View>
          <Text
            className="text-[10px] uppercase mb-1"
            style={{ color: c.textMuted, letterSpacing: 2, fontFamily: 'Menlo' }}
          >
            N 23°32′ · ATHLEDIA · ELEV 1247
          </Text>
          <Text
            style={{ color: c.text, fontSize: 40, fontFamily: 'RobotoSlab-Black', letterSpacing: -1.5, lineHeight: 40 }}
          >
            Feed
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/search')}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Buscar"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={{
            padding: 10, backgroundColor: c.surface, borderRadius: 12, borderWidth: 1, borderColor: c.border,
          }}
        >
          <Search size={20} color={c.text} strokeWidth={1.75} />
        </TouchableOpacity>
      </View>

      <View className="pt-1 pb-2">
        <FeedFilterTabs
          active={feedMode}
          onChange={setFeedMode}
          followingCount={followingCount}
        />
      </View>

      <FlatList
        data={emptyFollowing ? [] : items}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={handleRefresh}
            tintColor={c.text}
            colors={[c.accentText]}
          />
        }
        ListFooterComponent={
          posts.length > 0 && !emptyFollowing ? (
            <PaginatedFooter
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
            />
          ) : null
        }
        ListEmptyComponent={
          emptyFollowing ? (
            <EmptyState
              icon={UserPlus}
              title="Siga atletas"
              description="Você ainda não segue ninguém. Descubra atletas e acompanhe seus treinos!"
              actionLabel="Descobrir Atletas"
              onAction={() => router.push('/(tabs)/profile/discover' as any)}
            />
          ) : status === 'pending' ? (
            <View>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </View>
          ) : (
            <EmptyState
              icon={Layout}
              title="Nenhuma atividade"
              description={
                feedMode === 'following'
                  ? 'As pessoas que você segue ainda não postaram nada. Volte depois!'
                  : 'Seu feed está vazio. Comece a seguir atletas ou registre seu primeiro treino!'
              }
            />
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
