import {View, Text, TouchableOpacity, Linking, Image} from 'react-native';
import React from 'react';
import styles from './VolunteerConfirmModalStyles';
import ModalPopup from '../ModalPopup';
import Avatar from '../../../assets/images/Avatar';
import {hebrew} from '../../Hebrew';
import MonsterHappy from '../../../assets/images/MonsterHappy';
import CallIcon from '../../../assets/images/CallIcon';
import WhatsappIcon from '../../../assets/images/WhatsappIcon';
import {formatPhoneNumber} from '../ContactModal/helper';
import {IVolunteer, RootStackParamList} from '../../Interfaces';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const VolunteerConfirmModal = ({modal: {closeAllModals, params}}: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const volunteer: IVolunteer = params?.volunteer;
  const makeACall = () => {
    return Linking.openURL(`tel:${volunteer?.phone}`);
  };
  const openWhatsapp = () => {
    return Linking.openURL(`whatsapp://send?&${volunteer?.phone}`);
  };
  const navigateToProfile = () => {
    closeAllModals();
    navigation.navigate('ProfileDetail', {
      getingHelpDetailes: {id: volunteer.id, fullName: volunteer.name},
    });
  };
  return (
    <ModalPopup closeAll={true} open={true}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MonsterHappy />
          <Text style={styles.title}>{hebrew.success_confirm}</Text>
          <View style={styles.subTitle}>
            <Text style={styles.boldText}>{hebrew.info_as_sent}</Text>
            <Text style={styles.regularText}>{hebrew.welcomeToContact}</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.volunteerDetailed}>
            {volunteer?.imgUrl && volunteer?.imgUrl !== '' ? (
              <Image style={styles.avatar} source={{uri: volunteer?.imgUrl}} />
            ) : (
              <Avatar h={49} w={49} />
            )}
            <Text style={styles.boldText}>{volunteer.name}</Text>
            <TouchableOpacity onPress={navigateToProfile}>
              <Text style={styles.link}>{hebrew.enterProfile}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={makeACall}>
            <CallIcon />
            <Text style={styles.buttonText}>
              {formatPhoneNumber(volunteer?.phone)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openWhatsapp}>
            <WhatsappIcon />
            <Text style={styles.buttonText}>{hebrew.start_call}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalPopup>
  );
};
export default VolunteerConfirmModal;
