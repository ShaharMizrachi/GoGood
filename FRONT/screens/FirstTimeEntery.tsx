import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SeconderyButton from '../component/ui/SeconderyButton';
import PrimaryScreen from '../component/ui/PrimaryScreen';
import {hebrew} from '../component/Hebrew';
import PrimaryButton from '../component/ui/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, categoryInter} from '../component/Interfaces';
import {useLoginContext} from '../component/context/Context';
import fonts from '../styles/fonts';
import GiveHelpSVG from '../assets/images/GiveHelpSVG';
import GetHelpSVG from '../assets/images/GetHelpSVG';
import messaging from '@react-native-firebase/messaging';

const FirstTimeEntery = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user, setUser, EnumProfessionsGlobal} = useLoginContext();
  const [errorMassage, setErrorMassage] = useState<boolean>(false);

  useEffect(() => {
    gettingEnumPro();
  }, []);

  const gettingEnumPro = async () => {
    const FcmToken = await messaging().getToken();
    if (FcmToken) {
      console.log('Your Firebase Token is:', FcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
    if (EnumProfessionsGlobal != undefined) {
      setUser({
        ...user,
        categoryArray: EnumProfessionsGlobal.map(
          (item: categoryInter) => item.id,
        ),
        FcmToken,
      });
    }
  };

  const choosedCategory = (getOrGive: boolean) => {
    if (getOrGive) {
      setUser({...user, type: 'GettingHelp'});
      navigation.push('SelfiPicAsk');
    } else {
      setUser({...user, type: 'GivingHelp'});
      navigation.navigate('SelfiPicAsk');
    }
  };

  return (
    <PrimaryScreen
      title={hebrew.niceToKnow}
      bodyText={hebrew.fun_toBePart_of}
      pic={0}>
      <View>
        <Text style={styles.chooseActivity}>{hebrew.choose_activity}</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.seconderyButton}>
            <TouchableOpacity
              onPress={() => {
                choosedCategory(true);
              }}>
              <GetHelpSVG />
            </TouchableOpacity>
          </View>
          <View style={styles.seconderyButton}>
            <TouchableOpacity
              onPress={() => {
                choosedCategory(false);
              }}>
              <GiveHelpSVG />
            </TouchableOpacity>
          </View>
        </View>
        {/* {errorMassage && (
          <Text style={styles.bodyText}>
            {hebrew.choose_atLeast_one_option}
          </Text>
        )} */}
        <View style={styles.primaryButtonsContainer}>
          {/* <PrimaryButton title={hebrew.continue} onPress={choosedCategory} /> */}
        </View>
      </View>
    </PrimaryScreen>
  );
};

export default FirstTimeEntery;

const styles = StyleSheet.create({
  chooseActivity: {
    color: 'white',
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
  buttonsContainer: {
    marginTop: '20%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  seconderyButton: {
    marginHorizontal: 16,
    minWidth: 150,
  },
  pushText: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: fonts.regular,
  },
  primaryButtonsContainer: {
    marginTop: '55%',
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
