import { Platform } from 'react-native';

export const colors = {
  primary: '#059669',
  dark: '#064E3B',
  soft: '#D1FAE5',
  bg: '#F4F7F5',
  card: '#FFFFFF',
  text: '#0F172A',
  muted: '#64748B',
  border: '#E2E8F0',
  danger: '#EF4444',
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
  default: { boxShadow: '0 4px 12px rgba(15,23,42,0.08)' },
});

export const rupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');