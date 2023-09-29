import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './ConfirmDeleteAccountStyles';
import {PostModal} from '../PostModal';
import MonsterThinking from '../../../assets/images/MonsterThinking';
import {hebrew} from '../../Hebrew';
import PrimaryButton from '../PrimaryButton';
import {deleteUser} from '../../api';
import {useLoginContext} from '../../context/Context';

export const ConfirmDeleteAccount = ({
  modal: {closeModal, openModal, params},
}: any) => {
  const [loading, setLoading] = useState(false);
  const {user} = useLoginContext();
  console.log(user.id);
  const onSubmit = () => {
    setLoading(true);
    deleteUser(String(user.id))
      .then(r => {
        console.log({r});
        openModal('SeeYouNextTime');
      })
      .catch(e => console.log({e}))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PostModal
      title={hebrew.are_you_sure}
      subTitle={hebrew.deleteAccountTitle}
      Icon={MonsterThinking}>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={hebrew.confirm} onPress={onSubmit} />
      </View>
    </PostModal>
  );
};
