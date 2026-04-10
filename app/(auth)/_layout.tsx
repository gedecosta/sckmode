import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { session, initialized } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (initialized && session && segments[0] === '(auth)') {
      router.replace('/(tabs)/feed');
    }
  }, [session, initialized, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000' },
      }}
    />
  );
}
