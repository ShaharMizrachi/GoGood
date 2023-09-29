import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeRequest} from './api';

export const StoreData = async (userNum: string) => {
  return makeRequest(
    async () => {
      const resulte = await AsyncStorage.setItem('@storage_Key', userNum);
    },
    'StoreData',
    0,
  );
};

export const getData = async () => {
  return makeRequest(
    async () => {
      const value = await AsyncStorage.getItem('@storage_Key');
      return value;
    },
    'getData',
    0,
  );
};

export const clearAll = async () => {
  return makeRequest(
    async () => {
      await AsyncStorage.clear();
    },
    'clearAll',
    0,
  );
};
