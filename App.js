import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { WasteProvider } from './src/context/WasteContext';
import { colors, shadow } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import DepositScreen from './src/screens/DepositScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import TipsScreen from './src/screens/TipsScreen';
import TipDetailScreen from './src/screens/TipDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ICONS = {
  Beranda: 'home',
  Setor: 'add-circle',
  Riwayat: 'time',
  Edukasi: 'bulb',
};

const tema = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg, primary: colors.primary },
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 0,
          backgroundColor: '#fff',
          ...shadow,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          const base = ICONS[route.name];
          return <Ionicons name={focused ? base : `${base}-outline`} size={size + 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Setor" component={DepositScreen} />
      <Tab.Screen name="Riwayat" component={HistoryScreen} />
      <Tab.Screen name="Edukasi" component={TipsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <WasteProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={tema}>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="DetailTips"
            component={TipDetailScreen}
            options={{
              title: 'Detail Tips',
              headerShadowVisible: false,
              headerStyle: { backgroundColor: colors.bg },
              headerTintColor: colors.primary,
              headerTitleStyle: { color: colors.text, fontWeight: '700' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WasteProvider>
  );
}