import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

import { AppChip, BottomActionBar, Card, HeroCover, InfoBanner, MobilePage, PawpointButton, SectionHeader, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';
import { formatCurrency, getShop } from '@/features/customer/utils';

export default function ShopDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ shopId: string }>();
  const shopId = Array.isArray(params.shopId) ? params.shopId[0] : params.shopId;
  const shop = getShop(shopId ?? 'aroon');
  const { bookingDraft, startShopBooking, updateBookingSelection } = useCustomerApp();

  useEffect(() => {
    if (bookingDraft.shop.id !== shop.id) {
      startShopBooking(shop.id);
    }
  }, [bookingDraft.shop.id, shop.id, startShopBooking]);

  const activeService = bookingDraft.shop.id === shop.id ? bookingDraft.service : shop.services[0];

  return (
    <MobilePage
      bottomBar={
        <BottomActionBar
          kicker={activeService.title}
          value={formatCurrency(activeService.price)}
          button={
            <PawpointButton
              label="Pick a time"
              onPress={() => {
                router.push('/booking/time');
              }}
            />
          }
        />
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TopIconButton label="‹" onPress={() => router.back()} />
        <View style={{ flexDirection: 'row', gap: pawpointSpacing.xs }}>
          <TopIconButton label="♡" />
          <TopIconButton label="↗" />
        </View>
      </View>

      <HeroCover shop={shop} />

      <Card tone="primary" compact>
        <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 12, color: pawpointColors.primaryInk }}>
          {shop.detail}
        </Text>
      </Card>

      <View style={{ gap: 6 }}>
        <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 26, lineHeight: 28, color: pawpointColors.ink }}>
          {shop.heroTitle}
        </Text>
        <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 13, lineHeight: 20, color: pawpointColors.inkMuted }}>
          {shop.intro} {shop.openHours}.
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: pawpointSpacing.sm }}>
        <View style={{ flex: 1 }}>
          <Card compact>
            <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: pawpointColors.inkSoft }}>
              Deposit
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 24, color: pawpointColors.ink }}>
              {formatCurrency(activeService.holdAmount)}
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 11, color: pawpointColors.inkSoft }}>
              {shop.depositPolicy}
            </Text>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <Card compact>
            <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: pawpointColors.inkSoft }}>
              Free cancel
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 24, color: pawpointColors.ink }}>
              24 h
            </Text>
            <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 11, color: pawpointColors.inkSoft }}>
              {shop.cancelWindow}
            </Text>
          </Card>
        </View>
      </View>

      <SectionHeader title={`Services for ${bookingDraft.pet.name} · ${bookingDraft.pet.coat}`} actionLabel="All 9 →" />
      <View style={{ gap: pawpointSpacing.sm }}>
        {shop.services.map((service) => {
          const active = activeService.id === service.id;
          return (
            <Pressable
              key={service.id}
              onPress={() => {
                updateBookingSelection({
                  shopId: shop.id,
                  serviceId: service.id,
                  requestFeeOverride: service.requestFee,
                });
              }}>
              {({ pressed }) => (
                <Card tone={active ? 'primary' : 'default'}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: pawpointSpacing.sm, opacity: pressed ? 0.92 : 1 }}>
                    <View style={{ flex: 1, gap: pawpointSpacing.xs }}>
                      {service.highlightLabel ? <AppChip label={service.highlightLabel} active /> : null}
                      <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 17, fontWeight: 600, color: pawpointColors.ink }}>
                        {service.title}
                        {service.subtitle ? ` · ${service.subtitle}` : ''}
                      </Text>
                      <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 12, color: pawpointColors.inkSoft }}>
                        {service.description}
                      </Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: pawpointSpacing.xs }}>
                        {service.tags.map((tag, index) => (
                          <AppChip key={tag} label={tag} active={index === 1} tone={index === 1 ? 'accent' : 'neutral'} />
                        ))}
                      </View>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 4 }}>
                      <Text selectable style={{ fontFamily: pawpointFonts.serif, fontSize: 24, color: pawpointColors.ink }}>
                        {formatCurrency(service.price)}
                      </Text>
                      <Text selectable style={{ fontFamily: pawpointFonts.mono, fontSize: 10, color: pawpointColors.inkSoft }}>
                        includes {formatCurrency(service.holdAmount)} Shield hold
                      </Text>
                    </View>
                  </View>
                </Card>
              )}
            </Pressable>
          );
        })}
      </View>

      <InfoBanner title="Trust mechanics stay explicit" body={shop.trustedNote} />
    </MobilePage>
  );
}
