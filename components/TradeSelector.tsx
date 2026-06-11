import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#cccccc',
    marginBottom: 8,
  },
  scrollView: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    gap: 8,
  },
  tradeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    borderColor: '#333333',
    borderWidth: 1,
  },
  tradeButtonActive: {
    backgroundColor: '#48D2B4',
    borderColor: '#48D2B4',
  },
  tradeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
  },
  tradeTextActive: {
    color: '#111111',
  },
});
