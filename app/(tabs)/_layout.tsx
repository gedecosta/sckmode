import { Tabs } from 'expo-router';
import { Home, Zap, Map, PlusCircle, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarStyle: { 
          backgroundColor: '#F4F4F4', 
          borderTopColor: 'rgba(73, 80, 87, 0.1)',
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#1F2328',
        tabBarInactiveTintColor: '#868E96',
      }}
    >
      <Tabs.Screen 
        name="feed" 
        options={{ 
          title: 'Feed',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }} 
      />
      <Tabs.Screen 
        name="challenges" 
        options={{ 
          title: 'Desafios',
          tabBarIcon: ({ color, size }) => <Zap color={color} size={size} />
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          title: 'Criar',
          tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size + 4} />
        }} 
      />
      <Tabs.Screen 
        name="track" 
        options={{ 
          title: 'Treinar',
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />
        }} 
      />
      {/* Hide the index tab from the menu since it will redirect */}
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
