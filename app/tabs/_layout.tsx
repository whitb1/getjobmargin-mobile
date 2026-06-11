import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#48D2B4',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333333',
          borderTopWidth: 1,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#111111',
        },
        headerTintColor: '#48D2B4',
        headerTitleStyle: {
          fontWeight: '600',
          color: '#ffffff',
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
