import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { MobilePage, PawpointButton, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointRadius, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';
import { formatCurrency } from '@/features/customer/utils';

const highlightLabels = ['Gentle handling', 'On time', 'Clean cut', 'Listened to notes', 'Calmed Dash', 'Worth it'];

export default function RateScreen() {
  const router = useRouter();
  const { confirmRebook } = useCustomerApp();
  const [rating, setRating] = useState(5);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>(highlightLabels.slice(0, 3));

  return (
    <MobilePage
      dark
      bottomBar={
        <View style={{ gap: pawpointSpacing.xs }}>
          <View style={{ flexDirection: 'row', gap: pawpointSpacing.xs }}>
            <View style={{ flex: 1 }}>
              <PawpointButton label="Submit review" variant="secondary" onPress={() => router.replace('/(tabs)/home')} />
            </View>
            <PawpointButton
              label="Rebook"
              variant="accent"
              onPress={() => {
                confirmRebook();
                router.replace('/booking/status/confirmed');
              }}
            />
          </View>
          <PawpointButton label="Rate later" variant="ghost" onPress={() => router.replace('/(tabs)/home')} />
        </View>
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ width: 36 }} />
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.68)' }}>
          Today · 11:47
        </Text>
        <TopIconButton label="✕" inverted onPress={() => router.replace('/(tabs)/home')} />
      </View>

      <View style={{ alignItems: 'center', gap: pawpointSpacing.sm, paddingTop: pawpointSpacing.xl }}>
        <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 32, lineHeight: 34, textAlign: 'center', color: pawpointColors.paperRaised }}>
          How was Dash&apos;s{'\n'}time with Pim?
        </Text>

        <View style={{ flexDirection: 'row', gap: pawpointSpacing.sm }}>
          {Array.from({ length: 5 }, (_, index) => index + 1).map((value) => (
            <Pressable key={value} onPress={() => setRating(value)}>
              <Text
                style={{
                  fontSize: 34,
                  color: value <= rating ? pawpointColors.accent : 'rgba(255,255,255,0.24)',
                }}>
                ★
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: pawpointSpacing.xs, justifyContent: 'center' }}>
          {highlightLabels.map((label) => {
            const active = selectedHighlights.includes(label);
            return (
              <Pressable
                key={label}
                onPress={() => {
                  setSelectedHighlights((current) =>
                    current.includes(label) ? current.filter((entry) => entry !== label) : [...current, label],
                  );
                }}>
                <View
                  style={{
                    borderRadius: pawpointRadius.pill,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.18)',
                    backgroundColor: active ? 'rgba(255,255,255,0.14)' : 'transparent',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                  }}>
                  <Text selectable style={{ color: pawpointColors.paperRaised, fontSize: 12 }}>
                    {label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={{
          padding: pawpointSpacing.md,
          borderRadius: pawpointRadius.md,
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
          gap: pawpointSpacing.xs,
        }}>
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
          Receipt
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text selectable style={{ color: 'rgba(255,255,255,0.8)' }}>
            Full groom
          </Text>
          <Text selectable style={{ color: pawpointColors.paperRaised }}>
            {formatCurrency(650)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text selectable style={{ color: 'rgba(255,255,255,0.8)' }}>
            Deposit applied
          </Text>
          <Text selectable style={{ color: pawpointColors.accent }}>
            − {formatCurrency(200)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: pawpointSpacing.xs }}>
          <Text selectable style={{ color: pawpointColors.paperRaised }}>
            Paid at shop (PromptPay)
          </Text>
          <Text selectable style={{ color: pawpointColors.paperRaised }}>
            {formatCurrency(450)}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRadius: pawpointRadius.md,
          backgroundColor: pawpointColors.primary,
          padding: pawpointSpacing.md,
          gap: pawpointSpacing.xs,
        }}>
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
          Dash is due again
        </Text>
        <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 22, lineHeight: 24, color: pawpointColors.paperRaised }}>
          Rebook for Thu 12 Dec · 10:30?
        </Text>
        <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
          Same groomer, same price · Shield hold {formatCurrency(200)}
        </Text>
      </View>
    </MobilePage>
  );
}
