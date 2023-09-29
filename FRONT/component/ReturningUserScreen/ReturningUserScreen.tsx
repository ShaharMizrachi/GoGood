import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ReturningUserScreenProps} from './ReturningUserScreenProps';
import styles from './ReturningUserScreenStyles';
import KeyboradDiscoverInput from '../ui/KeyboradDiscoverInput';
import {hebrew} from '../Hebrew';
import PrimaryScreen from '../ui/PrimaryScreen';
import {useLoginContext} from '../context/Context';
import PrimaryButton from '../ui/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import MonsterHello from '../../assets/images/MonsterHello';
import {Camera} from 'react-native-vision-camera';

export const ReturningUserScreen = ({navigation}: ReturningUserScreenProps) => {
  const {setUser, user} = useLoginContext();
  const [showInputAlert, setShowInputAlert] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const onSubmit = () => {
    const reg = new RegExp(/^05\d{8}$/);
    if (!phone || reg.test(phone)) return setShowInputAlert(true);
    setUser({...user, fullName: '', phone});
    navigation.navigate('OTP');
  };

  useEffect(() => {
    requestCameraPermtiddion();
  }, []);

  const requestCameraPermtiddion = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  }, []);

  return (
    <KeyboradDiscoverInput>
      <LinearGradient
        colors={[colors.blue700, colors.blue500]}
        style={styles.generalPageContainer}>
        <View style={styles.body}>
          <MonsterHello />
          <Text style={styles.headline}>{hebrew.return_welcome}</Text>
          <Text style={styles.subTitle}>{hebrew.return_subTitle}</Text>
          {showInputAlert && (
            <View style={styles.alert_container}>
              <Image
                style={styles.iconStyle}
                source={require('../../assets/images/alert-circle.png')}
              />
              <Text style={styles.wrong_phone_alert}>
                {hebrew.oneOf_details_wrong}
              </Text>
            </View>
          )}
          <TextInput
            style={[styles.input, showInputAlert && styles.errofram]}
            placeholder={hebrew.phone}
            value={phone}
            placeholderTextColor={'#132D42'}
            onChangeText={text => setPhone(text)}
          />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{hebrew.continue}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboradDiscoverInput>
  );
};
