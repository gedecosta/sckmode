import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  TrendingUp,
  Clock,
  Zap,
  Mountain,
} from 'lucide-react-native';
import { useActivityDetails, SplitData } from '../../hooks/useActivityDetails';
import { CommentSheet } from '../../components/feed/CommentSheet';
import { useAuthStore } from '../../stores/authStore';
import { useScreenTracking } from '../../hooks/useScreenTracking';

// ── Stat card component ───────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  unit,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: accent ? '#1F2328' : '#F4F4F4',
        borderRadius: 18,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: accent ? 'transparent' : 'rgba(73, 80, 87, 0.08)',
      }}
    >
      {icon}
      <Text
        style={{
          color: accent ? '#868E96' : '#868E96',
          fontSize: 9,
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginTop: 6,
          marginBottom: 4,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: accent ? '#FFFFFF' : '#1F2328',
          fontSize: 22,
          fontWeight: '900',
          letterSpacing: -0.5,
        }}
      >
        {value}
      </Text>
      {unit && (
        <Text
          style={{
            color: accent ? '#868E96' : '#868E96',
            fontSize: 10,
            fontWeight: '700',
            textTransform: 'uppercase',
            marginTop: 1,
          }}
        >
          {unit}
        </Text>
      )}
    </View>
  );
}

// ── Split row ──────────────────────────────────────────────────────────────────
function SplitRow({ split, isLast }: { split: SplitData; isLast: boolean }) {
  const paceSeconds = parsePaceToSeconds(split.pace);
  const maxPaceSeconds = 6 * 60; // 6:00/km = reference max
  const barWidth = Math.max(0.1, 1 - paceSeconds / maxPaceSeconds); // faster = wider bar

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: 'rgba(73, 80, 87, 0.07)',
      }}
    >
      {/* Km label */}
      <Text
        style={{
          width: 38,
          color: '#868E96',
          fontSize: 12,
          fontWeight: '700',
        }}
      >
        km {split.km}
      </Text>

      {/* Pace bar */}
      <View style={{ flex: 1, height: 6, backgroundColor: '#E5E5E5', borderRadius: 3, marginHorizontal: 10 }}>
        <View
          style={{
            width: `${barWidth * 100}%`,
            height: '100%',
            backgroundColor: '#1F2328',
            borderRadius: 3,
          }}
        />
      </View>

      {/* Pace value */}
      <Text
        style={{
          width: 72,
          color: '#1F2328',
          fontSize: 13,
          fontWeight: '800',
          textAlign: 'right',
        }}
      >
        {split.pace}
      </Text>

      {/* HR */}
      <View style={{ flexDirection: 'row', alignItems: 'center', width: 50, justifyContent: 'flex-end' }}>
        <Heart size={10} color="#E03131" fill="#E03131" />
        <Text style={{ color: '#868E96', fontSize: 11, fontWeight: '600', marginLeft: 3 }}>
          {split.heartRate}
        </Text>
      </View>
    </View>
  );
}

