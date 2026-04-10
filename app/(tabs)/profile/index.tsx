import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Settings,
  Edit3,
  MapPin,
  Link as LinkIcon,
  User,
  Award,
  Calendar,
  TrendingUp,
  Activity,
} from 'lucide-react-native';
import { useAuthStore } from '../../../stores/authStore';
import { AvatarBadge } from '../../../components/profile/AvatarBadge';
import { StatsRow } from '../../../components/profile/StatsRow';
import { BadgeGrid } from '../../../components/profile/BadgeGrid';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const MOCK_BADGES = [
  { id: '1', name: 'Primeiro 5K', icon: '🏃', description: '', unlockedAt: '2023-10-01' },
  { id: '2', name: 'Madrugador', icon: '🌅', description: '', unlockedAt: '2023-10-15' },
  { id: '3', name: 'Iron Man', icon: '🏊', description: '' },
];

const MOCK_ACTIVITIES = [
  {
    id: '1',
    type: 'Corrida',
    icon: '🏃',
    date: '25 Mar',
    distance: '8.2 km',
    duration: '42:15',
    pace: '5:09/km',
  },
  {
    id: '2',
    type: 'Ciclismo',
    icon: '🚲',
    date: '23 Mar',
    distance: '32.5 km',
    duration: '1:15:30',
    pace: '25.8 km/h',
  },
  {
    id: '3',
    type: 'Natação',
    icon: '🏊',
    date: '21 Mar',
    distance: '1.2 km',
    duration: '28:40',
    pace: '2:23/100m',
  },
];

