import { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { pawpointColors, pawpointFonts, pawpointRadius, pawpointShadow, pawpointSpacing } from '@/features/customer/design';

type AppFrameProps = {
  title: string;
  kicker: string;
  children: ReactNode;
};

export function AppFrame({ title, kicker, children }: AppFrameProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pawpointColors.paper }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          padding: pawpointSpacing.lg,
          gap: pawpointSpacing.lg,
        }}>
        <View
          style={{
            gap: pawpointSpacing.md,
            padding: pawpointSpacing.lg,
            borderRadius: pawpointRadius.lg,
            backgroundColor: pawpointColors.paperRaised,
            boxShadow: pawpointShadow.card,
            overflow: 'hidden',
          }}>
          <View
            style={{
              position: 'absolute',
              width: 180,
              height: 180,
              borderRadius: 999,
              backgroundColor: 'rgba(191, 122, 60, 0.14)',
              right: -44,
              top: -42,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 156,
              height: 156,
              borderRadius: 999,
              backgroundColor: 'rgba(35, 72, 113, 0.1)',
              left: -40,
              bottom: -56,
            }}
          />
          <View style={{ gap: pawpointSpacing.xs }}>
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.mono,
                fontSize: 11,
                letterSpacing: 1.8,
                textTransform: 'uppercase',
                color: pawpointColors.accentInk,
              }}>
              {kicker}
            </Text>
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.serif,
                fontSize: 38,
                lineHeight: 40,
                letterSpacing: -1.4,
                color: pawpointColors.ink,
              }}>
              {title}
            </Text>
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
