import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, rupiah, shadow } from '../theme';

// Komponen 2: pilihan jenis sampah (props: jenis, aktif, onPress)
export default function WasteTypeChip({ jenis, aktif, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[s.chip, aktif && { backgroundColor: jenis.warna }]}
    >
      <View style={[s.iconBox, { backgroundColor: aktif ? 'rgba(255,255,255,0.25)' : jenis.warna + '22' }]}>
        <Ionicons name={jenis.icon} size={24} color={aktif ? '#fff' : jenis.warna} />
      </View>
      <Text style={[s.nama, aktif && { color: '#fff' }]}>{jenis.nama}</Text>
      <Text style={[s.harga, aktif && { color: 'rgba(255,255,255,0.9)' }]}>
        {rupiah(jenis.harga)}/kg
      </Text>
      {aktif && (
        <Ionicons name="checkmark-circle" size={20} color="#fff" style={s.check} />
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  chip: {
    width: '48%',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    ...shadow,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  nama: { fontWeight: '700', color: colors.text, fontSize: 15 },
  harga: { fontSize: 12, color: colors.muted, marginTop: 2 },
  check: { position: 'absolute', top: 12, right: 12 },
});