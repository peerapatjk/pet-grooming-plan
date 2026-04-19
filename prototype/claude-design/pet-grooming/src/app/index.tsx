import { Redirect } from 'expo-router';

import { useCustomerApp } from '@/features/customer/provider';

export default function IndexScreen() {
  const { onboardingComplete } = useCustomerApp();

  return <Redirect href={onboardingComplete ? '/(tabs)/home' : '/(onboarding)/welcome'} />;
}
