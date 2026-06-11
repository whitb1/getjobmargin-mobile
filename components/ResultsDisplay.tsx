import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '@/lib/theme';
import { calculateMargin } from '@/lib/calculator';

interface ResultsDisplayProps {
  trade: string;
  materials: number;
  labor: number;
  subcontractor: number;
  equipment: number;
  salesCommission: number;
  ownerHours: number;
  ownerHourlyRate: number;
  overheadPercent: number;
  targetMarginPercent: number;
}

export default function ResultsDisplay({
  trade,
  materials,
  labor,
  subcontractor,
  equipment,
  salesCommission,
  ownerHours,
  ownerHourlyRate,
  overheadPercent,
  targetMarginPercent,
}: ResultsDisplayProps) {
  const costs = {
    materials,
    labor,
    subcontractor,
    equipment,
    salesCommission,
    ownerHours,
    ownerHourlyRate,
  };

  const result = calculateMargin(costs, overheadPercent, targetMarginPercent);
  const alertColor =
    result.alertLevel === 'danger' ? COLORS.danger :
    result.alertLevel === 'warning' ? COLORS.warning :
    COLORS.success;

  const maxCost = Math.max(...result.costBreakdown.map((item) => item.amount));
  const maxBarWidth = 200; // pixels

  return (
    <View style={styles.container}>
      {/* Alert Banner */}
      <View style={[styles.alertBanner, { backgroundColor: `${alertColor}15` }]}>
        <View style={[styles.alertDot, { backgroundColor: alertColor }]} />
        <View style={styles.alertContent}>
          <Text style={[styles.alertTitle, { color: alertColor }]}>
            {result.alertLevel === 'danger' ? '⚠️ Low Margin' :
             result.alertLevel === 'warning' ? '⚠️ Moderate Margin' :
             '✓ Healthy Margin'}
          </Text>
          <Text style={styles.alertMessage}>
            {result.marginPercent.toFixed(1)}% margin
          </Text>
        </View>
      </View>

      {/* Main Results Card */}
      <View style={styles.resultCard}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Direct Cost</Text>
          <Text style={styles.priceValue}>${result.directCost.toFixed(2)}</Text>
          <View style={styles.spacer} />
          <Text style={styles.priceLabel}>+ Overhead</Text>
          <Text style={styles.priceValue}>${result.overheadAmount.toFixed(2)}</Text>
          <View style={styles.spacer} />
          <Text style={styles.priceLabel}>= Total Cost</Text>
          <Text style={styles.priceValue}>${result.totalWithOverhead.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedLabel}>Recommended Price</Text>
          <Text style={styles.recommendedPrice}>${result.recommendedPrice.toFixed(2)}</Text>
          <Text style={styles.profitText}>Gross Profit: ${result.grossProfit.toFixed(2)}</Text>
        </View>
      </View>

      {/* Cost Breakdown Chart */}
      <View style={styles.breakdownCard}>
        <Text style={styles.breakdownTitle}>Cost Breakdown</Text>
        <View style={styles.chartContainer}>
          {result.costBreakdown.map((item, index) => (
            <View key={index} style={styles.chartItem}>
              <Text style={styles.chartLabel}>{item.label}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { width: `${(item.amount / maxCost) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.chartValue}>${item.amount.toFixed(0)} ({item.percent.toFixed(0)}%)</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    marginBottom: SPACING.md,
  },
  alertDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertMessage: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  resultCard: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.teal,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  priceSection: {
    gap: SPACING.md,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
  },
  spacer: {
    height: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  recommendedSection: {
    alignItems: 'center',
  },
  recommendedLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  recommendedPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.teal,
    marginVertical: SPACING.sm,
  },
  profitText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  breakdownCard: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: SPACING.md,
  },
  chartContainer: {
    gap: SPACING.md,
  },
  chartItem: {
    gap: SPACING.sm,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  barContainer: {
    height: 24,
    backgroundColor: COLORS.bg,
    borderRadius: BORDER_RADIUS.small,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: COLORS.teal,
  },
  chartValue: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
});
