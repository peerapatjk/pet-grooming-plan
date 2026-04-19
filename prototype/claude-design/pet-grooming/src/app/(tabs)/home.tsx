import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { MobilePage, PageTitle, PawpointButton, SectionHeader, ShopCard, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';
import { formatCurrency } from '@/features/customer/utils';

export default function HomeTabScreen() {
  const router = useRouter();
  const { confirmRebook, shops } = useCustomerApp();

  return (
    <MobilePage>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ gap: 4 }}>
          <Text
            selectable
            style={{
              fontFamily: pawpointFonts.mono,
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              color: pawpointColors.inkSoft,
            }}>
            Sathorn · Tue 12 Nov
          </Text>
          <PageTitle title="Morning, Praew" />
        </View>
        <TopIconButton label="🔔" />
      </View>

      <Pressable
        onPress={() => {
          confirmRebook();
          router.push('/booking/status/confirmed');
        }}>
        {({ pressed }) => (
          <View
            style={{
              borderRadius: 20,
              padding: pawpointSpacing.lg,
              backgroundColor: pawpointColors.primary,
              gap: pawpointSpacing.sm,
              opacity: pressed ? 0.88 : 1,
            }}>
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.mono,
                fontSize: 10,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
              }}>
              Rebook · due in 2 weeks
            </Text>
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.serif,
                fontSize: 26,
                lineHeight: 28,
                color: pawpointColors.paperRaised,
              }}>
              Dash at Aroon,{'\n'}same time next month
            </Text>
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.sans,
                fontSize: 12,
                color: 'rgba(255,255,255,0.84)',
              }}>
              Thu 12 Dec · 10:30 · {formatCurrency(650)} · Full groom
            </Text>
            <PawpointButton label="One-tap rebook" variant="accent" />
          </View>
        )}
      </Pressable>

      <SectionHeader title="Today near Sathorn" actionLabel="24 shops →" />
      <View style={{ gap: pawpointSpacing.sm }}>
        {shops.slice(0, 3).map((shop, index) => (
          <ShopCard
            key={shop.id}
            shop={shop}
            highlighted={index === 0}
            onPress={() => {
              router.push(`/shop/${shop.id}`);
            }}
          />
        ))}
      </View>
    </MobilePage>
  );
}
