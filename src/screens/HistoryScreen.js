import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import HistoryItem from '../components/HistoryItem';
import { useWaste } from '../context/WasteContext';
import { colors } from '../theme';

export default function HistoryScreen() {
  const { setoran, dispatch } = useWaste();

  return (
    <View style={s.wrap}>
      <ScreenHeader title="Riwayat" subtitle={`${setoran.length} setoran tercatat`} />
      <FlatList
        data={setoran}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={s.empty}>
            <Ionicons name="file-tray-outline" size={56} color={colors.muted} />
            <Text style={s.kosong}>Belum ada setoran.</Text>
            <Text style={s.kosongSub}>Yuk mulai setor sampahmu! 🌱</Text>
          </View>
        }
        renderItem={({ item }) => (
          <HistoryItem item={item} onDelete={(id) => dispatch({ type: 'DELETE', id })} />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  empty: { alignItems: 'center', marginTop: 60 },
  kosong: { fontWeight: '700', fontSize: 16, color: colors.text, marginTop: 12 },
  kosongSub: { color: colors.muted, marginTop: 4 },
});