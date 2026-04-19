import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

import { pawpointColors, pawpointFonts } from '@/features/customer/design';

function TabIcon({ active }: { active: boolean }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        backgroundColor: active ? pawpointColors.primary : pawpointColors.paperStrong,
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
          backgroundColor: pawpointColors.paperRaised,
          borderTopColor: pawpointColors.paperStrong,
          height: 82,
          paddingTop: 8,
          paddingBottom: 14,
        },
        tabBarLabelStyle: {
          fontFamily: pawpointFonts.mono,
          fontSize: 10,
          letterSpacing: 1,
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
                  fontFamily: pawpointFonts.mono,
                  fontSize: 10,
                  letterSpacing: 1,
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
