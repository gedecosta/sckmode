import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { Tabs, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import {
  FeedIcon,
  ChallengesIcon,
  CreateIcon,
  TrackIcon,
  ProfileIcon,
} from '../../components/ui/TabIcons';

export default function TabLayout() {
  const { session, initialized } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (initialized && !session && segments[0] === '(tabs)') {
      router.replace('/(auth)/login');
    }
  }, [session, initialized, segments]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F4F4F4',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#1F2328',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingHorizontal: 8,
        },
        tabBarActiveTintColor: '#1F2328',
        tabBarInactiveTintColor: '#B0B7BF',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.3,
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <FeedIcon color={color} size={26} focused={focused} />
              {focused && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#1F2328',
                    marginTop: 3,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Desafios',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <ChallengesIcon color={color} size={26} focused={focused} />
              {focused && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#1F2328',
                    marginTop: 3,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -12,
                width: 52,
                height: 52,
                borderRadius: 16,
                backgroundColor: focused ? '#1F2328' : 'rgba(31, 35, 40, 0.06)',
                shadowColor: '#1F2328',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: focused ? 0.25 : 0,
                shadowRadius: 8,
                elevation: focused ? 8 : 0,
              }}
            >
              <CreateIcon
                color={focused ? '#F4F4F4' : '#868E96'}
                size={28}
                focused={focused}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Treinar',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <TrackIcon color={color} size={26} focused={focused} />
              {focused && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#1F2328',
                    marginTop: 3,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <ProfileIcon color={color} size={26} focused={focused} />
              {focused && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#1F2328',
                    marginTop: 3,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      {/* Hide the index tab from the menu since it will redirect */}
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}

