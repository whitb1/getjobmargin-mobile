import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface PaywallContextType {
  isSubscribed: boolean;
  subscriptionPlan: 'monthly' | 'annual' | null;
  setPurchased: (plan: 'monthly' | 'annual') => void;
}

const PaywallContext = createContext<PaywallContextType | undefined>(undefined);

export const PaywallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<'monthly' | 'annual' | null>(null);

  useEffect(() => {
    // Check subscription status from secure store
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const status = await SecureStore.getItemAsync('subscription_status');
      const plan = await SecureStore.getItemAsync('subscription_plan');
      if (status === 'active' && plan) {
        setIsSubscribed(true);
        setSubscriptionPlan(plan as 'monthly' | 'annual');
      }
    } catch (error) {
      console.error('Failed to check subscription:', error);
    }
  };

  const setPurchased = async (plan: 'monthly' | 'annual') => {
    try {
      await SecureStore.setItemAsync('subscription_status', 'active');
      await SecureStore.setItemAsync('subscription_plan', plan);
      await SecureStore.setItemAsync('subscription_start', new Date().toISOString());
      setIsSubscribed(true);
      setSubscriptionPlan(plan);
    } catch (error) {
      console.error('Failed to set subscription:', error);
    }
  };

  return (
    <PaywallContext.Provider value={{ isSubscribed, subscriptionPlan, setPurchased }}>
      {children}
    </PaywallContext.Provider>
  );
};

export const usePaywall = () => {
  const context = useContext(PaywallContext);
  if (!context) {
    throw new Error('usePaywall must be used within PaywallProvider');
  }
  return context;
};
