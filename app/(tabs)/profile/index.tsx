import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Edit3, MapPin, Link as LinkIcon } from 'lucide-react-native';
import { useAuthStore } from '../../../stores/authStore';
import { useScreenTracking } from '../../../hooks/useScreenTracking';
import { AvatarBadge } from '../../../components/profile/AvatarBadge';
import { StatsRow } from '../../../components/profile/StatsRow';
import { BadgeGrid, Badge } from '../../../components/profile/BadgeGrid';
import { ActivityIcon, ActivityKind } from '../../../components/ui/ActivityIcon';
import { Numeric } from '../../../components/ui/Numeric';
import { useThemeColors } from '../../../lib/tokens';

const MOCK_BADGES: Badge[] = [
  { id: '1', name: 'Primeiro 5K',   tier: 'bronze',   category: 'endurance',   unlockedAt: '2023-10-01' },
  { id: '2', name: 'Madrugador',    tier: 'silver',   category: 'consistency', unlockedAt: '2023-10-15' },
  { id: '3', name: 'Meia-Maratona', tier: 'gold',     category: 'endurance',   unlockedAt: '2024-06-01' },
  { id: '4', name: '500K Ciclismo', tier: 'gold',     category: 'cycling',     unlockedAt: '2024-07-10' },
  { id: '5', name: 'Iron Man',      tier: 'diamond',  category: 'multisport'   },
  { id: '6', name: 'Montanhista',   tier: 'platinum', category: 'outdoor'      },
];

type Activity = {
  id: string;
  kind: ActivityKind;
  label: string;
  date: string;
  distance: string;
  duration: string;
  pace: string;
  paceUnit: string;
};

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', kind: 'run',   label: 'Corrida',  date: '25 MAR', distance: '8.20',  duration: '42:15',   pace: '5:09', paceUnit: '/km'   },
  { id: '2', kind: 'cycle', label: 'Ciclismo', date: '23 MAR', distance: '32.5',  duration: '1:15:30', pace: '25.8', paceUnit: 'km/h'  },
  { id: '3', kind: 'swim',  label: 'Natação',  date: '21 MAR', distance: '1.20',  duration: '28:40',   pace: '2:23', paceUnit: '/100m' },
];

type Tab = 'activities' | 'challenges' | 'plans';

