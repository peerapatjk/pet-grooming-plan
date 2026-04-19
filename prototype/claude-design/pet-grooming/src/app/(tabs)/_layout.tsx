import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

import { pawpointColors, pawpointFonts, pawpointShadow } from '@/features/customer/design';

function TabIcon({ active }: { active: boolean }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 5,
        backgroundColor: active ? pawpointColors.primary : pawpointColors.paper3,
      }}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: pawpointColors.primaryInk,
        tabBarInactiveTintColor: pawpointColors.inkSoft,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: pawpointColors.paper,
          borderTopColor: pawpointColors.border,
          height: 84,
          paddingTop: 8,
          paddingBottom: 16,
          boxShadow: pawpointShadow.sm,
        },
        tabBarLabelStyle: {
          fontFamily: pawpointFonts.monoMedium,
          fontSize: 10,
          letterSpacing: 1.1,
          textTransform: 'uppercase',
        },
      }}>
      {[
        ['home', 'Home'],
        ['book', 'Book'],
        ['visits', 'Visits'],
        ['you', 'You'],
      ].map(([name, title]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => <TabIcon active={focused} />,
            tabBarLabel: ({ color }) => (
              <Text
                style={{
                  color,
                  fontFamily: pawpointFonts.monoMedium,
                  fontSize: 10,
                  letterSpacing: 1.1,
                  textTransform: 'uppercase',
                }}>
                {title}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
