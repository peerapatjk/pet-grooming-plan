import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { BrandMark, MobilePage, PageTitle, PawpointButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';

export default function WelcomeScreen() {
  const router = useRouter();
  const { skipOnboarding } = useCustomerApp();

  return (
    <MobilePage>
      <View
        style={{
          minHeight: 640,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: pawpointSpacing.xxxl,
          gap: pawpointSpacing.xxl,
        }}>
        <View style={{ alignItems: 'center', gap: pawpointSpacing.lg }}>
          <BrandMark />
          <PageTitle
            title="Grooming that earns the next visit."
            subtitle="Real-time slots from trusted Bangkok shops. Hold your spot with a Shield hold, no phone calls."
          />
        </View>

        <View style={{ width: '100%', gap: pawpointSpacing.sm }}>
          <PawpointButton
            fullWidth
            label="Continue with phone"
            onPress={() => {
              router.push('/(onboarding)/language');
            }}
          />
          <PawpointButton
            fullWidth
            label="I already have an account"
            variant="secondary"
            onPress={() => {
              skipOnboarding();
              router.replace('/(tabs)/home');
            }}
          />
          <Text
            selectable
            style={{
              textAlign: 'center',
              fontFamily: pawpointFonts.sans,
              fontSize: 11,
              lineHeight: 17,
              color: pawpointColors.inkSoft,
            }}>
            By continuing you accept Pawpoint&apos;s booking terms.
          </Text>
        </View>
      </View>
    </MobilePage>
  );
}
