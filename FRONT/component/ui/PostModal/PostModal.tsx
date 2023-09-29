import {View, Text} from 'react-native';
import React from 'react';
import {PostModalProps} from './PostModalProps';
import styles from './PostModalStyles';
import ModalPopup from '../ModalPopup';
export const PostModal = ({
  title,
  subTitle,
  children,
  Icon = null,
}: PostModalProps) => {
  return (
    <ModalPopup open={true}>
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={styles.upper}>
          {Icon && <Icon />}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <View style={styles.bottom}>{children}</View>
      </View>
    </ModalPopup>
  );
};
