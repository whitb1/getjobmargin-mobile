import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, SafeAreaView, Linking } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePaywall } from '@/lib/paywall';
import { COLORS, BORDER_RADIUS, SPACING } from '@/lib/theme';

const MONTHLY_LINK = 'https://buy.stripe.com/test/5kA14jbU87Ed6Pe144' ; // plink_1TbVV4PpWuYRuNqjfUXxJ2zR
const ANNUAL_LINK = 'https://buy.stripe.com/test/7sI6pu6Mo8Ef8Ra289'; // plink_1TbVbFPpWuYRuNqjs4v8NVNc

export default function PaywallScreen() {
  const router = useRouter();
  const { setPurchased } = usePaywall();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const handlePurchase = async (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
    setIsOpening(true);

    const url = plan === 'monthly' ? MONTHLY_LINK : ANNUAL_LINK;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        // After returning from Stripe, simulate purchase
        setTimeout(() => {
          setPurchased(plan);
          router.back();
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to open Stripe:', error);
      alert('Could not open payment page. Please try again.');
    } finally {
      setIsOpening(false);
    }
  };

  const features = [
    'AI Margin Advisor',
    'Smart pricing recommendations',
    'Advanced cost analysis',
    'Multiple job comparisons',
    'Export reports',
    'Unlimited job saves',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.ink} />
        </Pressable>

        <View style={styles.header}>
          <Ionicons name="star" size={48} color={COLORS.teal} />
          <Text style={styles.title}>Unlock Premium Features</Text>
          <Text style={styles.subtitle}>Access AI Margin Advisor & advanced tools</Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>What You Get:</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.teal} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.plansTitle}>Choose Your Plan</Text>

          {/* Monthly Plan */}
          <Pressable
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.planCardSelected,
            ]}
            onPress={() => handlePurchase('monthly')}
            disabled={isOpening}
          >
            <Text style={styles.planName}>Monthly</Text>
            <Text style={styles.planPrice}>$19</Text>
            <Text style={styles.planBilling}>/month</Text>
            <View style={styles.planDivider} />
            <Text style={styles.planValue}>Best for occasional jobs</Text>
          </Pressable>

          {/* Annual Plan */}
          <Pressable
            style={[
              styles.planCard,
              styles.planCardBest,
              selectedPlan === 'annual' && styles.planCardSelected,
            ]}
            onPress={() => handlePurchase('annual')}
            disabled={isOpening}
          >
            <View style={styles.bestBadge}>
              <Text style={styles.bestBadgeText}>BEST VALUE</Text>
            </View>
            <Text style={styles.planName}>Annual</Text>
            <Text style={styles.planPrice}>$170</Text>
            <Text style={styles.planBilling}>/year</Text>
            <Text style={styles.savings}>Save $58/year</Text>
            <View style={styles.planDivider} />
            <Text style={styles.planValue}>For serious contractors</Text>
          </Pressable>
        </View>

        {/* FAQ */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>FAQ</Text>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I cancel anytime?</Text>
            <Text style={styles.faqAnswer}>Yes, you can cancel your subscription at any time without penalties.</Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Do you offer a free trial?</Text>
            <Text style={styles.faqAnswer}>Contact support to discuss trial options for your business needs.</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          By subscribing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: SPACING.lg,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: SPACING.xxl,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.teal,
    marginBottom: SPACING.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: SPACING.md,
    flex: 1,
  },
  plansSection: {
    marginBottom: SPACING.xxl,
  },
  plansTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: SPACING.lg,
  },
  planCard: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    position: 'relative',
  },
  planCardBest: {
    borderColor: COLORS.teal,
    borderWidth: 2,
  },
  planCardSelected: {
    backgroundColor: `${COLORS.teal}10`,
    borderColor: COLORS.teal,
  },
  bestBadge: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: COLORS.teal,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
  },
  bestBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.bg,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.ink,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.teal,
    marginTop: SPACING.sm,
  },
  planBilling: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  savings: {
    fontSize: 12,
    color: COLORS.teal,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
  planDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  planValue: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  faqSection: {
    marginBottom: SPACING.xxl,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: SPACING.md,
  },
  faqItem: {
    marginBottom: SPACING.lg,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.teal,
    marginBottom: SPACING.xs,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  footer: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
});
