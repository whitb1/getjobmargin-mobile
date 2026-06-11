import React from 'react';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PaywallProvider } from '@/lib/paywall';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <PaywallProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#111111' },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="paywall" />
        <Stack.Screen name="advisor" />
      </Stack>
    </PaywallProvider>
  );
}
