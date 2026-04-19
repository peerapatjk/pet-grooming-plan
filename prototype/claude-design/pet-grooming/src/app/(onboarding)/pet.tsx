import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { AppChip, Card, InfoBanner, MobilePage, PageTitle, PawpointButton, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';

export default function PetOnboardingScreen() {
  const router = useRouter();
  const { activePetId, completeOnboarding, pets, selectPet } = useCustomerApp();
  const activePet = pets.find((pet) => pet.id === activePetId) ?? pets[0];

  return (
    <MobilePage
      bottomBar={
        <PawpointButton
          fullWidth
          label="Find grooming near me"
          onPress={() => {
            completeOnboarding();
            router.replace('/(tabs)/home');
          }}
        />
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TopIconButton label="‹" onPress={() => router.back()} />
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.mono,
            fontSize: 10,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: pawpointColors.inkSoft,
          }}>
          Step 3 of 3
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <PageTitle
        title="Tell us about your companion"
        subtitle="Shops use this to quote accurate time and price."
      />

      <View style={{ flexDirection: 'row', gap: pawpointSpacing.sm }}>
        {pets.map((pet) => {
          const active = pet.id === activePet.id;
          return (
            <Pressable key={pet.id} style={{ flex: 1 }} onPress={() => selectPet(pet.id)}>
              {({ pressed }) => (
                <Card compact tone={active ? 'primary' : 'default'}>
                  <View style={{ gap: pawpointSpacing.sm, opacity: pressed ? 0.9 : 1 }}>
                    <Image source={pet.photo} style={{ width: '100%', aspectRatio: 1.2, borderRadius: 16 }} contentFit="cover" />
                    <View style={{ gap: 4 }}>
                      <Text
                        selectable
                        style={{
                          fontFamily: pawpointFonts.serif,
                          fontSize: 22,
                          color: pawpointColors.ink,
                        }}>
                        {pet.name}
                      </Text>
                      <Text
                        selectable
                        style={{
                          fontFamily: pawpointFonts.sans,
                          fontSize: 12,
                          color: pawpointColors.inkSoft,
                        }}>
                        {pet.breed}
                      </Text>
                    </View>
                  </View>
                </Card>
              )}
            </Pressable>
          );
        })}
      </View>

      <Card>
        <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 14, color: pawpointColors.ink }}>
          {activePet.breed}
        </Text>
        <Text selectable style={{ fontFamily: pawpointFonts.sans, fontSize: 12, color: pawpointColors.inkSoft }}>
          {activePet.weightLabel} · {activePet.coat} · {activePet.ageLabel}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: pawpointSpacing.xs }}>
          {activePet.flags.map((flag, index) => (
            <AppChip key={flag} label={flag} active={index === 0} tone={index === 2 ? 'accent' : 'neutral'} />
          ))}
        </View>
      </Card>

      <InfoBanner
        title="Why we ask"
        body="Weight and coat drive pricing. Flags help your groomer prep supplies and plan time before you arrive."
      />
    </MobilePage>
  );
}
