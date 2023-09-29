import PrimaryScreen from '../component/ui/PrimaryScreen';
import {hebrew} from '../component/Hebrew';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  BackHandler,
  Alert,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RootStackParamList,
  userWithToken,
  user_pulled_fromDB,
} from '../component/Interfaces';
import {useLoginContext} from '../component/context/Context';
import {addUser} from '../component/api';
import ThankYouForCooperation from './ThankYouForCooperation';
import fonts from '../styles/fonts';
import {Camera} from 'react-native-vision-camera';
import MonsterHello from '../assets/images/MonsterHello';
import ArrowBlackLeft from '../assets/images/ArrowBlackLeft';
import ArrowBlackRight from '../assets/images/ArrowBlackRight';

const SelfiPicAsk = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user, setUser} = useLoginContext();
  const [pushSkip, setpushSkip] = useState<boolean>(false);

  const skipFunction = async () => {
    const userPulled: userWithToken = await addUser(user);
    if (userPulled) {
      const existUser: user_pulled_fromDB = {
        id: userPulled.userGoGood?.id,
        fullName: userPulled.userGoGood?.fullName,
        imei: userPulled.userGoGood?.imei,
        imgUrl: userPulled.userGoGood?.imgUrl,
        phone: userPulled.userGoGood?.phone,
        type: userPulled.userGoGood?.userType,
        categoryArray: [],
        lat: user.lat,
        long: user.long,
        token: userPulled.token,
        FcmToken: '',
      };
      setUser(existUser);
    }
  };

  useEffect(() => {
    if (user.id != 0) setpushSkip(true);
  }, [user]);

  const selfiPermmision = async () => {
    // in case user dos not have permmision we not gonna navigate him to selfi pic page
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      Alert.alert(
        hebrew.camera_permission,
        hebrew.dont_have_camera_permmision,
        [
          {text: hebrew.yes, onPress: async () => await Linking.openSettings()},
          {text: hebrew.no, style: 'default'},
        ],
        {cancelable: false},
      );
    } else navigation.navigate('PicPicker');
  };

  return (
    <>
      {pushSkip ? (
        <ThankYouForCooperation />
      ) : (
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()} style={styles.goBack}>
            <ArrowBlackRight />
          </Pressable>
          <View style={styles.upper}>
            <MonsterHello />
            <Text style={styles.headline}>{hebrew.safe_use}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{hebrew.safe_use_body}</Text>
          </View>
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={selfiPermmision} style={styles.button}>
              <Text style={styles.buttonText}>{hebrew.open_camera}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Gallery', {amountOfPics: 1})}
              style={styles.secondButton}>
              <Text style={styles.buttonText}>{hebrew.open_galery}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default SelfiPicAsk;

const styles = StyleSheet.create({
  goBack: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 5,
  },
  button: {
    height: 57,
    width: 147,
    backgroundColor: '#fed433',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  secondButton: {
    elevation: 8,
    height: 57,
    backgroundColor: 'white',
    width: 147,
    borderColor: '#fed433',
    borderWidth: 2,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    paddingTop: 25,
    color: 'black',
    fontSize: 32,
    fontFamily: fonts.regular,
    fontWeight: '700',
  },
  bodyText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 30,
    fontFamily: fonts.regular,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.regular,
  },
  linksContainer: {
    flex: 0.8,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  upper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
  },
  body: {flex: 1, width: '70%'},
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
