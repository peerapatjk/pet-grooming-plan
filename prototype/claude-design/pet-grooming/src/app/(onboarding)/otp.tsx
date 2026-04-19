import { useRouter } from 'expo-router';
import { Text, TextInput, View } from 'react-native';

import { InfoBanner, MobilePage, PageTitle, PawpointButton, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointRadius, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';

export default function OtpScreen() {
  const router = useRouter();
  const { otpCode, setOtpCode } = useCustomerApp();
  const paddedCode = otpCode.slice(0, 6).padEnd(6, ' ');

  return (
    <MobilePage
      bottomBar={
        <View style={{ gap: pawpointSpacing.sm }}>
          <PawpointButton fullWidth label="Verify & continue" onPress={() => router.push('/(onboarding)/pet')} />
          <PawpointButton fullWidth label="Resend in 0:14" variant="ghost" />
        </View>
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TopIconButton label="‹" onPress={() => router.back()} />
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.mono,
            fontSize: 10,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: pawpointColors.inkSoft,
          }}>
          Step 2 of 3
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <PageTitle
        title="Verify +66 81 234 5678"
        subtitle="We sent a 6-digit code via SMS. This demo is prefilled so you can keep moving."
      />

      <View style={{ gap: pawpointSpacing.sm }}>
        <View style={{ flexDirection: 'row', gap: pawpointSpacing.xs, justifyContent: 'space-between' }}>
          {paddedCode.split('').map((digit, index) => (
            <View
              key={`${digit}-${index}`}
              style={{
                width: 46,
                height: 56,
                borderRadius: 12,
                borderCurve: 'continuous',
                borderWidth: 1.5,
                borderColor: digit.trim() ? pawpointColors.primary : pawpointColors.paperStrong,
                backgroundColor: digit.trim() ? pawpointColors.primaryWash : pawpointColors.paperRaised,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                selectable
                style={{
                  fontFamily: pawpointFonts.serif,
                  fontSize: 24,
                  color: digit.trim() ? pawpointColors.primaryInk : pawpointColors.inkSoft,
                }}>
                {digit}
              </Text>
            </View>
          ))}
        </View>

        <TextInput
          keyboardType="number-pad"
          maxLength={6}
          value={otpCode}
          onChangeText={(value) => {
            setOtpCode(value.replace(/\D/g, ''));
          }}
          placeholder="472849"
          placeholderTextColor={pawpointColors.inkSoft}
          style={{
            borderWidth: 1,
            borderColor: pawpointColors.paperStrong,
            borderRadius: pawpointRadius.md,
            paddingHorizontal: pawpointSpacing.md,
            paddingVertical: pawpointSpacing.md,
            backgroundColor: pawpointColors.paperRaised,
            fontFamily: pawpointFonts.mono,
            fontSize: 16,
            color: pawpointColors.ink,
          }}
        />
      </View>

      <InfoBanner
        tone="info"
        title="Prefer LINE notifications?"
        body="We will send booking confirmations and updates to your connected LINE account."
      />
    </MobilePage>
  );
}
