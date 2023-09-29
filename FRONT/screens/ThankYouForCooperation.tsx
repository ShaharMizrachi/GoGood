import React, {useEffect, useState} from 'react';
import ModalPopup from '../component/ui/ModalPopup';
import {
  View,
  StyleSheet,
  Text,
  Image,
  BackHandler,
  Dimensions,
} from 'react-native';
import {hebrew} from '../component/Hebrew';
import {useLoginContext} from '../component/context/Context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../component/Interfaces';
import fonts from '../styles/fonts';
import RNRestart from 'react-native-restart';
import {clearAll, StoreData} from '../component/UserInStorage';
import MonsterYaySvg from '../assets/images/MonsterYaySvg';
import PrimaryButton from '../component/ui/PrimaryButton';

const ThankYouForCooperation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user, activeCurrentType, setActiveCurrentType, setLogin} =
    useLoginContext();
  const [buttonPushed, setButtonPushed] = useState(false);

  const navigateTo = () => {
    setButtonPushed(true);
    if (user.id != 0 && user?.type) {
      user.type === 'GettingHelp'
        ? setActiveCurrentType('GettingHelp')
        : setActiveCurrentType('GivingHelp');
    }
  };
  useEffect(() => {
    // avoidign going back at android buttom bar
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    console.log(user);
    if (buttonPushed && user.id != 0) {
      setLogin(true);
      StoreData(user.phone);
      const timeout = setTimeout(() => {
        clearAll();
        RNRestart.Restart();
        clearTimeout(timeout);
      }, 1000 * 60 * 60 * 22);
    }
  }, [activeCurrentType]);

  return (
    <ModalPopup open={true} navigation={navigateTo}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <MonsterYaySvg />
        </View>

        <View style={{flex: 3, width: '100%'}}>
          <Text style={styles.headerText}>
            {hebrew.we_wanted_to_say_thanks}
          </Text>
          <Text style={styles.bodyText}>
            {hebrew.your_privecy_is_importent}
          </Text>
          <Text style={[styles.bodyText, {fontWeight: '700'}]}>
            {hebrew.connection_made_after_approval}
          </Text>
          {user.type === 'GettingHelp' ? (
            <Text style={styles.bodyText}>{hebrew.we_commit_not_to_show}</Text>
          ) : (
            <Text style={styles.bodyText}>
              {hebrew.we_commit_not_to_approach}
            </Text>
          )}
        </View>
        <View style={styles.continue}>
          <PrimaryButton title={hebrew.start} onPress={navigateTo} />
        </View>
      </View>
    </ModalPopup>
  );
};

export default ThankYouForCooperation;

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', alignItems: 'center'},
  imageContainer: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
  headerText: {
    color: 'black',
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 43,
    fontFamily: fonts.bold,
  },
  bodyText: {
    marginTop: 17,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    lineHeight: 30,
    fontFamily: fonts.regular,

    alignSelf: 'center',
  },
  continue: {
    textDecorationLine: 'underline',
    fontFamily: fonts.regular,
    color: 'black',
    textAlign: 'center',
    flex: 1,
    width: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
  },
});
