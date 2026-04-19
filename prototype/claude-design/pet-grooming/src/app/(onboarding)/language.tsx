import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Card, MobilePage, PageTitle, PawpointButton, TopIconButton } from '@/features/customer/ui';
import { pawpointColors, pawpointFonts, pawpointRadius, pawpointSpacing } from '@/features/customer/design';
import { useCustomerApp } from '@/features/customer/provider';

export default function LanguageScreen() {
  const router = useRouter();
  const { languages, selectedLanguage, setLanguage } = useCustomerApp();

  return (
    <MobilePage
      bottomBar={
        <PawpointButton
          fullWidth
          label="Continue"
          onPress={() => {
            router.push('/(onboarding)/otp');
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
          Step 1 of 3
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <PageTitle
        title="Choose your language"
        subtitle="Switchable anytime in Settings."
      />

      <View style={{ gap: pawpointSpacing.sm }}>
        {languages.map((language) => {
          const active = language.id === selectedLanguage;
          return (
            <Pressable key={language.id} onPress={() => setLanguage(language.id)}>
              {({ pressed }) => (
                <Card compact tone={active ? 'primary' : 'soft'}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      opacity: pressed ? 0.88 : 1,
                    }}>
                    <View style={{ gap: 4 }}>
                      <Text
                        selectable
                        style={{
                          fontFamily: language.id === 'th' ? pawpointFonts.thai : pawpointFonts.serif,
                          fontSize: 24,
                          lineHeight: 26,
                          color: pawpointColors.ink,
                        }}>
                        {language.nativeLabel}
                      </Text>
                      <Text
                        selectable
                        style={{
                          fontFamily: pawpointFonts.sans,
                          fontSize: 12,
                          color: pawpointColors.inkSoft,
                        }}>
                        {language.label} · {language.description}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: pawpointRadius.pill,
                        borderWidth: 1,
                        borderColor: active ? pawpointColors.primary : pawpointColors.paperStrong,
                        backgroundColor: active ? pawpointColors.primary : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: active ? pawpointColors.paperRaised : 'transparent',
                          fontWeight: 700,
                        }}>
                        ✓
                      </Text>
                    </View>
                  </View>
                </Card>
              )}
            </Pressable>
          );
        })}
      </View>
    </MobilePage>
  );
}
