import { useInfiniteQuery } from '@tanstack/react-query';

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  sport: string;
  duration: string;
  distance: string;
  pace: string;
  likes: number;
  comments: number;
  timeAgo: string;
  image?: string;
}

// Mocked fetch function
const fetchPosts = async ({ pageParam = 0 }): Promise<{ data: Post[]; nextCursor: number | undefined }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const items: Post[] = [
    {
      id: `post-${pageParam}-1`,
      user: {
        name: 'Julia Farias',
        avatar: 'https://i.pravatar.cc/150?u=1',
      },
      sport: 'Corrida',
      duration: '45:12',
      distance: '8.5 km',
      pace: '5:19/km',
      likes: 24,
      comments: 3,
      timeAgo: '2h',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500',
    },
    {
      id: `post-${pageParam}-2`,
      user: {
        name: 'Marcos Silva',
        avatar: 'https://i.pravatar.cc/150?u=2',
      },
      sport: 'Ciclismo',
      duration: '1:20:05',
      distance: '35.4 km',
      pace: '26.5 km/h',
      likes: 41,
      comments: 8,
      timeAgo: '4h',
    },
  ];

  return {
    data: items,
    nextCursor: pageParam < 3 ? pageParam + 1 : undefined,
  };
};

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
