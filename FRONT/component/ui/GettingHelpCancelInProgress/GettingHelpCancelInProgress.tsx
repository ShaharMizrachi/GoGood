/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './GettingHelpCancelInProgressStyles';
import MonsterSad from '../../../assets/images/MonsterSad';
import {hebrew} from '../../Hebrew';
import ModalPopup from '../ModalPopup';
import {ProfileDetailsBox} from '../../ProfileDetailsBox';
import {GetGivingHelpOwnerPostsByPostId, getUserById} from '../../api';
import {ProfileOfOtherUserIN} from '../../Interfaces';
export const GettingHelpCancelInProgress = ({
  modal: {closeModal, params},
}: any) => {
  const [displayData, setDisplayData] = useState({
    userId: 0,
    fullName: '',
    userDescription: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserById(params.idToDisplay);
        setDisplayData({
          userId: data.id,
          fullName: data.fullName,
          userDescription: data.userDescription,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <ModalPopup open={true}>
      <View style={styles.container}>
        <View style={styles.head}>
          <MonsterSad />
          <Text style={styles.title}>{hebrew.not_working_out}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.profileBox}>
            <ProfileDetailsBox
              id={String(displayData.userId)}
              name={displayData.fullName}
              userDescription={displayData.userDescription}
              innerText={hebrew.cancel_gettingHelp}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text
            onPress={() => closeModal('GettingHelpCancelInProgress')}
            style={[styles.generalTextSetings, styles.closeLink]}>
            {hebrew.close}
          </Text>
        </View>
      </View>
    </ModalPopup>
  );
};
