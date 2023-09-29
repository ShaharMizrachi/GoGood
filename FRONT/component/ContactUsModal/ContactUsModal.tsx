import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ContactUsModalProps} from './ContactUsModalProps';
import styles from './ContactUsModalStyles';
import MonsterSuprise from '../../assets/images/MonsterSuprise';
import {hebrew} from '../Hebrew';
import {PostModal} from '../ui/PostModal';
import MonsterHappy from '../../assets/images/MonsterHappy';

export const ContactUsModal = ({modal: {closeModal, params}}: any) => {
  const functionWrapper = async (cb: any) => {
    closeModal();
    cb?.();
  };
  return (
    <PostModal
      title={hebrew.success_send}
      subTitle={hebrew.thanks_got_contacting}
      Icon={MonsterHappy}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => functionWrapper(params?.onNext)}>
        <Text style={styles.modalButtonText}>{hebrew.close}</Text>
      </TouchableOpacity>
    </PostModal>
  );
};
