import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '../theme';

export default function TipDetailScreen({ route }) {
  const { tip } = route.params; // data dikirim lewat navigasi

  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: 20 }}>
      <View style={[s.iconBox, { backgroundColor: tip.warna + '22' }]}>
        <Ionicons name={tip.icon} size={48} color={tip.warna} />
      </View>
      <Text style={s.judul}>{tip.judul}</Text>
      <View style={s.card}>
        <Text style={s.isi}>{tip.isi}</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  iconBox: {
    width: 96, height: 96, borderRadius: 32, alignSelf: 'center',
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  judul: {
    fontSize: 24, fontWeight: '800', color: colors.text,
    textAlign: 'center', marginVertical: 18,
  },
  card: { backgroundColor: colors.card, borderRadius: 20, padding: 20, ...shadow },
  isi: { fontSize: 16, lineHeight: 26, color: colors.text },
});