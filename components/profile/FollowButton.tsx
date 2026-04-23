import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useFollowUser } from '../../hooks/useFollowUser';

interface FollowButtonProps {
  targetId: string;
  myId: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Botão de follow/unfollow com estado otimista e rate limiting.
 * Integrado com useSocialStore — o estado é compartilhado entre componentes.
 *
 * @example
 * <FollowButton targetId={userId} myId={currentUser.id} />
 */
export function FollowButton({ targetId, myId, size = 'md' }: FollowButtonProps) {
  const { follow, unfollow, isFollowing, isPending } = useFollowUser();

  const following = isFollowing(targetId);
  const pending = isPending(targetId);

  const handlePress = () => {
    if (pending) return;
    if (following) {
      unfollow({ targetId, myId });
    } else {
      follow({ targetId, myId });
    }
  };

  const sizeStyles = {
    sm: { px: 12, py: 6, fontSize: 11, minWidth: 72 },
    md: { px: 16, py: 10, fontSize: 13, minWidth: 100 },
    lg: { px: 24, py: 14, fontSize: 15, minWidth: 140 },
  }[size];

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={pending}
      accessibilityLabel={following ? `Deixar de seguir` : `Seguir`}
      accessibilityRole="button"
      style={{
        minWidth: sizeStyles.minWidth,
        paddingHorizontal: sizeStyles.px,
        paddingVertical: sizeStyles.py,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: following ? 'transparent' : '#1F2328',
        borderWidth: 1.5,
        borderColor: following ? 'rgba(73, 80, 87, 0.3)' : '#1F2328',
        opacity: pending ? 0.6 : 1,
      }}
    >
      {pending ? (
        <ActivityIndicator size="small" color={following ? '#495057' : '#F4F4F4'} />
      ) : (
        <Text
          style={{
            fontSize: sizeStyles.fontSize,
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: 0.4,
            color: following ? '#495057' : '#F4F4F4',
          }}
        >
          {following ? 'Seguindo' : 'Seguir'}
        </Text>
      )}
    </TouchableOpacity>
  );
}
