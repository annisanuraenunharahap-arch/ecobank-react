import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '../theme';

// Komponen 4: kartu tips (props: tip, onPress)
export default function TipCard({ tip, onPress }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[s.iconBox, { backgroundColor: tip.warna + '22' }]}>
        <Ionicons name={tip.icon} size={24} color={tip.warna} />
      </View>
      <Text style={s.judul}>{tip.judul}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    ...shadow,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  judul: { flex: 1, fontWeight: '700', color: colors.text, fontSize: 15, marginRight: 8 },
});