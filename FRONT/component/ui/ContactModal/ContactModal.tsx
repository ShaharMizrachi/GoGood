import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContactModalProps,
  IDetailes,
  detailesInitial,
} from './ContactModalProps';
import styles from './ContactModalStyles';
import {hebrew} from '../../Hebrew';
import {Image} from 'react-native';
import CallIcon from '../../../assets/images/CallIcon';
import WhatsappIcon from '../../../assets/images/WhatsappIcon';
import {Linking} from 'react-native';
import {GetUserProfilePic, getUserById} from '../../api';
import {formatPhoneNumber} from './helper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Interfaces';
import ModalPopup from '../ModalPopup';

export const ContactModal = ({modal: {closeModal, openModal, params}}: any) => {
  const item = params.item;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [detailes, setDetailes] = useState<IDetailes>(detailesInitial);
  const makeACall = () => {
    return Linking.openURL(`tel:${detailes.phone}`);
  };
  const openWhatsapp = () => {
    return Linking.openURL(`whatsapp://send?&${detailes.phone}`);
  };
  const navigateToProfile = () => {
    console.log('asd');
    navigation.navigate('ProfileOfOtherUser', {
      userId: detailes.id,
      fullName: detailes.fullName,
      profilePic: detailes.imgUrl,
    });
    closeModal('ContactModal');
  };
  useEffect(() => {
    const fetchUser = async () => {
      let profilePic;
      const {fullName, id, phone} = await getUserById(item.gettingHelpId!);
      if (id) {
        profilePic = await GetUserProfilePic(id);
      }
      setDetailes({fullName, id, imgUrl: profilePic?.data?.url ?? '', phone});
    };
    if (item?.gettingHelpId) fetchUser();
  }, [item]);
  return (
    <ModalPopup open={true}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{hebrew.contact}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={
              detailes.imgUrl
                ? {uri: detailes.imgUrl}
                : require('../../../assets/images/avatar.jpg')
            }
          />
          <Text style={styles.name}>{detailes.fullName}</Text>
          <Text onPress={navigateToProfile} style={styles.link}>
            {hebrew.enterProfile}
          </Text>
          <Text style={styles.paragraph}>{hebrew.get_to_know}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={makeACall}>
            <CallIcon />
            <Text style={styles.buttonText}>
              {formatPhoneNumber(detailes.phone)}
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
