import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

interface CostInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CostInput({ label, value, onChange }: CostInputProps) {
  const isPercentage = label.includes('%');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {!isPercentage && <Text style={styles.prefix}>$</Text>}
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#666666"
          value={value}
          onChangeText={onChange}
          keyboardType="decimal-pad"
        />
        {isPercentage && <Text style={styles.suffix}>%</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#cccccc',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  prefix: {
    fontSize: 14,
    fontWeight: '500',
    color: '#48D2B4',
    marginRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 13,
  },
  suffix: {
    fontSize: 14,
    fontWeight: '500',
    color: '#48D2B4',
    marginLeft: 4,
  },
});
