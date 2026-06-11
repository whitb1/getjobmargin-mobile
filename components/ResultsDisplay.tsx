import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { calculateMargin } from '@/lib/calculator';

interface ResultsDisplayProps {
  trade: string;
  materials: number;
  labor: number;
  subcontractor: number;
  equipment: number;
  salesCommission: number;
  ownerTime: number;
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
  ownerTime,
  overheadPercent,
  targetMarginPercent,
}: ResultsDisplayProps) {
  const costs = {
    materials,
    labor,
    subcontractor,
    equipment,
    salesCommission,
    ownerTime,
  };

  const result = calculateMargin(costs, overheadPercent, targetMarginPercent);

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <Text style={styles.cardTitle}>Direct Costs</Text>
        <View style={styles.costBreakdown}>
          {materials > 0 && (
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Materials</Text>
              <Text style={styles.costValue}>${materials.toFixed(2)}</Text>
            </View>
          )}
          {labor > 0 && (
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Labor</Text>
              <Text style={styles.costValue}>${labor.toFixed(2)}</Text>
            </View>
          )}
          {subcontractor > 0 && (
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Subcontractor</Text>
              <Text style={styles.costValue}>${subcontractor.toFixed(2)}</Text>
            </View>
          )}
          {equipment > 0 && (
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Equipment</Text>
              <Text style={styles.costValue}>${equipment.toFixed(2)}</Text>
            </View>
          )}
          {salesCommission > 0 && (
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Sales Commission</Text>
              <Text style={styles.costValue}>${salesCommission.toFixed(2)}</Text>
            </View>
          )}
          {ownerTime > 0 && (
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Owner Time</Text>
              <Text style={styles.costValue}>${ownerTime.toFixed(2)}</Text>
            </View>
          )}
        </View>
        <View style={styles.divider} />
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Total Direct Cost</Text>
          <Text style={styles.costValueLarge}>${result.directCost.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.cardTitle}>Pricing & Profit</Text>
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Total with Overhead ({overheadPercent}%)</Text>
          <Text style={styles.costValue}>${result.totalWithOverhead.toFixed(2)}</Text>
        </View>
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Recommended Price ({targetMarginPercent}% margin)</Text>
          <Text style={[styles.costValue, styles.recommended]}>
            ${result.recommendedPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Gross Profit</Text>
          <Text style={styles.profitValue}>${result.grossProfit.toFixed(2)}</Text>
        </View>
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Profit Margin %</Text>
          <Text style={styles.profitValue}>{result.marginPercent.toFixed(1)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#48D2B4',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48D2B4',
    marginBottom: 12,
  },
  costBreakdown: {
    gap: 8,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 13,
    color: '#cccccc',
  },
  costValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  costValueLarge: {
    fontSize: 16,
    fontWeight: '700',
    color: '#48D2B4',
  },
  recommended: {
    color: '#48D2B4',
    fontSize: 15,
  },
  profitValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#48D2B4',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 8,
  },
});
