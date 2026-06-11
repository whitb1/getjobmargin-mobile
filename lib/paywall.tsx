import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { validateEmail } from './airtable';

interface PaywallContextType {
  isSubscribed: boolean;
  isGuest: boolean;
  userEmail: string | null;
  subscriptionPlan: 'monthly' | 'annual' | null;
  setPurchased: (plan: 'monthly' | 'annual') => void;
  setUserEmail: (email: string) => void;
  validateAndSetEmail: (email: string) => Promise<boolean>;
  setGuestMode: () => void;
}

const PaywallContext = createContext<PaywallContextType | undefined>(undefined);

export const PaywallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [userEmail, setUserEmailState] = useState<string | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<'monthly' | 'annual' | null>(null);

  useEffect(() => {
    // Check subscription status and email from secure store
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const email = await SecureStore.getItemAsync('user_email');
      const status = await SecureStore.getItemAsync('subscription_status');
      const plan = await SecureStore.getItemAsync('subscription_plan');
      const guestFlag = await SecureStore.getItemAsync('guest_mode');

      if (email) setUserEmailState(email);
      if (guestFlag === 'true') setIsGuest(true);
      if (status === 'active' && plan) {
        setIsSubscribed(true);
        setSubscriptionPlan(plan as 'monthly' | 'annual');
      }
    } catch (error) {
      console.error('Failed to check auth:', error);
    }
  };

  const validateAndSetEmail = async (email: string): Promise<boolean> => {
    try {
      const isValid = await validateEmail(email);
      if (isValid) {
        await SecureStore.setItemAsync('user_email', email);
        setUserEmailState(email);
      }
      return isValid;
    } catch (error) {
      console.error('Email validation error:', error);
      return false;
    }
  };

  const setUserEmail = (email: string) => {
    SecureStore.setItemAsync('user_email', email).catch((err) =>
      console.error('Failed to set email:', err)
    );
    setUserEmailState(email);
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

  const setGuestMode = async () => {
    try {
      await SecureStore.setItemAsync('guest_mode', 'true');
      setIsGuest(true);
    } catch (error) {
      console.error('Failed to set guest mode:', error);
    }
  };

  return (
    <PaywallContext.Provider
      value={{
        isSubscribed,
        isGuest,
        userEmail,
        subscriptionPlan,
        setPurchased,
        setUserEmail,
        validateAndSetEmail,
        setGuestMode,
      }}
    >
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
