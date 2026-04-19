import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AppChip, InfoBanner, MobilePage, PageTitle, SearchField, SectionHeader, ShopCard } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';

export default function BookTabScreen() {
  const router = useRouter();
  const { shops } = useCustomerApp();

  return (
    <MobilePage>
      <SearchField placeholder="Search area, service, or groomer" filterLabel="Bangkok" />

      <PageTitle title="Discovery tuned for fast booking" subtitle="Search, compare, and carry the pet context into the quote and slot picker." />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: pawpointSpacing.xs }}>
        <AppChip label="Sathorn" active />
        <AppChip label="Instant only" />
        <AppChip label="Sensitive skin" />
        <AppChip label="Medium coat" />
        <AppChip label="Thai / English" />
      </ScrollView>

      <SectionHeader title="Suggested shops" />
      <View style={{ gap: pawpointSpacing.sm }}>
        {shops.map((shop) => (
          <ShopCard
            key={shop.id}
            shop={shop}
            onPress={() => {
              router.push(`/shop/${shop.id}`);
            }}
          />
        ))}
      </View>

      <InfoBanner
        title="Why some slots say confirm"
        body="Some shops keep a short merchant review step for exception cases or groomer-specific requests."
      />
    </MobilePage>
  );
}
