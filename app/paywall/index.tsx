import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MONTHLY_LINK = 'plink_1TbVV4PpWuYRuNqjfUXxJ2zR';
const ANNUAL_LINK = 'plink_1TbVbFPpWuYRuNqjs4v8NVNc';

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);

  const handlePurchase = (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
    // In production, integrate with Stripe using @stripe/stripe-react-native
    // For now, simulate purchase
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const features = [
    'AI Margin Advisor',
    'Smart pricing recommendations',
    'Advanced cost analysis',
    'Multiple job comparisons',
    'Export reports',
    'Offline access',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>

        <View style={styles.header}>
          <Ionicons name="star" size={48} color="#48D2B4" />
          <Text style={styles.title}>Unlock Premium Features</Text>
          <Text style={styles.subtitle}>Access AI Margin Advisor & advanced tools</Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>What You Get:</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#48D2B4" />
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
    backgroundColor: '#111111',
  },
  content: {
    padding: 16,
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
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#48D2B4',
    marginBottom: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 12,
    flex: 1,
  },
  plansSection: {
    marginBottom: 32,
  },
  plansTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cccccc',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    position: 'relative',
  },
  planCardBest: {
    borderColor: '#48D2B4',
    borderWidth: 2,
  },
  planCardSelected: {
    backgroundColor: '#1a3a32',
    borderColor: '#48D2B4',
  },
  bestBadge: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: '#48D2B4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bestBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#111111',
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#48D2B4',
    marginTop: 8,
  },
  planBilling: {
    fontSize: 12,
    color: '#999999',
  },
  savings: {
    fontSize: 12,
    color: '#48D2B4',
    marginTop: 4,
    fontWeight: '600',
  },
  planDivider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 12,
  },
  planValue: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cccccc',
    marginBottom: 12,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48D2B4',
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 13,
    color: '#999999',
  },
  footer: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
