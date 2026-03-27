import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, RobotoSlab_400Regular, RobotoSlab_700Bold, RobotoSlab_900Black } from '@expo-google-fonts/roboto-slab';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';

import '../global.css';
import { useAuthStore } from '../stores/authStore';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'RobotoSlab-Regular': RobotoSlab_400Regular,
    'RobotoSlab-Bold': RobotoSlab_700Bold,
    'RobotoSlab-Black': RobotoSlab_900Black,
  });

  const { initialized, session } = useAuthStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            {session ? (
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            )}
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
