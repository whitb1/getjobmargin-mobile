import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/lib/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.teal,
        tabBarInactiveTintColor: COLORS.textTertiary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.bg,
          borderBottomColor: COLORS.border,
          borderBottomWidth: 1,
        },
        headerTintColor: COLORS.teal,
        headerTitleStyle: {
          fontWeight: '600',
          color: COLORS.ink,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'New Job',
          tabBarLabel: 'New Job',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={24} color={color} />
          ),
          headerTitle: 'Calculate Margin',
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Saved Jobs',
          tabBarLabel: 'Saved Jobs',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
          headerTitle: 'Saved Jobs',
        }}
      />
    </Tabs>
  );
}
