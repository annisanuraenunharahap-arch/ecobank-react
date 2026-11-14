import React, { useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SummaryCard from '../components/SummaryCard';
import HistoryItem from '../components/HistoryItem';
import { useWaste } from '../context/WasteContext';
import { colors, rupiah } from '../theme';

export default function HomeScreen({ navigation }) {
  const { setoran } = useWaste();
  const insets = useSafeAreaInsets();

  // Hook useMemo: hitung ringkasan hanya saat data berubah
  const ringkas = useMemo(() => {
    const saldo = setoran.reduce((a, b) => a + b.total, 0);
    const berat = setoran.reduce((a, b) => a + b.berat, 0);
    return { saldo, berat, jumlah: setoran.length };
  }, [setoran]);

  const terakhir = setoran.slice(0, 3);

  return (
    <ScrollView
      style={s.wrap}
      contentContainerStyle={{ paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[s.hero, { paddingTop: insets.top + 20 }]}>
        <View style={s.circle1} />
        <View style={s.circle2} />
        <Text style={s.hai}>Halo, Pahlawan Lingkungan 👋</Text>
        <Text style={s.label}>Saldo Tabungan</Text>
        <Text style={s.saldo}>{rupiah(ringkas.saldo)}</Text>
        <TouchableOpacity style={s.cta} onPress={() => navigation.navigate('Setor')}>
          <Ionicons name="add" size={20} color={colors.dark} />
          <Text style={s.ctaTxt}>Setor Sampah</Text>
        </TouchableOpacity>
      </View>

      <View style={s.body}>
        <View style={s.row}>
          <SummaryCard label="Total Sampah" nilai={`${ringkas.berat.toFixed(1)} kg`} icon="scale" warna="#3B82F6" />
          <View style={{ width: 12 }} />
          <SummaryCard label="Jumlah Setoran" nilai={`${ringkas.jumlah}x`} icon="receipt" warna="#F59E0B" />
        </View>

        <View style={s.sectionHead}>
          <Text style={s.section}>Setoran Terakhir</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
            <Text style={s.link}>Lihat semua</Text>
          </TouchableOpacity>
        </View>

        {terakhir.length === 0 ? (
          <View style={s.empty}>
            <Ionicons name="leaf-outline" size={40} color={colors.muted} />
            <Text style={s.emptyTxt}>Belum ada setoran. Yuk mulai setor! 🌱</Text>
          </View>
        ) : (
          terakhir.map((item) => <HistoryItem key={item.id} item={item} />)
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  hero: {
    backgroundColor: colors.dark,
    paddingHorizontal: 22,
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(16,185,129,0.25)', top: -60, right: -50,
  },
  circle2: {
    position: 'absolute', width: 130, height: 130, borderRadius: 65,
    backgroundColor: 'rgba(16,185,129,0.15)', bottom: -40, left: -30,
  },
  hai: { color: '#A7F3D0', fontSize: 24, fontWeight: '800' },
 label: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 24 },
  saldo: { color: '#fff', fontSize: 38, fontWeight: '800', marginTop: 4 },
  cta: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: '#6EE7B7', paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: 999, marginTop: 18,
  },
  ctaTxt: { color: colors.dark, fontWeight: '800', marginLeft: 4 },
  body: { padding: 16, marginTop: 4 },
  row: { flexDirection: 'row' },
  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 24, marginBottom: 12,
  },
  section: { fontSize: 18, fontWeight: '800', color: colors.text },
  link: { color: colors.primary, fontWeight: '700' },
  empty: { alignItems: 'center', paddingVertical: 30 },
  emptyTxt: { color: colors.muted, marginTop: 8 },
});