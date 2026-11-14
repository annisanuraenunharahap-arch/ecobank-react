import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, rupiah, shadow } from '../theme';

// Komponen 3: satu baris riwayat (props: item, onDelete)
export default function HistoryItem({ item, onDelete }) {
  const warna = item.warna || colors.primary;
  const tgl = new Date(item.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <View style={s.row}>
      <View style={[s.iconBox, { backgroundColor: warna + '22' }]}>
        <Ionicons name={item.icon || 'leaf'} size={22} color={warna} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.nama}>{item.nama}</Text>
        <Text style={s.tgl}>
          {item.berat} kg · {tgl}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={s.rp}>+{rupiah(item.total)}</Text>
        {onDelete && (
          <TouchableOpacity onPress={() => onDelete(item.id)} hitSlop={10} style={{ marginTop: 6 }}>
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    ...shadow,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nama: { fontWeight: '700', color: colors.text, fontSize: 15 },
  tgl: { fontSize: 12, color: colors.muted, marginTop: 2 },
  rp: { color: colors.primary, fontWeight: '800', fontSize: 15 },
});