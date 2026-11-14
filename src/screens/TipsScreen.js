import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import TipCard from '../components/TipCard';
import { TIPS } from '../data/wasteData';
import { colors } from '../theme';

export default function TipsScreen({ navigation }) {
  return (
    <View style={s.wrap}>
      <ScreenHeader title="Edukasi" subtitle="Tips memilah & mengelola sampah" />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {TIPS.map((t) => (
          <TipCard
            key={t.id}
            tip={t}
            onPress={() => navigation.navigate('DetailTips', { tip: t })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
});