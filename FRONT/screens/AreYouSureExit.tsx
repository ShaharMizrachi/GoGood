import {Text, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {hebrew} from '../component/Hebrew';
import ModalPopup from '../component/ui/ModalPopup';
import fonts from '../styles/fonts';
import PrimaryButton from '../component/ui/PrimaryButton';

const AreYouSureExit = ({modal: {closeModal, params}}: any) => {
  return (
    <ModalPopup open={true}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/MonsterOG.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{hebrew.are_you_sure}</Text>
          <Text style={styles.bodyText}>{hebrew.are_you_sure_fullText}</Text>
        </View>
        <View style={styles.butonContainer}>
          <PrimaryButton
            title={hebrew.confirm}
            onPress={() => {
              params?.pushContnueButton();
              closeModal('AreYouSureExit');
            }}
          />
        </View>
      </View>
    </ModalPopup>
  );
};

export default AreYouSureExit;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1.5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  butonContainer: {
    flex: 1,
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
    marginTop: 40,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    lineHeight: 22,
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
