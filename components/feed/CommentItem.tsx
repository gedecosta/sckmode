import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Comment } from '../../hooks/useComments';

interface CommentItemProps {
  comment: Comment;
  /** ID do usuário autenticado — exibe botão de delete apenas no próprio comentário */
  currentUserId?: string;
  onDelete?: (commentId: string) => void;
}

/**
 * Item de comentário com swipe-to-delete.
 * Swipe para a esquerda revela o botão de deletar.
 */
export function CommentItem({ comment, currentUserId, onDelete }: CommentItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const isOwner = currentUserId === comment.userId;

  const handleSwipeLeft = () => {
    if (!isOwner) return;
    Animated.spring(translateX, {
      toValue: -72,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  };

  const resetSwipe = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  };

  const handleDelete = () => {
    resetSwipe();
    onDelete?.(comment.id);
  };

  const timeAgo = formatTimeAgo(comment.createdAt);

  return (
    <View style={{ overflow: 'hidden', marginBottom: 4 }}>
      {/* Delete background */}
      {isOwner && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 72,
            backgroundColor: '#E03131',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
          }}
        >
          <TouchableOpacity onPress={handleDelete} style={{ padding: 12 }}>
            <Trash2 size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Comment card */}
      <Animated.View
        style={{ transform: [{ translateX }] }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onLongPress={isOwner ? handleSwipeLeft : undefined}
          onPress={resetSwipe}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: '#F4F4F4',
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.08)',
          }}
        >
          <Image
            source={{ uri: comment.userAvatar }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#E5E5E5',
              marginRight: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
              <Text
                style={{
                  color: '#1F2328',
                  fontSize: 13,
                  fontWeight: '800',
                  marginRight: 6,
                }}
              >
                {comment.userName}
              </Text>
              <Text style={{ color: '#868E96', fontSize: 11, fontWeight: '500' }}>
                {timeAgo}
              </Text>
            </View>
            <Text
              style={{
                color: '#495057',
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 20,
              }}
            >
              {comment.content}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function formatTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'agora';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
