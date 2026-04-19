import { Text, View } from 'react-native';

import { AppFrame } from '@/components/app-frame';
import { pawpointColors, pawpointFonts, pawpointRadius, pawpointShadow, pawpointSpacing } from '@/features/customer/design';

const checks = [
  'Expo Router is mounted from src/app',
  'Pawpoint web fonts are available on web',
  'Design tokens are ready for the native port',
  'Next pass will replace this shell with the full customer flow',
];

export default function HomeScreen() {
  return (
    <AppFrame
      kicker="Pawpoint Customer"
      title="Expo foundation is in place.">
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.sans,
          fontSize: 16,
          lineHeight: 25,
          color: pawpointColors.inkMuted,
          maxWidth: 560,
        }}>
        The original handoff was a static HTML walkthrough. This workspace now has a real Expo
        application shell, shared theme tokens, and the path alias setup needed to port the
        customer booking journey into native routes.
      </Text>

      <View style={{ gap: pawpointSpacing.sm }}>
        {checks.map((item) => (
          <View
            key={item}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: pawpointSpacing.sm,
              paddingHorizontal: pawpointSpacing.md,
              paddingVertical: pawpointSpacing.md,
              borderRadius: pawpointRadius.md,
              backgroundColor: pawpointColors.paper,
              boxShadow: pawpointShadow.soft,
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: pawpointColors.primary,
              }}
            />
            <Text
              selectable
              style={{
                flex: 1,
                fontFamily: pawpointFonts.sans,
                fontSize: 15,
                lineHeight: 22,
                color: pawpointColors.ink,
              }}>
              {item}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          padding: pawpointSpacing.lg,
          borderRadius: pawpointRadius.md,
          backgroundColor: pawpointColors.primary,
          gap: pawpointSpacing.xs,
        }}>
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.mono,
            fontSize: 11,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
          }}>
          Next step
        </Text>
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.serif,
            fontSize: 26,
            lineHeight: 28,
            letterSpacing: -0.8,
            color: pawpointColors.paperRaised,
          }}>
          Port onboarding, discovery, booking, account, and rebook flows.
        </Text>
      </View>
    </AppFrame>
  );
}