type ProfileTab = 'activities' | 'challenges' | 'plans';

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<ProfileTab>('activities');
  const router = useRouter();

  const profileName = user?.user_metadata?.full_name || 'Atleta Athledia';
  const profileLocation = 'São Paulo, Brasil';
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    'https://i.pravatar.cc/300?u=a042581f4e29026704d';

  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      {/* ── Header ────────────────────────────────────────── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingTop: 52,
          paddingBottom: 14,
          backgroundColor: '#E5E5E5',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(73, 80, 87, 0.08)',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <User size={24} color="#1F2328" />
          <Text
            style={{
              color: '#1F2328',
              fontSize: 22,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: -0.5,
              marginLeft: 10,
            }}
          >
            Perfil
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          style={{
            padding: 8,
            backgroundColor: '#F4F4F4',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.1)',
          }}
        >
          <Settings size={20} color="#495057" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Hero Card ───────────────────────────── */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 16,
            backgroundColor: '#F4F4F4',
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.08)',
          }}
        >
          {/* Top row: avatar + edit */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <AvatarBadge uri={avatarUrl} size={80} level={12} isPro />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E5E5E5',
                borderWidth: 1,
                borderColor: 'rgba(73, 80, 87, 0.12)',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 12,
                marginTop: 4,
              }}
            >
              <Edit3 size={14} color="#495057" />
              <Text
                style={{
                  color: '#1F2328',
                  fontSize: 12,
                  fontWeight: '800',
                  marginLeft: 6,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Editar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
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

          {/* Bio */}
          <Text
            style={{
              color: '#495057',
              fontSize: 14,
              fontWeight: '500',
              marginTop: 6,
              lineHeight: 20,
              paddingRight: 8,
            }}
          >
            Triatleta amador tentando sobreviver às planilhas. Focado no Iron Man
            2024. 🏊🚲🏃
          </Text>

          {/* Location & Link */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
              gap: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MapPin size={13} color="#868E96" />
              <Text
                style={{
                  color: '#868E96',
                  fontSize: 12,
                  fontWeight: '600',
                  marginLeft: 4,
                }}
              >
                {profileLocation}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LinkIcon size={13} color="#868E96" />
              <Text
                style={{
                  color: '#1F2328',
                  fontSize: 12,
                  fontWeight: '700',
                  marginLeft: 4,
                  textDecorationLine: 'underline',
                }}
              >
                strava.com/athletes/123
              </Text>
            </View>
          </View>
        </View>

        {/* ── Stats Row ───────────────────────────────────── */}
        <View style={{ paddingHorizontal: 20 }}>
          <StatsRow followers={1204} following={342} activities={156} prs={12} />
        </View>

        {/* ── Quick Highlights ────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            gap: 10,
            marginBottom: 20,
          }}
        >
          {/* This week */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#1F2328',
              borderRadius: 18,
              padding: 16,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <Calendar size={14} color="#868E96" />
              <Text
                style={{
                  color: '#868E96',
                  fontSize: 9,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginLeft: 6,
                }}
              >
                Esta Semana
              </Text>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 24,
                fontWeight: '900',
                letterSpacing: -0.5,
              }}
            >
              32.4
            </Text>
            <Text
              style={{
                color: '#868E96',
                fontSize: 10,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 2,
              }}
            >
              Km percorridos
            </Text>
          </View>

          {/* Streak */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#1F2328',
              borderRadius: 18,
              padding: 16,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <TrendingUp size={14} color="#48BB78" />
              <Text
                style={{
                  color: '#868E96',
                  fontSize: 9,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginLeft: 6,
                }}
              >
                Sequência
              </Text>
            </View>
            <Text
              style={{
                color: '#48BB78',
                fontSize: 24,
                fontWeight: '900',
                letterSpacing: -0.5,
              }}
            >
              14
            </Text>
            <Text
              style={{
                color: '#868E96',
                fontSize: 10,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 2,
              }}
            >
              Dias seguidos
            </Text>
          </View>
        </View>

        {/* ── Badges ──────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 20 }}>
          <BadgeGrid badges={MOCK_BADGES} />
        </View>

        {/* ── Tab Navigation ──────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            backgroundColor: '#F4F4F4',
            borderRadius: 14,
            padding: 4,
            marginBottom: 16,
          }}
        >
          {([
            { key: 'activities', label: 'Atividades' },
            { key: 'challenges', label: 'Desafios' },
            { key: 'plans', label: 'Planos' },
          ] as const).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 11,
                  alignItems: 'center',
                  backgroundColor: isActive ? '#1F2328' : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: isActive ? '#FFFFFF' : '#868E96',
                    fontSize: 12,
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Tab Content ─────────────────────────────────── */}
        <View style={{ paddingHorizontal: 20 }}>
          {activeTab === 'activities' && (
            <View style={{ gap: 10 }}>
              {MOCK_ACTIVITIES.map((act) => (
                <TouchableOpacity
                  key={act.id}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#F4F4F4',
                    borderRadius: 18,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: 'rgba(73, 80, 87, 0.08)',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {/* Activity icon */}
                  <View
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      backgroundColor: '#E5E5E5',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    <Text style={{ fontSize: 22 }}>{act.icon}</Text>
                  </View>

                  {/* Info */}
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: '#1F2328',
                          fontSize: 15,
                          fontWeight: '800',
                        }}
                      >
                        {act.type}
                      </Text>
                      <Text
                        style={{
                          color: '#868E96',
                          fontSize: 11,
                          fontWeight: '600',
                        }}
                      >
                        {act.date}
                      </Text>
                    </View>

                    {/* Metrics row */}
                    <View style={{ flexDirection: 'row', gap: 14 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Activity size={11} color="#868E96" />
                        <Text
                          style={{
                            color: '#495057',
                            fontSize: 12,
                            fontWeight: '700',
                            marginLeft: 4,
                          }}
                        >
                          {act.distance}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: '#868E96',
                          fontSize: 12,
                          fontWeight: '600',
                        }}
                      >
                        {act.duration}
                      </Text>
                      <Text
                        style={{
                          color: '#1F2328',
                          fontSize: 12,
                          fontWeight: '800',
                        }}
                      >
                        {act.pace}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'challenges' && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 40,
                backgroundColor: '#F4F4F4',
                borderRadius: 18,
                borderWidth: 1,
                borderColor: 'rgba(73, 80, 87, 0.08)',
              }}
            >
              <Award size={32} color="#B0B7BF" />
              <Text
                style={{
                  color: '#868E96',
                  fontSize: 14,
                  fontWeight: '600',
                  marginTop: 10,
                }}
              >
                Nenhum desafio ativo.
              </Text>
            </View>
          )}

          {activeTab === 'plans' && (
            <View style={{ gap: 16 }}>
              {/* Creator Dashboard Area */}
              <View
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: 24,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: 'rgba(73, 80, 87, 0.08)',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <Award size={20} color="#1F2328" />
                  <Text style={{ color: '#1F2328', fontSize: 16, fontWeight: '900', marginLeft: 8, textTransform: 'uppercase', letterSpacing: -0.5 }}>
                    Painel do Criador
                  </Text>
                </View>
                <Text style={{ color: '#495057', fontSize: 13, fontWeight: '500', lineHeight: 18, marginBottom: 20 }}>
                  Você ainda não possui planos de assinatura ativos. Monetize seus treinos e planilhas exclusivas.
                </Text>

                {/* Golden CTA to Create Plans */}
                <TouchableOpacity activeOpacity={0.9} style={{ overflow: 'hidden', borderRadius: 16 }}>
                  <LinearGradient
                    colors={['#BF953F', '#FCF6BA', '#B38728', '#FBF5B7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingVertical: 18,
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <TrendingUp size={18} color="#1F2328" />
                    <Text style={{ color: '#1F2328', fontSize: 14, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginLeft: 8 }}>
                      Criar Plano de Assinatura
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Mock Created Plans History / Metrics */}
              <View
                style={{
                  backgroundColor: '#E5E5E5',
                  borderRadius: 20,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: 'rgba(73, 80, 87, 0.1)',
                  borderStyle: 'dashed',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#868E96', fontSize: 13, fontWeight: '600', textAlign: 'center' }}>
                  Seus planos e assinantes ativos aparecerão aqui.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
