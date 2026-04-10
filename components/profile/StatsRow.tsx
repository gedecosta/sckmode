import React from 'react';
import { View, Text } from 'react-native';

interface StatsRowProps {
  followers: number;
  following: number;
  activities: number;
  prs: number;
}

function formatStat(value: number): string {
  if (value >= 10000) return `${(value / 1000).toFixed(0)}K`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

function StatItem({ value, label, accent }: { value: number; label: string; accent?: boolean }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text
        style={{
          color: accent ? '#1F2328' : '#1F2328',
          fontSize: 20,
          fontWeight: '900',
          fontVariant: ['tabular-nums'],
        }}
      >
        {formatStat(value)}
      </Text>
      <Text
        style={{
          color: '#868E96',
          fontSize: 10,
          fontWeight: '700',
          marginTop: 3,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export function StatsRow({ followers, following, activities, prs }: StatsRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderRadius: 18,
        padding: 16,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: 'rgba(73, 80, 87, 0.1)',
      }}
    >
      <StatItem value={followers} label="Seguidores" />
      <View style={{ width: 1, height: 28, backgroundColor: 'rgba(73, 80, 87, 0.12)' }} />
      <StatItem value={following} label="Seguindo" />
      <View style={{ width: 1, height: 28, backgroundColor: 'rgba(73, 80, 87, 0.12)' }} />
      <StatItem value={activities} label="Atividades" />
      <View style={{ width: 1, height: 28, backgroundColor: 'rgba(73, 80, 87, 0.12)' }} />
      <StatItem value={prs} label="PRs" accent />
    </View>
  );
}
