import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export default function Index() {
  const { session, initialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    router.replace('/(tabs)/feed');
  }, [session, initialized]);

  return null;
}
