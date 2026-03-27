import { Redirect } from 'expo-router';

// This is just a redirect to the feed tab
export default function TabsIndex() {
  return <Redirect href="/(tabs)/feed" />;
}
