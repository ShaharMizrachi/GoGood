import { View, Text } from 'react-native';
import React from 'react';
import { FilterLayoutProps } from './FilterLayoutProps';
import styles from './FilterLayoutStyles';
export const FilterLayout = ({}: FilterLayoutProps) => {
  return (
    <View style={styles.container}>
      <Text>FilterLayout </Text>
    </View>
  );
};
