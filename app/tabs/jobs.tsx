import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '@/lib/theme';

const DemoJobs = [
  {
    id: '1',
    name: 'Smith Roof Replacement',
    trade: 'Roofing',
    directCost: 3500,
    recommendedPrice: 5250,
    marginPercent: 33.3,
  },
  {
    id: '2',
    name: 'Johnson AC Unit Install',
    trade: 'HVAC',
    directCost: 2800,
    recommendedPrice: 3920,
    marginPercent: 28.6,
  },
  {
    id: '3',
    name: 'Davis Plumbing Repair',
    trade: 'Plumbing',
    directCost: 450,
    recommendedPrice: 630,
    marginPercent: 28.6,
  },
];

export default function JobsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {DemoJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Jobs Yet</Text>
            <Text style={styles.emptyMessage}>Create and save your first job to get started</Text>
          </View>
        ) : (
          <View style={styles.jobsList}>
            {DemoJobs.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobName}>{job.name}</Text>
                    <Text style={styles.jobTrade}>{job.trade}</Text>
                  </View>
                  <View
                    style={[
                      styles.marginBadge,
                      {
                        backgroundColor:
                          job.marginPercent >= 35 ? `${COLORS.success}15` :
                          job.marginPercent >= 25 ? `${COLORS.warning}15` :
                          `${COLORS.danger}15`,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.marginText,
                        {
                          color:
                            job.marginPercent >= 35 ? COLORS.success :
                            job.marginPercent >= 25 ? COLORS.warning :
                            COLORS.danger,
                        },
                      ]}
                    >
                      {job.marginPercent.toFixed(1)}%
                    </Text>
                  </View>
                </View>
                <View style={styles.jobDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Cost</Text>
                    <Text style={styles.detailValue}>${job.directCost.toFixed(0)}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Price</Text>
                    <Text style={[styles.detailValue, { color: COLORS.teal }]}>${job.recommendedPrice.toFixed(0)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: SPACING.md,
  },
  emptyMessage: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  jobsList: {
    gap: SPACING.md,
  },
  jobCard: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  jobName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ink,
  },
  jobTrade: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  marginBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
  },
  marginText: {
    fontSize: 14,
    fontWeight: '700',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
  },
});
