import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { BottomActionBar, Card, InfoBanner, KVRow, MobilePage, PageTitle, PawpointButton, SectionHeader, ShopCard, StatusBadge, TimelineStep, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';
import { formatCurrency } from '@/features/customer/utils';

export default function BookingStatusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ status: string }>();
  const statusParam = Array.isArray(params.status) ? params.status[0] : params.status;
  const status = statusParam === 'pending' || statusParam === 'declined' ? statusParam : 'confirmed';
  const { bookingDraft, journeyBooking, shops } = useCustomerApp();
  const draft = journeyBooking?.draft ?? bookingDraft;
  const nearbyAlternatives = shops.filter((shop) => shop.id !== draft.shop.id).slice(0, 3);

  if (status === 'pending') {
    return (
      <MobilePage
        bottomBar={
          <View style={{ flexDirection: 'row', gap: pawpointSpacing.xs }}>
            <View style={{ flex: 1 }}>
              <PawpointButton label="Switch to instant shop" variant="secondary" onPress={() => router.replace('/booking/status/declined')} />
            </View>
            <PawpointButton label="Keep waiting" onPress={() => router.replace('/(tabs)/visits')} />
          </View>
        }>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TopIconButton label="✕" onPress={() => router.replace('/(tabs)/visits')} />
          <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 12, color: pawpointColors.inkSoft }}>
            {journeyBooking?.bookingNumber ?? 'BKG-41C9'}
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <Card tone="soft">
          <StatusBadge label="Awaiting shop confirm" tone="pending" />
          <PageTitle
            title={`The ${draft.shop.name} is reviewing your ${draft.slot.label} request`}
            subtitle="They usually respond within 25 minutes. We'll ping you the moment they accept. Nothing is charged until they do."
          />
          <Card compact>
            <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: pawpointColors.inkSoft }}>
              Auto-expires in
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 28, color: pawpointColors.warn }}>
              48 minutes
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 11, color: pawpointColors.inkSoft }}>
              Started 13:52 · ends 14:40
            </Text>
          </Card>
        </Card>

        <Card>
          <KVRow label="Shop" value={`${draft.shop.name} · ${draft.shop.area}`} />
          <KVRow label="Service" value={`${draft.service.title} · ${draft.service.durationLabel}`} />
          <KVRow label="Requested" value={draft.dateTimeLabel} />
          <KVRow label={`Shield hold · ${formatCurrency(draft.holdAmount)}`} value="Not yet · pending" />
        </Card>

        <InfoBanner tone="info" title="Don't want to wait?" body="3 instant-confirm shops nearby can take Dash at 14:30 or 15:00." />

        <SectionHeader title="What happens next" />
        <Card>
          <TimelineStep title="Requested" subtitle="13:52" tone="done" />
          <TimelineStep title="Shop reviewing" subtitle="typically ≤ 25 min" tone="current" />
          <TimelineStep title={`Confirm & hold ${formatCurrency(draft.holdAmount)}`} subtitle="automatic" />
          <TimelineStep title={`Service ${draft.day.dateLabel}`} />
        </Card>
      </MobilePage>
    );
  }

  if (status === 'declined') {
    return (
      <MobilePage
        bottomBar={
          <BottomActionBar
            kicker="Alternatives ready"
            button={<PawpointButton label="See nearby alternatives" onPress={() => router.replace('/(tabs)/book')} />}
          />
        }>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TopIconButton label="✕" onPress={() => router.replace('/(tabs)/book')} />
          <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 12, color: pawpointColors.inkSoft }}>
            {journeyBooking?.bookingNumber ?? 'BKG-41C9'}
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <Card>
          <StatusBadge label="Shop cannot take the request" tone="cancelled" />
          <PageTitle
            title="No charge. Here are three close fits for Dash."
            subtitle="Your ฿150 hold was never placed. Tap a suggestion below; we’ll carry over your notes and service."
          />
          <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 11, color: pawpointColors.inkSoft }}>
            Shield only activates on no-show — your card is safe.
          </Text>
        </Card>

        <View style={{ gap: pawpointSpacing.sm }}>
          {nearbyAlternatives.map((shop, index) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              highlighted={index === 0}
              onPress={() => {
                router.replace(`/shop/${shop.id}`);
              }}
            />
          ))}
        </View>

        <InfoBanner title="Why did this happen?" body="The Fluff Room had an equipment delay. You keep full control and nothing is charged until you pick a new shop." />
      </MobilePage>
    );
  }

  return (
    <MobilePage
      bottomBar={
        <View style={{ flexDirection: 'row', gap: pawpointSpacing.xs }}>
          <View style={{ flex: 1 }}>
            <PawpointButton label="Message shop" variant="secondary" />
          </View>
          <PawpointButton label="Directions" onPress={() => router.replace('/(tabs)/visits')} />
        </View>
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TopIconButton label="✕" onPress={() => router.replace('/(tabs)/visits')} />
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 12, color: pawpointColors.inkSoft }}>
          {journeyBooking?.bookingNumber ?? 'BKG-41A7'}
        </Text>
        <TopIconButton label="↗" />
      </View>

      <View
        style={{
          borderRadius: 20,
          backgroundColor: pawpointColors.primary,
          padding: pawpointSpacing.xl,
          gap: pawpointSpacing.sm,
        }}>
        <StatusBadge label="Confirmed · deposit held" tone="confirmed" />
        <PageTitle title={`${draft.day.dateLabel}\n${draft.slot.label}`} subtitle={`${draft.shop.name} · ${draft.shop.area}`} dark />
      </View>

      <Card>
        <KVRow label="Pet" value={`${draft.pet.name} · ${draft.service.title} (${draft.service.durationLabel})`} />
        <KVRow label="Groomer" value={draft.groomer} />
        <KVRow label="Deposit" value={`${formatCurrency(draft.holdAmount)} held until arrival`} />
        <KVRow label="Due at shop" value={formatCurrency(draft.dueAtShop)} />
        <KVRow label="Free cancel until" value="Mon 20 Apr · 10:30" />
      </Card>

      <SectionHeader title="Timeline" />
      <Card>
        <TimelineStep title="Booked" subtitle={journeyBooking?.createdLabel ?? 'Today · 14:02'} tone="done" />
        <TimelineStep title={`Deposit held (${formatCurrency(draft.holdAmount)})`} subtitle={journeyBooking?.createdLabel ?? 'Today · 14:02'} tone="done" />
        <TimelineStep title="Reminder 24h before" subtitle="Mon 20 Apr · 10:30" tone="current" />
        <TimelineStep title="Check-in QR" subtitle="Tue 10:20" />
        <TimelineStep title="Service complete · deposit refunded" subtitle="Tue ~11:45" />
      </Card>
    </MobilePage>
  );
}
