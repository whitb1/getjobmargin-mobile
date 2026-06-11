import React from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Pressable, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { usePaywall } from '@/lib/paywall';
import TradeSelector from '@/components/TradeSelector';
import CostInput from '@/components/CostInput';
import ResultsDisplay from '@/components/ResultsDisplay';
import { calculateMargin } from '@/lib/calculator';
import { saveJob } from '@/lib/airtable';
import { COLORS, BORDER_RADIUS, SPACING } from '@/lib/theme';

const TRADES = ['Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Landscaping', 'General'];

export default function HomeScreen() {
  const router = useRouter();
  const { isSubscribed, isGuest, userEmail, setGuestMode, validateAndSetEmail } = usePaywall();
  
  const [trade, setTrade] = useState('Roofing');
  const [zipCode, setZipCode] = useState('');
  const [materials, setMaterials] = useState('');
  const [labor, setLabor] = useState('');
  const [subcontractor, setSubcontractor] = useState('');
  const [equipment, setEquipment] = useState('');
  const [salesCommission, setSalesCommission] = useState('');
  const [ownerHours, setOwnerHours] = useState('');
  const [ownerHourlyRate, setOwnerHourlyRate] = useState('');
  const [overheadPercent, setOverheadPercent] = useState('15');
  const [targetMarginPercent, setTargetMarginPercent] = useState('20');
  const [jobName, setJobName] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleCalculate = () => {
    const costs = {
      materials: parseFloat(materials) || 0,
      labor: parseFloat(labor) || 0,
      subcontractor: parseFloat(subcontractor) || 0,
      equipment: parseFloat(equipment) || 0,
      salesCommission: parseFloat(salesCommission) || 0,
      ownerHours: parseFloat(ownerHours) || 0,
      ownerHourlyRate: parseFloat(ownerHourlyRate) || 0,
    };

    setShowResults(true);
  };

  const handleSaveJob = () => {
    if (!userEmail) {
      setShowAuthModal(true);
      return;
    }

    if (!jobName.trim()) {
      alert('Please enter a job name');
      return;
    }

    performSaveJob();
  };

  const performSaveJob = async () => {
    setIsSaving(true);
    const costs = {
      materials: parseFloat(materials) || 0,
      labor: parseFloat(labor) || 0,
      subcontractor: parseFloat(subcontractor) || 0,
      equipment: parseFloat(equipment) || 0,
      salesCommission: parseFloat(salesCommission) || 0,
      ownerHours: parseFloat(ownerHours) || 0,
      ownerHourlyRate: parseFloat(ownerHourlyRate) || 0,
    };

    const result = calculateMargin(
      costs,
      parseFloat(overheadPercent) || 0,
      parseFloat(targetMarginPercent) || 0
    );

    const job = {
      Name: jobName,
      Trade: trade,
      Materials: costs.materials,
      Labor: costs.labor,
      Subcontractor: costs.subcontractor,
      Equipment: costs.equipment,
      Commission: costs.salesCommission,
      OwnerCost: costs.ownerHours * costs.ownerHourlyRate,
      Overhead: parseFloat(overheadPercent) || 0,
      Margin: parseFloat(targetMarginPercent) || 0,
      DirectCost: result.directCost,
      TotalWithOh: result.totalWithOverhead,
      RecommendedPrice: result.recommendedPrice,
      GrossProfit: result.grossProfit,
      ZIP: zipCode,
      UserEmail: userEmail!,
    };

    const success = await saveJob(job);
    setIsSaving(false);

    if (success) {
      alert('Job saved successfully!');
      // Reset form
      setJobName('');
      setMaterials('');
      setLabor('');
      setSubcontractor('');
      setEquipment('');
      setSalesCommission('');
      setOwnerHours('');
      setOwnerHourlyRate('');
      setZipCode('');
      setShowResults(false);
    } else {
      alert('Failed to save job. Please try again.');
    }
  };

  const handleAdvisor = () => {
    if (!userEmail) {
      setShowAuthModal(true);
      return;
    }
    router.push('/advisor');
  };

  const handleAuthSubmit = async () => {
    setAuthError('');
    const isValid = await validateAndSetEmail(authEmail);
    if (isValid) {
      setShowAuthModal(false);
      setAuthEmail('');
    } else {
      setAuthError('Email not found. Please contact support.');
    }
  };

  const handleGuestMode = () => {
    setGuestMode();
    setShowAuthModal(false);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Job Name Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Job Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Smith Roof Replacement"
              placeholderTextColor={COLORS.textTertiary}
              value={jobName}
              onChangeText={setJobName}
            />
          </View>

          {/* Trade Selector */}
          <TradeSelector trades={TRADES} selectedTrade={trade} onSelectTrade={setTrade} />

          {/* ZIP Code Input */}
          <View style={styles.section}>
            <Text style={styles.label}>ZIP Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter ZIP code"
              placeholderTextColor={COLORS.textTertiary}
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
            
            {/* Owner Time Split */}
            <View style={styles.ownerTimeContainer}>
              <CostInput
                label="Owner Hours"
                value={ownerHours}
                onChange={setOwnerHours}
                keyboardType="decimal-pad"
              />
              <Text style={styles.atSymbol}>@</Text>
              <CostInput
                label="Hourly Rate"
                value={ownerHourlyRate}
                onChange={setOwnerHourlyRate}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {/* Overhead & Margin */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overhead & Target Margin</Text>
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
              ownerHours={parseFloat(ownerHours) || 0}
              ownerHourlyRate={parseFloat(ownerHourlyRate) || 0}
              overheadPercent={parseFloat(overheadPercent) || 0}
              targetMarginPercent={parseFloat(targetMarginPercent) || 0}
            />
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, isSaving && styles.buttonDisabled]}
              onPress={handleSaveJob}
              disabled={isSaving}
            >
              <Text style={styles.buttonText}>{isSaving ? 'Saving...' : '💾 Save Job'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAdvisor}>
              <Text style={styles.buttonText}>🤖 AI Advisor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Auth Modal */}
      <Modal
        visible={showAuthModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAuthModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign In</Text>
            <Text style={styles.modalSubtitle}>Enter your email to access all features</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="your@email.com"
              placeholderTextColor={COLORS.textTertiary}
              value={authEmail}
              onChangeText={setAuthEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {authError && <Text style={styles.errorText}>{authError}</Text>}

            <Pressable style={styles.modalButton} onPress={handleAuthSubmit}>
              <Text style={styles.modalButtonText}>Sign In</Text>
            </Pressable>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <Pressable style={styles.guestButton} onPress={handleGuestMode}>
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </Pressable>

            <Pressable
              style={styles.closeButton}
              onPress={() => setShowAuthModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
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
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.teal,
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    color: COLORS.ink,
    fontSize: 14,
  },
  ownerTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  atSymbol: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.teal,
    marginBottom: SPACING.sm,
  },
  calculateButton: {
    backgroundColor: COLORS.teal,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  calculateButtonText: {
    color: COLORS.bg,
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.card,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    borderColor: COLORS.teal,
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.teal,
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.md,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  modalInput: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    color: COLORS.ink,
    fontSize: 14,
    marginBottom: SPACING.md,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginBottom: SPACING.md,
  },
  modalButton: {
    backgroundColor: COLORS.teal,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  modalButtonText: {
    color: COLORS.bg,
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  guestButton: {
    borderColor: COLORS.teal,
    borderWidth: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  guestButtonText: {
    color: COLORS.teal,
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: SPACING.md,
  },
  closeButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
