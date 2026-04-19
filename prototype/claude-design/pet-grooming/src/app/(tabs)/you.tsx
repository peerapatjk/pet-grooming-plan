import { Text, View } from 'react-native';

import { AppChip, Card, MobilePage, PageTitle, PetBadge, SectionHeader, TopIconButton, VisitRow } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';

export default function YouTabScreen() {
  const { paymentOptions, pets, selectedLanguage } = useCustomerApp();

  return (
    <MobilePage>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <PageTitle title="You" />
        <TopIconButton label="⚙" />
      </View>

      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: pawpointSpacing.sm }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              backgroundColor: pawpointColors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: pawpointColors.paperRaised, fontWeight: 700 }}>PR</Text>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 22, color: pawpointColors.ink }}>
              Praew R.
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 12, color: pawpointColors.inkSoft }}>
              +66 81 234 5678 · LINE linked
            </Text>
          </View>
          <AppChip label="12 visits" active tone="accent" />
        </View>
      </Card>

      <SectionHeader title="Pets" actionLabel="+ Add pet" />
      <View style={{ gap: pawpointSpacing.sm }}>
        {pets.map((pet) => (
          <VisitRow
            key={pet.id}
            icon={<PetBadge pet={pet} small />}
            title={`${pet.name} · ${pet.breed}`}
            subtitle={`${pet.weightLabel} · ${pet.flags.join(' · ')}${pet.nextVisitLabel ? ` · Next: ${pet.nextVisitLabel}` : ''}`}
            badge={<Text style={{ color: pawpointColors.inkSoft }}>›</Text>}
          />
        ))}
      </View>

      <SectionHeader title="Payment & holds" />
      <Card>
        {paymentOptions.map((payment) => (
          <View
            key={payment.id}
            style={{
              paddingVertical: pawpointSpacing.sm,
              borderTopWidth: payment.id === paymentOptions[0]?.id ? 0 : 1,
              borderTopColor: pawpointColors.paperStrong,
              gap: 4,
            }}>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 14, color: pawpointColors.ink }}>
              {payment.title}
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 11, color: pawpointColors.inkSoft }}>
              {payment.subtitle}
            </Text>
          </View>
        ))}
      </Card>

      <SectionHeader title="Preferences" />
      <Card>
        {[
          ['LINE notifications', 'On'],
          ['Language', selectedLanguage === 'th' ? 'ไทย' : selectedLanguage === 'en' ? 'English' : '中文'],
          ['Preferred groomer', 'Pim K. at Aroon'],
          ['Help & support', 'Chat'],
        ].map(([label, value], index) => (
          <View
            key={label}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: pawpointSpacing.sm,
              borderTopWidth: index === 0 ? 0 : 1,
              borderTopColor: pawpointColors.paperStrong,
            }}>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 14, color: pawpointColors.ink }}>
              {label}
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 12, color: pawpointColors.inkSoft }}>
              {value}
            </Text>
          </View>
        ))}
      </Card>
    </MobilePage>
  );
}
