import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import fonts from '../styles/fonts';
import {hebrew} from '../component/Hebrew';
import ModalPopup from '../component/ui/ModalPopup';
import {clearAll} from '../component/UserInStorage';
import RNRestart from 'react-native-restart';
import MonsterYaySvg from '../assets/images/MonsterYaySvg';

const SeeYouNextTime = () => {
  const navigateTo = () => {
    clearAll();
    RNRestart.Restart();
  };

  return (
    <ModalPopup open={true} closeAll={true}>
      <View>
        <View style={styles.imageContainer}>
         <MonsterYaySvg/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{hebrew.see_you_next_time}</Text>
          <Text style={[styles.bodyText, styles.fontBold]}>
            {hebrew.we_wanted_to_say_thanks}
          </Text>
          <Text style={[styles.bodyText, styles.fontRegular]}>
            {hebrew.we_wanted_to_say_thanks_fulltext}
          </Text>
        </View>
        <View style={styles.butonContainer}>
          <Text style={styles.butonContainer} onPress={navigateTo}>
            {hebrew.close}
          </Text>
        </View>
      </View>
    </ModalPopup>
  );
};

export default SeeYouNextTime;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 2,

    alignItems: 'center',
    justifyContent: 'center',
  },
  butonContainer: {
    flex: 1,
    fontSize:20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: fonts.regular,
    color: 'black',
  },
  textContainer: {
    flex: 2.5,
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
    width: '70%',
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    lineHeight: 30,
    alignSelf: 'center',
  },
  fontBold: {
    fontFamily: fonts.bold,
  },
  fontRegular: {
    fontFamily: fonts.regular,
  },
  continue: {
    textDecorationLine: 'underline',
    fontFamily: fonts.regular,
    color: 'black',
   
    textAlign: 'center',
    marginTop: 259,
  },
});
