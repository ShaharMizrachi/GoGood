import React, {useEffect, useState} from 'react';
import PrimaryScreen from '../component/ui/PrimaryScreen';
import {hebrew} from '../component/Hebrew';
import PrimaryButton from '../component/ui/PrimaryButton';
import {
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import KeyboradDiscoverInput from '../component/ui/KeyboradDiscoverInput';
import {
  RootStackParamList,
  userWithToken,
  user_pulled_fromDB,
} from '../component/Interfaces';
import {useLoginContext} from '../component/context/Context';
import {
  CheckOtpValidation,
  RequestOTPNumber,
  getUser,
  updateUser,
} from '../component/api';
import {clearAll, StoreData} from '../component/UserInStorage';
import fonts from '../styles/fonts';
import RNRestart from 'react-native-restart';
import {CloseEye} from '../assets/images/CloseEye';
import {OpenEye} from '../assets/images/OpenEye';
import {powerUserCheck} from '../component/GeneralFunction_ForReUse';
import messaging from '@react-native-firebase/messaging';

const SmsLoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    user,
    login,
    setUser,
    setLogin,
    activeCurrentType,
    setActiveCurrentType,
  } = useLoginContext();
  const [otpNumber, setOtpNumber] = useState<{
    optInput: string | undefined;
    tryAgain: boolean;
    showPassword: boolean;
  }>({optInput: undefined, tryAgain: false, showPassword: false});

  useEffect(() => {
    askOtpCode();
  }, []);

  const askOtpCode = async () => {
    checkPowerUser() && (await RequestOTPNumber(user.phone));
  };

  const checkPowerUser = () => {
    return !powerUserCheck(user.phone);
  };

  const checkingOtpNumber = async () => {
    !checkPowerUser() && pullingUser();

    if (otpNumber.optInput) {
      const codeValidation = await CheckOtpValidation(
        user.phone,
        otpNumber.optInput?.toString(),
      );
      console.log(codeValidation.data);
      if (codeValidation.data === 'CODE_VALID') {
        pullingUser();
      } else setOtpNumber({...otpNumber, tryAgain: true});
    } else {
      setOtpNumber(p => {
        return {...p, tryAgain: true};
      });
    }
  };
  const pullingUser = async () => {
    const userPulled: userWithToken = await getUser(user.phone);
    if (userPulled.userGoGood.id != 0) {
      const FcmToken = await messaging().getToken();
      if (FcmToken) {
        console.log('Your Firebase Token is:', FcmToken);
      } else {
        console.log('Failed', 'No token received');
      }
      const existUser: user_pulled_fromDB = {
        id: userPulled.userGoGood?.id,
        fullName: userPulled.userGoGood?.fullName,
        imei: userPulled.userGoGood?.imei,
        imgUrl: userPulled.userGoGood?.imgUrl,
        userDescription: userPulled.userGoGood?.userDescription,
        phone: userPulled.userGoGood?.phone,
        type: userPulled.userGoGood?.userType,
        categoryArray: [],
        lat: user.lat,
        long: user.long,
        token: userPulled.token,
        FcmToken: FcmToken,
      };
      if (userPulled.userGoGood.FcmToken !== FcmToken)
        await updateUser(existUser, user.token);

      setUser(existUser);
      StoreData(existUser.phone);
      const timeout = setTimeout(() => {
        // in case application stand in backgroung more the the time on the token (22 hours);
        clearAll();
        RNRestart.Restart();
        clearTimeout(timeout);
      }, 1000 * 60 * 60 * 22);
      setLogin(true);
      if (existUser.type == 'GivingHelp' || existUser.type == 'Both')
        setActiveCurrentType('GivingHelp');
      //in case of exist user from type both/GivinGhELP
      else setActiveCurrentType('GettingHelp');
    } else {
      // in case of new user
      navigation.navigate('FirstTime');
    }
  };

  useEffect(() => {
    if (user.id != 0)
      login && activeCurrentType === 'GettingHelp'
        ? navigation.navigate('TabNavigatorGettingHelp')
        : navigation.navigate('TabNavigatorGivingHelp');
  }, [login]);

  const buildHeadline = () => {
    const maskedPhone = user.phone.replace(/(\d{3})(\d+)(\d{3})/, '$1-xxxx$3');
    return `${hebrew.you_got_code_now}\n${maskedPhone}\n${hebrew.enter_the_code}`;
  };
  return (
    <KeyboradDiscoverInput>
      <PrimaryScreen
        title={hebrew.did_you_get_code}
        bodyText={buildHeadline()}
        pic={0}>
        <>
          <View style={styles.inputOuterContainer}>
            {otpNumber.tryAgain && (
              <View style={styles.alert_container}>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/images/alert-circle.png')}
                />
                <Text style={styles.wrong_phone_alert}>
                  {hebrew.please_try_again}
                </Text>
              </View>
            )}
            <Text style={styles.label}>{hebrew.put_code}</Text>
            <TextInput
              style={[styles.input, otpNumber.tryAgain && styles.errorForm]}
              placeholderTextColor={'#132D42'}
              keyboardType="number-pad"
              secureTextEntry={!otpNumber.showPassword}
              onChangeText={optnum =>
                setOtpNumber({...otpNumber, optInput: optnum, tryAgain: false})
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignSelf: 'center',
            }}>
            <Text style={[styles.text_didtGetSms, {marginLeft: '2%'}]}>
              {hebrew.didnt_get}
            </Text>
            <TouchableOpacity onPress={() => askOtpCode()}>
              <Text
                style={[
                  styles.text_didtGetSms,
                  {textDecorationLine: 'underline'},
                ]}>
                {hebrew.pushHere}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={checkingOtpNumber} title={hebrew.finish} />
          </View>
        </>
      </PrimaryScreen>
    </KeyboradDiscoverInput>
  );
};

export default SmsLoginScreen;

const styles = StyleSheet.create({
  text_didtGetSms: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  image: {
    top: -45,
    left: 25,
  },
  iconContainer: {},
  inputOuterContainer: {
    paddingTop: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 12,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 12,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    color: 'black',
    textAlign: 'right',
  },
  alert_container: {
    width: '100%',
    paddingBottom: '2%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginLeft: '2.5%',
  },
  errorForm: {
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  wrong_phone_alert: {
    color: 'white',
  },
  buttonContainer: {
    marginTop: 200,
  },
  pushText: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: fonts.regular,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: '10%',
    fontFamily: fonts.regular,
  },
  bodyText: {
    marginTop: 17,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    lineHeight: 22,
    fontFamily: fonts.regular,
  },
});
