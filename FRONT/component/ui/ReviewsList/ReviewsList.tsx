import {FlatList} from 'react-native';
import React from 'react';
import {ReviewsListProps} from './ReviewsListProps';
import styles from './ReviewsListStyles';
export const ReviewsList = ({}: ReviewsListProps) => {
  const renderItem = ({item}: any) => null;
  return (
    <FlatList
      data={[]}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  );
};
