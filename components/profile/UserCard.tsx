import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { AthleteProfile } from '../../hooks/useDiscoverUsers';
import { FollowButton } from './FollowButton';

interface UserCardProps {
  athlete: AthleteProfile;
  currentUserId?: string;
  onPress?: (athlete: AthleteProfile) => void;
}

const SPORT_LABELS: Record<string, string> = {
  run: 'Corrida',
  cycling: 'Ciclismo',
  swim: 'Natação',
  crossfit: 'CrossFit',
  yoga: 'Yoga',
  all: 'Todos',
};

/**
 * Card de atleta para telas de Discover/Busca.
 * Exibe avatar, nome, esporte, localização e botão de follow.
 */
export function UserCard({ athlete, currentUserId, onPress }: UserCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(athlete)}
      activeOpacity={0.85}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(73, 80, 87, 0.08)',
      }}
    >
      {/* Avatar */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: athlete.avatar }}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: '#E5E5E5',
          }}
        />
        {athlete.isPro && (
          <View
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              backgroundColor: '#D4A640',
              borderRadius: 8,
              width: 16,
              height: 16,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#F4F4F4',
            }}
          >
            <Text style={{ fontSize: 8 }}>⭐</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <Text
            style={{
              color: '#1F2328',
              fontSize: 15,
              fontWeight: '800',
              letterSpacing: -0.2,
            }}
            numberOfLines={1}
          >
            {athlete.name}
          </Text>
        </View>

        {/* Sport pill + location */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <View
            style={{
              backgroundColor: '#E5E5E5',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#495057', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4 }}>
              {SPORT_LABELS[athlete.sport] ?? athlete.sport}
            </Text>
          </View>
          {!!athlete.location && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MapPin size={11} color="#868E96" />
              <Text style={{ color: '#868E96', fontSize: 11, fontWeight: '500', marginLeft: 3 }}>
                {athlete.location}
              </Text>
            </View>
          )}
        </View>

        {/* Followers */}
        <Text style={{ color: '#868E96', fontSize: 12, fontWeight: '600' }}>
          {athlete.followerCount.toLocaleString('pt-BR')} seguidores
          {'  ·  '}
          {athlete.activitiesCount} atividades
        </Text>
      </View>

      {/* Follow button */}
      {currentUserId && currentUserId !== athlete.id && (
        <FollowButton targetId={athlete.id} myId={currentUserId} size="sm" />
      )}
    </TouchableOpacity>
  );
}
