import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'ecobank_setoran';
const WasteContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    case 'DELETE':
      return state.filter((s) => s.id !== action.id);
    default:
      return state;
  }
}

export function WasteProvider({ children }) {
  const [setoran, dispatch] = useReducer(reducer, []);
  const [siap, setSiap] = useState(false);

  // Hook useEffect: muat data saat app dibuka
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => v && dispatch({ type: 'LOAD', payload: JSON.parse(v) }))
      .finally(() => setSiap(true));
  }, []);

  // Hook useEffect: simpan setiap kali data berubah
  useEffect(() => {
    if (siap) AsyncStorage.setItem(KEY, JSON.stringify(setoran));
  }, [setoran, siap]);

  return (
    <WasteContext.Provider value={{ setoran, dispatch }}>
      {children}
    </WasteContext.Provider>
  );
}

// Custom hook
export const useWaste = () => useContext(WasteContext);