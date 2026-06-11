import React from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, Pressable, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

interface SavedJob {
  id: string;
  trade: string;
  date: string;
  directCost: number;
  totalWithOverhead: number;
  recommendedPrice: number;
  grossProfit: number;
}

export default function JobsScreen() {
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const jobsData = await SecureStore.getItemAsync('saved_jobs');
      if (jobsData) {
        setJobs(JSON.parse(jobsData));
      }
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    await SecureStore.setItemAsync('saved_jobs', JSON.stringify(updated));
  };

  const renderJobCard = ({ item }: { item: SavedJob }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View>
          <Text style={styles.jobTitle}>{item.trade}</Text>
          <Text style={styles.jobDate}>{item.date}</Text>
        </View>
        <Pressable onPress={() => deleteJob(item.id)}>
          <Ionicons name="trash" size={20} color="#ff6b6b" />
        </Pressable>
      </View>
      <View style={styles.jobStats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Direct Cost</Text>
          <Text style={styles.statValue}>${item.directCost.toFixed(2)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Recommended Price</Text>
          <Text style={styles.statValue}>${item.recommendedPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Gross Profit</Text>
          <Text style={styles.statValue}>${item.grossProfit.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', height: windowHeight }]}>
        <Text style={styles.emptyText}>Loading jobs...</Text>
      </View>
    );
  }

  if (jobs.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', height: windowHeight }]}>
        <Ionicons name="briefcase" size={48} color="#48D2B4" />
        <Text style={styles.emptyText}>No saved jobs yet</Text>
        <Text style={styles.emptySubtext}>Create your first job calculation</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      renderItem={renderJobCard}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  listContent: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderColor: '#333333',
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#48D2B4',
  },
  jobDate: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  jobStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cccccc',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
  },
});
