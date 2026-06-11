import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePaywall } from '@/lib/paywall';
import { COLORS, BORDER_RADIUS, SPACING } from '@/lib/theme';
import axios from 'axios';

const AI_ADVISOR_URL = 'https://gjm-ai-advisor.whit-barr.workers.dev';

interface Advice {
  category: string;
  recommendation: string;
  reason: string;
}

export default function AdvisorScreen() {
  const router = useRouter();
  const { isGuest } = usePaywall();
  const [loading, setLoading] = useState(true);
  const [advice, setAdvice] = useState<Advice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If guest mode, show placeholder
    if (isGuest) {
      setAdvice([
        {
          category: 'Upgrade Required',
          recommendation: 'Sign in to access AI Margin Advisor',
          reason: 'AI analysis requires a subscription to provide actionable insights',
        },
      ]);
      setLoading(false);
      return;
    }

    // Call AI Advisor API
    callAIAdvisor();
  }, [isGuest]);

  const callAIAdvisor = async () => {
    try {
      // Get job data from navigation params or use defaults
      const response = await axios.post(AI_ADVISOR_URL, {
        trade: 'Roofing',
        materials: 3500,
        labor: 1500,
        subcontractor: 500,
        equipment: 200,
        commission: 300,
        overhead: 15,
        targetMargin: 25,
        zipCode: '75001',
      });

      if (response.data.advice && Array.isArray(response.data.advice)) {
        setAdvice(response.data.advice);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('AI Advisor error:', err);
      setError('Failed to get AI advice. Please try again.');
      // Fallback to demo advice
      setAdvice([
        {
          category: 'Pricing',
          recommendation: 'Consider increasing your target margin to 25%',
          reason: 'Industry benchmark for similar trades is 22-28%',
        },
        {
          category: 'Labor Costs',
          recommendation: 'Review labor allocation with team leads',
          reason: 'Labor costs are tracking within regional averages',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.teal} />
          </Pressable>
          <Text style={styles.title}>AI Margin Advisor</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Error State */}
        {error && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={20} color={COLORS.danger} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Loading State */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.teal} />
            <Text style={styles.loadingText}>Analyzing your job...</Text>
          </View>
        ) : (
          <>
            {/* Advice Cards */}
            {advice.map((item, index) => (
              <View key={index} style={styles.adviceCard}>
                <View style={styles.adviceHeader}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                </View>
                <Text style={styles.recommendation}>{item.recommendation}</Text>
                <View style={styles.reasonContainer}>
                  <Ionicons name="information-circle" size={16} color={COLORS.teal} />
                  <Text style={styles.reason}>{item.reason}</Text>
                </View>
              </View>
            ))}

            {/* Summary */}
            {!isGuest && (
              <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                  <Ionicons name="trending-up" size={24} color={COLORS.teal} />
                  <Text style={styles.summaryTitle}>Analysis Summary</Text>
                </View>
                <Text style={styles.summaryText}>
                  Based on current market conditions and regional data, your pricing strategy is competitive. 
                  Consider the recommendations above to optimize profitability while maintaining competitiveness.
                </Text>
              </View>
            )}
          </>
        )}

        {/* Action Buttons */}
        <View style={styles.bottomButtons}>
          <Pressable
            style={styles.button}
            onPress={() => router.push('/tabs')}
          >
            <Ionicons name="arrow-back" size={16} color={COLORS.teal} />
            <Text style={styles.buttonText}>Back to Calculator</Text>
          </Pressable>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
  },
  errorBanner: {
    backgroundColor: `${COLORS.danger}15`,
    borderColor: COLORS.danger,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.medium,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginLeft: SPACING.md,
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  adviceCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.medium,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  adviceHeader: {
    marginBottom: SPACING.md,
  },
  categoryBadge: {
    backgroundColor: `${COLORS.teal}15`,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.teal,
  },
  recommendation: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: SPACING.sm,
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  reason: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  summaryCard: {
    backgroundColor: `${COLORS.teal}10`,
    borderRadius: BORDER_RADIUS.medium,
    borderColor: COLORS.teal,
    borderWidth: 1,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.teal,
  },
  summaryText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bottomButtons: {
    marginBottom: SPACING.xl,
  },
  button: {
    backgroundColor: COLORS.card,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLORS.teal,
    borderWidth: 1,
    gap: SPACING.sm,
  },
  buttonText: {
    color: COLORS.teal,
    fontSize: 14,
    fontWeight: '600',
  },
});
