import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, Send } from 'lucide-react-native';
import { BottomSheet } from '../ui/BottomSheet';
import { CommentItem } from './CommentItem';
import { useComments } from '../../hooks/useComments';
import { useAddComment, useDeleteComment } from '../../hooks/useAddComment';

interface CommentSheetProps {
  visible: boolean;
  onClose: () => void;
  activityId: string;
  currentUserId: string;
}

/**
 * Bottom sheet de comentários com input, listagem, swipe-to-delete
 * e proteção por rate limiting.
 */
export function CommentSheet({
  visible,
  onClose,
  activityId,
  currentUserId,
}: CommentSheetProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const { data: comments = [], isLoading } = useComments(activityId);
  const addComment = useAddComment(activityId, currentUserId);
  const deleteComment = useDeleteComment(activityId, currentUserId);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    addComment.mutate(
      { content: trimmed },
      {
        onSuccess: () => setText(''),
        onError: (err) => {
          // Erro já logado no hook; poderíamos mostrar um Toast aqui
          console.warn(err.message);
        },
      }
    );
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} snapHeight={500}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(73, 80, 87, 0.08)',
          }}
        >
          <Text
            style={{
              color: '#1F2328',
              fontSize: 16,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: -0.3,
            }}
          >
            Comentários
            {comments.length > 0 && (
              <Text style={{ color: '#868E96', fontSize: 14, fontWeight: '600' }}>
                {' '}({comments.length})
              </Text>
            )}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: 6,
              backgroundColor: '#E5E5E5',
              borderRadius: 10,
            }}
          >
            <X size={16} color="#495057" />
          </TouchableOpacity>
        </View>

        {/* Comments list */}
        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="small" color="#1F2328" />
          </View>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CommentItem
                comment={item}
                currentUserId={currentUserId}
                onDelete={(id) => deleteComment.mutate(id)}
              />
            )}
            contentContainerStyle={{ padding: 16, gap: 4 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}
              >
                <Text style={{ color: '#868E96', fontSize: 14, fontWeight: '500' }}>
                  Nenhum comentário ainda. Seja o primeiro!
                </Text>
              </View>
            }
          />
        )}

        {/* Input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            paddingBottom: Platform.OS === 'ios' ? 20 : 12,
            borderTopWidth: 1,
            borderTopColor: 'rgba(73, 80, 87, 0.08)',
            backgroundColor: '#F4F4F4',
            gap: 10,
          }}
        >
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={setText}
            placeholder="Adicione um comentário..."
            placeholderTextColor="#868E96"
            style={{
              flex: 1,
              backgroundColor: '#E5E5E5',
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 10,
              fontSize: 14,
              color: '#1F2328',
              maxHeight: 80,
            }}
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!text.trim() || addComment.isPending}
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: text.trim() ? '#1F2328' : '#E5E5E5',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {addComment.isPending ? (
              <ActivityIndicator size="small" color="#F4F4F4" />
            ) : (
              <Send size={18} color={text.trim() ? '#F4F4F4' : '#868E96'} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
}
