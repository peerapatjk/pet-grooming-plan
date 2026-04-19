import 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { pawpointColors } from '@/features/customer/design';
import { CustomerAppProvider } from '@/features/customer/provider';

export default function RootLayout() {
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
