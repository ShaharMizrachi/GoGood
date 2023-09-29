import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MonsterSuprise from '../../assets/images/MonsterSuprise';
import {hebrew} from '../Hebrew';
import {PostModal} from './PostModal';
import fonts from '../../styles/fonts';

export default function DeleteModal({modal: {closeModal, params}}: any) {
  const functionWrapper = async (cb: any) => {
    closeModal();
    cb?.();
  };
  return (
    <PostModal
      title={hebrew.are_you_sure}
      subTitle={hebrew.are_you_sure_Delete}
      Icon={MonsterSuprise}>
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => functionWrapper(params?.onNext)}>
          <Text style={styles.modalButtonText}>{hebrew.delete}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => functionWrapper(params?.onBack)}>
          <Text style={styles.modalButtonText}>{hebrew.back_to_homePage}</Text>
        </TouchableOpacity>
      </View>
    </PostModal>
  );
}

const styles = StyleSheet.create({
  modalButtonTextClose: {
    fontSize: 18,
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
  },
  backButton: {
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#FED433',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    elevation: 5,
    width: 145,
    borderRadius: 35,
  },
  modalButtonText: {
    fontSize: 18,
    fontFamily: fonts.regular,
  },

  deleteButton: {
    backgroundColor: '#FED433',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 145,
    elevation: 5,

    borderRadius: 35,
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
