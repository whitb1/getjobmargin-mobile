import React from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { usePaywall } from '@/lib/paywall';
import TradeSelector from '@/components/TradeSelector';
import CostInput from '@/components/CostInput';
import ResultsDisplay from '@/components/ResultsDisplay';
import { calculateMargin } from '@/lib/calculator';

const TRADES = ['Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Landscaping', 'General'];

export default function HomeScreen() {
  const router = useRouter();
  const { isSubscribed } = usePaywall();
  const [trade, setTrade] = useState('Roofing');
  const [zipCode, setZipCode] = useState('');
  const [materials, setMaterials] = useState('');
  const [labor, setLabor] = useState('');
  const [subcontractor, setSubcontractor] = useState('');
  const [equipment, setEquipment] = useState('');
  const [salesCommission, setSalesCommission] = useState('');
  const [ownerTime, setOwnerTime] = useState('');
  const [overheadPercent, setOverheadPercent] = useState('15');
  const [targetMarginPercent, setTargetMarginPercent] = useState('20');
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    const costs = {
      materials: parseFloat(materials) || 0,
      labor: parseFloat(labor) || 0,
      subcontractor: parseFloat(subcontractor) || 0,
      equipment: parseFloat(equipment) || 0,
      salesCommission: parseFloat(salesCommission) || 0,
      ownerTime: parseFloat(ownerTime) || 0,
    };

    const result = calculateMargin(
      costs,
      parseFloat(overheadPercent) || 0,
      parseFloat(targetMarginPercent) || 0
    );

    setShowResults(true);
  };

  const handleSaveJob = () => {
    if (!isSubscribed && !zipCode) {
      router.push('/paywall');
      return;
    }
    // Save logic will be implemented
  };

  const handleAdvisor = () => {
    if (!isSubscribed) {
      router.push('/paywall');
      return;
    }
    router.push('/advisor');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Trade Selector */}
        <TradeSelector trades={TRADES} selectedTrade={trade} onSelectTrade={setTrade} />

        {/* ZIP Code Input */}
        <View style={styles.section}>
          <Text style={styles.label}>ZIP Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ZIP code"
            placeholderTextColor="#666666"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>

        {/* Cost Inputs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Direct Costs</Text>
          <CostInput label="Materials" value={materials} onChange={setMaterials} />
          <CostInput label="Labor" value={labor} onChange={setLabor} />
          <CostInput label="Subcontractor" value={subcontractor} onChange={setSubcontractor} />
          <CostInput label="Equipment" value={equipment} onChange={setEquipment} />
          <CostInput label="Sales Commission" value={salesCommission} onChange={setSalesCommission} />
          <CostInput label="Owner Time" value={ownerTime} onChange={setOwnerTime} />
        </View>

        {/* Overhead & Margin */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overhead & Target</Text>
          <CostInput label="Overhead %" value={overheadPercent} onChange={setOverheadPercent} />
          <CostInput label="Target Margin %" value={targetMarginPercent} onChange={setTargetMarginPercent} />
        </View>

        {/* Calculate Button */}
        <Pressable style={styles.calculateButton} onPress={handleCalculate}>
          <Text style={styles.calculateButtonText}>CALCULATE</Text>
        </Pressable>

        {/* Results */}
        {showResults && (
          <ResultsDisplay
            trade={trade}
            materials={parseFloat(materials) || 0}
            labor={parseFloat(labor) || 0}
            subcontractor={parseFloat(subcontractor) || 0}
            equipment={parseFloat(equipment) || 0}
            salesCommission={parseFloat(salesCommission) || 0}
            ownerTime={parseFloat(ownerTime) || 0}
            overheadPercent={parseFloat(overheadPercent) || 0}
            targetMarginPercent={parseFloat(targetMarginPercent) || 0}
          />
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSaveJob}
          >
            <Text style={styles.buttonText}>💾 Save Job</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAdvisor}
          >
            <Text style={styles.buttonText}>🤖 AI Advisor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#48D2B4',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#cccccc',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  calculateButton: {
    backgroundColor: '#48D2B4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  calculateButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
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
