import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export default function Index() {
  const { session, initialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    if (session) {
      router.replace('/(tabs)/feed');
    } else {
      router.replace('/(auth)/login');
    }
  }, [session, initialized]);

  return null;
}
