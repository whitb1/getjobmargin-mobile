import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Advice {
  category: string;
  recommendation: string;
  reason: string;
}

export default function AdvisorScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [advice, setAdvice] = useState<Advice[]>([]);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setAdvice([
        {
          category: 'Pricing',
          recommendation: 'Consider increasing your target margin to 25%',
          reason: 'Industry benchmark for similar trades is 22-28%',
        },
        {
          category: 'Labor Costs',
          recommendation: 'Review labor allocation with team leads',
          reason: 'Labor costs are 5% higher than regional average',
        },
        {
          category: 'Overhead',
          recommendation: 'Optimize overhead to 12% if possible',
          reason: 'Current overhead structure could be streamlined',
        },
        {
          category: 'Profitability',
          recommendation: 'This job meets minimum margin requirements',
          reason: 'Projected profit margin is healthy for your market',
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#48D2B4" />
          </Pressable>
          <Text style={styles.title}>AI Margin Advisor</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Loading State */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#48D2B4" />
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
                  <Ionicons name="information-circle" size={16} color="#48D2B4" />
                  <Text style={styles.reason}>{item.reason}</Text>
                </View>
              </View>
            ))}

            {/* Summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Ionicons name="trending-up" size={24} color="#48D2B4" />
                <Text style={styles.summaryTitle}>Analysis Summary</Text>
              </View>
              <Text style={styles.summaryText}>
                Based on current market conditions and regional data, your pricing strategy is competitive. 
                Consider the recommendations above to optimize profitability while maintaining competitiveness.
              </Text>
              <Pressable style={styles.exportButton}>
                <Ionicons name="download" size={16} color="#111111" />
                <Text style={styles.exportButtonText}>Export Report</Text>
              </Pressable>
            </View>
          </>
        )}

        {/* Action Buttons */}
        <View style={styles.bottomButtons}>
          <Pressable
            style={styles.button}
            onPress={() => router.push('/tabs')}
          >
            <Text style={styles.buttonText}>← Back to Calculator</Text>
          </Pressable>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
    color: '#ffffff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999999',
  },
  adviceCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderColor: '#333333',
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  adviceHeader: {
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#1a3a32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#48D2B4',
  },
  recommendation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  reason: {
    fontSize: 12,
    color: '#999999',
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#1a3a32',
    borderRadius: 8,
    borderColor: '#48D2B4',
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#48D2B4',
  },
  summaryText: {
    fontSize: 13,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 16,
  },
  exportButton: {
    backgroundColor: '#48D2B4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },
  exportButtonText: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '600',
  },
  bottomButtons: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#48D2B4',
    borderWidth: 1,
  },
  buttonText: {
    color: '#48D2B4',
    fontSize: 14,
    fontWeight: '600',
  },
});
