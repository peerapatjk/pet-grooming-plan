import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppChip, BottomActionBar, Card, InfoBanner, KVRow, MobilePage, PageTitle, PawpointButton, PetBadge, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';
import { formatCurrency } from '@/features/customer/utils';

export default function ReviewScreen() {
  const router = useRouter();
  const { bookingDraft } = useCustomerApp();

  return (
    <MobilePage
      bottomBar={
        <BottomActionBar
          kicker="Confirm Shield hold"
          value={formatCurrency(bookingDraft.holdAmount)}
          button={<PawpointButton label="Continue to pay" onPress={() => router.push('/booking/payment')} />}
        />
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TopIconButton label="‹" onPress={() => router.back()} />
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: pawpointColors.inkSoft }}>
          Step 2 of 3
        </Text>
        <TopIconButton label="?" />
      </View>

      <PageTitle title="Review" subtitle="Deposit mechanics stay explicit before the customer confirms." />

      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: pawpointSpacing.sm }}>
          <PetBadge pet={bookingDraft.pet} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 15, fontWeight: 600, color: pawpointColors.ink }}>
              {bookingDraft.pet.name} · {bookingDraft.pet.breed}
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 11, color: pawpointColors.inkSoft }}>
              {bookingDraft.pet.weightLabel} · {bookingDraft.pet.coat} · {bookingDraft.pet.flags.join(' · ')}
            </Text>
          </View>
          <AppChip label="Edit" />
        </View>
      </Card>

      <Card>
        <KVRow label="Shop" value={bookingDraft.shop.name} />
        <KVRow label="Service" value={`${bookingDraft.service.title} · ${bookingDraft.service.durationLabel}`} />
        <KVRow label="Time" value={bookingDraft.dateTimeLabel} />
        <KVRow label="Groomer" value={`${bookingDraft.groomer}${bookingDraft.requestFee ? ` · +${formatCurrency(bookingDraft.requestFee)}` : ''}`} />
        <KVRow label="Notes for shop" value={bookingDraft.notes} muted />
      </Card>

      <Card tone="soft">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: pawpointColors.accentInk }}>
            Deposit flow
          </Text>
          <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 11, color: pawpointColors.inkSoft }}>
            {formatCurrency(bookingDraft.holdAmount)} held · {formatCurrency(bookingDraft.dueAtShop)} at shop
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: pawpointSpacing.xs }}>
          {[
            ['1', formatCurrency(bookingDraft.holdAmount), 'Confirm Shield hold'],
            ['2', formatCurrency(bookingDraft.dueAtShop), 'At shop'],
            ['↺', `−${formatCurrency(bookingDraft.holdAmount)}`, 'Refund on arrival'],
          ].map(([step, value, label], index) => (
            <View
              key={label}
              style={{
                flex: 1,
                gap: pawpointSpacing.xs,
                alignItems: 'center',
                padding: pawpointSpacing.sm,
                borderRadius: 16,
                backgroundColor: index === 0 ? pawpointColors.accentWash : pawpointColors.paperRaised,
              }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: index === 0 ? pawpointColors.accent : pawpointColors.paperRaised,
                  borderWidth: 1,
                  borderColor: index === 0 ? pawpointColors.accent : pawpointColors.paperStrong,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 12, color: index === 0 ? pawpointColors.paperRaised : pawpointColors.inkSoft }}>
                  {step}
                </Text>
              </View>
              <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 18, color: pawpointColors.ink }}>
                {value}
              </Text>
              <Text selectable style={{ textAlign: 'center', fontFamily: pawpointFonts.mono, fontSize: 10, color: pawpointColors.inkSoft }}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: pawpointSpacing.sm }}>
          <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 13, color: pawpointColors.inkSoft }}>
            Total you pay
          </Text>
          <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 22, color: pawpointColors.ink }}>
            {formatCurrency(bookingDraft.totalAmount)}
          </Text>
        </View>
      </Card>

      <InfoBanner
        title="How the deposit works"
        body={`The ${formatCurrency(bookingDraft.holdAmount)} hold is released the moment you check in. Free cancel until 24 hours before the visit. No-show forfeits the hold.`}
      />
    </MobilePage>
  );
}
