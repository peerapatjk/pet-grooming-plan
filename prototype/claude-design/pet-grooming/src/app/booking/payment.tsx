import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { BottomActionBar, Card, InfoBanner, MobilePage, PageTitle, PawpointButton, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { isPaymentMethodSelected, useCustomerApp } from '@/features/customer/provider';
import { formatCurrency } from '@/features/customer/utils';

export default function PaymentScreen() {
  const router = useRouter();
  const { bookingDraft, finalizeBooking, paymentOptions, selectedPaymentMethodId, setPaymentMethod } = useCustomerApp();

  return (
    <MobilePage
      bottomBar={
        <BottomActionBar
          kicker={`Shield hold · ${formatCurrency(bookingDraft.holdAmount)}`}
          button={
            <PawpointButton
              label="Confirm Shield hold"
              onPress={() => {
                const journey = finalizeBooking();
                router.replace(`/booking/status/${journey.status}`);
              }}
            />
          }
        />
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TopIconButton label="‹" onPress={() => router.back()} />
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: pawpointColors.inkSoft }}>
          Step 3 of 3
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <PageTitle
        title={`Hold ${formatCurrency(bookingDraft.holdAmount)} to lock ${bookingDraft.slot.label}`}
      />

      <View style={{ gap: pawpointSpacing.sm }}>
        {paymentOptions.map((paymentOption) => {
          const selected = isPaymentMethodSelected(paymentOption, selectedPaymentMethodId);
          return (
            <Pressable key={paymentOption.id} onPress={() => setPaymentMethod(paymentOption.id)}>
              {({ pressed }) => (
                <Card compact tone={selected ? 'primary' : 'default'}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: pawpointSpacing.sm, opacity: pressed ? 0.9 : 1 }}>
                    <View style={{ gap: 4 }}>
                      <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 15, fontWeight: 600, color: pawpointColors.ink }}>
                        {paymentOption.title}
                      </Text>
                      <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 12, color: pawpointColors.inkSoft }}>
                        {paymentOption.subtitle}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        backgroundColor: selected ? pawpointColors.primary : pawpointColors.paperRaised,
                        borderWidth: 1,
                        borderColor: selected ? pawpointColors.primary : pawpointColors.paperStrong,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{ color: selected ? pawpointColors.paperRaised : 'transparent', fontWeight: 700 }}>✓</Text>
                    </View>
                  </View>
                </Card>
              )}
            </Pressable>
          );
        })}
      </View>

      <InfoBanner tone="ok" title="Secure with Omise" body="Card data never touches Pawpoint servers. Deposit release happens the moment you arrive." />
      <InfoBanner
        tone="info"
        title={bookingDraft.slot.state === 'pending' ? 'Not charged yet' : 'Held the moment you confirm'}
        body={
          bookingDraft.slot.state === 'pending'
            ? 'Confirm slots only charge after the shop accepts — usually within 1 hour.'
            : 'Instant-confirm slots place the Shield hold immediately so the time stays reserved.'
        }
      />
    </MobilePage>
  );
}
