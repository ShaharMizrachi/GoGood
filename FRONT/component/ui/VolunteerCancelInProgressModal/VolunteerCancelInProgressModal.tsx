import {View, Text} from 'react-native';
import React from 'react';
import styles from './VolunteerCancelInProgressModalStyles';
import MonsterSad from '../../../assets/images/MonsterSad';
import {hebrew} from '../../Hebrew';
import {ProfileBox} from '../ProfileBox';
import ModalPopup from '../ModalPopup';
import {ProfileDetailsBox} from '../../ProfileDetailsBox';

const VolunteerCancelInProgressModal = ({
  modal: {closeModal, openModal, params},
}: any) => {
  console.log('VolunteerCancelInProgressModal', params);
  return (
    <ModalPopup open={true}>
      <View style={styles.container}>
        <View style={styles.head}>
          <MonsterSad />
          <Text style={styles.title}>{hebrew.not_working_out}</Text>
          <Text style={styles.subTitle}>{hebrew.request_returning}</Text>
        </View>
        <View style={styles.body}>
          {/* <View style={styles.profileBox}>
            <ProfileDetailsBox
              id={params?.post?.GettingHelpId ?? '39'}
              name={params?.post?.GettingHelpId ?? '39'}
              innerText={hebrew.cancel_volunteer}
            />
          </View> */}
        </View>
        <View style={styles.buttonContainer}>
          <Text
            onPress={() => closeModal('VolunteerCancelInProgressModal')}
            style={[styles.generalTextSetings, styles.closeLink]}>
            {hebrew.close}
          </Text>
        </View>
      </View>
    </ModalPopup>
  );
};
export default VolunteerCancelInProgressModal;
