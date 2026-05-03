import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, RobotoSlab_400Regular, RobotoSlab_700Bold, RobotoSlab_900Black } from '@expo-google-fonts/roboto-slab';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';

import '../global.css';
import { useAuthStore } from '../stores/authStore';
import { ToastProvider } from '../components/ui/ToastProvider';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { AppThemeProvider } from '../components/ui/ThemeProvider';
import { colors } from '../lib/tokens';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function useProtectedRoute() {
  const { session, initialized } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, initialized, segments]);
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? colors.dark : colors.light;

  const [loaded] = useFonts({
    'RobotoSlab-Regular': RobotoSlab_400Regular,
    'RobotoSlab-Bold': RobotoSlab_700Bold,
    'RobotoSlab-Black': RobotoSlab_900Black,
  });

  const { initialized } = useAuthStore();

  useProtectedRoute();

  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (!initialized) useAuthStore.getState().setSession(null);
    }, 3000);

    if (loaded && initialized) {
      clearTimeout(safetyTimeout);
      SplashScreen.hideAsync();
    }
    return () => clearTimeout(safetyTimeout);
  }, [loaded, initialized]);

  if (!loaded || !initialized) return null;

  const navTheme = scheme === 'dark'
    ? { ...DarkTheme,    colors: { ...DarkTheme.colors,    background: t.bg, card: t.surface, text: t.text, border: t.border, primary: t.accentText } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: t.bg, card: t.surface, text: t.text, border: t.border, primary: t.accentText } };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={navTheme}>
          <GestureHandlerRootView style={{ flex: 1, backgroundColor: t.bg }}>
            <AppThemeProvider>
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: t.bg } }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="activity/[id]" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="search" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <ToastProvider />
              <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
            </AppThemeProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
