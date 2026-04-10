import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, MoreHorizontal, UserPlus, MessageCircle } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AvatarBadge } from '../../../components/profile/AvatarBadge';
import { StatsRow } from '../../../components/profile/StatsRow';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown } from 'lucide-react-native';

export default function PublicProfileScreen() {
  const router = useRouter();
  const { username } = useLocalSearchParams();

  const profileName = username ? String(username) : 'Atleta Desconhecido';
  const avatarUrl = 'https://i.pravatar.cc/300?u=2';

  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 52,
          paddingBottom: 14,
          backgroundColor: '#E5E5E5',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(73, 80, 87, 0.08)',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 8,
            backgroundColor: '#F4F4F4',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.1)',
          }}
        >
          <ChevronLeft size={22} color="#1F2328" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#1F2328',
            fontSize: 16,
            fontWeight: '800',
          }}
        >
          {profileName}
        </Text>
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#F4F4F4',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.1)',
          }}
        >
          <MoreHorizontal size={20} color="#495057" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 16,
            backgroundColor: '#F4F4F4',
            borderRadius: 24,
            padding: 24,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.08)',
          }}
        >
          <AvatarBadge uri={avatarUrl} size={100} level={42} />

          <Text
            style={{
              color: '#1F2328',
              fontSize: 26,
              fontWeight: '900',
              marginTop: 16,
              letterSpacing: -0.5,
            }}
          >
            {profileName}
          </Text>

          <Text
            style={{
              color: '#495057',
              fontSize: 14,
              fontWeight: '500',
              marginTop: 6,
              textAlign: 'center',
              lineHeight: 20,
              paddingHorizontal: 12,
              marginBottom: 20,
            }}
          >
            Corredor de montanha explorando trilhas aos finais de semana. 🏔️
          </Text>

          {/* Action buttons */}
          <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flex: 2,
                backgroundColor: '#1F2328',
                borderRadius: 14,
                height: 48,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserPlus size={16} color="#FFFFFF" />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: '800',
                  marginLeft: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Seguir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flex: 1,
                backgroundColor: '#E5E5E5',
                borderRadius: 14,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'rgba(73, 80, 87, 0.12)',
              }}
            >
              <MessageCircle size={18} color="#495057" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: 20 }}>
          <StatsRow followers={45200} following={12} activities={802} prs={42} />
        </View>

        {/* Subscription CTA - Dourado Reluzente */}
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 20,
            overflow: 'hidden',
            shadowColor: '#BF953F',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 10,
          }}
        >
          <LinearGradient
            colors={['#BF953F', '#FCF6BA', '#B38728', '#FBF5B7', '#AA771C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Crown size={16} color="#1F2328" />
              <Text
                style={{
                  color: '#1F2328',
                  fontSize: 10,
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginLeft: 6,
                }}
              >
                Conteúdo Premium
              </Text>
            </View>

            <Text
              style={{
                color: '#1F2328',
                fontSize: 20,
                fontWeight: '900',
                marginBottom: 6,
                letterSpacing: -0.5,
              }}
            >
              Assine o plano de {profileName}
            </Text>
            
            <Text
              style={{
                color: '#1F2328',
                opacity: 0.8,
                fontSize: 13,
                fontWeight: '600',
                lineHeight: 18,
                marginBottom: 16,
              }}
            >
              Tenha acesso a planilhas exclusivas, dicas de nutrição e comunidade fechada VIP.
            </Text>
            
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#1F2328',
                borderRadius: 14,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  color: '#FCF6BA',
                  fontSize: 14,
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Assinar agora • R$ 29/mês
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
