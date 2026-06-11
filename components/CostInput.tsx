import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '@/lib/theme';

interface CostInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  keyboardType?: 'decimal-pad' | 'numeric';
}

export default function CostInput({
  label,
  value,
  onChange,
  keyboardType = 'decimal-pad',
}: CostInputProps) {
  const isPercentage = label.includes('%');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {!isPercentage && <Text style={styles.prefix}>$</Text>}
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor={COLORS.textTertiary}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
        />
        {isPercentage && <Text style={styles.suffix}>%</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.small,
    paddingHorizontal: SPACING.md,
  },
  prefix: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.teal,
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.sm,
    color: COLORS.ink,
    fontSize: 13,
  },
  suffix: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.teal,
    marginLeft: SPACING.xs,
  },
});
