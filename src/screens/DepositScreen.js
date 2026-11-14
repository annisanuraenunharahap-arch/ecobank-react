import React, { useState } from 'react';
import {
  ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Platform, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import WasteTypeChip from '../components/WasteTypeChip';
import { WASTE_TYPES } from '../data/wasteData';
import { useWaste } from '../context/WasteContext';
import { colors, rupiah, shadow } from '../theme';

// Alert yang jalan di HP maupun browser
const pesan = (judul, isi) => {
  if (Platform.OS === 'web') window.alert(`${judul}\n${isi}`);
  else Alert.alert(judul, isi);
};

export default function DepositScreen({ navigation }) {
  const { dispatch } = useWaste();
  const [jenis, setJenis] = useState(WASTE_TYPES[0]); // state
  const [berat, setBerat] = useState('');             // state

  const beratNum = parseFloat(berat.replace(',', '.')) || 0;
  const total = Math.round(beratNum * jenis.harga);

  const simpan = () => {
    if (beratNum <= 0) {
      return pesan('Oops', 'Masukkan berat sampah yang valid.');
    }
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now().toString(),
        nama: jenis.nama,
        icon: jenis.icon,
        warna: jenis.warna,
        berat: beratNum,
        total,
        tanggal: new Date().toISOString(),
      },
    });
    setBerat('');
    pesan('Berhasil ✅', `Saldo bertambah ${rupiah(total)}`);
    navigation.navigate('Riwayat');
  };

  return (
    <View style={s.wrap}>
      <ScreenHeader title="Setor Sampah" subtitle="Pilih jenis dan masukkan beratnya" />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.judul}>Jenis Sampah</Text>
        <View style={s.grid}>
          {WASTE_TYPES.map((j) => (
            <WasteTypeChip
              key={j.id}
              jenis={j}
              aktif={j.id === jenis.id}
              onPress={() => setJenis(j)}
            />
          ))}
        </View>

        <Text style={s.judul}>Berat Sampah</Text>
        <View style={s.inputWrap}>
          <TextInput
            style={s.input}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.muted}
            value={berat}
            onChangeText={setBerat}
          />
          <Text style={s.unit}>kg</Text>
        </View>

        <View style={s.estBox}>
          <Text style={s.estLabel}>Estimasi pendapatan</Text>
          <Text style={s.estNilai}>{rupiah(total)}</Text>
        </View>

        <TouchableOpacity style={s.btn} onPress={simpan} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle" size={22} color="#fff" />
          <Text style={s.btnTxt}>Simpan Setoran</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  judul: { fontWeight: '800', fontSize: 16, marginBottom: 12, color: colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: 18, paddingHorizontal: 18, ...shadow,
  },
  input: { flex: 1, fontSize: 28, fontWeight: '800', color: colors.text, paddingVertical: 14 },
  unit: { fontSize: 18, fontWeight: '700', color: colors.muted },
  estBox: {
    backgroundColor: colors.soft, borderRadius: 18, padding: 16, marginTop: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  estLabel: { color: colors.dark, fontWeight: '600' },
  estNilai: { color: colors.dark, fontSize: 22, fontWeight: '800' },
  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 18, marginTop: 20,
  },
  btnTxt: { color: '#fff', fontWeight: '800', fontSize: 16, marginLeft: 8 },
});