export default function ProfileScreen() {
  useScreenTracking('Profile');
  const { user } = useAuthStore();
  const router = useRouter();
  const t = useThemeColors();
  const [active, setActive] = React.useState<Tab>('activities');

  const profileName = user?.user_metadata?.full_name || 'Atleta Athledia';
  const avatarUrl = user?.user_metadata?.avatar_url || 'https://i.pravatar.cc/300?u=athledia';
  const unlockedCount = MOCK_BADGES.filter(b => b.unlockedAt).length;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Editorial header */}
      <View style={{
        flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
        paddingHorizontal: 24, paddingTop: 56, paddingBottom: 18,
      }}>
        <View>
          <Text style={{
            fontFamily: 'Menlo', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            color: t.textMuted, marginBottom: 4,
          }}>Athlete · Active</Text>
          <Text style={{
            fontFamily: 'RobotoSlab-Black', fontSize: 40, letterSpacing: -1.5,
            lineHeight: 40, color: t.text,
          }}>Profile</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/settings' as any)}
          style={{ padding: 10, backgroundColor: t.surface, borderRadius: 12, borderWidth: 1, borderColor: t.border }}
        >
          <Settings size={18} color={t.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Hero card */}
        <View style={{
          marginHorizontal: 20, marginTop: 4, backgroundColor: t.surface,
          borderRadius: 24, padding: 24, borderWidth: 1, borderColor: t.border,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <AvatarBadge uri={avatarUrl} size={80} level={12} isPro />
            <TouchableOpacity style={{
              flexDirection: 'row', alignItems: 'center',
              backgroundColor: t.surfaceAlt, borderWidth: 1, borderColor: t.border,
              paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
            }}>
              <Edit3 size={13} color={t.textMuted} />
              <Text style={{
                fontFamily: 'System', fontSize: 11, fontWeight: '700', marginLeft: 6,
                letterSpacing: 1.4, textTransform: 'uppercase', color: t.text,
              }}>Editar</Text>
            </TouchableOpacity>
          </View>

          <Text style={{
            fontFamily: 'RobotoSlab-Black', fontSize: 26, letterSpacing: -0.6,
            color: t.text, marginTop: 16,
          }}>{profileName}</Text>

          <Text style={{
            fontFamily: 'System', fontSize: 14, lineHeight: 20, color: t.textMuted, marginTop: 6,
          }}>Triatleta amador tentando sobreviver às planilhas. Focado no Iron Man 2026.</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MapPin size={12} color={t.textDim} />
              <Text style={{
                fontFamily: 'Menlo', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
                color: t.textDim, marginLeft: 6,
              }}>São Paulo · Brasil</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LinkIcon size={12} color={t.accentText} />
              <Text style={{
                fontFamily: 'Menlo', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
                color: t.accentText, marginLeft: 6,
              }}>strava.com/atleta</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <StatsRow followers={1204} following={342} activities={156} prs={12} />
        </View>

        {/* Highlights */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 4, marginBottom: 24 }}>
          {[
            { label: 'Esta semana', val: '32.4', unit: 'Km',   kind: 'chart'  as ActivityKind, accent: false },
            { label: 'Sequência',   val: '14',   unit: 'Dias', kind: 'streak' as ActivityKind, accent: true  },
          ].map((h, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: t.ribbonBg, borderRadius: 18, padding: 18 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <ActivityIcon
                  kind={h.kind}
                  size={13}
                  color={t.ribbonMuted}
                  accent={h.accent ? t.ribbonAccent : t.ribbonMuted}
                  strokeWidth={1.6}
                />
                <Text style={{
                  fontFamily: 'Menlo', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase',
                  color: t.ribbonMuted, marginLeft: 6,
                }}>{h.label}</Text>
              </View>
              <Numeric weight="bold" style={{
                fontSize: 32, letterSpacing: -1.4,
                color: h.accent ? t.ribbonAccent : t.ribbonText,
              }}>{h.val}</Numeric>
              <Text style={{
                fontFamily: 'System', fontSize: 10, fontWeight: '700', letterSpacing: 1.4,
                textTransform: 'uppercase', color: t.ribbonMuted, marginTop: 4,
              }}>{h.unit}</Text>
            </View>
          ))}
        </View>

        {/* Badges */}
        <View style={{ paddingHorizontal: 20 }}>
          <BadgeGrid badges={MOCK_BADGES} total={28} unlocked={unlockedCount} />
        </View>

        {/* Tabs */}
        <View style={{
          flexDirection: 'row', marginHorizontal: 20, marginTop: 20, marginBottom: 16,
          backgroundColor: t.surface, borderRadius: 14, padding: 4, borderWidth: 1, borderColor: t.border,
        }}>
          {([
            { key: 'activities', label: 'Atividades' },
            { key: 'challenges', label: 'Séries' },
            { key: 'plans',      label: 'Planos' },
          ] as const).map((tab) => {
            const isActive = active === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActive(tab.key)}
                style={{
                  flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
                  backgroundColor: isActive ? t.text : 'transparent',
                }}
              >
                <Text style={{
                  fontFamily: 'System', fontSize: 11, fontWeight: '700', letterSpacing: 1.4,
                  textTransform: 'uppercase', color: isActive ? t.bg : t.textDim,
                }}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab content */}
        <View style={{ paddingHorizontal: 20 }}>
          {active === 'activities' && (
            <View style={{ gap: 10 }}>
              {MOCK_ACTIVITIES.map((act) => (
                <TouchableOpacity key={act.id} activeOpacity={0.85} style={{
                  backgroundColor: t.surface, borderRadius: 18, padding: 16,
                  borderWidth: 1, borderColor: t.border,
                  flexDirection: 'row', alignItems: 'center',
                }}>
                  <View style={{
                    width: 48, height: 48, borderRadius: 14,
                    backgroundColor: t.surfaceAlt, borderWidth: 1, borderColor: t.border,
                    alignItems: 'center', justifyContent: 'center', marginRight: 14,
                  }}>
                    <ActivityIcon kind={act.kind} size={24} color={t.text} accent={t.accentText} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{
                      flexDirection: 'row', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 8,
                    }}>
                      <Text style={{ fontFamily: 'RobotoSlab-Bold', fontSize: 15, color: t.text }}>
                        {act.label}
                      </Text>
                      <Text style={{
                        fontFamily: 'Menlo', fontSize: 10, fontWeight: '700',
                        letterSpacing: 1.4, textTransform: 'uppercase', color: t.textDim,
                      }}>{act.date}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 18 }}>
                      <MetricCell value={act.distance} unit="KM"    t={t} />
                      <MetricCell value={act.duration} unit="TEMPO"  t={t} />
                      <MetricCell value={act.pace}     unit={act.paceUnit.replace('/', '').toUpperCase()} t={t} accent />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {active === 'challenges' && (
            <View style={{
              alignItems: 'center', justifyContent: 'center', paddingVertical: 40,
              backgroundColor: t.surface, borderRadius: 18, borderWidth: 1, borderColor: t.border,
            }}>
              <ActivityIcon kind="medal" size={32} color={t.textDim} strokeWidth={1.4} />
              <Text style={{ fontFamily: 'System', fontSize: 13, color: t.textMuted, marginTop: 12 }}>
                Nenhum desafio ativo no momento.
              </Text>
            </View>
          )}

          {active === 'plans' && (
            <View style={{
              backgroundColor: t.surface, borderRadius: 20, padding: 20,
              borderWidth: 1, borderColor: t.border,
            }}>
              <Text style={{ fontFamily: 'RobotoSlab-Black', fontSize: 16, color: t.text, marginBottom: 8 }}>
                Painel do Criador
              </Text>
              <Text style={{ fontFamily: 'System', fontSize: 13, color: t.textMuted, lineHeight: 19 }}>
                Você ainda não possui planos de assinatura ativos. Monetize seus treinos exclusivos.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function MetricCell({ value, unit, t, accent }: { value: string; unit: string; t: any; accent?: boolean }) {
  return (
    <View>
      <Numeric weight="bold" style={{ fontSize: 15, color: accent ? t.accentText : t.text, letterSpacing: -0.2 }}>
        {value}
      </Numeric>
      <Text style={{
        fontFamily: 'Menlo', fontSize: 8, fontWeight: '700',
        letterSpacing: 1.2, color: t.textDim, textTransform: 'uppercase', marginTop: 1,
      }}>
        {unit}
      </Text>
    </View>
  );
}
