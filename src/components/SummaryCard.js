import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '../theme';

// Komponen 1: kartu ringkasan (props: label, nilai, icon, warna)
export default function SummaryCard({ label, nilai, icon, warna = colors.primary }) {
  return (
    <View style={s.card}>
      <View style={[s.iconBox, { backgroundColor: warna + '22' }]}>
        <Ionicons name={icon} size={22} color={warna} />
      </View>
      <Text style={s.nilai}>{nilai}</Text>
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 20,
    ...shadow,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  nilai: { fontSize: 20, fontWeight: '800', color: colors.text },
  label: { fontSize: 12, color: colors.muted, marginTop: 2 },
});