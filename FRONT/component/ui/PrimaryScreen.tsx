import React, {Children} from 'react';
import {Image, Text, View, StyleSheet, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {hebrew} from '../Hebrew';

const images = [
  require('../../assets/images/monster_hi.png'),
  require('../../assets/images/Monster_yay.png'),
];

const PrimaryScreen = ({
  title,
  bodyText,
  children,
  pushButton,
  pic,
  goBack,
  OnPressText,
}: {
  title: string;
  bodyText: string;
  children: JSX.Element;
  pushButton?: JSX.Element;
  pic: number;
  goBack?: boolean;
  OnPressText?: any;
}) => {
  const body = <View>{children}</View>;
  return (
    <LinearGradient
      colors={[colors.blue700, colors.blue500]}
      style={styles.generalPageContainer}>
      {goBack && (
        <View>
          <Text onPress={OnPressText} style={styles.links}>
            {hebrew.skip}
          </Text>
        </View>
      )}
      <View>
        <View style={styles.imageContainer}>
          <Image source={images[pic]} />
        </View>
        <View>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.bodyText}>
            {bodyText}
            {pushButton}
          </Text>
        </View>
        <View>{body}</View>
      </View>
    </LinearGradient>
  );
};

export default PrimaryScreen;

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 43,
    fontFamily: fonts.bold,
  },
  bodyText: {
    marginTop: 17,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    lineHeight: 25,
    fontFamily: fonts.regular,
  },
  generalPageContainer: {
    flex: 1,
    backgroundColor: colors.blue500,
    padding: 22,
  },
  links: {
    textDecorationLine: 'underline',
    textAlign: 'left',
    margin: 10,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 22,
  },
});
