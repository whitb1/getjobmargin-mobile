import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '@/lib/theme';
import { TRADE_LABELS } from '@/lib/calculator';

interface TradeSelectorProps {
  trades: string[];
  selectedTrade: string;
  onSelectTrade: (trade: string) => void;
}

export default function TradeSelector({ trades, selectedTrade, onSelectTrade }: TradeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Trade Type</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {trades.map((trade) => (
          <Pressable
            key={trade}
            style={[
              styles.tradeButton,
              selectedTrade === trade && styles.tradeButtonActive,
            ]}
            onPress={() => onSelectTrade(trade)}
          >
            <Text
              style={[
                styles.tradeText,
                selectedTrade === trade && styles.tradeTextActive,
              ]}
            >
              {trade}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {selectedTrade && (
        <Text style={styles.tradeLabel}>
          {TRADE_LABELS[selectedTrade as keyof typeof TRADE_LABELS]}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  scrollView: {
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  scrollContent: {
    gap: SPACING.sm,
  },
  tradeButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  tradeButtonActive: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
  },
  tradeText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  tradeTextActive: {
    color: COLORS.bg,
  },
  tradeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
});
