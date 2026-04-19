import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Card, MobilePage, PageTitle, PawpointButton, PetBadge, SectionHeader, SegmentedControl, StatusBadge, TopIconButton, VisitRow } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing, pawpointTypography } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';

export default function VisitsTabScreen() {
  const router = useRouter();
  const { pets, visits } = useCustomerApp();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcoming = visits.filter((visit) => visit.group === 'upcoming');
  const needsYou = visits.filter((visit) => visit.group === 'needs-you');
  const past = visits.filter((visit) => visit.group === 'past');

  return (
    <MobilePage>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <PageTitle title="Visits" />
        <TopIconButton label="⌕" />
      </View>

      <SegmentedControl
        value={selectedTab}
        onChange={(nextValue) => setSelectedTab(nextValue as 'upcoming' | 'past')}
        options={[
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'past', label: 'Past' },
        ]}
      />

      {selectedTab === 'upcoming' ? (
        <>
          <SectionHeader title="Tomorrow" />
          {upcoming.slice(0, 1).map((visit) => (
            <Card key={visit.id} tone="primary">
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: pawpointSpacing.sm }}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 20, color: pawpointColors.ink }}>
                    {visit.title}
                  </Text>
                  <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: pawpointTypography.textXs, color: pawpointColors.inkSoft }}>
                    {visit.subtitle}
                  </Text>
                </View>
                <StatusBadge label={visit.statusLabel} tone="confirmed" />
              </View>
              <View style={{ flexDirection: 'row', gap: pawpointSpacing.xs }}>
                <PawpointButton label="Directions" variant="secondary" />
                <PawpointButton label="Message shop" variant="secondary" />
              </View>
            </Card>
          ))}

          <SectionHeader title="Needs you" />
          <View style={{ gap: pawpointSpacing.sm }}>
            {needsYou.map((visit) => {
              const pet = pets.find((entry) => entry.id === visit.petId) ?? pets[0];
              return (
                <VisitRow
                  key={visit.id}
                  tone="warn"
                  icon={<PetBadge pet={pet} small />}
                  title={visit.title}
                  subtitle={visit.subtitle}
                  badge={<StatusBadge label={visit.statusLabel} tone="pending" />}
                  onPress={() => router.push('/booking/status/pending')}
                />
              );
            })}
          </View>
        </>
      ) : (
        <>
          <SectionHeader title="Recent" actionLabel="Rate last visit" onPress={() => router.push('/rate')} />
          <View style={{ gap: pawpointSpacing.sm }}>
            {past.map((visit) => {
              const pet = pets.find((entry) => entry.id === visit.petId) ?? pets[0];
              return (
                <VisitRow
                  key={visit.id}
                  icon={<PetBadge pet={pet} small />}
                  title={visit.title}
                  subtitle={visit.subtitle}
                  badge={
                    <StatusBadge
                      label={visit.statusLabel}
                      tone={visit.statusTone === 'done' ? 'done' : 'cancelled'}
                    />
                  }
                />
              );
            })}
          </View>
        </>
      )}

      <Card tone="soft">
        <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: pawpointTypography.textXs, letterSpacing: 1.4, textTransform: 'uppercase', color: pawpointColors.inkSoft }}>
          Post-visit
        </Text>
        <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: pawpointTypography.textLg, color: pawpointColors.ink }}>
          Turn the rating moment into the next booking.
        </Text>
        <PawpointButton label="Open rating flow" onPress={() => router.push('/rate')} />
      </Card>
    </MobilePage>
  );
}
