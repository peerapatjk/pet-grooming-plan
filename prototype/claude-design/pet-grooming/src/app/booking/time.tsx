import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { BottomActionBar, InfoBanner, MobilePage, PageTitle, PawpointButton, SectionHeader, SlotPill, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';
import { formatCurrency, getSlotPreviewLabels } from '@/features/customer/utils';

export default function TimePickerScreen() {
  const router = useRouter();
  const { bookingDraft, updateBookingSelection } = useCustomerApp();
  const morningSlots = bookingDraft.shop.slots.filter((slot) => slot.period === 'morning');
  const afternoonSlots = bookingDraft.shop.slots.filter((slot) => slot.period === 'afternoon');
  const slotPreview = getSlotPreviewLabels(bookingDraft.slot.state);

  return (
    <MobilePage
      bottomBar={
        <BottomActionBar
          kicker={bookingDraft.dateTimeLabel}
          value={formatCurrency(bookingDraft.service.price)}
          button={
            <PawpointButton
              label="Review"
              onPress={() => {
                router.push('/booking/review');
              }}
            />
          }
        />
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TopIconButton label="‹" onPress={() => router.back()} />
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: pawpointColors.inkSoft }}>
          Step 1 of 3
        </Text>
        <TopIconButton label="i" />
      </View>

      <PageTitle title="Pick a time" subtitle="Choose a slot. The app distinguishes instant confirmation from staff review before you commit." />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: pawpointSpacing.xs }}>
        {bookingDraft.shop.bookingDays.map((day) => {
          const active = day.id === bookingDraft.day.id;
          return (
            <Pressable
              key={day.id}
              onPress={() => {
                if (!day.disabled) {
                  updateBookingSelection({ dayId: day.id });
                }
              }}>
              <View
                style={{
                  width: 44,
                  borderRadius: 12,
                  borderCurve: 'continuous',
                  paddingVertical: 8,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: active ? pawpointColors.primary : pawpointColors.paperStrong,
                  backgroundColor: active ? pawpointColors.primary : pawpointColors.paperRaised,
                  opacity: day.disabled ? 0.35 : 1,
                }}>
                <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 10, color: active ? pawpointColors.paperRaised : pawpointColors.inkSoft }}>
                  {day.day}
                </Text>
                <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 15, color: active ? pawpointColors.paperRaised : pawpointColors.ink }}>
                  {day.shortLabel}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <SectionHeader title={`Morning · ${bookingDraft.day.dateLabel}`} actionLabel="Confirms instantly" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: pawpointSpacing.xs }}>
        {morningSlots.map((slot) => (
          <Pressable
            key={slot.id}
            onPress={() => {
              if (slot.state !== 'disabled') {
                updateBookingSelection({ slotId: slot.id });
              }
            }}>
            <SlotPill slot={slot} selected={bookingDraft.slot.id === slot.id} />
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Afternoon" actionLabel="Some slots need staff confirm" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: pawpointSpacing.xs }}>
        {afternoonSlots.map((slot) => (
          <Pressable
            key={slot.id}
            onPress={() => {
              if (slot.state !== 'disabled') {
                updateBookingSelection({ slotId: slot.id });
              }
            }}>
            <SlotPill slot={slot} selected={bookingDraft.slot.id === slot.id} />
          </Pressable>
        ))}
      </View>

      <InfoBanner title={slotPreview.headline} body={slotPreview.detail} />
    </MobilePage>
  );
}
