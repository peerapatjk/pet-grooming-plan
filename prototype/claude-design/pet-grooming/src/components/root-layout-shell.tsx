import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { pawpointColors } from '@/features/customer/design';
import { CustomerAppProvider } from '@/features/customer/provider';

void SplashScreen.preventAutoHideAsync();

export function RootLayoutShell() {
  const [loaded, error] = useFonts({
    Satoshi: require('../../assets/fonts/satoshi-400.ttf'),
    'Satoshi-Medium': require('../../assets/fonts/satoshi-500.ttf'),
    'Satoshi-Bold': require('../../assets/fonts/satoshi-700.ttf'),
    Fraunces: require('../../assets/fonts/fraunces-latin.ttf'),
    'Fraunces-Italic': require('../../assets/fonts/fraunces-latin-italic.ttf'),
    'IBM-Plex-Mono': require('../../assets/fonts/ibm-plex-mono-400.ttf'),
    'IBM-Plex-Mono-Medium': require('../../assets/fonts/ibm-plex-mono-500.ttf'),
    'Noto-Sans-Thai': require('../../assets/fonts/noto-sans-thai.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <CustomerAppProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: pawpointColors.paper,
            },
          }}
        />
      </CustomerAppProvider>
    </SafeAreaProvider>
  );
}