function parsePaceToSeconds(pace: string): number {
  // Formato: "5:12/km" ou "5:12"
  const match = pace.match(/(\d+):(\d+)/);
  if (!match) return 360;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

// ── Main screen ────────────────────────────────────────────────────────────────
export default function ActivityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [commentSheetOpen, setCommentSheetOpen] = useState(false);

  const { data: activity, isLoading, error } = useActivityDetails(id ?? '');
  useScreenTracking('ActivityDetails', { activityId: id });

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#E5E5E5', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#1F2328" />
      </View>
    );
  }

  if (error || !activity) {
    return (
      <View style={{ flex: 1, backgroundColor: '#E5E5E5', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <Text style={{ color: '#1F2328', fontSize: 18, fontWeight: '900', marginBottom: 8 }}>
          Atividade não encontrada
        </Text>
        <Text style={{ color: '#868E96', textAlign: 'center' }}>
          Essa atividade pode ter sido removida ou você não tem permissão para acessá-la.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 24, backgroundColor: '#1F2328', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 }}
        >
          <Text style={{ color: '#F4F4F4', fontWeight: '800' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formattedDate = new Date(activity.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#E5E5E5' }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 56,
            paddingBottom: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#F4F4F4',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(73, 80, 87, 0.1)',
              marginRight: 12,
            }}
          >
            <ArrowLeft size={20} color="#1F2328" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#868E96', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {activity.typeIcon} {activity.type}
            </Text>
            <Text
              numberOfLines={1}
              style={{ color: '#1F2328', fontSize: 18, fontWeight: '900', letterSpacing: -0.3, marginTop: 1 }}
            >
              {activity.title}
            </Text>
          </View>
        </View>

        {/* ── Author + date ────────────────────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginBottom: 16,
            backgroundColor: '#F4F4F4',
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.08)',
          }}
        >
          <Image
            source={{ uri: activity.authorAvatar }}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E5E5' }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={{ color: '#1F2328', fontSize: 14, fontWeight: '800' }}>
              {activity.authorName}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <MapPin size={11} color="#868E96" />
              <Text style={{ color: '#868E96', fontSize: 12, fontWeight: '500', marginLeft: 3 }}>
                {formattedDate}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Primary metrics ──────────────────────────────────────────────── */}
        <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 10, marginBottom: 12 }}>
          <StatCard
            icon={<Zap size={18} color="#FFFFFF" />}
            label="Distância"
            value={activity.distanceKm.toFixed(1)}
            unit="km"
            accent
          />
          <StatCard
            icon={<Clock size={18} color="#495057" />}
            label="Duração"
            value={activity.durationFormatted}
          />
          <StatCard
            icon={<TrendingUp size={18} color="#495057" />}
            label="Pace"
            value={activity.pace.replace('/km', '')}
            unit="/km"
          />
        </View>

        <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 10, marginBottom: 20 }}>
          <StatCard
            icon={<Heart size={18} color="#E03131" />}
            label="FC Média"
            value={String(activity.heartRateAvg)}
            unit="bpm"
          />
          <StatCard
            icon={<Mountain size={18} color="#495057" />}
            label="Elevação"
            value={String(activity.elevationGainM)}
            unit="m ganho"
          />
        </View>

        {/* ── Notes ────────────────────────────────────────────────────────── */}
        {!!activity.notes && (
          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: '#F4F4F4',
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: 'rgba(73, 80, 87, 0.08)',
            }}
          >
            <Text style={{ color: '#868E96', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
              Observações
            </Text>
            <Text style={{ color: '#1F2328', fontSize: 14, fontWeight: '500', lineHeight: 20 }}>
              {activity.notes}
            </Text>
          </View>
        )}

        {/* ── Splits table ────────────────────────────────────────────────── */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: '#F4F4F4',
            borderRadius: 20,
            padding: 16,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.08)',
          }}
        >
          <Text
            style={{
              color: '#1F2328',
              fontSize: 15,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: -0.2,
              marginBottom: 12,
            }}
          >
            Splits por km
          </Text>
          {/* Table header */}
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            <Text style={{ width: 38, color: '#868E96', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' }}>Km</Text>
            <View style={{ flex: 1 }} />
            <Text style={{ width: 72, color: '#868E96', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Pace</Text>
            <Text style={{ width: 50, color: '#868E96', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>FC</Text>
          </View>
          {activity.splits.map((split, i) => (
            <SplitRow
              key={split.km}
              split={split}
              isLast={i === activity.splits.length - 1}
            />
          ))}
        </View>

        {/* ── Actions bar ─────────────────────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            backgroundColor: '#F4F4F4',
            borderRadius: 18,
            padding: 16,
            alignItems: 'center',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.08)',
          }}
        >
          {/* Like */}
          <TouchableOpacity
            onPress={() => setLiked((v) => !v)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            accessibilityLabel={liked ? 'Desfazer curtida' : 'Curtir atividade'}
          >
            <Heart
              size={22}
              color={liked ? '#E03131' : '#868E96'}
              fill={liked ? '#E03131' : 'transparent'}
            />
            <Text
              style={{
                color: liked ? '#E03131' : '#868E96',
                fontSize: 14,
                fontWeight: '700',
              }}
            >
              {liked ? activity.likesCount + 1 : activity.likesCount}
            </Text>
          </TouchableOpacity>

          {/* Comment */}
          <TouchableOpacity
            onPress={() => setCommentSheetOpen(true)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            accessibilityLabel="Abrir comentários"
          >
            <MessageCircle size={22} color="#868E96" />
            <Text style={{ color: '#868E96', fontSize: 14, fontWeight: '700' }}>
              {activity.commentsCount}
            </Text>
          </TouchableOpacity>

          {/* Share */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            accessibilityLabel="Compartilhar atividade"
          >
            <Share2 size={22} color="#868E96" />
            <Text style={{ color: '#868E96', fontSize: 14, fontWeight: '700' }}>
              Compartilhar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Comment sheet */}
      <CommentSheet
        visible={commentSheetOpen}
        onClose={() => setCommentSheetOpen(false)}
        activityId={activity.id}
        currentUserId={user?.id ?? 'guest'}
      />
    </>
  );
}
