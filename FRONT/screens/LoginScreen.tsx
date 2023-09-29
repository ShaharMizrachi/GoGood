/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useModal} from 'react-native-modalfy';
import PrimaryButton from '../component/ui/PrimaryButton';
import PrimaryScreen from '../component/ui/PrimaryScreen';
import {hebrew} from '../component/Hebrew';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Camera} from 'react-native-vision-camera';
import KeyboradDiscoverInput from '../component/ui/KeyboradDiscoverInput';
import {RootStackParamList} from '../component/Interfaces';
import {useLoginContext} from '../component/context/Context';
import fonts from '../styles/fonts';
import {termsText} from '../assets/Text/const';

const LoginScreen = () => {
  const {openModal} = useModal();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [myInput, setMyInput] = useState<{
    fullname: string;
    phone: string;
    showNumber: boolean;
  }>({
    fullname: '',
    phone: '',
    showNumber: true,
  });
  const {setUser, user} = useLoginContext();
  const [showInputAlert, setShowInputAlert] = useState<boolean>(false);
  const [checkBoxState, setCheckBoxState] = useState({
    termsCheckBox: false,
    ageCheckBox: false,
  });

  useEffect(() => {
    requestCameraPermtiddion();
  }, []);

  const requestCameraPermtiddion = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
  }, []);

  const onsubmit = (): void => {
    const reg = new RegExp(/^05\d{8}$/);
    if (
      myInput.fullname.trim().length === 0 ||
      !reg.test(myInput.phone) ||
      !checkBoxState.ageCheckBox ||
      !checkBoxState.termsCheckBox
    )
      setShowInputAlert(true);
    else {
      setUser({...user, fullName: myInput.fullname, phone: myInput.phone});
      navigation.navigate('OTP');
    }
  };

  const handleFieldChange = (field: string, value: string | boolean) => {
    if (showInputAlert) setShowInputAlert(false);

    if (typeof value === 'boolean') {
      setCheckBoxState(prevState => ({
        ...prevState,
        [field]: value,
      }));
    } else {
      setMyInput(prevInput => ({
        ...prevInput,
        [field]: value,
      }));
    }
  };

  const openTermsModal = () => {
    openModal('TermsModal', {
      title: hebrew.terms,
      body: termsText,
      onNext: () => handleFieldChange('termsCheckBox', true),
    });
  };
  return (
    <KeyboradDiscoverInput>
      <PrimaryScreen
        title={hebrew.wellcome}
        bodyText={hebrew.forConnection}
        pic={0}>
        <View style={{height: '70%'}}>
          <View style={{marginLeft: '8%', height: '50%'}}>
            {showInputAlert && (
              <View style={styles.alert_container}>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/images/alert-circle.png')}
                />
                <Text style={styles.wrong_phone_alert}>
                  {hebrew.oneOf_details_wrong}
                </Text>
              </View>
            )}
            <View>
              <Text style={{color: 'white', marginRight: '12%'}}>
                {hebrew.fullName}
              </Text>
              <TextInput
                style={[styles.input, showInputAlert && styles.errofram]}
                placeholder={hebrew.fullName_with_starr}
                placeholderTextColor={'#132D42'}
                onChangeText={value => handleFieldChange('fullname', value)}
              />
            </View>
            <View style={{marginTop: '8%'}}>
              <Text style={{color: 'white', marginRight: '12%'}}>
                {hebrew.phone}
              </Text>
              <TextInput
                style={[styles.input, showInputAlert && styles.errofram]}
                keyboardType="number-pad"
                placeholder={hebrew.phoneWithstar}
                placeholderTextColor={'#132D42'}
                secureTextEntry={!myInput.showNumber}
                onChangeText={value => handleFieldChange('phone', value)}
              />
            </View>
          </View>
          <View style={styles.buttonAndAlertContainer}>
            <View style={styles.termsContainer}>
              <TouchableOpacity onPress={() => openTermsModal()}>
                <Text style={styles.link}>{hebrew.terms}</Text>
              </TouchableOpacity>
              <Text style={styles.termsText}>{hebrew.cofirmTerms} </Text>
              <CheckBox
                tintColors={{
                  false: !showInputAlert ? 'white' : 'red',
                  true: 'white',
                }}
                disabled={false}
                value={checkBoxState.termsCheckBox}
                onValueChange={newValue =>
                  handleFieldChange('termsCheckBox', newValue)
                }
              />
            </View>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>{hebrew.confirmAge} </Text>
              <CheckBox
                tintColors={{
                  false: !showInputAlert ? 'white' : 'red',
                  true: 'white',
                }}
                disabled={false}
                value={checkBoxState.ageCheckBox}
                onValueChange={newValue =>
                  handleFieldChange('ageCheckBox', newValue)
                }
              />
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={onsubmit} title={hebrew.continue} />
            </View>
          </View>
        </View>
      </PrimaryScreen>
    </KeyboradDiscoverInput>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: -35,
    left: '5%',
  },
  errofram: {
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  termsContainer: {
    width: '90%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonAndAlertContainer: {
    height: '80%',
    marginTop: '30%',
    justifyContent: 'space-around',
  },
  alert_container: {
    width: '100%',
    height: '15%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginLeft: '2.5%',
  },
  wrong_phone_alert: {
    color: 'white',
  },
  inputOuterContainer: {
    marginTop: 30,
  },
  input: {
    marginTop: '3%',
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 12,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    color: 'black',
    width: '90%',
    textAlign: 'right',
  },
  termsText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: 'white',
  },
  link: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
  },
  checkBox: {
    borderColor: 'red',
  },
});
