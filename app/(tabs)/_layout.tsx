import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Home, Zap, Map, PlusCircle, User } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { colors } from '../../lib/tokens';

export default function TabLayout() {
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? colors.dark : colors.light;

  const activeIndicator = () => (
    <View style={{
      width: 16, height: 2, borderRadius: 1,
      backgroundColor: t.accentText, marginTop: 3,
    }} />
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: t.surface,
          borderTopWidth: 1,
          borderTopColor: t.border,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          height: Platform.OS === 'ios' ? 86 : 68,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 26 : 10,
          paddingHorizontal: 8,
        },
        tabBarActiveTintColor: t.text,
        tabBarInactiveTintColor: t.textDim,
        tabBarLabelStyle: {
          fontFamily: 'System',
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarAccessibilityLabel: 'Feed de atividades',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Home color={color} size={24} strokeWidth={focused ? 2.5 : 1.75} />
              {focused && activeIndicator()}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Séries',
          tabBarAccessibilityLabel: 'Desafios e competições',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Zap color={color} size={24} strokeWidth={focused ? 2.5 : 1.75} />
              {focused && activeIndicator()}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarAccessibilityLabel: 'Criar publicação',
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center', justifyContent: 'center',
              marginTop: -8, width: 48, height: 48, borderRadius: 14,
              backgroundColor: focused ? t.accent : t.text,
            }}>
              <PlusCircle
                color={focused ? t.accentInk : t.bg}
                size={26}
                strokeWidth={2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Track',
          tabBarAccessibilityLabel: 'Iniciar treino com GPS',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Map color={color} size={24} strokeWidth={focused ? 2.5 : 1.75} />
              {focused && activeIndicator()}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarAccessibilityLabel: 'Seu perfil e configurações',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <User color={color} size={24} strokeWidth={focused ? 2.5 : 1.75} />
              {focused && activeIndicator()}
            </View>
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
