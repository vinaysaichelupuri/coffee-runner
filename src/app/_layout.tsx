import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider, Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AnimatedSplashOverlay />
        <Slot />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
